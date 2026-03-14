"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { BarChart3, Package, ShoppingCart, Users, Settings, MessageSquare, LogOut, Ticket, Truck } from "lucide-react"
import { adminLogout } from "@/app/actions/admin"

const menuItems = [
  { icon: BarChart3, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Package, label: "Products", href: "/admin/products" },
  { icon: ShoppingCart, label: "Orders", href: "/admin/orders" },
  { icon: ShoppingCart, label: "Order Status", href: "/admin/orders-management" },
  { icon: Truck, label: "Shipments", href: "/admin/shipments" },
  { icon: Ticket, label: "Coupons", href: "/admin/coupons" },
  { icon: Users, label: "Users", href: "/admin/users" },
  { icon: MessageSquare, label: "Chat Support", href: "/admin/chat" },
  { icon: Settings, label: "CMS Settings", href: "/admin/cms/theme" },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await adminLogout()
    } catch (error) {
      console.error("[v0] Logout error:", error)
      router.push("/admin/login")
    }
  }

  return (
    <aside className="w-64 bg-white border-r border-border h-screen flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-2xl font-bold text-primary">Arogyabio</h1>
        <p className="text-sm text-muted-foreground">Admin Panel</p>
      </div>

      <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname.includes(item.href.split("/").pop() || "")
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-primary text-white"
                  : "text-foreground hover:bg-secondary/20"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-foreground hover:bg-destructive/10 hover:text-destructive rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  )
}
