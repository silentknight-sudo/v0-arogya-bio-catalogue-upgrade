"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X, Zap, ShoppingCart } from "lucide-react"

interface ComboBannerProps {
  language?: "en" | "hi"
  dismissible?: boolean
  position?: "top" | "bottom"
}

export function ComboBanner({
  language = "en",
  dismissible = true,
  position = "top",
}: ComboBannerProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    // Check if user dismissed banner in this session
    const dismissed = sessionStorage.getItem("combo-banner-dismissed")
    if (dismissed) {
      setIsVisible(false)
    }
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    sessionStorage.setItem("combo-banner-dismissed", "true")
  }

  if (!isMounted || !isVisible) return null

  const isEnglish = language === "en"

  const content = {
    title: isEnglish ? "🎉 Gout Health Combo Offer!" : "🎉 गाउट हेल्थ कॉम्बो ऑफर!",
    subtitle: isEnglish
      ? "Oil + Capsules at 20% OFF - Only ₹1,999!"
      : "तेल + कैप्सूल 20% छूट पर - सिर्फ ₹1,999!",
    description: isEnglish
      ? "Complete relief from gout pain with our premium combo"
      : "हमारे प्रीमियम कॉम्बो से गाउट दर्द से पूर्ण राहत",
    cta: isEnglish ? "Shop Now" : "अभी खरीदें",
  }

  const positionClasses = {
    top: "fixed top-0 left-0 right-0 z-40",
    bottom: "fixed bottom-0 left-0 right-0 z-40",
  }

  return (
    <div
      className={`${positionClasses[position]} bg-gradient-to-r from-primary via-emerald-500 to-primary text-white shadow-xl`}
    >
      <div className="container mx-auto px-4 py-4 md:py-3 flex items-center justify-between gap-4">
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 md:mb-0">
            <Zap className="w-5 h-5 flex-shrink-0 hidden sm:block" />
            <h3 className="font-bold text-sm md:text-base text-balance">
              {content.title}
            </h3>
          </div>
          <p className="text-xs md:text-sm text-white/90 text-balance">
            {content.subtitle} - {content.description}
          </p>
        </div>

        {/* CTA Button and Close */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link href="/gout-combo">
            <button className="bg-white text-primary hover:bg-white/90 font-bold px-4 py-2 rounded-lg flex items-center gap-2 text-xs md:text-sm whitespace-nowrap transition-all hover:shadow-lg">
              <ShoppingCart className="w-4 h-4" />
              {content.cta}
            </button>
          </Link>

          {dismissible && (
            <button
              onClick={handleDismiss}
              className="p-1.5 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
              aria-label="Close banner"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-white/20">
        <div className="h-full bg-white/40 animate-pulse"></div>
      </div>
    </div>
  )
}
