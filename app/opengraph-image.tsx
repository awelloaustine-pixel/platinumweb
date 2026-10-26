import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { seo, site } from "@/lib/content";

// Social share card (1200×630), generated at build time: the wireframe street
// (same SVG as the no-WebGL fallback) under the tagline, in the brand palette.

export const alt = `${site.name}: ${seo.ogTitle}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Literal paths (not a helper taking ...parts) so Turbopack traces only these files
// instead of bundling the whole project into the server function.
const [cormorant, dmMono, street, star] = await Promise.all([
  readFile(join(process.cwd(), "assets/fonts/cormorant-garamond-latin-300-normal.ttf")),
  readFile(join(process.cwd(), "assets/fonts/dm-mono-latin-400-normal.ttf")),
  readFile(join(process.cwd(), "public/street-fallback.svg")),
  readFile(join(process.cwd(), "public/platinum-star.png")),
]);

export default async function Image() {
  const streetSrc = `data:image/svg+xml;base64,${street.toString("base64")}`;
  const starSrc = `data:image/png;base64,${star.toString("base64")}`;
  const [line1, line2] = seo.ogTitle.split(". ").map((s, i, a) => (i < a.length - 1 ? `${s}.` : s));

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#020617" }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse needs plain <img> */}
        <img src={streetSrc} width={1200} height={675} alt="" style={{ position: "absolute", top: -20, left: 0, opacity: 0.9 }} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background: "linear-gradient(90deg, rgba(2,6,23,0.95) 0%, rgba(2,6,23,0.75) 45%, rgba(2,6,23,0.15) 100%)",
          }}
        />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", padding: "64px 72px", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse needs plain <img> */}
            <img src={starSrc} width={56} height={56} alt="" />
            <span style={{ fontFamily: "Cormorant", fontSize: 34, color: "#f8fafc" }}>Platinum</span>
            <span style={{ fontFamily: "DM Mono", fontSize: 14, letterSpacing: 4, color: "#94a3b8", marginLeft: 8 }}>
              MARKETING AGENCY / BRISTOL
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 80, fontFamily: "Cormorant", lineHeight: 0.9 }}>
            <span style={{ fontSize: 150, color: "#f8fafc", textTransform: "uppercase" }}>{line1}</span>
            <span style={{ fontSize: 150, color: "#d4af37", textTransform: "uppercase" }}>{line2}</span>
          </div>
          <span style={{ fontFamily: "DM Mono", fontSize: 22, color: "#94a3b8", marginTop: 40, letterSpacing: 1 }}>
            {seo.ogSubtitle}
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Cormorant", data: cormorant, style: "normal", weight: 300 },
        { name: "DM Mono", data: dmMono, style: "normal", weight: 400 },
      ],
    },
  );
}
