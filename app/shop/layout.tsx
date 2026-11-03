import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Shop Gouthealth Oil & Capsules - ArogyaBio | Ayurvedic Joint Care",
  description:
    "Shop Arogya Bio Gouthealth Oil and Gouthealth Capsules – Ayurvedic joint support with Shallaki, Nirgundi and Ashwagandha. Save 20% on the Complete Care Combo.",
  keywords: [
    "buy Ayurvedic products",
    "Ayurvedic medicines online",
    "herbal supplements",
    "natural health products",
    "ArogyaBio shop",
  ],
  openGraph: {
    title: "Shop - ArogyaBio | Premium Ayurvedic Products",
    description: "Discover authentic Ayurvedic products with certified quality",
    url: "https://arogyabio.com/shop",
    type: "website",
    images: [
      {
        url: "https://arogyabio.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "ArogyaBio Shop",
      },
    ],
  },
  alternates: {
    canonical: "https://arogyabio.com/shop",
  },
}

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
