"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#projects", label: "Projects" },
  { href: "#journey", label: "Journey" },
  { href: "#ai", label: "Ask Hasan AI" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 ${
        scrolled ? "bg-bg/85 backdrop-blur border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="container-px mx-auto max-w-7xl flex items-center justify-between h-16">
        <a href="#top" className="font-display font-semibold tracking-tight text-ink">
          Hasan Khesro
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-ink transition-colors">
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="/HasanKhesro-CV.pdf"
          className="text-sm font-medium px-4 py-2 rounded-full border border-emerald/40 text-emerald hover:bg-emerald hover:text-[#04120d] transition-colors"
        >
          Download CV
        </a>
      </nav>
    </header>
  );
}
