import { renderOgImage, OG_SIZE } from "@/lib/og-image";

export const alt = "Smart Car Deals – Sell Your Car In Minutes";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage("Sell Your Car In Minutes — UAE's #1 Car Buyer");
}
