"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

const stars = [
  { x: 84, y: 118, r: 1.5, delay: 0 },
  { x: 132, y: 82, r: 1, delay: 0.7 },
  { x: 368, y: 105, r: 1.4, delay: 1.1 },
  { x: 405, y: 196, r: 1, delay: 0.4 },
  { x: 65, y: 286, r: 1, delay: 1.5 },
  { x: 396, y: 355, r: 1.5, delay: 0.9 },
  { x: 116, y: 405, r: 1.2, delay: 0.3 },
  { x: 323, y: 427, r: 1, delay: 1.3 },
  { x: 177, y: 157, r: 1, delay: 1.8 },
  { x: 302, y: 325, r: 1, delay: 0.6 },
];

export default function AIUniverse() {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 70, damping: 22 });
  const springY = useSpring(pointerY, { stiffness: 70, damping: 22 });
  const orbitX = useTransform(springX, [-1, 1], [-8, 8]);
  const orbitY = useTransform(springY, [-1, 1], [7, -7]);
  const coreX = useTransform(springX, [-1, 1], [5, -5]);
  const coreY = useTransform(springY, [-1, 1], [-5, 5]);

  return (
    <motion.div
      className="ai-universe"
      role="img"
      aria-label="An astronaut in a small UFO joyfully cruises through an abstract AI universe along glowing orbital paths"
      initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.2, 0.75, 0.25, 1] }}
      onPointerMove={(event) => {
        if (reduceMotion || event.pointerType !== "mouse") return;
        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
        event.currentTarget.style.setProperty("--pointer-x", `${(x + 1) * 50}%`);
        event.currentTarget.style.setProperty("--pointer-y", `${(y + 1) * 50}%`);
        pointerX.set(x);
        pointerY.set(y);
      }}
      onPointerLeave={(event) => {
        event.currentTarget.style.removeProperty("--pointer-x");
        event.currentTarget.style.removeProperty("--pointer-y");
        pointerX.set(0);
        pointerY.set(0);
      }}
    >
      <div className="ai-universe__shell" aria-hidden="true" />
      <div className="ai-universe__label">
        <span>FIELD NOTE / 01</span>
        <span><i /> INTELLIGENCE IN MOTION</span>
      </div>

      <svg className="ai-universe__stars" viewBox="0 0 480 520" fill="none" aria-hidden="true">
        <defs>
          <radialGradient id="ai-universe-nebula">
            <stop stopColor="var(--color-emerald)" stopOpacity=".22" />
            <stop offset=".48" stopColor="var(--color-blue)" stopOpacity=".1" />
            <stop offset="1" stopColor="var(--color-bg)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="240" cy="263" rx="208" ry="205" fill="url(#ai-universe-nebula)" />
        {stars.map((star, index) => (
          <motion.circle
            key={`${star.x}-${star.y}`}
            cx={star.x}
            cy={star.y}
            r={star.r}
            fill={index % 3 === 0 ? "var(--color-accent-white)" : "var(--color-blue)"}
            initial={false}
            animate={reduceMotion ? undefined : { opacity: [0.25, 0.9, 0.25], scale: [0.8, 1.3, 0.8] }}
            transition={{ duration: 3.2 + star.delay, repeat: Infinity, delay: star.delay, ease: "easeInOut" }}
          />
        ))}
      </svg>

      <motion.svg
        className="ai-universe__orbits"
        viewBox="0 0 480 520"
        fill="none"
        aria-hidden="true"
        style={reduceMotion ? undefined : { x: orbitX, y: orbitY }}
      >
        <ellipse className="ai-universe__orbit ai-universe__orbit--blue" cx="240" cy="263" rx="202" ry="91" transform="rotate(-32 240 263)" />
        <ellipse className="ai-universe__orbit ai-universe__orbit--green" cx="240" cy="263" rx="175" ry="133" transform="rotate(48 240 263)" />
        <ellipse className="ai-universe__orbit ai-universe__orbit--white" cx="240" cy="263" rx="112" ry="190" transform="rotate(-8 240 263)" />
        <path className="ai-universe__constellation" d="M88 164L120 133L153 151M340 378L368 348L394 360" />
        <circle className="ai-universe__satellite ai-universe__satellite--one" cx="75" cy="174" r="4" />
        <circle className="ai-universe__satellite ai-universe__satellite--two" cx="386" cy="362" r="3" />
        <circle className="ai-universe__satellite ai-universe__satellite--three" cx="329" cy="95" r="2.5" />
      </motion.svg>

      <motion.div
        className="ai-universe__core"
        aria-hidden="true"
      >
        <motion.div className="ai-universe__core-follow" style={reduceMotion ? undefined : { x: coreX, y: coreY }}>
          <span className="ai-universe__core-ring ai-universe__core-ring--outer" />
          <span className="ai-universe__core-ring ai-universe__core-ring--inner" />
          <span className="ai-universe__core-glyph">AI</span>
          <span className="ai-universe__core-index">A / 01</span>
        </motion.div>
      </motion.div>

      <div className="ai-universe__ufo-anchor" aria-hidden="true">
        <motion.div
          className="ai-universe__ufo"
          animate={reduceMotion ? undefined : {
            x: [0, 68, 116, 54, -46, -98, 0],
            y: [-68, -42, 14, 74, 44, -22, -68],
            rotate: [0, 7, 1, -7, -3, 6, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="ai-universe__ufo-trail" />
          <svg viewBox="0 0 120 160" fill="none" aria-hidden="true">
            <path className="ai-universe__ufo-beam" d="M42 93L51 135H69L78 93Z" />
            <path className="ai-universe__astronaut-pack" d="M37 57H29V78H39M83 57H91V78H81" />
            <path className="ai-universe__astronaut-helmet" d="M38 54C38 36 47 27 60 27C74 27 82 37 82 54V67H38V54Z" />
            <path className="ai-universe__astronaut-visor" d="M45 51C45 40 51 35 60 35C69 35 75 41 75 51V55H45V51Z" />
            <circle className="ai-universe__astronaut-eye" cx="55" cy="46" r="2.2" />
            <circle className="ai-universe__astronaut-eye" cx="66" cy="46" r="2.2" />
            <path className="ai-universe__astronaut-body" d="M43 66H77L82 94L73 103H47L38 94L43 66Z" />
            <path className="ai-universe__astronaut-limb" d="M44 78L31 70M76 78L89 70M49 101L42 110M71 101L78 110" />
            <ellipse className="ai-universe__ufo-dome" cx="60" cy="91" rx="24" ry="14" />
            <path className="ai-universe__ufo-saucer" d="M12 101C20 91 40 86 60 86C80 86 100 91 108 101C98 110 79 114 60 114C41 114 22 110 12 101Z" />
            <path className="ai-universe__ufo-rim" d="M24 105C35 109 47 111 60 111C73 111 85 109 96 105" />
            <circle className="ai-universe__ufo-light" cx="37" cy="103" r="2.5" />
            <circle className="ai-universe__ufo-light" cx="60" cy="106" r="2.5" />
            <circle className="ai-universe__ufo-light" cx="83" cy="103" r="2.5" />
          </svg>
          <span className="ai-universe__ufo-spark ai-universe__ufo-spark--one" />
          <span className="ai-universe__ufo-spark ai-universe__ufo-spark--two" />
        </motion.div>
      </div>

      <div className="ai-universe__caption">
        <span>HUMAN CURIOSITY</span><i />
        <span>NO GRAVITY / ALL CURIOSITY</span>
      </div>
      <div className="ai-universe__cursor-light" aria-hidden="true" />
    </motion.div>
  );
}
