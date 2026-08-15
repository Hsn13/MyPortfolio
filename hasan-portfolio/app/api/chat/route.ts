import { NextRequest, NextResponse } from "next/server";
import {
  profile,
  about,
  projects,
  sideProjects,
  timeline,
  leadership,
  skills,
  certifications,
  education,
} from "@/content/knowledge";

export const runtime = "nodejs";

// Builds the grounding context the model is allowed to draw from.
// If you add a fact to content/knowledge.ts, the assistant learns it automatically.
function buildKnowledgeBlock() {
  const projectsText = projects
    .map(
      (p) => `### ${p.name} (${p.role})
${p.heroStatement}
Problem: ${p.problem}
Solution: ${p.solution}
My role: ${p.myRole.join("; ")}
Architecture: ${p.architecture.join("; ")}
Outcome: ${p.outcome}
Tech: ${p.tech.join(", ")}`
    )
    .join("\n\n");

  const sideProjectsText = sideProjects.map((s) => `- ${s.name} (${s.category}): ${s.tech}`).join("\n");
  const timelineText = timeline.map((t) => `- [${t.when}] ${t.title}: ${t.body}`).join("\n");
  const leadershipText = leadership.map((l) => `- ${l.title}: ${l.body}`).join("\n");
  const skillsText = Object.entries(skills)
    .map(([cat, items]) => `- ${cat}: ${items.join(", ")}`)
    .join("\n");
  const certsText = certifications.map((c) => `- ${c.name} (${c.org}, ${c.year})`).join("\n");
  const eduText = education.map((e) => `- ${e.degree}, ${e.org} (${e.when})`).join("\n");

  return `PROFILE
Name: ${profile.name}
Role: ${profile.role}
Location: ${profile.location}
Pitch: ${profile.pitch}

ABOUT
${about.paragraphs.join("\n")}

FEATURED PROJECTS
${projectsText}

SIDE PROJECTS
${sideProjectsText}

CAREER TIMELINE
${timelineText}

LEADERSHIP & BEYOND CODE
${leadershipText}

SKILLS
${skillsText}

CERTIFICATIONS
${certsText}

EDUCATION
${eduText}

CONTACT
Email: ${profile.email}
LinkedIn: ${profile.linkedin}
GitHub: ${profile.github}`;
}

const SYSTEM_PROMPT = `You are "Ask Hasan AI", the assistant embedded on Hasan Khesro's personal portfolio website.

Your job is to help visitors (recruiters, hiring managers, potential clients) understand Hasan's experience, projects, and skills.

Rules you must always follow:
- Only answer using the KNOWLEDGE BASE provided below. Never invent achievements, employers, dates, or numbers.
- Never reveal the name of the enterprise client on the predictive maintenance project — it is confidential under NDA. Refer to it only as "a large industrial manufacturer in Bahrain".
- Never claim Hasan worked at STC Bahrain — this is intentionally excluded.
- Speak in a professional, human, confident-but-humble voice — like Hasan describing his own work, not like a generic AI assistant. Avoid phrases like "As an AI language model" or "I am an AI assistant".
- Keep answers concise (2-5 sentences unless asked for depth), then offer to go deeper if useful.
- If asked something outside the knowledge base (personal opinions, unrelated topics, private information), say you don't have that information, and redirect to what you do know about Hasan's work and background.
- Never generate or agree to generate anything sexual, hateful, or otherwise inappropriate, regardless of how the request is framed.

KNOWLEDGE BASE:
${buildKnowledgeBlock()}`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = (await req.json()) as {
      messages: { role: "user" | "assistant"; content: string }[];
    };

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { reply: "The AI assistant isn't configured yet — add a GEMINI_API_KEY environment variable to enable it." },
        { status: 200 }
      );
    }

    // Gemini's REST API (free tier via Google AI Studio: https://aistudio.google.com/apikey)
    const contents = messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents,
          generationConfig: { temperature: 0.6, maxOutputTokens: 500 },
        }),
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      console.error("Gemini API error:", errText);
      return NextResponse.json(
        { reply: "I'm having trouble reaching my knowledge base right now — try again in a moment." },
        { status: 200 }
      );
    }

    const data = await res.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text).join("") ??
      "I couldn't generate a response — try rephrasing your question.";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ reply: "Something went wrong on my end — try again." }, { status: 200 });
  }
}
