import { type RefObject, useEffect } from "react";
import { notifySceneChange, onSceneChange, sceneState } from "@/lib/scroll";

const FADE_OUT_MS = 220;
const FADE_IN_MS = 380;

const nextFrame = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

/**
 * Reduced motion: instead of flying, the camera cuts between keyframes. This hides
 * each cut behind a short fade to --bg (no movement, so it stays motion-safe).
 *
 * Uses the Web Animations API rather than a CSS transition, because the global
 * :root.reduce-motion rule in globals.css zeroes every CSS transition.
 */
export function useShotFades(overlay: RefObject<HTMLDivElement | null>, active: boolean) {
  useEffect(() => {
    if (!active) return;
    sceneState.shot = Math.round(sceneState.cam);
    let fading = false;
    let disposed = false;

    const run = async () => {
      const el = overlay.current;
      if (!el || fading || disposed) return;
      if (Math.round(sceneState.cam) === sceneState.shot) return;
      fading = true;
      try {
        await el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: FADE_OUT_MS, easing: "ease-in", fill: "forwards" })
          .finished;
        // Commit whatever shot scroll has reached by now (fast scrolls skip straight there)
        sceneState.shot = Math.round(sceneState.cam);
        notifySceneChange(); // redraw (frameloop is "demand" under reduced motion)
        await nextFrame();
        await el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: FADE_IN_MS, easing: "ease-out", fill: "forwards" })
          .finished;
      } catch {
        // animation cancelled (unmount): nothing to do
      } finally {
        fading = false;
      }
      run(); // scroll may have moved on during the fade
    };

    const off = onSceneChange(() => void run());
    return () => {
      disposed = true;
      off();
    };
  }, [overlay, active]);
}
