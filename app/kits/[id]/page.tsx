"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { ArrowLeft, ShoppingCart, Heart, Check } from "lucide-react"

interface HealthKit {
  id: string
  name: string
  description: string
  long_description: string
  price: number
  category: string
  image_url: string
  benefits: string[]
  included_products: string[]
}

export default function KitDetailPage() {
  const params = useParams()
  const kitId = params.id as string
  const [kit, setKit] = useState<HealthKit | null>(null)
  const [wishlist, setWishlist] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchKit = async () => {
      const supabase = createClient()
      
      try {
        const { data, error } = await supabase
          .from("health_kits")
          .select("*")
          .eq("id", kitId)
          .single()

        if (error) {
          console.error("[v0] Error fetching kit:", error)
        } else if (data) {
          setKit(data as HealthKit)
        }
      } catch (error) {
        console.error("[v0] Exception fetching kit:", error)
      } finally {
        setLoading(false)
      }
    }

    if (kitId) {
      fetchKit()
    }
  }, [kitId])

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-muted-foreground">Loading kit details...</p>
        </div>
        <Footer />
      </main>
    )
  }

  if (!kit) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-muted-foreground mb-4">Kit not found</p>
          <Link href="/kits">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <ArrowLeft className="mr-2 w-4 h-4" /> Back to Kits
            </Button>
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-primary hover:underline">Home</Link>
            <span className="text-muted-foreground">/</span>
            <Link href="/kits" className="text-primary hover:underline">Health Kits</Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground">{kit.name}</span>
          </div>
        </div>
      </div>

      {/* Kit Details */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Kit Image */}
          <div className="flex flex-col gap-4">
            <div className="relative bg-secondary/20 rounded-lg overflow-hidden h-96">
              <img 
                src={kit.image_url?.replace('/public', '') || "/placeholder.svg"} 
                alt={kit.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.svg"
                }}
              />
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => {
                    setWishlist((prev) =>
                      prev.includes(kit.id)
                        ? prev.filter((id) => id !== kit.id)
                        : [...prev, kit.id]
                    )
                  }}
                  className={`p-3 rounded-full transition-all ${
                    wishlist.includes(kit.id)
                      ? "bg-red-500 text-white"
                      : "bg-white text-muted-foreground hover:bg-red-500 hover:text-white"
                  }`}
                >
                  <Heart className="w-5 h-5" fill={wishlist.includes(kit.id) ? "currentColor" : "none"} />
                </button>
              </div>
            </div>
          </div>

          {/* Kit Info */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-sm font-bold text-primary uppercase tracking-wider mb-3">{kit.category}</p>
              <h1 className="text-4xl font-bold text-foreground mb-4">{kit.name}</h1>
              <p className="text-lg text-muted-foreground mb-6">{kit.description}</p>
              
              <div className="bg-secondary/30 rounded-lg p-6 mb-6">
                <p className="text-lg text-muted-foreground leading-relaxed">{kit.long_description}</p>
              </div>
            </div>

            {/* Price and Action */}
            <div className="bg-gradient-to-br from-primary/10 to-accent/5 rounded-lg p-8 space-y-4">
              <p className="text-sm text-muted-foreground">Complete Kit Price</p>
              <p className="text-5xl font-bold text-primary">₹{kit.price}</p>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-base font-semibold">
                <ShoppingCart className="mr-2 w-5 h-5" /> Add to Cart
              </Button>
            </div>

            {/* Key Benefits */}
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">Key Benefits</h3>
              <ul className="space-y-3">
                {kit.benefits?.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Included Products */}
        <div className="mt-16 pt-12 border-t border-border">
          <h2 className="text-3xl font-bold text-foreground mb-8">What's Included</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kit.included_products?.map((product, idx) => (
              <div key={idx} className="bg-secondary/20 rounded-lg p-6 text-center">
                <p className="text-lg font-semibold text-foreground">{product}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Kits */}
        <div className="mt-16 pt-12 border-t border-border">
          <h2 className="text-3xl font-bold text-foreground mb-8">Explore More Kits</h2>
          <div className="text-center">
            <Link href="/kits">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Browse All Health Kits <ArrowLeft className="ml-2 w-4 h-4 rotate-180" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
