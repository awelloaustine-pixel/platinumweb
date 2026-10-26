// Tiny mutable store shared by the DOM (scroll/mouse listeners) and the 3D scene.
// Read inside useFrame — never in React render — so it never causes re-renders.

export type Quality = "high" | "low";

export const sceneState = {
  /** 0–1 through the whole page */
  progress: 0,
  /** Camera position along the keyframe path, 0 → 6 (see cameraPath.ts) */
  cam: 0,
  /** 0–1 slow orbit while inside the workspace (pricing → FAQ) */
  orbit: 0,
  /** normalised pointer, -1…1 */
  mouse: { x: 0, y: 0 },
  /** 0–1: street buildings lighting up in a wave (final CTA) */
  streetLit: 0,
  /** 0–1: hero shopfront lighting up edge by edge (solution) */
  heroLit: 0,
  /** 0–1: dims the scene behind dense content sections */
  dim: 0,
  quality: "high" as Quality,
  reducedMotion: false,
};

// Change notifications, so a scene rendering on demand (reduced motion) can redraw
// only when scroll actually changes something.
const listeners = new Set<() => void>();
export function onSceneChange(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}
export function notifySceneChange() {
  listeners.forEach((fn) => fn());
}

/** Which camera keyframe each section moves toward (matches data-scene attributes) */
export const SECTION_KEYS: Record<string, number> = {
  stats: 1,
  problem: 2,
  solution: 3,
  case: 4,
  pricing: 5,
  process: 5,
  why: 5,
  faq: 5,
  cta: 6,
};
