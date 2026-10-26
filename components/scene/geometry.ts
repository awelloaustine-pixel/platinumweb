import { Matrix4 } from "three";
import { heroShop, lampPost, shopfront, terrace, van } from "./buildings";
import { FACADE, HERO_SLOT, ROAD } from "./layout";
import { LineBuilder, mulberry32 } from "./lineBuilder";

// Pure geometry builders (no React), shared by the scene components and by
// scripts/make-fallback.mts, which projects the same lines into the static SVG.

/** Terraces on the left, shopfronts on the right, road furniture, the van, and the ground grid */
export function buildStreet(length: number) {
  const rand = mulberry32(7);
  const lb = new LineBuilder(rand);
  lb.seedJitter = 0.06;
  const m = new Matrix4();
  const rotL = new Matrix4().makeRotationY(Math.PI / 2); // facade faces +x
  const rotR = new Matrix4().makeRotationY(-Math.PI / 2); // facade faces -x

  // Light-up wave order: buildings nearest the hero shop light first.
  const waveSeed = (z: number) => Math.min(0.95, Math.abs(z - HERO_SLOT.z) / (length * 0.9));

  // Left: terraces, local +x runs toward -z
  for (let z = 8; z > -length; ) {
    const w = 4.6 + rand() * 1.6;
    lb.seed = waveSeed(z);
    lb.setTransform(m.makeTranslation(-FACADE, 0, z).multiply(rotL));
    terrace(lb, w, rand);
    z -= w;
  }

  // Right: shopfronts, local +x runs toward +z, so place at the far edge
  const heroTop = HERO_SLOT.z + HERO_SLOT.w;
  for (let z = 8; z > -length; ) {
    let w = 5 + rand() * 2.2;
    if (z > HERO_SLOT.z && z - w < heroTop) {
      // This shop would overlap the hero slot: trim it to fit, then jump past
      w = z - heroTop;
      if (w < 3) {
        z = HERO_SLOT.z;
        continue;
      }
    }
    lb.seed = waveSeed(z);
    lb.setTransform(m.makeTranslation(FACADE, 0, z - w).multiply(rotR));
    shopfront(lb, w, rand);
    z = z - w <= heroTop && z > HERO_SLOT.z ? HERO_SLOT.z : z - w;
  }

  // Road: kerbs, building lines, centre dashes, crossing
  lb.seed = 0.98;
  lb.setTransform(m.identity());
  for (const x of [-ROAD, ROAD, -FACADE, FACADE]) lb.seg(x, 0, 20, x, 0, -length);
  for (let z = 16; z > -length; z -= 5) lb.seg(0, 0, z, 0, 0, z - 2.4);
  for (let x = -3.4; x < 3.6; x += 1) {
    lb.seg(x, 0.005, -12, x, 0.005, -14.5).seg(x + 0.55, 0.005, -12, x + 0.55, 0.005, -14.5);
  }

  // Lamp posts
  for (let z = 4; z > -length; z -= 18) {
    lb.seed = waveSeed(z);
    lb.setTransform(m.makeTranslation(-ROAD - 0.6, 0, z));
    lampPost(lb, 1);
    lb.setTransform(m.makeTranslation(ROAD + 0.6, 0, z - 9));
    lampPost(lb, -1);
  }

  // The client's van, parked outside the hero shop
  lb.seed = 0.02;
  lb.setTransform(m.makeTranslation(ROAD - 1.4, 0, HERO_SLOT.z + HERO_SLOT.w - 1.5));
  van(lb);

  // Ground grid (drawn with a separate, much fainter material)
  const fl = new LineBuilder(rand);
  fl.seed = 1;
  for (let x = -60; x <= 60; x += 4) fl.seg(x, -0.02, 30, x, -0.02, -length - 40);
  for (let z = 30; z > -length - 40; z -= 4) fl.seg(-60, -0.02, z, 60, -0.02, z);

  return { street: lb.build(), floor: fl.build() };
}

/** The client's shopfront, seeded so it lights bottom → top, edge by edge */
export function buildHeroShop() {
  const rand = mulberry32(42);
  const lb = new LineBuilder(rand);
  lb.setTransform(new Matrix4().makeTranslation(FACADE, 0, HERO_SLOT.z).multiply(new Matrix4().makeRotationY(-Math.PI / 2)));
  const { h } = heroShop(lb);
  const g = lb.build();

  // Re-seed per segment by height so it lights bottom → top, with a little shuffle.
  const pos = g.getAttribute("position");
  const seed = g.getAttribute("aSeed");
  const top = h + 4;
  for (let i = 0; i < pos.count; i += 2) {
    const y = (pos.getY(i) + pos.getY(i + 1)) / 2;
    const s = Math.min(0.97, (y / top) * 0.85 + rand() * 0.1);
    seed.setX(i, s);
    seed.setX(i + 1, s);
  }
  seed.needsUpdate = true;
  return g;
}

/** Height the skyline is raised to, as if on the hills behind the street */
export const SKYLINE_LIFT = 10;

/** Far Bristol silhouettes: tower blocks, Cabot Tower, a suspension bridge */
export function buildSkyline(detail: "high" | "low") {
  const rand = mulberry32(99);
  const lb = new LineBuilder(rand);
  lb.seed = 1;
  const m = new Matrix4();
  const Z = -175;

  // Tower blocks
  const blocks = detail === "high" ? 16 : 8;
  for (let i = 0; i < blocks; i++) {
    const x = -130 + (i / blocks) * 260 + rand() * 8;
    if (x > 20 && x < 90) continue; // keep the bridge clear
    const w = 8 + rand() * 10;
    const h = 14 + rand() * 30;
    lb.setTransform(m.makeTranslation(x, 0, Z - rand() * 30));
    lb.box(0, 0, -w, w, h, 0);
    if (detail === "high") for (let y = 4; y < h - 2; y += 4) lb.seg(0, y, 0, w, y, 0);
  }

  // Cabot Tower on the hill
  lb.setTransform(m.makeTranslation(-38, 10, Z - 10));
  lb.seg(-30, -10, 0, 0, 0, 0).seg(0, 0, 0, 30, -10, 0); // hill
  lb.box(-2, 0, -2, 2, 18, 2);
  lb.box(-1.3, 18, -1.3, 1.3, 25, 1.3);
  lb.seg(-1.3, 25, 0, 0, 30, 0).seg(1.3, 25, 0, 0, 30, 0);

  // Suspension bridge
  lb.setTransform(m.makeTranslation(0, 0, Z - 20));
  const [ax, bx, deck, top] = [30, 85, 16, 32];
  for (const x of [ax, bx]) {
    lb.seg(x - 1.5, 0, 0, x - 1.5, top, 0).seg(x + 1.5, 0, 0, x + 1.5, top, 0);
    lb.seg(x - 1.5, top, 0, x + 1.5, top, 0).seg(x - 1.5, deck + 6, 0, x + 1.5, deck + 6, 0);
  }
  lb.seg(ax - 14, deck, 0, bx + 14, deck, 0);
  const n = 24;
  let prev: [number, number] | null = null;
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const x = ax + (bx - ax) * t;
    const y = deck + 1 + (top - deck - 1) * Math.pow(2 * t - 1, 2);
    if (prev) lb.seg(prev[0], prev[1], 0, x, y, 0);
    if (i % 2 === 0 && i > 0 && i < n) lb.seg(x, y, 0, x, deck, 0);
    prev = [x, y];
  }
  return lb.build();
}
