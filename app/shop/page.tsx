"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ShoppingCart } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRealtimeProducts } from "@/hooks/use-realtime-products"
import Link from "next/link"

interface Product {
  id: string
  name: string
  price: number
  category: string
  description: string
  image_url: string
  rating?: number
}

export default function ShopPage() {
  const { products, loading } = useRealtimeProducts()
  const [sortBy, setSortBy] = useState("popular")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [user, setUser] = useState<any>(null)
  const [addedToCart, setAddedToCart] = useState<string | null>(null)

  const supabase = createClient()

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser()
      setUser(authUser)
    }

    fetchUser()
  }, [])

  const categories = Array.from(new Set(products.map((p) => p.category))).sort()

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase())

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price
    if (sortBy === "price-high") return b.price - a.price
    if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0)
    return 0
  })

  const handleAddToCart = async (productId: string) => {
    try {
      if (!user) {
        // Guest user - use localStorage
        const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]")
        const existingItem = guestCart.find((item: any) => item.product_id === productId)

        if (existingItem) {
          existingItem.quantity += 1
        } else {
          guestCart.push({ product_id: productId, quantity: 1 })
        }

        localStorage.setItem("guestCart", JSON.stringify(guestCart))
        setAddedToCart(productId)
        setTimeout(() => setAddedToCart(null), 2000)
        return
      }

      // Authenticated user - use database
      const { data: existingItem } = await supabase
        .from("cart_items")
        .select("id, quantity")
        .eq("user_id", user.id)
        .eq("product_id", productId)
        .maybeSingle()

      if (existingItem) {
        // Update quantity
        await supabase
          .from("cart_items")
          .update({ quantity: existingItem.quantity + 1 })
          .eq("id", existingItem.id)
      } else {
        // Add new item
        await supabase.from("cart_items").insert({
          user_id: user.id,
          product_id: productId,
          quantity: 1,
        })
      }

      setAddedToCart(productId)
      setTimeout(() => setAddedToCart(null), 2000)
    } catch (error) {
      console.error("[v0] Error adding to cart:", error)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">Loading products...</div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Shop Ayurvedic Products</h1>
        <p className="text-muted-foreground mb-8">Discover our authentic collection of Ayurvedic wellness products</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filters */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h3 className="font-bold text-foreground mb-4">Categories</h3>
              <div className="space-y-2 mb-6">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === "all"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/30 text-foreground hover:bg-secondary/50"
                  }`}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat.toLowerCase())}
                    className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === cat.toLowerCase()
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary/30 text-foreground hover:bg-secondary/50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <h3 className="font-bold text-foreground mb-4 pt-6 border-t border-border">Sort By</h3>
              <div className="space-y-2">
                {[
                  { value: "popular", label: "Popular" },
                  { value: "price-low", label: "Price: Low to High" },
                  { value: "price-high", label: "Price: High to Low" },
                  { value: "rating", label: "Highest Rated" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSortBy(option.value)}
                    className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      sortBy === option.value
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary/30 text-foreground hover:bg-secondary/50"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="md:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <Link href={`/shop/${product.id}`}>
                    <div className="aspect-square bg-secondary/30 overflow-hidden cursor-pointer">
                      <img
                        src={product.image_url || "/placeholder.svg?height=300&width=300&query=ayurvedic-product"}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                  </Link>

                  <div className="p-4">
                    <Link href={`/shop/${product.id}`}>
                      <h3 className="font-semibold text-foreground mb-2 hover:text-primary transition-colors cursor-pointer">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-bold text-primary">₹{product.price}</span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">{product.category}</span>
                    </div>

                    <button
                      onClick={() => handleAddToCart(product.id)}
                      className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                        addedToCart === product.id
                          ? "bg-green-600 text-white"
                          : "bg-primary hover:bg-primary/90 text-primary-foreground"
                      }`}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      {addedToCart === product.id ? "Added!" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No products found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
