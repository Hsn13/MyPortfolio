"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Moon, Sun, X } from "lucide-react";

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
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window === "undefined") return "dark";
    const storedTheme = window.localStorage.getItem("theme");
    if (storedTheme === "dark" || storedTheme === "light") return storedTheme;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

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

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    window.localStorage.setItem("theme", nextTheme);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 ${
        scrolled ? "bg-bg/85 backdrop-blur border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="container-px mx-auto flex h-16 max-w-7xl items-center justify-between">
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
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="hidden rounded-full border border-border p-2 text-muted transition-colors hover:text-ink md:inline-flex"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a
            href="/HasanKhesro-CV.pdf"
            className="hidden rounded-full border border-emerald/40 px-4 py-2 text-sm font-medium text-emerald transition-colors hover:bg-emerald hover:text-[#201515] md:block"
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
            <div className="mt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  toggleTheme();
                  closeMenu();
                }}
                className="flex items-center gap-2 rounded-lg border border-border px-3 py-3 text-left text-muted"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                {theme === "dark" ? "Light mode" : "Dark mode"}
              </button>
              <a
                href="/HasanKhesro-CV.pdf"
                onClick={closeMenu}
                className="rounded-lg border border-emerald/40 px-3 py-3 font-medium text-emerald"
              >
                Download CV
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
