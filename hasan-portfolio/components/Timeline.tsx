"use client";

import { motion } from "framer-motion";
import { timeline } from "@/content/knowledge";

export default function Timeline() {
  return (
    <section id="journey" className="border-t border-border py-24 md:py-32">
      <div className="container-px mx-auto max-w-4xl">
        <p className="text-xs font-medium uppercase tracking-widest text-muted">Building the foundation</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl">The journey so far</h2>

        <div className="relative mt-16">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border md:left-[7px]" />
          <div className="space-y-12">
            {timeline.map((t, i) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="relative pl-8"
              >
                <span className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-emerald bg-bg" />
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wide text-emerald">{t.stage}</span>
                  <span className="text-xs text-muted">{t.when}</span>
                </div>
                <h3 className="mt-1.5 text-lg font-semibold text-ink">{t.title}</h3>
                <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted">{t.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
