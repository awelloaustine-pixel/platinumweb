import { BufferGeometry, Float32BufferAttribute, Matrix4, Vector3 } from "three";

// Collects line segments in world space so a whole group of buildings becomes one
// BufferGeometry (one draw call). Each vertex carries:
//   aSeed – when it lights up (0–1) relative to a uLit wave
//   aH    – normalised height, used for the gold→amber gradient
//   aGlow – 1 for always-faintly-lit details (windows, lamps)
export class LineBuilder {
  private pos: number[] = [];
  private seeds: number[] = [];
  private heights: number[] = [];
  private glows: number[] = [];
  private m = new Matrix4();
  private a = new Vector3();
  private b = new Vector3();

  seed = 0;
  glow = 0;
  /** Random jitter added per segment to `seed` (gives the "edge by edge" feel) */
  seedJitter = 0;
  heightScale = 14;

  // Plain field (not a TS parameter property) so Node can run this file with
  // type stripping alone — scripts/make-fallback.mts imports it.
  private rand: () => number;

  constructor(rand: () => number = Math.random) {
    this.rand = rand;
  }

  setTransform(m: Matrix4) {
    this.m.copy(m);
    return this;
  }

  seg(ax: number, ay: number, az: number, bx: number, by: number, bz: number) {
    this.a.set(ax, ay, az).applyMatrix4(this.m);
    this.b.set(bx, by, bz).applyMatrix4(this.m);
    const s = Math.min(1, this.seed + this.rand() * this.seedJitter);
    for (const p of [this.a, this.b]) {
      this.pos.push(p.x, p.y, p.z);
      this.seeds.push(s);
      this.heights.push(Math.min(1, Math.max(0, p.y / this.heightScale)));
      this.glows.push(this.glow);
    }
    return this;
  }

  /** Rectangle in the XY plane at depth z */
  rect(x0: number, y0: number, x1: number, y1: number, z = 0) {
    return this.seg(x0, y0, z, x1, y0, z)
      .seg(x1, y0, z, x1, y1, z)
      .seg(x1, y1, z, x0, y1, z)
      .seg(x0, y1, z, x0, y0, z);
  }

  /** Window with a cross mullion */
  window(x0: number, y0: number, x1: number, y1: number, z = 0.02) {
    this.rect(x0, y0, x1, y1, z);
    const mx = (x0 + x1) / 2;
    const my = y0 + (y1 - y0) * 0.55;
    return this.seg(mx, y0, z, mx, y1, z).seg(x0, my, z, x1, my, z);
  }

  box(x0: number, y0: number, z0: number, x1: number, y1: number, z1: number) {
    this.rect(x0, y0, x1, y1, z0).rect(x0, y0, x1, y1, z1);
    return this.seg(x0, y0, z0, x0, y0, z1)
      .seg(x1, y0, z0, x1, y0, z1)
      .seg(x1, y1, z0, x1, y1, z1)
      .seg(x0, y1, z0, x0, y1, z1);
  }

  /** Circle in the YZ plane (e.g. a wheel seen from the side) */
  circleYZ(x: number, cy: number, cz: number, r: number, n = 14) {
    for (let i = 0; i < n; i++) {
      const t0 = (i / n) * Math.PI * 2;
      const t1 = ((i + 1) / n) * Math.PI * 2;
      this.seg(x, cy + Math.sin(t0) * r, cz + Math.cos(t0) * r, x, cy + Math.sin(t1) * r, cz + Math.cos(t1) * r);
    }
    return this;
  }

  get segmentCount() {
    return this.pos.length / 6;
  }

  build() {
    const g = new BufferGeometry();
    g.setAttribute("position", new Float32BufferAttribute(this.pos, 3));
    g.setAttribute("aSeed", new Float32BufferAttribute(this.seeds, 1));
    g.setAttribute("aH", new Float32BufferAttribute(this.heights, 1));
    g.setAttribute("aGlow", new Float32BufferAttribute(this.glows, 1));
    g.computeBoundingSphere();
    return g;
  }
}

/** Deterministic PRNG so the street looks the same on every load */
export function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
