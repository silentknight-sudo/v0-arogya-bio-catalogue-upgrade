"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { Trash2, ShoppingCart } from "lucide-react"

interface WishlistItem {
  id: string
  product_id: string
  created_at: string
  products: {
    id: string
    name: string
    price: number
    image_url: string
    category: string
  }
}

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser()

        if (!authUser) {
          router.push("/auth/login")
          return
        }

        setUser(authUser)

        const { data } = await supabase
          .from("wishlist")
          .select(
            `
            id,
            product_id,
            created_at,
            products:product_id (
              id,
              name,
              price,
              image_url,
              category
            )
          `,
          )
          .eq("user_id", authUser.id)
          .order("created_at", { ascending: false })

        if (data) {
          setWishlistItems(data as WishlistItem[])
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchWishlist()
  }, [])

  const removeFromWishlist = async (wishlistId: string) => {
    try {
      await supabase.from("wishlist").delete().eq("id", wishlistId)
      setWishlistItems(wishlistItems.filter((item) => item.id !== wishlistId))
    } catch (error) {
      console.error("Error removing from wishlist:", error)
    }
  }

  const addToCart = async (productId: string) => {
    try {
      const { data: existingItem } = await supabase
        .from("cart_items")
        .select("id, quantity")
        .eq("user_id", user.id)
        .eq("product_id", productId)
        .single()

      if (existingItem) {
        await supabase
          .from("cart_items")
          .update({ quantity: existingItem.quantity + 1 })
          .eq("id", existingItem.id)
      } else {
        await supabase.from("cart_items").insert({
          user_id: user.id,
          product_id: productId,
          quantity: 1,
        })
      }

      alert("Added to cart!")
    } catch (error) {
      console.error("Error adding to cart:", error)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">Loading wishlist...</div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-foreground mb-8">My Wishlist</h1>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6">Save your favorite products for later</p>
            <Link href="/shop">
              <Button className="bg-primary hover:bg-primary/90">Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <Link href={`/shop/${item.products.id}`}>
                  <div className="aspect-square bg-secondary/30 overflow-hidden cursor-pointer">
                    <img
                      src={item.products.image_url || "/placeholder.svg?height=300&width=300"}
                      alt={item.products.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                </Link>

                <div className="p-4">
                  <Link href={`/shop/${item.products.id}`}>
                    <h3 className="font-semibold text-foreground mb-2 hover:text-primary cursor-pointer transition-colors">
                      {item.products.name}
                    </h3>
                  </Link>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold text-primary">₹{item.products.price}</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      {item.products.category}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => addToCart(item.products.id)}
                      className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
