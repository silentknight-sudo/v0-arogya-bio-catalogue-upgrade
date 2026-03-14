import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    // Verify admin session from cookies
    const cookieStore = await cookies()
    const adminCookie = cookieStore.get("admin_session")?.value
    
    console.log("[v0] API GET /admin/users called")
    console.log("[v0] Admin cookie present:", !!adminCookie)
    
    if (!adminCookie) {
      console.log("[v0] No admin session cookie found - returning 401")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    console.log("[v0] Admin cookie validated, fetching users...")

    // Use admin role to bypass RLS
    const supabase = await createClient({ roleOverride: "admin" })

    // Fetch auth users - this is the source of truth for user accounts
    console.log("[v0] API: Fetching auth users...")
    const { data: authUsersData, error: authError } = await supabase.auth.admin.listUsers()
    
    if (authError) {
      console.error("[v0] API: Error fetching auth users:", authError.message)
      return NextResponse.json({ error: authError.message }, { status: 500 })
    }

    console.log("[v0] API: Successfully fetched auth users:", authUsersData?.users?.length || 0)

    if (!authUsersData?.users || authUsersData.users.length === 0) {
      console.log("[v0] API: No auth users found")
      return NextResponse.json({ users: [], count: 0 }, { status: 200 })
    }

    // Try to fetch profiles to get additional data
    console.log("[v0] API: Fetching profiles for additional data...")
    const { data: profiles, error: profilesError } = await supabase
      .from("profiles")
      .select("id, first_name, last_name, phone, created_at")
      .order("created_at", { ascending: false })

    console.log("[v0] API: Profiles fetch - Count:", profiles?.length || 0, "Error:", profilesError?.message || "none")

    // Merge auth users with profile data
    const usersWithEmail = authUsersData.users.map((authUser) => {
      const profile = profiles?.find(p => p.id === authUser.id)
      
      return {
        id: authUser.id,
        first_name: profile?.first_name || authUser.user_metadata?.first_name || "",
        last_name: profile?.last_name || authUser.user_metadata?.last_name || "",
        email: authUser.email || "N/A",
        phone: profile?.phone || authUser.user_metadata?.phone || "",
        created_at: profile?.created_at || authUser.created_at,
      }
    })

    console.log("[v0] API: Returning users:", usersWithEmail.length)
    return NextResponse.json({ users: usersWithEmail, count: usersWithEmail.length }, { status: 200 })
  } catch (error) {
    console.error("[v0] API: Caught error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    )
  }
}
