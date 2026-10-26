import { hero } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { ScrollCue } from "@/components/ui/ScrollCue";
import { SplitWords } from "@/components/ui/SplitWords";

export function Hero() {
  const [line1, line2] = hero.headline;
  const line1Words = line1.split(" ").length;

  return (
    <section
      id="top"
      data-scene="hero"
      className="relative flex min-h-svh flex-col justify-end overflow-hidden px-4 pb-28 pt-32 sm:px-8 sm:pb-32"
    >
      {/* Poster glow: shows instantly and stays as a soft wash over the 3D canvas */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(212,175,55,0.08),transparent_55%),radial-gradient(ellipse_at_10%_90%,rgba(245,158,11,0.05),transparent_50%)]"
      />
      <div className="relative mx-auto w-full max-w-[1600px]">
        <p
          className="hero-fade mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-light"
          style={{ "--d": "100ms" } as React.CSSProperties}
        >
          {hero.eyebrow}
        </p>
        {/* Words rise line by line on first paint (CSS only, see .hero-rise) */}
        <h1 className="hero-rise font-serif text-[clamp(3.5rem,13vw,12rem)] font-light uppercase leading-[0.85] tracking-tight">
          <span className="block">
            <SplitWords text={line1} />
          </span>
          <span className="block text-accent">
            <SplitWords text={line2} startIndex={line1Words + 1} />
          </span>
        </h1>
        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p
            className="hero-fade max-w-md text-base leading-relaxed text-muted-light sm:text-lg"
            style={{ "--d": "700ms" } as React.CSSProperties}
          >
            {hero.subtext}
          </p>
          <div className="hero-fade flex flex-wrap gap-3" style={{ "--d": "850ms" } as React.CSSProperties}>
            <Button href={hero.primaryCta.href} variant="ghost">
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href}>{hero.secondaryCta.label}</Button>
          </div>
        </div>
      </div>
      <ScrollCue label={hero.scrollCue} />
    </section>
  );
}
