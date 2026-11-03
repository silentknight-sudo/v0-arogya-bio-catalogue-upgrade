"use client"

import { useState, useEffect } from "react"
import AdminSidebar from "@/components/admin/sidebar"
import AdminHeader from "@/components/admin/header"
import Link from "next/link"
import Image from "next/image"
import { BarChart3, ShoppingCart, Users, TrendingUp, AlertCircle, Package, RefreshCw, Ticket, Truck, MessageSquare } from "lucide-react"
import { storeProducts, comboOffer } from "@/lib/store"

interface DashboardStats {
  totalOrders: number
  totalRevenue: number
  totalUsers: number
  totalProducts: number
  recentOrders: any[]
  lowStockProducts: any[]
}

export default function AdminDashboard() {
  const [isHydrated, setIsHydrated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    totalRevenue: 0,
    totalUsers: 0,
    totalProducts: 0,
    recentOrders: [],
    lowStockProducts: [],
  })

  useEffect(() => {
    setIsHydrated(true)
    fetchStats()
    // Refresh stats every 30 seconds for real-time updates
    const interval = setInterval(fetchStats, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchStats = async () => {
    try {
      setError(null)
      console.log("[v0] Fetching admin dashboard stats...")

      const response = await fetch("/api/admin/stats", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })

      console.log("[v0] Dashboard stats response status:", response.status)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to fetch stats")
      }

      const data = await response.json()
      console.log("[v0] Dashboard stats received:", data.stats)

      setStats(data.stats)
    } catch (err) {
      console.error("[v0] Error fetching stats:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch statistics")
    } finally {
      setLoading(false)
    }
  }

  if (!isHydrated) return null

  const statusColors: Record<string, string> = {
    delivered: "bg-emerald-100 text-emerald-700",
    pending: "bg-amber-100 text-amber-700",
    processing: "bg-sky-100 text-sky-700",
    shipped: "bg-indigo-100 text-indigo-700",
    cancelled: "bg-red-100 text-red-700",
  }

  const kpis = [
    { label: "Total Orders", value: stats.totalOrders.toLocaleString(), sub: "All time", icon: ShoppingCart, tone: "from-[#2f5d2a] to-[#1f3d1b]" },
    { label: "Revenue", value: "₹" + stats.totalRevenue.toLocaleString("en-IN"), sub: "From delivered orders", icon: TrendingUp, tone: "from-amber-500 to-amber-700" },
    { label: "Customers", value: stats.totalUsers.toLocaleString(), sub: "Registered", icon: Users, tone: "from-sky-500 to-sky-700" },
    { label: "Products", value: stats.totalProducts.toLocaleString(), sub: "In database", icon: Package, tone: "from-rose-500 to-rose-700" },
  ]

  const chartData = [...stats.recentOrders]
    .reverse()
    .map((o) => ({ d: new Date(o.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" }), v: o.total_amount || 0 }))
  const maxV = Math.max(1, ...chartData.map((c) => c.v))
  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening"

  return (
    <div className="flex h-screen bg-[#f7f2e6]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <AdminHeader />
        <main className="flex-1 overflow-auto p-4 md:p-8">
          {/* Welcome banner */}
          <section className="relative overflow-hidden rounded-3xl bg-[#13200f] text-white p-6 md:p-8 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="absolute inset-0 opacity-60" style={{ background: "radial-gradient(60% 90% at 90% 20%, rgba(217,148,52,.45), transparent 70%)" }} />
            <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-amber-300">{greeting}</p>
                <h1 className="mt-2 text-3xl md:text-4xl font-bold">Welcome back to Arogya Bio</h1>
                <p className="mt-2 text-white/70 max-w-lg text-sm">
                  Live business metrics for Gouthealth Oil &amp; Gouthealth Capsules. Data refreshes every 30 seconds.
                </p>
              </div>
              <div className="flex gap-3">
                <Link href="/admin/orders" className="rounded-full bg-amber-400 text-[#13200f] px-5 py-2.5 text-sm font-bold hover:bg-amber-300 transition">
                  View orders
                </Link>
                <button onClick={fetchStats} className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold hover:bg-white/10 transition">
                  <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Refresh
                </button>
              </div>
            </div>
          </section>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl flex gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
            {kpis.map((k, i) => {
              const Icon = k.icon
              return (
                <div
                  key={k.label}
                  className="group relative overflow-hidden rounded-2xl bg-white border border-[#eadfc6] p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${i * 80}ms`, animationFillMode: "both" }}
                >
                  <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br ${k.tone} opacity-10 group-hover:opacity-20 transition`} />
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-[#7a6f58]">{k.label}</p>
                    <span className={`grid place-items-center w-10 h-10 rounded-xl bg-gradient-to-br ${k.tone} text-white shadow-lg`}>
                      <Icon className="w-5 h-5" />
                    </span>
                  </div>
                  <p className="mt-4 text-3xl font-bold text-[#1f2d1c] tabular-nums">
                    {loading ? <span className="inline-block h-8 w-24 rounded-lg bg-[#f1e4c4] animate-pulse" /> : k.value}
                  </p>
                  <p className="mt-1 text-xs text-[#9a8f78]">{k.sub}</p>
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            {/* Recent order value chart */}
            <div className="xl:col-span-2 rounded-2xl bg-white border border-[#eadfc6] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold text-[#1f2d1c]">Recent order value</h2>
                  <p className="text-xs text-[#9a8f78]">Last {chartData.length} orders</p>
                </div>
                <BarChart3 className="w-5 h-5 text-[#2f5d2a]" />
              </div>
              <div className="mt-6 h-52 flex items-end gap-3">
                {chartData.length === 0 ? (
                  <p className="m-auto text-sm text-[#9a8f78]">{loading ? "Loading…" : "No orders yet"}</p>
                ) : (
                  chartData.map((c, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                      <span className="text-[11px] font-semibold text-[#5b5240] opacity-0 group-hover:opacity-100 transition">₹{c.v.toLocaleString("en-IN")}</span>
                      <div
                        className="w-full max-w-[56px] rounded-t-xl bg-gradient-to-t from-[#2f5d2a] to-[#7fb069] group-hover:from-amber-600 group-hover:to-amber-400 transition-all duration-700"
                        style={{ height: `${Math.max(6, (c.v / maxV) * 160)}px` }}
                      />
                      <span className="text-[11px] text-[#9a8f78]">{c.d}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Product focus */}
            <div className="rounded-2xl bg-white border border-[#eadfc6] p-6">
              <h2 className="font-semibold text-[#1f2d1c]">Products on sale</h2>
              <p className="text-xs text-[#9a8f78]">Storefront is focused on these two</p>
              <div className="mt-5 space-y-3">
                {storeProducts.map((p) => (
                  <Link key={p.id} href={`/shop/${p.id}`} target="_blank" className="flex items-center gap-3 rounded-xl border border-[#f1e4c4] p-3 hover:bg-[#fbf7ee] transition">
                    <span className="relative w-14 h-14 rounded-xl bg-gradient-to-b from-[#fffaf0] to-[#f1e4c4] overflow-hidden shrink-0">
                      <Image src={p.image} alt={p.name} fill sizes="56px" className="object-contain p-1" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-semibold text-sm text-[#1f2d1c]">{p.name}</span>
                      <span className="block text-xs text-[#9a8f78]">{p.size}</span>
                    </span>
                    <span className="ml-auto text-[10px] font-bold uppercase rounded-full bg-emerald-100 text-emerald-700 px-2 py-0.5">Live</span>
                  </Link>
                ))}
                <div className="rounded-xl bg-[#13200f] text-white p-4 flex items-center justify-between">
                  <span className="text-sm">Combo price</span>
                  <span className="font-bold text-amber-300">₹{comboOffer.discountedPrice.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Orders */}
            <div className="lg:col-span-2 rounded-2xl bg-white border border-[#eadfc6] overflow-hidden">
              <div className="px-6 py-4 border-b border-[#f1e4c4] flex items-center justify-between">
                <h2 className="font-semibold text-[#1f2d1c] flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-[#2f5d2a]" /> Recent orders
                </h2>
                <Link href="/admin/orders" className="text-xs font-semibold text-[#2f5d2a] hover:underline">See all</Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-[#fbf7ee] text-[#9a8f78] text-xs uppercase tracking-wider">
                    <tr>
                      <th className="text-left font-semibold px-6 py-3">Order</th>
                      <th className="text-left font-semibold px-6 py-3">Date</th>
                      <th className="text-left font-semibold px-6 py-3">Status</th>
                      <th className="text-right font-semibold px-6 py-3">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f1e4c4]">
                    {loading ? (
                      <tr><td colSpan={4} className="px-6 py-8 text-center text-[#9a8f78]">Loading…</td></tr>
                    ) : stats.recentOrders.length === 0 ? (
                      <tr><td colSpan={4} className="px-6 py-8 text-center text-[#9a8f78]">No recent orders</td></tr>
                    ) : (
                      stats.recentOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-[#fbf7ee] transition">
                          <td className="px-6 py-4 font-mono font-semibold text-[#2f5d2a]">#{order.id.slice(0, 8).toUpperCase()}</td>
                          <td className="px-6 py-4 text-[#7a6f58]">{new Date(order.created_at).toLocaleDateString("en-IN")}</td>
                          <td className="px-6 py-4">
                            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${statusColors[order.status] || "bg-gray-100 text-gray-700"}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right font-semibold text-[#1f2d1c]">₹{order.total_amount.toLocaleString("en-IN")}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Low stock + quick actions */}
            <div className="space-y-6">
              <div className="rounded-2xl bg-white border border-[#eadfc6] overflow-hidden">
                <div className="px-6 py-4 border-b border-[#f1e4c4]">
                  <h2 className="font-semibold text-[#1f2d1c] flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500" /> Low stock
                  </h2>
                </div>
                <div className="divide-y divide-[#f1e4c4]">
                  {loading ? (
                    <div className="p-6 text-center text-[#9a8f78] text-sm">Loading…</div>
                  ) : stats.lowStockProducts.length === 0 ? (
                    <div className="p-6 text-center text-[#9a8f78] text-sm">All products in stock 🎉</div>
                  ) : (
                    stats.lowStockProducts.map((product) => (
                      <div key={product.id} className="px-6 py-3 flex items-center justify-between gap-3">
                        <p className="text-sm font-medium text-[#1f2d1c] line-clamp-1">{product.name}</p>
                        <span className="shrink-0 rounded-full bg-red-50 text-red-600 px-2 py-0.5 text-xs font-semibold">{product.stock_quantity} left</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="rounded-2xl bg-white border border-[#eadfc6] p-6">
                <h2 className="font-semibold text-[#1f2d1c]">Quick actions</h2>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {[
                    { href: "/admin/products", label: "Products", icon: Package },
                    { href: "/admin/coupons", label: "Coupons", icon: Ticket },
                    { href: "/admin/shipments", label: "Shipments", icon: Truck },
                    { href: "/admin/chat", label: "Support", icon: MessageSquare },
                  ].map((a) => {
                    const Icon = a.icon
                    return (
                      <Link key={a.href} href={a.href} className="flex flex-col items-center gap-2 rounded-xl border border-[#f1e4c4] py-4 text-sm font-medium text-[#3c3a2a] hover:bg-[#13200f] hover:text-white hover:border-transparent transition">
                        <Icon className="w-5 h-5" /> {a.label}
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
