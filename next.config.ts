import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  // Turbopack is the default in Next.js 16 — silence the webpack warning
  turbopack: {},
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
  // transpilePackages needed for next-mdx-remote with Turbopack
  transpilePackages: ['next-mdx-remote'],
}

export default nextConfig
