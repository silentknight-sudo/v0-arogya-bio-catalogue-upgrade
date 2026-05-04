"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Check, Zap, Heart, Award, Clock, Truck } from "lucide-react"

export default function GoutComboHindiPage() {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)

  const handleOrderNow = async () => {
    setIsProcessing(true)
    try {
      router.push("/checkout?combo=gout-health-combo")
    } catch (error) {
      console.log("[v0] Order redirect error:", error)
      alert("चेकआउट में त्रुटि हुई। कृपया दोबारा प्रयास करें।")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 via-green-50 to-emerald-50">
      {/* Urgency Banner */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-3 px-4 text-center text-sm font-bold animate-pulse">
        ⏰ सीमित स्टॉक - सिर्फ 47 कॉम्बो बचे हैं! अभी ऑर्डर करें - कीमत बढ़ने से पहले!
      </div>

      {/* Hero Section with Product Image */}
      <section className="relative py-0 px-4 overflow-hidden">
        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center pt-8">
            {/* Hero Image */}
            <div className="order-2 md:order-1">
              <Image
                src="/gout-combo-hero.jpg"
                alt="गाउट हेल्थ कॉम्बो - तेल और कैप्सूल"
                width={500}
                height={600}
                className="w-full h-auto rounded-2xl shadow-2xl"
                priority
              />
            </div>

            {/* Left: Offer Details */}
            <div className="order-1 md:order-2">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-2 rounded-full mb-6 font-bold text-sm md:text-base">
                <Zap className="w-4 h-4" />
                सीमित समय की पेशकश!
              </div>

              <h1 className="text-5xl md:text-6xl font-black text-foreground mb-6 text-balance leading-tight">
                जोड़ों के दर्द से <span className="text-transparent bg-gradient-to-r from-red-600 to-green-600 bg-clip-text">छुटकारा पाएं!</span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-semibold">
                100% आयुर्वेदिक गाउट हेल्थ कॉम्बो से तुरंत और स्थायी राहत पाएं। तेल तुरंत दर्द घटाता है, कैप्सूल भविष्य में दर्द रोकते हैं।
              </p>

              {/* Price Display */}
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 border-4 border-green-600 rounded-2xl p-8 mb-8 shadow-lg">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground font-bold mb-2">सामान्य कीमत</p>
                    <p className="text-2xl font-bold line-through text-red-600">₹2,499</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-full w-28 h-28 flex flex-col items-center justify-center shadow-lg">
                      <p className="text-4xl font-black">20%</p>
                      <p className="text-xs font-bold">छूट</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-bold mb-2">आज की कीमत</p>
                    <p className="text-4xl font-black text-green-700">₹1,999</p>
                  </div>
                </div>
                <p className="text-center text-green-700 font-black mt-4 text-xl">₹500 की बचत करें!</p>
              </div>

              {/* Main CTA Button */}
              <Button
                onClick={handleOrderNow}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-black py-8 text-2xl rounded-xl shadow-2xl mb-4 disabled:opacity-50"
              >
                {isProcessing ? "प्रोसेस हो रहा है..." : "🛒 अभी ऑर्डर करें - ₹1,999"}
              </Button>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 text-center mb-6">
                <div className="text-sm font-bold text-foreground">
                  <Truck className="w-5 h-5 text-green-600 mx-auto mb-1" />
                  फ्री डिलीवरी
                </div>
                <div className="text-sm font-bold text-foreground">
                  <Heart className="w-5 h-5 text-red-600 mx-auto mb-1" />
                  30 दिन पैसे वापस
                </div>
                <div className="text-sm font-bold text-foreground">
                  <Award className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                  100% सुरक्षित
                </div>
              </div>

              <p className="text-center text-xs text-muted-foreground font-bold">
                ✓ 100% आयुर्वेदिक | ✓ कोई साइड इफेक्ट नहीं | ✓ लैब टेस्टेड
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Urgency Section */}
      <section className="py-8 px-4 bg-gradient-to-r from-orange-100 to-red-100 border-t-4 border-b-4 border-orange-500 my-8">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <Clock className="w-8 h-8 text-red-600" />
              <p className="font-bold text-foreground text-lg">3 दिन में ऑफर खत्म</p>
              <p className="text-sm text-muted-foreground">सीमित समय की पेशकश</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Truck className="w-8 h-8 text-orange-600" />
              <p className="font-bold text-foreground text-lg">फ्री डिलीवरी शामिल</p>
              <p className="text-sm text-muted-foreground">3-5 दिनों में पहुंचेगा</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Check className="w-8 h-8 text-green-600" />
              <p className="font-bold text-foreground text-lg">30 दिन की गारंटी</p>
              <p className="text-sm text-muted-foreground">100% संतुष्टि की गारंटी</p>
            </div>
          </div>
        </div>
      </section>

      {/* Details Image Section */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <Image
            src="/gout-combo-details.png"
            alt="गाउट हेल्थ कॉम्बो विवरण - लाभ और उपयोग"
            width={1200}
            height={1400}
            className="w-full h-auto rounded-2xl shadow-2xl mb-12"
          />
        </div>
      </section>

      {/* Customer Testimonials - Hindi */}
      <section className="py-16 px-4 bg-gradient-to-b from-amber-50 to-green-50">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-12 text-foreground">
            हमारे ग्राहकों के वास्तविक परिणाम
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "राजेश कुमार",
                location: "मुंबई",
                text: "3 साल के दर्द से आखिरकार छुटकारा मिल गया! तेल तुरंत काम करता है और कैप्सूल दर्द को रोकते हैं। सभी को सलाह दूंगा!",
                result: "4 महीने से दर्द मुक्त",
              },
              {
                name: "प्रिया शर्मा",
                location: "दिल्ली",
                text: "मेरे स्वास्थ्य के लिए सबसे अच्छा निवेश! अब रातों को नींद आती है और डॉक्टर बहुत खुश हैं।",
                result: "यूरिक एसिड सामान्य हुआ",
              },
              {
                name: "अमित पटेल",
                location: "बेंगलुरु",
                text: "तेल कितनी तेजी से काम करता है, मुझे विश्वास ही नहीं हुआ! 2 हफ्तों में बिना दर्द के चलने लगा।",
                result: "100% गतिशीलता बहाल",
              },
            ].map((review, idx) => (
              <div key={idx} className="bg-white border-4 border-green-300 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-2xl">⭐</span>
                  ))}
                </div>
                <p className="text-foreground font-bold mb-4 italic text-lg">{review.text}</p>
                <div className="bg-green-100 border-l-4 border-green-600 px-4 py-3 mb-4 rounded">
                  <p className="text-sm font-black text-green-700">परिणाम: {review.result}</p>
                </div>
                <p className="font-bold text-foreground text-lg">{review.name}</p>
                <p className="text-sm text-muted-foreground">{review.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-12 text-foreground">
            क्या आपको मिलता है?
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {/* Oil Benefits */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-4 border-blue-500 rounded-2xl p-10 shadow-lg">
              <h3 className="text-3xl font-black mb-6 text-foreground">🧴 गाउट हेल्थ तेल</h3>
              <p className="text-muted-foreground mb-6 font-bold">
                तुरंत दर्द घटाता है
              </p>
              <ul className="space-y-4">
                {[
                  "तुरंत दर्द में राहत",
                  "सूजन तेजी से कम करता है",
                  "जोड़ों की गतिशीलता बढ़ाता है",
                  "2 हफ्तों में परिणाम",
                ].map((benefit, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="w-6 h-6 text-green-600 flex-shrink-0 font-bold" />
                    <span className="text-foreground font-bold text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Capsules Benefits */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 border-4 border-green-500 rounded-2xl p-10 shadow-lg">
              <h3 className="text-3xl font-black mb-6 text-foreground">💊 गाउट हेल्थ कैप्सूल</h3>
              <p className="text-muted-foreground mb-6 font-bold">
                स्थायी समाधान
              </p>
              <ul className="space-y-4">
                {[
                  "यूरिक एसिड नियंत्रित करता है",
                  "भविष्य में दर्द रोकता है",
                  "जोड़ों को स्थायी रूप से मजबूत करता है",
                  "60-90 दिनों में परिणाम",
                ].map((benefit, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="w-6 h-6 text-green-600 flex-shrink-0 font-bold" />
                    <span className="text-foreground font-bold text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Combined Power */}
          <div className="bg-gradient-to-r from-emerald-100 to-green-100 border-4 border-emerald-600 rounded-2xl p-12 text-center max-w-3xl mx-auto">
            <Heart className="w-14 h-14 text-red-600 mx-auto mb-6" />
            <h4 className="text-3xl font-black mb-4 text-foreground">एक साथ = पूर्ण समाधान</h4>
            <p className="text-lg text-foreground font-bold mb-6">
              तेल तुरंत दर्द को घटाता है जबकि कैप्सूल अंदर से भविष्य के दर्द को रोकते हैं। यह शक्तिशाली कॉम्बो तुरंत और स्थायी दोनों समाधान देता है।
            </p>
            <div className="inline-block bg-green-200 border-4 border-green-700 px-6 py-3 rounded-2xl font-black text-green-800 text-lg">
              एकमात्र ऐसा कॉम्बो जो अंदर और बाहर दोनों काम करता है
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-12 text-foreground">
            अक्सर पूछे जाने वाले सवाल
          </h2>

          <div className="space-y-4">
            {[
              {
                q: "कितने दिनों में परिणाम मिलेंगे?",
                a: "तेल 2-3 दिनों में राहत देता है। कैप्सूल 60-90 दिनों में स्थायी परिणाम देते हैं।",
              },
              {
                q: "क्या दवाइयों के साथ सुरक्षित है?",
                a: "हाँ, 100% प्राकृतिक है कोई साइड इफेक्ट नहीं। लेकिन डॉक्टर से सलाह जरूर लें।",
              },
              {
                q: "पैसे वापस गारंटी है?",
                a: "बिल्कुल! 30 दिनों का मनी-बैक गारंटी है। अगर संतुष्ट नहीं हो तो पूरे पैसे वापस।",
              },
              {
                q: "कितना इस्तेमाल करूं?",
                a: "तेल: दिन में 2 बार 2-3 चम्मच। कैप्सूल: खाने के बाद दिन में 2 बार 1-2 कैप्सूल।",
              },
            ].map((faq, idx) => (
              <div key={idx} className="bg-white border-2 border-green-300 rounded-xl p-6 shadow-md">
                <h4 className="text-lg font-black text-foreground mb-2">{faq.q}</h4>
                <p className="text-muted-foreground font-semibold">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-12 text-foreground">
            इस कॉम्बो में क्या शामिल है?
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-3 border-blue-400 rounded-2xl p-8">
              <h3 className="text-2xl font-black mb-4 text-foreground">🧴 गाउट हेल्थ तेल</h3>
              <ul className="space-y-3 text-foreground font-bold">
                <li>✓ 250ml प्रीमियम तेल</li>
                <li>✓ 100% आयुर्वेदिक</li>
                <li>✓ कोई रसायन नहीं</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 border-3 border-green-400 rounded-2xl p-8">
              <h3 className="text-2xl font-black mb-4 text-foreground">💊 गाउट हेल्थ कैप्सूल</h3>
              <ul className="space-y-3 text-foreground font-bold">
                <li>✓ 60 कैप्सूल</li>
                <li>✓ 100% आयुर्वेदिक</li>
                <li>✓ लैब टेस्टेड</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-100 to-green-100 border-4 border-emerald-600 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-black mb-4 text-foreground">बोनस!</h3>
            <p className="text-lg font-bold text-foreground mb-4">✓ विस्तृत उपयोग गाइड</p>
            <p className="text-lg font-bold text-foreground mb-4">✓ फ्री डिलीवरी पूरे भारत में</p>
            <p className="text-lg font-bold text-foreground">✓ 30 दिन मनी-बैक गारंटी</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-gradient-to-br from-green-600 via-emerald-600 to-green-600">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-white font-black text-sm uppercase tracking-widest mb-4">आज ही आखिरी मौका</p>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 text-balance">
              गाउट के दर्द को हमेशा के लिए भूल जाएं
            </h2>
            <p className="text-2xl text-white/90 mb-10 font-bold">
              10,000+ संतुष्ट ग्राहक अपना जीवन वापस जी रहे हैं। आप भी पा सकते हैं।
            </p>

            <Button
              onClick={handleOrderNow}
              disabled={isProcessing}
              className="bg-white text-green-700 hover:bg-white/90 font-black py-8 px-12 text-3xl rounded-2xl shadow-2xl mb-8 disabled:opacity-50"
            >
              {isProcessing ? "प्रोसेस हो रहा है..." : "✓ अभी ऑर्डर करें - ₹1,999"}
            </Button>

            <p className="text-white/90 font-black text-lg mb-4">
              100% पैसे वापस गारंटी | 30 दिन टेस्ट करें | फ्री डिलीवरी
            </p>

            <p className="text-white font-bold text-lg">
              केवल ₹1,999 में पूरी कॉम्बो - ₹500 की बचत करें!
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
