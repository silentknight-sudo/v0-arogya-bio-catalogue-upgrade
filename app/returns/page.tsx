"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { RotateCcw, Calendar, DollarSign, Package } from "lucide-react"

export default function ReturnsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-50 via-white to-amber-50 py-12 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <RotateCcw className="w-12 h-12 md:w-16 md:h-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Return & Exchange Policy</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              100% satisfaction guaranteed. Not happy? We'll make it right.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            {/* Return Policy */}
            <div className="mb-12 md:mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">30-Day Money Back Guarantee</h2>
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 md:p-8 mb-6">
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  If you're not 100% satisfied with your purchase within 30 days, we'll refund your money. No questions asked.
                  We stand behind the quality of our products.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="border border-border rounded-lg p-5 md:p-6">
                  <h3 className="font-bold text-lg text-foreground mb-3 flex items-center gap-2">
                    <Package className="w-5 h-5 text-primary" />
                    Return Eligibility
                  </h3>
                  <ul className="space-y-2 text-sm md:text-base text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="text-primary">✓</span>
                      <span>Unused and unopened products</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">✓</span>
                      <span>Original packaging intact</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">✓</span>
                      <span>With original invoice/order number</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">✓</span>
                      <span>Within 30 days of purchase</span>
                    </li>
                  </ul>
                </div>

                <div className="border border-border rounded-lg p-5 md:p-6">
                  <h3 className="font-bold text-lg text-foreground mb-3 flex items-center gap-2">
                    <RotateCcw className="w-5 h-5 text-primary" />
                    What Cannot Be Returned
                  </h3>
                  <ul className="space-y-2 text-sm md:text-base text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="text-red-500">✗</span>
                      <span>Opened or partially used products</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-red-500">✗</span>
                      <span>Damaged due to misuse</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-red-500">✗</span>
                      <span>Products beyond 30-day window</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-red-500">✗</span>
                      <span>Gift cards or discount vouchers</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Return Process */}
            <div className="mb-12 md:mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">How to Return a Product</h2>
              <div className="space-y-4 md:space-y-5">
                <div className="flex gap-4 md:gap-5 p-4 md:p-5 border border-border rounded-lg bg-white hover:shadow-md transition-shadow">
                  <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Contact Us</h4>
                    <p className="text-sm md:text-base text-muted-foreground mt-1">
                      Email us at <strong>official.arogyabio@gmail.com</strong> with your order number and return reason
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 md:gap-5 p-4 md:p-5 border border-border rounded-lg bg-white hover:shadow-md transition-shadow">
                  <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Get Return Authorization</h4>
                    <p className="text-sm md:text-base text-muted-foreground mt-1">
                      We'll send you a return authorization number and prepaid shipping label via email
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 md:gap-5 p-4 md:p-5 border border-border rounded-lg bg-white hover:shadow-md transition-shadow">
                  <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Pack & Ship</h4>
                    <p className="text-sm md:text-base text-muted-foreground mt-1">
                      Pack the product securely and use the provided prepaid label. Include your order number
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 md:gap-5 p-4 md:p-5 border border-border rounded-lg bg-white hover:shadow-md transition-shadow">
                  <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Receive Refund</h4>
                    <p className="text-sm md:text-base text-muted-foreground mt-1">
                      Once received and inspected, your refund will be processed within 7-10 business days
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline & Refunds */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
              <div className="border border-border rounded-lg p-5 md:p-6">
                <h3 className="font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Return Timeline
                </h3>
                <ul className="space-y-2 text-sm md:text-base text-muted-foreground">
                  <li><strong>Initiation:</strong> Same day response to requests</li>
                  <li><strong>Transit:</strong> 2-5 business days (tracking provided)</li>
                  <li><strong>Inspection:</strong> 2-3 business days after receipt</li>
                  <li><strong>Refund:</strong> 7-10 business days to original payment method</li>
                </ul>
              </div>

              <div className="border border-border rounded-lg p-5 md:p-6">
                <h3 className="font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  Refund Details
                </h3>
                <ul className="space-y-2 text-sm md:text-base text-muted-foreground">
                  <li><strong>Refund Amount:</strong> Full purchase price</li>
                  <li><strong>Shipping:</strong> Original shipping charges not refunded</li>
                  <li><strong>Method:</strong> Credited to original payment source</li>
                  <li><strong>Processing:</strong> May take 5-10 business days to appear</li>
                </ul>
              </div>
            </div>

            {/* Exchange Policy */}
            <div className="bg-secondary/50 border border-border rounded-lg p-6 md:p-8">
              <h3 className="font-bold text-lg md:text-2xl text-foreground mb-4">Exchange Policy</h3>
              <p className="text-sm md:text-base text-muted-foreground mb-4">
                You can exchange a product for a different variant or size within 30 days of purchase, provided the original product is unopened and unused.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Same Value Exchange</h4>
                  <p className="text-sm text-muted-foreground">
                    Completely free. We'll ship the new product at no extra cost.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Upgraded Exchange</h4>
                  <p className="text-sm text-muted-foreground">
                    Pay the difference. You only pay for the price difference.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="bg-primary text-primary-foreground py-12 md:py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Need Help with a Return?</h2>
            <p className="text-primary-foreground/80 max-w-md mx-auto mb-6">
              Our customer support team is ready to assist you
            </p>
            <a
              href="mailto:official.arogyabio@gmail.com"
              className="inline-block px-8 py-3 bg-primary-foreground text-primary rounded-full font-semibold hover:shadow-lg transition-all hover:scale-105"
            >
              Contact Support
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
