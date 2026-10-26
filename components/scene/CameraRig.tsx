"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { type PerspectiveCamera, Vector3 } from "three";
import { sceneState } from "@/lib/scroll";
import { LAST_KEY, posCurve, targetCurve } from "./cameraPath";

// Scratch vectors reused every frame
const goal = new Vector3();
const target = new Vector3();

/**
 * Follows the keyframe path as sceneState.cam moves 0 → 6 with scroll.
 * Adds idle drift and mouse parallax on top; with reduced motion it snaps to the
 * nearest keyframe (a static framed shot per section) and skips the flight.
 */
export function CameraRig({ parallax }: { parallax: boolean }) {
  const get = useThree((s) => s.get);
  const size = useThree((s) => s.size);
  const pos = useRef(posCurve.getPoint(0));
  const look = useRef(targetCurve.getPoint(0));

  // Portrait screens see much less sideways: widen the lens so framed shots still fit.
  useEffect(() => {
    const camera = get().camera as PerspectiveCamera;
    camera.fov = size.width < size.height ? 62 : 45;
    camera.updateProjectionMatrix();
    // Dev-only handle for inspecting the renderer/camera from the console
    if (process.env.NODE_ENV !== "production") Object.assign(window, { __three: get });
  }, [get, size.width, size.height]);

  useFrame(({ clock, camera }, dt) => {
    const still = sceneState.reducedMotion;
    // Reduced motion: hold the committed shot; it only changes behind a fade
    const cam = still ? sceneState.shot : sceneState.cam;
    const t = Math.min(1, Math.max(0, cam / LAST_KEY));

    posCurve.getPoint(t, goal);
    targetCurve.getPoint(t, target);

    if (!still) {
      const time = clock.elapsedTime;
      // Gentle sway inside the workspace, fading out as the camera pulls away
      const inRoom = Math.max(0, 1 - Math.abs(cam - 5));
      const a = sceneState.orbit * 0.9 - 0.45;
      goal.x += Math.sin(a) * 1.2 * inRoom;
      goal.z += (Math.cos(a) - 1) * 1.2 * inRoom;

      goal.x += Math.sin(time * 0.12) * 0.3;
      goal.y += Math.sin(time * 0.09) * 0.12;
      if (parallax) {
        // Less parallax up close so the camera never clips through the shop window
        const strength = cam > 3.5 && cam < 5.5 ? 0.15 : 1;
        goal.x += sceneState.mouse.x * 0.8 * strength;
        goal.y += sceneState.mouse.y * 0.35 * strength;
        target.x += sceneState.mouse.x * 1.2 * strength;
      }
    }

    if (still) {
      pos.current.copy(goal);
      look.current.copy(target);
    } else {
      const k = 1 - Math.exp(-dt * 4);
      pos.current.lerp(goal, k);
      look.current.lerp(target, k);
    }

    camera.position.copy(pos.current);
    camera.lookAt(look.current);
  });

  return null;
}
