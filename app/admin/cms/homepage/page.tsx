"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import AdminSidebar from "@/components/admin/sidebar"
import AdminHeader from "@/components/admin/header"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"

interface HomepageContent {
  heroTitle: string
  heroDescription: string
  aboutTitle: string
  aboutDescription: string
  newsletterTitle: string
  newsletterDescription: string
}

export default function HomepageEditorPage() {
  const [content, setContent] = useState<HomepageContent>({
    heroTitle: "We Are Here To Give You The Best Herbal Products",
    heroDescription: "Discover authentic Ayurvedic medicines and wellness products for complete natural health.",
    aboutTitle: "The Natural Way To Achieving Balance And Optimal Health",
    aboutDescription: "At Arogyabio, we blend the ancient wisdom of Ayurveda with modern science.",
    newsletterTitle: "Sign Up To Get Updates & News About Us",
    newsletterDescription:
      "Subscribe to our newsletter and get exclusive offers, health tips, and new product launches.",
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const supabase = createClient()

  const handleChange = (field: keyof HomepageContent, value: string) => {
    setContent((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      // Save each content field to cms_settings table
      for (const [key, value] of Object.entries(content)) {
        const { data: existing } = await supabase
          .from("cms_settings")
          .select("id")
          .eq("key", `homepage_${key}`)
          .single()

        if (existing) {
          await supabase.from("cms_settings").update({ value: { value } }).eq("key", `homepage_${key}`)
        } else {
          await supabase.from("cms_settings").insert({
            key: `homepage_${key}`,
            value: { value },
            section: "Homepage",
          })
        }
      }
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      console.error("Error saving content:", error)
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
              <h1 className="text-3xl font-bold text-foreground">Homepage Editor</h1>
              <p className="text-muted-foreground">Customize your homepage content</p>
            </div>
            <div className="flex items-center gap-4">
              {saved && <span className="text-sm text-green-600 font-semibold">Saved successfully!</span>}
              <Button
                onClick={handleSave}
                disabled={saving}
                className="bg-primary hover:bg-primary/90 flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>

          <div className="space-y-6 max-w-4xl">
            {/* Hero Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-foreground mb-6 pb-4 border-b border-border">Hero Section</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Hero Title</label>
                  <input
                    type="text"
                    value={content.heroTitle}
                    onChange={(e) => handleChange("heroTitle", e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Hero Description</label>
                  <textarea
                    value={content.heroDescription}
                    onChange={(e) => handleChange("heroDescription", e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-foreground mb-6 pb-4 border-b border-border">About Section</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">About Title</label>
                  <input
                    type="text"
                    value={content.aboutTitle}
                    onChange={(e) => handleChange("aboutTitle", e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">About Description</label>
                  <textarea
                    value={content.aboutDescription}
                    onChange={(e) => handleChange("aboutDescription", e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            {/* Newsletter Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-foreground mb-6 pb-4 border-b border-border">Newsletter Section</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Newsletter Title</label>
                  <input
                    type="text"
                    value={content.newsletterTitle}
                    onChange={(e) => handleChange("newsletterTitle", e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Newsletter Description</label>
                  <textarea
                    value={content.newsletterDescription}
                    onChange={(e) => handleChange("newsletterDescription", e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
