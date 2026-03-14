"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { adminLogin } from "@/app/actions/admin"
import { ShieldAlert, ArrowLeft, Lock, Mail, CheckCircle } from "lucide-react"

export default function AdminLoginPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleDirectLogin = async () => {
    setError("")
    setLoading(true)
    setSuccess(false)

    try {
      console.log("[v0] Admin login: Starting login attempt")
      const result = await adminLogin("arogya@admin.com", "arogya@pass")
      
      console.log("[v0] Admin login: Result:", result)
      console.log("[v0] Admin login: Current cookies:", document.cookie)
      
      if (result.success) {
        console.log("[v0] Admin login: Success, redirecting to dashboard")
        setSuccess(true)
        await new Promise(resolve => setTimeout(resolve, 1500))
        router.push("/admin/dashboard")
      } else {
        console.log("[v0] Admin login: Failed with error:", result.error)
        setError(result.error || "Login failed")
      }
    } catch (err) {
      console.error("[v0] Admin login: Caught error:", err)
      setError("Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-secondary/10 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: "1s" }}></div>

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-semibold">Back to Site</span>
          </Link>
        </div>

        {/* Main Card */}
        <div className="bg-card rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl border border-border/50">
          {/* Header with Icon */}
          <div className="bg-gradient-to-r from-primary via-primary/90 to-secondary p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -mr-20 -mt-20 blur-2xl"></div>
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center p-3 bg-white/20 rounded-xl backdrop-blur-sm mb-4">
                <ShieldAlert className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
              <p className="text-white/80 text-sm">Secure management dashboard</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            {/* Status Messages */}
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg text-sm flex gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-medium">{error}</span>
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm flex gap-3 items-center">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">Login successful! Redirecting...</span>
              </div>
            )}

            {/* Info Box */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 space-y-2">
              <div className="flex gap-2 items-start">
                <Mail className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-semibold text-foreground">Demo Credentials</p>
                  <p className="text-muted-foreground">Email: arogya@admin.com</p>
                </div>
              </div>
            </div>

            {/* Login Button */}
            <Button
              onClick={handleDirectLogin}
              disabled={loading || success}
              className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground font-semibold rounded-lg transition-all disabled:opacity-50"
            >
              {success ? (
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Welcome to Admin Panel
                </span>
              ) : loading ? (
                "Authenticating..."
              ) : (
                <span className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Access Admin Dashboard
                </span>
              )}
            </Button>

            {/* Security Note */}
            <div className="text-center text-xs text-muted-foreground border-t border-border pt-4">
              <p>This is a secure admin portal. All access is logged.</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>Need help? Contact support at admin@arogyabio.com</p>
        </div>
      </div>
    </div>
  )
}
