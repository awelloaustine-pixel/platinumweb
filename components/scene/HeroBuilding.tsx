"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { BufferGeometry, LineSegments, ShaderMaterial } from "three";
import { sceneState } from "@/lib/scroll";
import { buildHeroShop } from "./geometry";
import { createLineMaterial } from "./lineMaterial";

// The client's shopfront. Starts dark ("invisible online") and lights up edge by
// edge from the ground floor to the rooftop mast as sceneState.heroLit goes 0 → 1.
export function HeroBuilding() {
  const { geometry, material } = useMemo(
    () => ({ geometry: buildHeroShop(), material: createLineMaterial({ opacity: 0.16 }) }),
    [],
  );

  const ref = useRef<LineSegments<BufferGeometry, ShaderMaterial>>(null);

  useFrame(() => {
    if (!ref.current) return;
    const u = ref.current.material.uniforms;
    u.uLit.value = Math.max(sceneState.heroLit, sceneState.streetLit > 0 ? 1 : 0);
    u.uDim.value = sceneState.dim * 0.5;
  });

  return <lineSegments ref={ref} geometry={geometry} material={material} frustumCulled={false} />;
}
