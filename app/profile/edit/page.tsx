"use client"

import React from "react"

import { redirect } from "next/navigation"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { LogOutButton } from "@/components/logout-button"
import { Edit2, Save, X, AlertCircle, CheckCircle } from "lucide-react"

interface Profile {
  id: string
  first_name: string | null
  last_name: string | null
  phone: string | null
  email: string | null
  address: string | null
  city: string | null
  state: string | null
  pincode: string | null
}

export default function ProfilePageClient() {
  const supabase = createClient()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isEditing, setIsEditing] = useState(true)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)
  const [formData, setFormData] = useState<Profile>({
    id: "",
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  })

  useEffect(() => {
    const fetchUserAndProfile = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          redirect("/auth/login")
        }

        setUser(user)

        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single()

        if (profileData) {
          setProfile(profileData)
          setFormData({
            ...profileData,
            email: user.email || "",
          })
        } else {
          setFormData({
            id: user.id,
            first_name: "",
            last_name: "",
            phone: "",
            email: user.email || "",
            address: "",
            city: "",
            state: "",
            pincode: "",
          })
        }
      } catch (error) {
        console.error("Error fetching profile:", error)
        setError("Failed to load profile")
      } finally {
        setLoading(false)
      }
    }

    fetchUserAndProfile()
  }, [supabase])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveProfile = async () => {
    setSaving(true)
    setError(null)
    setSuccess(null)

    try {
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          first_name: formData.first_name,
          last_name: formData.last_name,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        })
        .eq("id", formData.id)

      if (updateError) throw updateError

      setProfile(formData)
      setIsEditing(false)
      setSuccess("Profile updated successfully!")
      setTimeout(() => setSuccess(null), 3000)
    } catch (error) {
      console.error("Error saving profile:", error)
      setError(error instanceof Error ? error.message : "Failed to save profile")
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    if (profile) {
      setFormData({ ...profile, email: user?.email || "" })
    }
    setIsEditing(false)
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
          <p className="text-lg text-gray-600">Loading profile...</p>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1 bg-gradient-to-b from-green-50 to-white">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold">Edit Profile</h1>
            <p className="text-green-100 mt-2">Update your personal information and preferences</p>
          </div>
        </div>

        {/* Profile Content */}
        <div className="max-w-4xl mx-auto p-4 py-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <p className="text-green-700">{success}</p>
            </div>
          )}

          {/* Profile Form */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gray-50 rounded-t-lg border-b border-gray-200">
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first_name" className="text-gray-700 font-semibold">
                      First Name
                    </Label>
                    <Input
                      id="first_name"
                      name="first_name"
                      placeholder="Enter first name"
                      value={formData.first_name || ""}
                      onChange={handleInputChange}
                      className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last_name" className="text-gray-700 font-semibold">
                      Last Name
                    </Label>
                    <Input
                      id="last_name"
                      name="last_name"
                      placeholder="Enter last name"
                      value={formData.last_name || ""}
                      onChange={handleInputChange}
                      className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-semibold">
                    Email (Read-only)
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email || ""}
                    disabled
                    className="border-gray-300 bg-gray-100"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-700 font-semibold">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 9876543210"
                    value={formData.phone || ""}
                    onChange={handleInputChange}
                    className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                  />
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Shipping Address</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-gray-700 font-semibold">
                        Street Address
                      </Label>
                      <Input
                        id="address"
                        name="address"
                        placeholder="Enter street address"
                        value={formData.address || ""}
                        onChange={handleInputChange}
                        className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-gray-700 font-semibold">
                          City
                        </Label>
                        <Input
                          id="city"
                          name="city"
                          placeholder="Enter city"
                          value={formData.city || ""}
                          onChange={handleInputChange}
                          className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state" className="text-gray-700 font-semibold">
                          State
                        </Label>
                        <Input
                          id="state"
                          name="state"
                          placeholder="Enter state"
                          value={formData.state || ""}
                          onChange={handleInputChange}
                          className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pincode" className="text-gray-700 font-semibold">
                          Pincode
                        </Label>
                        <Input
                          id="pincode"
                          name="pincode"
                          placeholder="Enter pincode"
                          value={formData.pincode || ""}
                          onChange={handleInputChange}
                          className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-6 border-t border-gray-200">
                  <Button
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                  <Link href="/profile">
                    <Button variant="outline" className="border-gray-300 flex items-center gap-2 bg-transparent">
                      <X className="w-4 h-4" />
                      Cancel
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </main>
  )
}
