import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact - ArogyaBio | Get in Touch for Ayurvedic Wellness",
  description:
    "Contact ArogyaBio for queries about Ayurvedic products, orders, or wellness consultations. Reach us via phone, email, or contact form.",
  keywords: ["contact ArogyaBio", "customer support", "wellness consultation", "order inquiry"],
  openGraph: {
    title: "Contact - ArogyaBio",
    description: "Get in touch with ArogyaBio for product information and support",
    url: "https://arogyabio.com/contact",
    type: "website",
  },
  alternates: {
    canonical: "https://arogyabio.com/contact",
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
