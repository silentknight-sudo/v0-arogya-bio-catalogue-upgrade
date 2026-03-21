"use client"

import { useState, useEffect } from "react"
import AdminSidebar from "@/components/admin/sidebar"
import AdminHeader from "@/components/admin/header"
import { Button } from "@/components/ui/button"
import { Save, Plus, Trash2 } from "lucide-react"

interface CMSSetting {
  id: string
  key: string
  value: { value: string | number | boolean }
  section: string
}

interface Banner {
  id: number
  url: string
  alt: string
}

export default function CMSPage() {
  const [settings, setSettings] = useState<CMSSetting[]>([])
  const [banners, setBanners] = useState<Banner[]>([
    { id: 1, url: "", alt: "Banner 1" },
    { id: 2, url: "", alt: "Banner 2" },
    { id: 3, url: "", alt: "Banner 3" },
  ])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [showNewForm, setShowNewForm] = useState(false)
  const [newSetting, setNewSetting] = useState({
    key: "",
    value: "",
    section: "General",
  })

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      setLoading(true)
      console.log("[v0] Fetching CMS settings from server API...")

      const response = await fetch("/api/admin/cms", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error("Failed to fetch settings")
      }

      const data = await response.json()
      console.log("[v0] Fetched", data.settings.length, "CMS settings")
      setSettings(data.settings)
    } catch (error) {
      console.error("[v0] Error fetching settings:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSettingChange = (id: string, newValue: string | number | boolean) => {
    setSettings((prev) =>
      prev.map((setting) => (setting.id === id ? { ...setting, value: { value: newValue } } : setting))
    )
  }

  const handleSaveSettings = async () => {
    try {
      setSaving(true)
      console.log("[v0] Saving CMS settings and banners...")

      // Save settings
      for (const setting of settings) {
        const response = await fetch("/api/admin/cms", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            id: setting.id,
            key: setting.key,
            value: setting.value.value,
            section: setting.section,
          }),
        })

        if (!response.ok) {
          throw new Error(`Failed to update setting: ${setting.key}`)
        }
      }

      // Save banners
      for (const banner of banners) {
        if (banner.url) {
          await fetch("/api/admin/cms", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              key: `banner_${banner.id}`,
              value: banner.url,
              section: "Banners",
            }),
          })
        }
      }

      console.log("[v0] All settings and banners saved successfully")
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      console.error("[v0] Error saving settings:", error)
      alert("Error saving settings")
    } finally {
      setSaving(false)
    }
  }

  const handleBannerChange = (bannerId: number, url: string) => {
    setBanners(banners.map((b) => (b.id === bannerId ? { ...b, url } : b)))
  }

  const handleAddNewSetting = async () => {
    if (!newSetting.key || !newSetting.value) {
      alert("Please fill in all fields")
      return
    }

    try {
      console.log("[v0] Creating new CMS setting...")

      const response = await fetch("/api/admin/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          key: newSetting.key,
          value: isNaN(Number(newSetting.value)) ? newSetting.value : Number(newSetting.value),
          section: newSetting.section,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create setting")
      }

      console.log("[v0] Setting created successfully")
      setNewSetting({ key: "", value: "", section: "General" })
      setShowNewForm(false)
      await fetchSettings()
    } catch (error) {
      console.error("[v0] Error creating setting:", error)
      alert("Error creating setting")
    }
  }

  const handleDeleteSetting = async (id: string) => {
    if (!confirm("Are you sure you want to delete this setting?")) return

    try {
      console.log("[v0] Deleting CMS setting...")

      const response = await fetch(`/api/admin/cms?id=${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error("Failed to delete setting")
      }

      console.log("[v0] Setting deleted successfully")
      await fetchSettings()
    } catch (error) {
      console.error("[v0] Error deleting setting:", error)
      alert("Error deleting setting")
    }
  }

  const groupedSettings = settings.reduce(
    (acc, setting) => {
      const section = setting.section || "General"
      if (!acc[section]) {
        acc[section] = []
      }
      acc[section].push(setting)
      return acc
    },
    {} as Record<string, CMSSetting[]>
  )

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-auto p-8">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground">CMS Settings</h1>
              <p className="text-muted-foreground">Manage website content and settings - Total: {settings.length} settings</p>
            </div>
            <div className="flex items-center gap-4">
              {saved && <span className="text-sm text-green-600 font-semibold">Settings saved!</span>}
              <Button
                onClick={handleSaveSettings}
                disabled={saving}
                className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">Loading settings...</div>
          ) : (
            <div className="space-y-6">
              {/* Banner Management - ALWAYS VISIBLE */}
              <div className="bg-white rounded-lg shadow-sm p-6 border-2 border-primary/20">
                <h2 className="text-2xl font-bold text-foreground mb-6">🖼️ Landing Page Banners</h2>
                <div className="space-y-6">
                  {banners.map((banner) => (
                    <div key={banner.id} className="pb-6 border-b-2 border-gray-200 last:border-0">
                      <label className="block text-base font-bold text-foreground mb-3 capitalize">
                        {banner.alt} Upload
                      </label>
                      <div className="space-y-3">
                        <div>
                          <input
                            type="text"
                            placeholder={`Paste image URL for ${banner.alt} (e.g., https://example.com/banner.jpg or Google Drive link)`}
                            value={banner.url}
                            onChange={(e) => {
                              handleBannerChange(banner.id, e.target.value)
                              console.log(`[v0] Banner ${banner.id} URL updated: ${e.target.value}`)
                            }}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                          />
                          <p className="text-xs text-muted-foreground mt-1">Enter a valid image URL. Preview will appear below.</p>
                        </div>
                        {banner.url && (
                          <div className="mt-4">
                            <p className="text-sm font-semibold text-foreground mb-2">Preview:</p>
                            <img
                              src={banner.url}
                              alt={banner.alt}
                              className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                              onError={(e) => {
                                console.log(`[v0] Failed to load image for ${banner.alt}`)
                                ;(e.target as HTMLImageElement).style.display = "none"
                              }}
                            />
                          </div>
                        )}
                        {!banner.url && (
                          <div className="w-full h-40 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                            <p className="text-muted-foreground">Image preview will appear here</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add New Setting Form */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-foreground">Add New Setting</h2>
                  <button
                    onClick={() => setShowNewForm(!showNewForm)}
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    {showNewForm ? "Cancel" : <Plus className="w-5 h-5" />}
                  </button>
                </div>

                {showNewForm && (
                  <div className="space-y-4 border-t border-border pt-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">Key *</label>
                        <input
                          type="text"
                          placeholder="setting_key"
                          value={newSetting.key}
                          onChange={(e) => setNewSetting({ ...newSetting, key: e.target.value })}
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">Section</label>
                        <input
                          type="text"
                          placeholder="General"
                          value={newSetting.section}
                          onChange={(e) => setNewSetting({ ...newSetting, section: e.target.value })}
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">Value *</label>
                        <input
                          type="text"
                          placeholder="setting value"
                          value={newSetting.value}
                          onChange={(e) => setNewSetting({ ...newSetting, value: e.target.value })}
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>
                    <Button
                      onClick={handleAddNewSetting}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      Create Setting
                    </Button>
                  </div>
                )}
              </div>

              {/* Display Existing Settings */}
              {Object.entries(groupedSettings).map(([section, sectionSettings]) => (
                <div key={section} className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-bold text-foreground mb-6 pb-4 border-b border-border">{section}</h2>
                  <div className="space-y-4">
                    {sectionSettings.map((setting) => (
                      <div key={setting.id} className="space-y-2 pb-4 border-b border-border last:border-0">
                        <div className="flex justify-between items-center">
                          <label className="block text-sm font-semibold text-foreground capitalize">
                            {setting.key.replace(/_/g, " ")}
                          </label>
                          <button
                            onClick={() => handleDeleteSetting(setting.id)}
                            className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                            title="Delete setting"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                        {typeof setting.value.value === "boolean" ? (
                          <select
                            value={String(setting.value.value)}
                            onChange={(e) => handleSettingChange(setting.id, e.target.value === "true")}
                            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          >
                            <option value="true">Enabled</option>
                            <option value="false">Disabled</option>
                          </select>
                        ) : (
                          <input
                            type={typeof setting.value.value === "number" ? "number" : "text"}
                            value={setting.value.value}
                            onChange={(e) =>
                              handleSettingChange(
                                setting.id,
                                typeof setting.value.value === "number"
                                  ? Number.parseFloat(e.target.value)
                                  : e.target.value
                              )
                            }
                            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
