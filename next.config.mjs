/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // We currently sell only Gouthealth Oil + Gouthealth Capsules.
  // Old catalogue / kit URLs are sent to the focused shop page.
  async redirects() {
    return [
      { source: "/catalogue", destination: "/shop", permanent: false },
      { source: "/kits", destination: "/shop", permanent: false },
      { source: "/kits/:id", destination: "/shop", permanent: false },
    ]
  },
}

export default nextConfig
