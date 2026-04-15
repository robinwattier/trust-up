import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/trust-up',
  assetPrefix: '/trust-up',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
