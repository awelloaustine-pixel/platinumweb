"use client";

import { useMemo } from "react";
import { buildSkyline, SKYLINE_LIFT } from "./geometry";
import { createLineMaterial, palette } from "./lineMaterial";

// Far Bristol silhouettes: tower blocks, Cabot Tower, a suspension bridge.
export function Skyline({ detail }: { detail: "high" | "low" }) {
  const { geometry, material } = useMemo(
    () => ({
      geometry: buildSkyline(detail),
      material: createLineMaterial({ opacity: 0.16, color: palette.slate, fogNear: 400, fogFar: 600 }),
    }),
    [detail],
  );

  // Raised so the skyline reads above the street's vanishing point, as if on the hills
  return (
    <lineSegments geometry={geometry} material={material} position-y={SKYLINE_LIFT} frustumCulled={false} />
  );
}
