# Scene & camera plan

## World layout (1 unit ≈ 1 m)

```
                         far skyline (z -160…-220, 15% opacity)
                Cabot Tower · suspension bridge · tower blocks
  ───────────────────────────────────────────────────────────────
   x=-8  terraced houses (repeat)   │ road │  x=+8 shopfronts (repeat)
                                    │  ══  │
                                    │      │  ★ "CLIENT" SHOPFRONT  (x=+8, z=-40)
                                    │ VAN  │    2 storeys, sign board, door, window
                                    │      │    → interior "workspace" behind it
                                    │      │
   camera starts here →  (0, 1.7, 12) looking down -Z
```

- **Street:** the road runs along −Z from z=+10 to z=−120. There are pavements, kerb lines, lamp posts and a grid floor that fades into the fog.
- **Terraces (left) / shopfronts (right):** 3–4 procedural variants (roof pitch, bay window, chimney, awning). They repeat with jitter, and all edges merge into one `BufferGeometry` per side, so each side is one draw call. That beats instancing for `LineSegments`.
- **Hero building:** a distinct shopfront at (8, 0, −40) with a van parked outside. Its edges carry a per-vertex `height` attribute, so a shader can light it from the ground up, edge by edge.
- **Workspace interior:** a room box behind the hero building's front wall. It has a grid floor and ceiling, a desk and a laptop, plus a floating browser panel (a screenshot texture of Bristol Spark, swappable).
- **Materials:** edges are `--text` (#f8fafc) at ~25% opacity, with the far skyline at ~12%. "Lit" edges lerp to `--accent` #d4af37, with an `--accent2` amber gradient by height. The background is `--bg` with fog of the same colour.

## Camera path

> The live, tuned keyframes are in `components/scene/cameraPath.ts`; the numbers in the table below were the starting plan. Section → keyframe mapping is `SECTION_KEYS` in `lib/scroll.ts`.

All of this is driven by one GSAP ScrollTrigger (scrub) across the whole page. Each section's DOM position sets a breakpoint, so camera beats always line up with the copy. Position and look-at target each follow a `CatmullRomCurve3`.

| # | Section | Camera position → look-at | What happens in 3D |
|---|---|---|---|
| K0 | Hero | (0, 1.7, 12) → (0, 3, −40) | Slow idle drift; mouse parallax ±0.4 on desktop. Street mostly dim; a few windows faintly glowing. |
| K1 | Stats | rises to (0, 5, 2) | Gentle rise, so the street reads as a map. |
| K2 | Problem | (3, 2.4, −28) → hero building | Pushes in on the **dark** shopfront. Phone + missed-call cards are HTML overlays, not in canvas. Other buildings faintly lit, this one dead. |
| K3 | Solution | arcs (−1, 3.5, −30) → (2, 3, −33) | Building lights up in 3 steps tied to Build → Automate → Compound (ground floor → upper floor + sign → roofline + "signal" rings). Gold light streaks run down the road into the door. |
| K4 | Case study | (7, 1.9, −36) → through the window → (8.5, 1.7, −44) | Passes through the shopfront glass into the workspace and settles in front of the laptop/browser panel. |
| K5 | Pricing → Process → Why Us → FAQ | stays inside, slow ambient orbit | Scene dims to ~40% and only the grid floor/ceiling loop moves, so content stays readable. |
| K6 | Final CTA | pulls back and up to (0, 28, 35) → (0, 0, −50) | Exits through the front and climbs above the street; every building lights up in a wave. "Every building is now online." |

## Components

```
components/scene/
  SceneCanvas.tsx   – lazy (next/dynamic, ssr:false), fixed full-screen, dpr [1,1.5],
                      pauses when tab hidden / reduced-motion / offscreen
  CameraRig.tsx     – reads scroll progress from lib/scroll.ts, samples curves, mouse parallax
  Street.tsx        – road, pavements, lamp posts, merged terraces/shopfronts, van
  Building.tsx      – hero shopfront with light-up shader (uLit uniform 0..1)
  LightStreaks.tsx  – N thin lines along road curves, shader-animated dash in gold
  GridRoom.tsx      – workspace interior + ambient grid loop
  Skyline.tsx       – far Bristol silhouettes
lib/scroll.ts       – tiny mutable store (progress, section, lit levels); no React re-renders per frame
```

## Fallbacks and performance

- **Mobile (<768px or coarse pointer):** about half the buildings, no skyline detail, no parallax, no post-processing.
- **`prefers-reduced-motion`:** the camera doesn't fly. Each section cross-fades to a static framed shot; no scramble/split animations.
- **No WebGL / low-power** (`navigator.hardwareConcurrency <= 2` or `deviceMemory <= 2`): a static wireframe SVG of the street.
- **Hero is HTML-first:** a gradient + SVG poster renders instantly, and the canvas fades in once ready.
