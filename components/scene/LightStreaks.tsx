"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import {
  BufferGeometry,
  Float32BufferAttribute,
  type LineSegments,
  NormalBlending,
  ShaderMaterial,
  Vector3,
} from "three";
import { sceneState } from "@/lib/scroll";
import { FACADE, HERO_SLOT } from "./layout";
import { mulberry32 } from "./lineBuilder";
import { palette } from "./lineMaterial";

// Thin gold streaks racing down the road like data flowing in. Some turn into the
// client's shop door. Each streak is one 2-vertex segment; aT runs tail 0 → head 1
// so the shader can fade the tail. Positions are rewritten each frame (cheap: ≤ 28 lines).

const DOOR_Z = HERO_SLOT.z + 8.3; // door centre (see heroShop)
const START_Z = 40;
const END_Z = -150;

type Streak = { lane: number; y: number; speed: number; len: number; s: number; toShop: boolean };

const head = new Vector3();
const tail = new Vector3();

/** Point along a streak's path at distance s: straight down the lane, optionally turning into the shop */
function pointAt(st: Streak, s: number, out: Vector3) {
  const z = START_Z - s;
  if (st.toShop && z < DOOR_Z) {
    const turned = DOOR_Z - z; // distance travelled after the turn
    return out.set(Math.min(st.lane + turned, FACADE + 0.5), st.y, DOOR_Z);
  }
  return out.set(st.lane, st.y, z);
}

export function LightStreaks({ count }: { count: number }) {
  const ref = useRef<LineSegments<BufferGeometry, ShaderMaterial>>(null);

  const { geometry, material, streaks } = useMemo(() => {
    const rand = mulberry32(3);
    const lanes = [-3.2, -1.6, 1.6, 3.2, -4.4, 4.4];
    const streaks: Streak[] = Array.from({ length: count }, (_, i) => {
      const toShop = i % 3 === 0;
      return {
        lane: toShop ? 1.6 + rand() * 1.6 : lanes[i % lanes.length],
        y: 0.06 + rand() * 0.25,
        speed: 14 + rand() * 22,
        len: 3 + rand() * 6,
        s: rand() * (START_Z - END_Z),
        toShop,
      };
    });

    const g = new BufferGeometry();
    g.setAttribute("position", new Float32BufferAttribute(new Float32Array(count * 6), 3));
    const t = new Float32Array(count * 2);
    for (let i = 0; i < count; i++) t[i * 2 + 1] = 1;
    g.setAttribute("aT", new Float32BufferAttribute(t, 1));

    const m = new ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: NormalBlending,
      toneMapped: false,
      uniforms: {
        uA: { value: palette.accent.clone() },
        uB: { value: palette.accent2.clone() },
        uLevel: { value: 0 },
      },
      vertexShader: /* glsl */ `
        attribute float aT;
        varying float vT;
        varying float vDepth;
        void main() {
          vT = aT;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          vDepth = -mv.z;
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uA;
        uniform vec3 uB;
        uniform float uLevel;
        varying float vT;
        varying float vDepth;
        void main() {
          // vT * vT, not pow(): ANGLE/D3D can return NaN for pow(0.0, y), and bloom's
          // blur then smears that NaN across the whole frame (black screen).
          float a = vT * vT * uLevel;
          a *= 1.0 - smoothstep(60.0, 140.0, vDepth);
          a *= smoothstep(1.5, 6.0, vDepth);
          gl_FragColor = vec4(mix(uB, uA, vT), a);
        }
      `,
    });
    return { geometry: g, material: m, streaks };
  }, [count]);

  useFrame((_, dt) => {
    const line = ref.current;
    if (!line) return;
    // Faint in the hero, full once the shop starts lighting up, and through the finale
    const level = sceneState.reducedMotion ? 0 : 0.35 + 0.65 * Math.min(1, Math.max(sceneState.heroLit * 2, sceneState.streetLit));
    line.material.uniforms.uLevel.value = level * (1 - sceneState.dim * 0.7);
    if (level === 0) return;

    const pos = line.geometry.getAttribute("position") as Float32BufferAttribute;
    const arr = pos.array as Float32Array;
    const span = START_Z - END_Z;
    const step = Math.min(dt, 0.1);
    streaks.forEach((st, i) => {
      st.s += st.speed * step;
      const limit = st.toShop ? START_Z - DOOR_Z + (FACADE + 0.5 - st.lane) + st.len : span;
      if (st.s > limit) st.s = 0;
      pointAt(st, Math.max(0, st.s - st.len), tail);
      pointAt(st, st.s, head);
      arr.set([tail.x, tail.y, tail.z, head.x, head.y, head.z], i * 6);
    });
    pos.needsUpdate = true;
  });

  return <lineSegments ref={ref} geometry={geometry} material={material} frustumCulled={false} />;
}
