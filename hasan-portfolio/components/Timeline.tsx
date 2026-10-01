"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import { timeline } from "@/content/knowledge";
import SectionKicker from "@/components/SectionKicker";

export default function Timeline() {
  const routeRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const trackPathRef = useRef<SVGPathElement>(null);
  const signalPathRef = useRef<SVGPathElement>(null);
  const signalLengthRef = useRef(0);
  const reduceMotion = useReducedMotion();
  const [routeReady, setRouteReady] = useState(false);
  const { scrollYProgress } = useScroll({
    target: routeRef,
    offset: ["start 0.82", "end 0.62"],
  });
  const routeProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });
  useLayoutEffect(() => {
    const route = routeRef.current;
    const svg = svgRef.current;
    const track = trackPathRef.current;
    const signal = signalPathRef.current;
    if (!route || !svg || !track || !signal) return;

    const updateRoute = () => {
      const bounds = route.getBoundingClientRect();
      const stops = [...route.querySelectorAll<HTMLElement>(".journey-stop__node")];
      const destination = route.querySelector<HTMLElement>(".journey-route__destination i");
      if (bounds.width === 0 || bounds.height === 0 || stops.length === 0 || !destination) return;

      const points = [...stops, destination].map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2 - bounds.left,
          y: rect.top + rect.height / 2 - bounds.top,
        };
      });
      const amplitude = Math.min(bounds.width * 0.1, 42);
      const clampX = (x: number) => Math.max(8, Math.min(bounds.width - 8, x));
      const [first, ...rest] = points;
      let pathData = `M ${first.x} ${first.y}`;

      for (let index = 0; index < rest.length; index += 1) {
        const start = points[index];
        const end = rest[index];
        const direction = index % 2 === 0 ? 1 : -1;
        const bend = amplitude * direction;
        const distance = end.y - start.y;
        pathData += ` C ${clampX(start.x + bend)} ${start.y + distance * 0.34}, ${clampX(end.x + bend)} ${start.y + distance * 0.66}, ${end.x} ${end.y}`;
      }

      svg.setAttribute("viewBox", `0 0 ${bounds.width} ${bounds.height}`);
      track.setAttribute("d", pathData);
      signal.setAttribute("d", pathData);
      const length = signal.getTotalLength();
      signalLengthRef.current = length;
      signal.style.strokeDasharray = `${length}`;
      signal.style.strokeDashoffset = `${length * (reduceMotion ? 0 : 1 - routeProgress.get())}`;
      setRouteReady(true);
    };

    updateRoute();
    const observer = new ResizeObserver(updateRoute);
    observer.observe(route);
    route.querySelectorAll(".journey-stop__card").forEach((card) => observer.observe(card));
    window.addEventListener("resize", updateRoute);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateRoute);
    };
  }, [reduceMotion, routeProgress]);

  useMotionValueEvent(routeProgress, "change", (progress) => {
    const path = signalPathRef.current;
    if (!path || reduceMotion) return;

    path.style.strokeDashoffset = `${signalLengthRef.current * (1 - progress)}`;
  });

  return (
    <section id="journey" className="journey-section py-24 md:py-32">
      <div className="container-px mx-auto max-w-6xl">
        <header className="journey-heading">
          <SectionKicker label="THE ROUTE SO FAR" detail="A LIFE IN ITERATIONS" />
          <div className="journey-heading__main">
            <h2 className="portfolio-section-title">Not a straight line.<br /><em>A better kind of route.</em></h2>
            <p>Each turn added a different tool: curiosity, people skills, technical depth, and the instinct to make the whole thing work.</p>
          </div>
          <div className="journey-heading__legend">
            <span><i className="journey-legend__origin" /> THE START</span>
            <span><i className="journey-legend__now" /> STILL IN MOTION</span>
          </div>
        </header>

        <div ref={routeRef} className="journey-route">
          <svg
            ref={svgRef}
            className="journey-route__map"
            preserveAspectRatio="none"
            aria-hidden="true"
            style={{ opacity: routeReady ? 1 : 0 }}
          >
            <path ref={trackPathRef} className="journey-route__track" />
            <path ref={signalPathRef} className="journey-route__signal" />
          </svg>

          <ol className="journey-stops">
            {timeline.map((entry, index) => (
              <li key={entry.title} className={`journey-stop ${index % 2 === 0 ? "journey-stop--left" : "journey-stop--right"}`}>
                <span className="journey-stop__node" aria-hidden="true">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </span>
                <motion.article
                  initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8% 0px" }}
                  transition={{ duration: 0.65, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
                  className="journey-stop__card"
                >
                  <div className="journey-stop__meta">
                    <span>{entry.stage}</span>
                    <time>{entry.when}</time>
                  </div>
                  <h3>{entry.title}</h3>
                  <p>{entry.body}</p>
                </motion.article>
              </li>
            ))}
          </ol>
          <div className="journey-route__destination"><i /> TO BE CONTINUED</div>
        </div>
      </div>
    </section>
  );
}
