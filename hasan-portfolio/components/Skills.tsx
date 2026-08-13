"use client";

import { motion } from "framer-motion";
import { skills, certifications, education } from "@/content/knowledge";

export default function Skills() {
  return (
    <section className="border-t border-border py-24 md:py-32">
      <div className="container-px mx-auto max-w-6xl grid gap-16 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-muted">Capabilities</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl">Skills & technology</h2>

          <div className="mt-10 space-y-8">
            {Object.entries(skills).map(([category, items], i) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <h3 className="text-sm font-semibold text-emerald">{category}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {items.map((s) => (
                    <span key={s} className="rounded-full border border-border px-3 py-1.5 text-sm text-muted">
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-muted">Credentials</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink">Education & certifications</h2>

          <div className="mt-8 space-y-4">
            {education.map((e) => (
              <div key={e.degree} className="border-b border-border pb-4">
                <p className="text-sm font-medium text-ink">{e.degree}</p>
                <p className="mt-0.5 text-xs text-muted">{e.org} · {e.when}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-4">
            {certifications.map((c) => (
              <div key={c.name} className="border-b border-border pb-4">
                <p className="text-sm font-medium text-ink">{c.name}</p>
                <p className="mt-0.5 text-xs text-muted">{c.org} · {c.year}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
