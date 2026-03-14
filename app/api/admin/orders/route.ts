import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    // Verify admin session from cookies
    const cookieStore = await cookies()
    const adminCookie = cookieStore.get("admin_session")?.value

    console.log("[v0] API GET /admin/orders called")
    console.log("[v0] Admin cookie present:", !!adminCookie)

    if (!adminCookie) {
      console.log("[v0] No admin session cookie found - returning 401")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get query parameters for filtering
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "20")
    const status = searchParams.get("status")
    const offset = (page - 1) * limit

    console.log("[v0] Admin orders API: Fetching with pagination", { page, limit, status })

    // Use service role to bypass RLS - admin has full access
    const supabase = await createClient({ roleOverride: "admin" })

    // Build the query to fetch orders with order items and products
    let query = supabase
      .from("orders")
      .select(
        `
        id,
        user_id,
        total_amount,
        status,
        shipping_address,
        payment_method,
        created_at,
        order_items (id, product_id, quantity, price_at_purchase, products (id, name, category, price))
      `,
        { count: "exact" }
      )

    // Apply filters
    if (status && status !== "all") {
      query = query.eq("status", status)
    }

    // Apply ordering and pagination
    query = query.order("created_at", { ascending: false }).range(offset, offset + limit - 1)

    console.log("[v0] Admin orders API: Executing query...")
    const { data: orders, error: ordersError, count } = await query

    if (ordersError) {
      console.error("[v0] Admin orders API: Error fetching orders:", ordersError.message)
      return NextResponse.json(
        { error: "Failed to fetch orders", details: ordersError.message },
        { status: 500 }
      )
    }

    console.log("[v0] Admin orders API: Found", orders?.length || 0, "orders, total count:", count)

    if (!orders || orders.length === 0) {
      console.log("[v0] Admin orders API: No orders found")
      return NextResponse.json({
        orders: [],
        count: count || 0,
        page,
        limit,
        totalPages: Math.ceil((count || 0) / limit),
      })
    }

    // Fetch user profiles for each order
    console.log("[v0] Admin orders API: Fetching user profiles...")
    const userIds = [...new Set(orders.map((o) => o.user_id))]
    const { data: profiles, error: profilesError } = await supabase
      .from("profiles")
      .select("id, first_name, last_name, phone")
      .in("id", userIds)

    console.log("[v0] Admin orders API: Fetched", profiles?.length || 0, "profiles")

    if (profilesError) {
      console.warn("[v0] Admin orders API: Warning fetching profiles:", profilesError.message)
    }

    // Fetch emails from auth API using admin API (service role)
    let emailMap: Record<string, string> = {}
    try {
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers()
      if (!authError && authUsers?.users) {
        emailMap = authUsers.users.reduce(
          (acc, user) => {
            acc[user.id] = user.email || "N/A"
            return acc
          },
          {} as Record<string, string>
        )
      }
    } catch (err) {
      console.warn("[v0] Admin orders API: Could not fetch auth users:", err)
    }

    const profileMap = profiles?.reduce(
      (acc, profile) => {
        acc[profile.id] = {
          ...profile,
          email: emailMap[profile.id] || "N/A",
        }
        return acc
      },
      {} as Record<string, any>
    ) || {}

    // Enrich orders with user data
    const enrichedOrders = orders.map((order) => ({
      ...order,
      customer: profileMap[order.user_id] || { first_name: "Unknown", last_name: "User", email: "N/A" },
    }))

    console.log("[v0] Admin orders API: Returning", enrichedOrders.length, "enriched orders")

    return NextResponse.json(
      {
        orders: enrichedOrders,
        count: count || 0,
        page,
        limit,
        totalPages: Math.ceil((count || 0) / limit),
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("[v0] Admin orders API: Caught error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    // Verify admin session
    const cookieStore = await cookies()
    const adminCookie = cookieStore.get("admin_session")?.value

    console.log("[v0] API PATCH /admin/orders called")

    if (!adminCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { orderId, status } = body

    if (!orderId || !status) {
      return NextResponse.json({ error: "Missing orderId or status" }, { status: 400 })
    }

    console.log("[v0] Admin orders API: Updating order", orderId, "to status", status)

    const supabase = await createClient({ roleOverride: "admin" })

    const { data, error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", orderId)
      .select()

    if (error) {
      console.error("[v0] Admin orders API: Error updating order:", error.message)
      return NextResponse.json(
        { error: "Failed to update order", details: error.message },
        { status: 500 }
      )
    }

    console.log("[v0] Admin orders API: Order updated successfully")

    return NextResponse.json({ success: true, order: data?.[0] }, { status: 200 })
  } catch (error) {
    console.error("[v0] Admin orders API PATCH: Caught error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
