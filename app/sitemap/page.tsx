"use client"

import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { MapPin } from "lucide-react"

export default function SitemapPage() {
  const siteStructure = [
    {
      category: "Main Pages",
      links: [
        { label: "Home", href: "/" },
        { label: "Shop", href: "/shop" },
        { label: "Catalogue", href: "/catalogue" },
        { label: "About Us", href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      category: "Customer Support",
      links: [
        { label: "FAQs", href: "/faq" },
        { label: "Shipping Info", href: "/shipping" },
        { label: "Return Policy", href: "/returns" },
        { label: "Contact Support", href: "/contact" },
      ],
    },
    {
      category: "Account & Orders",
      links: [
        { label: "My Profile", href: "/profile" },
        { label: "My Orders", href: "/profile/orders" },
        { label: "Shopping Cart", href: "/cart" },
        { label: "Wishlist", href: "/wishlist" },
      ],
    },
    {
      category: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms & Conditions", href: "/terms" },
        { label: "Sitemap", href: "/sitemap" },
      ],
    },
    {
      category: "Product Categories",
      links: [
        { label: "Immunity Boosters", href: "/shop?category=immunity" },
        { label: "Digestion & Wellness", href: "/shop?category=digestion" },
        { label: "Sleep & Relaxation", href: "/shop?category=sleep" },
        { label: "Joint & Flexibility", href: "/shop?category=joints" },
        { label: "Skin & Beauty", href: "/shop?category=skin" },
        { label: "Energy & Vitality", href: "/shop?category=energy" },
      ],
    },
  ]

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-50 via-white to-amber-50 py-12 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <MapPin className="w-12 h-12 md:w-16 md:h-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Sitemap</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Navigate through all pages and content on ArogyaBio
            </p>
          </div>
        </section>

        {/* Sitemap Content */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {siteStructure.map((section, idx) => (
                <div key={idx} className="bg-white border border-border rounded-lg p-6 md:p-8 hover:shadow-lg transition-shadow">
                  <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 pb-3 border-b-2 border-primary">
                    {section.category}
                  </h2>
                  <ul className="space-y-2 md:space-y-3">
                    {section.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        <Link
                          href={link.href}
                          className="text-primary hover:text-primary/80 hover:underline transition-colors text-sm md:text-base flex items-center gap-2"
                        >
                          <span className="text-primary/40">→</span>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="mt-12 md:mt-16 bg-primary/5 border border-primary/20 rounded-lg p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">Quick Links</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Link href="/" className="text-primary hover:text-primary/80 hover:underline transition-colors">
                  ✓ Home
                </Link>
                <Link href="/shop" className="text-primary hover:text-primary/80 hover:underline transition-colors">
                  ✓ Start Shopping
                </Link>
                <Link href="/contact" className="text-primary hover:text-primary/80 hover:underline transition-colors">
                  ✓ Get in Touch
                </Link>
                <a href="mailto:official.arogyabio@gmail.com" className="text-primary hover:text-primary/80 hover:underline transition-colors">
                  ✓ Email Us
                </a>
                <a href="tel:+918447386076" className="text-primary hover:text-primary/80 hover:underline transition-colors">
                  ✓ Call Us
                </a>
                <Link href="/faq" className="text-primary hover:text-primary/80 hover:underline transition-colors">
                  ✓ FAQ
                </Link>
              </div>
            </div>

            {/* Contact Info */}
            <div className="mt-12 md:mt-16 p-6 md:p-8 border border-border rounded-lg bg-secondary/30">
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Address</h4>
                  <p className="text-sm md:text-base text-muted-foreground">
                    68, FF1, The Hemisphere Galleria,<br />
                    Sector 27, Greater Noida,<br />
                    Uttar Pradesh - 201310, India
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Get in Touch</h4>
                  <p className="text-sm md:text-base text-muted-foreground mb-2">
                    <strong>Email:</strong> <a href="mailto:official.arogyabio@gmail.com" className="text-primary hover:underline">official.arogyabio@gmail.com</a>
                  </p>
                  <p className="text-sm md:text-base text-muted-foreground">
                    <strong>Phone:</strong> <a href="tel:+918447386076" className="text-primary hover:underline">+91 8447386076</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary text-primary-foreground py-12 md:py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Explore Our Collection</h2>
            <p className="text-primary-foreground/80 max-w-md mx-auto mb-6">
              Discover premium Ayurvedic products for your wellness journey
            </p>
            <Link href="/shop">
              <button className="px-8 py-3 bg-primary-foreground text-primary rounded-full font-semibold hover:shadow-lg transition-all hover:scale-105">
                Visit Shop
              </button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
