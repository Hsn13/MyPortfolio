"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, sideProjects } from "@/content/knowledge";
import { GithubIcon } from "@/components/icons";

export default function Projects() {
  const [flagship, ...rest] = projects.sort((a, b) => a.order - b.order);

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
        <motion.a
          href={`#project-${flagship.id}`}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="group relative block overflow-hidden rounded-2xl border border-border bg-surface p-8 transition-colors hover:border-emerald/50 md:p-12"
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
        </motion.a>

        {/* Rest — 2-col grid */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {rest.map((p, i) => (
            <motion.a
              href={`#project-${p.id}`}
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group block rounded-2xl border border-border bg-surface p-7 transition-colors hover:border-blue/50"
            >
              <span className="text-xs font-medium uppercase tracking-widest text-blue">{p.category}</span>
              <h3 className="mt-3 font-display text-xl font-semibold text-ink">{p.name}</h3>
              <p className="mt-3 text-sm text-muted">{p.heroStatement}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-ink">
                View case study
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </motion.a>
          ))}
        </div>

        {/* Case study detail blocks */}
        <div className="mt-20 space-y-20">
          {projects.map((p) => (
            <div key={p.id} id={`project-${p.id}`} className="scroll-mt-24 border-t border-border pt-12">
              <div className="grid gap-10 md:grid-cols-[1fr_1.4fr]">
                <div>
                  <span className="text-xs font-medium uppercase tracking-widest text-emerald">{p.category}</span>
                  <h3 className="mt-3 font-display text-2xl font-semibold text-ink">{p.name}</h3>
                  <p className="mt-2 text-sm text-muted">{p.role}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {p.links.demo && (
                      <a href={p.links.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-emerald px-4 py-2 text-xs font-semibold text-[#04120d]">
                        Live Demo <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {p.links.github && (
                      <a href={p.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-medium text-ink">
                        <GithubIcon className="h-3.5 w-3.5" /> Source
                      </a>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-ink">The challenge</h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{p.problem}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-ink">The solution</h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{p.solution}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-ink">My role</h4>
                    <ul className="mt-2 space-y-1.5">
                      {p.myRole.map((r) => (
                        <li key={r} className="flex gap-2 text-sm leading-relaxed text-muted">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-ink">How it was built</h4>
                    <ul className="mt-2 space-y-1.5">
                      {p.architecture.map((r) => (
                        <li key={r} className="flex gap-2 text-sm leading-relaxed text-muted">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-blue" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl border border-emerald/25 bg-emerald/5 p-4">
                    <h4 className="text-sm font-semibold text-ink">Outcome</h4>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{p.outcome}</p>
                  </div>
                  {p.lessons && (
                    <div>
                      <h4 className="text-sm font-semibold text-ink">Lessons</h4>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{p.lessons}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
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
    </section>
  );
}
