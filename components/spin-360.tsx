"use client"

import { useEffect, useRef } from "react"
// @ts-ignore - plain JS module shared with the static export
import { mountSpin } from "@/lib/spin360"

export const SPIN = {
  oil: { base: "/products/360/oil/", aspect: "352 / 859", label: "Gouthealth Oil 100 ml, rotating 360 degrees" },
  capsules: { base: "/products/360/capsules/", aspect: "472 / 866", label: "Gouthealth Capsules, rotating 360 degrees" },
} as const

export function Spin360({
  product,
  mode = "auto",
  speed = 24,
  turns = 1,
  offset = 0,
  className = "",
  hint = false,
}: {
  product: keyof typeof SPIN
  mode?: "auto" | "scroll"
  speed?: number
  turns?: number
  offset?: number
  className?: string
  hint?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const api = mountSpin(ref.current)
    return () => api && api.destroy()
  }, [])
  const s = SPIN[product]
  return (
    <div
      ref={ref}
      data-spin
      data-base={s.base}
      data-frames={72}
      data-mode={mode}
      data-speed={speed}
      data-turns={turns}
      data-offset={offset}
      role="img"
      aria-label={s.label}
      tabIndex={0}
      style={{ aspectRatio: s.aspect }}
      className={`spin360 relative inline-block shrink-0 select-none touch-pan-y cursor-grab focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-500 ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img data-spin-poster src={`${s.base}00.webp`} alt="" draggable={false} className="absolute inset-0 w-full h-full object-contain" />
      <canvas data-spin-canvas className="absolute inset-0 w-full h-full object-contain opacity-0 transition-opacity duration-300" />
      {hint && (
        <span className="spin-hint pointer-events-none absolute bottom-1 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full bg-black/55 text-white text-[11px] font-semibold px-3 py-1 backdrop-blur">
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12a9 9 0 1 1-3-6.7" />
            <path d="M21 4v5h-5" />
          </svg>
          360° · drag to rotate
        </span>
      )}
    </div>
  )
}
