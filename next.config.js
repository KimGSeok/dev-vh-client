/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
    emotion: true
  },
  eslint: {
    ignoreDuringBuilds: true
  }
}


module.exports = nextConfig