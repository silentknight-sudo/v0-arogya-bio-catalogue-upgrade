import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const adminCookie = cookieStore.get("admin_session")?.value

    console.log("[v0] Admin coupons API GET called")

    if (!adminCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "20")
    const offset = (page - 1) * limit

    const supabase = await createClient({ roleOverride: "admin" })

    const { data: coupons, error, count } = await supabase
      .from("coupons")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      console.error("[v0] Error fetching coupons:", error.message)
      return NextResponse.json(
        { error: "Failed to fetch coupons", details: error.message },
        { status: 500 }
      )
    }

    console.log("[v0] Coupons fetched:", coupons?.length || 0)

    return NextResponse.json(
      {
        coupons: coupons || [],
        count: count || 0,
        page,
        limit,
        totalPages: Math.ceil((count || 0) / limit),
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("[v0] Admin coupons API error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const adminCookie = cookieStore.get("admin_session")?.value

    if (!adminCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const supabase = await createClient({ roleOverride: "admin" })

    console.log("[v0] Creating new coupon:", body.code)

    const { data: coupon, error } = await supabase
      .from("coupons")
      .insert({
        code: body.code.toUpperCase(),
        description: body.description,
        discount_type: body.discount_type,
        discount_value: body.discount_value,
        max_discount: body.max_discount,
        min_order_value: body.min_order_value,
        applicable_type: body.applicable_type,
        applicable_products: body.applicable_products || [],
        applicable_categories: body.applicable_categories || [],
        usage_limit: body.usage_limit,
        per_user_limit: body.per_user_limit,
        is_active: body.is_active,
        expires_at: body.expires_at,
      })
      .select()
      .single()

    if (error) {
      console.error("[v0] Error creating coupon:", error.message)
      return NextResponse.json(
        { error: "Failed to create coupon", details: error.message },
        { status: 500 }
      )
    }

    console.log("[v0] Coupon created successfully:", coupon.id)

    return NextResponse.json(coupon, { status: 201 })
  } catch (error) {
    console.error("[v0] Admin coupons POST error:", error)
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
    const cookieStore = await cookies()
    const adminCookie = cookieStore.get("admin_session")?.value

    if (!adminCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const supabase = await createClient({ roleOverride: "admin" })

    console.log("[v0] Updating coupon:", body.id)

    const { data: coupon, error } = await supabase
      .from("coupons")
      .update({
        description: body.description,
        discount_type: body.discount_type,
        discount_value: body.discount_value,
        max_discount: body.max_discount,
        min_order_value: body.min_order_value,
        applicable_type: body.applicable_type,
        applicable_products: body.applicable_products || [],
        applicable_categories: body.applicable_categories || [],
        usage_limit: body.usage_limit,
        per_user_limit: body.per_user_limit,
        is_active: body.is_active,
        expires_at: body.expires_at,
      })
      .eq("id", body.id)
      .select()
      .single()

    if (error) {
      console.error("[v0] Error updating coupon:", error.message)
      return NextResponse.json(
        { error: "Failed to update coupon", details: error.message },
        { status: 500 }
      )
    }

    console.log("[v0] Coupon updated successfully:", coupon.id)

    return NextResponse.json(coupon, { status: 200 })
  } catch (error) {
    console.error("[v0] Admin coupons PATCH error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const adminCookie = cookieStore.get("admin_session")?.value

    if (!adminCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Missing coupon id" }, { status: 400 })
    }

    const supabase = await createClient({ roleOverride: "admin" })

    console.log("[v0] Deleting coupon:", id)

    const { error } = await supabase.from("coupons").delete().eq("id", id)

    if (error) {
      console.error("[v0] Error deleting coupon:", error.message)
      return NextResponse.json(
        { error: "Failed to delete coupon", details: error.message },
        { status: 500 }
      )
    }

    console.log("[v0] Coupon deleted successfully")

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("[v0] Admin coupons DELETE error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
