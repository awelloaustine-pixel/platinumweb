import type { ComponentProps } from "react";

type Variant = "primary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] transition-colors duration-300";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-bg hover:bg-accent2",
  ghost: "border border-text/20 text-text hover:border-accent hover:text-accent",
};

type Props = ComponentProps<"a"> & { variant?: Variant };

// External links (http…) open in a new tab.
export function Button({ variant = "primary", className = "", href = "#", ...rest }: Props) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={`${base} ${variants[variant]} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    />
  );
}
