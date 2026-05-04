"use client"

import { useState } from "react"
import { ShoppingCart, Check, Zap, Leaf, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { goutHealthOil, goutHealthCapsules, comboOffer, whyCombo } from "@/lib/combo-products"

interface ComboOfferProps {
  language?: "en" | "hi"
}

export function ComboOffer({ language = "en" }: ComboOfferProps) {
  const [selectedLang, setSelectedLang] = useState<"en" | "hi">(language)
  const isEnglish = selectedLang === "en"

  const t = {
    buyNow: isEnglish ? "Buy Now - ₹1999" : "अभी खरीदें - ₹1999",
    originalPrice: isEnglish ? "Original Price" : "मूल मूल्य",
    savings: isEnglish ? "You Save" : "आप बचाएं",
    whatYouGet: isEnglish ? "What You Get" : "आपको क्या मिलता है",
    benefits: isEnglish ? "Key Benefits" : "मुख्य लाभ",
    ingredients: isEnglish ? "Premium Ingredients" : "प्रीमियम सामग्री",
    howToUse: isEnglish ? "How to Use" : "कैसे उपयोग करें",
    addToCart: isEnglish ? "Add to Cart" : "कार्ट में जोड़ें",
    limitedOffer: isEnglish ? "Limited Time Offer!" : "सीमित समय की पेशकश!",
    offer20: isEnglish ? "20% OFF" : "20% छूट",
  }

  const handleBuyNow = () => {
    // Add to cart functionality - integrates with checkout
    console.log("Adding combo to cart...")
    // In real implementation, this would add both products to cart
    window.location.href = "/checkout?combo=gout-health-combo"
  }

  return (
    <div className="w-full">
      {/* Language Toggle */}
      <div className="flex gap-2 mb-6">
        <Button
          variant={selectedLang === "en" ? "default" : "outline"}
          onClick={() => setSelectedLang("en")}
          className="font-semibold"
          size="sm"
        >
          English
        </Button>
        <Button
          variant={selectedLang === "hi" ? "default" : "outline"}
          onClick={() => setSelectedLang("hi")}
          className="font-semibold"
          size="sm"
        >
          हिंदी
        </Button>
      </div>

      {/* Main Combo Card */}
      <div className="bg-gradient-to-br from-primary/5 via-emerald-50 to-secondary/10 border-2 border-primary/30 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-primary to-emerald-600 text-white p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-8"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-8 -mb-8"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5" />
              <span className="text-sm font-bold uppercase tracking-wider">{t.limitedOffer}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white text-balance">
              {isEnglish ? comboOffer.title : comboOffer.titleHi}
            </h2>
            <p className="text-white/90 text-lg">
              {isEnglish ? comboOffer.description : comboOffer.descriptionHi}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 md:p-10">
          {/* Price Section */}
          <div className="grid md:grid-cols-3 gap-6 mb-10 bg-white rounded-xl p-6 border border-border">
            {/* Original Price */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2 font-medium">{t.originalPrice}</p>
              <p className="text-3xl font-bold line-through text-muted-foreground">₹{comboOffer.originalPrice}</p>
            </div>

            {/* Discount Badge */}
            <div className="flex items-center justify-center">
              <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full w-28 h-28 flex items-center justify-center shadow-lg">
                <div className="text-center">
                  <p className="text-3xl font-bold">{comboOffer.discountPercentage}%</p>
                  <p className="text-xs uppercase font-bold">{t.offer20}</p>
                </div>
              </div>
            </div>

            {/* Final Price */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2 font-medium">Final Price</p>
              <p className="text-4xl font-bold text-primary">₹{comboOffer.discountedPrice}</p>
              <p className="text-sm text-green-600 font-bold mt-2">{t.savings} ₹{comboOffer.originalPrice - comboOffer.discountedPrice}</p>
            </div>
          </div>

          {/* Buy Now Button */}
          <Button
            onClick={handleBuyNow}
            className="w-full bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 text-white font-bold py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all mb-8 group"
            size="lg"
          >
            <ShoppingCart className="w-5 h-5 mr-2 group-hover:animate-bounce" />
            {t.buyNow}
          </Button>

          {/* What You Get */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
              <Award className="w-6 h-6 text-primary" />
              {t.whatYouGet}
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Oil Product */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 hover:shadow-lg transition-all">
                <h4 className="text-xl font-bold text-foreground mb-2">
                  {isEnglish ? goutHealthOil.name : goutHealthOil.nameHi}
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {isEnglish ? goutHealthOil.description : goutHealthOil.descriptionHi}
                </p>
                <ul className="space-y-2">
                  {(isEnglish ? goutHealthOil.benefits.slice(0, 3) : goutHealthOil.benefitsHi.slice(0, 3)).map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Capsules Product */}
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 hover:shadow-lg transition-all">
                <h4 className="text-xl font-bold text-foreground mb-2">
                  {isEnglish ? goutHealthCapsules.name : goutHealthCapsules.nameHi}
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {isEnglish ? goutHealthCapsules.description : goutHealthCapsules.descriptionHi}
                </p>
                <ul className="space-y-2">
                  {(isEnglish ? goutHealthCapsules.benefits.slice(0, 3) : goutHealthCapsules.benefitsHi.slice(0, 3)).map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Why Choose Combo */}
          <div className="mb-10 bg-secondary/5 rounded-xl p-6 border border-border">
            <h3 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
              <Leaf className="w-6 h-6 text-primary" />
              {isEnglish ? whyCombo.title : whyCombo.titleHi}
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              {whyCombo.reasons.map((reason, i) => (
                <div key={i} className="flex gap-3">
                  <div className="bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">
                      {isEnglish ? reason.title : reason.titleHi}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {isEnglish ? reason.description : reason.descriptionHi}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary mb-1">10K+</p>
              <p className="text-xs text-muted-foreground">Happy Customers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary mb-1">4.9/5</p>
              <p className="text-xs text-muted-foreground">Average Rating</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary mb-1">100%</p>
              <p className="text-xs text-muted-foreground">Natural</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
