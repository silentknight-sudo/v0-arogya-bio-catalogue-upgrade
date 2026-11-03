"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import {
  ArrowRight,
  Droplet,
  Pill,
  Leaf,
  ShieldCheck,
  Footprints,
  Activity,
  Sparkles,
  Star,
  Check,
  Truck,
} from "lucide-react"
import { Reveal, useElementProgress, CountUp } from "@/components/motion"
import { comboOffer, goutHealthOil, goutHealthCapsules } from "@/lib/combo-products"

import { OIL_IMG, CAPS_IMG, HERO_BG, OIL_GALLERY, CAPS_GALLERY } from "@/lib/store"

/* ------------------------------------------------------------------ */
/* 1. Cinematic hero with parallax + floating bottles                  */
/* ------------------------------------------------------------------ */
export function GoutHero() {
  const { ref, progress } = useElementProgress<HTMLElement>()
  const p = progress

  return (
    <section ref={ref} data-fx-scope="hero" className="relative h-[170vh] bg-[#1d2a1b]">
      <div className="sticky top-0 h-screen overflow-hidden grain">
        {/* parallax background */}
        <div
          data-fx="hero-bg"
          className="absolute inset-0 will-change-transform"
          style={{ transform: `scale(${1.08 + p * 0.25}) translateY(${p * -6}%)` }}
        >
          <Image src={HERO_BG} alt="Man relaxing on a hill at sunrise" fill priority className="object-cover" sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f1a0e]/90 via-[#0f1a0e]/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1a0e] via-transparent to-transparent" />

        <div className="relative z-10 container mx-auto px-4 h-full grid lg:grid-cols-2 items-center gap-10 pt-16">
          {/* headline */}
          <div data-fx="hero-copy" style={{ opacity: 1 - p * 1.6, transform: `translateY(${p * -120}px)` }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-white/10 backdrop-blur px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-amber-200">
              <Leaf className="w-3.5 h-3.5" /> Natural care for
            </span>
            <h1 className="font-display mt-6 text-5xl sm:text-6xl xl:text-7xl font-semibold leading-[0.95] text-white">
              Active Joints.
              <br />
              <span className="italic text-amber-300">Everyday Life.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base md:text-lg text-white/80 leading-relaxed">
              Two Ayurvedic solutions, one complete care ritual. Gouthealth Oil soothes from the outside, Gouthealth
              Capsules support from within — crafted with Shallaki, Nirgundi &amp; Ashwagandha.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/gout-combo"
                className="btn-shine inline-flex items-center gap-2 rounded-full bg-amber-400 px-7 py-3.5 text-sm font-bold text-[#1d2a1b] shadow-xl shadow-amber-500/30 hover:bg-amber-300 transition"
              >
                Shop the Combo · ₹{comboOffer.discountedPrice.toLocaleString("en-IN")}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#gout-story"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition"
              >
                Discover the ritual
              </a>
            </div>
            <div className="mt-8 flex items-center gap-3 text-white/80 text-sm">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span>4.9/5 from 10,000+ happy customers</span>
            </div>
          </div>

          {/* floating products */}
          <div className="relative hidden lg:block h-[560px]">
            <div
              data-fx="hero-oil"
              className="absolute left-4 top-10 w-[300px]"
              style={{ transform: `translate(${p * -80}px, ${p * 140}px) rotate(${-6 + p * -10}deg)` }}
            >
              <div className="animate-float rounded-[2rem] overflow-hidden bg-gradient-to-b from-[#fffaf0] to-[#f1e4c4] p-4 shadow-2xl shadow-black/50 ring-1 ring-white/20">
                <Image src={OIL_IMG} alt="Gouthealth Oil 100ml" width={600} height={900} className="w-full h-[340px] object-contain" />
              </div>
            </div>
            <div
              data-fx="hero-caps"
              className="absolute right-0 bottom-0 w-[300px]"
              style={{ transform: `translate(${p * 80}px, ${p * -60}px) rotate(${6 + p * 10}deg)` }}
            >
              <div className="animate-float-delayed rounded-[2rem] overflow-hidden bg-gradient-to-b from-[#fffaf0] to-[#f1e4c4] p-4 shadow-2xl shadow-black/50 ring-1 ring-white/20">
                <Image src={CAPS_IMG} alt="Gouthealth Capsules" width={600} height={900} className="w-full h-[340px] object-contain" />
              </div>
            </div>
          </div>
        </div>

        {/* scroll cue */}
        <div
          data-fx="hero-cue"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/70 text-[11px] tracking-[0.3em] uppercase"
          style={{ opacity: 1 - p * 4 }}
        >
          Scroll
          <span className="h-10 w-px bg-gradient-to-b from-white/80 to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 2. Benefit marquee                                                  */
/* ------------------------------------------------------------------ */
const badges = [
  { icon: Footprints, t: "Supports daily activities" },
  { icon: Activity, t: "Keeps you on the move" },
  { icon: Sparkles, t: "Inspired by Ayurveda" },
  { icon: Leaf, t: "Natural ingredients" },
  { icon: ShieldCheck, t: "A healthier tomorrow" },
  { icon: Truck, t: "Free delivery on combo" },
]
export function BenefitMarquee() {
  const row = [...badges, ...badges]
  return (
    <div className="relative overflow-hidden bg-[#f4ecd8] border-y border-[#e3d5b3] py-5">
      <div className="flex w-max animate-marquee gap-12">
        {row.map((b, i) => {
          const Icon = b.icon
          return (
            <div key={i} className="flex items-center gap-3 text-[#3c4a2a] whitespace-nowrap">
              <span className="grid place-items-center w-9 h-9 rounded-full bg-[#2f5d2a] text-amber-100">
                <Icon className="w-4 h-4" />
              </span>
              <span className="text-sm font-semibold uppercase tracking-wider">{b.t}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* 3. Sticky scroll story: Oil (outside) → Capsules (inside)          */
/* ------------------------------------------------------------------ */
const oilHerbs = [
  { n: "Shallaki", d: "Traditionally used in joint care" },
  { n: "Nirgundi", d: "Known in Ayurveda for joint wellness" },
  { n: "Ashwagandha", d: "Supports an active lifestyle" },
]
const capHerbs = ["Shallaki", "Nirgundi", "Rasna", "Ashwagandha", "Giloy", "Ginger", "Arandi"]

export function GoutStory() {
  const { ref, progress } = useElementProgress<HTMLElement>()
  const stage = progress < 0.5 ? 0 : 1

  return (
    <section id="gout-story" ref={ref} data-fx-scope="story" className="relative h-[300vh] bg-[#fbf7ee]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* soft background blobs */}
        <div
          data-fx="story-blob"
          className="absolute -left-40 top-20 w-[520px] h-[520px] rounded-full blur-3xl transition-colors duration-1000"
          style={{ background: stage === 0 ? "rgba(217,148,52,0.25)" : "rgba(47,93,42,0.18)" }}
        />
        <div className="absolute -right-40 bottom-0 w-[480px] h-[480px] rounded-full bg-emerald-700/10 blur-3xl" />

        <div className="relative container mx-auto px-4 h-full grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* product stage */}
          <div className="relative mx-auto w-full max-w-[460px] aspect-square">
            {[OIL_IMG, CAPS_IMG].map((src, i) => (
              <div
                key={src}
                data-fx="story-img"
                data-i={i}
                className="absolute inset-0 rounded-[2.5rem] overflow-hidden bg-gradient-to-b from-[#fffaf0] to-[#f1e4c4] shadow-2xl shadow-[#3c2a10]/20 transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  opacity: stage === i ? 1 : 0,
                  transform:
                    stage === i
                      ? `rotate(${(progress - 0.5) * 6}deg) scale(1)`
                      : `scale(0.85) translateY(${i === 0 ? -40 : 40}px)`,
                }}
              >
                <Image
                  src={src}
                  alt={i === 0 ? "Gouthealth Oil" : "Gouthealth Capsules"}
                  fill
                  sizes="(max-width:1024px) 90vw, 460px"
                  className="object-contain p-8"
                />
              </div>
            ))}
            {/* progress ring */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {[0, 1].map((i) => (
                <span
                  key={i}
                  data-fx="story-dot"
                  data-i={i}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    stage === i ? "w-10 bg-[#2f5d2a]" : "w-4 bg-[#2f5d2a]/25"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* copy stage */}
          <div className="relative min-h-[420px]">
            {/* Oil */}
            <div
              data-fx="story-copy"
              data-i={0}
              className="absolute inset-0 transition-all duration-700"
              style={{
                opacity: stage === 0 ? 1 : 0,
                transform: stage === 0 ? "none" : "translateY(-40px)",
                pointerEvents: stage === 0 ? "auto" : "none",
              }}
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 text-amber-800 px-3 py-1 text-xs font-bold uppercase tracking-widest">
                <Droplet className="w-3.5 h-3.5" /> For external use · 100 ml
              </span>
              <h2 className="font-display mt-4 text-4xl md:text-6xl font-semibold text-[#2b2414]">
                Gouthealth <span className="italic text-gradient-gold">Oil</span>
              </h2>
              <p className="mt-4 text-[#5b5240] text-lg max-w-md">
                A warm, absorbent massage oil that eases stiffness right where you feel it.
              </p>
              <ul className="mt-8 space-y-4">
                {oilHerbs.map((h, i) => (
                  <li
                    key={h.n}
                    data-fx="story-item"
                    data-i={0}
                    className="flex items-start gap-4 rounded-2xl bg-white/70 backdrop-blur border border-[#eadfc6] p-4 transition-all duration-700"
                    style={{
                      transitionDelay: `${i * 120}ms`,
                      opacity: stage === 0 ? 1 : 0,
                      transform: stage === 0 ? "none" : "translateX(30px)",
                    }}
                  >
                    <span className="grid place-items-center w-10 h-10 rounded-full bg-[#2f5d2a] text-amber-100 shrink-0">
                      <Leaf className="w-4 h-4" />
                    </span>
                    <div>
                      <p className="font-semibold text-[#2b2414]">{h.n}</p>
                      <p className="text-sm text-[#7a6f58]">{h.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Capsules */}
            <div
              data-fx="story-copy"
              data-i={1}
              className="absolute inset-0 transition-all duration-700"
              style={{
                opacity: stage === 1 ? 1 : 0,
                transform: stage === 1 ? "none" : "translateY(40px)",
                pointerEvents: stage === 1 ? "auto" : "none",
              }}
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 text-emerald-800 px-3 py-1 text-xs font-bold uppercase tracking-widest">
                <Pill className="w-3.5 h-3.5" /> For internal use · 30 capsules
              </span>
              <h2 className="font-display mt-4 text-4xl md:text-6xl font-semibold text-[#1f2d1c]">
                Gouthealth <span className="italic text-emerald-700">Capsules</span>
              </h2>
              <p className="mt-4 text-[#4c5a45] text-lg max-w-md">
                A 7-herb Ayurvedic joint support formula that works from within, every single day.
              </p>
              <div className="mt-8 grid grid-cols-3 sm:grid-cols-4 gap-3">
                {capHerbs.map((h, i) => (
                  <div
                    key={h}
                    data-fx="story-item"
                    data-i={1}
                    className="rounded-2xl bg-white/70 border border-emerald-900/10 px-3 py-4 text-center transition-all duration-700"
                    style={{
                      transitionDelay: `${i * 70}ms`,
                      opacity: stage === 1 ? 1 : 0,
                      transform: stage === 1 ? "none" : "scale(0.8)",
                    }}
                  >
                    <Leaf className="w-5 h-5 mx-auto text-emerald-700" />
                    <p className="mt-2 text-sm font-semibold text-[#1f2d1c]">{h}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 4. Product cards + combo CTA                                        */
/* ------------------------------------------------------------------ */
function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [i, setI] = useState(0)
  return (
    <div data-gallery className="relative aspect-square overflow-hidden bg-gradient-to-b from-[#fffaf0] to-[#f1e4c4]">
      {images.map((src, k) => (
        <Image
          key={src}
          data-gimg={k}
          src={src}
          alt={`${alt} view ${k + 1}`}
          fill
          sizes="(max-width:768px) 100vw, 50vw"
          className={`object-contain p-8 transition-all duration-700 group-hover:scale-105 ${
            k === i ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute bottom-3 inset-x-0 flex justify-center gap-2">
        {images.map((src, k) => (
          <button
            key={src}
            data-gthumb={k}
            aria-label={`Show view ${k + 1}`}
            onClick={() => setI(k)}
            className={`relative w-12 h-12 rounded-xl overflow-hidden border-2 bg-white transition ${
              k === i ? "border-[#2f5d2a] scale-110" : "border-transparent opacity-70 hover:opacity-100"
            }`}
          >
            <Image src={src} alt="" fill sizes="48px" className="object-contain p-1" />
          </button>
        ))}
      </div>
    </div>
  )
}

export function GoutProducts() {
  const [tab, setTab] = useState<"oil" | "caps">("oil")
  const products = [
    { key: "oil" as const, img: OIL_IMG, gallery: OIL_GALLERY, data: goutHealthOil, tag: "For external use", icon: Droplet },
    { key: "caps" as const, img: CAPS_IMG, gallery: CAPS_GALLERY, data: goutHealthCapsules, tag: "For internal use", icon: Pill },
  ]

  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-b from-[#fbf7ee] to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <Reveal className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-700">Two Ayurvedic solutions</p>
          <h2 className="font-display mt-3 text-4xl md:text-6xl font-semibold text-[#1f2d1c]">One complete care</h2>
          <p className="mt-4 text-[#5b5240]">Use them together for a full joint wellness ritual — or start with one.</p>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {products.map((p, i) => {
            const Icon = p.icon
            return (
              <Reveal key={p.key} delay={i * 150} dir={i === 0 ? "left" : "right"}>
                <div className="group relative rounded-[2rem] bg-white border border-[#eadfc6] overflow-hidden shadow-xl shadow-[#3c2a10]/5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                  <div className="relative">
                    <Gallery images={p.gallery} alt={p.data.name} />
                    <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-xs font-bold text-[#2f5d2a]">
                      <Icon className="w-3.5 h-3.5" /> {p.tag}
                    </span>
                  </div>
                  <div className="p-6 md:p-8">
                    <h3 className="font-display text-2xl md:text-3xl font-semibold text-[#1f2d1c]">{p.data.name}</h3>
                    <p className="mt-2 text-sm text-[#7a6f58] line-clamp-2">{p.data.description}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.data.ingredients.map((ing) => (
                        <span key={ing} className="rounded-full bg-[#f4ecd8] px-2.5 py-1 text-[11px] font-semibold text-[#5b4a20]">
                          {ing}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/shop/${p.data.id}`}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#2f5d2a] hover:gap-3 transition-all"
                    >
                      View details <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        {/* details tabs */}
        <Reveal className="mt-16 max-w-4xl mx-auto">
          <div className="rounded-[2rem] bg-[#1f2d1c] text-white p-6 md:p-10 relative overflow-hidden">
            <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full bg-amber-400/20 blur-3xl" />
            <div data-tabs className="relative">
            <div className="relative flex gap-2 p-1 rounded-full bg-white/10 w-fit">
              {products.map((p) => (
                <button
                  key={p.key}
                  data-tab={p.key}
                  onClick={() => setTab(p.key)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                    tab === p.key ? "bg-amber-400 text-[#1f2d1c]" : "text-white/80 hover:text-white"
                  }`}
                >
                  {p.data.name}
                </button>
              ))}
            </div>
            {products.map((p) => (
              <div
                key={p.key}
                data-panel={p.key}
                hidden={tab !== p.key}
                className="relative mt-8 grid md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500"
              >
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-amber-300">Key benefits</p>
                  <ul className="mt-4 space-y-3">
                    {p.data.benefits.slice(0, 6).map((b) => (
                      <li key={b} className="flex gap-3 text-sm text-white/85">
                        <Check className="w-4 h-4 mt-0.5 text-amber-300 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-amber-300">How to use</p>
                  <p className="mt-4 text-sm text-white/85 leading-relaxed">{p.data.usage}</p>
                </div>
              </div>
            ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function GoutComboCTA() {
  const { ref, progress } = useElementProgress<HTMLElement>()
  const save = comboOffer.originalPrice - comboOffer.discountedPrice
  return (
    <section ref={ref} data-fx-scope="cta" className="relative py-24 md:py-32 overflow-hidden bg-[#13200f] text-white grain">
      <div
        data-fx="cta-bg"
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(60% 60% at 30% 30%, rgba(217,148,52,0.45), transparent 60%), radial-gradient(50% 50% at 80% 70%, rgba(47,93,42,0.6), transparent 60%)",
          transform: `translateY(${(progress - 0.5) * 80}px)`,
        }}
      />
      <div className="relative container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <Reveal dir="left">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-300">The complete care combo</p>
          <h2 className="font-display mt-3 text-4xl md:text-6xl font-semibold leading-tight">
            Move better.
            <br />
            <span className="italic text-amber-300">Live naturally.</span>
          </h2>
          <p className="mt-5 text-white/75 max-w-md">{comboOffer.description}</p>
          <div className="mt-8 flex items-end gap-4">
            <span className="font-display text-6xl font-semibold text-amber-300">
              ₹<CountUp to={comboOffer.discountedPrice} />
            </span>
            <span className="text-white/50 line-through text-xl mb-2">
              ₹{comboOffer.originalPrice.toLocaleString("en-IN")}
            </span>
            <span className="mb-3 rounded-full bg-amber-400 text-[#13200f] px-3 py-1 text-xs font-bold">
              Save ₹{save}
            </span>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/gout-combo"
              className="btn-shine inline-flex items-center gap-2 rounded-full bg-amber-400 px-8 py-4 text-sm font-bold text-[#13200f] hover:bg-amber-300 transition shadow-xl shadow-amber-500/20"
            >
              Get the combo <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/gout-combo-hindi"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-4 text-sm font-semibold hover:bg-white/10 transition"
            >
              हिंदी में देखें
            </Link>
          </div>
        </Reveal>

        <Reveal dir="right" className="relative h-[460px] md:h-[520px]">
          <div
            data-fx="cta-oil"
            className="absolute left-0 top-0 w-[62%] rounded-[2rem] overflow-hidden bg-gradient-to-b from-[#fffaf0] to-[#f1e4c4] p-4 shadow-2xl ring-1 ring-white/10"
            style={{ transform: `translateY(${(0.5 - progress) * 60}px) rotate(-4deg)` }}
          >
            <Image src={OIL_IMG} alt="Gouthealth Oil" width={600} height={900} className="w-full h-[340px] object-contain" />
          </div>
          <div
            data-fx="cta-caps"
            className="absolute right-0 bottom-0 w-[62%] rounded-[2rem] overflow-hidden bg-gradient-to-b from-[#fffaf0] to-[#f1e4c4] p-4 shadow-2xl ring-1 ring-white/10"
            style={{ transform: `translateY(${(progress - 0.5) * 60}px) rotate(4deg)` }}
          >
            <Image src={CAPS_IMG} alt="Gouthealth Capsules" width={600} height={900} className="w-full h-[340px] object-contain" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
