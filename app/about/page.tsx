import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Award, Leaf, Heart, Users, Shield, Zap, Droplets, Target } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
              About Arogyabio: Authentic Ayurvedic Wellness Solutions
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We blend centuries of Ayurvedic wisdom with modern scientific research to deliver comprehensive health programmes and authentic herbal medicines that transform lives and restore balance to mind, body, and spirit.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                To empower millions of families across India with access to authentic, scientifically-validated Ayurvedic medicines and complete health programmes that address specific wellness goals—from immunity and digestion to heart health, stress relief, and specialized wellness needs.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-primary text-xl mt-1">✓</span>
                  <p className="text-foreground">100% organic and naturally sourced ingredients</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-primary text-xl mt-1">✓</span>
                  <p className="text-foreground">Complete health kits for targeted wellness goals</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-primary text-xl mt-1">✓</span>
                  <p className="text-foreground">Traditional Ayurvedic formulations with modern research</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                To become India's most trusted Ayurvedic brand by making comprehensive natural wellness accessible, affordable, and effective for everyone. We envision a world where preventive, holistic health solutions are the first choice for optimal well-being.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-primary text-xl mt-1">✓</span>
                  <p className="text-foreground">Sustainable farming and eco-friendly practices</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-primary text-xl mt-1">✓</span>
                  <p className="text-foreground">Support for local farmers and rural communities</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-primary text-xl mt-1">✓</span>
                  <p className="text-foreground">Education on Ayurvedic wellness principles and practices</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-16 md:py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose Arogyabio</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our unique approach to holistic wellness sets us apart
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Target,
                title: "Complete Health Kits",
                desc: "10+ specialized wellness kits addressing immunity, digestion, joints, heart health, skin, mental wellness, and more",
              },
              {
                icon: Shield,
                title: "Quality Assured",
                desc: "Rigorous testing, international certifications, and traceability from farm to your home",
              },
              {
                icon: Leaf,
                title: "100% Natural",
                desc: "No synthetic additives, preservatives, or chemicals—just pure Ayurvedic excellence",
              },
              {
                icon: Droplets,
                title: "Expert Formulated",
                desc: "Created by Ayurveda masters with decades of experience and modern scientific validation",
              },
              {
                icon: Users,
                title: "Community Focused",
                desc: "Supporting sustainable practices and fair wages for farmers in rural communities",
              },
              {
                icon: Zap,
                title: "Results Driven",
                desc: "Thousands of happy customers experiencing real transformations in their health and wellness",
              },
            ].map((item, idx) => {
              const Icon = item.icon
              return (
                <div
                  key={idx}
                  className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <Icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="font-bold text-lg text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Core Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide every decision we make
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                icon: Leaf,
                title: "Purity",
                desc: "100% natural, organic ingredients with no synthetic additives or fillers",
              },
              {
                icon: Heart,
                title: "Wellness",
                desc: "Dedicated to holistic health and preventive care for every life stage",
              },
              {
                icon: Award,
                title: "Excellence",
                desc: "Premium quality with international certifications and rigorous testing",
              },
              {
                icon: Users,
                title: "Integrity",
                desc: "Transparent practices and genuine support for farmers and communities",
              },
            ].map((value, idx) => {
              const Icon = value.icon
              return (
                <div
                  key={idx}
                  className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow border border-border"
                >
                  <Icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-bold text-lg text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Our Health Programmes */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Complete Health Programmes</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive wellness kits designed for specific health needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Immunity Boost Kit",
              "Digestive Wellness Kit",
              "Joint Care Kit",
              "Stress Relief & Mental Wellness",
              "Heart Care & Cardiovascular Health",
              "Skin & Beauty Wellness",
              "Women's Health Kit",
              "Men's Vitality & Stamina",
              "Complete Detox & Cleanse",
              "Energy & Stamina Boost",
              "Weight Management Kit",
              "Diabetes Management Kit",
            ].map((programme, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 border-l-4 border-primary shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="text-primary text-2xl font-bold">✓</span>
                  <p className="text-foreground font-semibold">{programme}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/kits">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6">
                Explore All Health Kits
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary to-accent text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "25+", label: "Years in Ayurveda" },
              { number: "60K+", label: "Happy Customers" },
              { number: "800+", label: "Products Available" },
              { number: "12", label: "Complete Health Kits" },
            ].map((stat, idx) => (
              <div key={idx}>
                <p className="text-5xl font-bold mb-2">{stat.number}</p>
                <p className="text-primary-foreground/90 font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Start Your Wellness Journey Today</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-lg">
            Discover our complete collection of authentic Ayurvedic medicines and health programmes designed specifically for your wellness goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 rounded-lg font-semibold">
                Explore Products
              </Button>
            </Link>
            <Link href="/kits">
              <Button variant="outline" className="px-8 py-6 rounded-lg font-semibold bg-transparent">
                Browse Health Kits
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
