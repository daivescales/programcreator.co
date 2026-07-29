import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#0B0F14",
          color: "#FFFFFF",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 600,
            letterSpacing: "-0.03em",
          }}
        >
          <span style={{ color: "#FFFFFF" }}>Program</span>
          <span style={{ color: "#6BA8FF" }}>Creator</span>
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 28,
            color: "#C6D0DE",
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          Turn your audience into income. Built by Daive.
        </div>
      </div>
    ),
    { ...size }
  );
}
