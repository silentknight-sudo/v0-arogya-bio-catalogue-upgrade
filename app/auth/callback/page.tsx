"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export const dynamic = "force-dynamic"

export default function AuthCallbackPage() {
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        console.log("[v0] Processing auth callback...")

        // Get the session from the URL fragment
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          console.error("[v0] Auth callback error:", error)
          router.push("/auth/login?error=callback_failed")
          return
        }

        if (data?.session) {
          const user = data.session.user
          console.log("[v0] User authenticated successfully:", user.email)

          // Check if profile exists, create if it doesn't
          const { data: existingProfile } = await supabase
            .from("profiles")
            .select("id")
            .eq("id", user.id)
            .single()

          if (!existingProfile) {
            // Extract name from email or metadata
            const firstName = user.user_metadata?.first_name || user.email?.split("@")[0] || "User"
            const lastName = user.user_metadata?.last_name || ""

            const { error: insertError } = await supabase.from("profiles").insert({
              id: user.id,
              first_name: firstName,
              last_name: lastName,
              phone: "",
            })

            if (insertError) {
              console.log("[v0] Profile creation warning:", insertError.message)
            }
          }

          // Redirect after successful OAuth
          setTimeout(() => {
            router.push("/")
            router.refresh()
          }, 500)
        } else {
          console.log("[v0] No session found, redirecting to login")
          router.push("/auth/login")
        }
      } catch (error) {
        console.error("[v0] Callback processing error:", error)
        router.push("/auth/login?error=callback_error")
      }
    }

    handleCallback()
  }, [router, supabase])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Completing authentication...</p>
      </div>
    </div>
  )
}
