/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    deviceSizes: [480, 640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [200, 320, 400],
  },
  sassOptions: {
    includePaths: ["./node_modules"],
  },
};

module.exports = nextConfig;
