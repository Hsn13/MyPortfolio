Review this portfolio and improve the frontend design with a premium, modern, conversion-focused aesthetic.

## Brand and visual system

- Keep Hasan Khesro's personal brand: thoughtful engineering, practical AI, and clear product delivery.
- Use the shared theme tokens in `app/globals.css`; do not introduce isolated one-off accent colors.
- The accent language is a deliberate composition of three distinct roles, not a blended rainbow:
  - Green is the action and signal color: primary CTAs, availability, selected states, and key emphasis.
  - Blue is the structural line color: dividers, orbit paths, secondary labels, and directional details.
  - White is the highlight and shape color: small glints, negative-space forms, and quiet contrast.
- Keep these roles synchronized in both light and dark themes and across the favicon, Open Graph image, hero, navigation, cards, and assistant.
- Preserve restrained dark/light neutrals, strong contrast, and the existing premium minimal direction. Avoid orange, warm beige, decorative gradients without a clear role, and excessive accent saturation.

## Implementation expectations

- Improve hierarchy, spacing, typography, and interaction quality while preserving the current content and positioning.
- Ensure mobile, tablet, and desktop layouts remain polished and responsive.
- Reuse and refine components in `components/`; follow the existing Next.js App Router, TypeScript, Tailwind CSS v4, and Framer Motion patterns.
- Prefer semantic tokens and accessible contrast over hard-coded colors. Maintain keyboard focus visibility and reduced-motion behavior.
- Keep animation purposeful, lightweight, and non-blocking. Do not add dependencies unless already present in `package.json`.
- Keep navigation and CTAs pointed at existing routes and sections.

Before finalizing, identify broken route or missing-page references, make the smallest safe fix, and run `npm run lint` and `npm run build` from `hasan-portfolio/`.
