/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Force rebuild to clear cache - middleware.ts was removed
  experimental: {
    proxyNextAssetsCacheBuster: true,
  },
}

export default nextConfig
