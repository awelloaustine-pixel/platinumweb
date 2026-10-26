import { whyUs } from "@/lib/content";
import { Index, SectionHeading } from "@/components/ui/Heading";
import { ScrambleText } from "@/components/ui/ScrambleText";

export function WhyUs() {
  return (
    <section data-scene="why" aria-labelledby="why-h" className="px-4 py-28 sm:px-8 sm:py-40">
      <div className="mx-auto max-w-[1600px]">
        <SectionHeading id="why-h" eyebrow={whyUs.eyebrow} heading={whyUs.heading} accentWord="Different." />

        <ul className="mt-16">
          {whyUs.items.map((item, i) => (
            <li
              key={item.word}
              data-reveal
              className="grid gap-4 border-t border-border py-10 md:grid-cols-[3rem_1fr_minmax(0,22rem)] md:items-end md:gap-8"
            >
              <Index n={i + 1} />
              <p aria-hidden className="font-serif text-[clamp(3rem,10vw,9rem)] font-light leading-none tracking-tight text-text">
                <ScrambleText text={item.word} />
              </p>
              <div>
                <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">{item.label}</h3>
                <p className="mt-3 leading-relaxed text-muted-light">{item.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
