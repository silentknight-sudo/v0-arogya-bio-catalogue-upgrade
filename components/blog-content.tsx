"use client"

import { useState } from "react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Search, Calendar, User } from "lucide-react"

export default function BlogContent() {
  const [searchQuery, setSearchQuery] = useState("")

  const blogPosts = [
    {
      id: 1,
      title: "Complete Health Kits: The Arogyabio Approach to Wellness",
      excerpt: "Discover how complete health kits combine multiple products to address specific wellness goals holistically.",
      category: "Wellness Programs",
      author: "Dr. Rajesh Kumar",
      date: "January 18, 2026",
      image: "/blog/complete-health-kits.jpg",
      content: "Arogyabio's complete health kits are scientifically designed combinations of complementary Ayurvedic products that work synergistically to support specific health goals. Each kit is crafted based on traditional wisdom and modern research...",
    },
    {
      id: 2,
      title: "Immunity Boost: Build Your Natural Defense System",
      excerpt: "Learn how the Arogyabio Immunity Kit strengthens your body's natural defenses against seasonal challenges.",
      category: "Immunity",
      author: "Dr. Meera Singh",
      date: "January 15, 2026",
      image: "/blog/immunity-boost.jpg",
      content: "A strong immune system is your body's best defense. The Arogyabio Immunity Boost Kit combines turmeric, ashwagandha, neem, and other potent herbs...",
    },
    {
      id: 3,
      title: "Digestive Wellness: Restoring Agni (Digestive Fire)",
      excerpt: "Explore how proper digestion is the foundation of all health according to Ayurveda.",
      category: "Digestion",
      author: "Priya Sharma",
      date: "January 12, 2026",
      image: "/blog/digestive-wellness.jpg",
      content: "In Ayurveda, weak digestion is the root cause of most health imbalances. Our Digestive Wellness Kit includes triphala, ginger, fennel, and more...",
    },
    {
      id: 4,
      title: "Joint Care: Natural Relief for Mobility & Comfort",
      excerpt: "Discover how Ayurvedic herbs can support joint health and mobility naturally.",
      category: "Joint Health",
      author: "Dr. Rajesh Kumar",
      date: "January 8, 2026",
      image: "/blog/joint-care.jpg",
      content: "Joint discomfort affects millions. The Arogyabio Joint Care Kit combines turmeric, boswellia, ginger, and ashwagandha to support natural comfort...",
    },
    {
      id: 5,
      title: "Heart Health: Ayurvedic Support for Cardiovascular Wellness",
      excerpt: "Learn how traditional Ayurvedic herbs support heart health and circulation naturally.",
      category: "Heart Health",
      author: "Dr. Meera Singh",
      date: "January 5, 2026",
      image: "/blog/heart-health.jpg",
      content: "Heart health is paramount. Our Heart Care Kit includes arjuna, brahmi, ashwagandha, and other herbs traditionally used to support cardiovascular wellness...",
    },
    {
      id: 6,
      title: "Stress Relief & Mental Clarity: Balance Your Mind",
      excerpt: "Discover how the Stress Relief Kit helps calm your mind and promote emotional balance.",
      category: "Mental Wellness",
      author: "Priya Sharma",
      date: "January 2, 2026",
      image: "/blog/stress-relief.jpg",
      content: "Mental wellness is essential in today's fast-paced world. The Arogyabio Stress Relief Kit combines brahmi, ashwagandha, and other adaptogenic herbs...",
    },
    {
      id: 7,
      title: "Women's Wellness: Hormonal Balance & Natural Support",
      excerpt: "Explore how the Women's Health Kit supports every phase of a woman's wellness journey.",
      category: "Women's Health",
      author: "Dr. Meera Singh",
      date: "December 28, 2025",
      image: "/blog/womens-wellness.jpg",
      content: "Women face unique health challenges at different life stages. The Women's Wellness Kit features shatavari, ashoka, and other traditionally used herbs...",
    },
    {
      id: 8,
      title: "Skin Beauty: Natural Glow from Within",
      excerpt: "Learn how Ayurvedic herbs support skin health and natural radiance.",
      category: "Beauty & Skin",
      author: "Priya Sharma",
      date: "December 25, 2025",
      image: "/blog/skin-beauty.jpg",
      content: "True beauty comes from within. The Arogyabio Skin & Beauty Kit combines neem, turmeric, brahmi, and other purifying herbs for radiant skin...",
    },
    {
      id: 9,
      title: "Weight Management: Sustainable Natural Wellness",
      excerpt: "Discover how the Weight Management Kit supports healthy metabolism and natural balance.",
      category: "Weight Management",
      author: "Dr. Rajesh Kumar",
      date: "December 22, 2025",
      image: "/blog/weight-management.jpg",
      content: "Sustainable weight management starts with proper digestion and metabolism. The Weight Management Kit includes triphala, ginger, and metabolism-supporting herbs...",
    },
    {
      id: 10,
      title: "Energy & Stamina: Boost Your Vitality",
      excerpt: "Learn how Ayurvedic tonics can naturally enhance energy and physical performance.",
      category: "Energy",
      author: "Dr. Meera Singh",
      date: "December 19, 2025",
      image: "/blog/energy-stamina.jpg",
      content: "Low energy affects your daily life. The Energy & Stamina Kit features ashwagandha, shatavari, and traditional vitalizing herbs...",
    },
    {
      id: 11,
      title: "Diabetes Management: Ayurvedic Support for Blood Sugar Balance",
      excerpt: "Explore how Arogyabio's Diabetes Care Kit supports natural blood sugar management.",
      category: "Chronic Health",
      author: "Priya Sharma",
      date: "December 16, 2025",
      image: "/blog/diabetes-management.jpg",
      content: "Blood sugar balance is crucial. The Diabetes Care Kit combines fenugreek, bitter melon, turmeric, and other traditionally used herbs...",
    },
    {
      id: 12,
      title: "The Arogyabio Difference: Quality, Purity & Authenticity",
      excerpt: "Learn what makes Arogyabio the trusted choice for authentic Ayurvedic wellness.",
      category: "About Us",
      author: "Dr. Rajesh Kumar",
      date: "December 10, 2025",
      image: "/blog/arogyabio-difference.jpg",
      content: "At Arogyabio, we're committed to bringing authentic Ayurvedic wellness to every family. Our rigorous quality standards, sustainable sourcing, and expert formulations...",
    },
  ]

  const categories = ["All", "Wellness Programs", "Immunity", "Digestion", "Joint Health", "Heart Health", "Mental Wellness", "Women's Health", "Beauty & Skin", "Weight Management", "Energy", "Chronic Health", "About Us"]

  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredPosts = blogPosts.filter((post) => selectedCategory === "All" || post.category === selectedCategory)

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
              Wellness Blog & Articles
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Expert insights on Ayurveda, natural health, and wellness tips to help you live your best life.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative max-w-2xl">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-lg border border-border bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    selectedCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary hover:bg-secondary/80 text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group cursor-pointer h-full">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                      {post.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{post.excerpt}</p>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground pt-4 border-t border-border">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* No Results */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No articles found in this category.</p>
              <Button
                onClick={() => setSelectedCategory("All")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                View All Articles
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Subscribe to Wellness Updates</h2>
            <p className="text-muted-foreground mb-8">
              Get the latest articles, health tips, and product recommendations delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
