"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X, Leaf, Zap } from "lucide-react"

export function GoutPromoPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    // Show popup after 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!isMounted || !isVisible) return null

  const handleClose = () => {
    setIsVisible(false)
    // Don't show again for 24 hours
    localStorage.setItem("goutPromoHidden", new Date().toISOString())
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Sticky Popup */}
      <div className="fixed inset-x-0 bottom-0 md:bottom-6 md:right-6 md:left-auto md:max-w-lg z-50 mx-4 md:mx-0">
        <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-900 dark:via-emerald-900 dark:to-teal-900 rounded-2xl shadow-2xl overflow-hidden border-2 border-green-400 dark:border-green-600 animate-in slide-in-from-bottom-5 duration-500">
          {/* Header with gradient background */}
          <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 px-6 py-4 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white rounded-full -mr-10 -mt-10 blur-xl" />
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-white rounded-full -ml-8 -mb-8 blur-xl" />
            </div>

            <div className="relative flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg leading-none">Special Offer!</h3>
                  <p className="text-green-50 text-xs font-semibold">Limited Time Only</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="flex-shrink-0 p-1 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Close popup"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Content area */}
          <div className="p-6 space-y-4">
            {/* Main offer message */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 px-4 py-1 rounded-full text-sm font-bold mb-2">
                <Zap className="w-4 h-4" />
                EXCLUSIVE DEAL
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">Get</p>
              <div className="text-5xl font-black bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                20% OFF
              </div>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-100">
                Gout Health Products
              </p>
            </div>

            {/* Description */}
            <div className="space-y-2 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Discover our premium Ayurvedic solutions for gout relief and joint health
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold">
                ✓ 100% Natural & Certified ✓ Fast Delivery ✓ Money Back Guarantee
              </p>
            </div>

            {/* Benefits list */}
            <div className="grid grid-cols-2 gap-2 py-2">
              <div className="bg-green-100 dark:bg-green-800/30 rounded-lg p-2 text-center">
                <p className="text-xs font-bold text-green-700 dark:text-green-300">Proven Relief</p>
              </div>
              <div className="bg-emerald-100 dark:bg-emerald-800/30 rounded-lg p-2 text-center">
                <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300">Pain Free</p>
              </div>
              <div className="bg-teal-100 dark:bg-teal-800/30 rounded-lg p-2 text-center">
                <p className="text-xs font-bold text-teal-700 dark:text-teal-300">Wellness</p>
              </div>
              <div className="bg-cyan-100 dark:bg-cyan-800/30 rounded-lg p-2 text-center">
                <p className="text-xs font-bold text-cyan-700 dark:text-cyan-300">Results</p>
              </div>
            </div>

            {/* Countdown or urgency message */}
            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-3 text-center">
              <p className="text-xs font-bold text-orange-800 dark:text-orange-200">
                ⏰ Offer Valid For Limited Time Only!
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-2 pt-2">
              <Link href="/shop?category=gout-health">
                <button className="w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Shop Gout Health 20% Off
                </button>
              </Link>
              <button
                onClick={handleClose}
                className="w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Maybe Later
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-3 pt-2 border-t border-gray-200 dark:border-gray-700">
              <span className="text-xs text-gray-600 dark:text-gray-400">🛡️ Secure</span>
              <span className="text-xs text-gray-600 dark:text-gray-400">📦 Fast Shipping</span>
              <span className="text-xs text-gray-600 dark:text-gray-400">✅ Certified</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
