"use server"

import { createClient } from "@/lib/supabase/server"

// Sync guest cart to user account when they login
export async function syncGuestCartToUser(guestCart: Array<{ product_id: string; quantity: number }>) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { error: "User not authenticated" }
    }

    for (const item of guestCart) {
      const { data: existingItem } = await supabase
        .from("cart_items")
        .select("id, quantity")
        .eq("user_id", user.id)
        .eq("product_id", item.product_id)
        .maybeSingle()

      if (existingItem) {
        await supabase
          .from("cart_items")
          .update({ quantity: existingItem.quantity + item.quantity })
          .eq("id", existingItem.id)
      } else {
        await supabase.from("cart_items").insert({
          user_id: user.id,
          product_id: item.product_id,
          quantity: item.quantity,
        })
      }
    }

    return { success: true }
  } catch (error) {
    return { error: "Failed to sync cart" }
  }
}

export async function addToCart(productId: string, quantity = 1) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { error: "User not authenticated" }
    }

    const { data: existingItem, error: selectError } = await supabase
      .from("cart_items")
      .select("id, quantity")
      .eq("user_id", user.id)
      .eq("product_id", productId)
      .maybeSingle()

    if (selectError && selectError.code !== "PGRST116") {
      return { error: selectError.message }
    }

    if (existingItem) {
      // Update quantity
      const { error } = await supabase
        .from("cart_items")
        .update({ quantity: existingItem.quantity + quantity })
        .eq("id", existingItem.id)

      if (error) return { error: error.message }
      return { success: true }
    }

    // Add new item
    const { error } = await supabase.from("cart_items").insert({
      user_id: user.id,
      product_id: productId,
      quantity,
    })

    if (error) return { error: error.message }
    return { success: true }
  } catch (error) {
    return { error: "Failed to add to cart" }
  }
}

export async function removeFromCart(cartItemId: string) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { error: "User not authenticated" }
    }

    const { error } = await supabase.from("cart_items").delete().eq("id", cartItemId).eq("user_id", user.id)

    if (error) return { error: error.message }
    return { success: true }
  } catch (error) {
    return { error: "Failed to remove from cart" }
  }
}

export async function updateCartItemQuantity(cartItemId: string, quantity: number) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { error: "User not authenticated" }
    }

    const { error } = await supabase.from("cart_items").update({ quantity }).eq("id", cartItemId).eq("user_id", user.id)

    if (error) return { error: error.message }
    return { success: true }
  } catch (error) {
    return { error: "Failed to update cart" }
  }
}
