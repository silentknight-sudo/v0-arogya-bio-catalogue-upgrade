"use client"

import { usePathname, useRouter } from "next/navigation"
import { Bell, LogOut, Menu, Search } from "lucide-react"
import { ADMIN_MENU_EVENT } from "@/components/admin/sidebar"

const titles: Record<string, string> = {
  dashboard: "Dashboard",
  products: "Products",
  orders: "Orders",
  "orders-management": "Order Status",
  shipments: "Shipments",
  coupons: "Coupons",
  users: "Users",
  chat: "Chat Support",
  cms: "CMS Settings",
}

export default function AdminHeader() {
  const router = useRouter()
  const pathname = usePathname()
  const section = pathname.split("/")[2] || "dashboard"
  const title = titles[section] || "Admin"
  const today = new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })

  const handleLogout = () => {
    localStorage.removeItem("adminSession")
    router.push("/admin/login")
  }

  return (
    <header className="sticky top-0 z-30 h-16 shrink-0 bg-white/80 backdrop-blur-xl border-b border-[#eadfc6] px-4 md:px-8 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={() => window.dispatchEvent(new Event(ADMIN_MENU_EVENT))}
          className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-[#f4ecd8]"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#9a8f78] hidden sm:block">{today}</p>
          <h2 className="text-lg font-bold text-[#1f2d1c] truncate">{title}</h2>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9a8f78]" />
          <input
            placeholder="Search orders, customers…"
            className="w-64 pl-9 pr-3 py-2 rounded-full bg-[#fbf7ee] border border-[#eadfc6] text-sm focus:outline-none focus:ring-2 focus:ring-[#2f5d2a]/30"
          />
        </div>
        <button className="relative p-2.5 rounded-full hover:bg-[#f4ecd8] transition" aria-label="Notifications">
          <Bell className="w-5 h-5 text-[#5b5240]" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white" />
        </button>
        <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-[#eadfc6]">
          <span className="grid place-items-center w-9 h-9 rounded-full bg-gradient-to-br from-[#2f5d2a] to-[#13200f] text-amber-200 text-sm font-bold">A</span>
        </div>
        <button
          onClick={handleLogout}
          className="p-2.5 rounded-full hover:bg-red-50 text-[#5b5240] hover:text-red-600 transition"
          aria-label="Logout"
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  )
}
