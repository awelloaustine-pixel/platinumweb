/**
 * Site-wide motion policy.
 *
 * false (current, owner's choice): every visitor gets the full experience: camera
 * fly-through, smooth scroll, reveals, streaks, even if their OS asks for reduced
 * motion.
 * true: honour the OS "reduce motion" setting. Static camera shots that change
 * behind a fade, no smooth scroll, reveals, scrambles or streaks.
 */
export const RESPECT_REDUCED_MOTION = false;

/** True when motion should be reduced (only ever true if RESPECT_REDUCED_MOTION is on). */
export function prefersReducedMotion() {
  if (typeof window === "undefined" || !RESPECT_REDUCED_MOTION) return false;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // Lets globals.css switch off CSS animations too (see :root.reduce-motion)
  document.documentElement.classList.toggle("reduce-motion", reduce);
  return reduce;
}
