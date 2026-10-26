import type { ElementType } from "react";
import { SplitWords } from "./SplitWords";

type Props = {
  eyebrow: string;
  heading: string;
  accentWord?: string;
  as?: ElementType;
  id?: string;
  className?: string;
};

// Eyebrow fades in; the heading rises word by word ([data-split], see TextEffects).
export function SectionHeading({ eyebrow, heading, accentWord, as: Tag = "h2", id, className = "" }: Props) {
  return (
    <div className={className}>
      <p data-reveal className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
        <span aria-hidden className="h-px w-8 bg-accent/60" />
        {eyebrow}
      </p>
      <Tag
        id={id}
        data-split
        className="max-w-4xl font-serif text-4xl font-light leading-[1.05] tracking-tight text-text sm:text-5xl lg:text-7xl"
      >
        <SplitWords text={heading} accent={accentWord} />
      </Tag>
    </div>
  );
}

// Small "01" style index used beside list items.
export function Index({ n }: { n: number }) {
  return (
    <span className="font-mono text-xs tracking-widest text-muted-light">
      {String(n).padStart(2, "0")}
    </span>
  );
}
