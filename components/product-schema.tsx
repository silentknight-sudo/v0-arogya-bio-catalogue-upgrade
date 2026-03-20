interface ProductSchemaProps {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  rating?: number
  reviewCount?: number
  availability?: string
  category?: string
}

export function ProductSchema({
  id,
  name,
  description,
  price,
  image_url,
  rating = 4.5,
  reviewCount = 100,
  availability = 'https://schema.org/InStock',
  category = 'Health & Wellness',
}: ProductSchemaProps) {
  const schema = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: name,
    description: description,
    image: image_url,
    brand: {
      '@type': 'Brand',
      name: 'ArogyaBio',
    },
    offers: {
      '@type': 'Offer',
      url: `https://arogyabio.com/shop/${id}`,
      priceCurrency: 'INR',
      price: price.toString(),
      availability: availability,
      seller: {
        '@type': 'Organization',
        name: 'ArogyaBio',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating.toString(),
      reviewCount: reviewCount.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    category: category,
    manufacturer: {
      '@type': 'Organization',
      name: 'ArogyaBio',
      url: 'https://arogyabio.com',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
