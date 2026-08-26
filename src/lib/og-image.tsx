import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

export function renderOgImage(subtitle: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0f2557 0%, #0a1a3f 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "linear-gradient(135deg, #2B6CF5, #1a4fcc)",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 800,
            }}
          >
            S
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#6EA8FE",
            }}
          >
            Smart Car Deals
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 68,
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: -2,
            maxWidth: 980,
          }}
        >
          {subtitle}
        </div>
        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 48,
          }}
        >
          {["30 Min Deals", "100% Free", "UAE Wide"].map((badge) => (
            <div
              key={badge}
              style={{
                display: "flex",
                fontSize: 22,
                fontWeight: 700,
                padding: "10px 22px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.16)",
              }}
            >
              {badge}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
