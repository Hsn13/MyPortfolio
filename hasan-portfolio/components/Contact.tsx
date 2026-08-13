"use client";

import { motion } from "framer-motion";
import { Mail, FileDown } from "lucide-react";
import { profile } from "@/content/knowledge";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

export default function Contact() {
  return (
    <section id="contact" className="border-t border-border py-24 md:py-32">
      <div className="container-px mx-auto max-w-3xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-semibold tracking-tight text-ink md:text-4xl"
        >
          Let&rsquo;s build something meaningful
        </motion.h2>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          Whether you need someone who can build software, explore AI opportunities, or turn a technical idea
          into reality — I&rsquo;d love to connect.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-emerald px-5 py-2.5 text-sm font-semibold text-[#04120d]"
          >
            <Mail className="h-4 w-4" /> Email
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-ink hover:border-blue hover:text-blue"
          >
            <LinkedinIcon className="h-4 w-4" /> LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-ink hover:border-blue hover:text-blue"
          >
            <GithubIcon className="h-4 w-4" /> GitHub
          </a>
          <a
            href="/HasanKhesro-CV.pdf"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-ink hover:border-emerald hover:text-emerald"
          >
            <FileDown className="h-4 w-4" /> Download CV
          </a>
        </div>
      </div>

      <footer className="container-px mx-auto mt-24 max-w-6xl border-t border-border pt-8 text-center text-xs text-muted">
        © {new Date().getFullYear()} {profile.name}. Built with Next.js & Tailwind CSS.
      </footer>
    </section>
  );
}
