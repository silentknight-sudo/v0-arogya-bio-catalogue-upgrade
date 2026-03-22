"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductCard from "@/components/product-card"
import { Hero3D } from "@/components/3d-hero"
import { ImageSlider } from "@/components/image-slider"
import { Product3DGrid } from "@/components/3d-product-showcase"
import { PremiumShowcase } from "@/components/premium-showcase"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useRealtimeProducts } from "@/hooks/use-realtime-products"
import { ArrowRight, Leaf, Award, TrendingUp, Users, Package, Sparkles } from "lucide-react"

interface Product {
  id: string
  name: string
  category: string
  price: number
  mrp?: number
  description: string
  image_url: string
  stock_quantity: number
}

export default function Home() {
  const { products, loading: productsLoading } = useRealtimeProducts()
  const [productsByCategory, setProductsByCategory] = useState<Record<string, Product[]>>({})
  const [wishlist, setWishlist] = useState<string[]>([])

  useEffect(() => {
    // Organize products by category whenever products change
    if (products.length > 0) {
      const grouped = products.reduce((acc: Record<string, Product[]>, product: Product) => {
        if (!acc[product.category]) {
          acc[product.category] = []
        }
        acc[product.category].push(product)
        return acc
      }, {})
      setProductsByCategory(grouped)
    }
  }, [products])

  const categories = Object.keys(productsByCategory).sort()
  const stats = [
    { label: "Pure Products", value: products.length, icon: Package },
    { label: "Trusted Wellness", value: "10K+", icon: Users },
    { label: "Years Heritage", value: "25+", icon: Award },
    { label: "Growth Impact", value: "300%", icon: TrendingUp },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* 3D Hero Section */}
      <Hero3D />

      {/* Image Slider Section */}
      <ImageSlider />

      {/* Stats Bar - Enhanced with gradient */}
      <section className="bg-gradient-to-r from-primary via-accent to-primary text-primary-foreground py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="flex flex-col items-center text-center group cursor-pointer">
                  <Icon className="w-8 h-8 flex-shrink-0 mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-2xl md:text-3xl font-bold">{stat.value}</p>
                  <p className="text-xs md:text-sm opacity-90">{stat.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Enhanced */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 text-primary mb-3">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-bold uppercase tracking-wider">Why Choose Us</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">Premium Wellness for Modern Life</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "100% Natural", desc: "Pure organic ingredients sourced responsibly", icon: "🌿" },
              { title: "Certified Quality", desc: "Scientifically tested and proven effective", icon: "✓" },
              { title: "Ancient Wisdom", desc: "5000+ years of Ayurvedic knowledge", icon: "🕯️" },
              { title: "Affordable Wellness", desc: "Premium quality at fair prices", icon: "💚" },
            ].map((item) => (
              <div key={item.title} className="group">
                <div className="bg-white rounded-2xl p-6 border border-primary/10 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 h-full">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                  <h4 className="font-bold text-foreground text-lg mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Showcase */}
      <PremiumShowcase />

      {/* Catalogue Products by Category */}
      {Object.entries(productsByCategory)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([category, categoryProducts]) => (
          <section key={category} className="py-8 md:py-10 border-b border-border">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground">{category}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground mt-1">{categoryProducts.length} products available</p>
                </div>
                <Link href={`/shop?category=${encodeURIComponent(category.toLowerCase())}`}>
                  <Button variant="ghost" className="text-primary text-sm">
                    View All <ArrowRight className="ml-1 w-3 h-3" />
                  </Button>
                </Link>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {categoryProducts.slice(0, 5).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={{
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      originalPrice: (product as any).mrp || product.price * 1.2,
                      rating: 4.5,
                      image: product.image_url,
                    }}
                    isInWishlist={wishlist.includes(product.id)}
                    onWishlistToggle={() => {
                      setWishlist((prev) =>
                        prev.includes(product.id)
                          ? prev.filter((id) => id !== product.id)
                          : [...prev, product.id]
                      )
                    }}
                  />
                ))}
              </div>
            </div>
          </section>
        ))}

      {/* Why Choose Us Section */}
      <section className="py-8 md:py-10 bg-gradient-to-br from-primary/10 to-accent/5">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Why Choose Arogyabio</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "100% Natural", desc: "Pure organic ingredients" },
              { title: "Certified Quality", desc: "Scientifically tested" },
              { title: "Traditional + Modern", desc: "Ancient wisdom meets science" },
              { title: "Affordable Wellness", desc: "Premium quality at fair prices" },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-lg p-4 border border-border hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-foreground text-sm md:text-base mb-2">{item.title}</h4>
                <p className="text-xs md:text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Categories Showcase */}
      <section className="py-8 md:py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Complete Product Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(productsByCategory)
              .sort(([a], [b]) => a.localeCompare(b))
              .slice(3)
              .map(([category, categoryProducts]) => (
                <Link key={category} href={`/shop?category=${encodeURIComponent(category.toLowerCase())}`}>
                  <div className="bg-gradient-to-br from-primary/10 to-accent/5 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer border border-border group">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                      {category}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {categoryProducts.length} authentic products for your wellness
                    </p>
                    <div className="flex items-center text-primary text-sm font-semibold">
                      Explore <ArrowRight className="ml-2 w-3 h-3" />
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-8 md:py-10 bg-secondary/20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Customer Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: "Priya", text: "Amazing quality! I've been using Arogyabio for 6 months and feel much better." },
              { name: "Rajesh", text: "Authentic Ayurvedic products at affordable prices. Highly recommended!" },
              { name: "Neha", text: "Best natural wellness brand I've tried. Customer service is excellent too." },
            ].map((testimonial) => (
              <div key={testimonial.name} className="bg-white rounded-lg p-4 border border-border">
                <p className="text-sm text-muted-foreground mb-3 italic">"{testimonial.text}"</p>
                <p className="font-semibold text-foreground text-sm">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 md:py-10 bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Start Your Wellness Journey Today</h2>
          <p className="text-sm md:text-base mb-6 opacity-90 max-w-2xl mx-auto">
            Join thousands of customers experiencing authentic Ayurvedic wellness
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/shop">
              <Button className="bg-primary-foreground text-primary hover:bg-secondary text-sm w-full sm:w-auto">
                Shop Now
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10 text-sm w-full sm:w-auto bg-transparent">
                Learn About Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter - Compact */}
      <section className="py-6 md:py-8 bg-secondary/30">
        <div className="container mx-auto px-4 max-w-2xl">
          <h3 className="text-lg md:text-xl font-bold text-foreground mb-3 text-center">Get Exclusive Offers</h3>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm">
              Subscribe
            </Button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  )
}
