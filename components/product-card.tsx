"use client"

import { Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"

interface Product {
  id: string
  name: string
  price: number
  originalPrice: number
  rating: number
  badge?: string
  image: string
}

interface ProductCardProps {
  product: Product
  isInWishlist: boolean
  onWishlistToggle: () => void
}

export default function ProductCard({ product, isInWishlist, onWishlistToggle }: ProductCardProps) {
  const [addedToCart, setAddedToCart] = useState(false)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const handleAddToCart = async () => {
    try {
      setLoading(true)
      console.log("[v0] ProductCard add to cart - product.id:", product.id, "Type:", typeof product.id)
      
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        // Guest user - use localStorage
        const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]")
        console.log("[v0] ProductCard: Current guest cart:", guestCart)
        console.log("[v0] ProductCard: Adding product ID:", product.id)
        
        const existingItem = guestCart.find((item: any) => item.product_id === product.id)

        if (existingItem) {
          existingItem.quantity += 1
          console.log("[v0] ProductCard: Updated existing item to quantity:", existingItem.quantity)
        } else {
          guestCart.push({ product_id: product.id, quantity: 1 })
          console.log("[v0] ProductCard: Added new item to cart")
        }

        localStorage.setItem("guestCart", JSON.stringify(guestCart))
        const saved = JSON.parse(localStorage.getItem("guestCart") || "[]")
        console.log("[v0] ProductCard: Saved to localStorage:", saved)
        
        setAddedToCart(true)
        setTimeout(() => setAddedToCart(false), 2000)
        return
      }

      // Authenticated user - use database
      const { data: existingItem } = await supabase
        .from("cart_items")
        .select("id, quantity")
        .eq("user_id", user.id)
        .eq("product_id", product.id)
        .maybeSingle()

      if (existingItem) {
        await supabase
          .from("cart_items")
          .update({ quantity: existingItem.quantity + 1 })
          .eq("id", existingItem.id)
      } else {
        await supabase.from("cart_items").insert({
          user_id: user.id,
          product_id: product.id,
          quantity: 1,
        })
      }

      setAddedToCart(true)
      setTimeout(() => setAddedToCart(false), 2000)
    } catch (error) {
      console.error("[v0] Error adding to cart:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
      {/* Image Container */}
      <div className="relative overflow-hidden h-64 bg-secondary/30">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
            {product.badge}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={onWishlistToggle}
          className="absolute top-4 right-4 p-2 rounded-full bg-white hover:bg-primary hover:text-white transition-colors"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${isInWishlist ? "fill-current text-primary" : "text-foreground"}`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{product.name}</h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <span className="text-sm text-primary">★★★★★</span>
          <span className="text-sm text-muted-foreground">{product.rating}/5</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-bold text-primary">₹{product.price}</span>
          {product.originalPrice > product.price && (
            <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice}</span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          disabled={loading}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center gap-2 rounded-lg disabled:opacity-50"
        >
          <ShoppingCart className="w-4 h-4" />
          {addedToCart ? "Added!" : "Add to Cart"}
        </Button>
      </div>
    </div>
  )
}
