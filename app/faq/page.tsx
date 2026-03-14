"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ChevronDown } from "lucide-react"

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      category: "Products",
      items: [
        {
          q: "Are your products 100% natural?",
          a: "Yes, all our products are made from 100% natural and organic ingredients sourced directly from certified suppliers. We do not use any synthetic chemicals, additives, or preservatives.",
        },
        {
          q: "How long does it take to see results?",
          a: "Results vary depending on individual health conditions and product usage. Most customers report noticeable benefits within 2-4 weeks of consistent use. For optimal results, we recommend using our products for at least 3 months.",
        },
        {
          q: "Are the products safe for long-term use?",
          a: "Yes, all our Ayurvedic formulations are designed for safe, long-term use. However, we recommend consulting with a healthcare professional before use, especially if you have existing medical conditions or are taking medications.",
        },
        {
          q: "Do you have any side effects?",
          a: "Our products are formulated to be gentle and well-tolerated. Side effects are extremely rare. Some people may experience mild detoxification symptoms initially, which is a normal response. If you experience any unusual reactions, discontinue use and consult a doctor.",
        },
      ],
    },
    {
      category: "Orders & Shipping",
      items: [
        {
          q: "What is your shipping policy?",
          a: "We offer free shipping on orders above ₹500 within India. Standard delivery takes 5-7 business days. Express shipping (2-3 days) is also available for an additional charge.",
        },
        {
          q: "Do you ship internationally?",
          a: "Currently, we ship within India only. We are working on international shipping options and will announce availability soon.",
        },
        {
          q: "How can I track my order?",
          a: "Once your order ships, you'll receive a tracking number via email. You can use this number to track your package on the courier website in real-time.",
        },
        {
          q: "Can I cancel or modify my order?",
          a: "Orders can be cancelled or modified within 2 hours of placement. Please contact us immediately at official.arogyabio@gmail.com with your order details.",
        },
      ],
    },
    {
      category: "Returns & Refunds",
      items: [
        {
          q: "What is your return policy?",
          a: "We offer a 30-day money-back guarantee if you're not satisfied with our products. Products must be unused and in original packaging. Please refer to our Returns page for complete details.",
        },
        {
          q: "How do I initiate a return?",
          a: "Contact us at official.arogyabio@gmail.com with your order number and reason for return. We'll provide you with return shipping instructions and a prepaid label.",
        },
        {
          q: "How long does refund processing take?",
          a: "Once we receive and inspect your returned product, refunds are processed within 7-10 business days to your original payment method.",
        },
      ],
    },
    {
      category: "Account & Payment",
      items: [
        {
          q: "How do I create an account?",
          a: "Click on the 'Login' button in the header, then select 'Sign Up'. Fill in your details and verify your email. Your account will be ready to use instantly.",
        },
        {
          q: "What payment methods do you accept?",
          a: "We accept all major credit cards (Visa, Mastercard, American Express), debit cards, UPI, and net banking. All payments are secured with SSL encryption.",
        },
        {
          q: "Is my payment information secure?",
          a: "Yes, we use industry-standard SSL encryption to protect all payment information. We never store full credit card details on our servers.",
        },
      ],
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-50 via-white to-amber-50 py-12 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about our products, orders, and policies
            </p>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 max-w-3xl">
            {faqs.map((section, sectionIdx) => (
              <div key={sectionIdx} className="mb-10 md:mb-14">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">{section.category}</h2>
                <div className="space-y-3 md:space-y-4">
                  {section.items.map((faq, idx) => {
                    const globalIdx = sectionIdx * 100 + idx
                    return (
                      <div
                        key={globalIdx}
                        className="border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <button
                          onClick={() => toggleFAQ(globalIdx)}
                          className="w-full p-4 md:p-5 flex items-center justify-between bg-white hover:bg-secondary/30 transition-colors text-left"
                        >
                          <span className="font-semibold text-foreground text-sm md:text-base pr-4">{faq.q}</span>
                          <ChevronDown
                            className={`w-5 h-5 text-primary flex-shrink-0 transition-transform ${
                              openIndex === globalIdx ? "transform rotate-180" : ""
                            }`}
                          />
                        </button>

                        {openIndex === globalIdx && (
                          <div className="px-4 md:px-5 py-4 md:py-5 bg-secondary/20 border-t border-border">
                            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{faq.a}</p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-primary-foreground py-12 md:py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Still have questions?</h2>
            <p className="text-primary-foreground/80 max-w-md mx-auto mb-6">
              We're here to help! Contact our support team for any other inquiries.
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
