"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { createAdminUser } from "@/app/actions/admin"

export default function AdminSetupPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSetupAdmin = async () => {
    setLoading(true)
    setMessage("")
    setError("")

    try {
      const result = await createAdminUser("arogya@admin.com", "arogya@pass")

      if (result.success) {
        setMessage("Admin user created successfully! You can now go to login.")
      } else {
        setError(result.error || "Failed to create admin user")
      }
    } catch (err) {
      setError("An error occurred during setup")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-primary/2 to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Arogyabio Admin Setup</h1>
          <p className="text-muted-foreground">Initialize admin account</p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-900">
            This will create the admin account with email: <strong>arogya@admin.com</strong> and password:{" "}
            <strong>arogya@pass</strong>
          </p>
        </div>

        {error && (
          <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        {message && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 text-sm">
            {message}
          </div>
        )}

        <Button
          onClick={handleSetupAdmin}
          disabled={loading}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2 rounded-lg font-semibold"
        >
          {loading ? "Setting up..." : "Create Admin Account"}
        </Button>

        <div className="mt-6 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground mb-3">Already set up?</p>
          <a href="/admin/login" className="text-sm text-primary hover:underline">
            Go to Login
          </a>
        </div>
      </div>
    </div>
  )
}
