import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #2B6CF5 0%, #0f2557 100%)",
          borderRadius: 38,
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 96,
            fontWeight: 900,
            lineHeight: 1,
            fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
            marginBottom: -8,
          }}
        >
          SC
        </div>
        <div
          style={{
            width: 88,
            height: 8,
            background: "white",
            borderRadius: 8,
            marginTop: 18,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
