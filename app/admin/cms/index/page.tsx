"use client"

import Link from "next/link"
import AdminSidebar from "@/components/admin/sidebar"
import AdminHeader from "@/components/admin/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Palette, ImageIcon } from "lucide-react"

const cmsPages = [
  {
    title: "Homepage Content",
    description: "Edit hero section, about section, newsletter text",
    icon: FileText,
    href: "/admin/cms/homepage",
  },
  {
    title: "Banners",
    description: "Manage promotional banners and sliders",
    icon: ImageIcon,
    href: "/admin/cms/banners",
  },
  {
    title: "Theme & Settings",
    description: "Customize colors, contact info, shipping & tax rates",
    icon: Palette,
    href: "/admin/cms/theme",
  },
]

export default function CMSIndex() {
  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-auto p-8">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-2">CMS Dashboard</h1>
            <p className="text-lg text-muted-foreground">Manage and customize every aspect of your website</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cmsPages.map((page) => {
              const Icon = page.icon
              return (
                <Link key={page.href} href={page.href} className="block">
                  <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full hover:border-primary/50 group">
                    <div className="flex items-start gap-4 h-full flex-col justify-between">
                      <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-2">{page.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{page.description}</p>
                      </div>
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Edit Now</Button>
                    </div>
                  </Card>
                </Link>
              )
            })}
          </div>

          {/* Quick Stats */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Banners", value: "5" },
              { label: "Theme Customized", value: "Yes" },
              { label: "Last Updated", value: "Today" },
            ].map((stat, idx) => (
              <Card key={idx} className="p-6 text-center">
                <p className="text-3xl font-bold text-primary mb-2">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
