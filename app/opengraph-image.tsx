import { ImageResponse } from "next/og";

export const alt = "Vijaya Industries — Precision Automobile Clips";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px",
          background: "linear-gradient(135deg, #0f172a 0%, #172554 100%)",
          color: "white",
        }}
      >
        <div style={{ display: "flex", color: "#22c5d9", fontSize: 34, fontWeight: 700 }}>
          VIJAYA INDUSTRIES
        </div>
        <div style={{ display: "flex", marginTop: 30, fontSize: 74, fontWeight: 800, lineHeight: 1.1 }}>
          Precision Automobile Clips
        </div>
        <div style={{ display: "flex", marginTop: 28, color: "#cbd5e1", fontSize: 30 }}>
          Reliable fastening solutions for India&apos;s automotive industry
        </div>
      </div>
    ),
    size,
  );
}
