"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { X, Minus, Plus } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface CartItem {
  id?: string
  product_id: string
  quantity: number
  products?: {
    name: string
    price: number
    image_url: string
  }
  name?: string
  price?: number
  image_url?: string
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [products, setProducts] = useState<Record<string, any>>({})
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (user) {
          // Authenticated user - fetch from database
          setIsAuthenticated(true)
          const { data } = await supabase
            .from("cart_items")
            .select(`
              id,
              product_id,
              quantity,
              products:product_id (
                name,
                price,
                image_url
              )
            `)
            .eq("user_id", user.id)

          if (data) {
            console.log("[v0] Authenticated cart items:", data)
            setCartItems(data as CartItem[])
          }
        } else {
          // Guest user - fetch from localStorage
          setIsAuthenticated(false)
          const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]")
          
          if (guestCart.length > 0) {
            // Fetch ALL products and match locally (handles mixed ID formats)
            const productIds = guestCart.map((item: any) => item.product_id)
            
            const { data: allProducts } = await supabase
              .from("products")
              .select("id, name, price, image_url")

            if (allProducts) {
              const productsMap: Record<string, any> = {}
              const foundIds = new Set<string>()
              
              // Build map and find matches
              allProducts.forEach((p) => {
                productsMap[p.id] = p
                // Check if this product is in the cart (by UUID or any format)
                if (productIds.includes(p.id)) {
                  foundIds.add(p.id)
                }
              })
              
              setProducts(productsMap)
              setCartItems(guestCart)
            }
          }
        }
      } catch (error) {
        console.error("[v0] Error fetching cart:", error)
      } finally {
        setLoading(false)
      }
    }

    // Small delay to ensure localStorage is available after client-side hydration
    setTimeout(() => {
      fetchCart()
    }, 100)
  }, [])

  const subtotal = cartItems.reduce((sum, item) => {
    const price = isAuthenticated 
      ? item.products?.price || 0 
      : products[item.product_id]?.price || 0
    return sum + price * item.quantity
  }, 0)
  const shipping = subtotal > 2000 ? 0 : 150
  const tax = Math.round(subtotal * 0.18)
  const total = subtotal + shipping + tax

  const updateQuantity = async (cartItemId: string, newQuantity: number, productId?: string) => {
    if (newQuantity === 0) {
      removeItem(cartItemId, productId)
    } else {
      try {
        if (isAuthenticated) {
          // Update in database for authenticated users
          await supabase.from("cart_items").update({ quantity: newQuantity }).eq("id", cartItemId)
        } else {
          // Update in localStorage for guest users
          const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]")
          const item = guestCart.find((i: any) => i.product_id === productId)
          if (item) {
            item.quantity = newQuantity
            localStorage.setItem("guestCart", JSON.stringify(guestCart))
          }
        }
        setCartItems(cartItems.map((item) => (item.product_id === productId ? { ...item, quantity: newQuantity } : item)))
      } catch (error) {
        console.error("Error updating quantity:", error)
      }
    }
  }

  const removeItem = async (cartItemId: string, productId?: string) => {
    try {
      if (isAuthenticated) {
        // Remove from database for authenticated users
        await supabase.from("cart_items").delete().eq("id", cartItemId)
      } else {
        // Remove from localStorage for guest users
        const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]")
        const filtered = guestCart.filter((item: any) => item.product_id !== productId)
        localStorage.setItem("guestCart", JSON.stringify(filtered))
      }
      setCartItems(cartItems.filter((item) => item.product_id !== productId))
    } catch (error) {
      console.error("Error removing item:", error)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">Loading cart...</div>
        <Footer />
      </main>
    )
  }

  if (!isAuthenticated && cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">Start shopping to add items to your cart</p>
          <Link href="/shop">
            <Button className="bg-primary hover:bg-primary/90">Continue Shopping</Button>
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-foreground mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Discover our amazing Ayurvedic products</p>
            <Link href="/shop">
              <Button className="bg-primary hover:bg-primary/90">Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => {
                const productData = isAuthenticated ? item.products : products[item.product_id]
                return (
                  <div key={item.product_id} className="flex gap-4 bg-white rounded-lg shadow-sm p-4">
                    <img
                      src={productData?.image_url || "/placeholder.svg?height=150&width=150"}
                      alt={productData?.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground text-lg">{productData?.name}</h3>
                      <p className="text-primary font-bold">₹{productData?.price}</p>
                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center border border-border rounded">
                          <button
                            onClick={() => updateQuantity(item.id || item.product_id, item.quantity - 1, item.product_id)}
                            className="px-2 py-1 hover:bg-secondary"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-1">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id || item.product_id, item.quantity + 1, item.product_id)}
                            className="px-2 py-1 hover:bg-secondary"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button onClick={() => removeItem(item.id || item.product_id, item.product_id)} className="ml-auto text-red-600 hover:text-red-700">
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-foreground mb-6">Order Summary</h2>
                <div className="space-y-3 mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between text-foreground">
                    <span>Subtotal:</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-foreground">
                    <span>Shipping:</span>
                    <span className={shipping === 0 ? "text-green-600 font-semibold" : ""}>
                      {shipping === 0 ? "Free" : `₹${shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-foreground">
                    <span>Tax (18%):</span>
                    <span>₹{tax}</span>
                  </div>
                </div>
                <div className="flex justify-between text-xl font-bold text-foreground mb-6">
                  <span>Total:</span>
                  <span className="text-primary">₹{total}</span>
                </div>
                <Link href={isAuthenticated ? "/checkout" : "/auth/login"} className="w-full block">
                  <Button className="w-full bg-primary hover:bg-primary/90 py-3 text-base">
                    {isAuthenticated ? "Proceed to Checkout" : "Login to Checkout"}
                  </Button>
                </Link>
                <Link href="/shop" className="w-full block mt-3">
                  <Button variant="outline" className="w-full bg-transparent">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
