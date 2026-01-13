import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Disable static optimization for pages using client-side storage
  output: undefined, // Use default (not static export)
};

export default nextConfig;
