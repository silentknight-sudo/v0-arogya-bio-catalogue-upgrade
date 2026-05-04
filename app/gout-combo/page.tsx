"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Check, Zap, Heart, Award, Clock, Lock, Truck, ArrowRight } from "lucide-react"

export default function GoutComboPageHi() {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)

  const handleOrderNow = async () => {
    setIsProcessing(true)
    try {
      router.push("/checkout?combo=gout-health-combo")
    } catch (error) {
      console.log("[v0] Order error:", error)
      alert("चेकआउट में समस्या हुई। फिर से कोशिश करें।")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-yellow-50 via-green-50 to-emerald-50">
      {/* Urgency Banner */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-3 px-4 text-center font-black animate-pulse text-sm md:text-base">
        ⏰ सीमित स्टॉक - केवल 47 कॉम्बो बचे हैं! 20% छूट आज ही खत्म हो जाएगी
      </div>

      {/* Hero Section with Main Image */}
      <section className="relative py-8 md:py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Product Image 1 - Hindi Version */}
            <div className="relative">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/94a5864d-1378-407f-9b05-0486d1d6f9d6%20%281%29-xND51ypNsi7fAHS1Vf1ojArU0IqZWd.png"
                alt="गाउट हेल्थ कॉम्बो - आयुर्वेदिक उपचार"
                width={500}
                height={700}
                className="w-full h-auto rounded-2xl shadow-2xl"
                priority
              />
            </div>

            {/* Order Section */}
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-full inline-block font-black text-sm md:text-base">
                🎉 20% छूट पर विशेष पेशकश
              </div>

              <h1 className="text-4xl md:text-6xl font-black text-foreground leading-tight">
                जोड़ों के दर्द से <span className="text-transparent bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text">छुट्कारा पाएं!</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground font-bold leading-relaxed">
                गाउट हेल्थ तेल + कैप्सूल कॉम्बो के साथ तुरंत दर्द से राहत और स्थायी समाधान। 100% आयुर्वेदिक, कोई साइड इफेक्ट नहीं।
              </p>

              {/* Price - Eye Catching */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-100 border-3 border-green-500 rounded-2xl p-8 shadow-lg">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-xs md:text-sm font-bold text-muted-foreground mb-1">पुरानी कीमत</p>
                    <p className="text-2xl md:text-4xl font-black line-through text-red-600">₹2,499</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-full w-24 h-24 md:w-32 md:h-32 flex flex-col items-center justify-center shadow-lg">
                      <p className="text-3xl md:text-4xl font-black">20%</p>
                      <p className="text-xs font-bold">छूट</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm font-bold text-muted-foreground mb-1">आज की कीमत</p>
                    <p className="text-3xl md:text-5xl font-black text-green-600">₹1,999</p>
                  </div>
                </div>
                <p className="text-center text-green-700 font-black mt-4 text-lg">₹500 की बचत करें!</p>
              </div>

              {/* Primary CTA */}
              <Button
                onClick={handleOrderNow}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-black py-6 md:py-8 text-lg md:text-2xl rounded-2xl shadow-2xl disabled:opacity-50 hover:shadow-2xl hover:scale-105 transition-transform"
              >
                {isProcessing ? "प्रोसेस हो रहा है..." : "🛒 अभी ऑर्डर करें - ₹1,999"}
              </Button>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 text-center bg-white border-2 border-green-200 rounded-lg p-3 md:p-4">
                <div className="text-xs md:text-sm font-bold">
                  <Truck className="w-5 h-5 text-green-600 mx-auto mb-1" />
                  फ्री डिलीवरी
                </div>
                <div className="text-xs md:text-sm font-bold">
                  <Heart className="w-5 h-5 text-primary mx-auto mb-1" />
                  30 दिन गारंटी
                </div>
                <div className="text-xs md:text-sm font-bold">
                  <Lock className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                  100% सुरक्षित
                </div>
              </div>

              <p className="text-center text-xs md:text-sm font-bold text-muted-foreground bg-yellow-100 border border-yellow-400 rounded-lg p-3">
                ✓ 100% आयुर्वेदिक | ✓ कोई साइड इफेक्ट नहीं | ✓ Lab टेस्टेड
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Urgency Section */}
      <section className="py-8 px-4 bg-gradient-to-r from-orange-100 to-red-100 border-y-4 border-orange-400">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <Clock className="w-8 h-8 text-red-600" />
              <p className="font-black text-foreground text-base md:text-lg">ऑफर 3 दिन में समाप्त</p>
              <p className="text-xs md:text-sm text-muted-foreground font-bold">सीमित समय के लिए</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Truck className="w-8 h-8 text-orange-600" />
              <p className="font-black text-foreground text-base md:text-lg">फ्री शिपिंग शामिल</p>
              <p className="text-xs md:text-sm text-muted-foreground font-bold">3-5 दिन में डिलीवरी</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Award className="w-8 h-8 text-green-600" />
              <p className="font-black text-foreground text-base md:text-lg">30 दिन मनी बैक</p>
              <p className="text-xs md:text-sm text-muted-foreground font-bold">100% संतुष्टि गारंटी</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works with Product Image 2 */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-center mb-12 text-foreground">
            कॉम्बो कैसे काम करता है?
          </h2>

          <div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto mb-12">
            {/* Product Image 2 - English + Hindi */}
            <div className="relative order-2 md:order-1">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/673648103_17865948765672766_6839538258943237171_n-1dwJvVexG3geYwuzj7lBbUwwd50CvT.jpg"
                alt="गाउट हेल्थ ऑयल और कैप्सूल - प्रीमियम हड्डी सहायता फॉर्मूला"
                width={400}
                height={500}
                className="w-full h-auto rounded-2xl shadow-xl"
              />
            </div>

            {/* Benefits List */}
            <div className="space-y-4 order-1 md:order-2">
              <h3 className="text-2xl md:text-3xl font-black text-foreground mb-6">प्रमुख लाभ</h3>
              {[
                {
                  icon: "⚡",
                  title: "तुरंत दर्द में कमी",
                  desc: "2-3 दिनों में प्रभावी परिणाम",
                },
                {
                  icon: "🦴",
                  title: "हड्डियों को मजबूत बनाएं",
                  desc: "शक्तिशाली हड्डियां और स्वस्थ जोड़",
                },
                {
                  icon: "💚",
                  title: "यूरिक एसिड नियंत्रण",
                  desc: "भविष्य में गाउट अटैक से बचाव",
                },
                {
                  icon: "🌿",
                  title: "100% आयुर्वेदिक",
                  desc: "कोई साइड इफेक्ट नहीं, पूरी तरह प्राकृतिक",
                },
                {
                  icon: "🧬",
                  title: "लंबे समय तक राहत",
                  desc: "60-90 दिन में स्थायी समाधान",
                },
                {
                  icon: "✓",
                  title: "Lab Tested",
                  desc: "वैज्ञानिक रूप से प्रमाणित फॉर्मूला",
                },
              ].map((benefit, idx) => (
                <div key={idx} className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-600 rounded-lg p-4 shadow-sm hover:shadow-md transition">
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{benefit.icon}</span>
                    <div>
                      <h4 className="font-black text-foreground">{benefit.title}</h4>
                      <p className="text-muted-foreground text-sm">{benefit.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-12 px-4 bg-yellow-50">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-center mb-12 text-foreground">
            हजारों संतुष्ट ग्राहकों का भरोसा
          </h2>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "राजेश कुमार",
                city: "मुंबई",
                text: "3 साल का दर्द खत्म हो गया! तेल तुरंत काम करता है और कैप्सूल भविष्य में अटैक रोकते हैं। बहुत अच्छा प्रोडक्ट।",
                result: "4 महीने से दर्द मुक्त",
              },
              {
                name: "प्रिया शर्मा",
                city: "दिल्ली",
                text: "मेरी जिंदगी बदल गई! रात को नींद आने लगी। डॉक्टर भी यूरिक एसिड में सुधार देखकर हैरान रहे।",
                result: "यूरिक एसिड नॉर्मल हुआ",
              },
              {
                name: "अमित पटेल",
                city: "बेंगलुरु",
                text: "2 हफ्ते में ही दर्द खत्म हो गया! अब बिना परेशानी के चल-फिर सकता हूँ। कॉम्बो बेहतरीन है!",
                result: "100% गतिविधि बहाल",
              },
            ].map((review, idx) => (
              <div key={idx} className="bg-white border-3 border-green-300 rounded-xl p-6 shadow-lg hover:shadow-xl transition">
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>
                <p className="text-foreground font-bold mb-4 italic text-sm line-clamp-4">{review.text}</p>
                <div className="bg-green-100 border-l-4 border-green-600 px-3 py-2 mb-4 rounded">
                  <p className="text-xs font-black text-green-700">परिणाम: {review.result}</p>
                </div>
                <p className="font-black text-foreground">{review.name}</p>
                <p className="text-sm text-muted-foreground">{review.city}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Oil & Capsules Work */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-center mb-12 text-foreground">
            तेल और कैप्सूल एक साथ कैसे काम करते हैं
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {/* Oil */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-3 border-blue-400 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl md:text-3xl font-black mb-4 text-foreground">🧴 गाउट हेल्थ तेल</h3>
              <p className="text-muted-foreground mb-6 font-bold text-sm md:text-base">तुरंत बाहरी राहत के लिए</p>
              <ul className="space-y-3">
                {[
                  "तुरंत दर्द में कमी",
                  "सूजन तेजी से घटती है",
                  "जोड़ों की गतिविधि बढ़ती है",
                  "2 हफ्ते में असर दिखता है",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary font-black flex-shrink-0" />
                    <span className="text-foreground font-bold text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Capsules */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 border-3 border-green-400 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl md:text-3xl font-black mb-4 text-foreground">💊 गाउट हेल्थ कैप्सूल</h3>
              <p className="text-muted-foreground mb-6 font-bold text-sm md:text-base">लंबे समय तक आंतरिक चिकित्सा</p>
              <ul className="space-y-3">
                {[
                  "यूरिक एसिड को नियंत्रित करता है",
                  "भविष्य में अटैक रोकता है",
                  "हड्डियों को मजबूत करता है",
                  "60-90 दिन में स्थायी समाधान",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary font-black flex-shrink-0" />
                    <span className="text-foreground font-bold text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Synergy */}
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 border-3 border-green-500 rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto shadow-lg">
            <Heart className="w-10 h-10 md:w-12 md:h-12 text-primary mx-auto mb-4" />
            <h4 className="text-2xl md:text-3xl font-black mb-4 text-foreground">360° संपूर्ण समाधान</h4>
            <p className="text-base md:text-lg text-foreground font-bold mb-6">
              तेल तुरंत दर्द में कमी लाता है जबकि कैप्सूल अंदर से भविष्य में अटैक रोकते हैं। यह एकमात्र ऐसा कॉम्बो है जो बाहर और अंदर दोनों काम करता है।
            </p>
            <div className="inline-block bg-green-200 border-3 border-green-600 px-6 py-3 rounded-xl font-black text-green-700 text-base md:text-lg">
              एकमात्र कॉम्बो जो पूरी तरह असर करता है
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 px-4 bg-yellow-50">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-black text-center mb-12 text-foreground">
            अक्सर पूछे जाने वाले सवाल
          </h2>

          <div className="space-y-4">
            {[
              {
                q: "कितने दिन में परिणाम दिखेंगे?",
                a: "तेल 2-3 दिनों में काम करता है। कैप्सूल के लिए 60-90 दिन लगते हैं स्थायी समाधान के लिए।",
              },
              {
                q: "क्या दवाओं के साथ ले सकते हैं?",
                a: "हां, 100% प्राकृतिक सामग्री। लेकिन अपने डॉक्टर से मिलना अच्छा है।",
              },
              {
                q: "अगर संतुष्ट न हो तो?",
                a: "30 दिन की गारंटी! पूरे पैसे वापस, कोई सवाल नहीं।",
              },
              {
                q: "कितना उपयोग करना चाहिए?",
                a: "तेल: दिन में 2 बार 2-3 चम्मच। कैप्सूल: खाने के बाद दिन में 2 बार।",
              },
              {
                q: "क्या COD उपलब्ध है?",
                a: "हां! भारत भर में COD और ऑनलाइन पेमेंट दोनों उपलब्ध हैं।",
              },
            ].map((faq, idx) => (
              <div key={idx} className="bg-white border-2 border-green-300 rounded-lg p-5 md:p-6 shadow-sm hover:shadow-md transition">
                <h4 className="text-base md:text-lg font-black text-foreground mb-2">❓ {faq.q}</h4>
                <p className="text-muted-foreground font-medium text-sm md:text-base">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Powerful */}
      <section className="py-12 md:py-20 px-4 bg-gradient-to-br from-green-600 via-emerald-600 to-green-700">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-white/90 text-xs md:text-sm font-black uppercase tracking-widest mb-3 md:mb-4">अंतिम अवसर आज</p>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
              गाउट दर्द से अब छुट्कारा पाएं
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-8 md:mb-10 font-bold">
              10,000+ से ज्यादा संतुष्ट ग्राहक। अभी ऑर्डर करें ₹1,999 में फ्री डिलीवरी के साथ।
            </p>

            <Button
              onClick={handleOrderNow}
              disabled={isProcessing}
              className="bg-white text-green-700 hover:bg-white/90 font-black py-6 md:py-8 px-8 md:px-12 text-xl md:text-2xl rounded-2xl shadow-2xl mb-6 md:mb-8 disabled:opacity-50 hover:scale-105 transition-transform"
            >
              {isProcessing ? "प्रोसेस हो रहा है..." : "✓ अभी ऑर्डर करें - ₹1,999"}
            </Button>

            <p className="text-white/80 font-bold mb-4 text-base md:text-lg">
              100% मनी बैक गारंटी | 30 दिन का परीक्षण | फ्री शिपिंग
            </p>

            <div className="grid grid-cols-3 gap-3 md:gap-4 mt-8 text-white text-center">
              <div>
                <Check className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-1 md:mb-2" />
                <p className="font-bold text-xs md:text-sm">फ्री डिलीवरी</p>
              </div>
              <div>
                <Heart className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-1 md:mb-2" />
                <p className="font-bold text-xs md:text-sm">बिना जोखिम ट्राई</p>
              </div>
              <div>
                <Lock className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-1 md:mb-2" />
                <p className="font-bold text-xs md:text-sm">सुरक्षित भुगतान</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Sticky CTA Bar */}
      <section className="sticky bottom-0 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 md:py-4 px-4 shadow-2xl z-40">
        <div className="container mx-auto flex items-center justify-between gap-3 md:gap-4">
          <div>
            <p className="font-black text-base md:text-lg">गाउट से छुट्कारा पाएं</p>
            <p className="text-xs md:text-sm text-white/90">केवल ₹1,999 | फ्री डिलीवरी</p>
          </div>
          <Button
            onClick={handleOrderNow}
            disabled={isProcessing}
            className="bg-white text-green-700 hover:bg-white/90 font-black px-6 md:px-8 py-2 md:py-3 rounded-lg shadow-lg text-sm md:text-base whitespace-nowrap"
          >
            अभी ऑर्डर करें <ArrowRight className="w-4 h-4 ml-2 inline" />
          </Button>
        </div>
      </section>
    </main>
  )
}
