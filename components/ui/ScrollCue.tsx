export function ScrollCue({ label }: { label: string }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute bottom-8 right-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-light sm:right-8"
    >
      {label}
      <span className="relative block h-10 w-px overflow-hidden bg-text/15">
        <span className="absolute inset-x-0 top-0 h-1/2 animate-[cue_1.8s_ease-in-out_infinite] bg-accent" />
      </span>
    </div>
  );
}
