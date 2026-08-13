"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { about } from "@/content/knowledge";

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container-px mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr_1.4fr] md:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-medium uppercase tracking-widest text-muted">{about.eyebrow}</p>
          <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-surface">
            <Image
              src="/images/hasan.jpg"
              alt="Portrait of Hasan Khesro"
              width={480}
              height={560}
              className="h-auto w-full object-cover grayscale-[15%]"
              priority
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col justify-center gap-5"
        >
          {about.paragraphs.map((p, i) => (
            <p key={i} className={`text-lg leading-relaxed ${i === 0 ? "text-ink" : "text-muted"}`}>
              {p}
            </p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
