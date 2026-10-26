"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useEffect, useState } from "react";
import { onSceneChange, sceneState, type Quality } from "@/lib/scroll";
import { CameraRig } from "./CameraRig";
import { HeroBuilding } from "./HeroBuilding";
import { LightStreaks } from "./LightStreaks";
import { Skyline } from "./Skyline";
import { Street } from "./Street";

type Props = { quality: Quality; reduced: boolean; onReady: () => void };

/** With frameloop="demand", redraw only when scroll changes the scene */
function RedrawOnSceneChange() {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => onSceneChange(() => invalidate()), [invalidate]);
  return null;
}

export default function SceneCanvas({ quality, reduced, onReady }: Props) {
  const high = quality === "high";
  const [visible, setVisible] = useState(true);

  // Pointer → normalised mouse for parallax (desktop only)
  useEffect(() => {
    if (!high || reduced) return;
    const onMove = (e: PointerEvent) => {
      sceneState.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      sceneState.mouse.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [high, reduced]);

  // Stop rendering entirely while the tab is hidden
  useEffect(() => {
    const onVis = () => setVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // Reduced motion: nothing animates on its own, so only render when scroll changes the shot
  const frameloop = !visible ? "never" : reduced ? "demand" : "always";

  return (
    <Canvas
      dpr={high ? [1, 1.5] : [1, 1.25]}
      frameloop={frameloop}
      camera={{ fov: 45, near: 0.1, far: 800, position: [0, 6, 30] }}
      gl={{ antialias: !high, powerPreference: "high-performance", alpha: false }}
      onCreated={() => onReady()}
    >
      <color attach="background" args={["#020617"]} />
      <Street length={high ? 160 : 90} />
      <HeroBuilding />
      {!reduced && <LightStreaks count={high ? 28 : 14} />}
      <Skyline detail={high ? "high" : "low"} />
      <CameraRig parallax={high && !reduced} />
      {reduced && <RedrawOnSceneChange />}
      {high && (
        <EffectComposer multisampling={4}>
          {/* Threshold sits above the faint white edges, so only gold blooms */}
          <Bloom mipmapBlur luminanceThreshold={0.45} luminanceSmoothing={0.15} intensity={0.85} radius={0.6} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
