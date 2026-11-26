import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.resolve(__dirname),
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  },
  async rewrites() {
    return [
      {
        source: '/businesscard',
        destination: '/businesscard.html',
      },
      {
        source: '/card',
        destination: '/businesscard.html',
      },
      {
        source: '/business-card',
        destination: '/businesscard.html',
      },
    ];
  },
};

export default nextConfig;
