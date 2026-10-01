"use client";

import { motion, useReducedMotion } from "framer-motion";
import { certifications, education, skills } from "@/content/knowledge";
import SectionKicker from "@/components/SectionKicker";

export default function Skills() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="capabilities" className="capabilities-section py-24 md:py-32">
      <div className="container-px mx-auto max-w-6xl">
        <header className="capabilities-heading">
          <div>
            <SectionKicker label="THE TOOLKIT" detail="TOOLS ARE ONLY THE START" />
            <h2 className="portfolio-section-title">What I reach for<br /><em>when it matters.</em></h2>
          </div>
          <p>Range matters. So does knowing which tool belongs to which problem—and when the work is about people, not software.</p>
        </header>

        <div className="capabilities-layout">
          <div className="capability-stack">
            {Object.entries(skills).map(([category, items], index) => (
              <motion.article
                key={category}
                initial={reduceMotion ? false : { opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
                className="capability-group"
              >
                <div className="capability-group__heading">
                  <h3>{category}</h3>
                </div>
                <div className="capability-group__items">
                  {items.map((skill) => (
                    <span key={skill} className="capability-chip">{skill}</span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>

          <aside className="credentials-panel">
            <div className="credentials-panel__heading">
              <span>THE LEARNING LOG</span>
              <i />
            </div>
            <div className="credentials-panel__section">
              <h3>Education</h3>
              <ol className="credential-list">
                {education.map((item, index) => (
                  <li key={item.degree}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <strong>{item.degree}</strong>
                      <p>{item.org}</p>
                      <small>{item.when}</small>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="credentials-panel__section">
              <h3>Certifications</h3>
              <ol className="credential-list credential-list--certifications">
                {certifications.map((item) => (
                  <li key={item.name}>
                    <span>{item.year}</span>
                    <div>
                      <strong>{item.name}</strong>
                      <p>{item.org}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="credentials-panel__stamp" aria-hidden="true">
              <span>LEARN</span><i>↗</i><span>APPLY</span><i>↗</i><span>REPEAT</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
