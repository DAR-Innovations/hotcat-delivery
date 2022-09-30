/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["media-cdn.tripadvisor.com", "www.nhmagazine.com"],
  },
};

module.exports = nextConfig;
