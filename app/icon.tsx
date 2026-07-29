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
          background: "#04060B",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: 2,
            right: 2,
            width: 6,
            height: 6,
            borderRadius: 2,
            background: "#2B5CE6",
          }}
        />
        <span
          style={{
            color: "#FFFFFF",
            fontSize: 14,
            fontWeight: 800,
            letterSpacing: "-0.06em",
            lineHeight: 1,
          }}
        >
          PC
        </span>
      </div>
    ),
    { ...size }
  );
}
