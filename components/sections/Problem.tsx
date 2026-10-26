import { problem } from "@/lib/content";
import { Index, SectionHeading } from "@/components/ui/Heading";
import { SplitWords } from "@/components/ui/SplitWords";

export function Problem() {
  return (
    <section data-scene="problem" aria-labelledby="problem-h" className="px-4 py-28 sm:px-8 sm:py-40">
      <div className="mx-auto grid max-w-[1600px] gap-16 lg:grid-cols-[1.4fr_1fr] lg:gap-24">
        <div>
          <SectionHeading
            id="problem-h"
            eyebrow={problem.eyebrow}
            heading={problem.heading}
            accentWord={problem.accentWord}
          />
          <p data-fill className="mt-8 max-w-xl text-base leading-relaxed text-muted-light sm:text-lg">
            <SplitWords text={problem.body} />
          </p>

          <ul className="mt-14 divide-y divide-border border-y border-border">
            {problem.points.map((p, i) => (
              <li key={p.label} data-reveal className="grid grid-cols-[2.5rem_1fr] items-baseline gap-4 py-6 sm:grid-cols-[3rem_10rem_1fr]">
                <Index n={i + 1} />
                <span className="font-serif text-4xl font-light text-text sm:text-5xl">{p.value}</span>
                <span className="col-start-2 text-muted-light sm:col-start-3">{p.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <PhoneMissedCalls />
      </div>
    </section>
  );
}

function PhoneMissedCalls() {
  return (
    <figure data-reveal className="mx-auto w-full max-w-[300px] self-center" aria-label="Phone showing missed calls">
      <div className="rounded-[2.5rem] border border-text/20 bg-bg/70 p-3">
        <div className="rounded-[2rem] border border-text/10 px-4 pb-8 pt-4">
          <div className="mx-auto mb-6 h-1.5 w-16 rounded-full bg-text/15" />
          <p className="mb-1 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-muted-light">Today</p>
          <p className="mb-6 text-center font-serif text-5xl font-light">
            {problem.missedCalls.length}
            <span className="ml-2 align-middle font-mono text-xs uppercase tracking-widest text-accent">missed</span>
          </p>
          <ul className="space-y-2">
            {problem.missedCalls.map((c, i) => (
              <li key={i} className="flex items-center gap-3 rounded-xl border border-border bg-card/80 px-3 py-2.5">
                <span
                  aria-hidden
                  className="flex h-7 w-7 shrink-0 animate-[ring_2.4s_ease-in-out_infinite] items-center justify-center rounded-full border border-accent/40 text-accent"
                  style={{ animationDelay: `${i * 0.4}s` }}
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
                  </svg>
                </span>
                <span className="flex-1 text-sm text-text">
                  Missed call
                  <span className="block text-xs text-muted-light">{c.name}</span>
                </span>
                <span className="font-mono text-[10px] text-muted-light">{c.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </figure>
  );
}
