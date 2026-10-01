"use client";

import { useReducedMotion, useMotionValue, useSpring, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/knowledge";
import ProjectVisual from "@/components/ProjectVisual";

export default function ProjectCard({
  project,
  index,
  featured = false,
  onSelect,
}: {
  project: Project;
  index: number;
  featured?: boolean;
  onSelect: (project: Project) => void;
}) {
  const reduceMotion = useReducedMotion();
  const rotateX = useSpring(useMotionValue(0), { stiffness: 180, damping: 24, mass: 0.7 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 180, damping: 24, mass: 0.7 });
  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.7, delay: Math.min(index % 3, 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduceMotion ? undefined : { y: -5, scale: 1.008 }}
      style={reduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 1100 }}
      onPointerMove={(event) => {
        if (reduceMotion || event.pointerType !== "mouse") return;
        const rect = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        rotateX.set((0.5 - y) * 2.4);
        rotateY.set((x - 0.5) * 2.4);
        event.currentTarget.style.setProperty("--spot-x", `${x * 100}%`);
        event.currentTarget.style.setProperty("--spot-y", `${y * 100}%`);
      }}
      onPointerLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
      }}
      onPointerCancel={() => {
        rotateX.set(0);
        rotateY.set(0);
      }}
      className={`project-card group ${featured ? "project-card--featured" : ""}`}
    >
      <div className="project-card__topline">
        <span className="project-card__number">{number}<i /></span>
        <span className="project-card__category">{project.category}</span>
        <span className="project-card__open" aria-hidden="true"><ArrowUpRight /></span>
      </div>
      <ProjectVisual
        projectId={project.id}
        screenshot={project.screenshot}
        name={project.name}
        className={`project-card__visual ${featured ? "aspect-[16/9]" : "aspect-[16/10]"}`}
      />
      <div className="project-card__copy">
        <div>
          <h3>{project.name}</h3>
          <p>{project.heroStatement}</p>
        </div>
        {featured && (
          <div className="project-card__stack" aria-label="Technology used">
            {project.tech.slice(0, 5).map((tech) => <span key={tech}>{tech}</span>)}
          </div>
        )}
      </div>
      <button type="button" onClick={() => onSelect(project)} className="project-card__link">
        Explore the build <ArrowUpRight aria-hidden="true" />
      </button>
    </motion.article>
  );
}
