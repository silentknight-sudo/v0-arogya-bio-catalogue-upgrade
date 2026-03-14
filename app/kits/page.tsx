"use client"

import { useEffect } from "react"
import { useState } from "react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useRealtimeKits } from "@/hooks/use-realtime-kits"
import { ArrowRight, ShoppingCart, Heart } from "lucide-react"
import { createClient } from "@/supabase/client" // Assuming createClient is declared in this file

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

export default function KitsPage() {
  const { kits, loading } = useRealtimeKits()
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [wishlist, setWishlist] = useState<string[]>([])

  const categories = Array.from(new Set(kits.map((k) => k.category))).sort()
  const filteredKits = selectedCategory === "all" 
    ? kits 
    : kits.filter((k) => k.category === selectedCategory)

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Page Header */}
      <section className="py-8 md:py-12 bg-gradient-to-br from-primary/10 to-primary/5 border-b border-border">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Complete Health Kits</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Comprehensive Ayurvedic wellness solutions designed for complete health support
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <div className="md:col-span-1">
            <div className="bg-secondary/30 rounded-lg p-6 sticky top-4">
              <h3 className="text-lg font-bold text-foreground mb-6">Filter by Category</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`block w-full text-left px-4 py-2 rounded-lg transition-colors text-sm ${
                    selectedCategory === "all"
                      ? "bg-primary text-primary-foreground font-semibold"
                      : "bg-white text-foreground hover:bg-primary/10"
                  }`}
                >
                  All Kits
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`block w-full text-left px-4 py-2 rounded-lg transition-colors text-sm ${
                      selectedCategory === cat
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "bg-white text-foreground hover:bg-primary/10"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Kits Grid */}
          <div className="md:col-span-3">
            {filteredKits.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredKits.map((kit) => (
                  <div key={kit.id} className="bg-white rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow">
                    {/* Kit Image */}
                    <div className="relative h-56 bg-secondary/20 overflow-hidden">
                      <img 
                        src={kit.image_url?.replace('/public', '') || "/placeholder.svg"} 
                        alt={kit.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/placeholder.svg"
                        }}
                      />
                      <div className="absolute top-3 right-3">
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            setWishlist((prev) =>
                              prev.includes(kit.id)
                                ? prev.filter((id) => id !== kit.id)
                                : [...prev, kit.id]
                            )
                          }}
                          className={`p-2 rounded-full transition-all ${
                            wishlist.includes(kit.id)
                              ? "bg-red-500 text-white"
                              : "bg-white text-muted-foreground hover:bg-red-500 hover:text-white"
                          }`}
                        >
                          <Heart className="w-4 h-4" fill={wishlist.includes(kit.id) ? "currentColor" : "none"} />
                        </button>
                      </div>
                    </div>

                    {/* Kit Info */}
                    <div className="p-5">
                      <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">{kit.category}</p>
                      <h3 className="text-lg font-bold text-foreground mb-2">{kit.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{kit.description}</p>

                      {/* Benefits Preview */}
                      <div className="mb-4 pb-4 border-b border-border">
                        <p className="text-xs font-semibold text-foreground mb-2">Key Benefits:</p>
                        <ul className="space-y-1">
                          {kit.benefits?.slice(0, 3).map((benefit, idx) => (
                            <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                              <span className="text-primary">✓</span>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Price and Button */}
                      <div className="flex items-center justify-between">
                        <p className="text-2xl font-bold text-primary">₹{kit.price}</p>
                        <Link href={`/kits/${kit.id}`}>
                          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm">
                            <ShoppingCart className="w-3 h-3 mr-1" /> View
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">No kits found in this category</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
