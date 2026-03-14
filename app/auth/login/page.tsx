"use client"

import type React from "react"
import { signInUser, signInWithGoogle, signInWithFacebook, generateEmailOTP } from "@/app/actions/auth"
import { generatePhoneOTP } from "@/app/actions/phone-otp"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Mail, Phone, Chrome, Facebook, AlertCircle, Lock, User as UserIcon, ArrowRight, Leaf } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [loginMethod, setLoginMethod] = useState<"email" | "phone" | "oauth">("email")
  const router = useRouter()
  const supabase = createClient()

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (!email || !password) {
      setError("Please enter both email and password")
      setIsLoading(false)
      return
    }

    try {
      const result = await signInUser(email, password)
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
      console.error("Login error:", error)
      setError(error instanceof Error ? error.message : "Invalid email or password")
      setIsLoading(false)
    }
  }

  const handlePhoneLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (!phone) {
      setError("Please enter your phone number")
      setIsLoading(false)
      return
    }

    try {
      const result = await generatePhoneOTP(phone)
      if (result.error) {
        setError(result.error)
        setIsLoading(false)
        return
      }
      alert("OTP sent! Check your browser console for the OTP code for testing.")
      router.push(`/auth/phone-verify?phone=${encodeURIComponent(phone)}`)
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Failed to send OTP")
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailOTPLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (!email) {
      setError("Please enter your email")
      setIsLoading(false)
      return
    }

    try {
      const result = await generateEmailOTP(email)
      if (result.error) {
        setError(result.error)
        setIsLoading(false)
        return
      }
      alert("OTP sent! Check your browser console for the OTP code for testing.")
      router.push(`/auth/email-verify?email=${encodeURIComponent(email)}`)
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Failed to send OTP")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
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
      setError("Failed to sign in with Google")
      setIsLoading(false)
    }
  }

  const handleFacebookLogin = async () => {
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
      setError("Failed to sign in with Facebook")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-2xl">
        {/* Left Side - Brand Story */}
        <div className="hidden md:flex flex-col justify-between p-12 bg-gradient-to-br from-primary via-primary/90 to-secondary text-white relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/30 rounded-full -ml-24 -mb-24 blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-8">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-semibold tracking-wider">AROGYABIO</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Wellness Starts Here
            </h2>
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              Discover ancient Ayurvedic wisdom combined with modern wellness. Join thousands who've transformed their health.
            </p>
            
            <div className="space-y-4 text-sm">
              <div className="flex gap-3 items-start">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm mt-0.5">
                  <Leaf className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold">100% Natural Ingredients</p>
                  <p className="text-white/70">Pure, traditional Ayurvedic formulations</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm mt-0.5">
                  <Leaf className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold">Expert Formulated</p>
                  <p className="text-white/70">By certified Ayurvedic practitioners</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative z-10 text-sm text-white/70">
            <p>New to Arogyabio?</p>
            <Link href="/auth/sign-up" className="text-white font-semibold hover:underline flex items-center gap-1 mt-2 group">
              Create your wellness journey <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex flex-col justify-center p-8 md:p-12 bg-background">
          <div className="md:hidden mb-8">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Leaf className="w-6 h-6 text-primary" />
              </div>
              <span className="text-lg font-bold text-primary">AROGYABIO</span>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground mb-8">Continue your wellness journey</p>

          {/* Method Tabs */}
          <div className="grid grid-cols-3 gap-2 mb-8 bg-muted rounded-xl p-1">
            {[
              { id: "email", label: "Email", icon: Mail },
              { id: "phone", label: "Phone", icon: Phone },
              { id: "oauth", label: "Social", icon: Chrome }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => {
                  setLoginMethod(id as any)
                  setError(null)
                }}
                className={`py-2 px-3 rounded-lg font-medium transition-all flex items-center justify-center gap-1.5 text-sm ${
                  loginMethod === id
                    ? "bg-white shadow-md text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>

          {/* Email Login Form */}
          {loginMethod === "email" && (
            <form onSubmit={handleEmailLogin} className="space-y-5 animate-in fade-in">
              <div className="space-y-2">
                <Label className="text-foreground font-semibold flex items-center gap-2">
                  <UserIcon className="w-4 h-4 text-primary" />
                  Email Address
                </Label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-muted border-0 focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground h-12 rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-foreground font-semibold flex items-center gap-2">
                  <Lock className="w-4 h-4 text-primary" />
                  Password
                </Label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-muted border-0 focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground h-12 rounded-lg"
                />
              </div>

              {error && (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg text-sm flex gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground font-semibold rounded-lg transition-all"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>

              <button
                type="button"
                onClick={async (e) => {
                  e.preventDefault()
                  setLoginMethod("email")
                  setPassword("")
                  setError(null)
                  await handleEmailOTPLogin({ preventDefault: () => {} } as React.FormEvent)
                }}
                className="w-full text-sm text-primary hover:text-primary/80 font-semibold py-2 transition-colors"
              >
                Use Email OTP Instead
              </button>
            </form>
          )}

          {/* Phone Login Form */}
          {loginMethod === "phone" && (
            <form onSubmit={handlePhoneLogin} className="space-y-5 animate-in fade-in">
              <div className="space-y-2">
                <Label className="text-foreground font-semibold flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  Phone Number
                </Label>
                <Input
                  type="tel"
                  placeholder="+91 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-muted border-0 focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground h-12 rounded-lg"
                />
              </div>

              {error && (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg text-sm flex gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground font-semibold rounded-lg"
              >
                {isLoading ? "Sending OTP..." : "Send OTP"}
              </Button>
            </form>
          )}

          {/* OAuth Login Options */}
          {loginMethod === "oauth" && (
            <div className="space-y-4 animate-in fade-in">
              <Button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full h-12 border-2 border-primary bg-background text-primary hover:bg-primary/5 font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Chrome className="w-4 h-4" />
                Continue with Google
              </Button>
              <Button
                onClick={handleFacebookLogin}
                disabled={isLoading}
                className="w-full h-12 border-2 border-secondary bg-background text-secondary hover:bg-secondary/5 font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Facebook className="w-4 h-4" />
                Continue with Facebook
              </Button>

              {error && (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg text-sm flex gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-sm text-foreground">
                <p className="font-semibold text-primary mb-1">Email or Phone OTP Always Available</p>
                <p className="text-muted-foreground">Social login requires additional setup. Use Email or Phone tabs for immediate access.</p>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-border text-center text-sm">
            <p className="text-muted-foreground mb-2">New to Arogyabio?</p>
            <Link href="/auth/sign-up" className="text-primary hover:text-primary/80 font-semibold transition-colors">
              Create an Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
