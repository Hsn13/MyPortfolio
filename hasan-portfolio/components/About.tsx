"use client";

import { motion, useReducedMotion, useScroll } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { about } from "@/content/knowledge";
import ScrollRevealText from "@/components/ScrollRevealText";
import SectionKicker from "@/components/SectionKicker";

const countWords = (text: string) => text.trim().split(/\s+/).length;

export default function About() {
  const textColumnRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: textColumnRef,
    offset: ["start 0.82", "end 0.3"],
  });
  const totalWords = about.paragraphs.reduce((total, paragraph) => total + countWords(paragraph), 0);

  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container-px mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr_1.4fr] md:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionKicker label={about.eyebrow} detail="VALUES IN PRACTICE" />
          <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-surface">
            <Image
              src="/images/hasan.jpg"
              alt="Portrait of Hasan Khesro"
              width={480}
              height={560}
              sizes="(max-width: 767px) 100vw, 40vw"
              className="h-auto w-full object-cover grayscale-[15%]"
            />
          </div>
        </motion.div>

        <motion.div
          ref={textColumnRef}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col justify-center gap-5"
        >
          {about.paragraphs.map((paragraph, i) => (
            <ScrollRevealText
              key={i}
              text={paragraph}
              className={`text-lg leading-relaxed ${i === 0 ? "text-ink" : "text-muted"}`}
              progress={scrollYProgress}
              wordOffset={about.paragraphs.slice(0, i).reduce((total, previous) => total + countWords(previous), 0)}
              totalWords={totalWords}
              reduceMotion={Boolean(reduceMotion)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
