import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    // Verify admin session
    const cookieStore = await cookies()
    const adminCookie = cookieStore.get("admin_session")?.value

    console.log("[v0] Admin stats API called")

    if (!adminCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Use service role for admin access
    const supabase = await createClient({ roleOverride: "admin" })

    // Fetch all stats in parallel
    console.log("[v0] Fetching admin statistics...")

    const [
      { data: ordersData, count: totalOrders },
      { data: ordersDelivered, count: deliveredCount },
      { count: totalUsers },
      { count: totalProducts },
    ] = await Promise.all([
      // Total orders and revenue
      supabase
        .from("orders")
        .select("total_amount", { count: "exact" })
        .order("created_at", { ascending: false })
        .limit(1),

      // Delivered orders (for revenue)
      supabase
        .from("orders")
        .select("total_amount", { count: "exact" })
        .eq("status", "delivered")
        .limit(1),

      // Total users (profiles)
      supabase
        .from("profiles")
        .select("id", { count: "exact", head: true }),

      // Total products
      supabase
        .from("products")
        .select("id", { count: "exact", head: true }),
    ])

    // Calculate total revenue (delivered orders)
    let totalRevenue = 0
    if (ordersDelivered && ordersDelivered.length > 0) {
      totalRevenue = ordersDelivered.reduce((sum, order) => sum + (order.total_amount || 0), 0)
    }

    // Get recent orders for dashboard
    const { data: recentOrders } = await supabase
      .from("orders")
      .select("id, total_amount, status, created_at, user_id")
      .order("created_at", { ascending: false })
      .limit(5)

    // Get low stock products
    const { data: lowStock } = await supabase
      .from("products")
      .select("id, name, stock_quantity")
      .lt("stock_quantity", 10)
      .limit(5)

    console.log("[v0] Admin stats: Orders:", totalOrders, "Users:", totalUsers, "Products:", totalProducts)

    return NextResponse.json(
      {
        stats: {
          totalOrders: totalOrders || 0,
          totalRevenue,
          totalUsers: totalUsers || 0,
          totalProducts: totalProducts || 0,
          recentOrders: recentOrders || [],
          lowStockProducts: lowStock || [],
        },
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("[v0] Admin stats API error:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch statistics",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
