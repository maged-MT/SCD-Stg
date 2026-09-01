import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #2B6CF5 0%, #0f2557 100%)",
          borderRadius: 7,
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: 900,
            fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
          }}
        >
          S
        </div>
      </div>
    ),
    { ...size }
  );
}
