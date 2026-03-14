"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

export function PremiumShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const features = [
    {
      title: "Ancient Formulas",
      desc: "5000+ years of Ayurvedic wisdom",
      icon: "🌿",
    },
    {
      title: "Pure Ingredients",
      desc: "100% organic, ethically sourced",
      icon: "✨",
    },
    {
      title: "Science-Backed",
      desc: "Clinically tested & certified",
      icon: "🔬",
    },
  ]

  const products = [
    { emoji: "🌿", name: "Ashwagandha", subtitle: "Premium Root Extract" },
    { emoji: "✨", name: "Brahmi", subtitle: "Mind & Memory" },
    { emoji: "🌱", name: "Turmeric", subtitle: "Golden Immunity" },
  ]

  return (
    <div className="relative w-full">
      {/* Hero Section - Mobile Optimized */}
      <section className="relative min-h-screen md:min-h-[700px] overflow-hidden bg-gradient-to-br from-amber-50 via-white to-green-50 pt-8 md:pt-12">
        {/* Decorative elements - hidden on small screens */}
        <div className="hidden md:block absolute top-10 right-10 w-72 h-72 bg-gradient-to-br from-amber-200/30 to-green-200/20 rounded-full blur-3xl" />
        <div className="hidden md:block absolute bottom-0 left-20 w-96 h-96 bg-gradient-to-tr from-green-100/40 to-amber-100/30 rounded-full blur-3xl" />

        <div className="relative container mx-auto px-4 py-8 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-4 md:space-y-6 z-10 order-2 md:order-1">
              <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-white/60 backdrop-blur-sm rounded-full border border-amber-200/50 text-xs md:text-sm">
                <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-amber-600" />
                <span className="font-semibold text-amber-900">Premium Collection</span>
              </div>

              <div className="space-y-2 md:space-y-3">
                <h2 className="text-3xl md:text-5xl lg:text-7xl font-serif text-foreground leading-tight text-balance">
                  Wellness
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-amber-600 to-green-700">
                    Redefined
                  </span>
                </h2>
              </div>

              <p className="text-sm md:text-lg text-muted-foreground max-w-md leading-relaxed">
                Discover the intersection of ancient Ayurvedic wisdom and modern science. Each product is crafted to elevate your wellness journey.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4 md:pt-6">
                <Link href="/shop" className="w-full sm:w-auto">
                  <button className="w-full group relative px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold text-sm md:text-base rounded-full overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <span className="relative z-10 flex items-center justify-center md:justify-start gap-2">
                      Explore <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </Link>
                <button className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 border-2 border-green-600 text-green-700 font-semibold text-sm md:text-base rounded-full hover:bg-green-50 transition-all duration-300 hover:shadow-lg">
                  Learn More
                </button>
              </div>
            </div>

            {/* Visual Element - Stacked on Mobile */}
            <div className="relative h-64 md:h-[500px] order-1 md:order-2 mb-6 md:mb-0">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Mobile: Stack vertically */}
                <div className="w-full h-full grid grid-cols-1 place-items-center md:relative md:w-auto">
                  {products.map((product, idx) => (
                    <div
                      key={idx}
                      className={`absolute w-48 md:w-56 h-48 md:h-72 bg-white rounded-2xl md:rounded-3xl shadow-lg md:shadow-2xl border border-amber-100/50 md:border-green-200/50 p-4 md:p-6 flex flex-col justify-center items-center text-center hover:shadow-xl md:hover:shadow-3xl transition-all duration-300 hover:scale-105 ${
                        idx === 0
                          ? "md:top-0 md:left-1/2 md:transform md:-translate-x-1/2 z-30 bg-white"
                          : idx === 1
                            ? "md:absolute md:top-24 md:left-0 z-20 bg-gradient-to-br from-amber-100 to-amber-50 opacity-90 hidden md:flex"
                            : "md:absolute md:bottom-12 md:right-0 z-20 bg-gradient-to-br from-green-100 to-green-50 opacity-90 hidden md:flex"
                      }`}
                    >
                      <div className="text-5xl md:text-6xl mb-3 md:mb-4">{product.emoji}</div>
                      <h3 className="text-lg md:text-2xl font-bold text-foreground mb-1 md:mb-2">{product.name}</h3>
                      <p className="text-xs md:text-sm text-muted-foreground">{product.subtitle}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section - Mobile Optimized */}
      <section className="py-10 md:py-24 bg-white px-4 md:px-0">
        <div className="container mx-auto">
          <div className="text-center mb-8 md:mb-16">
            <h3 className="text-2xl md:text-5xl font-serif text-foreground mb-3 md:mb-4 text-balance">
              Why Arogyabio?
            </h3>
            <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
              We're not just another wellness brand. We're guardians of ancient knowledge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative p-5 md:p-8 rounded-xl md:rounded-2xl border border-gray-200 bg-white hover:bg-gradient-to-br hover:from-green-50/50 hover:to-amber-50/50 transition-all duration-300 cursor-pointer hover:shadow-xl active:scale-95 md:active:scale-100"
              >
                <div className="text-3xl md:text-4xl mb-3 md:mb-4 inline-block">{feature.icon}</div>

                <h4 className="text-base md:text-xl font-bold text-foreground mb-2 md:mb-3">
                  {feature.title}
                </h4>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>

                <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-xs md:text-sm font-semibold text-green-600">
                    ✓ Certified & Verified
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Mobile Optimized */}
      <section className="relative py-12 md:py-28 overflow-hidden mx-4 md:mx-0 rounded-2xl md:rounded-none">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-emerald-600 to-green-700" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4 md:px-0 text-center">
          <h3 className="text-2xl md:text-5xl font-serif text-white mb-3 md:mb-6 text-balance">
            Transform Your Wellness
          </h3>
          <p className="text-base md:text-xl text-green-50 max-w-2xl mx-auto mb-6 md:mb-8 px-2">
            Join thousands who've embraced ancient Ayurveda
          </p>

          <Link href="/shop">
            <button className="group px-6 md:px-10 py-3 md:py-4 bg-white text-green-700 font-bold text-sm md:text-base rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105 inline-flex items-center gap-2 active:scale-95">
              Start Journey <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </section>
    </div>
  )
}
