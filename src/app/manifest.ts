import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} – Sell Your Car In Minutes`,
    short_name: SITE_NAME,
    description:
      "Instant, data-driven car evaluations in the UAE. Same-day cash payment and doorstep service across Dubai and all Emirates.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0f2557",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
