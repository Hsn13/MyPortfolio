# Hasan Khesro Portfolio

This repository contains the portfolio website and two separate public demo applications.

## Portfolio app

```bash
cd hasan-portfolio
npm install
cp .env.example .env.local
npm run dev
```

Open <http://localhost:3000>. Validate with:

```bash
npm run lint
npm run build
npm audit
```

## Public demos

- [VERDÉ AI commerce demo](https://github.com/Hsn13/verde-ai-commerce-demo)
- [Roamwise AI travel assistant demo](https://github.com/Hsn13/ai-travel-assistant-demo)

Each demo is an original, self-contained portfolio demonstration using synthetic local data. The industrial predictive-maintenance and government committee projects remain represented only by sanitized portfolio descriptions; no confidential code or data is published.

## Repository layout

- `hasan-portfolio/` — Next.js portfolio application.
- `.github/` — Copilot instructions and UI/doctor prompts.
- `generated-projects/` — local-only working copies of the separate demo repositories; ignored by the root repository.
