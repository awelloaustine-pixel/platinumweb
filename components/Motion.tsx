"use client";

import dynamic from "next/dynamic";

// GSAP, ScrollTrigger and Lenis load as their own chunk after hydration rather than
// in the critical path: everything they animate is below the fold, and the content
// is fully readable before they arrive.
const ScrollDirector = dynamic(() => import("./ScrollDirector").then((m) => m.ScrollDirector), { ssr: false });
const Effects = dynamic(() => import("./Effects").then((m) => m.Effects), { ssr: false });

export function Motion() {
  return (
    <>
      <ScrollDirector />
      <Effects />
    </>
  );
}
