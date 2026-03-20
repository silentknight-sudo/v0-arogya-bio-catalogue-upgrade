import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { LocalSEOSchema } from "@/components/local-seo-schema"
import { GoogleAnalytics } from "@/components/google-analytics"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ArogyaBio - Ayurvedic Products Online India | Premium Wellness & Herbal Medicines",
  description:
    "Shop premium Ayurvedic products online in India at ArogyaBio. Authentic, certified herbal medicines and natural wellness solutions backed by 5000+ years of Ayurvedic wisdom. Fast delivery across India.",
  keywords: [
    "Ayurvedic products online",
    "Ayurvedic products India",
    "herbal medicines",
    "natural wellness products",
    "Ayurveda supplements",
    "organic health products",
    "Ayurvedic remedies",
    "herbal supplements India",
    "natural health supplements",
    "ArogyaBio wellness",
  ],
  authors: [{ name: "ArogyaBio", url: "https://arogyabio.com" }],
  creator: "ArogyaBio",
  publisher: "ArogyaBio",
  formatDetection: {
    email: false,
    telephone: true,
    address: true,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://arogyabio.com",
    siteName: "ArogyaBio - Authentic Ayurvedic Wellness",
    title: "ArogyaBio - Ayurvedic Products Online India | Premium Wellness",
    description:
      "Discover authentic Ayurvedic products online in India. Premium herbal medicines and natural wellness solutions with certified quality and fast delivery.",
    images: [
      {
        url: "https://arogyabio.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "ArogyaBio - Premium Ayurvedic Products",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ArogyaBio - Ayurvedic Products Online India",
    description: "Premium herbal medicines and natural wellness solutions",
    images: ["https://arogyabio.com/og-image.png"],
    creator: "@ArogyaBio",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "your-google-search-console-code", // Replace with actual GSC code
  },
  alternates: {
    canonical: "https://arogyabio.com",
    languages: {
      "en-IN": "https://arogyabio.com",
      hi: "https://arogyabio.com/hi", // Add Hindi version when available
    },
  },
  generator: "v0.app",
  icons: {
    icon: "/arogya-bio-logo.png",
    shortcut: "/arogya-bio-logo.png",
    apple: "/arogya-bio-logo.png",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ArogyaBio",
    url: "https://arogyabio.com",
    logo: "https://arogyabio.com/arogya-bio-logo.png",
    description: "Premium Ayurvedic wellness products and herbal medicines",
    sameAs: [
      "https://www.facebook.com/arogyabio",
      "https://www.instagram.com/arogyabio",
      "https://www.twitter.com/arogyabio",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      telephone: "+91-8447386076",
      email: "official.arogyabio@gmail.com",
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "68, FF1, The Hemisphere Galleria, Sector 27",
      addressLocality: "Greater Noida",
      addressRegion: "Uttar Pradesh",
      postalCode: "201310",
      addressCountry: "IN",
    },
  }

  // Website Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ArogyaBio",
    url: "https://arogyabio.com",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://arogyabio.com/shop?search={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <html lang="en">
      <head>
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        <GoogleAnalytics />
        <LocalSEOSchema />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
