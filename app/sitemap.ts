import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://arogyabio.com'
  const supabase = await createClient()

  // Fetch all products
  const { data: products } = await supabase
    .from('products')
    .select('id, created_at, updated_at')
    .order('updated_at', { ascending: false })
    .limit(1000)

  // Fetch all blog posts
  const { data: blogPosts } = await supabase
    .from('blog')
    .select('id, created_at, updated_at')
    .order('updated_at', { ascending: false })
    .limit(500)

  // Fetch all kits
  const { data: kits } = await supabase
    .from('health_kits')
    .select('id, created_at, updated_at')
    .order('updated_at', { ascending: false })
    .limit(500)

  // Static pages with priority
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/catalogue`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/kits`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/shipping`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/returns`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]

  // Dynamic product pages
  const productPages: MetadataRoute.Sitemap = (products || []).map((product) => ({
    url: `${baseUrl}/shop/${product.id}`,
    lastModified: product.updated_at || product.created_at,
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }))

  // Dynamic blog pages
  const blogPages: MetadataRoute.Sitemap = (blogPosts || []).map((post) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: post.updated_at || post.created_at,
    changeFrequency: 'never' as const,
    priority: 0.6,
  }))

  // Dynamic kit pages
  const kitPages: MetadataRoute.Sitemap = (kits || []).map((kit) => ({
    url: `${baseUrl}/kits/${kit.id}`,
    lastModified: kit.updated_at || kit.created_at,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...productPages, ...blogPages, ...kitPages]
}
