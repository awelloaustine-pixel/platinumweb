// Renders the hero shot of the 3D street to a static SVG, used when WebGL is
// unavailable, the device is low-power, or the 3D scene fails to start.
// It projects the exact same line geometry the scene uses, so the two match.
//
// Run: npm run fallback   (writes public/street-fallback.svg)

import { writeFileSync } from "node:fs";
import { BufferGeometry, PerspectiveCamera, Vector3 } from "three";
import { KEYFRAMES } from "../components/scene/cameraPath";
import { buildHeroShop, buildSkyline, buildStreet, SKYLINE_LIFT } from "../components/scene/geometry";

const W = 1600;
const H = 900;
const NEAR = 0.5;

const [hero] = KEYFRAMES;
const camera = new PerspectiveCamera(45, W / H, 0.1, 800);
camera.position.set(hero.pos[0], hero.pos[1], hero.pos[2]);
camera.lookAt(hero.target[0], hero.target[1], hero.target[2]);
camera.updateMatrixWorld();
camera.updateProjectionMatrix();

type Layer = { geometry: BufferGeometry; opacity: number; fogNear: number; fogFar: number; lift?: number; color: string };

const { street, floor } = buildStreet(160);
const layers: Layer[] = [
  { geometry: floor, opacity: 0.045, fogNear: 10, fogFar: 90, color: "#f8fafc" },
  { geometry: street, opacity: 0.2, fogNear: 30, fogFar: 125, color: "#f8fafc" },
  { geometry: buildHeroShop(), opacity: 0.16, fogNear: 25, fogFar: 150, color: "#f8fafc" },
  { geometry: buildSkyline("high"), opacity: 0.16, fogNear: 400, fogFar: 600, lift: SKYLINE_LIFT, color: "#94a3b8" },
];

const smoothstep = (e0: number, e1: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
};

// Paths grouped by colour + quantised opacity so the SVG stays small
const groups = new Map<string, string[]>();
const a = new Vector3();
const b = new Vector3();
const toScreen = (v: Vector3) => {
  v.applyMatrix4(camera.projectionMatrix); // view → NDC
  return [((v.x + 1) / 2) * W, ((1 - v.y) / 2) * H] as const;
};

for (const layer of layers) {
  const pos = layer.geometry.getAttribute("position");
  const glow = layer.geometry.getAttribute("aGlow");
  for (let i = 0; i < pos.count; i += 2) {
    a.fromBufferAttribute(pos, i).setY(pos.getY(i) + (layer.lift ?? 0)).applyMatrix4(camera.matrixWorldInverse);
    b.fromBufferAttribute(pos, i + 1).setY(pos.getY(i + 1) + (layer.lift ?? 0)).applyMatrix4(camera.matrixWorldInverse);
    let da = -a.z;
    let db = -b.z;
    if (da < NEAR && db < NEAR) continue;
    // Clip to the near plane
    if (da < NEAR || db < NEAR) {
      const t = (NEAR - da) / (db - da);
      const p = a.clone().lerp(b, t);
      if (da < NEAR) {
        a.copy(p);
        da = NEAR;
      } else {
        b.copy(p);
        db = NEAR;
      }
    }

    // Same fade rules as lineMaterial.ts: fog with distance, fade right at the lens
    const depth = (da + db) / 2;
    const isGlow = glow.getX(i) > 0.5;
    const base = isGlow ? 0.55 : layer.opacity;
    const alpha = base * (1 - smoothstep(layer.fogNear, layer.fogFar, depth)) * smoothstep(2, 12, depth);
    if (alpha < 0.015) continue;

    const [x1, y1] = toScreen(a);
    const [x2, y2] = toScreen(b);
    const off = (x: number, y: number) => x < -W * 0.1 || x > W * 1.1 || y < -H * 0.1 || y > H * 1.1;
    if (off(x1, y1) && off(x2, y2)) continue;

    const key = `${isGlow ? "#d4af37" : layer.color}|${(Math.round(alpha * 40) / 40).toFixed(3)}`;
    const d = `M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}`;
    (groups.get(key) ?? groups.set(key, []).get(key)!).push(d);
  }
}

const paths = [...groups.entries()]
  .map(([key, ds]) => {
    const [color, opacity] = key.split("|");
    return `<path stroke="${color}" stroke-opacity="${opacity}" d="${ds.join("")}"/>`;
  })
  .join("\n");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" fill="none" stroke-width="1" vector-effect="non-scaling-stroke" stroke-linecap="round">
${paths}
</svg>
`;

writeFileSync(new URL("../public/street-fallback.svg", import.meta.url), svg);
const segments = [...groups.values()].reduce((n, g) => n + g.length, 0);
console.log(`street-fallback.svg: ${segments} segments, ${groups.size} groups, ${(svg.length / 1024).toFixed(1)} KB`);
