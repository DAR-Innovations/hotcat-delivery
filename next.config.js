/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "media-cdn.tripadvisor.com",
      "www.nhmagazine.com",
      "glebekitchen.com",
    ],
  },
};

module.exports = nextConfig;

//TODO: Delete mock image domains
