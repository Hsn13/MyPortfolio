"use client";

import Image from "next/image";

/**
 * Renders a project's screenshot if one is set in content/knowledge.ts.
 * Otherwise falls back to a designed placeholder (not a broken image or
 * empty gray box) so the site looks finished even before real screenshots
 * are wired in.
 */
export default function ProjectVisual({
  screenshot,
  name,
  className = "",
}: {
  screenshot?: string;
  name: string;
  className?: string;
}) {
  if (screenshot) {
    return (
      <div className={`relative overflow-hidden rounded-xl border border-border bg-surface ${className}`}>
        <Image
          src={screenshot}
          alt={`${name} screenshot`}
          fill
          sizes="(max-width: 767px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    );
  }

  const patternId = `grid-${name.replace(/\s+/g, "")}`;

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-xl border border-dashed border-border bg-surface ${className}`}
    >
      <svg className="absolute inset-0 h-full w-full opacity-[0.25]" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id={patternId} width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#23262f" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
      <span className="relative z-10 rounded-full border border-border bg-bg/60 px-3 py-1.5 text-[11px] font-medium text-muted backdrop-blur">
        Screenshot coming soon
      </span>
    </div>
  );
}
