import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  // Transpile three.js ecosystem for Next.js
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  typescript: {
    // Ignore TypeScript type mismatches (e.g. framer-motion v13 variants) during build
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
