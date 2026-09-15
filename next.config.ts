import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
