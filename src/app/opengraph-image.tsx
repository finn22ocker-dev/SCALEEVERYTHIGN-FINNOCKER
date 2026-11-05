import { ImageResponse } from "next/og";

export const alt = "SCALEEVERYTHING – Digital Experiences. Intelligent Growth.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Generiertes Social-Image (Platzhalter, kann durch eigenes Motiv ersetzt werden). */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(circle at 78% 40%, #8c2240 0%, #641529 22%, #101012 62%)",
          color: "#F4F1EB",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 6 }}>SCALE / EVERYTHING</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 104, fontWeight: 700, lineHeight: 0.92, letterSpacing: -4 }}>
          <span>WE BUILD.</span>
          <span>WE CREATE.</span>
          <span style={{ color: "#C8FF33" }}>WE SCALE.</span>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#9B999E" }}>Digital Experiences. Intelligent Growth.</div>
      </div>
    ),
    size,
  );
}
