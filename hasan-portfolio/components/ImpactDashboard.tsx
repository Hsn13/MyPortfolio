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
    <div
      ref={ref}
      tabIndex={0}
      aria-describedby={`metric-detail-${i}`}
      className="group relative border-t border-border py-6 outline-none first:border-t-0 focus-visible:rounded-lg focus-visible:ring-2 focus-visible:ring-emerald md:border-t-0 md:border-l md:py-2 md:pl-6 md:first:border-l-0 md:first:pl-0"
    >
      <div className="font-display text-4xl font-semibold text-ink md:text-5xl">{display}</div>
      <div className="mt-1 text-sm font-medium text-muted">{label}</div>
      <div
        id={`metric-detail-${i}`}
        className="mt-2 text-xs leading-relaxed text-muted md:pointer-events-none md:absolute md:left-0 md:top-full md:z-10 md:mt-2 md:w-56 md:rounded-lg md:border md:border-border md:bg-surface-2 md:p-3 md:opacity-0 md:shadow-xl md:transition-opacity md:duration-200 md:group-hover:opacity-100 md:group-focus:opacity-100"
      >
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
