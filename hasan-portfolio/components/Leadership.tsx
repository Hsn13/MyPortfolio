"use client";

import { motion } from "framer-motion";
import { leadership } from "@/content/knowledge";

export default function Leadership() {
  return (
    <section className="border-t border-border py-24 md:py-32">
      <div className="container-px mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-widest text-muted">Beyond writing code</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            Leadership, ownership, initiative
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {leadership.map((l, i) => (
            <motion.div
              key={l.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className="rounded-xl border border-border bg-surface p-6"
            >
              <h3 className="text-sm font-semibold text-ink">{l.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{l.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
