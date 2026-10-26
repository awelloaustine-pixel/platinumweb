import { Fragment } from "react";

type Props = {
  text: string;
  /** Phrase within `text` to colour gold */
  accent?: string;
  /** Offset for the --i stagger index (lets several lines share one sequence) */
  startIndex?: number;
};

// Renders each word as <span.split-w><span.split-i>word</span></span>, separated by
// real spaces, so the text reads (and indexes) normally while each word can rise
// out of its own mask. Rendered on the server: no layout shift, no JS needed.
export function SplitWords({ text, accent, startIndex = 0 }: Props) {
  const accentStart = accent ? text.indexOf(accent) : -1;
  const accentEnd = accentStart >= 0 && accent ? accentStart + accent.length : -1;

  let offset = 0;
  const words = text.split(" ");
  return words.map((word, i) => {
    const start = offset;
    offset += word.length + 1;
    const isAccent = accentStart >= 0 && start < accentEnd && start + word.length > accentStart;
    return (
      <Fragment key={i}>
        <span className="split-w">
          <span
            className={`split-i${isAccent ? " text-accent" : ""}`}
            style={{ "--i": startIndex + i } as React.CSSProperties}
          >
            {word}
          </span>
        </span>
        {i < words.length - 1 ? " " : null}
      </Fragment>
    );
  });
}
