/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    NEXT_PUBLIC_API_BASEPATH_V2: process.env.NEXT_PUBLIC_API_BASEPATH_V2,
  },
};

module.exports = nextConfig;
