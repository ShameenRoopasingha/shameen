import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Production optimizations
  compress: true,
  poweredByHeader: false,

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },

  // Compiler optimizations  
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Bundle optimization
  experimental: {
    optimizePackageImports: ['gsap', '@react-three/fiber', '@react-three/drei', 'three'],
  },
};

export default nextConfig;
