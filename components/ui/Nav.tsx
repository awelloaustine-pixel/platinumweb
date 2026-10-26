"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/content";
import { Button } from "./Button";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open ? "border-b border-border bg-bg/80 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        className={`mx-auto flex max-w-[1600px] items-center justify-between px-4 transition-[padding] duration-500 sm:px-8 ${
          scrolled ? "py-3" : "py-4 sm:py-6"
        }`}
      >
        <a href="#top" className="flex items-center gap-3" aria-label={`${site.name} home`}>
          <Image src={site.emblem} alt="" width={36} height={36} priority className="h-9 w-9" />
          <span className="font-serif text-xl tracking-wide text-text">
            Platinum
            <span className="sr-only"> Marketing Agency</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-8">
            {nav.links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="font-mono text-xs uppercase tracking-[0.2em] text-muted-light transition-colors hover:text-text"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <Button href={nav.cta.href} className="px-5 py-2.5">
            {nav.cta.label}
          </Button>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-text/20 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span aria-hidden className="relative block h-3 w-5">
            <span
              className={`absolute left-0 h-px w-5 bg-text transition-transform ${open ? "top-1.5 rotate-45" : "top-0"}`}
            />
            <span
              className={`absolute left-0 h-px w-5 bg-text transition-transform ${open ? "top-1.5 -rotate-45" : "top-3"}`}
            />
          </span>
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-border bg-bg/95 px-4 pb-8 pt-4 backdrop-blur md:hidden">
          <ul className="flex flex-col gap-1">
            {nav.links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-serif text-3xl font-light text-text"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <Button href={nav.cta.href} className="mt-6 w-full">
            {nav.cta.label}
          </Button>
        </div>
      )}
    </header>
  );
}
