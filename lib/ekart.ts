import crypto from "crypto"

// Ekart API Configuration
const EKART_API_BASE = process.env.EKART_API_BASE || "https://apistg.ekart.com/api"
const EKART_MERCHANT_ID = process.env.EKART_MERCHANT_ID
const EKART_API_KEY = process.env.EKART_API_KEY
const EKART_WAREHOUSE_ID = process.env.EKART_WAREHOUSE_ID

// Interface for shipment creation request
export interface CreateShipmentRequest {
  orderId: string
  recipientName: string
  recipientPhone: string
  recipientEmail?: string
  recipientAddress: string
  recipientCity: string
  recipientState: string
  recipientPincode: string
  weightKg: number
  lengthCm?: number
  widthCm?: number
  heightCm?: number
  productDescription: string
  orderValue: number
  paymentMode?: "CASH" | "PREPAID" | "CARD" // CASH for COD
}

// Interface for shipment response
export interface ShipmentResponse {
  success: boolean
  message: string
  shipmentId?: string
  orderId?: string
  trackingNumber?: string
  labelUrl?: string
  manifestUrl?: string
  error?: string
}

// Generate HMAC signature for API authentication
function generateSignature(data: string): string {
  if (!EKART_API_KEY) throw new Error("EKART_API_KEY not configured")
  return crypto.createHmac("sha256", EKART_API_KEY).update(data).digest("hex")
}

// Create shipment with Ekart
export async function createShipment(request: CreateShipmentRequest): Promise<ShipmentResponse> {
  try {
    if (!EKART_MERCHANT_ID || !EKART_API_KEY || !EKART_WAREHOUSE_ID) {
      console.error("[v0] Ekart credentials not configured")
      return {
        success: false,
        message: "Ekart credentials not configured",
        error: "MISSING_CREDENTIALS",
      }
    }

    const payload = {
      merchant_id: EKART_MERCHANT_ID,
      warehouse_id: EKART_WAREHOUSE_ID,
      order_id: request.orderId,
      recipient_name: request.recipientName,
      recipient_phone: request.recipientPhone,
      recipient_email: request.recipientEmail || "",
      recipient_address: request.recipientAddress,
      recipient_city: request.recipientCity,
      recipient_state: request.recipientState,
      recipient_pincode: request.recipientPincode,
      weight: request.weightKg,
      length: request.lengthCm || 0,
      width: request.widthCm || 0,
      height: request.heightCm || 0,
      product_description: request.productDescription,
      order_value: request.orderValue,
      payment_mode: request.paymentMode || "CASH",
      cod_amount: request.paymentMode === "CASH" ? request.orderValue : 0,
    }

    const payloadStr = JSON.stringify(payload)
    const signature = generateSignature(payloadStr)

    const response = await fetch(`${EKART_API_BASE}/shipment/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${EKART_MERCHANT_ID}`,
        "X-Signature": signature,
      },
      body: payloadStr,
    })

    if (!response.ok) {
      const error = await response.text()
      console.error("[v0] Ekart API error:", error)
      return {
        success: false,
        message: "Failed to create shipment",
        error: error,
      }
    }

    const data = await response.json()

    return {
      success: true,
      message: "Shipment created successfully",
      shipmentId: data.shipment_id,
      orderId: data.order_id,
      trackingNumber: data.tracking_number,
      labelUrl: data.label_url,
      manifestUrl: data.manifest_url,
    }
  } catch (error) {
    console.error("[v0] Create shipment error:", error instanceof Error ? error.message : String(error))
    return {
      success: false,
      message: "Failed to create shipment",
      error: error instanceof Error ? error.message : String(error),
    }
  }
}

// Get shipment tracking status
export async function getShipmentTracking(trackingNumber: string): Promise<ShipmentResponse> {
  try {
    if (!EKART_MERCHANT_ID || !EKART_API_KEY) {
      return {
        success: false,
        message: "Ekart credentials not configured",
        error: "MISSING_CREDENTIALS",
      }
    }

    const signature = generateSignature(trackingNumber)

    const response = await fetch(`${EKART_API_BASE}/shipment/track/${trackingNumber}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${EKART_MERCHANT_ID}`,
        "X-Signature": signature,
      },
    })

    if (!response.ok) {
      const error = await response.text()
      console.error("[v0] Ekart tracking error:", error)
      return {
        success: false,
        message: "Failed to get tracking status",
        error: error,
      }
    }

    const data = await response.json()

    return {
      success: true,
      message: "Tracking data retrieved",
      shipmentId: data.shipment_id,
      orderId: data.order_id,
      trackingNumber: data.tracking_number,
    }
  } catch (error) {
    console.error("[v0] Tracking error:", error instanceof Error ? error.message : String(error))
    return {
      success: false,
      message: "Failed to get tracking status",
      error: error instanceof Error ? error.message : String(error),
    }
  }
}

// Calculate shipping cost
export async function calculateShippingCost(
  pincode: string,
  weightKg: number
): Promise<{ success: boolean; cost?: number; error?: string }> {
  try {
    if (!EKART_MERCHANT_ID || !EKART_API_KEY) {
      return {
        success: false,
        error: "Ekart credentials not configured",
      }
    }

    const payload = {
      merchant_id: EKART_MERCHANT_ID,
      destination_pincode: pincode,
      weight: weightKg,
    }

    const payloadStr = JSON.stringify(payload)
    const signature = generateSignature(payloadStr)

    const response = await fetch(`${EKART_API_BASE}/shipment/calculate-rate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${EKART_MERCHANT_ID}`,
        "X-Signature": signature,
      },
      body: payloadStr,
    })

    if (!response.ok) {
      const error = await response.text()
      console.error("[v0] Rate calculation error:", error)
      return { success: false, error: error }
    }

    const data = await response.json()
    return { success: true, cost: data.shipping_cost }
  } catch (error) {
    console.error("[v0] Rate calculation error:", error instanceof Error ? error.message : String(error))
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}

// Schedule pickup
export async function schedulePickup(
  pickupDate: string
): Promise<{ success: boolean; pickupId?: string; error?: string }> {
  try {
    if (!EKART_MERCHANT_ID || !EKART_API_KEY || !EKART_WAREHOUSE_ID) {
      return {
        success: false,
        error: "Ekart credentials not configured",
      }
    }

    const payload = {
      merchant_id: EKART_MERCHANT_ID,
      warehouse_id: EKART_WAREHOUSE_ID,
      pickup_date: pickupDate,
    }

    const payloadStr = JSON.stringify(payload)
    const signature = generateSignature(payloadStr)

    const response = await fetch(`${EKART_API_BASE}/pickup/schedule`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${EKART_MERCHANT_ID}`,
        "X-Signature": signature,
      },
      body: payloadStr,
    })

    if (!response.ok) {
      const error = await response.text()
      console.error("[v0] Pickup scheduling error:", error)
      return { success: false, error: error }
    }

    const data = await response.json()
    return { success: true, pickupId: data.pickup_id }
  } catch (error) {
    console.error("[v0] Pickup scheduling error:", error instanceof Error ? error.message : String(error))
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}

// Create return shipment
export async function createReturnShipment(
  originalShipmentId: string,
  reason: string
): Promise<ShipmentResponse> {
  try {
    if (!EKART_MERCHANT_ID || !EKART_API_KEY) {
      return {
        success: false,
        message: "Ekart credentials not configured",
        error: "MISSING_CREDENTIALS",
      }
    }

    const payload = {
      merchant_id: EKART_MERCHANT_ID,
      shipment_id: originalShipmentId,
      return_reason: reason,
    }

    const payloadStr = JSON.stringify(payload)
    const signature = generateSignature(payloadStr)

    const response = await fetch(`${EKART_API_BASE}/return/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${EKART_MERCHANT_ID}`,
        "X-Signature": signature,
      },
      body: payloadStr,
    })

    if (!response.ok) {
      const error = await response.text()
      console.error("[v0] Return shipment error:", error)
      return {
        success: false,
        message: "Failed to create return shipment",
        error: error,
      }
    }

    const data = await response.json()

    return {
      success: true,
      message: "Return shipment created",
      shipmentId: data.shipment_id,
      trackingNumber: data.tracking_number,
    }
  } catch (error) {
    console.error("[v0] Create return error:", error instanceof Error ? error.message : String(error))
    return {
      success: false,
      message: "Failed to create return shipment",
      error: error instanceof Error ? error.message : String(error),
    }
  }
}

// Cancel shipment
export async function cancelShipment(shipmentId: string): Promise<ShipmentResponse> {
  try {
    if (!EKART_MERCHANT_ID || !EKART_API_KEY) {
      return {
        success: false,
        message: "Ekart credentials not configured",
        error: "MISSING_CREDENTIALS",
      }
    }

    const payload = {
      merchant_id: EKART_MERCHANT_ID,
      shipment_id: shipmentId,
    }

    const payloadStr = JSON.stringify(payload)
    const signature = generateSignature(payloadStr)

    const response = await fetch(`${EKART_API_BASE}/shipment/cancel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${EKART_MERCHANT_ID}`,
        "X-Signature": signature,
      },
      body: payloadStr,
    })

    if (!response.ok) {
      const error = await response.text()
      console.error("[v0] Cancel shipment error:", error)
      return {
        success: false,
        message: "Failed to cancel shipment",
        error: error,
      }
    }

    return {
      success: true,
      message: "Shipment cancelled successfully",
    }
  } catch (error) {
    console.error("[v0] Cancel shipment error:", error instanceof Error ? error.message : String(error))
    return {
      success: false,
      message: "Failed to cancel shipment",
      error: error instanceof Error ? error.message : String(error),
    }
  }
}
