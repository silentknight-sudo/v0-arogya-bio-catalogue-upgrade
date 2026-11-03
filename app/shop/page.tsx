"use client"

import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Reveal, ScrollProgressBar } from "@/components/motion"
import { storeProducts, comboOffer, COMBO_CHECKOUT_URL, OIL_IMG, CAPS_IMG } from "@/lib/store"
import { ArrowRight, Check, Droplet, Pill, ShoppingBag, Truck, ShieldCheck, RotateCcw } from "lucide-react"

export default function ShopPage() {
  const save = comboOffer.originalPrice - comboOffer.discountedPrice
  return (
    <main className="min-h-screen bg-[#fbf7ee]">
      <ScrollProgressBar />
      <Header />

      {/* Intro */}
      <section className="relative overflow-hidden pt-16 pb-10 md:pt-24">
        <div className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-amber-300/20 blur-3xl" />
        <div className="container mx-auto px-4 text-center relative">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-700">The Arogya Bio shop</p>
            <h1 className="font-display mt-3 text-5xl md:text-7xl font-semibold text-[#1f2d1c]">
              Active joints, <span className="italic text-gradient-gold">naturally</span>
            </h1>
            <p className="mt-5 max-w-xl mx-auto text-[#5b5240]">
              We focus on doing one thing well: Ayurvedic joint care. Two products that work best together.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Combo hero card */}
      <section className="container mx-auto px-4">
        <Reveal dir="zoom">
          <div className="relative rounded-[2.5rem] bg-[#1f2d1c] text-white overflow-hidden grid lg:grid-cols-2 items-center">
            <div className="absolute inset-0 opacity-50" style={{ background: "radial-gradient(50% 70% at 80% 50%, rgba(217,148,52,.45), transparent 70%)" }} />
            <div className="relative p-8 md:p-14">
              <span className="inline-flex rounded-full bg-amber-400 text-[#1f2d1c] px-3 py-1 text-xs font-bold uppercase tracking-wider">
                Best value · Save {comboOffer.discountPercentage}%
              </span>
              <h2 className="font-display mt-5 text-4xl md:text-5xl font-semibold">Complete Care Combo</h2>
              <p className="mt-3 text-white/75 max-w-md">Gouthealth Oil (100 ml) + Gouthealth Capsules (30) — outside-in relief and inside-out support.</p>
              <ul className="mt-6 space-y-2 text-sm text-white/85">
                {["Both products in one pack", "Free shipping across India", "Cash on delivery available"].map((t) => (
                  <li key={t} className="flex gap-2"><Check className="w-4 h-4 text-amber-300" /> {t}</li>
                ))}
              </ul>
              <div className="mt-8 flex items-end gap-3">
                <span className="font-display text-5xl font-semibold text-amber-300">₹{comboOffer.discountedPrice.toLocaleString("en-IN")}</span>
                <span className="mb-1 text-white/50 line-through">₹{comboOffer.originalPrice.toLocaleString("en-IN")}</span>
                <span className="mb-1.5 text-xs font-bold text-amber-200">You save ₹{save}</span>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={COMBO_CHECKOUT_URL} className="btn-shine inline-flex items-center gap-2 rounded-full bg-amber-400 px-8 py-4 text-sm font-bold text-[#1f2d1c] hover:bg-amber-300 transition">
                  <ShoppingBag className="w-4 h-4" /> Buy the combo
                </Link>
                <Link href="/gout-combo" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-4 text-sm font-semibold hover:bg-white/10 transition">
                  Learn more
                </Link>
              </div>
            </div>
            <div className="relative h-[380px] md:h-[480px]">
              <div className="absolute left-[8%] top-10 w-[45%] h-[80%] animate-float">
                <Image src={OIL_IMG} alt="Gouthealth Oil" fill sizes="300px" className="object-contain drop-shadow-2xl" />
              </div>
              <div className="absolute right-[8%] bottom-6 w-[45%] h-[80%] animate-float-delayed">
                <Image src={CAPS_IMG} alt="Gouthealth Capsules" fill sizes="300px" className="object-contain drop-shadow-2xl" />
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Individual products */}
      <section className="container mx-auto px-4 py-20">
        <Reveal><h2 className="font-display text-3xl md:text-4xl font-semibold text-[#1f2d1c]">Explore each product</h2></Reveal>
        <div className="mt-10 grid md:grid-cols-2 gap-8">
          {storeProducts.map((p, i) => {
            const Icon = p.type === "oil" ? Droplet : Pill
            return (
              <Reveal key={p.id} delay={i * 150}>
                <Link href={`/shop/${p.id}`} className="group block rounded-[2rem] bg-white border border-[#eadfc6] overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                  <div className="relative aspect-[4/3] bg-gradient-to-b from-[#fffaf0] to-[#f1e4c4]">
                    <Image src={p.image} alt={p.name} fill sizes="(max-width:768px) 100vw, 50vw" className="object-contain p-8 transition-transform duration-700 group-hover:scale-105" />
                    <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#2f5d2a]">
                      <Icon className="w-3.5 h-3.5" /> {p.size}
                    </span>
                  </div>
                  <div className="p-6 md:p-8">
                    <p className="text-xs font-bold uppercase tracking-widest text-amber-700">{p.use}</p>
                    <h3 className="font-display mt-2 text-3xl font-semibold text-[#1f2d1c]">{p.name}</h3>
                    <p className="mt-2 text-sm text-[#7a6f58]">Natural Joint Support Formula · {p.ingredients.join(" · ")}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#2f5d2a] group-hover:gap-3 transition-all">
                      View details <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>

        <div className="mt-16 grid sm:grid-cols-3 gap-4">
          {[
            { icon: Truck, t: "Free shipping", d: "On the Complete Care Combo" },
            { icon: ShieldCheck, t: "GMP & FSSAI", d: "Manufactured by Mahatva Ayurveda" },
            { icon: RotateCcw, t: "Easy returns", d: "See our returns policy" },
          ].map((b, i) => {
            const Icon = b.icon
            return (
              <Reveal key={b.t} delay={i * 100}>
                <div className="flex items-center gap-4 rounded-2xl bg-white border border-[#eadfc6] p-5">
                  <span className="grid place-items-center w-11 h-11 rounded-xl bg-[#2f5d2a] text-amber-100"><Icon className="w-5 h-5" /></span>
                  <div><p className="font-semibold text-[#1f2d1c]">{b.t}</p><p className="text-sm text-[#7a6f58]">{b.d}</p></div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      <Footer />
    </main>
  )
}
