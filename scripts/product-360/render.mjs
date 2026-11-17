// Renders N frames of a 360° spin for each product from the unwrapped texture.
// Usage: node scripts/product-360/render.mjs <work_dir> <out_dir> [frames]
import { createRequire } from "node:module"
const { chromium } = createRequire(import.meta.url)("playwright") // globally installed in this environment
import fs from "node:fs"
import path from "node:path"
import http from "node:http"

const [work, out, framesArg] = process.argv.slice(2)
const FRAMES = Number(framesArg || 72)
const here = path.dirname(new URL(import.meta.url).pathname)
fs.copyFileSync(path.join(here, "render.html"), path.join(work, "render.html"))
fs.copyFileSync("node_modules/three/build/three.module.js", path.join(work, "three.module.js"))
fs.copyFileSync("node_modules/three/build/three.core.js", path.join(work, "three.core.js"))

const types = { ".html": "text/html", ".js": "text/javascript", ".json": "application/json", ".png": "image/png" }
const server = http.createServer((req, res) => {
  const f = path.join(work, decodeURIComponent(req.url.split("?")[0]))
  if (!fs.existsSync(f)) { res.writeHead(404); return res.end() }
  res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" })
  fs.createReadStream(f).pipe(res)
}).listen(3311)

const browser = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] })
for (const p of ["oil", "capsules"]) {
  const page = await browser.newPage({ viewport: { width: 720, height: 1080 } })
  page.on("pageerror", (e) => console.log("pageerror", e.message))
  await page.goto(`http://localhost:3311/render.html?p=${p}`)
  await page.waitForFunction(() => window.ready, null, { timeout: 60000 })
  fs.mkdirSync(path.join(out, p), { recursive: true })
  for (let i = 0; i < FRAMES; i++) {
    const data = await page.evaluate((d) => window.renderAngle(d), (i * 360) / FRAMES)
    fs.writeFileSync(path.join(out, p, `${String(i).padStart(2, "0")}.png`), Buffer.from(data.split(",")[1], "base64"))
  }
  console.log(p, "frames:", FRAMES)
  await page.close()
}
await browser.close()
server.close()
