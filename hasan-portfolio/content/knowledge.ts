// Single source of truth for Hasan's profile, experience, and projects.
// Used both to render the site and to ground the "Ask Hasan AI" assistant,
// so the assistant can never say anything the site itself doesn't say.

export const profile = {
  name: "Hasan Khesro",
  role: "Full-Stack Engineer & AI Builder",
  location: "Muharraq, Bahrain",
  headline: "I build software that solves real problems.",
  subhead:
    "Full-stack engineer, AI builder, and project lead. I turn ideas into production-ready solutions by combining engineering, artificial intelligence, and project ownership.",
  pitch:
    "I build software from concept to production — and I've done it both ways: as the hands-on developer writing every line, and as the project coordinator aligning engineers, data scientists, and stakeholders on an AI system for a large industrial client. That range, deep technical execution plus real client and business experience, is what I bring to a team.",
  email: "hkhosro5@gmail.com",
  phone: "+973 3697 9663",
  linkedin: "https://www.linkedin.com/in/hasankhesro",
  github: "https://github.com/Hsn13",
};

export const impact = [
  { value: "96.6%", label: "Anomaly detection accuracy", detail: "Achieved on the predictive maintenance platform's ML model." },
  { value: "200K+", label: "Real SCADA data points", detail: "Industrial sensor data analyzed for the predictive maintenance platform." },
  { value: "150+", label: "Hackathon participants", detail: "Engaged through BUILD Hackathon, co-organized at Bahrain Polytechnic." },
  { value: "20%", label: "Revenue growth led", detail: "Driven through campaigns and retention while leading a team of 5 at Zain Bahrain." },
];

export const about = {
  eyebrow: "The person behind the products",
  paragraphs: [
    "I've always liked understanding how things work — diagnosing whatever was wrong with a PC, curious enough to take the long way round just to see the mechanism. I first encountered AI in grade 2 and remember wondering when something like it would actually exist. That question stuck.",
    "That curiosity turned into full-stack engineering, then into AI and automation, then into leading projects that connect technology with real business needs — coordinating a predictive-maintenance platform for an industrial client, building a peer-to-peer marketplace from scratch, and learning what actually matters to customers through years of direct sales and service roles.",
    "Today I work across engineering, AI, and delivery — writing code, coordinating teams, and turning ideas into things people actually use.",
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
    links: { demo: "https://rewearbh.netlify.app/", github: "https://github.com/Hsn13" },
    featured: true,
  },
  {
    id: "predictive-maintenance",
    order: 2,
    name: "AI Predictive Maintenance Platform",
    category: "Enterprise AI · Industrial Analytics",
    role: "Project Coordinator / Technical Delivery Lead",
    heroStatement:
      "An AI-driven predictive maintenance platform built for a large industrial manufacturer in Bahrain, turning operational sensor data into early-warning insight.",
    problem:
      "Unplanned industrial equipment failure means downtime, cost, and risk — and by the time a fault is visible, it's often too late to act cheaply.",
    solution:
      "An anomaly-detection pipeline trained on real SCADA sensor data, surfacing early warning signs of failure through a dashboard built for engineers and operations stakeholders.",
    myRole: [
      "Coordinated delivery across engineers, data scientists, and business stakeholders",
      "Owned documentation, milestone tracking, and client communication",
      "Supported prototyping, testing, and validation, and ran UI/UX refinement workshops",
    ],
    architecture: [
      "SCADA data ingestion → processing pipeline → ML anomaly-detection model → dashboard",
      "Next.js / React frontend, Node.js services, PostgreSQL, Python/Scikit-Learn for the model layer",
    ],
    challenges: [
      "Aligning engineers, data scientists, and business stakeholders on scope and priorities",
      "Working with ~200,000 real industrial data points under strict confidentiality",
      "Translating model output into something operations teams would actually trust and use",
    ],
    outcome:
      "Delivered a proof-of-concept reaching 96.6% anomaly-detection accuracy on real SCADA data, selected under the BRINC x Tamkeen Open Innovation Program.",
    tech: ["Next.js", "React", "Node.js", "PostgreSQL", "Python", "Scikit-Learn"],
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
    architecture: ["MERN-stack foundation"],
    challenges: ["Keeping the AI integration purposeful rather than decorative"],
    outcome: "A working exploration of AI-assisted product thinking.",
    tech: ["React", "Node.js", "MongoDB"],
    links: {},
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
    architecture: ["User query → LLM processing → knowledge retrieval (ChromaDB) → personalized response", "Django backend, LangChain, Gemini API, Streamlit interface, deployed on Render"],
    challenges: ["Keeping retrieved context relevant without overwhelming the model", "Designing prompts that stayed personalized rather than generic"],
    outcome: "A deployed, working RAG application generating personalized itineraries.",
    tech: ["Python", "Django", "Gemini API", "LangChain", "ChromaDB", "Streamlit"],
    links: {},
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
    body: "Project Manager at INFINITEWARE under the BRINC x Tamkeen Open Innovation Program, coordinating an AI-driven predictive maintenance platform for a large industrial client.",
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
