// Razorpay client setup for Next.js
// This file handles Razorpay configuration and checkout session creation

export interface RazorpayOrderParams {
  amount: number // Amount in paise (e.g., 1000 = ₹10)
  currency: string
  receipt: string
  description: string
  customer_notify: number
  notes?: Record<string, string>
}

export interface RazorpayOrder {
  id: string
  entity: string
  amount: number
  amount_paid: number
  amount_due: number
  currency: string
  receipt: string
  offer_id: string | null
  status: string
  attempts: number
  notes: Record<string, string>
  created_at: number
}

export async function createRazorpayOrder(
  params: RazorpayOrderParams
): Promise<RazorpayOrder> {
  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET

  if (!keyId || !keySecret) {
    throw new Error("Razorpay keys not configured")
  }

  const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64")

  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(`Razorpay API error: ${error.description}`)
  }

  return await response.json()
}

export async function verifyRazorpayPayment(
  orderId: string,
  paymentId: string,
  signature: string
): Promise<boolean> {
  const crypto = require("crypto")
  const keySecret = process.env.RAZORPAY_KEY_SECRET

  if (!keySecret) {
    throw new Error("Razorpay key secret not configured")
  }

  const body = `${orderId}|${paymentId}`
  const expectedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(body)
    .digest("hex")

  return expectedSignature === signature
}
