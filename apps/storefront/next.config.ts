import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'private-ws-sk.elinkx.biz' },
      { protocol: 'https', hostname: 'edshop.edsystem.sk' },
    ],
  },
  poweredByHeader: false,
};

export default nextConfig;
