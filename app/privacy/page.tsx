"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Shield } from "lucide-react"

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-50 via-white to-amber-50 py-12 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <Shield className="w-12 h-12 md:w-16 md:h-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Privacy Policy</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your privacy is important to us. Learn how we protect your data.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 max-w-4xl prose prose-sm md:prose-base dark:prose-invert">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">1. Introduction</h2>
                <p className="text-muted-foreground mt-3">
                  ArogyaBio ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">2. Information We Collect</h2>
                <div className="mt-4 space-y-3">
                  <div>
                    <h3 className="font-semibold text-foreground">Personal Information</h3>
                    <p className="text-muted-foreground text-sm mt-2">
                      Name, email address, postal address, phone number, payment information, and any other details you voluntarily provide.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Device Information</h3>
                    <p className="text-muted-foreground text-sm mt-2">
                      Device type, browser, IP address, and other technical information collected automatically.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Usage Information</h3>
                    <p className="text-muted-foreground text-sm mt-2">
                      Pages visited, time spent on site, links clicked, and search queries.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">3. How We Use Your Information</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm md:text-base mt-4">
                  <li>Processing and fulfilling your orders</li>
                  <li>Sending order confirmations and updates</li>
                  <li>Responding to your inquiries and customer support</li>
                  <li>Sending promotional emails and newsletters (with your consent)</li>
                  <li>Improving our website and services</li>
                  <li>Preventing fraud and enhancing security</li>
                  <li>Complying with legal obligations</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">4. Data Security</h2>
                <p className="text-muted-foreground mt-3">
                  We implement industry-standard security measures including SSL encryption, secure payment gateways, and regular security audits to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">5. Sharing Your Information</h2>
                <p className="text-muted-foreground mt-3">
                  We do not sell, trade, or rent your personal information to third parties. We may share information with:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm md:text-base mt-3">
                  <li>Shipping and logistics partners (for delivery)</li>
                  <li>Payment processors (for secure transactions)</li>
                  <li>Service providers assisting with business operations</li>
                  <li>Legal authorities if required by law</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">6. Cookies and Tracking</h2>
                <p className="text-muted-foreground mt-3">
                  We use cookies and similar technologies to enhance your browsing experience, remember preferences, and analyze website traffic. You can control cookies through your browser settings.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">7. Your Rights</h2>
                <p className="text-muted-foreground mt-3">You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm md:text-base mt-3">
                  <li>Access your personal information</li>
                  <li>Request correction of inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Request a copy of your data</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">8. Third-Party Links</h2>
                <p className="text-muted-foreground mt-3">
                  Our website may contain links to third-party websites. We are not responsible for the privacy practices of external sites. Please review their privacy policies before sharing information.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">9. Policy Updates</h2>
                <p className="text-muted-foreground mt-3">
                  We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last Modified" date. Your continued use of our website constitutes acceptance of the updated policy.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">10. Contact Us</h2>
                <p className="text-muted-foreground mt-3">
                  If you have questions about this Privacy Policy or our privacy practices, please contact us at:
                </p>
                <div className="bg-secondary/30 rounded-lg p-4 md:p-5 mt-4 space-y-2">
                  <p className="text-sm md:text-base font-semibold text-foreground">ArogyaBio</p>
                  <p className="text-sm md:text-base text-muted-foreground">
                    68, FF1, The Hemisphere Galleria, Sector 27, Greater Noida, Uttar Pradesh - 201310, India
                  </p>
                  <p className="text-sm md:text-base text-muted-foreground">
                    <strong>Email:</strong> <a href="mailto:official.arogyabio@gmail.com" className="text-primary hover:underline">official.arogyabio@gmail.com</a>
                  </p>
                  <p className="text-sm md:text-base text-muted-foreground">
                    <strong>Phone:</strong> <a href="tel:+918447386076" className="text-primary hover:underline">+91 8447386076</a>
                  </p>
                </div>
              </div>

              <div className="border-t border-border pt-6 mt-8">
                <p className="text-xs md:text-sm text-muted-foreground">
                  Last Modified: January 2026
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
