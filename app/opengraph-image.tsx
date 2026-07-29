import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ProgramCreator — I build the product your audience already wants.";
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
          padding: "72px 80px",
          background: "#04060B",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 700,
            height: 700,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(43,92,230,0.35) 0%, rgba(43,92,230,0.08) 45%, transparent 70%)",
            top: -180,
            right: -120,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(43,92,230,0.18) 0%, transparent 70%)",
            bottom: -200,
            left: -100,
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontSize: 42,
            fontWeight: 800,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          <span style={{ color: "#FFFFFF" }}>PROGRAM</span>
          <span style={{ color: "#4E7CF0" }}>CREATOR</span>
        </div>
        <div
          style={{
            marginTop: 36,
            maxWidth: 820,
            fontSize: 52,
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            color: "#FFFFFF",
          }}
        >
          I build the product your audience already wants.
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 22,
            color: "#AFBDD9",
            letterSpacing: "0.02em",
          }}
        >
          Done-with-you product builds for creators
        </div>
      </div>
    ),
    { ...size }
  );
}
