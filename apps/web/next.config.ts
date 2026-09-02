import type { NextConfig } from "next";

/**
 * Static export only for production builds (Cloudflare Pages).
 * Dev must omit `output: "export"` so middleware can rewrite `/en/…` → bare routes.
 */
const nextConfig: NextConfig = {
  ...(process.env.NODE_ENV === "production" ? { output: "export" as const } : {}),
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
