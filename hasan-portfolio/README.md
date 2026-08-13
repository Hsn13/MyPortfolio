# Hasan Khesro — Personal Portfolio

Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion.
Includes a live "Ask Hasan AI" assistant (Google Gemini, free tier) grounded in `content/knowledge.ts`.

## Run locally

```bash
npm install
cp .env.example .env.local   # then paste your free Gemini key into .env.local
npm run dev
```

Open http://localhost:3000

## Editing content

Almost everything on the site (bio, projects, timeline, skills, certifications) lives in
`content/knowledge.ts`. Edit that one file and both the website AND the AI assistant update —
the assistant's knowledge is generated from the same data, so it can never contradict the site.

Project screenshots: drop images into `public/images/projects/` and reference them from
`content/knowledge.ts` (a `screenshot` field can be added per project) whenever you're ready —
placeholders were intentionally left out of scope for now so you can wire these up yourself.

## Deployment — see the chat message for the full free step-by-step guide.
