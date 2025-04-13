/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  images: {
    domains: ['i.postimg.cc', 'lh3.googleusercontent.com'],
  },
  allowedDevOrigins: [
    'http://192.168.1.71:3000',
    'http://localhost:3000',
  ],
}

module.exports = nextConfig

