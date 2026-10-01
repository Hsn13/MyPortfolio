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
  sources?: { title: string; url: string }[];
}

export const posts: Post[] = [
  {
    "slug": "the-strategic-shift-toward-sovereign-ai-inference",
    "title": "The Strategic Shift Toward Sovereign AI Inference",
    "excerpt": "New developments in regional model deployment reflect a growing global priority for data sovereignty and localized AI infrastructure.",
    "tags": [
      "AI",
      "Data Sovereignty",
      "Cloud Computing"
    ],
    "date": "2026-09-30",
    "body": [
      "Recent updates from the AWS Machine Learning Blog highlight a significant expansion in geographic cross-Region inference, with Anthropic's Claude models now supported for in-country processing in India and in-region inference for South Korea and Singapore. This technical shift moves beyond centralized data processing, allowing organizations to maintain control over where their data is handled while utilizing high-performance large language models.",
      "For businesses and developers in Bahrain, these developments serve as a critical reminder of the evolving relationship between data residency and AI utility. As major cloud providers prioritize local inference capabilities, the barriers to adopting sophisticated AI—such as complex compliance requirements regarding data cross-border transfers—are becoming more manageable. This allows for more secure implementation of professional workloads, such as automated contract intelligence and complex business workflow orchestration.",
      "However, as noted by recent industry reporting, these advancements must be balanced with caution. While infrastructure becomes more localized, the core challenge of ensuring the reliability of these agents—ranging from hallucination risks in public-facing government chatbots to the governance of autonomous agentic avatars—remains a shared concern. For local organizations, the focus should remain on developing robust frameworks for oversight while leveraging these new regional technical capabilities to enhance operational efficiency."
    ],
    "sources": [
      {
        "title": "Amazon Bedrock expands Claude model availability to in-country inferencing in India",
        "url": "https://aws.amazon.com/blogs/machine-learning/amazon-bedrock-expands-claude-model-availability-to-india-cross-region-inference/"
      },
      {
        "title": "Introducing Anthropic models on Amazon Bedrock for in-region inference in Seoul and Singapore",
        "url": "https://aws.amazon.com/blogs/machine-learning/introducing-anthropic-models-on-amazon-bedrock-for-in-region-inference-in-seoul-and-singapore/"
      },
      {
        "title": "Can a chatbot fix the government maze? The White House is about to find out",
        "url": "https://techcrunch.com/2026/09/29/can-a-chatbot-fix-the-government-maze-the-white-house-is-about-to-find-out/"
      },
      {
        "title": "Building an AI-powered contract intelligence platform with Amazon Quick and Amazon Bedrock AgentCore",
        "url": "https://aws.amazon.com/blogs/machine-learning/building-an-ai-powered-contract-intelligence-platform-with-amazon-quick-and-amazon-bedrock-agentcore/"
      }
    ]
  },
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
    slug: "coordinating-cross-functional-product-work",
    title: "What Cross-Functional Product Delivery Taught Me",
    excerpt:
      "Why clear priorities, communication, and shared ownership matter when technical and product teams work together.",
    tags: ["AI", "Project Management"],
    date: "2026-07-18",
    body: [
      "On a cross-functional product initiative, my role was to help the people doing the technical work move toward a shared outcome. That meant keeping priorities clear and making sure decisions did not get lost between teams.",
      "I owned documentation and milestone tracking, and helped keep communication moving between technical contributors and business stakeholders. I also supported product refinement so the result stayed understandable and useful to the people it was meant to serve.",
      "The thing I keep learning about delivery is that progress depends on the handoffs as much as the individual work. Clear expectations and timely communication help teams catch misunderstandings before they turn into rework.",
      "That experience reinforced a simple discipline: share the skills and lessons, while keeping private project specifics private.",
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
  {
    slug: "building-quietly-in-public",
    title: "Building Quietly in Public",
    excerpt:
      "Why I started shipping personal projects in public, and what it taught me about learning faster than my comfort zone likes.",
    tags: ["Build in Public", "Career"],
    date: "2025-09-14",
    body: [
      "A lot of my best learning has come from building things without waiting for the perfect brief or perfect timing. ReWear Bahrain, the AI demos, and the smaller experiments I keep shipping all share the same core idea: don't wait for permission to learn in public.",
      "The benefit isn't just showing progress — it's forcing clarity. When something has to work for a real person, the weak spots become obvious quickly. You find out whether the idea is useful, whether the experience is understandable, and whether the flow from 'idea' to 'used product' really exists.",
      "I like shipping small enough that the risk is manageable and the feedback is honest. That's where the real growth happens: not in polished demos, but in messy products that teach you how to think better while you're building.",
      "That mindset changed how I work. I now look for the thing I can build this week, test with real feedback, and improve with better judgment next week.",
    ],
  },
  {
    slug: "what-i-learned-from-leading-a-team",
    title: "What I Learned From Leading a Team",
    excerpt:
      "The difference between being technically capable and being the person other people trust to carry a result forward.",
    tags: ["Leadership", "Delivery"],
    date: "2024-11-06",
    body: [
      "Leadership is not the same thing as being the loudest person in the room. A lot of the work is just creating enough clarity that the team can move without friction, and then helping the work stay grounded in what actually matters to the user or client.",
      "At Zain Bahrain, I learned that leading people means understanding performance, coaching, and context. You can't push output by only focusing on targets; you have to help people see the problem clearly and fix the parts that are slowing them down. That lesson still informs how I work with engineers and stakeholders today.",
      "The same is true in technical work. If the team doesn't agree on what success looks like, the project will drift into vague progress and late surprises. Good delivery is designed before it is delegated.",
      "I value people who can keep momentum without losing detail, and I try to bring that same balance into my own work.",
    ],
  },
  {
    slug: "from-curiosity-to-technical-identity",
    title: "From Curiosity to Technical Identity",
    excerpt:
      "How a childhood fascination with how things work turned into a career built around systems, AI, and product thinking.",
    tags: ["Personal", "Career"],
    date: "2023-06-21",
    body: [
      "I still remember the first time I had the feeling that technology was more than a tool — it was a way of understanding the world. I was curious about how things were built, how they failed, and how they could be improved. That instinct never really left me.",
      "That foundation led to software engineering, then AI, then product work. Along the way, I learned that building things well isn't only about writing clean code. It's also about understanding the real-world problem, listening to the people affected by it, and designing something they can trust and use.",
      "The path hasn't been linear, and I don't think it needs to be. A lot of what shaped my work was learning through people, platforms, and systems, not just through classwork or tutorials. That mix is what makes the work feel like mine.",
      "The deeper I go into software and AI, the more I respect the part that isn't technical: the judgment, communication, and patience it takes to make a real thing happen.",
    ],
  },
];
