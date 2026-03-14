"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { FileText } from "lucide-react"

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-50 via-white to-amber-50 py-12 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <FileText className="w-12 h-12 md:w-16 md:h-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Terms & Conditions</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Please read these terms carefully before using our website and services
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">1. Agreement to Terms</h2>
                <p className="text-muted-foreground mt-3">
                  By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">2. Use License</h2>
                <p className="text-muted-foreground mt-3">
                  Permission is granted to temporarily download one copy of the materials (information or software) on ArogyaBio's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm md:text-base mt-3">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to decompile or reverse engineer any software contained on the website</li>
                  <li>Remove or obscure any copyright or other proprietary notations</li>
                  <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                  <li>Violate any applicable laws or regulations</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">3. Disclaimer</h2>
                <p className="text-muted-foreground mt-3">
                  The materials on ArogyaBio's website are provided on an 'as is' basis. ArogyaBio makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">4. Limitations</h2>
                <p className="text-muted-foreground mt-3">
                  In no event shall ArogyaBio or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on ArogyaBio's website, even if ArogyaBio or an authorized representative has been notified orally or in writing of the possibility of such damage.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">5. Accuracy of Materials</h2>
                <p className="text-muted-foreground mt-3">
                  The materials appearing on ArogyaBio's website could include technical, typographical, or photographic errors. ArogyaBio does not warrant that any of the materials on its website are accurate, complete, or current. ArogyaBio may make changes to the materials contained on its website at any time without notice.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">6. Links</h2>
                <p className="text-muted-foreground mt-3">
                  ArogyaBio has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by ArogyaBio of the site. Use of any such linked website is at the user's own risk.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">7. Modifications</h2>
                <p className="text-muted-foreground mt-3">
                  ArogyaBio may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">8. Governing Law</h2>
                <p className="text-muted-foreground mt-3">
                  These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">9. Product Information</h2>
                <p className="text-muted-foreground mt-3">
                  Product descriptions, pricing, and availability are subject to change without notice. We strive for accuracy but do not guarantee that all product descriptions, pricing, or other content is accurate, complete, reliable, current, or error-free. If a product is listed at an incorrect price or with inaccurate information, we have the right to refuse or cancel any orders.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">10. User Accounts</h2>
                <p className="text-muted-foreground mt-3">
                  If you create an account, you are responsible for maintaining the confidentiality of your account information and password. You agree to accept responsibility for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">11. Health Disclaimer</h2>
                <p className="text-muted-foreground mt-3">
                  Our products are not intended to diagnose, treat, cure, mitigate, or prevent any disease. The statements made about our products have not been evaluated by any regulatory authority. Please consult with a qualified healthcare professional before using our products, especially if you have existing health conditions or are taking medications.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">12. Contact</h2>
                <p className="text-muted-foreground mt-3">
                  If you have any questions about these Terms and Conditions, please contact us at:
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
