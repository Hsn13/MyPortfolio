// Engineering Journal posts.
// These are DRAFTS — grounded in real, documented facts from content/knowledge.ts,
// written in first person as a starting point. Read through and edit the voice/
// specifics before treating these as truly "published." Add a new post by adding
// an entry here; the blog pages render automatically from this array.

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  date: string; // ISO, editable
  body: string[]; // paragraphs
}

export const posts: Post[] = [
  {
    slug: "shipping-rewear-bahrain-solo",
    title: "What Shipping ReWear Bahrain Solo Actually Taught Me",
    excerpt:
      "Notes on building a full product end to end — the API, the client, the reward mechanic — and what changes when there's no one else to hand a decision to.",
    tags: ["Product", "Engineering"],
    date: "2026-08-01",
    body: [
      "ReWear Bahrain started from a simple observation: people around me kept talking about wanting to give clothes a second life, but there was no easy way to actually do it. So I built one — a peer-to-peer platform where giving clothes earns Eco-Credits, and those credits get spent claiming items from neighbours across Bahrain. No money changes hands.",
      "Building it solo meant every decision was mine to make and mine to live with. The backend is an Express 5 API on MongoDB Atlas, with JWT auth and multer handling uploads. The frontend is React 19 on Vite, with React Router v7 and react-leaflet for neighbourhood-based discovery over OpenStreetMap. None of that stack was the hard part.",
      "The hard part was the credit economy itself — deciding what makes an exchange feel fair when there's no price tag to anchor it. That's a product question disguised as an engineering one, and it's the kind of decision that's easy to skip past when you're moving fast solo. I didn't skip it, and the app is better for it.",
      "The biggest lesson: owning a product end to end, from the reward mechanic down to deployment, surfaces how many small decisions a 'simple' idea actually hides. Working on ReWear Bahrain changed how I think about scope on every project since.",
    ],
  },
  {
    slug: "coordinating-ai-without-touching-the-model",
    title: "Coordinating an AI Project Without Touching the Model",
    excerpt:
      "On my role leading delivery of a predictive maintenance platform — and why project coordination on an AI team is a different skill than people assume.",
    tags: ["AI", "Project Management"],
    date: "2026-07-18",
    body: [
      "At INFINITEWARE, under the BRINC x Tamkeen Open Innovation Program, I coordinated delivery of an AI-driven predictive maintenance platform for a large industrial manufacturer in Bahrain. My role wasn't building the anomaly-detection model — it was making sure the people who did could actually ship it.",
      "That meant owning documentation, tracking milestones, and being the steady point of contact between engineers, data scientists, and business stakeholders who all had different definitions of 'done.' It meant running UI/UX workshops so the dashboard the model fed into was something operations teams would actually trust and use — because a 96.6% accurate model that nobody trusts is worth nothing.",
      "The thing nobody tells you about coordinating AI projects: most of the real risk isn't in the model, it's in the handoffs. Between data scientists and engineers. Between engineers and the business. Between a working prototype and something a real client will run their operations on. Coordinating well means noticing where those handoffs are about to fail before they do.",
      "Working on ~200,000 real SCADA data points under strict confidentiality also taught me a specific kind of discipline: how to talk about impressive work in enough detail to build trust, without ever naming who it was for. That balance shows up everywhere once you start looking for it.",
    ],
  },
  {
    slug: "sales-floor-to-software",
    title: "What the Sales Floor Taught Me About Building Software",
    excerpt:
      "Years in direct sales and customer service before writing production code — and why that order, not the other way around, was the useful one.",
    tags: ["Career", "Product"],
    date: "2026-06-30",
    body: [
      "Before most of my software work, I spent years in direct customer roles — Zain Bahrain, Massimo Dutti, and others. Direct sales teaches you something engineering degrees don't: what a person actually needs is rarely what they say first. You learn to ask the second and third question.",
      "At Zain, I went from missing an early target to leading a team of 5 and driving a 20% revenue increase, alongside a real lift in customer satisfaction. That arc — struggling, adjusting, then leading — is the same arc I now recognize in engineering work. The first attempt at a feature is rarely the right one either.",
      "The habit that carried over most directly: treating every technical decision as a conversation with someone who has to actually use the result. It's easy to build the version of a product that's satisfying to build. It's harder, and more valuable, to build the version that solves the problem the person in front of you actually has.",
      "I don't think of the sales years as separate from the engineering ones. They're the same skill, applied to a different surface.",
    ],
  },
];
