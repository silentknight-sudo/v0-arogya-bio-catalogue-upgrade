"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ComboOffer } from "@/components/combo-offer"
import { Button } from "@/components/ui/button"
import { Check, Zap, Heart, Award, TrendingUp, Clock, Lock, Truck } from "lucide-react"

export default function GoutComboPage() {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)

  const handleOrderNow = async () => {
    setIsProcessing(true)
    try {
      // Redirect to checkout with combo parameter
      router.push("/checkout?combo=gout-health-combo")
    } catch (error) {
      console.log("[v0] Order redirect error:", error)
      alert("Unable to proceed to checkout. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-white to-emerald-50/30">
      {/* Urgency Banner */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-2 px-4 text-center text-sm font-bold animate-pulse">
        ⏰ Limited Stock Available - Only 47 Combos Left at This Price! Order Now Before It Sells Out
      </div>

      {/* Hero Section - Enhanced */}
      <section className="relative py-16 md:py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-emerald-500/5 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>

        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Offer Details */}
            <div>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-emerald-500/20 text-primary px-4 py-2 rounded-full mb-6 font-bold border border-primary/30">
                <Zap className="w-4 h-4" />
                Limited Time Flash Sale
              </div>

              <h1 className="text-5xl md:text-6xl font-black text-foreground mb-6 text-balance leading-tight">
                Get Complete Gout Relief For Just <span className="text-transparent bg-gradient-to-r from-primary to-emerald-600 bg-clip-text">₹1,999</span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-medium">
                Stop suffering from gout pain. Our premium Oil + Capsules combo provides <span className="font-bold text-foreground">immediate topical relief</span> AND <span className="font-bold text-foreground">long-term uric acid control</span> in one powerful package.
              </p>

              {/* Price Display - Eye Catching */}
              <div className="bg-gradient-to-br from-primary/5 to-emerald-500/5 border-2 border-primary/30 rounded-2xl p-8 mb-8">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground font-semibold mb-2">Regular Price</p>
                    <p className="text-3xl font-bold line-through text-red-500">₹2,499</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full w-32 h-32 flex flex-col items-center justify-center shadow-lg">
                      <p className="text-4xl font-black">20%</p>
                      <p className="text-xs uppercase font-bold">OFF</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-semibold mb-2">Today Only</p>
                    <p className="text-4xl font-black text-primary">₹1,999</p>
                  </div>
                </div>
                <p className="text-center text-green-600 font-bold mt-4 text-lg">You Save ₹500!</p>
              </div>

              {/* CTA Button - Primary */}
              <Button
                onClick={handleOrderNow}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 text-white font-black py-8 text-2xl rounded-xl shadow-2xl mb-4 disabled:opacity-50 hover:shadow-2xl transition-all hover:scale-105"
              >
                {isProcessing ? "Processing..." : "🛒 ORDER NOW - ₹1,999"}
              </Button>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 text-center mb-6">
                <div className="text-sm font-semibold text-foreground">
                  <Check className="w-5 h-5 text-green-600 mx-auto mb-1" />
                  Free Shipping
                </div>
                <div className="text-sm font-semibold text-foreground">
                  <Heart className="w-5 h-5 text-primary mx-auto mb-1" />
                  30-Day Refund
                </div>
                <div className="text-sm font-semibold text-foreground">
                  <Lock className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                  100% Secure
                </div>
              </div>

              <p className="text-center text-xs text-muted-foreground font-medium">
                ✓ Money-back guarantee if not satisfied | ✓ Certified Ayurvedic | ✓ Lab tested
              </p>
            </div>

            {/* Right: Social Proof & Benefits */}
            <div className="space-y-6">
              {/* Main Benefit Card */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-3 border-blue-300 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-primary" />
                  Results You Can Count On
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-bold text-foreground">Pain Relief in 2 Weeks</p>
                      <p className="text-sm text-muted-foreground">Oil works immediately on affected joints</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-bold text-foreground">Uric Acid Control in 60 Days</p>
                      <p className="text-sm text-muted-foreground">Capsules prevent future gout attacks</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-bold text-foreground">Long-term Joint Health</p>
                      <p className="text-sm text-muted-foreground">100% natural, no side effects</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-xl p-6 text-center shadow-md">
                  <p className="text-4xl font-black text-primary mb-2">10K+</p>
                  <p className="font-bold text-foreground">Happy Customers</p>
                  <p className="text-xs text-muted-foreground mt-1">Verified Reviews</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-300 rounded-xl p-6 text-center shadow-md">
                  <p className="text-4xl font-black text-primary mb-2">4.9/5</p>
                  <p className="font-bold text-foreground">Star Rating</p>
                  <p className="text-xs text-muted-foreground mt-1">2,547 Reviews</p>
                </div>
              </div>

              {/* Quick Features */}
              <div className="bg-white border-2 border-primary/20 rounded-xl p-6">
                <h4 className="font-bold text-foreground mb-4">What's Included:</h4>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Gout Health Oil (250ml)</p>
                  <p className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Gout Health Capsules (60 capsules)</p>
                  <p className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Usage Guide + Instructions</p>
                  <p className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Free Shipping PAN India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Urgency & Scarcity Section */}
      <section className="py-8 px-4 bg-gradient-to-r from-orange-50 to-red-50 border-t-4 border-b-4 border-orange-400">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <Clock className="w-8 h-8 text-red-600" />
              <p className="font-bold text-foreground">Offer Expires in 3 Days</p>
              <p className="text-sm text-muted-foreground">Limited time only</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Truck className="w-8 h-8 text-orange-600" />
              <p className="font-bold text-foreground">Free Shipping Included</p>
              <p className="text-sm text-muted-foreground">Delivered in 3-5 business days</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Award className="w-8 h-8 text-green-600" />
              <p className="font-bold text-foreground">30-Day Money Back</p>
              <p className="text-sm text-muted-foreground">100% satisfaction guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Combo Offer Component */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="container mx-auto">
          <ComboOffer language="en" />
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-16 md:py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-12 text-foreground">
            Real Results from Real Customers
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Rajesh Kumar",
                location: "Mumbai",
                rating: 5,
                text: "Finally got relief after 3 years of gout pain. The oil works instantly and capsules prevent attacks. Highly recommend!",
                result: "Pain-free for 4 months",
              },
              {
                name: "Priya Sharma",
                location: "Delhi",
                rating: 5,
                text: "Best investment for my health. No more sleepless nights. My doctor was amazed at the improvement.",
                result: "Uric acid levels normalized",
              },
              {
                name: "Amit Patel",
                location: "Bangalore",
                rating: 5,
                text: "Couldn't believe how fast the oil worked. Within 2 weeks, I was walking without pain. Combo is amazing!",
                result: "100% mobility restored",
              },
            ].map((review, idx) => (
              <div key={idx} className="bg-white border-2 border-primary/20 rounded-xl p-8 shadow-lg hover:shadow-xl transition">
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-2xl">★</span>
                  ))}
                </div>
                <p className="text-foreground font-bold mb-4 italic">{review.text}</p>
                <div className="bg-green-50 border-l-4 border-green-600 px-4 py-2 mb-4 rounded">
                  <p className="text-sm font-bold text-green-700">Result: {review.result}</p>
                </div>
                <p className="font-bold text-foreground">{review.name}</p>
                <p className="text-sm text-muted-foreground">{review.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-12 text-foreground">
            How Our Combo Works
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {/* Oil Section */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-3 border-blue-400 rounded-2xl p-10">
              <h3 className="text-3xl font-black mb-4 text-foreground">Gout Health Oil</h3>
              <p className="text-muted-foreground mb-6 font-medium">
                Fast-acting topical relief for immediate pain management
              </p>
              <ul className="space-y-3">
                {[
                  "Instant pain relief on application",
                  "Reduces swelling & inflammation fast",
                  "Improves joint mobility",
                  "Works in just 2 weeks",
                ].map((benefit, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="w-6 h-6 text-primary flex-shrink-0 font-bold" />
                    <span className="text-foreground font-medium">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Capsules Section */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 border-3 border-green-400 rounded-2xl p-10">
              <h3 className="text-3xl font-black mb-4 text-foreground">Gout Health Capsules</h3>
              <p className="text-muted-foreground mb-6 font-medium">
                Long-term internal healing & prevention
              </p>
              <ul className="space-y-3">
                {[
                  "Regulates uric acid levels",
                  "Prevents future attacks",
                  "Strengthens joints permanently",
                  "Results in 60-90 days",
                ].map((benefit, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="w-6 h-6 text-primary flex-shrink-0 font-bold" />
                    <span className="text-foreground font-medium">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Combined Benefits */}
          <div className="bg-gradient-to-r from-primary/10 to-emerald-500/10 border-3 border-primary/40 rounded-2xl p-12 text-center max-w-3xl mx-auto">
            <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
            <h4 className="text-3xl font-black mb-4 text-foreground">Together = Complete Healing</h4>
            <p className="text-lg text-foreground font-medium mb-6">
              Oil tackles immediate pain while capsules work from within to prevent future attacks. This powerful 360° approach provides both rapid relief AND permanent solution.
            </p>
            <div className="inline-block bg-green-100 border-2 border-green-600 px-6 py-3 rounded-xl font-bold text-green-700">
              The Only Combo That Works Inside AND Outside
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-12 text-foreground">
            Common Questions
          </h2>

          <div className="space-y-4">
            {[
              {
                q: "How long until I see results?",
                a: "Oil provides relief in 2-3 days. Capsules work better over 60-90 days for permanent relief.",
              },
              {
                q: "Is it safe with medications?",
                a: "Yes, 100% natural ingredients with no side effects. Consult your doctor if on blood thinners.",
              },
              {
                q: "Will I get my money back?",
                a: "Absolutely. 30-day money-back guarantee if not satisfied. No questions asked.",
              },
              {
                q: "How much should I use?",
                a: "Oil: 2-3 tbsp twice daily. Capsules: 1-2 with water after meals, twice daily.",
              },
            ].map((faq, idx) => (
              <div key={idx} className="bg-white border-2 border-border rounded-xl p-6">
                <h4 className="text-lg font-bold text-foreground mb-2">{faq.q}</h4>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Powerful */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-br from-primary via-emerald-600 to-primary">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-white/90 text-sm font-bold uppercase tracking-widest mb-4">Last Chance Today</p>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 text-balance">
              Don't Suffer From Gout Anymore
            </h2>
            <p className="text-xl text-white/90 mb-10 font-medium">
              Join 10,000+ customers who got complete relief. Order your combo today at ₹1,999 with free shipping.
            </p>

            <Button
              onClick={handleOrderNow}
              disabled={isProcessing}
              className="bg-white text-primary hover:bg-white/90 font-black py-8 px-12 text-2xl rounded-2xl shadow-2xl mb-6 disabled:opacity-50 hover:shadow-2xl transition-all hover:scale-105 inline-block"
            >
              {isProcessing ? "Processing..." : "✓ GET COMBO NOW - ₹1,999"}
            </Button>

            <p className="text-white/80 font-bold mb-4">
              100% Money Back Guarantee | 30 Days to Test | Free Shipping
            </p>

            <div className="grid grid-cols-3 gap-4 mt-8 text-white text-center">
              <div>
                <Check className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm font-bold">Free Shipping</p>
              </div>
              <div>
                <Heart className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm font-bold">Risk-Free Trial</p>
              </div>
              <div>
                <Lock className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm font-bold">Secure Payment</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
