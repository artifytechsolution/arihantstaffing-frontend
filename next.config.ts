import type { NextConfig } from "next";

const nextConfig: NextConfig = {
typescript: {
    // !! WARNING !!
    // Dangerously allow production builds even if your project has type errors.
    // !! WARNING !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: allows production builds even when ESLint errors exist.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
