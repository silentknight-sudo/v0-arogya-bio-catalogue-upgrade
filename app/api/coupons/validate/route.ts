import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

interface ValidateCouponRequest {
  code: string
  user_id: string
  order_total: number
  items: Array<{
    product_id: string
    quantity: number
    category?: string
  }>
}

export async function POST(request: NextRequest) {
  try {
    const body: ValidateCouponRequest = await request.json()

    console.log("[v0] Validating coupon:", body.code)

    const supabase = await createClient()

    // Find coupon by code
    const { data: coupons, error: couponError } = await supabase
      .from("coupons")
      .select("*")
      .ilike("code", body.code)
      .eq("is_active", true)
      .limit(1)

    if (couponError || !coupons || coupons.length === 0) {
      console.log("[v0] Coupon not found or inactive")
      return NextResponse.json(
        { valid: false, error: "Coupon code not found" },
        { status: 400 }
      )
    }

    const coupon = coupons[0]

    // Check if coupon has expired
    if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) {
      console.log("[v0] Coupon expired")
      return NextResponse.json(
        { valid: false, error: "Coupon has expired" },
        { status: 400 }
      )
    }

    // Check minimum order value
    if (coupon.min_order_value && body.order_total < coupon.min_order_value) {
      console.log("[v0] Order total below minimum:", body.order_total, "<", coupon.min_order_value)
      return NextResponse.json(
        {
          valid: false,
          error: `Minimum order value is ₹${coupon.min_order_value}`,
        },
        { status: 400 }
      )
    }

    // Check usage limit
    if (coupon.usage_limit) {
      const { count } = await supabase
        .from("coupon_usage")
        .select("id", { count: "exact" })
        .eq("coupon_id", coupon.id)

      if (count && count >= coupon.usage_limit) {
        console.log("[v0] Coupon usage limit exceeded")
        return NextResponse.json(
          { valid: false, error: "Coupon usage limit exceeded" },
          { status: 400 }
        )
      }
    }

    // Check per-user usage limit
    const { count: userUsageCount } = await supabase
      .from("coupon_usage")
      .select("id", { count: "exact" })
      .eq("coupon_id", coupon.id)
      .eq("user_id", body.user_id)

    if (
      coupon.per_user_limit &&
      userUsageCount &&
      userUsageCount >= coupon.per_user_limit
    ) {
      console.log("[v0] User has already used this coupon", userUsageCount, "times")
      return NextResponse.json(
        {
          valid: false,
          error: `You have already used this coupon ${coupon.per_user_limit} time(s)`,
        },
        { status: 400 }
      )
    }

    // Calculate discount
    let discountAmount = 0

    if (coupon.discount_type === "percentage") {
      discountAmount = (body.order_total * coupon.discount_value) / 100
      if (coupon.max_discount) {
        discountAmount = Math.min(discountAmount, coupon.max_discount)
      }
    } else if (coupon.discount_type === "fixed") {
      discountAmount = coupon.discount_value
    }

    console.log("[v0] Coupon validated successfully. Discount:", discountAmount)

    return NextResponse.json(
      {
        valid: true,
        coupon_id: coupon.id,
        discount_amount: discountAmount,
        discount_type: coupon.discount_type,
        original_discount: coupon.discount_value,
        message: `Discount of ₹${discountAmount.toFixed(2)} applied`,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("[v0] Coupon validation error:", error)
    return NextResponse.json(
      {
        valid: false,
        error: "Failed to validate coupon",
      },
      { status: 500 }
    )
  }
}
