"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { profile } from "@/content/knowledge";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-40 pb-28 md:pt-52 md:pb-36">
      {/* ambient network backdrop — the one deliberate motion moment */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <svg className="absolute inset-0 h-full w-full opacity-[0.35]" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="fade" cx="50%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#12b886" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#08090c" stopOpacity="0" />
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
              stroke="#23262f"
              strokeWidth="1"
            />
          ))}
        </svg>
      </div>

      <div className="container-px mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs text-muted"
        >
          <Sparkles className="h-3.5 w-3.5 text-emerald" />
          Muharraq, Bahrain · Open to Software Engineer, Full-Stack & PM roles
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="text-balance max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight text-ink md:text-6xl lg:text-[4.5rem]"
        >
          {profile.headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-6 max-w-2xl text-balance text-lg text-muted md:text-xl"
        >
          {profile.subhead}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-emerald px-6 py-3 text-sm font-semibold text-[#04120d] transition-transform hover:-translate-y-0.5"
          >
            Explore Projects
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#ai"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-blue hover:text-blue"
          >
            Ask Hasan AI
          </a>
          <a
            href="/HasanKhesro-CV.pdf"
            className="inline-flex items-center gap-2 px-2 py-3 text-sm font-medium text-muted transition-colors hover:text-ink"
          >
            Download CV
          </a>
        </motion.div>
      </div>
    </section>
  );
}

const NODES = [
  { x: 12, y: 20, r: 2.5, color: "#12b886", dur: 5, delay: 0 },
  { x: 28, y: 12, r: 1.8, color: "#3b82f6", dur: 6, delay: 0.4 },
  { x: 46, y: 24, r: 2.2, color: "#12b886", dur: 7, delay: 0.8 },
  { x: 63, y: 10, r: 1.6, color: "#3b82f6", dur: 5.5, delay: 1.2 },
  { x: 78, y: 22, r: 2.4, color: "#12b886", dur: 6.5, delay: 0.2 },
  { x: 88, y: 14, r: 1.8, color: "#3b82f6", dur: 8, delay: 0.6 },
  { x: 20, y: 34, r: 1.6, color: "#3b82f6", dur: 7.5, delay: 1 },
  { x: 55, y: 36, r: 2, color: "#12b886", dur: 6, delay: 1.4 },
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
