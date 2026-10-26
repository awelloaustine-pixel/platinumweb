"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * DOM-side effects layered on the server-rendered markup. Everything starts in its
 * final, readable state; effects only alter it once JS is running, and none run
 * under prefers-reduced-motion.
 *  - [data-split]  headings: words rise out of their masks
 *  - [data-fill]   paragraphs: words fill grey → white with scroll
 *  - [data-count]  stats: count up from 0
 *  - [data-tilt]   cards: 3D tilt toward the pointer (mouse only)
 */
export function Effects() {
  useGSAP(() => {
    if (prefersReducedMotion()) return;

    // Split-word headings
    gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
      const words = el.querySelectorAll(".split-i");
      gsap.set(words, { yPercent: 110 });
      ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: () => gsap.to(words, { yPercent: 0, duration: 1.2, ease: "power4.out", stagger: 0.06 }),
      });
    });

    // Grey → white word fill, scrubbed. Starts at --muted-light (already AA on --bg),
    // so contrast never drops below the static design.
    gsap.utils.toArray<HTMLElement>("[data-fill]").forEach((el) => {
      gsap.fromTo(
        el.querySelectorAll(".split-i"),
        { color: "#94a3b8" },
        {
          color: "#f8fafc",
          ease: "none",
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top 85%", end: "bottom 50%", scrub: true },
        },
      );
    });

    // Stat counters (SSR shows the final number; we only reset it once JS runs)
    gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
      const target = Number(el.dataset.count);
      if (!target) return;
      const counter = { v: 0 };
      el.textContent = "0";
      ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        once: true,
        onEnter: () =>
          gsap.to(counter, {
            v: target,
            duration: 1.6,
            ease: "power2.out",
            onUpdate: () => (el.textContent = String(Math.round(counter.v))),
          }),
      });
    });

    // Pricing card tilt (fine pointers only)
    const cleanups: (() => void)[] = [];
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      gsap.utils.toArray<HTMLElement>("[data-tilt]").forEach((card) => {
        gsap.set(card, { transformPerspective: 1000 });
        const rx = gsap.quickTo(card, "rotationX", { duration: 0.6, ease: "power3.out" });
        const ry = gsap.quickTo(card, "rotationY", { duration: 0.6, ease: "power3.out" });
        const onMove = (e: PointerEvent) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          rx(-py * 8);
          ry(px * 10);
        };
        const onLeave = () => {
          rx(0);
          ry(0);
        };
        card.addEventListener("pointermove", onMove);
        card.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          card.removeEventListener("pointermove", onMove);
          card.removeEventListener("pointerleave", onLeave);
        });
      });
    }
    return () => cleanups.forEach((fn) => fn());
  });

  return null;
}
