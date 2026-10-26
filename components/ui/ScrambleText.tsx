"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*+=/<>";

type Props = { text: string; className?: string; duration?: number };

/**
 * Renders `text`, and the first time it scrolls into view, scrambles through random
 * glyphs before resolving left to right. Server-renders the real word (no flash, fully
 * readable without JS); skipped when reduced motion is honoured (lib/motion.ts).
 */
export function ScrambleText({ text, className, duration = 1100 }: Props) {
  const [display, setDisplay] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    let raf = 0;
    const run = () => {
      const t0 = performance.now();
      const frame = (now: number) => {
        const p = Math.min(1, (now - t0) / duration);
        // Each letter locks in at its own moment, sweeping left → right
        const out = [...text]
          .map((ch, i) => {
            if (ch === " " || p >= 0.25 + (i / text.length) * 0.75) return ch;
            const g = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            return ch === ch.toLowerCase() ? g.toLowerCase() : g;
          })
          .join("");
        setDisplay(out);
        if (p < 1) raf = requestAnimationFrame(frame);
      };
      raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          io.disconnect();
          run();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [text, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
