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
      aria-label="Interactive orbit of Hasan's engineering and AI skills"
    >
      <div className="systems-orb__glow" />
      <div className={`systems-orb__core ${active ? "systems-orb__core--active" : ""}`}>
        <span className="systems-orb__planet-atmosphere" />
        <span className="systems-orb__planet-highlight" />
      </div>
      <div className="systems-orb__ring systems-orb__ring--one" />
      <div className="systems-orb__ring systems-orb__ring--two" />
      <div className="systems-orb__ring systems-orb__ring--three" />
      <div className="systems-orb__orbit systems-orb__orbit--one"><span className="systems-orb__node systems-orb__node--one">TS</span></div>
      <div className="systems-orb__orbit systems-orb__orbit--two"><span className="systems-orb__node systems-orb__node--two">AI</span></div>
      <div className="systems-orb__orbit systems-orb__orbit--three"><span className="systems-orb__node systems-orb__node--three">NEXT</span></div>
      <span className="systems-orb__node systems-orb__node--four">RAG</span>
      <span className="systems-orb__node systems-orb__node--five">REACT</span>
      <span className="systems-orb__node systems-orb__node--six">SHIP</span>
      <span className="systems-orb__caption">ENGINEERING / AI / PRODUCT</span>
    </motion.div>
  );
}
