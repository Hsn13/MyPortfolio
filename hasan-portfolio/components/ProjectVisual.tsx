"use client";

import Image from "next/image";
import type { Project } from "@/content/knowledge";

const scenes: Record<Project["id"], { eyebrow: string; title: string }> = {
  rewear: { eyebrow: "Bahrain / circular exchange", title: "A second life, close to home." },
  "predictive-maintenance": { eyebrow: "Applied AI / delivery", title: "Complexity, moving together." },
  mofne: { eyebrow: "Committee workspace / bilingual", title: "Meetings into momentum." },
  verde: { eyebrow: "AI / considered commerce", title: "A slower way to shop." },
  "travel-ai": { eyebrow: "RAG / travel planning", title: "A trip that sounds like you." },
};

export default function ProjectVisual({
  projectId,
  screenshot,
  name,
  className = "",
}: {
  projectId: Project["id"];
  screenshot?: string;
  name: string;
  className?: string;
}) {
  if (screenshot) {
    return (
      <div className={`project-visual project-visual--capture ${className}`}>
        <Image
          src={screenshot}
          alt={`${name} project screenshot`}
          fill
          sizes="(max-width: 767px) 100vw, 50vw"
          className="project-visual__image"
        />
        <span className="project-visual__image-label">ORIGINAL INTERFACE / SCREENSHOT</span>
      </div>
    );
  }

  const scene = scenes[projectId];

  return (
    <div
      className={`project-visual project-scene project-scene--${projectId} ${className}`}
      role="img"
      aria-label={`${name}: conceptual product visualization, not a screenshot`}
    >
      <div className="project-scene__grain" aria-hidden="true" />
      <div className="project-scene__topline">
        <span>{scene.eyebrow}</span>
        <span>PRODUCT STUDY <i /></span>
      </div>

      {projectId === "rewear" && (
        <div className="rewear-scene">
          <div className="rewear-scene__copy">
            <span className="project-scene__index">01 / GIVE · DISCOVER · REPEAT</span>
            <h4>Good clothes.<br /><em>Next chapter.</em></h4>
            <p>Neighbourhood exchange, powered by circular habits.</p>
            <div className="rewear-scene__credit"><span>YOUR CIRCULAR WALLET</span><strong>Eco <i>Credits</i></strong></div>
          </div>
          <div className="rewear-scene__market">
            <div className="rewear-scene__market-head"><span>NEAR YOU / BAHRAIN</span><span>↗</span></div>
            <div className="rewear-scene__items">
              <div className="rewear-item rewear-item--one"><i /><span>READY FOR ANOTHER ROUND</span></div>
              <div className="rewear-item rewear-item--two"><i /><span>FOUND IN THE NEIGHBOURHOOD</span></div>
              <div className="rewear-item rewear-item--three"><i /><span>GIVE / GET / REPEAT</span></div>
            </div>
            <div className="rewear-scene__route"><i /><span>MANAMA</span><b>· · · · ·</b><i /><span>MUHARRAQ</span></div>
          </div>
        </div>
      )}

      {projectId === "predictive-maintenance" && (
        <div className="delivery-scene">
          <div className="delivery-scene__intro">
            <span className="project-scene__index">SHARED OUTCOME / ONE TEAM</span>
            <h4>{scene.title}</h4>
            <p>From technical workstreams to a validated proof of concept.</p>
          </div>
          <div className="delivery-track">
            <div className="delivery-track__rail"><i /></div>
            <div className="delivery-track__step"><span>01</span><strong>Align</strong><small>Scope &amp; stakeholders</small></div>
            <div className="delivery-track__step"><span>02</span><strong>Build</strong><small>Teams &amp; workstreams</small></div>
            <div className="delivery-track__step"><span>03</span><strong>Validate</strong><small>Proof of concept</small></div>
          </div>
          <div className="delivery-scene__signal"><span>ENGINEERING</span><i /><span>PRODUCT</span><i /><span>PEOPLE</span></div>
        </div>
      )}

      {projectId === "mofne" && (
        <div className="committee-scene">
          <div className="committee-scene__sidebar">
            <div className="committee-scene__mark">م<span>ن</span></div>
            <span>WORKSPACE / 01</span>
            <i /><i /><i /><i />
            <small>AR <b>/</b> EN</small>
          </div>
          <div className="committee-scene__main">
            <div className="committee-scene__heading"><div><span className="project-scene__index">COMMITTEE WORKSPACE</span><h4>{scene.title}</h4></div><span className="committee-scene__date">WEEK / 24</span></div>
            <div className="committee-scene__calendar">
              <div className="committee-scene__days"><span>SUN</span><span>MON</span><span>TUE</span><span>WED</span><span>THU</span></div>
              <div className="committee-scene__meeting"><b>09:30</b><span>Meeting / اجتماع</span><i /></div>
              <div className="committee-scene__meeting committee-scene__meeting--action"><b>11:00</b><span>Action items / المهام</span><i /></div>
            </div>
            <div className="committee-scene__footer"><span>MINUTES</span><i /><span>ACTIONS</span><i /><span>FOLLOW-THROUGH</span></div>
          </div>
        </div>
      )}

      <span className="project-scene__disclaimer">ILLUSTRATIVE PRODUCT SCENE / NOT A SCREENSHOT</span>
    </div>
  );
}
