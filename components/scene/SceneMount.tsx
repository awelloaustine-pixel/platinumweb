"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { Component, type ReactNode, useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";
import { sceneState, type Quality } from "@/lib/scroll";

// three.js is only downloaded once this mounts on the client, after first paint.
const SceneCanvas = dynamic(() => import("./SceneCanvas"), { ssr: false });

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Very constrained devices get the static image instead of the live scene */
function isLowPower() {
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  return (
    (nav.hardwareConcurrency ?? 8) <= 2 || (nav.deviceMemory ?? 8) <= 2 || nav.connection?.saveData === true
  );
}

function detectQuality(): Quality {
  const small = window.matchMedia("(max-width: 767px)").matches;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  return small || coarse ? "low" : "high";
}

/** If the 3D scene throws (e.g. WebGL context creation fails), fall back to the static image */
class SceneErrorBoundary extends Component<{ onError: () => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

type Mode = { kind: "3d"; quality: Quality; reduced: boolean } | { kind: "static" };

// Fixed, full-screen layer behind the page content. The HTML hero is visible
// immediately; the canvas (or the static wireframe fallback) fades in after.
export function SceneMount() {
  const [mode, setMode] = useState<Mode | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduced = prefersReducedMotion();
    sceneState.reducedMotion = reduced;
    // Dev only: ?static forces the fallback image for testing
    const forceStatic =
      process.env.NODE_ENV !== "production" && new URLSearchParams(window.location.search).has("static");
    const next: Mode =
      hasWebGL() && !isLowPower() && !forceStatic
        ? { kind: "3d", quality: detectQuality(), reduced }
        : { kind: "static" };
    if (next.kind === "3d") sceneState.quality = next.quality;
    // Dev-only handle for tuning the scene from the console
    if (process.env.NODE_ENV !== "production") Object.assign(window, { __scene: sceneState });

    const start = () => setMode(next);

    // Phones / touch (low quality): three.js costs seconds of main-thread time on a
    // mid-range phone, so don't start it during page load at all. Wait for the first
    // sign of engagement (scroll, touch, key); until then the gradient poster shows.
    if (next.kind === "3d" && next.quality === "low") {
      const events = ["scroll", "touchstart", "pointerdown", "keydown"] as const;
      const onEngage = () => {
        events.forEach((e) => window.removeEventListener(e, onEngage));
        start();
      };
      events.forEach((e) => window.addEventListener(e, onEngage, { passive: true, once: true }));
      return () => events.forEach((e) => window.removeEventListener(e, onEngage));
    }

    // Desktop: after the page has fully loaded and the browser is idle, so the 3D
    // never competes with first paint or hydration.
    // requestIdleCallback is typed as always present, but Safari still lacks it
    const win = window as Window & Partial<Pick<Window, "requestIdleCallback" | "cancelIdleCallback">>;
    let idleId = 0;
    const onLoad = () => {
      idleId = win.requestIdleCallback
        ? win.requestIdleCallback(start, { timeout: 2000 })
        : win.setTimeout(start, 300);
    };
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });
    return () => {
      window.removeEventListener("load", onLoad);
      win.cancelIdleCallback?.(idleId);
      win.clearTimeout(idleId);
    };
  }, []);

  return (
    <div
      aria-hidden
      data-scene-mode={mode?.kind}
      className={`pointer-events-none fixed inset-0 z-0 transition-opacity duration-[1500ms] ${ready ? "opacity-100" : "opacity-0"}`}
    >
      {mode?.kind === "3d" && (
        <SceneErrorBoundary onError={() => setMode({ kind: "static" })}>
          <SceneCanvas quality={mode.quality} reduced={mode.reduced} onReady={() => setReady(true)} />
        </SceneErrorBoundary>
      )}
      {mode?.kind === "static" && (
        <Image
          src="/street-fallback.svg"
          alt=""
          fill
          unoptimized
          sizes="100vw"
          className="object-cover"
          onLoad={() => setReady(true)}
        />
      )}
      {/* Vignette keeps copy readable: darker edges + bottom, scene shows through the middle */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,transparent_30%,rgba(2,6,23,0.75)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-bg/85 to-transparent" />
      {/* Copy sits in the left column on wide screens: keep that side calmer */}
      <div className="absolute inset-y-0 left-0 hidden w-3/5 bg-gradient-to-r from-bg/80 via-bg/45 to-transparent md:block" />
    </div>
  );
}
