import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "smartcardeals.net" },
      { protocol: "https", hostname: "www.smartcardeals.net" },
      { protocol: "https", hostname: "www.blog.smartcardeals.net" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/privacy-policy",
        destination: "/policy",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
