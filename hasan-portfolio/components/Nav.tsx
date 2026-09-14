"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/#projects", label: "Projects" },
  { href: "/#journey", label: "Journey" },
  { href: "/blog", label: "Writing" },
  { href: "/#ai", label: "Ask Hasan AI" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 ${
        scrolled ? "bg-bg/85 backdrop-blur border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="container-px mx-auto max-w-7xl flex items-center justify-between h-16">
        <Link href="/#top" className="font-display font-semibold tracking-tight text-ink">
          Hasan Khesro
        </Link>
        <div className="hidden items-center gap-8 text-sm text-muted md:flex">
          {links.map((l) =>
            l.href.startsWith("/") ? (
              <Link key={l.href} href={l.href} className="transition-colors hover:text-ink">
                {l.label}
              </Link>
            ) : (
              <a key={l.href} href={l.href} className="transition-colors hover:text-ink">
                {l.label}
              </a>
            )
          )}
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/HasanKhesro-CV.pdf"
            className="hidden rounded-full border border-emerald/40 px-4 py-2 text-sm font-medium text-emerald transition-colors hover:bg-emerald hover:text-[#04120d] md:block"
          >
            Download CV
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="rounded-full border border-border p-2 text-muted transition-colors hover:text-ink md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>
      {menuOpen && (
        <div id="mobile-navigation" className="border-t border-border bg-bg/95 px-5 py-5 backdrop-blur md:hidden">
          <div className="container-px mx-auto flex max-w-7xl flex-col gap-1 px-0 text-sm">
            {links.map((l) =>
              l.href.startsWith("/") ? (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={closeMenu}
                  className="rounded-lg px-3 py-3 text-muted transition-colors hover:bg-surface hover:text-ink"
                >
                  {l.label}
                </Link>
              ) : (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={closeMenu}
                  className="rounded-lg px-3 py-3 text-muted transition-colors hover:bg-surface hover:text-ink"
                >
                  {l.label}
                </a>
              )
            )}
            <a
              href="/HasanKhesro-CV.pdf"
              onClick={closeMenu}
              className="mt-2 rounded-lg border border-emerald/40 px-3 py-3 font-medium text-emerald"
            >
              Download CV
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
