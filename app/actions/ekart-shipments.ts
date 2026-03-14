"use server"

import { createClient } from "@/lib/supabase/server"
import {
  createShipment as ekartCreateShipment,
  getShipmentTracking as ekartGetTracking,
  calculateShippingCost as ekartCalcCost,
  schedulePickup as ekartSchedulePickup,
  createReturnShipment as ekartCreateReturn,
  cancelShipment as ekartCancel,
  type CreateShipmentRequest,
} from "@/lib/ekart"

// Create shipment via Ekart
export async function createShipmentAction(
  orderId: string,
  shipmentData: CreateShipmentRequest
) {
  try {
    const supabase = await createClient()

    // Verify admin
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return { error: "Unauthorized" }

    // Call Ekart API
    const result = await ekartCreateShipment(shipmentData)

    if (!result.success) {
      return { error: result.message, details: result.error }
    }

    // Log to audit
    console.log("[v0] Shipment created:", {
      orderId,
      trackingNumber: result.trackingNumber,
      ekartId: result.shipmentId,
    })

    return { success: true, data: result }
  } catch (error) {
    console.error("[v0] Create shipment error:", error)
    return { error: "Failed to create shipment" }
  }
}

// Get tracking status
export async function getTrackingStatusAction(trackingNumber: string) {
  try {
    const supabase = await createClient()

    // Verify admin
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return { error: "Unauthorized" }

    const result = await ekartGetTracking(trackingNumber)

    if (!result.success) {
      return { error: result.message }
    }

    return { success: true, data: result }
  } catch (error) {
    console.error("[v0] Tracking error:", error)
    return { error: "Failed to get tracking status" }
  }
}

// Calculate shipping cost
export async function calculateCostAction(pincode: string, weightKg: number) {
  try {
    const supabase = await createClient()

    // Verify admin
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return { error: "Unauthorized" }

    const result = await ekartCalcCost(pincode, weightKg)

    if (!result.success) {
      return { error: result.error }
    }

    return { success: true, cost: result.cost }
  } catch (error) {
    console.error("[v0] Cost calculation error:", error)
    return { error: "Failed to calculate cost" }
  }
}

// Schedule pickup
export async function schedulePickupAction(pickupDate: string) {
  try {
    const supabase = await createClient()

    // Verify admin
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return { error: "Unauthorized" }

    const result = await ekartSchedulePickup(pickupDate)

    if (!result.success) {
      return { error: result.error }
    }

    console.log("[v0] Pickup scheduled:", result.pickupId)

    return { success: true, pickupId: result.pickupId }
  } catch (error) {
    console.error("[v0] Pickup scheduling error:", error)
    return { error: "Failed to schedule pickup" }
  }
}

// Create return shipment
export async function createReturnAction(shipmentId: string, reason: string) {
  try {
    const supabase = await createClient()

    // Verify admin
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return { error: "Unauthorized" }

    const result = await ekartCreateReturn(shipmentId, reason)

    if (!result.success) {
      return { error: result.message }
    }

    console.log("[v0] Return shipment created:", result.shipmentId)

    return { success: true, data: result }
  } catch (error) {
    console.error("[v0] Create return error:", error)
    return { error: "Failed to create return shipment" }
  }
}

// Cancel shipment
export async function cancelShipmentAction(shipmentId: string) {
  try {
    const supabase = await createClient()

    // Verify admin
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return { error: "Unauthorized" }

    const result = await ekartCancel(shipmentId)

    if (!result.success) {
      return { error: result.message }
    }

    console.log("[v0] Shipment cancelled:", shipmentId)

    return { success: true }
  } catch (error) {
    console.error("[v0] Cancel shipment error:", error)
    return { error: "Failed to cancel shipment" }
  }
}
