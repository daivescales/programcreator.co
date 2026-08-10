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
          justifyContent: "space-between",
          background: "#FFFFFF",
          padding: "56px 64px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 420,
            height: 420,
            borderRadius: "50%",
            background: "#F2F7FE",
          }}
        />
        <div style={{ display: "flex", fontSize: 28, fontWeight: 600 }}>
          <span style={{ color: "#10202F" }}>Program</span>
          <span style={{ color: "#3E8EF7" }}>Creator</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 600,
              color: "#10202F",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            Creator Product Scaling
          </div>
          <div style={{ fontSize: 26, color: "#46586B", maxWidth: 720 }}>
            Digital products for creators. Storefronts for brands.
          </div>
        </div>
        <div style={{ fontSize: 20, color: "#7C8B9C" }}>@daivescales</div>
      </div>
    ),
    { ...size }
  );
}
