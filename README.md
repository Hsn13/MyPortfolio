# Hasan Khesro — Portfolio

Personal portfolio and product site for Hasan Khesro, a Bahrain-based full-stack engineer and AI builder.

**Live site:** [my-portfolio-six-wheat-43.vercel.app](https://my-portfolio-six-wheat-43.vercel.app)

The site brings selected projects, career highlights, writing, and contact links into one place. It is built with Next.js App Router, TypeScript, Tailwind CSS, and Framer Motion.

## Project map

```text
.
├── .github/                 Repository-wide instructions and review prompts
├── README.md                Project overview, setup, and privacy notes
└── hasan-portfolio/         Next.js application and its npm package
    ├── app/                 Routes, shared layout, metadata, and API endpoints
    ├── components/          Home-page sections and reusable interactions
    ├── content/             Portfolio profile, projects, timeline, and posts
    └── public/              Static images and other public assets
```

### App flow

`app/layout.tsx` provides the shared fonts, metadata, motion provider, cursor, and analytics. The home page in `app/page.tsx` assembles the portfolio sections from `components/`; `/blog` and `/blog/[slug]` render journal entries, and `/api/chat` serves the optional assistant. The chat builds its context from shared profile data and calls Gemini only when configured.

**Where to edit:** Update bio, projects, skills, experience, and contact details in `content/knowledge.ts`; edit journal entries in `content/posts.ts`; change routes and page metadata in `app/`; update section UI and interactions in `components/`.

Journal posts are TypeScript objects (not Markdown/frontmatter). `npm run journal:update` collects recent articles from curated OpenAI, AWS, Google, Microsoft, NVIDIA, Meta, GitHub, Cloudflare, Ars Technica, Wired, InfoQ, Mozilla, and TechCrunch RSS feeds, then uses Gemini's Interactions API to draft a post with links only to those supplied sources. It considers up to 24 recent articles, capped at three per publisher, and defaults to `gemini-3.1-flash-lite` without Google Search grounding. The scheduled GitHub Actions workflow runs on the 1st and 15th and publishes only after audit, lint, build, and CodeQL succeed. Configure the repository secret `GEMINI_API_KEY` for a Google AI Studio project that has access to the selected model. To use a different model, set `GEMINI_MODEL`. To generate locally without changing the file, export `GEMINI_API_KEY` in your shell and run `npm run journal:update -- --dry-run`.

To use your own LinkedIn writing as optional voice and perspective context, export your LinkedIn data, select and paste the posts you want to use into a `LINKEDIN_WRITING_CONTEXT` GitHub Actions repository secret (Settings → Secrets and variables → Actions → New repository secret). Keep the value under 32,000 characters. The scheduled generator sends this selected text to Gemini as writing reference; RSS articles remain the only evidence and citation sources for current news. Update the secret manually when you want to refresh the snapshot. The generator does not connect to or scrape your LinkedIn account. Never use your LinkedIn password, browser cookies, or access tokens as workflow secrets.

### Component guide

- **Portfolio sections:** `Hero`, `ImpactDashboard`, `Projects`, `About`, `Timeline`, `Leadership`, `Skills`, `Contact`.
- **Navigation and conversations:** `Nav`, `CommandMenu`, `AIChat`.
- **Motion and visual effects:** `SystemsOrb`, `ScrollChrome`, `ScrollRevealText`, `ChapterBreak`, `CustomCursor`, `PageTransition`, `MotionProvider`.
- **Project presentation:** `CaseStudyModal`, `ProjectVisual`, and `icons`.

## Highlights

- Responsive portfolio with selected projects, impact, experience, and an engineering journal.
- Motion-led interactions with reduced-motion support.
- Optional “Ask Hasan AI” chat endpoint powered by Google Gemini.
- Vercel Web Analytics for site-usage metrics.
- Centralized portfolio content in `hasan-portfolio/content/knowledge.ts`.

## Run locally

```bash
git clone https://github.com/Hsn13/MyPortfolio.git
cd MyPortfolio/hasan-portfolio
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The portfolio works without environment variables. From `hasan-portfolio/`, add a Google AI Studio API key to `.env.local` to enable the chat route:

```dotenv
GEMINI_API_KEY=your_key_here
# Optional; defaults to gemini-flash-latest.
GEMINI_MODEL=gemini-flash-latest
```

Keep real credentials out of Git. `.env.local` is ignored; `.env.example` contains blank placeholders only.

## Checks

CI and local checks run from `hasan-portfolio/`:

```bash
npm run lint
npm run build
node --test scripts/update-journal.test.mjs
```

## Privacy and external services

Vercel Web Analytics is mounted in the site layout and may process site-usage information. When a visitor uses the AI chat, their submitted messages are sent from the server to Google Gemini to generate a response. Configure the deployment's provider credentials and publish any privacy disclosures required for your audience and jurisdictions.

## Copyright

All rights reserved. This public repository is provided for viewing; it does not grant a general license to reuse, modify, or redistribute the source, design, or portfolio content. See [`LICENSE`](./LICENSE). GitHub's own terms still govern viewing and forking on the platform.
