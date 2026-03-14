"use server"

import { createClient } from "@/lib/supabase/server"
import { createRazorpayOrder, verifyRazorpayPayment } from "@/lib/razorpay"
import { redirect } from "next/navigation"

export async function createCheckoutSession(cartItems: any[]) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Calculate total amount in paise
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalPaise = Math.round(totalAmount * 100)

  if (totalPaise <= 0) {
    throw new Error("Invalid cart total")
  }

  try {
    // Create Razorpay order
    const order = await createRazorpayOrder({
      amount: totalPaise,
      currency: "INR",
      receipt: `order_${user.id}_${Date.now()}`,
      description: `ArogyaBio Order - ${cartItems.length} items`,
      customer_notify: 1,
      notes: {
        user_id: user.id,
        user_email: user.email || "",
        item_count: cartItems.length.toString(),
      },
    })

    return {
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    }
  } catch (error) {
    console.error("[v0] Razorpay order creation failed:", error)
    throw error
  }
}

export async function verifyPayment(
  orderId: string,
  paymentId: string,
  signature: string
) {
  try {
    // Verify signature
    const isValid = await verifyRazorpayPayment(orderId, paymentId, signature)

    if (!isValid) {
      throw new Error("Invalid payment signature")
    }

    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      throw new Error("User not authenticated")
    }

    // Get cart items
    const { data: cartItems } = await supabase
      .from("cart_items")
      .select("*, products(name, price, image_url)")
      .eq("user_id", user.id)

    if (!cartItems || cartItems.length === 0) {
      throw new Error("Cart is empty")
    }

    // Calculate total
    const totalAmount = cartItems.reduce(
      (sum: number, item: any) => sum + item.products.price * item.quantity,
      0
    )

    // Create order in database
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        total_amount: totalAmount,
        status: "completed",
        razorpay_order_id: orderId,
        razorpay_payment_id: paymentId,
      })
      .select()
      .single()

    if (orderError) {
      throw new Error(`Failed to create order: ${orderError.message}`)
    }

    // Create order items
    const orderItemsData = cartItems.map((item: any) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price_at_purchase: item.products.price,
    }))

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItemsData)

    if (itemsError) {
      throw new Error(`Failed to create order items: ${itemsError.message}`)
    }

    // Clear cart
    await supabase.from("cart_items").delete().eq("user_id", user.id)

    return {
      success: true,
      orderId: order.id,
      razorpayOrderId: orderId,
    }
  } catch (error) {
    console.error("[v0] Payment verification failed:", error)
    throw error
  }
}
