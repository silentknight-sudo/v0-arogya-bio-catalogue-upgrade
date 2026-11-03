"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  ClipboardList,
  Users,
  Settings,
  MessageSquare,
  LogOut,
  Ticket,
  Truck,
  ExternalLink,
  X,
} from "lucide-react"
import { adminLogout } from "@/app/actions/admin"

const groups = [
  {
    title: "Overview",
    items: [{ icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" }],
  },
  {
    title: "Commerce",
    items: [
      { icon: Package, label: "Products", href: "/admin/products" },
      { icon: ShoppingCart, label: "Orders", href: "/admin/orders" },
      { icon: ClipboardList, label: "Order Status", href: "/admin/orders-management" },
      { icon: Truck, label: "Shipments", href: "/admin/shipments" },
      { icon: Ticket, label: "Coupons", href: "/admin/coupons" },
    ],
  },
  {
    title: "Customers",
    items: [
      { icon: Users, label: "Users", href: "/admin/users" },
      { icon: MessageSquare, label: "Chat Support", href: "/admin/chat" },
    ],
  },
  {
    title: "Content",
    items: [{ icon: Settings, label: "CMS Settings", href: "/admin/cms/theme" }],
  },
]

export const ADMIN_MENU_EVENT = "admin-menu-toggle"

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const toggle = () => setOpen((o) => !o)
    window.addEventListener(ADMIN_MENU_EVENT, toggle)
    return () => window.removeEventListener(ADMIN_MENU_EVENT, toggle)
  }, [])
  useEffect(() => setOpen(false), [pathname])

  const handleLogout = async () => {
    try {
      await adminLogout()
    } catch (error) {
      console.error("Logout error:", error)
      router.push("/admin/login")
    }
  }

  const isActive = (href: string) => {
    if (href.startsWith("/admin/cms")) return pathname.startsWith("/admin/cms")
    return pathname === href || pathname.startsWith(href + "/")
  }

  return (
    <>
      {/* mobile backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden transition-opacity ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 shrink-0 h-screen flex flex-col bg-[#13200f] text-white transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="absolute inset-0 pointer-events-none opacity-40" style={{ background: "radial-gradient(80% 40% at 0% 0%, rgba(217,148,52,.35), transparent 70%)" }} />

        <div className="relative px-6 pt-6 pb-5 flex items-center justify-between">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <span className="relative w-10 h-10 rounded-xl bg-white overflow-hidden ring-2 ring-amber-400/40">
              <Image src="/arogyabio-logo.png" alt="Arogya Bio" fill sizes="40px" className="object-contain p-1" />
            </span>
            <span>
              <span className="block font-bold tracking-tight">Arogya Bio</span>
              <span className="block text-[11px] uppercase tracking-[0.2em] text-amber-300/80">Admin Studio</span>
            </span>
          </Link>
          <button className="lg:hidden p-2 rounded-lg hover:bg-white/10" onClick={() => setOpen(false)} aria-label="Close menu">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="relative flex-1 overflow-y-auto px-4 pb-4 space-y-6">
          {groups.map((g) => (
            <div key={g.title}>
              <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">{g.title}</p>
              <div className="space-y-1">
                {g.items.map((item) => {
                  const Icon = item.icon
                  const active = isActive(item.href)
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        active ? "bg-white/10 text-white shadow-inner" : "text-white/65 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {active && <span className="absolute left-0 top-2 bottom-2 w-1 rounded-full bg-amber-400" />}
                      <span
                        className={`grid place-items-center w-8 h-8 rounded-lg transition ${
                          active ? "bg-amber-400 text-[#13200f]" : "bg-white/5 group-hover:bg-white/10"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </span>
                      {item.label}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="relative p-4 space-y-2 border-t border-white/10">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-sm text-white/70 hover:bg-white/5 hover:text-white transition"
          >
            View storefront <ExternalLink className="w-4 h-4" />
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-300 hover:bg-red-500/10 transition"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>
    </>
  )
}
