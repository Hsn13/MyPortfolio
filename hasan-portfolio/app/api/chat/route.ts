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

    // If an Interactions-style endpoint is provided via environment, use it.
    // This allows migrating to the Interactions API or a proxy without hardcoding
    // the exact vendor path in this code. Set `INTERACTIONS_ENDPOINT` to the
    // full URL (no query params) that accepts a POST and returns a JSON payload
    // containing generated text. Example (conceptual):
    // https://us-central1-generativeai.googleapis.com/v1/projects/PROJECT/locations/LOCATION/models/MODEL:predict
    const interactionsEndpoint = process.env.INTERACTIONS_ENDPOINT;
    let res;

    if (interactionsEndpoint) {
      // Send a Google Interactions-style payload. The `INTERACTIONS_ENDPOINT`
      // should be the full URL for your Interactions-compatible endpoint (no
      // query params). Example: https://generativelanguage.googleapis.com/v1beta/models/text-bison-001:predict
      // The body below follows a common Interactions-style shape: an `input`
      // object with `messages` where each message has `role` and `content`.
      // Adjust the shape if your provider expects a different schema.

      const interactionMessages = [
        { role: "system", content: [{ type: "text", text: SYSTEM_PROMPT }] },
        ...messages.map((m) => ({ role: m.role, content: [{ type: "text", text: m.content }] })),
      ];

      const payload = {
        input: {
          messages: interactionMessages,
        },
        // Use deterministic decoding to reduce hallucinations.
        temperature: 0,
        maxOutputTokens: 500,
      };

      res = await fetch(`${interactionsEndpoint}?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      const model = process.env.GEMINI_MODEL ?? "gemini-2.0-flash";

      res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
            contents,
            generationConfig: { temperature: 0, maxOutputTokens: 500 },
          }),
        }
      );
    }

    if (!res.ok) {
      const errText = await res.text();
      console.error("Gemini API error:", errText);

      // If the model is not found, give a clearer developer-facing hint.
      if (res.status === 404) {
        // Try a simple local retrieval from the knowledge base as a temporary fallback.
        const kbFallback = (() => {
          try {
            const query = messages[messages.length - 1]?.content ?? "";
            const lines = SYSTEM_PROMPT.split("\n").map((l) => l.trim()).filter(Boolean);
            const tokens = Array.from(new Set((query.toLowerCase().match(/\b\w{4,}\b/g) || []).slice(0, 10)));
            if (!tokens.length) return null;
            const hits: string[] = [];
            for (const line of lines) {
              const low = line.toLowerCase();
              if (tokens.some((t) => low.includes(t))) {
                hits.push(line);
                if (hits.length >= 6) break;
              }
            }
            return hits.length ? hits.join("\n\n") : null;
          } catch (e) {
            console.error("KB fallback error:", e);
            return null;
          }
        })();

        if (kbFallback) {
          return NextResponse.json({ reply: kbFallback }, { status: 200 });
        }

        return NextResponse.json(
          {
            reply:
              "The configured Gemini model is not available. Update the GEMINI_MODEL env var to a supported model or migrate to the Interactions API.",
          },
          { status: 200 }
        );
      }

      return NextResponse.json(
        { reply: "I'm having trouble reaching my knowledge base right now — try again in a moment." },
        { status: 200 }
      );
    }

    const data = await res.json();

    // Try a few common response shapes for Interactions/Generative APIs.
    let reply: string | null = null;

    // 1) Existing generateContent shape
    reply =
      reply ||
      data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text).join("");

    // 2) Interactions-style: look for `output` or `responses` fields
    if (!reply) {
      // Example: { output: [{ content: [{ text: "..." }] }] }
      const out = data?.output ?? data?.responses ?? data?.messages;
      if (Array.isArray(out)) {
        const texts: string[] = [];
        for (const item of out) {
          if (item?.content) {
            const parts = Array.isArray(item.content) ? item.content : [item.content];
            for (const p of parts) {
              if (typeof p === "string") texts.push(p);
              if (p?.text) texts.push(p.text);
            }
          }
          if (item?.text) texts.push(item.text);
        }
        if (texts.length) reply = texts.join("\n\n");
      }
    }

    // 3) Fallback: join any top-level strings
    if (!reply) {
      try {
        const flatTexts: string[] = [];
        JSON.stringify(data, (_, v) => {
          if (typeof v === "string" && v.length > 20) flatTexts.push(v);
          return v;
        });
        if (flatTexts.length) reply = flatTexts[0];
      } catch (e) {
        // ignore
      }
    }

    reply = reply ?? "I couldn't generate a response — try rephrasing your question.";

    // Verification: ensure at least part of the reply is grounded in the knowledge base.
    try {
      const kbText = SYSTEM_PROMPT.toLowerCase();
      const sentences = reply.split(/[\.\!?]+/).map((s) => s.trim()).filter(Boolean);
      let verified = false;
      for (const s of sentences) {
        const words = (s.toLowerCase().match(/\b\w{6,}\b/g) || []).slice(0, 12);
        if (!words.length) continue;
        let matchCount = 0;
        for (const w of words) {
          if (kbText.includes(w)) matchCount++;
          if (matchCount >= Math.max(1, Math.floor(words.length / 3))) {
            verified = true;
            break;
          }
        }
        if (verified) break;
      }
      if (!verified) {
        reply = "I don't have that information in the knowledge base. Ask something else or try a broader question.";
      }
    } catch (e) {
      // If verification fails unexpectedly, fall back to the generated reply.
      console.error('KB verification error:', e);
    }

    return NextResponse.json({ reply });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ reply: "Something went wrong on my end — try again." }, { status: 200 });
  }
}
