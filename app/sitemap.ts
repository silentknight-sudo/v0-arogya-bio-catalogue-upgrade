import { MetadataRoute } from "next"

const BASE_URL = "https://arogyabio.com"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages = [
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/shop`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/catalogue`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.85,
    },
  ]

  // Try to fetch products from database
  let productPages: MetadataRoute.Sitemap = []
  try {
    // You can add dynamic product fetching here when ready
    // For now, products will be added through other means
    productPages = []
  } catch (error) {
    console.log("[v0] Could not fetch products for sitemap")
  }

  return [...staticPages, ...productPages]
}
