import { cacheLife } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { footer, site } from "@/lib/content";

// Cached so the page stays fully static (Cache Components forbids raw `new Date()`
// in prerender); the year refreshes on the next build/revalidation.
async function getYear() {
  "use cache";
  cacheLife("max"); // revalidate ~monthly instead of the 15-minute default
  return new Date().getFullYear();
}

/** `base` prefixes the in-page section links, e.g. "/" when rendered on /privacy */
export async function Footer({ base = "" }: { base?: string }) {
  const year = await getYear();
  return (
    <footer className="border-t border-border bg-surface/90 px-4 pb-10 pt-20 sm:px-8">
      <div className="mx-auto grid max-w-[1600px] gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
        <div>
          <div className="flex items-center gap-3">
            <Image src={site.emblem} alt="" width={48} height={48} className="h-12 w-12" />
            <p className="font-serif text-2xl leading-tight">
              Platinum
              <span className="block font-mono text-[10px] uppercase tracking-[0.3em] text-muted-light">
                Marketing Agency
              </span>
            </p>
          </div>
          <p className="mt-8 font-serif text-3xl font-light">{footer.tagline}</p>
        </div>

        {[footer.services, footer.company].map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">{col.title}</h2>
            <ul className="mt-5 space-y-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  <a href={`${base}${l.href}`} className="text-muted-light transition-colors hover:text-text">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <h2 className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">Contact</h2>
          <address className="mt-5 space-y-3 not-italic text-muted-light">
            <a href={site.phoneHref} className="block transition-colors hover:text-text">
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="block [overflow-wrap:anywhere] transition-colors hover:text-text">
              {site.email}
            </a>
            <p>{site.location}</p>
          </address>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-[1600px] flex-col gap-4 border-t border-border pt-8 text-sm text-muted-light sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {site.name}
        </p>
        <ul className="flex gap-6">
          {footer.legal.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="transition-colors hover:text-text">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
