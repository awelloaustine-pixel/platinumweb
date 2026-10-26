import { process } from "@/lib/content";
import { Index, SectionHeading } from "@/components/ui/Heading";

export function Process() {
  return (
    <section id="how-it-works" data-scene="process" aria-labelledby="process-h" className="px-4 py-28 sm:px-8 sm:py-40">
      <div className="mx-auto max-w-[1600px]">
        <SectionHeading id="process-h" eyebrow={process.eyebrow} heading={process.heading} accentWord="5 Days." />

        <ol className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
          {process.steps.map((s, i) => (
            <li key={s.title} data-reveal className="flex flex-col gap-6 bg-bg/90 p-8 sm:p-10">
              <Index n={i + 1} />
              <h3 className="font-serif text-3xl font-light text-text sm:text-4xl">{s.title}</h3>
              <p className="leading-relaxed text-muted-light">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
