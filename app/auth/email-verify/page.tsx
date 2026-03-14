"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState, Suspense } from "react"
import { verifyEmailOTP, createEmailOTPUser } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function EmailVerifyContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const email = searchParams.get("email") || ""
  const [otp, setOtp] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState<"verify" | "info">("verify")

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (!otp) {
      setError("Please enter OTP")
      setIsLoading(false)
      return
    }

    try {
      const result = await verifyEmailOTP(email, otp)
      if (result.error) {
        setError(result.error)
        setIsLoading(false)
        return
      }

      // If existing user, redirect to home
      if (!result.isNewUser) {
        setTimeout(() => {
          router.push("/")
          router.refresh()
        }, 500)
        return
      }

      // New user, proceed to info collection
      setStep("info")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Failed to verify OTP")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (!firstName || !lastName) {
      setError("Please enter first and last name")
      setIsLoading(false)
      return
    }

    try {
      const result = await createEmailOTPUser(email, firstName, lastName, phone)
      if (result.error) {
        setError(result.error)
        setIsLoading(false)
        return
      }

      setTimeout(() => {
        router.push("/")
        router.refresh()
      }, 500)
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Failed to create account")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white p-4">
      <Card className="w-full max-w-md border-green-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
          <CardTitle className="text-2xl">Verify Email</CardTitle>
          <CardDescription className="text-green-50">
            {step === "verify" ? "Enter the OTP sent to your email" : "Complete your profile"}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {step === "verify" ? (
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-gray-700">Email</Label>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{email}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="otp" className="text-gray-700">
                  One Time Password
                </Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="000000"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.slice(0, 6))}
                  maxLength="6"
                  className="border-green-200 focus:border-green-500 focus:ring-green-500 text-center text-2xl tracking-widest"
                />
                <p className="text-xs text-gray-500">Check your browser console for the OTP (development mode)</p>
              </div>
              {error && <p className="text-sm text-red-500 bg-red-50 p-3 rounded">{error}</p>}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                disabled={isLoading}
              >
                {isLoading ? "Verifying..." : "Verify OTP"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleCreateUser} className="space-y-4">
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
                  Phone Number (Optional)
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="border-green-200 focus:border-green-500 focus:ring-green-500"
                />
              </div>
              {error && <p className="text-sm text-red-500 bg-red-50 p-3 rounded">{error}</p>}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default function EmailVerifyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EmailVerifyContent />
    </Suspense>
  )
}
