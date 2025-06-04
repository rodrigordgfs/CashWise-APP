import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {}, // se você realmente usa serverActions, coloque true aqui
  },
};

export default nextConfig;
