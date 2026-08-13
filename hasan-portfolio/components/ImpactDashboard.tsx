"use client";

import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { impact } from "@/content/knowledge";

function Metric({ value, label, detail, i }: { value: string; label: string; detail: string; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const numeric = parseFloat(value.replace(/[^0-9.]/g, ""));
    const suffix = value.replace(/[0-9.]/g, "");
    const controls = animate(0, numeric, {
      duration: 1.4,
      delay: i * 0.1,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(`${value.includes(".") ? v.toFixed(1) : Math.round(v)}${suffix}`),
    });
    return () => controls.stop();
  }, [inView, value, i]);

  return (
    <div ref={ref} className="group relative border-t border-border py-6 first:border-t-0 md:border-t-0 md:border-l md:py-2 md:pl-6 md:first:border-l-0 md:first:pl-0">
      <div className="font-display text-4xl font-semibold text-ink md:text-5xl">{display}</div>
      <div className="mt-1 text-sm font-medium text-muted">{label}</div>
      <div className="pointer-events-none absolute left-0 top-full z-10 mt-2 w-56 rounded-lg border border-border bg-surface-2 p-3 text-xs text-muted opacity-0 shadow-xl transition-opacity duration-200 group-hover:opacity-100">
        {detail}
      </div>
    </div>
  );
}

export default function ImpactDashboard() {
  return (
    <section className="border-y border-border bg-surface/60">
      <div className="container-px mx-auto max-w-6xl py-14">
        <div className="mb-8 flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-widest text-muted">Evidence, not claims</p>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 gap-x-8 gap-y-8 md:grid-cols-4"
        >
          {impact.map((m, i) => (
            <Metric key={m.label} {...m} i={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
