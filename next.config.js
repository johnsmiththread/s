/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['vercel.com'],
    unoptimized: process.env.NODE_ENV !== 'production',
  },
  outputFileTracingRoot: process.cwd(),
};

module.exports = nextConfig;