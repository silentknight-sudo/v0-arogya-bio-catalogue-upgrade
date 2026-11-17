/*
 * 360° product spin viewer.
 *
 * Plain JavaScript with no dependencies, so the Next.js site and the static
 * artifact export share exactly the same behaviour.
 *
 * Markup (see components/spin-360.tsx):
 *   <div data-spin data-base="/products/360/oil/" data-frames="72"
 *        data-mode="auto|scroll" data-speed="24" data-turns="1" data-offset="0">
 *     <img data-spin-poster src=".../00.webp">   shown until frames load
 *     <canvas data-spin-canvas></canvas>
 *   </div>
 *
 * - auto:   turns slowly while visible; drag to rotate, resumes after a pause.
 * - scroll: angle follows scroll progress through the nearest [data-spin-scope]
 *           (or the element itself); dragging adds an offset.
 * Inside the scope, [data-spin-callout][data-at="deg"] get .is-active when the
 * product faces that angle, [data-spin-readout] shows the angle and
 * [data-spin-ring] (an SVG circle with pathLength=360) fills with progress.
 */

const pad = (i) => String(i).padStart(2, "0")
const clamp = (v, a, b) => Math.max(a, Math.min(b, v))
const norm = (d) => ((d % 360) + 360) % 360

function scopeProgress(el) {
  const r = el.getBoundingClientRect()
  const vh = window.innerHeight
  const total = r.height - vh
  return clamp(total > 0 ? -r.top / total : (vh - r.top) / (vh + r.height), 0, 1)
}

export function mountSpin(el) {
  if (!el || el.__spin) return el && el.__spin
  const base = el.getAttribute("data-base")
  const count = Number(el.getAttribute("data-frames") || 72)
  const mode = el.getAttribute("data-mode") || "auto"
  const speed = Number(el.getAttribute("data-speed") || 24) // deg / second
  const turns = Number(el.getAttribute("data-turns") || 1)
  const offset = Number(el.getAttribute("data-offset") || 0)
  const scope = el.closest("[data-spin-scope]") || el
  const canvas = el.querySelector("[data-spin-canvas]")
  const poster = el.querySelector("[data-spin-poster]")
  const ctx = canvas && canvas.getContext("2d")
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches

  const frames = new Array(count)
  let loaded = 0
  let started = false
  let angle = offset
  let drag = 0
  let dragging = false
  let lastX = 0
  let lastInput = 0
  let visible = false
  let raf = 0
  let lastT = 0
  let drawn = -1

  function load() {
    if (started) return
    started = true
    // load every 6th frame first so a coarse spin is available quickly
    const order = []
    for (let s = 0; s < 6; s++) for (let i = s; i < count; i += 6) order.push(i)
    order.forEach((i) => {
      const img = new Image()
      img.decoding = "async"
      img.onload = () => {
        frames[i] = img
        loaded++
        if (canvas && !canvas.__sized) {
          canvas.__sized = true
          canvas.width = img.naturalWidth
          canvas.height = img.naturalHeight
        }
        if (loaded === 1 || i === 0) draw(true)
      }
      img.src = base + pad(i) + ".webp"
    })
  }

  function nearestLoaded(idx) {
    for (let d = 0; d < count; d++) {
      if (frames[(idx + d) % count]) return (idx + d) % count
      if (frames[(idx - d + count) % count]) return (idx - d + count) % count
    }
    return -1
  }

  function draw(force) {
    if (!ctx) return
    const a = norm(angle + drag)
    const want = Math.round((a / 360) * count) % count
    const idx = nearestLoaded(want)
    if (idx < 0 || (idx === drawn && !force)) return emit(a)
    const img = frames[idx]
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    drawn = idx
    if (poster && poster.style.visibility !== "hidden") {
      // keep the poster in layout (it gives the box its natural width) but hide it
      poster.style.visibility = "hidden"
      canvas.style.opacity = "1"
    }
    emit(a)
  }

  function emit(a) {
    el.setAttribute("data-angle", String(Math.round(a)))
    if (scope === el && mode !== "scroll") return
    scope.querySelectorAll("[data-spin-callout]").forEach((c) => {
      if (c.closest("[data-spin]") && c.closest("[data-spin]") !== el) return
      const at = Number(c.getAttribute("data-at") || 0)
      const span = Number(c.getAttribute("data-span") || 40)
      const d = Math.abs(((a - at + 540) % 360) - 180)
      c.classList.toggle("is-active", d < span)
    })
    scope.querySelectorAll("[data-spin-readout]").forEach((r) => (r.textContent = Math.round(a) + "°"))
    if (mode === "scroll") {
      const p = scopeProgress(scope)
      scope.querySelectorAll("[data-spin-ring]").forEach((r) => r.setAttribute("stroke-dashoffset", String(360 - p * 360)))
    }
  }

  function tick(t) {
    raf = 0
    const dt = lastT ? Math.min(t - lastT, 64) / 1000 : 0
    lastT = t
    if (mode === "scroll") {
      angle = offset + scopeProgress(scope) * 360 * turns
    } else if (!dragging && !reduce && t - lastInput > 1800) {
      angle += speed * dt
    }
    draw(false)
    if (visible) raf = requestAnimationFrame(tick)
  }

  function start() {
    if (!raf) {
      lastT = 0
      raf = requestAnimationFrame(tick)
    }
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) load()
        const v = e.isIntersecting && e.intersectionRatio > 0
        if (v && !visible) {
          visible = true
          start()
        } else if (!v) visible = false
      })
    },
    { rootMargin: "600px 0px" },
  )
  io.observe(mode === "scroll" ? scope : el)

  // drag / swipe to rotate
  el.addEventListener("pointerdown", (e) => {
    dragging = true
    lastX = e.clientX
    el.setPointerCapture && el.setPointerCapture(e.pointerId)
    el.classList.add("is-dragging")
  })
  el.addEventListener("pointermove", (e) => {
    if (!dragging) return
    drag -= ((e.clientX - lastX) / Math.max(el.clientWidth, 1)) * 300
    lastX = e.clientX
    lastInput = performance.now()
    draw(false)
  })
  const end = () => {
    dragging = false
    lastInput = performance.now()
    el.classList.remove("is-dragging")
  }
  el.addEventListener("pointerup", end)
  el.addEventListener("pointercancel", end)
  // keyboard: arrows rotate by 15°
  el.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return
    e.preventDefault()
    drag += e.key === "ArrowRight" ? 15 : -15
    lastInput = performance.now()
    draw(false)
  })

  const api = {
    destroy() {
      io.disconnect()
      cancelAnimationFrame(raf)
      visible = false
      el.__spin = null
    },
  }
  el.__spin = api
  return api
}

export function mountAllSpins(root) {
  ;(root || document).querySelectorAll("[data-spin]").forEach((el) => mountSpin(el))
}
