"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart, Truck, Shield, RotateCcw } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"

interface Product {
  id: string
  name: string
  price: number
  description: string
  image_url: string
  category: string
  benefits: string[]
  usage: string
  certification: string
  stock_quantity: number
}

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("description")
  const [user, setUser] = useState<any>(null)
  const [addedToCart, setAddedToCart] = useState(false)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      // Get authenticated user
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser()
      setUser(authUser)

      // Fetch product
      const { data: productData } = await supabase.from("products").select("*").eq("id", productId).single()

      if (productData) {
        setProduct(productData)

        // Fetch related products from same category
        const { data: related } = await supabase
          .from("products")
          .select("*")
          .eq("category", productData.category)
          .neq("id", productId)
          .limit(3)

        setRelatedProducts(related || [])
      }

      setLoading(false)
    }

    fetchData()
  }, [productId])

  const handleAddToCart = async () => {
    if (!user) {
      window.location.href = "/auth/login"
      return
    }

    try {
      const { data: existingItem } = await supabase
        .from("cart_items")
        .select("id, quantity")
        .eq("user_id", user.id)
        .eq("product_id", productId)
        .maybeSingle()

      if (existingItem) {
        await supabase
          .from("cart_items")
          .update({ quantity: existingItem.quantity + quantity })
          .eq("id", existingItem.id)
      } else {
        await supabase.from("cart_items").insert({
          user_id: user.id,
          product_id: productId,
          quantity: quantity,
        })
      }

      setAddedToCart(true)
      setTimeout(() => setAddedToCart(false), 2000)
    } catch (error) {
      console.error("[v0] Error adding to cart:", error)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">Loading product...</div>
        <Footer />
      </main>
    )
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">Product not found</div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-foreground">
            Shop
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="flex items-center justify-center bg-secondary/30 rounded-lg overflow-hidden aspect-square">
            <img
              src={product.image_url || "/placeholder.svg?height=500&width=500&query=ayurvedic-product"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <span className="text-primary text-sm font-semibold">{product.category}</span>
              <h1 className="text-4xl font-bold text-foreground mb-2">{product.name}</h1>
              <p className="text-muted-foreground text-lg">{product.description}</p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-primary">₹{product.price}</span>
              <span className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full font-semibold">In Stock</span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-foreground font-semibold">Quantity:</span>
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-secondary"
                  >
                    -
                  </button>
                  <span className="px-6 py-2">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 hover:bg-secondary">
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handleAddToCart}
                  className={`flex-1 py-6 text-base font-semibold flex items-center justify-center gap-2 ${
                    addedToCart ? "bg-green-600 hover:bg-green-700" : "bg-primary hover:bg-primary/90"
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {addedToCart ? "Added to Cart!" : "Add to Cart"}
                </Button>
                <button className="px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-secondary/30 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-primary" />
                <span className="text-sm">Free shipping above ₹2000</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm">100% Authentic & Certified</span>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="w-5 h-5 text-primary" />
                <span className="text-sm">30-day return policy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-16">
          <div className="flex gap-4 border-b border-border mb-6">
            {["description", "benefits", "usage", "certification"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 font-semibold transition-colors capitalize ${
                  activeTab === tab
                    ? "text-primary border-b-2 border-primary -mb-1"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {activeTab === "description" && (
              <p className="text-foreground text-lg leading-relaxed">{product.description}</p>
            )}

            {activeTab === "benefits" && (
              <ul className="space-y-3">
                {product.benefits?.map((benefit: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 text-foreground">
                    <span className="text-primary text-xl mt-1">✓</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            )}

            {activeTab === "usage" && <p className="text-foreground text-lg leading-relaxed">{product.usage}</p>}

            {activeTab === "certification" && (
              <div className="flex flex-wrap gap-3">
                {product.certification?.split(",").map((cert: string, idx: number) => (
                  <div
                    key={idx}
                    className="bg-green-50 border border-green-200 text-green-800 px-4 py-2 rounded-lg font-semibold"
                  >
                    {cert.trim()}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((prod) => (
                <Link key={prod.id} href={`/shop/${prod.id}`}>
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                    <div className="aspect-square bg-secondary/30 overflow-hidden">
                      <img
                        src={prod.image_url || "/placeholder.svg?height=300&width=300"}
                        alt={prod.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground mb-2">{prod.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">₹{prod.price}</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">{prod.category}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
