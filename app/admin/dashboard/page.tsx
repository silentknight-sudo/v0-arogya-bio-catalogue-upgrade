"use client"

import { useState, useEffect } from "react"
import AdminSidebar from "@/components/admin/sidebar"
import AdminHeader from "@/components/admin/header"
import { BarChart3, ShoppingCart, Users, TrendingUp, AlertCircle, Package } from "lucide-react"

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

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-auto p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Welcome to Arogyabio Admin Panel - Real-time business metrics</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg flex gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Orders */}
            <div className="bg-card rounded-xl shadow-sm border border-border p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-muted-foreground">Total Orders</h3>
                <div className="p-2.5 bg-primary/10 rounded-lg">
                  <ShoppingCart className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">
                  {loading ? "..." : stats.totalOrders.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground mt-1">All time orders</p>
              </div>
            </div>

            {/* Total Revenue */}
            <div className="bg-card rounded-xl shadow-sm border border-border p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-muted-foreground">Total Revenue</h3>
                <div className="p-2.5 bg-secondary/10 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-secondary" />
                </div>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">
                  {loading ? "..." : "₹" + stats.totalRevenue.toLocaleString("en-IN")}
                </p>
                <p className="text-xs text-muted-foreground mt-1">From delivered orders</p>
              </div>
            </div>

            {/* Total Users */}
            <div className="bg-card rounded-xl shadow-sm border border-border p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-muted-foreground">Total Customers</h3>
                <div className="p-2.5 bg-blue-500/10 rounded-lg">
                  <Users className="w-5 h-5 text-blue-500" />
                </div>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">
                  {loading ? "..." : stats.totalUsers.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Registered customers</p>
              </div>
            </div>

            {/* Total Products */}
            <div className="bg-card rounded-xl shadow-sm border border-border p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-muted-foreground">Total Products</h3>
                <div className="p-2.5 bg-purple-500/10 rounded-lg">
                  <Package className="w-5 h-5 text-purple-500" />
                </div>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">
                  {loading ? "..." : stats.totalProducts.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Products in catalogue</p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Orders */}
            <div className="lg:col-span-2 bg-card rounded-xl shadow-sm border border-border overflow-hidden">
              <div className="p-6 border-b border-border">
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-primary" />
                  Recent Orders
                </h2>
              </div>
              <div className="divide-y divide-border">
                {loading ? (
                  <div className="p-6 text-center text-muted-foreground">Loading...</div>
                ) : stats.recentOrders.length === 0 ? (
                  <div className="p-6 text-center text-muted-foreground">No recent orders</div>
                ) : (
                  stats.recentOrders.map((order) => (
                    <div key={order.id} className="p-6 flex items-center justify-between hover:bg-muted/30 transition-colors">
                      <div>
                        <p className="font-mono text-sm font-semibold text-primary">#{order.id.slice(0, 8).toUpperCase()}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(order.created_at).toLocaleDateString("en-IN")}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">₹{order.total_amount.toLocaleString("en-IN")}</p>
                        <p className={`text-xs font-semibold capitalize ${
                          order.status === "delivered" ? "text-green-600" :
                          order.status === "pending" ? "text-yellow-600" :
                          order.status === "processing" ? "text-blue-600" :
                          "text-gray-600"
                        }`}>
                          {order.status}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Low Stock Alerts */}
            <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
              <div className="p-6 border-b border-border">
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-destructive" />
                  Low Stock Alert
                </h2>
              </div>
              <div className="divide-y divide-border">
                {loading ? (
                  <div className="p-6 text-center text-muted-foreground">Loading...</div>
                ) : stats.lowStockProducts.length === 0 ? (
                  <div className="p-6 text-center text-muted-foreground text-sm">All products in stock</div>
                ) : (
                  stats.lowStockProducts.map((product) => (
                    <div key={product.id} className="p-6 hover:bg-muted/30 transition-colors">
                      <p className="font-semibold text-foreground text-sm line-clamp-1">{product.name}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs text-destructive font-semibold">
                          {product.stock_quantity} units
                        </span>
                        <button className="text-xs text-primary hover:underline font-semibold">
                          Restock
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Refresh Info */}
          <div className="mt-8 text-center">
            <button
              onClick={fetchStats}
              className="text-sm text-primary hover:text-primary/80 font-semibold transition-colors"
            >
              Refresh Stats
            </button>
            <p className="text-xs text-muted-foreground mt-2">Data refreshes automatically every 30 seconds</p>
          </div>
        </main>
      </div>
    </div>
  )
}
