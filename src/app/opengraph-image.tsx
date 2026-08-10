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
          background: "#0B2038",
          padding: "56px 64px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -80,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "rgba(77,155,255,0.18)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -140,
            left: -60,
            width: 420,
            height: 420,
            borderRadius: "50%",
            background: "rgba(77,155,255,0.12)",
          }}
        />
        <div style={{ display: "flex", fontSize: 28, fontWeight: 600 }}>
          <span style={{ color: "#FFFFFF" }}>Program</span>
          <span style={{ color: "#4D9BFF" }}>Creator</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 600,
              color: "#FFFFFF",
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
            }}
          >
            Creator Product Scaling
          </div>
          <div style={{ fontSize: 26, color: "#C2D4E8", maxWidth: 720 }}>
            Digital products for creators. Storefronts for brands.
          </div>
        </div>
        <div style={{ fontSize: 20, color: "#94AAC4" }}>@daivescales</div>
      </div>
    ),
    { ...size }
  );
}
