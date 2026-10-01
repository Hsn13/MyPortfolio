"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { projects, sideProjects, type Project } from "@/content/knowledge";
import CaseStudyModal from "@/components/CaseStudyModal";
import ProjectCard from "@/components/ProjectCard";
import SectionKicker from "@/components/SectionKicker";

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  const [flagship, ...rest] = [...projects].sort((a, b) => a.order - b.order);

  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="container-px mx-auto max-w-7xl">
        <div className="project-heading mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <SectionKicker label="FIELD NOTES" detail="FIVE BUILDS / PRODUCT TOOLS" />
            <h2 className="portfolio-section-title mt-3">Things that <em>move</em> people.</h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted">Products, platforms, and experiments shaped around the people who use them—not the tech for its own sake.</p>
        </div>

        <ProjectCard project={flagship} index={0} featured onSelect={setActive} />

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {rest.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index + 1} onSelect={setActive} />
          ))}
        </div>

        {/* Side projects */}
        <div className="side-builds mt-20 border-t border-border pt-12">
          <div className="flex items-end justify-between gap-4">
            <div>
              <SectionKicker label="THE WORKBENCH" detail="SMALLER EXPERIMENTS" />
              <h3 className="mt-3 font-display text-2xl font-semibold tracking-[-0.04em] text-ink">Curiosity, shipped.</h3>
            </div>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-muted md:block">Ideas still in orbit ↘</span>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {sideProjects.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -5% 0px" }}
                transition={{ duration: 0.45, delay: (index % 4) * 0.06 }}
                className="side-build"
              >
                <span className="side-build__index">{String(index + 1).padStart(2, "0")}</span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-ink">{project.name}</p>
                  <p className="mt-1 text-xs text-muted">{project.category}</p>
                  <p className="mt-3 text-[11px] leading-relaxed text-muted/70">{project.tech}</p>
                </div>
                <span className="side-build__signal" aria-hidden="true" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <CaseStudyModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
