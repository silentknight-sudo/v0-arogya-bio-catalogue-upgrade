"use client"

import type React from "react"
import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Contact form submitted:", formData)
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">Get in Touch</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Have questions about our products or services? We'd love to hear from you. Contact us anytime!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Contact Info Cards */}
            {[
              {
                icon: Phone,
                title: "Call Us",
                content: "+91 8447386076",
                desc: "Monday to Friday, 9 AM - 6 PM",
              },
              {
                icon: Mail,
                title: "Email",
                content: "official.arogyabio@gmail.com",
                desc: "We'll respond within 24 hours",
              },
              {
                icon: MapPin,
                title: "Visit Us",
                content: "68, FF1, The Hemisphere Galleria, Sector 27, Greater Noida",
                desc: "Uttar Pradesh - 201310, India",
              },
            ].map((info, idx) => {
              const Icon = info.icon
              return (
                <div
                  key={idx}
                  className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow text-center"
                >
                  <Icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-bold text-lg text-foreground mb-2">{info.title}</h3>
                  <p className="font-semibold text-foreground mb-1">{info.content}</p>
                  <p className="text-sm text-muted-foreground">{info.desc}</p>
                </div>
              )
            })}
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="+91 9876543210"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="How can we help?"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-base font-semibold"
              >
                {submitted ? "Message Sent!" : "Send Message"}
              </Button>

              {submitted && (
                <div className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg text-sm">
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
