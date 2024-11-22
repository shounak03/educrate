import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: ['res.cloudinary.com'],
        remotePatterns: [
            {
              protocol: 'https',
              hostname: '**', // This allows all https image URLs
            }
          ]
    }
};

export default nextConfig;
