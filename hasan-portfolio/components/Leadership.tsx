"use client";

import { motion, useReducedMotion } from "framer-motion";
import { leadership } from "@/content/knowledge";
import SectionKicker from "@/components/SectionKicker";

const signals = ["COMMUNITY", "ORGANISING", "FACILITATION", "DIPLOMACY", "REPRESENTATION", "DISCIPLINE"];

export default function Leadership() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="leadership" className="leadership-section py-24 md:py-32">
      <div className="container-px mx-auto max-w-6xl">
        <header className="leadership-heading">
          <SectionKicker label="BEYOND WRITING CODE" detail="PEOPLE ARE PART OF THE SYSTEM" />
          <div className="leadership-heading__main">
            <h2 className="portfolio-section-title">Leadership is a<br /><em>thing you do.</em></h2>
            <p>Making space for others to build, bringing people into the room, and taking ownership when the work needs it.</p>
          </div>
        </header>

        <div className="leadership-board">
          {leadership.map((item, index) => (
            <motion.article
              key={item.title}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ duration: 0.55, delay: (index % 3) * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className={`leadership-artifact leadership-artifact--${index + 1}`}
            >
              <div className="leadership-artifact__top">
                <span>{String(index + 1).padStart(2, "0")} <i /></span>
                <span>{signals[index]}</span>
              </div>
              <div className="leadership-artifact__body">
                <span className="leadership-artifact__glyph" aria-hidden="true">
                  {["↗", "⌁", "◉", "§", "✳", "↟"][index]}
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </div>
              <div className="leadership-artifact__rule"><i /></div>
            </motion.article>
          ))}
        </div>

        <div className="leadership-colophon">
          <span>INITIATIVE IS A PRACTICE</span>
          <i />
          <span>NOT A JOB TITLE</span>
        </div>
      </div>
    </section>
  );
}
