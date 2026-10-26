import { CatmullRomCurve3, Vector3 } from "three";

// Camera keyframes, one per story beat. sceneState.cam runs 0 → 6 and lands
// exactly on keyframe i at cam = i (CatmullRom getPoint passes through its points).
//
// Hero shop: facade at x = 6.5 facing the street, spans z -46 … -36. The big window
// covers z -45.4 … -39.2, y 0.5 … 3.6; the laptop sits inside at ≈ (13.1, 1.3, -41).
export const KEYFRAMES = [
  { name: "hero", pos: [0, 6, 30], target: [1, 3, -45] },
  { name: "stats", pos: [0, 10, 12], target: [3, 2, -45] },
  // Aimed left of the shop so it sits in the right half, away from the copy
  { name: "problem", pos: [-1, 3.4, -24], target: [1.5, 3.4, -42] },
  // Square-on but further back, aimed left so the lit shop sits in the right half.
  // From here the flight to "case" crosses the facade (x = 6.5) at z ≈ -41.4,
  // y ≈ 2.2: the middle of the shop window.
  { name: "solution", pos: [-8, 4.5, -38], target: [1, 4.5, -44] },
  { name: "case", pos: [9.6, 1.7, -42.2], target: [13.1, 1.35, -41.5] },
  { name: "room", pos: [10.8, 2.7, -37.5], target: [15, 1, -44] },
  { name: "cta", pos: [-12, 42, 34], target: [0, 0, -50] },
] as const;

const v = (a: readonly number[]) => new Vector3(a[0], a[1], a[2]);

export const posCurve = new CatmullRomCurve3(KEYFRAMES.map((k) => v(k.pos)), false, "catmullrom", 0.3);
export const targetCurve = new CatmullRomCurve3(KEYFRAMES.map((k) => v(k.target)), false, "catmullrom", 0.3);

export const LAST_KEY = KEYFRAMES.length - 1;
