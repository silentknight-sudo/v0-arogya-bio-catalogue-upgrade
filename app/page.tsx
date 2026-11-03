"use client"

import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { CustomerReviews } from "@/components/customer-reviews"
import { SchemaMarkup } from "@/components/seo-schema"
import { createBreadcrumbSchema } from "@/lib/seo-schemas"
import { ScrollProgressBar, Reveal, CountUp, useElementProgress } from "@/components/motion"
import { GoutHero, BenefitMarquee, GoutStory, GoutProducts, GoutComboCTA } from "@/components/gout-spotlight"
import { BANNER_IMG, OIL_IMG, CAPS_IMG } from "@/lib/store"
import { Sun, Moon, CalendarCheck, ShieldCheck, Leaf, FlaskConical, BadgeCheck } from "lucide-react"

const ritual = [
  {
    icon: Sun,
    step: "01",
    title: "Morning capsule",
    text: "Take one Gouthealth Capsule with warm water to support your joints from within.",
    img: CAPS_IMG,
  },
  {
    icon: Moon,
    step: "02",
    title: "Evening massage",
    text: "Warm a few drops of Gouthealth Oil and massage gently onto the joint for 5–10 minutes.",
    img: OIL_IMG,
  },
  {
    icon: CalendarCheck,
    step: "03",
    title: "Stay consistent",
    text: "Follow the ritual daily for 60–90 days alongside light movement and plenty of water.",
    img: BANNER_IMG,
  },
]

const faqs = [
  {
    q: "Can I use Gouthealth Oil and Capsules together?",
    a: "Yes — they are designed as a pair. The oil works externally on the joint while the capsules support you internally. That's why we offer them as the Complete Care Combo.",
  },
  {
    q: "What is the dosage for Gouthealth Capsules?",
    a: "One capsule a day, or as directed by your physician. Each 500 mg capsule contains Shallaki, Nirgundi, Rasna, Ashwagandha, Giloy, Ginger and Arandi.",
  },
  {
    q: "Is Gouthealth Oil safe to drink?",
    a: "No. Gouthealth Oil is for external use only. Massage it onto the affected joint 2–3 times a day.",
  },
  {
    q: "Who manufactures these products?",
    a: "Both products are manufactured by Mahatva Ayurveda in a GMP-certified facility (Mfg. Lic. No. 1375-ISM(HR)) and marketed by Arogya Bio. FSSAI No. 22726923000141.",
  },
]

function ParallaxBanner() {
  const { ref, progress } = useElementProgress<HTMLElement>()
  return (
    <section ref={ref} data-fx-scope="banner" className="relative py-24 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <Reveal dir="left">
          <div
            data-fx="banner"
            className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-[#3c2a10]/15 ring-1 ring-[#eadfc6]"
            style={{ transform: `translateY(${(0.5 - progress) * 50}px)` }}
          >
            <Image src={BANNER_IMG} alt="Gouthealth Oil and Capsules – Active Joints, Everyday Life" width={900} height={900} className="w-full h-auto" />
          </div>
        </Reveal>
        <div>
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-700">Ancient wisdom · Modern wellness</p>
            <h2 className="font-display mt-3 text-4xl md:text-5xl font-semibold text-[#1f2d1c] leading-tight">
              Made with herbs Ayurveda has trusted for centuries
            </h2>
          </Reveal>
          <div className="mt-10 grid sm:grid-cols-2 gap-4">
            {[
              { icon: Leaf, t: "Natural ingredients", d: "Seven classical herbs, no harsh chemicals." },
              { icon: FlaskConical, t: "Ayurvedic formulation", d: "Balanced composition in every 500 mg capsule." },
              { icon: ShieldCheck, t: "GMP manufactured", d: "Made by Mahatva Ayurveda, Panchkula (HR)." },
              { icon: BadgeCheck, t: "FSSAI registered", d: "Lic. No. 22726923000141." },
            ].map((f, i) => {
              const Icon = f.icon
              return (
                <Reveal key={f.t} delay={i * 100}>
                  <div className="h-full rounded-2xl border border-[#eadfc6] bg-[#fbf7ee] p-5 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                    <span className="grid place-items-center w-10 h-10 rounded-xl bg-[#2f5d2a] text-amber-100">
                      <Icon className="w-5 h-5" />
                    </span>
                    <p className="mt-4 font-semibold text-[#1f2d1c]">{f.t}</p>
                    <p className="mt-1 text-sm text-[#7a6f58]">{f.d}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://arogyabio.com" },
    { name: "Shop", url: "https://arogyabio.com/shop" },
  ])

  return (
    <main className="min-h-screen bg-[#fbf7ee]">
      <SchemaMarkup schema={breadcrumbSchema} />
      <ScrollProgressBar />
      <Header />

      <GoutHero />
      <BenefitMarquee />
      <GoutStory />
      <GoutProducts />

      {/* Daily ritual */}
      <section className="relative py-24 md:py-32 bg-[#f4ecd8]">
        <div className="container mx-auto px-4">
          <Reveal className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-700">Your daily ritual</p>
            <h2 className="font-display mt-3 text-4xl md:text-6xl font-semibold text-[#1f2d1c]">Three simple steps</h2>
          </Reveal>
          <div className="mt-16 grid md:grid-cols-3 gap-6 relative">
            <div className="hidden md:block absolute top-[88px] left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-[#c9a96a] to-transparent" />
            {ritual.map((r, i) => {
              const Icon = r.icon
              return (
                <Reveal key={r.step} delay={i * 180}>
                  <div className="group relative h-full rounded-[2rem] bg-white p-8 text-center border border-[#eadfc6] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                    <div className="relative mx-auto w-28 h-28 rounded-full bg-gradient-to-b from-[#fffaf0] to-[#f1e4c4] ring-8 ring-[#f4ecd8] overflow-hidden">
                      <Image src={r.img} alt="" fill sizes="112px" className="object-contain p-2 transition-transform duration-700 group-hover:scale-110" />
                    </div>
                    <span className="absolute top-6 right-6 font-display text-5xl text-[#eadfc6] font-semibold">{r.step}</span>
                    <Icon className="mx-auto mt-6 w-6 h-6 text-amber-600" />
                    <h3 className="mt-3 font-display text-2xl font-semibold text-[#1f2d1c]">{r.title}</h3>
                    <p className="mt-3 text-sm text-[#7a6f58] leading-relaxed">{r.text}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#1f2d1c] text-white py-16">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { n: 10000, s: "+", l: "Happy customers" },
            { n: 7, s: "", l: "Ayurvedic herbs" },
            { n: 100, s: "%", l: "Natural formula" },
            { n: 20, s: "%", l: "Off on the combo" },
          ].map((s, i) => (
            <Reveal key={s.l} delay={i * 100}>
              <p className="font-display text-4xl md:text-5xl font-semibold text-amber-300">
                <CountUp to={s.n} suffix={s.s} />
              </p>
              <p className="mt-2 text-sm uppercase tracking-widest text-white/70">{s.l}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <ParallaxBanner />

      <CustomerReviews />

      {/* FAQ */}
      <section className="py-24 bg-[#fbf7ee]">
        <div className="container mx-auto px-4 max-w-3xl">
          <Reveal className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-700">Questions</p>
            <h2 className="font-display mt-3 text-4xl md:text-5xl font-semibold text-[#1f2d1c]">Good to know</h2>
          </Reveal>
          <Reveal className="mt-10">
            <div className="rounded-3xl bg-white border border-[#eadfc6] divide-y divide-[#eadfc6]">
              {faqs.map((f) => (
                <details key={f.q} className="group px-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-semibold text-[#1f2d1c] [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span className="grid place-items-center w-7 h-7 shrink-0 rounded-full bg-[#f4ecd8] text-[#2f5d2a] transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="pb-5 text-[#5b5240] leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
          <p className="mt-6 text-center text-xs text-[#9a8f78]">
            Ayurvedic proprietary medicine. Results may vary. Consult your physician if you are pregnant, nursing or on medication.{" "}
            <Link href="/faq" className="underline">More FAQs</Link>
          </p>
        </div>
      </section>

      <GoutComboCTA />
      <Footer />
    </main>
  )
}
