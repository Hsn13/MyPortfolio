"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/knowledge";

export default function CaseStudyModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  // Lock body scroll while open, close on Escape.
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm md:items-center md:p-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl rounded-2xl border border-border bg-surface-2 shadow-2xl"
          >
            <button
              onClick={onClose}
              aria-label="Close case study"
              className="absolute right-4 top-4 z-10 rounded-full border border-border bg-surface p-2 text-muted hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="max-h-[85vh] overflow-y-auto p-7 md:p-10">
              <span className="text-xs font-medium uppercase tracking-widest text-emerald">{project.category}</span>
              <h3 className="mt-3 font-display text-2xl font-semibold text-ink md:text-3xl">{project.name}</h3>
              <p className="mt-1 text-sm text-muted">{project.role}</p>
              <p className="mt-4 text-base leading-relaxed text-ink">{project.heroStatement}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-emerald px-4 py-2 text-xs font-semibold text-[#04120d]"
                  >
                    Live Demo <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-medium text-ink"
                  >
                    <GithubIcon className="h-3.5 w-3.5" /> Source
                  </a>
                )}
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="text-sm font-semibold text-ink">The challenge</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{project.problem}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-ink">The solution</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{project.solution}</p>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-semibold text-ink">My role</h4>
                <ul className="mt-2 space-y-1.5">
                  {project.myRole.map((r) => (
                    <li key={r} className="flex gap-2 text-sm leading-relaxed text-muted">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-semibold text-ink">How it was built</h4>
                <ul className="mt-2 space-y-1.5">
                  {project.architecture.map((r) => (
                    <li key={r} className="flex gap-2 text-sm leading-relaxed text-muted">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-blue" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 rounded-xl border border-emerald/25 bg-emerald/5 p-4">
                <h4 className="text-sm font-semibold text-ink">Outcome</h4>
                <p className="mt-1 text-sm leading-relaxed text-muted">{project.outcome}</p>
              </div>

              {project.lessons && (
                <div className="mt-6">
                  <h4 className="text-sm font-semibold text-ink">Lessons</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{project.lessons}</p>
                </div>
              )}

              <div className="mt-8 flex flex-wrap gap-2 border-t border-border pt-6">
                {project.tech.map((t) => (
                  <span key={t} className="rounded-full border border-border px-3 py-1 text-xs text-muted">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
