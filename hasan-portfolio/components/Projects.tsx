"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, sideProjects, type Project } from "@/content/knowledge";
import CaseStudyModal from "@/components/CaseStudyModal";

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  const [flagship, ...rest] = [...projects].sort((a, b) => a.order - b.order);

  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="container-px mx-auto max-w-6xl">
        <div className="mb-14 max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-widest text-muted">Featured work</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            Built, not just coded
          </h2>
        </div>

        {/* Flagship — large card */}
        <motion.button
          type="button"
          onClick={() => setActive(flagship)}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="group relative block w-full overflow-hidden rounded-2xl border border-border bg-surface p-8 text-left transition-colors hover:border-emerald/50 md:p-12"
        >
          <span className="text-xs font-medium uppercase tracking-widest text-emerald">{flagship.category}</span>
          <h3 className="mt-4 font-display text-3xl font-semibold text-ink md:text-4xl">{flagship.name}</h3>
          <p className="mt-4 max-w-xl text-muted">{flagship.heroStatement}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {flagship.tech.map((t) => (
              <span key={t} className="rounded-full border border-border px-3 py-1 text-xs text-muted">
                {t}
              </span>
            ))}
          </div>
          <span className="mt-8 inline-flex items-center gap-1 text-sm font-medium text-ink">
            View case study
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </motion.button>

        {/* Rest — 2-col grid */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {rest.map((p, i) => (
            <motion.button
              type="button"
              onClick={() => setActive(p)}
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group block w-full rounded-2xl border border-border bg-surface p-7 text-left transition-colors hover:border-blue/50"
            >
              <span className="text-xs font-medium uppercase tracking-widest text-blue">{p.category}</span>
              <h3 className="mt-3 font-display text-xl font-semibold text-ink">{p.name}</h3>
              <p className="mt-3 text-sm text-muted">{p.heroStatement}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-ink">
                View case study
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </motion.button>
          ))}
        </div>

        {/* Side projects */}
        <div className="mt-20 border-t border-border pt-12">
          <p className="text-xs font-medium uppercase tracking-widest text-muted">Experiments & builds</p>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {sideProjects.map((sp) => (
              <div key={sp.name} className="rounded-xl border border-border bg-surface p-4">
                <p className="text-sm font-medium text-ink">{sp.name}</p>
                <p className="mt-1 text-xs text-muted">{sp.category}</p>
                <p className="mt-2 text-[11px] text-muted/70">{sp.tech}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CaseStudyModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
