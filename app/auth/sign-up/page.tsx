"use client"

import type React from "react"
import { signUpUser } from "@/app/actions/auth"
import { signInWithGoogle, signInWithFacebook } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Chrome, Facebook } from "lucide-react"

export default function SignUpPage() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [signupMethod, setSignupMethod] = useState<"email" | "social">("email")
  const router = useRouter()

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (password !== repeatPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      setIsLoading(false)
      return
    }

    if (!phone || phone.length < 10) {
      setError("Please enter a valid phone number")
      setIsLoading(false)
      return
    }

    if (!email || !firstName || !lastName) {
      setError("Please fill in all fields")
      setIsLoading(false)
      return
    }

    try {
      const result = await signUpUser(email, password, firstName, lastName, phone)

      if (result.error) {
        setError(result.error)
        setIsLoading(false)
        return
      }

      console.log("[v0] Signup successful:", result)
      
      // Redirect on successful signup
      setTimeout(() => {
        router.push("/auth/login?success=signup_complete")
        router.refresh()
      }, 500)
    } catch (error: unknown) {
      console.log("[v0] Signup error:", error)
      setError(error instanceof Error ? error.message : "Failed to create account")
      setIsLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await signInWithGoogle()
      if (result.error) {
        setError(result.error)
        setIsLoading(false)
        return
      }
      if (result.url) {
        window.location.href = result.url
      }
    } catch (error: unknown) {
      setError("Failed to sign up with Google")
      setIsLoading(false)
    }
  }

  const handleFacebookSignUp = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await signInWithFacebook()
      if (result.error) {
        setError(result.error)
        setIsLoading(false)
        return
      }
      if (result.url) {
        window.location.href = result.url
      }
    } catch (error: unknown) {
      setError("Failed to sign up with Facebook")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white p-4">
      <Card className="w-full max-w-md border-green-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
          <CardTitle className="text-2xl">Create Account</CardTitle>
          <CardDescription className="text-green-50">Join Arogyabio for authentic Ayurvedic wellness</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {/* Signup Method Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setSignupMethod("email")}
              className={`flex-1 py-2 px-3 rounded-lg font-medium transition-colors text-sm ${
                signupMethod === "email"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Email
            </button>
            <button
              onClick={() => setSignupMethod("social")}
              className={`flex-1 py-2 px-3 rounded-lg font-medium transition-colors text-sm ${
                signupMethod === "social"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Social Login
            </button>
          </div>

          {/* Email Signup Form */}
          {signupMethod === "email" && (
            <form onSubmit={handleSignUpSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-gray-700">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="border-green-200 focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-gray-700">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="border-green-200 focus:border-green-500 focus:ring-green-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-700">
                  Phone Number
                </Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 bg-gray-100 text-gray-700 border border-r-0 border-green-200 rounded-l-md">
                    +91
                  </span>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="9876543210"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    className="border-green-200 focus:border-green-500 focus:ring-green-500 rounded-l-none"
                    maxLength="10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-green-200 focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-green-200 focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="repeatPassword" className="text-gray-700">
                  Confirm Password
                </Label>
                <Input
                  id="repeatPassword"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  className="border-green-200 focus:border-green-500 focus:ring-green-500"
                />
              </div>
              {error && <p className="text-sm text-red-500 bg-red-50 p-3 rounded">{error}</p>}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Sign Up"}
              </Button>
              {isLoading && (
                <div className="text-center text-sm text-gray-600 mt-3">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600 inline-block mr-2"></div>
                  Please wait while we set up your account...
                </div>
              )}
            </form>
          )}

          {/* Social Signup Options */}
          {signupMethod === "social" && (
            <div className="space-y-3">
              <Button
                onClick={handleGoogleSignUp}
                disabled={isLoading}
                className="w-full border-2 border-blue-400 bg-white text-gray-700 hover:bg-blue-50 flex items-center justify-center gap-2"
              >
                <Chrome className="w-4 h-4" />
                Sign up with Google
              </Button>
              <Button
                onClick={handleFacebookSignUp}
                disabled={isLoading}
                className="w-full border-2 border-blue-600 bg-white text-gray-700 hover:bg-blue-50 flex items-center justify-center gap-2"
              >
                <Facebook className="w-4 h-4" />
                Sign up with Facebook
              </Button>
              {error && <p className="text-sm text-red-500 bg-red-50 p-3 rounded">{error}</p>}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
                <p className="font-semibold mb-2">Email Signup Always Available</p>
                <p>Social signup requires additional setup in your Supabase project. Switch to the Email tab above for immediate registration.</p>
              </div>
            </div>
          )}

          {/* Login Link */}
          <div className="mt-6 text-center text-sm border-t border-gray-200 pt-4">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-green-600 hover:text-green-700 font-semibold">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
