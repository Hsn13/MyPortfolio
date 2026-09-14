# Portfolio AI assistant instructions

Use this repository as a personal portfolio and product site for Hasan Khesro.

## Project context
- This is a Next.js 16 App Router portfolio app.
- The app uses TypeScript, Tailwind CSS v4, and Framer Motion.
- The source of truth for portfolio copy lives in `content/knowledge.ts`.
- Keep the design premium, minimal, modern, and responsive across phone, tablet, and desktop.

## Coding expectations
- Prefer small reusable components in `components/`.
- Keep UI consistent with the existing visual style before introducing new patterns.
- Favor accessible HTML, semantic structure, and clear hierarchy.
- Use Tailwind utility classes for styling; avoid introducing new component libraries unless already installed.
- Do not invent packages or dependencies that are not already in `package.json`.
- If a new feature affects navigation, verify the route exists in `app/` and that links match actual pages.

## Validation
- Before finalizing work, run:
  - `npm run lint`
  - `npm run build`
- If a route, component, or API is changed, verify it still integrates with the existing app structure.

## Review focus
- Check for broken imports, undefined components, invalid props, dead code, and miswired navigation.
- Keep content and visual design synced.
- Flag security issues, unsafe rendering, and exposed secrets.
- Recommend practical fixes with file-level reasoning.
