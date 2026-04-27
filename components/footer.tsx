import Link from "next/link"
import { Mail, MapPin, Phone, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/arogya-bio-logo.jpg" 
                alt="ArogyaBio Logo"
                className="w-10 h-10 object-contain"
              />
              <h3 className="text-xl font-bold">ArogyaBio</h3>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Premium Ayurvedic wellness products for authentic natural health and vitality.
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/40 transition-colors flex items-center justify-center"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/40 transition-colors flex items-center justify-center"
                title="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/40 transition-colors flex items-center justify-center"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/40 transition-colors flex items-center justify-center"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/catalogue" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Catalogue
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/faq" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/80">68, FF1, The Hemisphere Galleria, Sector 27, Greater Noida, Uttar Pradesh - 201310, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a
                  href="tel:+918447386076"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  +91 8447386076
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a
                  href="mailto:official.arogyabio@gmail.com"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  official.arogyabio@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-primary-foreground/10 rounded-lg p-6 mb-8 md:mb-12">
          <div className="max-w-lg">
            <h4 className="font-bold mb-2 text-lg">Subscribe to Our Newsletter</h4>
            <p className="text-primary-foreground/80 text-sm mb-4">Get exclusive wellness tips, product updates, and special offers delivered to your inbox.</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded text-foreground text-sm placeholder-gray-500"
              />
              <button className="px-6 py-2 bg-primary-foreground text-primary rounded font-semibold text-sm hover:bg-primary-foreground/90 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-6 md:pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-primary-foreground/70 text-center md:text-left mb-4">
            <div>© 2026 ArogyaBio. All rights reserved.</div>
            <div>Authentic Ayurvedic Solutions for Modern Wellness</div>
            <div className="flex justify-center md:justify-end gap-4">
              <Link href="/privacy" className="hover:text-primary-foreground transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-primary-foreground transition-colors">
                Terms
              </Link>
              <Link href="/sitemap" className="hover:text-primary-foreground transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
