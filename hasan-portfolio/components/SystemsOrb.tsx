"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useState } from "react";

export default function SystemsOrb() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [8, -8]), { stiffness: 140, damping: 18 });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-10, 10]), { stiffness: 140, damping: 18 });

  return (
    <motion.div
      className="systems-orb"
      style={reduceMotion ? undefined : { rotateX, rotateY }}
      onPointerMove={(event) => {
        if (reduceMotion) return;
        const rect = event.currentTarget.getBoundingClientRect();
        pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
        pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
      }}
      onPointerLeave={() => {
        pointerX.set(0);
        pointerY.set(0);
        setActive(false);
      }}
      onPointerEnter={() => setActive(true)}
      aria-label="Interactive visual representing engineering, product, and AI systems"
    >
      <div className="systems-orb__glow" />
      <div className={`systems-orb__core ${active ? "systems-orb__core--active" : ""}`}>
        <span className="systems-orb__core-label">BUILD</span>
        <span className="systems-orb__core-value">01</span>
      </div>
      <div className="systems-orb__ring systems-orb__ring--one" />
      <div className="systems-orb__ring systems-orb__ring--two" />
      <div className="systems-orb__ring systems-orb__ring--three" />
      <span className="systems-orb__node systems-orb__node--one">AI</span>
      <span className="systems-orb__node systems-orb__node--two">UX</span>
      <span className="systems-orb__node systems-orb__node--three">SHIP</span>
      <span className="systems-orb__caption">SYSTEMS / 2026</span>
    </motion.div>
  );
}
