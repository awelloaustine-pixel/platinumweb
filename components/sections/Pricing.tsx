import { BOOKING_URL, pricing } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/Heading";

export function Pricing() {
  return (
    <section id="pricing" data-scene="pricing" aria-labelledby="pricing-h" className="px-4 py-28 sm:px-8 sm:py-40">
      <div className="mx-auto max-w-[1600px]">
        <SectionHeading id="pricing-h" eyebrow={pricing.eyebrow} heading={pricing.heading} accentWord="No Surprises." />

        <ul className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {pricing.packages.map((p) => {
            const popular = p.name === pricing.popular;
            return (
              <li
                key={p.name}
                data-tilt
                data-reveal
                className={`relative flex flex-col rounded-2xl border p-7 sm:p-8 ${
                  popular
                    ? "border-accent/60 bg-[linear-gradient(180deg,rgba(212,175,55,0.10),rgba(15,23,41,0.9)_40%)] shadow-[0_30px_100px_-30px_rgba(212,175,55,0.35)]"
                    : "border-border bg-card/85"
                }`}
              >
                {popular && (
                  <span className="absolute -top-3 left-7 rounded-full bg-accent px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-bg">
                    Most Popular
                  </span>
                )}
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-light">{p.badge}</p>
                <h3 className="mt-3 font-serif text-3xl font-light text-text">{p.name}</h3>

                <p className="mt-6 flex items-baseline gap-2">
                  <span className="font-serif text-5xl font-light text-text">{p.setup}</span>
                  <span className="text-sm text-muted-light">setup</span>
                </p>
                <p className="mt-1 text-sm text-muted-light">
                  + <span className="font-mono text-accent">{p.monthly}</span>/month
                </p>

                <ul className="mt-8 flex-1 space-y-3 border-t border-border pt-6">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-3 text-sm leading-relaxed text-text/85">
                      <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Button
                  href={BOOKING_URL}
                  variant={popular ? "primary" : "ghost"}
                  className="mt-8 w-full"
                  aria-label={`Get started with ${p.name}`}
                >
                  {pricing.cta}
                </Button>
              </li>
            );
          })}
        </ul>

        <p data-reveal className="mt-10 max-w-xl text-muted-light">{pricing.footnote}</p>
      </div>
    </section>
  );
}
