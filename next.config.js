/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "images.unsplash.com",
      "media-cdn.tripadvisor.com",
      "www.nhmagazine.com",
      "glebekitchen.com",
      "popmenucloud.com",
      "images.immediate.co.uk",
    ],
  },
};

module.exports = nextConfig;

//TODO: Delete mock image domains
