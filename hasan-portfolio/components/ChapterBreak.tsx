"use client";

import { motion } from "framer-motion";

export default function ChapterBreak({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <div aria-hidden="true" className="chapter-break container-px mx-auto max-w-7xl">
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-20% 0px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="chapter-break__line"
      />
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20% 0px" }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="chapter-break__label"
      >
        <span>{number}</span>
        <span>{label}</span>
      </motion.div>
    </div>
  );
}
