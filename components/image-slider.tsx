"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Zap, ShoppingCart } from "lucide-react"
import Link from "next/link"

interface Slide {
  image: string
  title: string
  description: string
  titleHi?: string
  descriptionHi?: string
  cta?: {
    text: string
    textHi?: string
    href: string
  }
  isPromo?: boolean
}

const slides: Slide[] = [
  {
    image: "/ayurveda-hero-1.jpg",
    title: "Pure Herbals",
    description: "Authentic ayurvedic herbs sourced and prepared with ancient wisdom",
  },
  {
    image: "/gout-combo-banner.jpg",
    title: "Gout Health Complete Combo",
    titleHi: "गाउट हेल्थ कम्पलीट कॉम्बो",
    description: "Oil + Capsules at 20% OFF - Only ₹1,999! Get complete relief with our premium combo.",
    descriptionHi: "तेल + कैप्सूल 20% छूट पर - सिर्फ ₹1,999! हमारे प्रीमियम कॉम्बो से पूर्ण राहत पाएं।",
    cta: {
      text: "Shop Combo Now",
      textHi: "कॉम्बो खरीदें",
      href: "/gout-combo",
    },
    isPromo: true,
  },
  {
    image: "/ayurveda-hero-2.jpg",
    title: "Wellness Journey",
    description: "Transform your health with our premium wellness solutions",
  },
  {
    image: "/ayurveda-hero-3.jpg",
    title: "Natural Healing",
    description: "Harness the power of nature for complete well-being",
  },
]

export function ImageSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlay])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlay(false)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsAutoPlay(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setIsAutoPlay(false)
  }

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-black"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <div className={`text-center transition-all duration-1000 ${
          currentSlide >= 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <h2 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-xl text-white bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent inline-block px-6 py-2 rounded-lg">
            {slides[currentSlide].title}
          </h2>
          <p className="text-lg md:text-2xl text-white max-w-2xl drop-shadow-lg bg-green-500/20 backdrop-blur-sm px-6 py-3 rounded-lg inline-block">
            {slides[currentSlide].description}
          </p>
          
          {/* Promo Badge and CTA */}
          {slides[currentSlide].isPromo && slides[currentSlide].cta && (
            <div className="mt-8 flex flex-col items-center gap-4">
              <div className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full font-bold animate-pulse">
                <Zap className="w-5 h-5" />
                20% OFF LIMITED TIME
              </div>
              <Link href={slides[currentSlide].cta!.href}>
                <button className="bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 text-white font-bold py-4 px-8 rounded-lg shadow-lg flex items-center gap-2 transition-all hover:shadow-xl">
                  <ShoppingCart className="w-5 h-5" />
                  {slides[currentSlide].cta!.text}
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-20 bg-primary/30 hover:bg-primary/50 backdrop-blur-md p-3 rounded-full transition-all hover:scale-110 group border border-primary/50"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-primary group-hover:scale-125 transition-transform" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-20 bg-primary/30 hover:bg-primary/50 backdrop-blur-md p-3 rounded-full transition-all hover:scale-110 group border border-primary/50"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-primary group-hover:scale-125 transition-transform" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? "bg-primary w-8 h-3"
                : "bg-primary/40 hover:bg-primary/70 w-3 h-3"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Autoplay Indicator */}
      {isAutoPlay && (
        <div className="absolute top-8 right-8 z-20 flex items-center gap-2 text-primary/60 text-sm">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          Autoplay
        </div>
      )}
    </div>
  )
}
