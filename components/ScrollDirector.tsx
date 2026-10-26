"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";
import Lenis from "lenis";
import { notifySceneChange, SECTION_KEYS, sceneState } from "@/lib/scroll";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Wires scroll to everything that moves:
 *  - Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in sync
 *  - Section triggers that move the camera along its keyframe path (sceneState.cam)
 *  - Scene beats: shop light-up per solution phase, dimming behind dense sections,
 *    the whole street lighting up for the final CTA
 *  - Fade/rise reveals for [data-reveal] content
 * Renders nothing.
 */
export function ScrollDirector() {
  useGSAP(() => {
    const reduced = prefersReducedMotion();
    sceneState.reducedMotion = reduced;

    // --- Smooth scroll -------------------------------------------------------
    let lenis: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;
    if (!reduced) {
      lenis = new Lenis({ autoRaf: false, lerp: 0.1, anchors: true });
      lenis.on("scroll", ScrollTrigger.update);
      tick = (time) => lenis!.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    // --- Camera path ---------------------------------------------------------
    // Each section moves the camera from the previous keyframe to its own as it
    // scrolls in. The steps telescope, so summing step × progress gives one value
    // that starts at 0, only ever increases with scroll, and stays continuous even
    // where two sections' trigger ranges overlap.
    const camTriggers: { from: number; to: number; st: ScrollTrigger }[] = [];
    const updateCam = () => {
      let cam = 0;
      for (const { from, to, st } of camTriggers) cam += (to - from) * st.progress;
      sceneState.cam = cam;
      notifySceneChange();
    };
    let prevKey = 0;
    document.querySelectorAll<HTMLElement>("[data-scene]").forEach((el) => {
      const key = SECTION_KEYS[el.dataset.scene ?? ""];
      if (key === undefined) return;
      const from = prevKey;
      prevKey = key;
      if (key === from) return; // same shot as the previous section: hold
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 95%",
        end: "top 20%",
        onUpdate: updateCam,
        onRefresh: updateCam,
      });
      camTriggers.push({ from, to: key, st });
    });

    // --- Scene beats -----------------------------------------------------------
    ScrollTrigger.create({
      trigger: "main",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (st) => (sceneState.progress = st.progress),
    });

    // Shop lights up a third at a time as Build → Automate → Compound pass
    // (Triggers call back during create(), so the array must exist first.)
    const phases = gsap.utils.toArray<HTMLElement>("[data-phase]");
    const phaseTriggers: ScrollTrigger[] = [];
    const updateLit = () => {
      let lit = 0;
      for (const st of phaseTriggers) lit += st.progress / phases.length;
      sceneState.heroLit = lit;
      notifySceneChange();
    };
    phases.forEach((el) =>
      phaseTriggers.push(
        ScrollTrigger.create({ trigger: el, start: "top 80%", end: "top 40%", onUpdate: updateLit, onRefresh: updateLit }),
      ),
    );

    // Dim behind pricing → FAQ, slow orbit inside the workspace
    // (Callbacks can fire during create(), before both triggers exist — hence `?.`)
    const dim: { in?: ScrollTrigger; out?: ScrollTrigger } = {};
    const updateDim = () => {
      sceneState.dim = (dim.in?.progress ?? 0) * (1 - (dim.out?.progress ?? 0));
      notifySceneChange();
    };
    dim.in = ScrollTrigger.create({ trigger: "[data-scene=pricing]", start: "top 90%", end: "top 30%", onUpdate: updateDim, onRefresh: updateDim });
    dim.out = ScrollTrigger.create({ trigger: "[data-scene=cta]", start: "top bottom", end: "top 40%", onUpdate: updateDim, onRefresh: updateDim });
    ScrollTrigger.create({
      trigger: "[data-scene=pricing]",
      start: "top center",
      endTrigger: "[data-scene=faq]",
      end: "bottom center",
      onUpdate: (st) => (sceneState.orbit = st.progress),
    });

    // Every building comes online as the final CTA arrives
    ScrollTrigger.create({
      trigger: "[data-scene=cta]",
      start: "top 70%",
      end: "center center",
      onUpdate: (st) => {
        sceneState.streetLit = st.progress;
        notifySceneChange();
      },
    });

    // --- Reveals ---------------------------------------------------------------
    // Content is visible by default (no-JS, crawlers); only hidden here, just before
    // it animates in. Reduced motion: leave it static.
    if (!reduced) {
      // data-reveal="right" slides in from the right (notification cards); default rises.
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      const fromRight = (_: number, el: HTMLElement) => el.dataset.reveal === "right";
      gsap.set(items, {
        autoAlpha: 0,
        x: (i: number, el: HTMLElement) => (fromRight(i, el) ? 60 : 0),
        y: (i: number, el: HTMLElement) => (fromRight(i, el) ? 0 : 40),
      });
      ScrollTrigger.batch(items, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { autoAlpha: 1, x: 0, y: 0, duration: 1.1, ease: "power3.out", stagger: 0.12, overwrite: "auto" }),
      });
    }

    ScrollTrigger.refresh();
    updateCam();
    // Dev-only handle for inspecting triggers from the console
    if (process.env.NODE_ENV !== "production") Object.assign(window, { __st: ScrollTrigger });

    return () => {
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
    };
  });

  return null;
}
