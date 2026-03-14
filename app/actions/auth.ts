"use server"

import { createClient } from "@/lib/supabase/server"

export async function signUpUser(email: string, password: string, firstName: string, lastName: string, phone: string) {
  try {
    // Validate inputs
    if (!email || !password || !firstName || !lastName || !phone) {
      return { error: "All fields are required" }
    }

    if (password.length < 6) {
      return { error: "Password must be at least 6 characters" }
    }

    if (phone.length < 10) {
      return { error: "Phone number must be at least 10 digits" }
    }

    const supabase = await createClient()

    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (signUpError || !authData.user) {
      console.log("[v0] Auth error:", signUpError?.message)
      return { error: signUpError?.message || "Failed to create user account" }
    }

    // Create the profile for the new user
    const { error: profileError } = await supabase.from("profiles").insert({
      id: authData.user.id,
      first_name: firstName,
      last_name: lastName,
      phone: phone,
    })

    if (profileError) {
      console.log("[v0] Profile creation error:", profileError.message)
      return { error: `Profile creation failed: ${profileError.message}` }
    }

    console.log("[v0] User signup successful:", authData.user.id)
    return { success: true, userId: authData.user.id, email }
  } catch (error) {
    console.log("[v0] Signup error:", error instanceof Error ? error.message : String(error))
    return { error: error instanceof Error ? error.message : "Failed to create account" }
  }
}

export async function signInUser(email: string, password: string) {
  try {
    // Validate inputs
    if (!email || !password) {
      return { error: "Email and password are required" }
    }

    const supabase = await createClient()

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.log("[v0] Login error:", error.message)
      return { error: "Invalid email or password. Please check your credentials." }
    }

    if (!data.session) {
      return { error: "Failed to create session. Please try again." }
    }

    console.log("[v0] User login successful:", data.user?.email)
    return { success: true, user: data.user }
  } catch (error) {
    console.log("[v0] Sign in error:", error instanceof Error ? error.message : String(error))
    return { error: error instanceof Error ? error.message : "Failed to sign in" }
  }
}

export async function signOutUser() {
  try {
    const supabase = await createClient()
    const { error } = await supabase.auth.signOut()

    if (error) {
      return { error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.log("[v0] Sign out error:", error instanceof Error ? error.message : String(error))
    return { error: error instanceof Error ? error.message : "Failed to sign out" }
  }
}

// OAuth Sign In - Google
export async function signInWithGoogle() {
  try {
    const supabase = await createClient()
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/callback?provider=google`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })

    if (error) {
      console.log("[v0] Google OAuth error:", error.message)
      // Check if provider is not enabled
      if (error.message && (error.message.includes('not enabled') || error.message.includes('validation_failed'))) {
        return { error: "Google login is not configured yet. Please use Email or Phone authentication.", providerNotConfigured: true }
      }
      return { error: error.message || "Failed to sign in with Google" }
    }

    return { success: true, url: data?.url }
  } catch (error) {
    console.log("[v0] Google OAuth error:", error instanceof Error ? error.message : String(error))
    return { error: "Failed to initiate Google sign in" }
  }
}

// OAuth Sign In - Facebook
export async function signInWithFacebook() {
  try {
    const supabase = await createClient()
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'facebook',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/callback?provider=facebook`,
        scopes: 'public_profile,email',
      },
    })

    if (error) {
      console.log("[v0] Facebook OAuth error:", error.message)
      // Check if provider is not enabled
      if (error.message && (error.message.includes('not enabled') || error.message.includes('validation_failed'))) {
        return { error: "Facebook login is not configured yet. Please use Email or Phone authentication.", providerNotConfigured: true }
      }
      return { error: error.message || "Failed to sign in with Facebook" }
    }

    return { success: true, url: data?.url }
  } catch (error) {
    console.log("[v0] Facebook OAuth error:", error instanceof Error ? error.message : String(error))
    return { error: "Failed to initiate Facebook sign in" }
  }
}

// Email OTP
export async function generateEmailOTP(email: string) {
  try {
    if (!email) {
      return { error: "Email is required" }
    }

    const supabase = await createClient()
    
    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    
    // Delete any existing unverified OTP for this email
    await supabase
      .from("email_otp")
      .delete()
      .eq("email", email)
      .eq("is_verified", false)
    
    // Insert new OTP
    const { error } = await supabase.from("email_otp").insert({
      email,
      otp_code: otp,
      is_verified: false,
    })
    
    if (error) {
      console.log("[v0] Email OTP generation error:", error.message)
      return { error: "Failed to generate OTP" }
    }
    
    // TODO: In production, send OTP via email service
    console.log("[v0] Generated Email OTP for testing:", otp)
    
    return { success: true, otp }
  } catch (error) {
    console.log("[v0] Generate Email OTP error:", error instanceof Error ? error.message : String(error))
    return { error: "Failed to generate OTP" }
  }
}

// Verify Email OTP
export async function verifyEmailOTP(email: string, otpCode: string) {
  try {
    const supabase = await createClient()
    
    // Check if OTP exists and is not expired
    const { data: otpRecord, error: fetchError } = await supabase
      .from("email_otp")
      .select("*")
      .eq("email", email)
      .eq("otp_code", otpCode)
      .eq("is_verified", false)
      .gt("expires_at", new Date().toISOString())
      .single()
    
    if (fetchError || !otpRecord) {
      console.log("[v0] Invalid or expired email OTP")
      return { error: "Invalid or expired OTP" }
    }
    
    // Mark OTP as verified
    const { error: updateError } = await supabase
      .from("email_otp")
      .update({ is_verified: true })
      .eq("id", otpRecord.id)
    
    if (updateError) {
      return { error: "Failed to verify OTP" }
    }

    // Check if user exists
    const { data: existingUser } = await supabase.auth.admin?.getUser(email)
      ? await supabase.auth.admin.getUserByEmail(email)
      : { data: { user: null } }

    if (existingUser?.user) {
      // User exists, return for sign in
      return { success: true, email, isNewUser: false }
    }

    // New user - they'll be created in the next step
    return { success: true, email, isNewUser: true }
  } catch (error) {
    console.log("[v0] Verify Email OTP error:", error instanceof Error ? error.message : String(error))
    return { error: "Failed to verify OTP" }
  }
}

// Create Email OTP User
export async function createEmailOTPUser(email: string, firstName: string, lastName: string, phone: string) {
  try {
    const supabase = await createClient()
    
    // Check if user with this email exists
    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("id")
      .match({ first_name: firstName, last_name: lastName })
      .single()
    
    if (existingProfile) {
      return { success: true, userId: existingProfile.id, isNewUser: false }
    }
    
    // Create new user with OTP
    const tempPassword = Math.random().toString(36).slice(-12)
    
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password: tempPassword,
    })
    
    if (signUpError || !authData.user) {
      console.log("[v0] Email OTP auth error:", signUpError?.message)
      return { error: "Failed to create account" }
    }
    
    // Create profile for new user
    const { error: profileError } = await supabase.from("profiles").insert({
      id: authData.user.id,
      first_name: firstName,
      last_name: lastName,
      phone: phone || "",
    })
    
    if (profileError) {
      console.log("[v0] Profile error:", profileError.message)
      return { error: "Failed to create profile" }
    }
    
    return { success: true, userId: authData.user.id, isNewUser: true }
  } catch (error) {
    console.log("[v0] Email OTP signup error:", error instanceof Error ? error.message : String(error))
    return { error: "Failed to process email OTP signup" }
  }
}
