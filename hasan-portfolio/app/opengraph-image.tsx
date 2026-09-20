import { ImageResponse } from "next/og";

export const alt = "Hasan Khesro - Full-Stack Engineer and AI Builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        background: "#fffefb",
        color: "#201515",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
        padding: "72px",
        width: "100%",
      }}
    >
      <div style={{ color: "#ff4f00", display: "flex", fontSize: 28, fontWeight: 600 }}>
        HASAN KHESRO
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", fontSize: 70, fontWeight: 700, letterSpacing: -3 }}>
          Full-Stack Engineer
        </div>
        <div style={{ color: "#6f6b60", display: "flex", fontSize: 32 }}>
          Building AI-driven products from idea to production.
        </div>
      </div>
      <div style={{ color: "#526074", display: "flex", fontSize: 24 }}>hasankhesro.com</div>
    </div>,
    size
  );
}
