"use client"

import React from "react"
import { Suspense } from "react"
import Loading from "./loading"
import { useSearchParams, useRouter } from "next/navigation"
import { useState } from "react"
import { verifyPhoneOTP, createOrSignInPhoneUser } from "@/app/actions/phone-otp"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function PhoneVerifyPage() {
  return (
    <Suspense fallback={<Loading />}>
      <PhoneVerifyPageContent />
    </Suspense>
  )
}

function PhoneVerifyPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const phone = searchParams.get("phone") || ""
  const [otp, setOtp] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP")
      setIsLoading(false)
      return
    }

    try {
      const verifyResult = await verifyPhoneOTP(phone, otp)
      if (verifyResult.error) {
        setError(verifyResult.error)
        setIsLoading(false)
        return
      }

      // OTP verified, now create or sign in user
      const signInResult = await createOrSignInPhoneUser(phone, "", "")
      if (signInResult.error) {
        setError(signInResult.error)
        setIsLoading(false)
        return
      }

      alert("Phone verified successfully!")
      router.refresh()
      router.push("/")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Failed to verify OTP")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white p-4">
      <Card className="w-full max-w-md border-green-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
          <CardTitle className="text-2xl">Verify OTP</CardTitle>
          <CardDescription className="text-green-50">Enter the OTP sent to {phone}</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp" className="text-gray-700">
                One-Time Password (6 digits)
              </Label>
              <Input
                id="otp"
                type="text"
                placeholder="000000"
                required
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                className="border-green-200 focus:border-green-500 focus:ring-green-500 text-center text-2xl tracking-widest font-mono"
              />
            </div>
            {error && <p className="text-sm text-red-500 bg-red-50 p-3 rounded">{error}</p>}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
              disabled={isLoading || otp.length !== 6}
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </Button>
          </form>

          <div className="mt-6 space-y-2 text-center text-sm text-gray-600 bg-green-50 p-4 rounded-lg border border-green-200">
            <p className="font-semibold text-green-900">OTP should arrive in 30 seconds</p>
            <p>If you don't receive it, check your spam folder or developer console for testing</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
