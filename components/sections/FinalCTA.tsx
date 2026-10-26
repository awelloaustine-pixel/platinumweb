import { finalCta, site } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { SplitWords } from "@/components/ui/SplitWords";

export function FinalCTA() {
  return (
    <section
      id="contact"
      data-scene="cta"
      aria-labelledby="cta-h"
      className="relative flex min-h-svh flex-col items-center justify-center px-4 py-28 text-center sm:px-8"
    >
      {/* Soft dark pool so the copy stays readable over the fully lit street */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_center,rgba(2,6,23,0.85),transparent)]"
      />
      <p data-reveal className="relative mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-accent">{finalCta.eyebrow}</p>
      <h2
        id="cta-h"
        data-split
        className="relative max-w-5xl font-serif text-[clamp(2.75rem,8vw,7.5rem)] font-light leading-[0.95] tracking-tight"
      >
        <SplitWords text={finalCta.heading} accent={finalCta.accentWord} />
      </h2>
      <p data-fill className="relative mt-8 max-w-xl text-base leading-relaxed text-muted-light sm:text-lg">
        <SplitWords text={finalCta.body} />
      </p>
      <Button data-reveal href={finalCta.cta.href} className="relative mt-12 px-8 py-4 text-sm">
        {finalCta.cta.label}
      </Button>
      <a
        href={site.phoneHref}
        className="relative mt-6 font-mono text-sm tracking-widest text-muted-light transition-colors hover:text-accent"
      >
        or call {site.phone}
      </a>
    </section>
  );
}
