import { ImageResponse } from "next/og";

export const alt = "Hasan Khesro - Full-Stack Engineer and AI Builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        background: "#f8fafc",
        color: "#101820",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
        padding: "72px",
        width: "100%",
      }}
    >
      <div style={{ alignItems: "center", display: "flex", justifyContent: "space-between" }}>
        <div style={{ color: "#1d4ed8", display: "flex", fontSize: 28, fontWeight: 600 }}>
          HASAN KHESRO
        </div>
        <div style={{ alignItems: "center", display: "flex", gap: 10 }}>
          <div style={{ background: "#1d4ed8", borderRadius: 99, height: 8, width: 8 }} />
          <div style={{ background: "#15803d", borderRadius: 99, height: 2, width: 54 }} />
          <div style={{ background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: 99, height: 8, width: 8 }} />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", fontSize: 70, fontWeight: 700, letterSpacing: -3 }}>
          Full-Stack Engineer
        </div>
        <div style={{ color: "#526174", display: "flex", fontSize: 32 }}>
          Building AI-driven products from idea to production.
        </div>
      </div>
      <div style={{ alignItems: "center", display: "flex", gap: 14 }}>
        <div style={{ background: "linear-gradient(90deg, #1d4ed8 0 34%, #ffffff 34% 66%, #15803d 66% 100%)", borderRadius: 99, height: 4, width: 96 }} />
        <div style={{ color: "#15803d", display: "flex", fontSize: 24 }}>my-portfolio-six-wheat-43.vercel.app</div>
      </div>
    </div>,
    size
  );
}
