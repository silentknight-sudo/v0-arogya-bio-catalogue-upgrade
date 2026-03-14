"use server"

import { createClient } from "@/lib/supabase/server"

// Twilio SMS sender function
async function sendOtpViaTwilio(phone: string, otp: string): Promise<{ success: boolean; message: string }> {
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN
    const twilioPhone = process.env.TWILIO_PHONE_NUMBER

    if (!accountSid || !authToken || !twilioPhone) {
      console.log("[v0] Twilio credentials not configured, using console OTP")
      return { success: true, message: "console" }
    }

    // Twilio API endpoint
    const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.resource`

    const message = `Your ArogyaBio verification code is: ${otp}. This code will expire in 10 minutes. Do not share this code with anyone.`

    // Format phone number for Twilio (ensure it has country code)
    let formattedPhone = phone
    if (!phone.startsWith("+")) {
      formattedPhone = "+91" + phone.replace(/\D/g, "").slice(-10)
    }

    const body = new URLSearchParams({
      From: twilioPhone,
      To: formattedPhone,
      Body: message,
    })

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Basic " + Buffer.from(`${accountSid}:${authToken}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    })

    if (!response.ok) {
      const text = await response.text()
      console.log("[v0] Twilio API response:", text)

      // Check for trial account verification error (code 21608)
      if (text.includes("21608") || text.includes("unverified")) {
        console.log("[v0] Trial account detected: Phone number not verified. Using console OTP for testing.")
        return { success: true, message: "console" }
      }

      console.log("[v0] Twilio error:", text)
      return { success: false, message: "twilio-error" }
    }

    console.log("[v0] SMS sent successfully via Twilio")
    return { success: true, message: "sms" }
  } catch (error) {
    console.log("[v0] Twilio SMS error:", error instanceof Error ? error.message : String(error))
    return { success: true, message: "console" }
  }
}

export async function generatePhoneOTP(phone: string) {
  try {
    const supabase = await createClient()

    // Validate phone number
    const cleanPhone = phone.replace(/\D/g, "")
    if (cleanPhone.length < 10) {
      return { error: "Please enter a valid phone number" }
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    // Delete any existing unverified OTP for this phone
    await supabase
      .from("phone_otp")
      .delete()
      .eq("phone", phone)
      .eq("is_verified", false)

    // Insert new OTP (expires in 10 minutes)
    const expiresAt = new Date()
    expiresAt.setMinutes(expiresAt.getMinutes() + 10)

    const { error } = await supabase.from("phone_otp").insert({
      phone,
      otp_code: otp,
      is_verified: false,
      expires_at: expiresAt.toISOString(),
    })

    if (error) {
      console.error("[v0] OTP generation error:", error.message)
      return { error: "Failed to generate OTP" }
    }

    // Send OTP via Twilio SMS
    const result = await sendOtpViaTwilio(phone, otp)

    // Always log OTP to console for testing/backup
    console.log("[v0] Test OTP (use if SMS not received):", otp)

    if (result.message === "sms") {
      return { success: true, message: "OTP sent to your phone via SMS" }
    } else if (result.message === "console") {
      return { success: true, message: "Check browser console (F12) for test OTP. For production, verify your number at Twilio console." }
    } else {
      // Twilio error but still allow console OTP
      return { success: true, message: "Check browser console (F12) for test OTP" }
    }
  } catch (error) {
    console.error("[v0] Generate OTP error:", error instanceof Error ? error.message : String(error))
    return { error: "Failed to generate OTP" }
  }
}

export async function verifyPhoneOTP(phone: string, otpCode: string) {
  try {
    const supabase = await createClient()

    // Check if OTP exists and is not expired
    const { data: otpRecord, error: fetchError } = await supabase
      .from("phone_otp")
      .select("*")
      .eq("phone", phone)
      .eq("otp_code", otpCode)
      .eq("is_verified", false)
      .gt("expires_at", new Date().toISOString())
      .single()

    if (fetchError || !otpRecord) {
      console.log("[v0] Invalid or expired OTP")
      return { error: "Invalid or expired OTP" }
    }

    // Mark OTP as verified
    const { error: updateError } = await supabase
      .from("phone_otp")
      .update({ is_verified: true })
      .eq("id", otpRecord.id)

    if (updateError) {
      return { error: "Failed to verify OTP" }
    }

    return { success: true, phone }
  } catch (error) {
    console.error("[v0] Verify OTP error:", error instanceof Error ? error.message : String(error))
    return { error: "Failed to verify OTP" }
  }
}

export async function createOrSignInPhoneUser(phone: string, firstName: string, lastName: string) {
  try {
    const supabase = await createClient()

    // Check if user with this phone exists in profiles
    const { data: existingProfiles, error: fetchError } = await supabase
      .from("profiles")
      .select("id")
      .eq("phone", phone)

    // If there's an existing profile, sign them in
    if (existingProfiles && existingProfiles.length > 0) {
      console.log("[v0] Existing user found with phone:", phone)
      return { success: true, userId: existingProfiles[0].id, isNewUser: false }
    }

    // Check if user exists in auth table with this phone-based email
    const { data: existingAuth } = await supabase.auth.admin.listUsers()
    const phoneEmail = `${phone}@phone.local`
    const existingAuthUser = existingAuth?.users?.find(u => u.email === phoneEmail)

    if (existingAuthUser) {
      console.log("[v0] Existing auth user found, creating profile if needed")
      // User exists in auth but not in profiles, create the profile
      const { error: profileError } = await supabase.from("profiles").insert({
        id: existingAuthUser.id,
        first_name: firstName,
        last_name: lastName,
        phone: phone,
      }).select()

      if (profileError && !profileError.message.includes("duplicate")) {
        console.error("[v0] Profile creation error:", profileError.message)
        return { error: "Failed to create profile" }
      }

      return { success: true, userId: existingAuthUser.id, isNewUser: false }
    }

    // Create new user with phone
    // Generate a temporary password (user can set email/password later)
    const tempPassword = Math.random().toString(36).slice(-12)

    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email: phoneEmail,
      password: tempPassword,
    })

    if (signUpError || !authData.user) {
      console.error("[v0] Auth error:", signUpError?.message)
      return { error: "Failed to create account" }
    }

    // Create profile for new user
    const { error: profileError } = await supabase.from("profiles").insert({
      id: authData.user.id,
      first_name: firstName,
      last_name: lastName,
      phone: phone,
    })

    if (profileError) {
      console.error("[v0] Profile error:", profileError.message)
      return { error: "Failed to create profile" }
    }

    console.log("[v0] New user created successfully")
    return { success: true, userId: authData.user.id, isNewUser: true }
  } catch (error) {
    console.error("[v0] Phone signup error:", error instanceof Error ? error.message : String(error))
    return { error: "Failed to process phone login" }
  }
}
