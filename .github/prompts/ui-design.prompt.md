Review this portfolio and improve the frontend design with a premium, modern, conversion-focused aesthetic.

## Brand and visual system

- Keep Hasan Khesro's personal brand: thoughtful engineering, practical AI, and clear product delivery.
- Use the shared theme tokens in `hasan-portfolio/app/globals.css`; do not introduce isolated accent colors.
- Keep the accent roles distinct: green for actions and signals, blue for structural lines and direction, and white for highlights and shapes.
- Synchronize those roles across light and dark themes, favicon, Open Graph image, hero, navigation, cards, and assistant.
- Preserve a premium minimal look, accessible contrast, and responsive layouts without unnecessary visual effects.

## Implementation

- Improve hierarchy, spacing, typography, and interaction quality while preserving existing content and positioning.
- Refine reusable components in `hasan-portfolio/components/`; follow the Next.js App Router, TypeScript, Tailwind CSS v4, and Framer Motion patterns.
- Keep animations purposeful and lightweight; maintain keyboard focus visibility and reduced-motion behavior.
- Do not add dependencies unless already present in `hasan-portfolio/package.json`.
- Keep navigation and calls to action pointed at real routes and section IDs in `hasan-portfolio/app/` and `components/`.

Before finalizing, identify broken routes and missing page references, make the smallest safe fix, and run `npm run lint` and `npm run build` from `hasan-portfolio/`.
