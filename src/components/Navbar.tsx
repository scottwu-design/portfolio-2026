"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CONTAINER } from "@/lib/layout";

const NAV_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b border-white/10 transition-colors duration-300 ${
          scrolled ? "bg-navy/90 backdrop-blur-md" : "bg-navy"
        }`}
      >
        <div className={`${CONTAINER} flex items-center justify-between py-[30px]`}>
          <Link
            href="/"
            className="font-display text-base font-bold tracking-tight text-ink"
          >
            Scott Wu
          </Link>

          <nav className="hidden gap-10 text-[15px] text-ink/75 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative"
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-accent-light transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative z-50 flex h-6 w-6 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span
              className={`h-0.5 w-6 bg-ink transition-transform duration-300 ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-ink transition-opacity duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-ink transition-transform duration-300 ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Rendered as a sibling of <header>, not nested inside it — a
       * scrolled header's backdrop-blur makes it the containing block
       * for `fixed` descendants, which would collapse this overlay
       * down to the header's own box instead of the full viewport. */}
      <nav
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-navy/90 text-center text-3xl backdrop-blur-md transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {NAV_LINKS.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            style={{ transitionDelay: open ? `${150 + i * 80}ms` : "0ms" }}
            className={`font-display font-bold tracking-tight text-ink transition-all duration-500 ease-out hover:text-accent-light ${
              open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
