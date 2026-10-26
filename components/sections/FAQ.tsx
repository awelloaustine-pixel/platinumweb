import { faq } from "@/lib/content";
import { Index, SectionHeading } from "@/components/ui/Heading";

// Native <details>: keyboard accessible and works without JS.
export function FAQ() {
  return (
    <section id="faq" data-scene="faq" aria-labelledby="faq-h" className="px-4 py-28 sm:px-8 sm:py-40">
      <div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
        <SectionHeading id="faq-h" eyebrow={faq.eyebrow} heading={faq.heading} className="lg:sticky lg:top-32 lg:self-start" />

        <div className="divide-y divide-border border-y border-border">
          {faq.items.map((item, i) => (
            <details key={item.q} data-reveal className="group">
              <summary className="flex cursor-pointer list-none items-center gap-5 py-6 [&::-webkit-details-marker]:hidden">
                <Index n={i + 1} />
                <span className="flex-1 text-lg text-text transition-colors group-hover:text-accent sm:text-xl">
                  {item.q}
                </span>
                <span
                  aria-hidden
                  className="relative h-4 w-4 shrink-0 before:absolute before:left-0 before:top-1/2 before:h-px before:w-4 before:bg-accent after:absolute after:left-1/2 after:top-0 after:h-4 after:w-px after:bg-accent after:transition-transform group-open:after:scale-y-0"
                />
              </summary>
              <p className="max-w-2xl pb-8 pl-11 leading-relaxed text-muted-light">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
