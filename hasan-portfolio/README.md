# Hasan Khesro — Personal Portfolio

Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion.
Includes a live "Ask Hasan AI" assistant (Google Gemini, free tier) grounded in `content/knowledge.ts`.

## Run locally

```bash
npm install
cp .env.example .env.local   # then add your Gemini key to .env.local
npm run dev
```

Open http://localhost:3000

## Validation

```bash
npm run lint
npm run build
npm audit
```

The chat endpoint validates message size and count and applies a lightweight per-instance rate limit. For production deployments, configure platform-level rate limiting as well.

## Editing content

Almost everything on the site (bio, projects, timeline, skills, certifications) lives in
`content/knowledge.ts`. Edit that one file and both the website AND the AI assistant update —
the assistant's knowledge is generated from the same data, so it can never contradict the site.

Project screenshots: drop images into `public/images/projects/` and reference them from
`content/knowledge.ts` (a `screenshot` field can be added per project) whenever you're ready —
placeholders were intentionally left out of scope for now so you can wire these up yourself.

## Copilot prompts

The repository includes reusable instructions and prompts under `.github/`:

- `copilot-instructions.md` — project conventions and validation rules.
- `prompts/ui-design.prompt.md` — frontend and visual design review.
- `prompts/doctor-review.prompt.md` — routes, code quality, accessibility, and security review.

## Public repository notes

- `.env.local`, API keys, build output, dependencies, and generated TypeScript files are ignored.
- `.env.example` is safe to commit and contains no credentials.
- The CV and profile photo in `public/` are intentionally public website assets; remove them if they should not be published.
- Contact details in `content/knowledge.ts` are displayed by the site and should be treated as public.
