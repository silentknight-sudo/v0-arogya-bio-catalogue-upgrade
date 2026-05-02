// Image Schema Markup Generation for SEO
// Helps Google recognize and index images including logo

export const createImageSchema = (
  imageUrl: string,
  name: string,
  description: string,
  width: number = 500,
  height: number = 500
) => ({
  "@context": "https://schema.org",
  "@type": "ImageObject",
  "url": imageUrl,
  "name": name,
  "description": description,
  "height": height,
  "width": width,
  "author": {
    "@type": "Organization",
    "name": "ArogyaBio"
  },
  "datePublished": new Date().toISOString(),
  "inLanguage": "en-IN"
})

// Logo specific schema
export const createLogoSchema = () => createImageSchema(
  "https://arogyabio.com/arogya-bio-logo.jpg",
  "ArogyaBio Logo",
  "Professional logo for ArogyaBio - Premium Ayurvedic Wellness Company",
  500,
  500
)

// OG Image schema
export const createOGImageSchema = () => createImageSchema(
  "https://arogyabio.com/og-image.png",
  "ArogyaBio - Premium Ayurvedic Wellness Products",
  "ArogyaBio Premium Ayurvedic Wellness Products Online India",
  1200,
  630
)

// Product image schema
export const createProductImageSchema = (
  productName: string,
  imageUrl: string,
  description: string
) => createImageSchema(
  imageUrl,
  `${productName} - ArogyaBio`,
  description,
  500,
  500
)

// Favicon schema
export const createFaviconSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ImageObject",
  "url": "https://arogyabio.com/favicon.ico",
  "name": "ArogyaBio Favicon",
  "description": "ArogyaBio website favicon",
  "height": 32,
  "width": 32,
  "author": {
    "@type": "Organization",
    "name": "ArogyaBio"
  }
})

// Enhanced Organization Schema with image
export const createEnhancedOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "ArogyaBio",
  "url": "https://arogyabio.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://arogyabio.com/arogya-bio-logo.jpg",
    "width": 500,
    "height": 500
  },
  "image": [
    "https://arogyabio.com/arogya-bio-logo.jpg",
    "https://arogyabio.com/og-image.png"
  ],
  "description": "Premium Ayurvedic wellness products and herbal medicines online in India",
  "brand": {
    "@type": "Brand",
    "name": "ArogyaBio"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "telephone": "+91-8447386076",
    "email": "info@arogyabio.com"
  },
  "sameAs": [
    "https://www.facebook.com/arogyabio",
    "https://www.instagram.com/arogyabio",
    "https://www.twitter.com/arogyabio"
  ]
})
