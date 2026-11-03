"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, notFound } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Reveal, ScrollProgressBar } from "@/components/motion"
import { getStoreProduct, storeProducts, comboOffer, COMBO_CHECKOUT_URL } from "@/lib/store"
import { ArrowRight, Check, ShieldCheck, ShoppingBag, Star, Truck, Leaf, ChevronLeft } from "lucide-react"

export default function ProductDetailPage() {
  const { id } = useParams() as { id: string }
  const product = getStoreProduct(id)
  const [active, setActive] = useState(0)
  const [tab, setTab] = useState<"benefits" | "composition" | "usage">("benefits")
  if (!product) notFound()

  const other = storeProducts.find((p) => p.id !== product.id)!
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Arogya Bio ${product.name}`,
    image: product.gallery.map((g) => `https://arogyabio.com${g}`),
    description: product.description,
    brand: { "@type": "Brand", name: "Arogya Bio" },
  }

  return (
    <main className="min-h-screen bg-[#fbf7ee]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ScrollProgressBar />
      <Header />

      <section className="container mx-auto px-4 pt-8 pb-20">
        <Link href="/shop" className="inline-flex items-center gap-1 text-sm text-[#7a6f58] hover:text-[#2f5d2a]">
          <ChevronLeft className="w-4 h-4" /> Back to shop
        </Link>

        <div className="mt-6 grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Gallery */}
          <div className="lg:sticky lg:top-28 self-start">
            <Reveal dir="zoom">
              <div data-gallery className="relative aspect-square rounded-[2.5rem] bg-gradient-to-b from-[#fffaf0] to-[#f1e4c4] border border-[#eadfc6] overflow-hidden">
                {product.gallery.map((src, i) => (
                  <Image
                    key={src}
                    data-gimg={i}
                    data-cls-on="opacity-100 scale-100"
                    data-cls-off="opacity-0 scale-95"
                    src={src}
                    alt={`${product.name} view ${i + 1}`}
                    fill
                    priority={i === 0}
                    sizes="(max-width:1024px) 100vw, 50vw"
                    className={`object-contain p-10 transition-all duration-700 ${i === active ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
                  />
                ))}
              </div>
            </Reveal>
            <div data-gallery-thumbs className="mt-4 flex gap-3">
              {product.gallery.map((src, i) => (
                <button
                  key={src}
                  data-gthumb={i}
                  data-cls-on="border-[#2f5d2a]"
                  data-cls-off="border-[#eadfc6] opacity-70 hover:opacity-100"
                  onClick={() => setActive(i)}
                  className={`relative w-20 h-20 rounded-2xl bg-white border-2 overflow-hidden transition ${i === active ? "border-[#2f5d2a]" : "border-[#eadfc6] opacity-70 hover:opacity-100"}`}
                  aria-label={`Show view ${i + 1}`}
                >
                  <Image src={src} alt="" fill sizes="80px" className="object-contain p-1.5" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-700">{product.use}</p>
              <h1 className="font-display mt-3 text-5xl md:text-6xl font-semibold text-[#1f2d1c]">{product.name}</h1>
              <div className="mt-3 flex items-center gap-2 text-sm text-[#7a6f58]">
                <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}</div>
                4.9 · Natural Joint Support Formula · {product.size}
              </div>
              <p className="mt-6 text-[#5b5240] leading-relaxed">{product.description}</p>
            </Reveal>

            {/* buy box */}
            <Reveal className="mt-8">
              <div className="rounded-3xl bg-[#1f2d1c] text-white p-6 md:p-8 relative overflow-hidden">
                <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-amber-400/25 blur-3xl" />
                <p className="relative text-xs font-bold uppercase tracking-widest text-amber-300">Available in the Complete Care Combo</p>
                <p className="relative mt-2 text-white/75 text-sm">{product.name} + {other.name}</p>
                <div className="relative mt-4 flex items-end gap-3">
                  <span className="font-display text-5xl font-semibold text-amber-300">₹{comboOffer.discountedPrice.toLocaleString("en-IN")}</span>
                  <span className="mb-1 line-through text-white/50">₹{comboOffer.originalPrice.toLocaleString("en-IN")}</span>
                  <span className="mb-1.5 rounded-full bg-amber-400 text-[#1f2d1c] px-2.5 py-0.5 text-xs font-bold">{comboOffer.discountPercentage}% OFF</span>
                </div>
                <Link href={COMBO_CHECKOUT_URL} className="btn-shine relative mt-6 flex items-center justify-center gap-2 rounded-full bg-amber-400 py-4 text-sm font-bold text-[#1f2d1c] hover:bg-amber-300 transition">
                  <ShoppingBag className="w-4 h-4" /> Buy now
                </Link>
                <div className="relative mt-5 grid grid-cols-3 gap-2 text-[11px] text-white/70 text-center">
                  <span className="flex flex-col items-center gap-1"><Truck className="w-4 h-4" />Free shipping</span>
                  <span className="flex flex-col items-center gap-1"><ShieldCheck className="w-4 h-4" />GMP certified</span>
                  <span className="flex flex-col items-center gap-1"><Leaf className="w-4 h-4" />100% Ayurvedic</span>
                </div>
              </div>
            </Reveal>

            {/* tabs */}
            <Reveal className="mt-10">
              <div data-tabs>
              <div className="flex gap-1 p-1 rounded-full bg-[#f1e4c4] w-fit">
                {(["benefits", "composition", "usage"] as const).map((t) => (
                  <button key={t} data-tab={t} data-cls-on="bg-white text-[#1f2d1c] shadow" data-cls-off="text-[#7a6f58]" onClick={() => setTab(t)} className={`px-5 py-2 rounded-full text-sm font-semibold capitalize transition ${tab === t ? "bg-white text-[#1f2d1c] shadow" : "text-[#7a6f58]"}`}>
                    {t}
                  </button>
                ))}
              </div>
              <div className="mt-6">
                {(
                  <div data-panel="benefits" hidden={tab !== "benefits"}>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {product.benefits.map((b) => (
                      <li key={b} className="flex gap-3 rounded-2xl bg-white border border-[#eadfc6] p-4 text-sm text-[#3c3a2a]">
                        <Check className="w-4 h-4 mt-0.5 text-[#2f5d2a] shrink-0" /> {b}
                      </li>
                    ))}
                  </ul>
                  </div>
                )}
                {(
                  <div data-panel="composition" hidden={tab !== "composition"}>
                  <div className="rounded-2xl bg-white border border-[#eadfc6] divide-y divide-[#f1e4c4]">
                    {product.composition.map((c) => (
                      <div key={c.herb} className="flex justify-between gap-4 px-5 py-3 text-sm">
                        <span className="font-semibold text-[#1f2d1c]">{c.herb}</span>
                        <span className="text-[#7a6f58] text-right">{c.note}</span>
                      </div>
                    ))}
                  </div>
                  </div>
                )}
                {(
                  <div data-panel="usage" hidden={tab !== "usage"}>
                  <div className="rounded-2xl bg-white border border-[#eadfc6] p-6 text-sm text-[#3c3a2a] leading-relaxed">
                    {product.usage}
                    <p className="mt-4 text-xs text-[#9a8f78]">
                      Manufactured by Mahatva Ayurveda, Plot No. 33, HSIIDC, Alipur, Distt. Panchkula (Hry.) · Mfg. Lic. No. 1375-ISM(HR) · Marketed by Arogya Bio · FSSAI 22726923000141
                    </p>
                  </div>
                  </div>
                )}
              </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Pair with */}
        <Reveal className="mt-24">
          <Link href={`/shop/${other.id}`} className="group grid md:grid-cols-[200px_1fr_auto] items-center gap-6 rounded-[2rem] bg-white border border-[#eadfc6] p-6 hover:shadow-xl transition">
            <div className="relative h-48 rounded-2xl bg-gradient-to-b from-[#fffaf0] to-[#f1e4c4]">
              <Image src={other.image} alt={other.name} fill sizes="200px" className="object-contain p-4 group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-amber-700">Works best with</p>
              <h3 className="font-display mt-2 text-3xl font-semibold text-[#1f2d1c]">{other.name}</h3>
              <p className="mt-2 text-sm text-[#7a6f58]">{other.use} · {other.size}</p>
            </div>
            <ArrowRight className="w-6 h-6 text-[#2f5d2a] group-hover:translate-x-2 transition-transform" />
          </Link>
        </Reveal>
      </section>
      <Footer />
    </main>
  )
}
