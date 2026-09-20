"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, MapPin, ArrowDownRight } from "lucide-react";
import { useEffect, useState } from "react";
import { profile } from "@/content/knowledge";
import SystemsOrb from "@/components/SystemsOrb";

export default function Hero() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () =>
      setTime(new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Bahrain" }).format());
    update();
    const interval = window.setInterval(update, 30_000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section id="top" className="hero-stage relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-24">
      {/* ambient network backdrop — the one deliberate motion moment */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <svg className="absolute inset-0 h-full w-full opacity-[0.35]" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="fade" cx="50%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#ff4f00" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#fffefb" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#fade)" />
          {NODES.map((n, i) => (
            <motion.circle
              key={i}
              cx={`${n.x}%`}
              cy={`${n.y}%`}
              r={n.r}
              fill={n.color}
              initial={{ opacity: 0.15 }}
              animate={{ opacity: [0.15, 0.55, 0.15] }}
              transition={{ duration: n.dur, repeat: Infinity, delay: n.delay, ease: "easeInOut" }}
            />
          ))}
          {LINES.map((l, i) => (
            <line
              key={i}
              x1={`${l.x1}%`}
              y1={`${l.y1}%`}
              x2={`${l.x2}%`}
              y2={`${l.y2}%`}
              stroke="#c5c0b1"
              strokeWidth="1"
            />
          ))}
        </svg>
      </div>

      <div className="container-px relative mx-auto max-w-7xl">
        <div className="mb-12 flex items-center justify-between border-b border-border/70 pb-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-muted">
          <span className="flex items-center gap-2"><span className="live-dot" /> Available for select opportunities</span>
          <span className="hidden items-center gap-3 md:flex"><MapPin className="h-3.5 w-3.5 text-emerald" /> {profile.location} <span className="text-border">/</span> {time || "—"} local time</span>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:gap-8">
          <div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="mb-6 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-emerald">
              <Sparkles className="h-3.5 w-3.5" /> Full-stack engineer / AI builder
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.05 }}
              className="text-balance max-w-5xl text-5xl font-semibold leading-[0.94] tracking-[-0.07em] text-ink md:text-7xl lg:text-[7.5rem]"
            >
              {profile.headline}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.18 }} className="mt-8 max-w-xl text-balance text-lg leading-relaxed text-muted md:text-xl">
              {profile.subhead}
            </motion.p>
          </div>
          <SystemsOrb />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-lg bg-emerald px-6 py-3.5 text-sm font-semibold text-[#201515] transition-transform hover:-translate-y-0.5"
          >
            Explore Projects
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#ai"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface/60 px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:border-emerald hover:text-emerald"
          >
            Ask Hasan AI
          </a>
          <a
            href="/HasanKhesro-CV.pdf"
            className="inline-flex items-center gap-2 px-2 py-3 text-sm font-medium text-muted transition-colors hover:text-ink"
          >
            Download CV
          </a>
          <a href="#about" className="group inline-flex items-center gap-2 px-2 py-3 text-sm font-medium text-muted transition-colors hover:text-ink">
            Scroll to explore <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

const NODES = [
  { x: 12, y: 20, r: 2.5, color: "#ff4f00", dur: 5, delay: 0 },
  { x: 28, y: 12, r: 1.8, color: "#36342e", dur: 6, delay: 0.4 },
  { x: 46, y: 24, r: 2.2, color: "#ff4f00", dur: 7, delay: 0.8 },
  { x: 63, y: 10, r: 1.6, color: "#36342e", dur: 5.5, delay: 1.2 },
  { x: 78, y: 22, r: 2.4, color: "#ff4f00", dur: 6.5, delay: 0.2 },
  { x: 88, y: 14, r: 1.8, color: "#36342e", dur: 8, delay: 0.6 },
  { x: 20, y: 34, r: 1.6, color: "#36342e", dur: 7.5, delay: 1 },
  { x: 55, y: 36, r: 2, color: "#ff4f00", dur: 6, delay: 1.4 },
];

const LINES = [
  { x1: 12, y1: 20, x2: 28, y2: 12 },
  { x1: 28, y1: 12, x2: 46, y2: 24 },
  { x1: 46, y1: 24, x2: 63, y2: 10 },
  { x1: 63, y1: 10, x2: 78, y2: 22 },
  { x1: 78, y1: 22, x2: 88, y2: 14 },
  { x1: 20, y1: 34, x2: 46, y2: 24 },
  { x1: 55, y1: 36, x2: 63, y2: 10 },
];
