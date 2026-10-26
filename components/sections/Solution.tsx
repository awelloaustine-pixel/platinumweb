import { solution } from "@/lib/content";
import { Index, SectionHeading } from "@/components/ui/Heading";

export function Solution() {
  return (
    <section id="services" data-scene="solution" aria-labelledby="solution-h" className="px-4 py-28 sm:px-8 sm:py-40">
      <div className="mx-auto max-w-[1600px]">
        <SectionHeading
          id="solution-h"
          eyebrow={solution.eyebrow}
          heading={solution.heading}
          accentWord={solution.accentWord}
        />

        <div className="mt-20 grid gap-16 lg:grid-cols-[1.5fr_1fr] lg:gap-24">
          <ol className="space-y-px">
            {solution.phases.map((p, i) => (
              <li
                key={p.key}
                data-phase={p.key}
                data-reveal
                className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-border py-10 sm:grid-cols-[3rem_12rem_1fr] sm:gap-8"
              >
                <Index n={i + 1} />
                <div>
                  <p className="font-serif text-4xl font-light text-text sm:text-5xl">{p.label}</p>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.25em] text-accent">{p.when}</p>
                </div>
                <div className="col-start-2 sm:col-start-3">
                  <h3 className="text-lg font-medium text-text">{p.title}</h3>
                  <p className="mt-3 max-w-md leading-relaxed text-muted-light">{p.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <ul aria-label="Recent results" className="flex flex-col gap-4 self-center">
            {solution.notifications.map((n, i) => (
              <li
                key={n.title}
                data-reveal="right"
                className="flex items-start gap-4 rounded-2xl border border-border bg-card/80 p-5"
                style={{ marginLeft: `${i * 1.5}rem` }}
              >
                <span
                  aria-hidden
                  className="mt-1.5 h-2 w-2 shrink-0 animate-[pulse-dot_2.2s_ease-out_infinite] rounded-full bg-accent"
                  style={{ animationDelay: `${i * 0.5}s` }}
                />
                <span>
                  <span className="block font-mono text-[11px] uppercase tracking-[0.25em] text-accent">{n.title}</span>
                  <span className="mt-1 block text-text">{n.body}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
