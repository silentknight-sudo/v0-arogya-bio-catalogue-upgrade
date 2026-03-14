"use client"

import { useParams } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Calendar, User, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const blogPosts = [
  {
    id: "1",
    title: "The Complete Guide to Ashwagandha: Benefits & Usage",
    excerpt: "Discover the ancient herb that's transforming modern wellness.",
    category: "Wellness",
    author: "Dr. Rajesh Kumar",
    date: "June 15, 2024",
    image: "/ashwagandha-powder-ayurvedic.jpg",
  },
  {
    id: "2",
    title: "Turmeric & Curcumin: Nature's Golden Healer",
    excerpt: "Explore the science behind turmeric and how curcumin provides powerful anti-inflammatory benefits.",
    category: "Health Benefits",
    author: "Priya Sharma",
    date: "June 10, 2024",
    image: "/turmeric-supplement-ayurveda.jpg",
  },
  {
    id: "3",
    title: "Brahmi Oil: The Ultimate Brain Tonic",
    excerpt: "Learn how Brahmi oil can enhance cognitive function, improve memory, and promote mental clarity.",
    category: "Brain Health",
    author: "Dr. Meera Singh",
    date: "June 5, 2024",
    image: "/brahmi-herbal-oil.jpg",
  },
  {
    id: "4",
    title: "Women's Wellness: Shatavari Benefits",
    excerpt: "Discover how Shatavari supports feminine health, hormonal balance, and overall wellness.",
    category: "Women's Health",
    author: "Dr. Rajesh Kumar",
    date: "May 28, 2024",
    image: "/ashwagandha-powder-ayurvedic.jpg",
  },
  {
    id: "5",
    title: "Triphala Churna: The 3-Herb Wonder",
    excerpt: "Understand the synergy of three powerful herbs and how they work together for digestive health.",
    category: "Digestion",
    author: "Priya Sharma",
    date: "May 20, 2024",
    image: "/triphala-churna-powder.jpg",
  },
  {
    id: "6",
    title: "Neem: The Natural Immunity Booster",
    excerpt: "Learn why neem has been called the 'village pharmacy' and how it supports your immune system.",
    category: "Immunity",
    author: "Dr. Meera Singh",
    date: "May 15, 2024",
    image: "/neem-tablets-herbal.jpg",
  },
]

export default function BlogDetailPage() {
  const params = useParams()
  const postId = params.id as string

  const post = blogPosts.find((p) => p.id === postId) || blogPosts[0]

  const relatedPosts = blogPosts.filter((p) => p.id !== postId).slice(0, 3)

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Article Header */}
      <section className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="mb-4">
              <span className="inline-block bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                {post.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">{post.title}</h1>
            <div className="flex flex-wrap gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{post.date}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section>
        <div className="container mx-auto px-4 py-8">
          <div className="relative h-96 rounded-lg overflow-hidden">
            <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none text-foreground">
                <h2 className="text-2xl font-bold mb-4">What is {post.title.split(":")[0]}?</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {post.excerpt} In this comprehensive guide, we'll explore the benefits, traditional uses, scientific
                  research, and practical applications of this powerful Ayurvedic remedy.
                </p>

                <h2 className="text-2xl font-bold mb-4 mt-8">Traditional Uses in Ayurveda</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  This herb has been used in Ayurvedic medicine for centuries to promote health and wellness.
                  Traditional practitioners valued it for its unique properties and its ability to support overall
                  well-being.
                </p>

                <h2 className="text-2xl font-bold mb-4 mt-8">Modern Scientific Research</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Recent scientific studies have validated many of the traditional uses of this herb. Research shows it
                  contains active compounds that are responsible for its therapeutic effects.
                </p>

                <h3 className="text-xl font-bold mb-3 mt-6">Health Benefits</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Multiple studies demonstrate the significant benefits of this herb for overall wellness. It helps
                  support natural bodily functions and promotes emotional and physical balance.
                </p>

                <h2 className="text-2xl font-bold mb-4 mt-8">How to Use</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  This herb is available in various forms including powder, capsules, tablets, and herbal teas. Consult
                  with an Ayurvedic practitioner for personalized dosage recommendations.
                </p>

                <h2 className="text-2xl font-bold mb-4 mt-8">Conclusion</h2>
                <p className="text-muted-foreground leading-relaxed">
                  This herb represents the perfect blend of ancient wisdom and modern science. Whether you're looking to
                  enhance your wellness routine or support specific health goals, this powerful herb offers a natural
                  solution that has stood the test of time.
                </p>
              </div>

              {/* Share Buttons */}
              <div className="mt-12 pt-8 border-t border-border">
                <p className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Share2 className="w-5 h-5" />
                  Share This Article
                </p>
                <div className="flex gap-3">
                  {["Facebook", "Twitter", "LinkedIn"].map((platform) => (
                    <Button
                      key={platform}
                      variant="outline"
                      className="border-border hover:bg-secondary bg-transparent"
                    >
                      {platform}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Author Info */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8 sticky top-24">
                <h3 className="font-bold text-foreground mb-4">About the Author</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-2xl">👤</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{post.author}</p>
                    <p className="text-sm text-muted-foreground">Ayurveda Expert</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Expert practitioner with years of experience in natural wellness and traditional Ayurvedic medicine
                  practices.
                </p>
              </div>

              {/* Related Posts */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-bold text-foreground mb-4">Related Articles</h3>
                <div className="space-y-4">
                  {relatedPosts.map((relPost) => (
                    <Link
                      key={relPost.id}
                      href={`/blog/${relPost.id}`}
                      className="group block p-3 rounded-lg hover:bg-secondary/30 transition-colors"
                    >
                      <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {relPost.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{relPost.date}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
