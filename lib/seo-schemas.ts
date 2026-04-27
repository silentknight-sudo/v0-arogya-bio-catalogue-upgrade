export const createOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ArogyaBio",
  url: "https://arogyabio.com",
  logo: "https://arogyabio.com/arogya-bio-logo.jpg",
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
    email: "info@arogyabio.com",
  },
})

export const createLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "ArogyaBio",
  image: "https://arogyabio.com/arogya-bio-logo.jpg",
  description: "Premium Ayurvedic wellness products and herbal medicines in India",
  telephone: "+91-8447386076",
  email: "info@arogyabio.com",
  url: "https://arogyabio.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Wellness Street, Mumbai",
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    postalCode: "400000",
    addressCountry: "IN",
  },
  areaServed: {
    "@type": "Country",
    name: "IN",
  },
  priceRange: "₹500 - ₹10000",
})

export const createProductSchema = (product: any) => ({
  "@context": "https://schema.org/",
  "@type": "Product",
  name: product.name,
  image: product.image_url,
  description: product.description,
  brand: {
    "@type": "Brand",
    name: "ArogyaBio",
  },
  offers: {
    "@type": "Offer",
    url: `https://arogyabio.com/shop/${product.id}`,
    priceCurrency: "INR",
    price: product.price.toString(),
    availability: product.stock_quantity > 0 ? "InStock" : "OutOfStock",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.5",
    ratingCount: "100",
  },
})

export const createBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
})

export const createFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
})
