"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const INTERACTIVE_SELECTOR =
  'a[href], button:not(:disabled), [role="button"]:not([aria-disabled="true"]), [data-cursor="interactive"]';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const positionRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateEnabled = () => setEnabled(media.matches && !reduceMotion);
    updateEnabled();
    media.addEventListener("change", updateEnabled);
    return () => media.removeEventListener("change", updateEnabled);
  }, [reduceMotion]);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-custom-cursor");

    const moveCursor = () => {
      const cursor = cursorRef.current;
      if (!cursor) {
        frameRef.current = null;
        return;
      }

      const current = positionRef.current;
      const target = targetRef.current;
      current.x += (target.x - current.x) * 0.2;
      current.y += (target.y - current.y) * 0.2;
      cursor.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%)`;

      if (Math.abs(target.x - current.x) > 0.2 || Math.abs(target.y - current.y) > 0.2) {
        frameRef.current = window.requestAnimationFrame(moveCursor);
      } else {
        frameRef.current = null;
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      let x = event.clientX;
      let y = event.clientY;
      const target = event.target instanceof Element ? event.target.closest(INTERACTIVE_SELECTOR) : null;
      const isInteractive = target instanceof HTMLElement;

      if (isInteractive) {
        const bounds = target.getBoundingClientRect();
        x += (bounds.left + bounds.width / 2 - x) * 0.12;
        y += (bounds.top + bounds.height / 2 - y) * 0.12;
      }

      targetRef.current = { x, y };
      setHovering((current) => current === isInteractive ? current : isInteractive);
      if (frameRef.current === null) frameRef.current = window.requestAnimationFrame(moveCursor);
      if (cursorRef.current) cursorRef.current.style.opacity = "1";
    };

    const onPointerLeave = (event: PointerEvent) => {
      if (event.relatedTarget !== null) return;
      if (cursorRef.current) cursorRef.current.style.opacity = "0";
      setHovering(false);
    };

    window.addEventListener("pointermove", onPointerMove);
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      document.documentElement.classList.remove("has-custom-cursor");
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={`custom-cursor${hovering ? " custom-cursor--hover" : ""}`}
    >
      <span />
    </div>
  );
}
