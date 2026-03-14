"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Truck, Calendar, MapPin, CheckCircle } from "lucide-react"

export default function ShippingPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-50 via-white to-amber-50 py-12 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <Truck className="w-12 h-12 md:w-16 md:h-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Shipping Information</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We ensure fast, safe, and reliable delivery of your wellness products
            </p>
          </div>
        </section>

        {/* Shipping Details */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
              {/* Delivery Options */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Delivery Options</h2>
                <div className="space-y-4">
                  <div className="border border-border rounded-lg p-5 md:p-6">
                    <h3 className="font-bold text-lg text-foreground mb-2">Standard Delivery</h3>
                    <p className="text-sm md:text-base text-muted-foreground mb-3">5-7 Business Days</p>
                    <p className="text-sm text-muted-foreground">
                      Free for orders above ₹500. Standard delivery across India.
                    </p>
                  </div>

                  <div className="border border-border rounded-lg p-5 md:p-6">
                    <h3 className="font-bold text-lg text-foreground mb-2">Express Delivery</h3>
                    <p className="text-sm md:text-base text-muted-foreground mb-3">2-3 Business Days</p>
                    <p className="text-sm text-muted-foreground">
                      Additional charge applies. Available for metro cities.
                    </p>
                  </div>

                  <div className="border border-border rounded-lg p-5 md:p-6">
                    <h3 className="font-bold text-lg text-foreground mb-2">Same Day Delivery</h3>
                    <p className="text-sm md:text-base text-muted-foreground mb-3">Next Day</p>
                    <p className="text-sm text-muted-foreground">
                      Premium option available in select areas. Premium charges apply.
                    </p>
                  </div>
                </div>
              </div>

              {/* Shipping Process */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Shipping Process</h2>
                <div className="space-y-4">
                  <div className="flex gap-4 md:gap-5">
                    <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Order Confirmed</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        You'll receive a confirmation email with order details
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 md:gap-5">
                    <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Processing</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        We prepare and pack your order carefully (1-2 business days)
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 md:gap-5">
                    <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Shipped</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your package is dispatched. You'll receive tracking details via email
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 md:gap-5">
                    <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Delivered</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your order arrives! Track in real-time using your tracking number
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Zones */}
            <div className="bg-secondary/30 rounded-lg p-6 md:p-8 mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-2">
                <MapPin className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                Shipping Zones
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div className="border border-border rounded-lg p-4 md:p-5 bg-white">
                  <h4 className="font-bold text-foreground mb-2">Zone 1</h4>
                  <p className="text-sm text-muted-foreground">
                    Metro cities and major towns: 5-7 business days
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4 md:p-5 bg-white">
                  <h4 className="font-bold text-foreground mb-2">Zone 2</h4>
                  <p className="text-sm text-muted-foreground">
                    Tier II & III cities: 7-10 business days
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4 md:p-5 bg-white">
                  <h4 className="font-bold text-foreground mb-2">Zone 3</h4>
                  <p className="text-sm text-muted-foreground">
                    Remote areas: 10-14 business days
                  </p>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="border border-amber-200 bg-amber-50 rounded-lg p-6 md:p-8">
              <h3 className="font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-amber-600" />
                Important Information
              </h3>
              <ul className="space-y-3 text-sm md:text-base">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-muted-foreground">
                    We ship only within India. International shipping coming soon.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-muted-foreground">
                    Weekend and public holidays are excluded from delivery timelines
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-muted-foreground">
                    All packages are insured and tracked in real-time
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-muted-foreground">
                    Free shipping applies to prepaid orders only
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
