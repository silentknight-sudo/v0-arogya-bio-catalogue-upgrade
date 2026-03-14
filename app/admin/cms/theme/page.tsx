"use client"

import { useState, useEffect } from "react"
import AdminSidebar from "@/components/admin/sidebar"
import AdminHeader from "@/components/admin/header"
import { Button } from "@/components/ui/button"
import { Save, AlertCircle } from "lucide-react"

interface ThemeSettings {
  siteName: string
  siteTagline: string
  contactEmail: string
  contactPhone: string
  shippingCost: number
  freeShippingThreshold: number
  taxRate: number
  primaryColor: string
  secondaryColor: string
  footerText: string
}

export default function ThemePage() {
  const [settings, setSettings] = useState<ThemeSettings>({
    siteName: "Arogyabio",
    siteTagline: "Authentic Ayurvedic Medicines & Wellness Products",
    contactEmail: "official.arogyabio@gmail.com",
    contactPhone: "+91-8447386076",
    shippingCost: 50,
    freeShippingThreshold: 2000,
    taxRate: 18,
    primaryColor: "#2d7a4a",
    secondaryColor: "#e8f5e9",
    footerText: "Arogyabio - Premium Ayurvedic Products",
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    try {
      const saved = localStorage.getItem("cms_theme_settings")
      if (saved) {
        setSettings(JSON.parse(saved))
      }
    } catch (error) {
      console.error("Error loading settings:", error)
    }
  }, [])

  const handleChange = (field: keyof ThemeSettings, value: any) => {
    setSettings((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    setSaving(true)
    setError("")
    try {
      localStorage.setItem("cms_theme_settings", JSON.stringify(settings))
      window.dispatchEvent(new CustomEvent("cmsUpdated", { detail: settings }))
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      setError("Error saving settings. Please try again.")
      console.error("Error saving settings:", error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-auto p-8">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Theme & Settings</h1>
              <p className="text-muted-foreground">Customize your website appearance and e-commerce settings</p>
            </div>
            <div className="flex items-center gap-4">
              {error && (
                <div className="flex items-center gap-2 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}
              {saved && <span className="text-sm text-green-600 font-semibold">Saved successfully!</span>}
              <Button
                onClick={handleSave}
                disabled={saving}
                className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>

          <div className="space-y-6 max-w-4xl">
            {/* Branding Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-foreground mb-6 pb-4 border-b border-border">Branding</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Site Name</label>
                    <input
                      type="text"
                      value={settings.siteName}
                      onChange={(e) => handleChange("siteName", e.target.value)}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Site Tagline</label>
                    <input
                      type="text"
                      value={settings.siteTagline}
                      onChange={(e) => handleChange("siteTagline", e.target.value)}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Footer Text</label>
                  <input
                    type="text"
                    value={settings.footerText}
                    onChange={(e) => handleChange("footerText", e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-foreground mb-6 pb-4 border-b border-border">Contact Information</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Contact Email</label>
                    <input
                      type="email"
                      value={settings.contactEmail}
                      onChange={(e) => handleChange("contactEmail", e.target.value)}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Contact Phone</label>
                    <input
                      type="tel"
                      value={settings.contactPhone}
                      onChange={(e) => handleChange("contactPhone", e.target.value)}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* E-commerce Settings Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-foreground mb-6 pb-4 border-b border-border">E-commerce Settings</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Shipping Cost (₹)</label>
                  <input
                    type="number"
                    value={settings.shippingCost}
                    onChange={(e) => handleChange("shippingCost", Number(e.target.value))}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Free Shipping Threshold (₹)</label>
                  <input
                    type="number"
                    value={settings.freeShippingThreshold}
                    onChange={(e) => handleChange("freeShippingThreshold", Number(e.target.value))}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Tax Rate (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={settings.taxRate}
                    onChange={(e) => handleChange("taxRate", Number(e.target.value))}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            {/* Theme Colors Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-foreground mb-6 pb-4 border-b border-border">Theme Colors</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Primary Color</label>
                  <div className="flex gap-3">
                    <input
                      type="color"
                      value={settings.primaryColor}
                      onChange={(e) => handleChange("primaryColor", e.target.value)}
                      className="w-16 h-10 border border-border rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      value={settings.primaryColor}
                      onChange={(e) => handleChange("primaryColor", e.target.value)}
                      className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Secondary Color</label>
                  <div className="flex gap-3">
                    <input
                      type="color"
                      value={settings.secondaryColor}
                      onChange={(e) => handleChange("secondaryColor", e.target.value)}
                      className="w-16 h-10 border border-border rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      value={settings.secondaryColor}
                      onChange={(e) => handleChange("secondaryColor", e.target.value)}
                      className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
