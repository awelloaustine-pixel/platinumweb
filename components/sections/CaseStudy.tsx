import { caseStudy } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/Heading";

export function CaseStudy() {
  return (
    <section id="work" data-scene="case" aria-labelledby="case-h" className="px-4 py-28 sm:px-8 sm:py-40">
      <div className="mx-auto max-w-[1600px]">
        <SectionHeading id="case-h" eyebrow={caseStudy.eyebrow} heading={caseStudy.heading} />

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <BrowserFrame />

          <div data-reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-light">{caseStudy.meta}</p>
            <h3 className="mt-4 font-serif text-4xl font-light text-text sm:text-5xl">{caseStudy.client}</h3>
            <p className="mt-2 text-accent">{caseStudy.subtitle}</p>
            <p className="mt-6 max-w-md leading-relaxed text-muted-light">{caseStudy.body}</p>

            <dl className="mt-8 flex flex-wrap items-center gap-3">
              <dt className="sr-only">Delivered</dt>
              <dd className="rounded-full bg-accent/10 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                {caseStudy.built}
              </dd>
              <dt className="sr-only">Scope</dt>
              {caseStudy.tags.map((t) => (
                <dd
                  key={t}
                  className="rounded-full border border-text/15 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-light"
                >
                  {t}
                </dd>
              ))}
            </dl>

            <Button href={caseStudy.cta.href} className="mt-10">
              {caseStudy.cta.label} →
            </Button>
            <p className="mt-10 font-serif text-2xl text-muted-light">{caseStudy.outro}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Stylised browser window. TODO: swap the mock body for a real screenshot of the live site.
function BrowserFrame() {
  return (
    <div data-reveal className="overflow-hidden rounded-xl border border-text/15 bg-card/90 shadow-[0_40px_120px_-40px_rgba(212,175,55,0.25)]">
      <div className="flex items-center gap-2 border-b border-text/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-text/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-text/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-text/20" />
        <span className="ml-4 flex-1 truncate rounded-md bg-bg/80 px-3 py-1 font-mono text-[11px] text-muted-light">
          bristol-spark-electrical.vercel.app
        </span>
      </div>
      <div aria-hidden className="relative aspect-[16/10] bg-[linear-gradient(160deg,#0f1729,#020617)] p-6 sm:p-10">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-text/70">Bristol Spark</span>
          <span className="rounded-full bg-accent px-3 py-1 font-mono text-[9px] uppercase tracking-widest text-bg">
            Get a quote
          </span>
        </div>
        <p className="mt-[8%] max-w-[70%] font-serif text-2xl font-light leading-tight text-text sm:text-4xl">
          Bristol&apos;s trusted <span className="text-accent">NICEIC</span> electricians.
        </p>
        <div className="mt-6 flex gap-2">
          <span className="h-2 w-24 rounded bg-text/15" />
          <span className="h-2 w-16 rounded bg-text/10" />
        </div>
        <div className="absolute inset-x-6 bottom-6 grid grid-cols-3 gap-3 sm:inset-x-10 sm:bottom-10">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-14 rounded-lg border border-text/10 bg-text/[0.03] sm:h-20" />
          ))}
        </div>
      </div>
    </div>
  );
}
