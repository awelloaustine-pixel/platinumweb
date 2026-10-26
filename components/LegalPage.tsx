import Image from "next/image";
import Link from "next/link";
import { nav, site } from "@/lib/content";
import type { LegalDoc } from "@/lib/legal";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/Button";

// Plain, fast layout for the privacy and terms pages: no 3D scene, no motion.
export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <header className="border-b border-border">
        <nav aria-label="Main" className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-4 sm:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label={`${site.name} home`}>
            <Image src={site.emblem} alt="" width={36} height={36} className="h-9 w-9" />
            <span className="font-serif text-xl tracking-wide text-text">Platinum</span>
          </Link>
          <Button href={nav.cta.href} className="px-4 py-2.5 sm:px-5" aria-label={nav.cta.label}>
            {/* Shorter label on phones so it sits beside the wordmark */}
            <span className="sm:hidden">Book Demo</span>
            <span className="hidden sm:inline">{nav.cta.label}</span>
          </Button>
        </nav>
      </header>

      <main id="main" className="px-4 py-20 sm:px-8 sm:py-28">
        <article className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-light transition-colors hover:text-accent"
          >
            ← Back to site
          </Link>
          <h1 className="mt-8 font-serif text-5xl font-light tracking-tight sm:text-6xl">{doc.title}</h1>
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-light">Last updated {doc.updated}</p>
          <p className="mt-10 text-lg leading-relaxed text-text/90">{doc.intro}</p>

          {doc.sections.map((s) => (
            <section key={s.heading} className="mt-12 border-t border-border pt-10">
              <h2 className="font-serif text-3xl font-light text-text">{s.heading}</h2>
              {s.body.map((p) => (
                <p key={p} className="mt-4 leading-relaxed text-muted-light">
                  {p}
                </p>
              ))}
              {s.list && (
                <ul className="mt-4 space-y-2">
                  {s.list.map((li) => (
                    <li key={li} className="flex gap-3 leading-relaxed text-muted-light">
                      <span aria-hidden className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {li}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </article>
      </main>

      <Footer base="/" />
    </>
  );
}
