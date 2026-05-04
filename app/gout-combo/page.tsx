import { Metadata } from "next"
import { ComboOffer } from "@/components/combo-offer"
import { Button } from "@/components/ui/button"
import { Check, Zap, Heart, Award } from "lucide-react"

export const metadata: Metadata = {
  title: "Gout Health Combo Offer - 20% Off | ArogyaBio",
  description:
    "Get Gout Health Oil + Capsules at 20% discount - Only ₹1999! Complete relief from gout pain with premium Ayurvedic combo. Limited time offer!",
  keywords: "gout health combo, gout relief, ayurvedic treatment, gout oil, gout capsules",
  openGraph: {
    title: "Gout Health Combo - 20% Off Special Offer",
    description: "Premium Gout Health Oil + Capsules at ₹1999 (20% discount)",
    type: "website",
  },
}

export default function GoutComboPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/5">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-emerald-500/10 pointer-events-none"></div>

        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left: Offer Details */}
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 font-semibold">
                <Zap className="w-4 h-4" />
                Limited Time Offer
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance leading-tight">
                Complete Gout Health Combo
              </h1>

              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Get both premium Gout Health Oil and advanced Gout Health Capsules at an incredible 20% discount. This powerful combination provides complete relief - topical oil for immediate pain relief and capsules for long-term uric acid management.
              </p>

              <div className="flex items-center gap-4 mb-8">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Original Price</p>
                  <p className="text-2xl font-bold line-through">₹2,499</p>
                </div>
                <div className="text-center">
                  <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full px-4 py-2 font-bold">
                    20% OFF
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Now Only</p>
                  <p className="text-3xl font-bold text-primary">₹1,999</p>
                </div>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 text-white font-bold py-6 text-lg rounded-lg shadow-lg mb-6"
                size="lg"
              >
                Buy Combo Now
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                ✓ Free Shipping | ✓ 30-Day Money Back | ✓ Certified Ayurvedic
              </p>
            </div>

            {/* Right: Visual Benefits */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 text-center hover:shadow-lg transition">
                <div className="text-4xl font-bold text-primary mb-2">2</div>
                <p className="font-semibold text-foreground">Premium Products</p>
                <p className="text-sm text-muted-foreground mt-2">Oil + Capsules in one combo</p>
              </div>
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center hover:shadow-lg transition">
                <div className="text-4xl font-bold text-primary mb-2">₹500</div>
                <p className="font-semibold text-foreground">You Save</p>
                <p className="text-sm text-muted-foreground mt-2">20% discount on total</p>
              </div>
              <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6 text-center hover:shadow-lg transition">
                <div className="text-4xl font-bold text-primary mb-2">2 Weeks</div>
                <p className="font-semibold text-foreground">Quick Relief</p>
                <p className="text-sm text-muted-foreground mt-2">See results fast</p>
              </div>
              <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6 text-center hover:shadow-lg transition">
                <div className="text-4xl font-bold text-primary mb-2">100%</div>
                <p className="font-semibold text-foreground">Natural</p>
                <p className="text-sm text-muted-foreground mt-2">No harmful chemicals</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Combo Offer Component */}
      <section className="py-12 md:py-16 px-4">
        <div className="container mx-auto">
          <ComboOffer language="en" />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 md:py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            How the Combo Works Together
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Oil Section */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-foreground">Gout Health Oil</h3>
              <p className="text-muted-foreground mb-6">
                Topical relief that works immediately. Apply to affected joints and massage gently.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">Immediate pain relief</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">Reduces swelling fast</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">Improves mobility</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">Best results in 2 weeks</span>
                </li>
              </ul>
            </div>

            {/* Capsules Section */}
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-foreground">Gout Health Capsules</h3>
              <p className="text-muted-foreground mb-6">
                Internal healing that provides lasting results. Take 1-2 capsules twice daily.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">Regulates uric acid levels</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">Prevents future attacks</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">Strengthens joint tissues</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">Best results in 60-90 days</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Synergy Message */}
          <div className="mt-12 bg-gradient-to-r from-primary/10 to-emerald-500/10 border-2 border-primary/20 rounded-xl p-8 text-center max-w-2xl mx-auto">
            <Heart className="w-8 h-8 text-primary mx-auto mb-4" />
            <h4 className="text-xl font-bold mb-2 text-foreground">Maximum Synergy</h4>
            <p className="text-muted-foreground">
              The combination of topical oil + internal capsules provides 360° relief. Oil tackles immediate pain while capsules work from within to prevent recurrence.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 md:py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Why Trust ArogyaBio?
          </h2>

          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <Award className="w-12 h-12 text-primary mx-auto mb-4" />
              <h4 className="font-bold mb-2 text-foreground">Certified Products</h4>
              <p className="text-sm text-muted-foreground">Lab tested & verified authentic</p>
            </div>
            <div className="text-center">
              <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
              <h4 className="font-bold mb-2 text-foreground">10K+ Customers</h4>
              <p className="text-sm text-muted-foreground">Trusted by thousands</p>
            </div>
            <div className="text-center">
              <Check className="w-12 h-12 text-primary mx-auto mb-4" />
              <h4 className="font-bold mb-2 text-foreground">30-Day Guarantee</h4>
              <p className="text-sm text-muted-foreground">Money back guarantee</p>
            </div>
            <div className="text-center">
              <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
              <h4 className="font-bold mb-2 text-foreground">Fast Shipping</h4>
              <p className="text-sm text-muted-foreground">Free delivery across India</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 md:py-16 px-4">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-primary to-emerald-600 text-white rounded-2xl p-12 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Health?</h2>
            <p className="text-white/90 text-lg mb-8">
              Join thousands of satisfied customers. Get complete gout relief with our premium combo at just ₹1,999!
            </p>
            <Button
              className="bg-white text-primary hover:bg-white/90 font-bold py-6 px-10 text-lg rounded-lg shadow-lg"
              size="lg"
            >
              Get Your Combo Now - ₹1,999
            </Button>
            <p className="text-white/70 text-sm mt-6">
              100% Money Back Guarantee | Free Shipping | Limited Time Offer
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
