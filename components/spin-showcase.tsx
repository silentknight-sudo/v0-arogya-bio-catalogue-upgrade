"use client"

import Link from "next/link"
import { ArrowRight, Droplet, Pill } from "lucide-react"
import { Spin360 } from "@/components/spin-360"
import { Reveal, useElementProgress } from "@/components/motion"

type Callout = { at: number; title: string; text: string }

const SHOWCASE = {
  oil: {
    eyebrow: "For external use · 100 ml",
    title: "Gouthealth Oil",
    accent: "from every side",
    intro:
      "Scroll to turn the bottle. A warm Ayurvedic massage oil you apply right where the stiffness sits, morning and night.",
    href: "/shop/gout-oil",
    icon: Droplet,
    callouts: [
      { at: 0, title: "Three classic herbs", text: "Shallaki, Nirgundi and Ashwagandha in a natural joint support formula." },
      { at: 90, title: "Flip-top cap", text: "Pour a few drops straight into your palm. No spills, no spoon." },
      { at: 180, title: "Made in a GMP unit", text: "Manufactured by Mahatva Ayurveda, Panchkula (Hry.). Mfg. Lic. 1375-ISM(HR)." },
      { at: 270, title: "Amber bottle", text: "The tinted bottle helps shield the oil from light. For external use only." },
    ] as Callout[],
  },
  capsules: {
    eyebrow: "For internal use · 30 capsules",
    title: "Gouthealth Capsules",
    accent: "inside and out",
    intro:
      "Keep scrolling to read the whole label. Seven herbs in every 500 mg capsule, taken once a day.",
    href: "/shop/gout-capsules",
    icon: Pill,
    callouts: [
      { at: 0, title: "One a day", text: "One capsule daily with warm water, or as directed by your physician." },
      { at: 120, title: "Registered Ayurvedic medicine", text: "Mfg. Lic. 1375-ISM(HR) · FSSAI 22726923000141 · Marketed by Arogya Bio." },
      { at: 240, title: "7 herbs, 500 mg", text: "Shallaki 100 · Nirgundi 80 · Rasna 80 · Ashwagandha 70 · Giloy 70 · Ginger 50 · Arandi 50 mg." },
    ] as Callout[],
  },
}

export function SpinShowcase({ product, dark = false }: { product: "oil" | "capsules"; dark?: boolean }) {
  const s = SHOWCASE[product]
  const Icon = s.icon
  const t = dark
    ? { bg: "bg-[#13200f]", ink: "text-white", sub: "text-white/70", eyebrow: "text-amber-300", card: "border-white/10 bg-white/5", cardOn: "[&.is-active]:border-amber-300/60 [&.is-active]:bg-white/10", dot: "bg-amber-300", glow: "rgba(127,176,105,.35)", ring: "#f0b44a", track: "rgba(255,255,255,.12)" }
    : { bg: "bg-[#fbf3e2]", ink: "text-[#1f2d1c]", sub: "text-[#5b5240]", eyebrow: "text-amber-700", card: "border-[#eadfc6] bg-white/60", cardOn: "[&.is-active]:border-[#2f5d2a]/40 [&.is-active]:bg-white", dot: "bg-[#2f5d2a]", glow: "rgba(217,148,52,.38)", ring: "#2f5d2a", track: "rgba(47,93,42,.15)" }

  return (
    <section data-spin-scope className={`relative h-[300vh] ${t.bg}`} aria-label={`${s.title} 360 degree view`}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 grain pointer-events-none" />
        <div className="relative container mx-auto px-4 h-full grid lg:grid-cols-[1fr_minmax(0,1.1fr)_1fr] gap-4 lg:gap-10 items-center content-center pt-32 lg:pt-40 pb-6">
          {/* copy */}
          <div className="order-2 lg:order-1 hidden lg:block">
            <p className={`text-xs font-bold uppercase tracking-[0.3em] ${t.eyebrow} inline-flex items-center gap-2`}>
              <Icon className="w-4 h-4" /> {s.eyebrow}
            </p>
            <h2 className={`font-display mt-4 text-5xl xl:text-6xl font-semibold leading-[1.02] ${t.ink}`}>
              {s.title}
              <br />
              <span className="italic text-gradient-gold">{s.accent}</span>
            </h2>
            <p className={`mt-5 max-w-sm ${t.sub} leading-relaxed`}>{s.intro}</p>
            <div className="mt-8 flex items-center gap-4">
              <svg viewBox="0 0 64 64" className="w-16 h-16 -rotate-90">
                <circle cx="32" cy="32" r="28" fill="none" stroke={t.track} strokeWidth="4" />
                <circle data-spin-ring cx="32" cy="32" r="28" fill="none" stroke={t.ring} strokeWidth="4" strokeLinecap="round" pathLength={360} strokeDasharray="360" strokeDashoffset="360" />
              </svg>
              <div>
                <p data-spin-readout className={`font-display text-3xl font-semibold tabular-nums ${t.ink}`}>0°</p>
                <p className={`text-xs uppercase tracking-widest ${t.sub}`}>Scroll or drag to rotate</p>
              </div>
            </div>
            <Link href={s.href} className={`mt-8 inline-flex items-center gap-2 text-sm font-bold ${dark ? "text-amber-300" : "text-[#2f5d2a]"} hover:gap-3 transition-all`}>
              Product details <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* the product */}
          <div className="order-1 lg:order-2 relative h-[38vh] lg:h-[66vh] flex items-center justify-center">
            <div className="absolute w-[70%] aspect-square rounded-full blur-3xl animate-glow" style={{ background: `radial-gradient(circle, ${t.glow}, transparent 70%)` }} />
            <div className="absolute bottom-[3%] w-[46%] h-6 rounded-[50%] bg-black/25 blur-xl" />
            <Spin360 product={product} mode="scroll" className="relative h-full max-w-full" />
          </div>

          {/* callouts */}
          <div className="order-3 flex flex-col gap-3">
            <div className="lg:hidden text-center">
              <h2 className={`font-display text-3xl font-semibold ${t.ink}`}>
                {s.title} <span className="italic text-gradient-gold">{s.accent}</span>
              </h2>
              <p className={`mt-1 text-xs uppercase tracking-widest ${t.sub}`}>
                <span data-spin-readout>0°</span> · scroll to rotate
              </p>
            </div>
            {s.callouts.map((c) => (
              <div
                key={c.at}
                data-spin-callout
                data-at={c.at}
                data-span={product === "oil" ? 45 : 60}
                className={`rounded-2xl border p-4 lg:p-5 ${t.card} ${t.cardOn} max-lg:[&:not(.is-active)]:hidden`}
              >
                <p className={`flex items-center gap-2 font-semibold ${t.ink}`}>
                  <span className={`callout-dot w-2 h-2 rounded-full ${t.dot}`} />
                  {c.title}
                  <span className={`ml-auto text-[11px] tabular-nums ${t.sub}`}>{c.at}°</span>
                </p>
                <p className={`mt-1.5 text-sm leading-relaxed ${t.sub}`}>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const HERBS = [
  { n: "Shallaki", b: "Boswellia serrata", alt: "Salai Guggul", mg: 100, in: ["Oil", "Capsules"], t: "A fragrant tree resin that sits at the heart of classical Ayurvedic joint formulas, valued for comfortable, easy movement." },
  { n: "Nirgundi", b: "Vitex negundo", alt: "Five-leaved chaste tree", mg: 80, in: ["Oil", "Capsules"], t: "Its leaves are a staple of Ayurvedic massage oils and warm compresses for stiff, tired joints." },
  { n: "Rasna", b: "Pluchea lanceolata", alt: "Rasna", mg: 80, in: ["Capsules"], t: "Named in classical texts as a key herb for balancing Vata, the dosha Ayurveda links with joints." },
  { n: "Ashwagandha", b: "Withania somnifera", alt: "Indian ginseng", mg: 70, in: ["Oil", "Capsules"], t: "The best-known Ayurvedic adaptogen, traditionally taken for strength, stamina and recovery." },
  { n: "Giloy", b: "Tinospora cordifolia", alt: "Amrita / Guduchi", mg: 70, in: ["Capsules"], t: "Called Amrita, the herb of immortality, and traditionally used to support overall vitality." },
  { n: "Ginger", b: "Zingiber officinale", alt: "Adrak / Shunthi", mg: 50, in: ["Capsules"], t: "A warming kitchen spice that Ayurveda uses to kindle digestion and ease everyday aches." },
  { n: "Arandi", b: "Ricinus communis", alt: "Castor", mg: 50, in: ["Capsules"], t: "Castor has a long history in Vata-balancing Ayurvedic preparations for the joints." },
]

export function HerbAtlas() {
  const { ref, progress } = useElementProgress<HTMLElement>()
  return (
    <section ref={ref} data-fx-scope="hscroll" className="relative h-[260vh] bg-[#f4ecd8]">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-700">The herb atlas</p>
              <h2 className="font-display mt-3 text-4xl md:text-6xl font-semibold text-[#1f2d1c]">Seven herbs, one purpose</h2>
            </div>
            <p className="max-w-sm text-[#5b5240]">
              Every herb on the label, what it is and where you'll find it. Amounts are per 500 mg Gouthealth Capsule.
            </p>
          </div>
        </div>
        <div className="mt-10 overflow-hidden">
          <div
            data-fx="hscroll-track"
            className="flex gap-5 pl-[max(16px,calc((100vw-1400px)/2+16px))] pr-[20vw] w-max will-change-transform"
            style={{ transform: `translateX(calc(${-progress} * (100% - 100vw)))` }}
          >
            {HERBS.map((h, i) => (
              <article
                key={h.n}
                className="group relative w-[78vw] sm:w-[340px] shrink-0 rounded-[2rem] bg-white border border-[#eadfc6] p-7 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
              >
                <div className="flex items-start justify-between">
                  <span className="grid place-items-center w-16 h-16 rounded-2xl bg-[#2f5d2a] text-amber-100 font-display text-3xl font-semibold transition-transform duration-500 group-hover:rotate-6">
                    {h.n[0]}
                  </span>
                  <span className="text-right">
                    <span className="block font-display text-3xl font-semibold text-[#1f2d1c] tabular-nums">{h.mg}</span>
                    <span className="block text-[11px] uppercase tracking-widest text-[#9a8f78]">mg / capsule</span>
                  </span>
                </div>
                <h3 className="font-display mt-6 text-3xl font-semibold text-[#1f2d1c]">{h.n}</h3>
                <p className="text-sm italic text-[#7a6f58]">
                  {h.b} · {h.alt}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-[#5b5240]">{h.t}</p>
                <div className="mt-6 flex gap-2">
                  {h.in.map((p) => (
                    <span key={p} className={`rounded-full px-3 py-1 text-[11px] font-bold ${p === "Oil" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"}`}>
                      In {p}
                    </span>
                  ))}
                </div>
                <span className="absolute top-6 right-1/2 translate-x-1/2 text-[11px] text-[#c9b98f] tabular-nums">0{i + 1}</span>
              </article>
            ))}
          </div>
        </div>
        <div className="container mx-auto px-4 mt-8">
          <div className="h-1 rounded-full bg-[#e3d5b3] overflow-hidden">
            <div data-fx="hscroll-bar" className="h-full bg-[#2f5d2a] origin-left" style={{ transform: `scaleX(${progress})` }} />
          </div>
          <p className="mt-3 text-xs text-[#9a8f78]">
            Descriptions reflect traditional Ayurvedic use and are not medical claims.
          </p>
        </div>
      </div>
    </section>
  )
}

export function OutsideInside() {
  return (
    <section className="relative py-24 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <Reveal className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-700">Why two products</p>
          <h2 className="font-display mt-3 text-4xl md:text-6xl font-semibold text-[#1f2d1c]">Care from outside and within</h2>
          <p className="mt-4 text-[#5b5240]">
            Ayurveda has always paired an external therapy (abhyanga, warm oil massage) with an internal one. Gouthealth follows the same idea.
          </p>
        </Reveal>
        <div className="mt-16 grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {[
            { k: "oil" as const, tag: "Outside", title: "Massage with Gouthealth Oil", pts: ["Warm a few drops between your palms", "Massage the joint gently for 5–10 minutes", "Repeat 2–3 times a day"], tone: "from-amber-50 to-[#fbf3e2]", chip: "bg-amber-100 text-amber-800" },
            { k: "capsules" as const, tag: "Inside", title: "Take Gouthealth Capsules", pts: ["One capsule a day with warm water", "Seven herbs in every 500 mg capsule", "Continue daily for 60–90 days"], tone: "from-emerald-50 to-[#eef4e8]", chip: "bg-emerald-100 text-emerald-800" },
          ].map((c, i) => (
            <Reveal key={c.k} dir={i === 0 ? "left" : "right"} delay={i * 120}>
              <div className={`relative h-full rounded-[2rem] bg-gradient-to-b ${c.tone} border border-[#eadfc6] p-8 grid grid-cols-[1fr_auto] gap-6 items-center overflow-hidden`}>
                <div>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${c.chip}`}>{c.tag}</span>
                  <h3 className="font-display mt-4 text-3xl font-semibold text-[#1f2d1c]">{c.title}</h3>
                  <ul className="mt-5 space-y-2.5 text-sm text-[#5b5240]">
                    {c.pts.map((p, j) => (
                      <li key={p} className="flex gap-3">
                        <span className="grid place-items-center w-6 h-6 shrink-0 rounded-full bg-white border border-[#eadfc6] text-[11px] font-bold text-[#2f5d2a]">{j + 1}</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <Spin360 product={c.k} mode="auto" speed={c.k === "oil" ? 30 : -30} className="h-56 md:h-64" hint />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
