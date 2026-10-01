"use client";

import { motion, useTransform } from "framer-motion";
import { Fragment } from "react";
import type { MotionValue } from "framer-motion";

function RevealedWord({
  word,
  progress,
  start,
  end,
}: {
  word: string;
  start: number;
  end: number;
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, [start, end, 0.94, 1], [0.12, 1, 1, 0.12]);

  return (
    <motion.span className="inline-block" style={{ opacity }}>
      {word}
    </motion.span>
  );
}

export default function ScrollRevealText({
  text,
  className,
  progress,
  wordOffset,
  totalWords,
  reduceMotion,
}: {
  text: string;
  className: string;
  progress: MotionValue<number>;
  wordOffset: number;
  totalWords: number;
  reduceMotion: boolean;
}) {
  if (reduceMotion) {
    return <p className={className}>{text}</p>;
  }

  const words = text.trim().split(/\s+/);

  return (
    <p className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, index) => (
          <Fragment key={`${index}-${word}`}>
            <RevealedWord
              word={word}
              progress={progress}
              start={(wordOffset + index) / totalWords * 0.82}
              end={(wordOffset + index + 1) / totalWords * 0.82}
            />
            {index < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
    </p>
  );
}
