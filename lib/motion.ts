/**
 * True when the visitor asked for reduced motion (OS setting).
 * Dev only: add `?motion` to the URL to force full motion for testing on a machine
 * that has animations turned off. Ignored in production builds.
 */
export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  if (process.env.NODE_ENV !== "production" && new URLSearchParams(window.location.search).has("motion")) {
    document.documentElement.classList.add("force-motion");
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
