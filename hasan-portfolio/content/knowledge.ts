// Single source of truth for Hasan's profile, experience, and projects.
// Used both to render the site and to ground the "Ask Hasan AI" assistant,
// so the assistant can never say anything the site itself doesn't say.

export const profile = {
  name: "Hasan Khesro",
  role: "Full-Stack Engineer & AI Builder",
  location: "Bahrain",
  headline: "I build software that solves real problems.",
  subhead:
    "I work across engineering, product thinking, and practical AI to take ideas from first sketch to shipped product.",
  pitch:
    "I build software from concept to production, and I enjoy the full loop: understanding the problem, shipping the product, and helping teams align around what matters. That mix of technical depth, product thinking, and delivery experience is what I bring to a project.",
  email: "",
  phone: "",
  linkedin: "https://www.linkedin.com/in/hasankhesro",
  github: "https://github.com/Hsn13",
};

export const impact = [
  { value: "150+", label: "Hackathon participants", detail: "Engaged through BUILD Hackathon, co-organized at Bahrain Polytechnic." },
  { value: "20%", label: "Revenue growth led", detail: "Driven through campaigns and retention while leading a team of 5 at Zain Bahrain." },
];

export const about = {
  eyebrow: "The person behind the products",
  paragraphs: [
    "I’ve always liked understanding how things work — taking apart old devices, learning the mechanics behind a system, and then trying to build something better from that understanding. I first encountered AI in grade school and remember thinking, 'When will this actually become real?' That question stayed with me.",
    "That curiosity grew into full-stack engineering, then AI work, then product and delivery. I’ve coordinated a cross-functional AI product initiative, built a peer-to-peer marketplace from scratch, and learned a lot from direct sales and customer-facing roles about what people actually need, not just what they say they want.",
    "Today I work across engineering, AI, and product thinking — writing code, leading delivery, and creating solutions that are useful enough to keep growing beyond a prototype.",
  ],
};

export type ProjectId =
  | "rewear"
  | "predictive-maintenance"
  | "mofne"
  | "verde"
  | "travel-ai";

export interface Project {
  id: ProjectId;
  order: number;
  name: string;
  category: string;
  role: string;
  heroStatement: string;
  problem: string;
  solution: string;
  myRole: string[];
  architecture: string[];
  challenges: string[];
  outcome: string;
  lessons?: string;
  tech: string[];
  links: { github?: string; demo?: string };
  featured: boolean;
  /** Path under /public, e.g. "/images/projects/rewear-1.png". Leave empty to show a placeholder. */
  screenshot?: string;
}

export const projects: Project[] = [
  {
    id: "rewear",
    order: 1,
    name: "ReWear Bahrain",
    category: "Full-Stack Product · Sustainability",
    role: "Founder / Full-Stack Developer",
    heroStatement:
      "A sustainability marketplace that turns clothing reuse into a rewarding experience through an Eco-Credit system — no money, no middlemen.",
    problem:
      "Fast fashion creates waste that's easy to feel bad about and hard to act on. People want to give clothes a second life, but there's no motivation, tracking, or community around doing it.",
    solution:
      "A peer-to-peer platform where giving clothes earns Eco-Credits, and those credits are spent claiming items from neighbours across Bahrain — turning a good habit into a rewarding one.",
    myRole: [
      "Designed the product concept and the Eco-Credit mechanic end to end",
      "Built the REST API (Express 5, MongoDB Atlas, JWT auth) solo",
      "Built the web client (React 19, Vite, React Router v7) solo",
      "Handled data modelling, geolocation-based discovery, and deployment",
    ],
    architecture: [
      "React 19 + Vite frontend, React Router v7, Axios with a JWT interceptor",
      "react-leaflet + Leaflet (OpenStreetMap) for neighbourhood-based discovery",
      "Express 5 REST API, MongoDB Atlas via Mongoose 8",
      "JWT + bcrypt auth, multer for image uploads",
    ],
    challenges: [
      "Designing a credit economy that felt fair without using real money",
      "Geolocation-based discovery across Bahrain's neighbourhoods with a free map stack",
      "Shipping both the API and the client solo, end to end",
    ],
    outcome:
      "Built and shipped as a complete working product, not a prototype — live and usable today.",
    lessons:
      "Owning a product solo, from the reward mechanic down to the deployment, taught me how many small decisions a 'simple' idea actually hides.",
    tech: ["React 19", "Vite", "Express 5", "MongoDB Atlas", "JWT", "Leaflet"],
    screenshot: "/images/projects/ReWear.png",
    links: { demo: "https://rewearbh.netlify.app/", github: "https://github.com/Hsn13" },
    featured: true,
  },
  {
    id: "predictive-maintenance",
    order: 2,
    name: "Applied AI Delivery",
    category: "AI · Product Delivery",
    role: "Project Coordinator / Technical Delivery Lead",
    heroStatement:
      "Coordinated a cross-functional AI proof of concept, helping teams turn a complex product goal into a clear, usable delivery.",
    problem:
      "Complex product initiatives can lose momentum when teams, priorities, and stakeholder expectations are not aligned.",
    solution:
      "A coordinated delivery process that aligned technical work, stakeholder feedback, and product decisions around a shared outcome.",
    myRole: [
      "Coordinated delivery across engineers, data scientists, and business stakeholders",
      "Owned documentation, milestone tracking, and client communication",
      "Supported prototyping, testing, and UI/UX refinement",
    ],
    architecture: ["Cross-functional product delivery spanning technical and stakeholder workstreams"],
    challenges: [
      "Keeping teams aligned on scope, priorities, and a shared definition of success",
      "Translating technical progress into clear, usable product decisions",
    ],
    outcome:
      "Helped move a multi-disciplinary AI initiative from planning through a validated proof of concept.",
    tech: ["Product Delivery", "AI", "Stakeholder Alignment", "UI/UX"],
    screenshot: "/images/projects/AI.png",
    links: {},
    featured: true,
  },
  {
    id: "mofne",
    order: 3,
    name: "Committee Management Platform",
    category: "Government Digital Transformation",
    role: "Project Coordinator / Developer",
    heroStatement:
      "A bilingual (Arabic/English) committee-management system built for Bahrain's Ministry of Finance and National Economy.",
    problem:
      "Committee operations relied on manual scheduling and scattered documents, making meetings, action items, and reporting hard to track.",
    solution:
      "A centralized, bilingual workflow platform covering meeting scheduling, action-item tracking, and meeting minutes.",
    myRole: [
      "Requirements analysis and workflow planning with a 3-person capstone team",
      "System design support and platform development on OutSystems",
      "Stakeholder communication across the delivery",
    ],
    architecture: ["OutSystems O11 low-code platform", "AWS-hosted", "Bilingual UI (Arabic/English)"],
    challenges: ["Bilingual UX without duplicating logic", "Modelling committee workflows accurately in a low-code platform"],
    outcome: "Delivered as a 3-person capstone team for a real government stakeholder.",
    tech: ["OutSystems", "AWS", "Low-Code"],
    screenshot: "/images/projects/MoFNE.png",
    links: {},
    featured: true,
  },
  {
    id: "verde",
    order: 4,
    name: "VERDÉ",
    category: "AI / Product Innovation",
    role: "Developer",
    heroStatement: "A product-thinking-led exploration into AI-assisted commerce.",
    problem: "Understanding where AI can add real product value rather than being bolted on for its own sake.",
    solution: "A focused build exploring practical AI integration into a commerce-style experience.",
    myRole: ["Product concept and build"],
    architecture: ["Original exploration: MERN-stack foundation", "Public portfolio demo: React + Vite with deterministic local recommendations"],
    challenges: ["Keeping the AI integration purposeful rather than decorative"],
    outcome: "A working exploration of AI-assisted product thinking.",
    tech: ["React", "Node.js", "MongoDB"],
    screenshot: "/images/projects/verde-dashboard.png",
    links: { github: "https://github.com/Hsn13/verde-ai-commerce-demo" },
    featured: true,
  },
  {
    id: "travel-ai",
    order: 5,
    name: "AI Travel Assistant",
    category: "LLM Application · RAG System",
    role: "Developer",
    heroStatement:
      "An AI-powered travel companion that generates personalized itinerary recommendations using retrieval-augmented generation.",
    problem: "Generic travel recommendations ignore a traveller's actual preferences and constraints.",
    solution:
      "A RAG pipeline over travel knowledge, paired with the Gemini LLM, to generate itineraries personalized to the traveller.",
    myRole: ["Built the RAG pipeline, backend, and interface end to end"],
    architecture: ["Original concept: user query → LLM processing → knowledge retrieval (ChromaDB) → personalized response", "Public portfolio demo: React + Vite with deterministic local itinerary generation"],
    challenges: ["Keeping retrieved context relevant without overwhelming the model", "Designing prompts that stayed personalized rather than generic"],
    outcome: "A deployed, working RAG application generating personalized itineraries.",
    tech: ["Python", "Django", "Gemini API", "LangChain", "ChromaDB", "Streamlit"],
    screenshot: "/images/projects/travel-ai-planner.png",
    links: { github: "https://github.com/Hsn13/ai-travel-assistant-demo" },
    featured: true,
  },
];

export const sideProjects = [
  { name: "Football RAG Chat Assistant", category: "AI Experiment", tech: "Python, Django, Gemini, LangChain, ChromaDB" },
  { name: "MyMeds", category: "Learning Build", tech: "Node.js, Express, MongoDB, EJS, bcrypt" },
  { name: "ServiceHub", category: "Learning Build", tech: "Node.js, Express, MongoDB" },
  { name: "Borrow My Charger", category: "University Project", tech: "PHP MVC, MySQL, AJAX, Google Maps API" },
  { name: "Sudoku Solver", category: "Algorithm Practice", tech: "Go" },
  { name: "Bingo Game", category: "Prototype", tech: "JavaScript" },
  { name: "GuardingYourFeed", category: "Prototype", tech: "JavaScript" },
];

export const timeline = [
  {
    stage: "Early Curiosity",
    when: "Grade school",
    title: "Understanding how things work",
    body: "Diagnosing PCs, curious about computers long before it was a career plan — and a first real encounter with AI in grade 2 that left a lasting question: when will this actually arrive?",
  },
  {
    stage: "Education",
    when: "2020 – 2026",
    title: "Engineering foundations",
    body: "Started a Software Engineering degree at the University of Bahrain, then transferred into Bahrain Polytechnic's ICT program, later adding General Assembly's Software Engineering Immersive.",
  },
  {
    stage: "Customer & Business Understanding",
    when: "2021 – 2025",
    title: "Direct sales and service roles",
    body: "Zain Bahrain, Massimo Dutti, and Silah Gulf — years of direct customer interaction. Grew from individual sales into leading a team of 5, driving a 20% revenue increase and a 15% lift in customer satisfaction.",
  },
  {
    stage: "Community Leadership",
    when: "2021 – 2026",
    title: "Beyond the classroom",
    body: "Executive Member & Financial Treasurer of Bahrain Polytechnic's Developer Club; co-organized BUILD Hackathon, the first student-led hackathon at the Polytechnic, engaging 150+ students.",
  },
  {
    stage: "Technical Delivery",
    when: "Nov 2025 – Present",
    title: "Enterprise AI coordination",
    body: "Project Manager coordinating a cross-functional AI product initiative, aligning technical delivery and stakeholder needs.",
  },
  {
    stage: "Product Building",
    when: "Ongoing",
    title: "Combining engineering, AI, and product thinking",
    body: "Building ReWear Bahrain solo, end to end — the current expression of turning an idea into a real, working product.",
  },
];

export const leadership = [
  {
    title: "Developer Club — Executive Member & Financial Treasurer",
    body: "Two years as the face of software/AI/ML/ICT at Bahrain Polytechnic's Developer Club, running workshops and representing the club at expos and exhibitions.",
  },
  {
    title: "BUILD Hackathon — Co-Organizer",
    body: "Co-organized the first student-led hackathon at Bahrain Polytechnic, in partnership with Reboot — 3 days, 150+ students, managing event finances and logistics.",
  },
  {
    title: "Reboot Cybersecurity Track — Facilitator",
    body: "Facilitated a 3-day cybersecurity school/university track at AICS, Exhibition World Bahrain.",
  },
  {
    title: "Model United Nations — Best Position Paper",
    body: "Won Best Position Paper at IKMUN, representing Vietnam in a cartel-focused committee.",
  },
  {
    title: "House Captain — Ruby House",
    body: "Represented Ruby house at Alnoor School across all inter-house activities and competitions, reporting directly to the head of uniform.",
  },
  {
    title: "Competitive Athletics",
    body: "50+ medals and certificates across track and field and other competitions (grade 2–12), including model making, poetry, spelling bee, acting, and physics experiments.",
  },
];

export const skills = {
  Engineering: ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Express", "PHP (MVC)", "Java", "C#"],
  "AI & Machine Learning": ["LLMs", "RAG", "LangChain", "Prompt Engineering", "Gemini API", "Scikit-Learn", "Pandas", "NumPy"],
  "Cloud & DevOps": ["AWS Cloud Security", "Git/GitHub", "Vercel", "Render", "OutSystems"],
  "Product & Leadership": ["Project Coordination", "Agile/Scrum", "Stakeholder Management", "Client Communication", "B2C & B2B Sales"],
};

export const certifications = [
  { name: "Microsoft Certified: Power Platform Developer Associate (PL-400)", org: "Microsoft", year: "2024" },
  { name: "AWS Academy Cloud Security Foundations", org: "AWS Academy", year: "2025" },
  { name: "Getting Started with Deep Learning", org: "NVIDIA Deep Learning Institute", year: "2024" },
  { name: "Entry Level Certificate in Employability Skills", org: "NOCN", year: "2022" },
];

export const education = [
  { degree: "B'ICT — Computer Programming", org: "Bahrain Polytechnic", when: "Sep 2022 – May 2026" },
  { degree: "Software Engineering Immersive (Part-Time)", org: "General Assembly Middle East", when: "Nov 2025 – May 2026" },
  { degree: "Software Engineering & Java Bootcamp", org: "Skills Union", when: "Jan – Jun 2025" },
  { degree: "Software Engineering (transferred)", org: "University of Bahrain", when: "2020 – 2022" },
];
