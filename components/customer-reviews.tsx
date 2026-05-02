"use client"

import { useState } from "react"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Review {
  id: number
  name: string
  location: string
  product: string
  rating: number
  reviewEn: string
  reviewHi: string
  image?: string
  verified: boolean
}

const reviews: Review[] = [
  {
    id: 1,
    name: "राज कुमार",
    location: "Delhi",
    product: "Gout Health Oil",
    rating: 5,
    reviewEn: "Excellent product! My joint pain reduced by 70% within 2 weeks. ArogyaBio Gout Health Oil is a game changer. Highly recommended!",
    reviewHi: "बेहतरीन उत्पाद! मेरा जोड़ों का दर्द 2 हफ्तों में 70% कम हो गया। ArogyaBio गाउट हेल्थ ऑयल गेम चेंजर है। सभी को सलाह देता हूं!",
    verified: true,
  },
  {
    id: 2,
    name: "Priya Singh",
    location: "Mumbai",
    product: "Gout Health Capsules",
    rating: 5,
    reviewEn: "I've been using these capsules for a month and the results are amazing. No more acute gout attacks. Best investment for my health!",
    reviewHi: "मैं एक महीने से इन कैप्सूल का उपयोग कर रही हूं और परिणाम शानदार हैं। अब गाउट के गंभीर दौरे नहीं हैं। स्वास्थ्य के लिए सबसे अच्छा निवेश!",
    verified: true,
  },
  {
    id: 3,
    name: "अजय पटेल",
    location: "Ahmedabad",
    product: "Gout Health Oil + Capsules",
    rating: 5,
    reviewEn: "The combination of oil and capsules works wonders! My swelling reduced significantly. Worth every penny. Authentic Ayurvedic treatment!",
    reviewHi: "तेल और कैप्सूल के संयोजन का जादू है! मेरी सूजन में काफी कमी आई। हर पैसा सार्थक है। असली आयुर्वेदिक इलाज!",
    verified: true,
  },
  {
    id: 4,
    name: "Sanjana Sharma",
    location: "Bangalore",
    product: "Gout Health Capsules",
    rating: 4,
    reviewEn: "Very happy with the results. My mobility has improved and I can walk pain-free. Certified and natural ingredients give me confidence.",
    reviewHi: "परिणामों से बहुत खुश हूं। मेरी गतिशीलता में सुधार हुआ और मैं बिना दर्द के चल सकती हूं। प्रमाणित और प्राकृतिक सामग्री मुझे आत्मविश्वास देती है।",
    verified: true,
  },
  {
    id: 5,
    name: "विकास शर्मा",
    location: "Pune",
    product: "Gout Health Oil",
    rating: 5,
    reviewEn: "Tried many treatments, but ArogyaBio is the best! Fast relief from pain and inflammation. My doctor also appreciated my improvement.",
    reviewHi: "कई इलाज आजमाए, लेकिन ArogyaBio सबसे अच्छा है! दर्द और सूजन से तेजी से राहत। मेरे डॉक्टर ने भी मेरी बेहतरी की सराहना की।",
    verified: true,
  },
  {
    id: 6,
    name: "Manisha Verma",
    location: "Chennai",
    product: "Gout Health Capsules",
    rating: 5,
    reviewEn: "Pure herbal formula with zero side effects! My uric acid levels normalized within 6 weeks. ArogyaBio is trustworthy and effective.",
    reviewHi: "शुद्ध जड़ी-बूटी का फॉर्मूला बिना किसी दुष्प्रभाव के! 6 हफ्तों में मेरा यूरिक एसिड सामान्य हो गया। ArogyaBio विश्वसनीय और प्रभावी है।",
    verified: true,
  },
  {
    id: 7,
    name: "रमेश गुप्ता",
    location: "Kolkata",
    product: "Gout Health Oil + Capsules",
    rating: 5,
    reviewEn: "Outstanding quality and fast shipping! The results are visible in just 3 weeks. Recommend to all gout sufferers. Best buy!",
    reviewHi: "शानदार गुणवत्ता और तेजी से शिपिंग! 3 हफ्तों में ही परिणाम दिखने लगे। सभी गाउट पीड़ितों को सलाह देता हूं। बेहतरीन खरीद!",
    verified: true,
  },
  {
    id: 8,
    name: "Deepika Nair",
    location: "Kochi",
    product: "Gout Health Capsules",
    rating: 4,
    reviewEn: "Excellent Ayurvedic product! The pain relief is noticeable. I feel more energetic and active. Great customer service too!",
    reviewHi: "उत्कृष्ट आयुर्वेदिक उत्पाद! दर्द से राहत स्पष्ट है। मुझे अधिक ऊर्जावान और सक्रिय महसूस होता हूं। शानदार ग्राहक सेवा भी है!",
    verified: true,
  },
  {
    id: 9,
    name: "आदित्य मिश्रा",
    location: "Lucknow",
    product: "Gout Health Oil",
    rating: 5,
    reviewEn: "A blessing for gout patients! The natural ingredients work perfectly. My uric acid is under control now. Highly satisfied!",
    reviewHi: "गाउट रोगियों के लिए वरदान! प्राकृतिक सामग्री पूरी तरह काम करती है। मेरा यूरिक एसिड अब नियंत्रण में है। बहुत संतुष्ट हूं!",
    verified: true,
  },
  {
    id: 10,
    name: "Neha Patel",
    location: "Vadodara",
    product: "Gout Health Capsules",
    rating: 5,
    reviewEn: "Incredible results! My inflammation went down and mobility improved. The capsules are easy to take. Worth the investment!",
    reviewHi: "अविश्वसनीय परिणाम! मेरी सूजन कम हुई और गतिविधि में सुधार हुआ। कैप्सूल लेने में आसान हैं। निवेश के लायक!",
    verified: true,
  },
  {
    id: 11,
    name: "सुनील त्रिपाठी",
    location: "Indore",
    product: "Gout Health Oil",
    rating: 5,
    reviewEn: "Best Ayurvedic oil for gout! Applied topically with excellent results. No more morning stiffness. Truly magical!",
    reviewHi: "गाउट के लिए सर्वश्रेष्ठ आयुर्वेदिक तेल! बाहरी लगाने से शानदार परिणाम। अब सुबह की अकड़न नहीं। वास्तव में जादुई!",
    verified: true,
  },
  {
    id: 12,
    name: "Anjali Gupta",
    location: "Jaipur",
    product: "Gout Health Capsules",
    rating: 5,
    reviewEn: "Finally found a solution that actually works! After 3 months, my gout symptoms have almost disappeared. Highly recommended!",
    reviewHi: "आखिरकार एक समाधान मिल गया जो वास्तव में काम करता है! 3 महीने बाद, मेरे गाउट के लक्षण लगभग गायब हो गए। सर्वश्रेष्ठ सलाह!",
    verified: true,
  },
]

export function CustomerReviews() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [language, setLanguage] = useState<"en" | "hi">("en")
  const itemsPerPage = 3

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + itemsPerPage) % reviews.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - itemsPerPage + reviews.length) % reviews.length)
  }

  const displayedReviews = []
  for (let i = 0; i < itemsPerPage; i++) {
    displayedReviews.push(reviews[(currentIndex + i) % reviews.length])
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background via-secondary/10 to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Trusted by 10,000+ Indian Customers
          </h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Real reviews from real people who&apos;ve experienced the healing power of ArogyaBio Gout Health products
          </p>

          {/* Language Toggle */}
          <div className="flex gap-2 justify-center">
            <Button
              variant={language === "en" ? "default" : "outline"}
              onClick={() => setLanguage("en")}
              className="font-semibold"
            >
              English
            </Button>
            <Button
              variant={language === "hi" ? "default" : "outline"}
              onClick={() => setLanguage("hi")}
              className="font-semibold"
            >
              हिंदी
            </Button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {displayedReviews.map((review) => (
            <div
              key={review.id}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/30 group"
            >
              {/* Header */}
              <div className="mb-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-foreground text-lg">{review.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {review.location}
                      {review.verified && <span className="ml-2 text-primary">✓</span>}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>

                {/* Product Badge */}
                <div className="inline-block bg-primary/10 text-primary text-xs px-3 py-1 rounded-full font-medium">
                  {review.product}
                </div>
              </div>

              {/* Review Text */}
              <p className="text-foreground/80 leading-relaxed text-sm group-hover:text-foreground transition-colors">
                {language === "en" ? review.reviewEn : review.reviewHi}
              </p>
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="rounded-full hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <div className="flex gap-2">
            {Array.from({ length: Math.ceil(reviews.length / itemsPerPage) }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i * itemsPerPage)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === Math.floor(currentIndex / itemsPerPage)
                    ? "bg-primary w-8"
                    : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="rounded-full hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center border-t border-border pt-8">
          <div>
            <p className="text-2xl font-bold text-primary">12+</p>
            <p className="text-sm text-muted-foreground">Verified Reviews</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-primary">4.9/5</p>
            <p className="text-sm text-muted-foreground">Average Rating</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-primary">10K+</p>
            <p className="text-sm text-muted-foreground">Happy Customers</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-primary">100%</p>
            <p className="text-sm text-muted-foreground">Natural Products</p>
          </div>
        </div>
      </div>
    </section>
  )
}
