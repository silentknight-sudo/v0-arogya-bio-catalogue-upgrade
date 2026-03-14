"use server"

import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export interface UserWithEmail {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  created_at: string
}

export async function fetchAllUsers(): Promise<UserWithEmail[]> {
  try {
    // Use admin role to bypass RLS policies
    const supabase = await createClient({ roleOverride: "admin" })

    console.log("[v0] Fetching all users with admin role (bypass RLS)")

    // First, try to fetch profiles with admin access
    const { data: profiles, error: profilesError } = await supabase
      .from("profiles")
      .select("id, first_name, last_name, phone, created_at")
      .order("created_at", { ascending: false })

    if (profilesError) {
      console.error("[v0] Error fetching profiles:", profilesError)
      return []
    }

    if (!profiles || profiles.length === 0) {
      console.log("[v0] No profiles found")
      return []
    }

    console.log("[v0] Fetched profiles with admin role:", profiles.length)

    // Try to get emails using admin API
    let usersWithEmail: UserWithEmail[] = profiles.map((profile) => ({
      id: profile.id,
      first_name: profile.first_name,
      last_name: profile.last_name,
      email: "N/A", // Default, will be overridden if we can fetch auth users
      phone: profile.phone || "",
      created_at: profile.created_at,
    }))

    // Try to fetch auth users to get emails - this should work with service role key
    try {
      const { data: authUsersData, error: authError } = await supabase.auth.admin.listUsers()
      
      if (!authError && authUsersData?.users) {
        console.log("[v0] Fetched auth users with admin role:", authUsersData.users.length)
        usersWithEmail = profiles.map((profile) => ({
          id: profile.id,
          first_name: profile.first_name,
          last_name: profile.last_name,
          email: authUsersData.users.find((u) => u.id === profile.id)?.email || "N/A",
          phone: profile.phone || "",
          created_at: profile.created_at,
        }))
      }
    } catch (authError) {
      console.log("[v0] Could not fetch auth users:", authError instanceof Error ? authError.message : String(authError))
      // Continue with profiles-only data
    }

    console.log("[v0] Returning all users:", usersWithEmail.length)
    return usersWithEmail
  } catch (error) {
    console.error("[v0] Error in fetchAllUsers:", error)
    return []
  }
}

export async function adminLogin(email: string, password: string) {
  try {
    if (email === "arogya@admin.com" && password === "arogya@pass") {
      // Set secure admin session cookie
      const cookieStore = await cookies()
      const isProduction = process.env.NODE_ENV === "production"
      
      cookieStore.set("admin_session", JSON.stringify({ adminId: "admin", email, timestamp: Date.now() }), {
        httpOnly: true,
        secure: isProduction, // Allow non-secure in development
        sameSite: "strict", // Use strict for maximum security
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/", // Ensure cookie is available to all paths
      })
      
      console.log("[v0] Admin session cookie set successfully for:", email)
      return { success: true, adminId: "admin", email }
    }

    return { success: false, error: "Invalid email or password" }
  } catch (error) {
    console.error("[v0] Admin login error:", error)
    return { success: false, error: "Login failed" }
  }
}

export async function createAdminUser(email: string, password: string) {
  try {
    const supabase = await createClient()

    const { data: existingAdmin } = await supabase.from("admin_users").select("id").eq("email", email).maybeSingle()

    if (existingAdmin) {
      console.log("[v0] Admin user already exists:", email)
      return { success: true, message: "Admin user already exists. You can now proceed to login." }
    }

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (authError) {
      console.log("[v0] Failed to create auth user:", authError.message)
      return { success: false, error: authError.message }
    }

    if (!authData.user) {
      return { success: false, error: "Failed to create user" }
    }

    const adminClient = await createClient({ roleOverride: "admin" })
    const { error: adminError } = await adminClient.from("admin_users").insert({
      id: authData.user.id,
      email,
      password_hash: password,
      role: "admin",
      is_active: true,
      permissions: { all: true },
    })

    if (adminError) {
      console.log("[v0] Failed to add to admin_users:", adminError.message)
      return { success: false, error: "Admin user created in auth but failed to add admin permissions" }
    }

    console.log("[v0] Admin user created successfully:", email)
    return { success: true, message: "Admin user created successfully! You can now log in." }
  } catch (error) {
    console.error("[v0] Create admin user error:", error)
    return { success: false, error: "Failed to create admin user" }
  }
}

export async function adminLogout() {
  const cookieStore = await cookies()
  cookieStore.delete("admin_session")
  redirect("/admin/login")
}
