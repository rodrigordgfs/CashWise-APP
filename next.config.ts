import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || "",
  experimental: {
    serverActions: {}, // se você realmente usa serverActions, coloque true aqui
  },
};

export default nextConfig;
