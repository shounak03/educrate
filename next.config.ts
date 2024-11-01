import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.google.com'
      },
      {
        protocol: 'https',
        hostname: 'hydeparkwinterwonderland.com'
      },
      {
        protocol: 'https',
        hostname: 'wembleypark.com'
      },
    ]
  }
};

export default nextConfig;
