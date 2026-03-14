"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import AdminSidebar from "@/components/admin/sidebar"
import AdminHeader from "@/components/admin/header"
import { Button } from "@/components/ui/button"
import { Save, Plus, Trash2 } from "lucide-react"

interface Banner {
  id: string
  title: string
  description: string
  image_url: string
  button_text: string
  button_url: string
  is_active: boolean
  sort_order: number
}

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    fetchBanners()
  }, [])

  const fetchBanners = async () => {
    try {
      const { data } = await supabase.from("homepage_banners").select("*").order("sort_order")
      if (data) setBanners(data)
    } catch (error) {
      console.error("Error fetching banners:", error)
    } finally {
      setLoading(false)
    }
  }

  const addBanner = () => {
    const newBanner: Banner = {
      id: Date.now().toString(),
      title: "New Banner",
      description: "Banner description",
      image_url: "",
      button_text: "Learn More",
      button_url: "/shop",
      is_active: true,
      sort_order: banners.length,
    }
    setBanners([...banners, newBanner])
  }

  const updateBanner = (id: string, field: keyof Banner, value: any) => {
    setBanners(banners.map((b) => (b.id === id ? { ...b, [field]: value } : b)))
  }

  const deleteBanner = (id: string) => {
    setBanners(banners.filter((b) => b.id !== id))
  }

  const saveBanners = async () => {
    setSaving(true)
    try {
      for (const banner of banners) {
        if (banner.id.toString().length > 10) {
          // New banner
          await supabase.from("homepage_banners").insert(banner)
        } else {
          // Existing banner
          const { id, ...updateData } = banner
          await supabase.from("homepage_banners").update(updateData).eq("id", id)
        }
      }
      await fetchBanners()
    } catch (error) {
      console.error("Error saving banners:", error)
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
              <h1 className="text-3xl font-bold text-foreground">Homepage Banners</h1>
              <p className="text-muted-foreground">Manage promotional banners</p>
            </div>
            <div className="flex items-center gap-4">
              <Button onClick={addBanner} className="bg-accent hover:bg-accent/90 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Banner
              </Button>
              <Button
                onClick={saveBanners}
                disabled={saving}
                className="bg-primary hover:bg-primary/90 flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {saving ? "Saving..." : "Save All"}
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8">Loading banners...</div>
          ) : (
            <div className="space-y-4">
              {banners.map((banner, idx) => (
                <div key={banner.id} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Title</label>
                      <input
                        type="text"
                        value={banner.title}
                        onChange={(e) => updateBanner(banner.id, "title", e.target.value)}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Image URL</label>
                      <input
                        type="text"
                        value={banner.image_url}
                        onChange={(e) => updateBanner(banner.id, "image_url", e.target.value)}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Description</label>
                    <textarea
                      value={banner.description}
                      onChange={(e) => updateBanner(banner.id, "description", e.target.value)}
                      rows={2}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Button Text</label>
                      <input
                        type="text"
                        value={banner.button_text}
                        onChange={(e) => updateBanner(banner.id, "button_text", e.target.value)}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Button URL</label>
                      <input
                        type="text"
                        value={banner.button_url}
                        onChange={(e) => updateBanner(banner.id, "button_url", e.target.value)}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Active</label>
                      <select
                        value={String(banner.is_active)}
                        onChange={(e) => updateBanner(banner.id, "is_active", e.target.value === "true")}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => deleteBanner(banner.id)}
                      className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
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
