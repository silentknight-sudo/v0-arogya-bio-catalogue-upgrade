"use client"

import { useEffect, useRef, ReactNode } from "react"

interface ScrollAnimationProps {
  children: ReactNode
  className?: string
  animationType?: "fade-up" | "fade-in" | "slide-left" | "slide-right" | "zoom"
}

export function ScrollAnimation({
  children,
  className = "",
  animationType = "fade-up",
}: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")
          entry.target.classList.add(
            animationType === "fade-up"
              ? "fade-in"
              : animationType === "fade-in"
                ? "fade-in"
                : animationType === "slide-left"
                  ? "slide-in-from-left"
                  : animationType === "slide-right"
                    ? "slide-in-from-right"
                    : "zoom-in"
          )
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [animationType])

  return (
    <div ref={ref} className={`opacity-0 duration-1000 ${className}`}>
      {children}
    </div>
  )
}

interface CardFlipProps {
  children: ReactNode
  front: ReactNode
  back: ReactNode
}

export function CardFlip({ front, back }: CardFlipProps) {
  const [isFlipped, setIsFlipped] = null

  return (
    <div
      className="w-full h-full relative transition-transform duration-500 cursor-pointer [perspective:1000px] hover:scale-105"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] hover:[transform:rotateY(180deg)]">
        <div className="[backface-visibility:hidden]">{front}</div>
        <div className="[backface-visibility:hidden] [transform:rotateY(180deg)] absolute inset-0">
          {back}
        </div>
      </div>
    </div>
  )
}

interface ParallaxProps {
  children: ReactNode
  offset?: number
}

export function Parallax({ children, offset = 0.5 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const element = ref.current
        const scrollPosition = window.scrollY
        const elementPosition = element.getBoundingClientRect().top + scrollPosition
        const distance = scrollPosition - (elementPosition - window.innerHeight)

        if (distance > -window.innerHeight && distance < window.innerHeight * 2) {
          element.style.transform = `translateY(${distance * offset}px)`
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [offset])

  return (
    <div ref={ref} className="transition-transform duration-0">
      {children}
    </div>
  )
}
