"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { BufferGeometry, LineSegments, ShaderMaterial } from "three";
import { sceneState } from "@/lib/scroll";
import { buildStreet } from "./geometry";
import { createLineMaterial } from "./lineMaterial";

// Terraces on the left, shopfronts on the right, road furniture and a van.
// Each side is merged into a single geometry (see geometry.ts).
export function Street({ length }: { length: number }) {
  const { geometry, material, floor, floorMat } = useMemo(() => {
    const { street, floor } = buildStreet(length);
    return {
      geometry: street,
      material: createLineMaterial({ opacity: 0.2, fogNear: 30, fogFar: 125 }),
      floor,
      floorMat: createLineMaterial({ opacity: 0.045, fogNear: 10, fogFar: 90 }),
    };
  }, [length]);

  const streetRef = useRef<LineSegments<BufferGeometry, ShaderMaterial>>(null);
  const floorRef = useRef<LineSegments<BufferGeometry, ShaderMaterial>>(null);

  useFrame(() => {
    if (!streetRef.current || !floorRef.current) return;
    streetRef.current.material.uniforms.uLit.value = sceneState.streetLit;
    streetRef.current.material.uniforms.uDim.value = sceneState.dim;
    floorRef.current.material.uniforms.uDim.value = sceneState.dim;
  });

  return (
    <>
      <lineSegments ref={streetRef} geometry={geometry} material={material} frustumCulled={false} />
      <lineSegments ref={floorRef} geometry={floor} material={floorMat} frustumCulled={false} />
    </>
  );
}
