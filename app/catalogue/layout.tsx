import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Catalogue - ArogyaBio | Complete Ayurvedic Products Directory",
  description:
    "Browse ArogyaBio's complete catalogue of Ayurvedic products. Find products by category including gout health, immunity, digestion, and more with detailed specifications.",
  keywords: [
    "Ayurvedic products catalogue",
    "health products directory",
    "product categories",
    "Ayurvedic remedies",
    "wellness products",
  ],
  openGraph: {
    title: "Catalogue - ArogyaBio",
    description: "Complete directory of premium Ayurvedic products",
    url: "https://arogyabio.com/catalogue",
    type: "website",
  },
  alternates: {
    canonical: "https://arogyabio.com/catalogue",
  },
}

export default function CatalogueLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
