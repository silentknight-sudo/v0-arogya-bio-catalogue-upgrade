"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { BarChart3, TrendingUp, ShoppingCart, AlertTriangle } from "lucide-react"

interface DashboardStats {
  totalSales: number
  ordersToday: number
  lowStockProducts: number
  totalOrders: number
}

export default function DashboardContent() {
  const [stats, setStats] = useState<DashboardStats>({
    totalSales: 0,
    ordersToday: 0,
    lowStockProducts: 0,
    totalOrders: 0,
  })
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch total sales
        const { data: orders } = await supabase.from("orders").select("total_amount, created_at")

        const today = new Date().toISOString().split("T")[0]
        const ordersToday = orders?.filter((o) => o.created_at.split("T")[0] === today).length || 0
        const totalSales = orders?.reduce((sum, o) => sum + (o.total_amount || 0), 0) || 0

        // Fetch low stock products
        const { data: products } = await supabase.from("products").select("stock_quantity").lt("stock_quantity", 10)

        const lowStockProducts = products?.length || 0

        setStats({
          totalSales: Math.round(totalSales),
          ordersToday,
          lowStockProducts,
          totalOrders: orders?.length || 0,
        })
      } catch (error) {
        console.error("Error fetching stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statCards = [
    {
      icon: TrendingUp,
      label: "Total Sales",
      value: `₹${stats.totalSales.toLocaleString()}`,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      icon: ShoppingCart,
      label: "Orders Today",
      value: stats.ordersToday,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: BarChart3,
      label: "Total Orders",
      value: stats.totalOrders,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      icon: AlertTriangle,
      label: "Low Stock Items",
      value: stats.lowStockProducts,
      color: "text-red-600",
      bg: "bg-red-50",
    },
  ]

  if (loading) {
    return <div className="p-8">Loading dashboard...</div>
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your admin dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <div key={idx} className="bg-white rounded-lg shadow-sm p-6">
              <div className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center mb-4`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Recent Orders</h2>
          <p className="text-muted-foreground text-center py-8">Recent orders will be displayed here</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Revenue Graph</h2>
          <p className="text-muted-foreground text-center py-8">Revenue chart will be displayed here</p>
        </div>
      </div>
    </div>
  )
}
