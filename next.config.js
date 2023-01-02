/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: { appDir: true },
  compiler: {
    styledComponents: true,
    emotion: true
  },
}

module.exports = nextConfig