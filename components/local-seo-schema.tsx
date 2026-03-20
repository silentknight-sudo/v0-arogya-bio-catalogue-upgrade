export function LocalSEOSchema() {
  // LocalBusiness Schema for India
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://arogyabio.com',
    name: 'ArogyaBio - Authentic Ayurvedic Wellness',
    image: 'https://arogyabio.com/og-image.png',
    description:
      'Premium Ayurvedic products and natural wellness solutions delivered across India. Authentic, certified herbal medicines backed by 5000+ years of Ayurvedic wisdom.',
    url: 'https://arogyabio.com',
    telephone: '+91-8447386076',
    email: 'official.arogyabio@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '68, FF1, The Hemisphere Galleria, Sector 27',
      addressLocality: 'Greater Noida',
      addressRegion: 'Uttar Pradesh',
      postalCode: '201310',
      addressCountry: 'IN',
    },
    areaServed: {
      '@type': 'Country',
      name: 'IN',
    },
    serviceArea: {
      '@type': 'GeoShape',
      addressCountry: 'IN',
    },
    sameAs: [
      'https://www.facebook.com/arogyabio',
      'https://www.instagram.com/arogyabio',
      'https://www.twitter.com/arogyabio',
      'https://www.linkedin.com/company/arogyabio',
    ],
    priceRange: '₹299-₹5999',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '09:00',
        closes: '21:00',
      },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      telephone: '+91-8447386076',
      email: 'official.arogyabio@gmail.com',
      areaServed: 'IN',
      availableLanguage: ['en', 'hi'],
    },
    knowsAbout: [
      'Ayurvedic Products',
      'Herbal Medicines',
      'Natural Wellness',
      'Health Supplements',
      'Ayurveda Treatments',
    ],
  }

  // Service Area - Multiple Cities in India
  const serviceAreaSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'ArogyaBio - Ayurvedic Products India',
    url: 'https://arogyabio.com',
    areaServed: [
      {
        '@type': 'City',
        name: 'Delhi',
        areaServed: 'IN-DL',
      },
      {
        '@type': 'City',
        name: 'Mumbai',
        areaServed: 'IN-MH',
      },
      {
        '@type': 'City',
        name: 'Bangalore',
        areaServed: 'IN-KA',
      },
      {
        '@type': 'City',
        name: 'Hyderabad',
        areaServed: 'IN-TG',
      },
      {
        '@type': 'City',
        name: 'Pune',
        areaServed: 'IN-MH',
      },
      {
        '@type': 'City',
        name: 'Kolkata',
        areaServed: 'IN-WB',
      },
      {
        '@type': 'City',
        name: 'Chennai',
        areaServed: 'IN-TN',
      },
      {
        '@type': 'City',
        name: 'Ahmedabad',
        areaServed: 'IN-GJ',
      },
    ],
  }

  // FAQPage Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Are ArogyaBio products authentic Ayurvedic products?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, all ArogyaBio products are authentic, certified, and formulated according to traditional Ayurvedic principles backed by scientific research.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the delivery timeline for Ayurvedic products?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We deliver across India with standard delivery in 3-5 business days and express delivery available in major cities.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are the herbal medicines safe?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'All our herbal medicines are formulated with natural ingredients, certified by quality standards, and safe for regular use. Always consult a healthcare provider for specific conditions.',
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceAreaSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}
