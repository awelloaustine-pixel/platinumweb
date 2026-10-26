import { stats } from "@/lib/content";

export function Stats() {
  return (
    <section data-scene="stats" aria-label="Key numbers" className="border-y border-border bg-surface/60">
      <dl className="mx-auto grid max-w-[1600px] grid-cols-2 md:grid-cols-5">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`flex flex-col gap-2 border-border px-4 py-8 md:px-6 md:py-10 lg:px-8 ${
              i > 0 ? "md:border-l" : ""
            } ${i % 2 === 1 ? "max-md:border-l" : ""} ${i === 4 ? "max-md:col-span-2 max-md:border-t" : ""} ${
              i < 2 ? "max-md:border-b" : ""
            }`}
          >
            <dt className="order-2 text-sm text-muted-light">{s.label}</dt>
            <dd className="order-1 font-mono text-3xl font-light text-text md:text-[2rem] lg:text-4xl">
              {s.prefix}
              <span data-count={s.value}>{s.value}</span>
              <span className="text-accent">{s.suffix}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
