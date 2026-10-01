"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Mail } from "lucide-react";
import { profile } from "@/content/knowledge";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { ArrowUpRight } from "lucide-react";
import SectionKicker from "@/components/SectionKicker";

export default function Contact() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="contact" className="contact-finale border-t border-border py-24 md:py-32">
      <div className="contact-finale__orbit" aria-hidden="true">
        <i /><i /><i />
      </div>
      <div className="container-px relative mx-auto max-w-5xl text-center">
        <SectionKicker label="YOUR MOVE" detail="END OF PAGE / START OF SOMETHING" centered />
        <motion.h2
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="portfolio-section-title contact-finale__title"
        >
          Good work starts<br /><em>with a conversation.</em>
        </motion.h2>
        <p className="mx-auto mt-6 max-w-xl text-muted">
          Whether you need someone who can build software, explore AI opportunities, or turn a technical idea
          into reality — I&rsquo;d love to connect.
        </p>

        <div className="contact-finale__actions mt-10 flex flex-wrap items-center justify-center gap-3">
          {profile.email ? (
            <a
              href={`mailto:${profile.email}`}
              className="contact-finale__primary"
            >
              <Mail className="h-4 w-4" /> Start a conversation <ArrowUpRight className="h-4 w-4" />
            </a>
          ) : null}
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
        </div>

        <p className="contact-finale__signoff">BASED IN BAHRAIN <i /> OPEN TO GOOD PROBLEMS, GOOD PEOPLE, AND GOOD WORK.</p>
      </div>

      <footer className="container-px mx-auto mt-24 max-w-6xl border-t border-border pt-8 text-center text-xs text-muted">
        © {new Date().getFullYear()} {profile.name}. Built with Next.js & Tailwind CSS.
      </footer>
    </section>
  );
}
