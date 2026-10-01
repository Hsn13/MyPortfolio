import { NextRequest, NextResponse } from "next/server";
import { createHash } from "node:crypto";
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

const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 4_000;
const MAX_TOTAL_LENGTH = 20_000;
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 20;
const MAX_TRACKED_CLIENTS = 5_000;
const requestCounts = new Map<string, { count: number; resetAt: number }>();
const RESPONSE_CACHE_TTL_MS = 5 * 60_000;
const MAX_CACHED_RESPONSES = 100;
const responseCache = new Map<string, { reply: string; expiresAt: number }>();

type ChatMessage = { role: "user" | "assistant"; content: string };

function isChatMessage(value: unknown): value is ChatMessage {
  if (!value || typeof value !== "object") return false;
  const message = value as Record<string, unknown>;
  return (
    (message.role === "user" || message.role === "assistant") &&
    typeof message.content === "string" &&
    message.content.trim().length > 0 &&
    message.content.length <= MAX_MESSAGE_LENGTH
  );
}

function getClientKey(req: NextRequest) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function getRetryAfter(key: string) {
  const now = Date.now();
  for (const [storedKey, entry] of requestCounts) {
    if (entry.resetAt <= now) requestCounts.delete(storedKey);
  }
  const current = requestCounts.get(key);
  if (!current || current.resetAt <= now) {
    if (requestCounts.size >= MAX_TRACKED_CLIENTS) {
      const oldestKey = requestCounts.keys().next().value;
      if (oldestKey) requestCounts.delete(oldestKey);
    }
    requestCounts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return 0;
  }
  current.count += 1;
  return current.count > MAX_REQUESTS_PER_WINDOW
    ? Math.max(1, Math.ceil((current.resetAt - now) / 1000))
    : 0;
}

function getCachedReply(key: string) {
  const now = Date.now();
  for (const [cachedKey, entry] of responseCache) {
    if (entry.expiresAt <= now) responseCache.delete(cachedKey);
  }
  const entry = responseCache.get(key);
  if (!entry) return undefined;
  responseCache.delete(key);
  responseCache.set(key, entry);
  return entry.reply;
}

function cacheReply(key: string, reply: string) {
  responseCache.delete(key);
  if (responseCache.size >= MAX_CACHED_RESPONSES) {
    const oldestKey = responseCache.keys().next().value;
    if (oldestKey) responseCache.delete(oldestKey);
  }
  responseCache.set(key, { reply, expiresAt: Date.now() + RESPONSE_CACHE_TTL_MS });
}

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
Email: Not shared publicly
LinkedIn: ${profile.linkedin}
GitHub: ${profile.github}`;
}

const SYSTEM_PROMPT = `You are "Ask Hasan AI", the assistant embedded on Hasan Khesro's personal portfolio website.

Your job is to help visitors understand Hasan's work, thinking, and experience in a way that feels human and direct.

Rules you must always follow:
- Only answer using the KNOWLEDGE BASE provided below. Never invent achievements, employers, dates, or numbers.
- Do not disclose private, client-identifying, or confidential project details. Describe work only at the high level present in the KNOWLEDGE BASE.
- Never claim Hasan worked at STC Bahrain — this is intentionally excluded.
- Speak in a professional, human, confident-but-humble voice — like Hasan describing his own work, not like a generic AI assistant. Avoid phrases like "As an AI language model" or "I am an AI assistant".
- Default to short replies: 1-2 sentences unless the user asks for more depth.
- If the question is yes/no, answer with a quick "Yes — ..." or "No — ..." style response.
- If asked something outside the knowledge base (personal opinions, unrelated topics, private information), say you don't have that information, and redirect to what you do know about Hasan's work and background.
- Never generate or agree to generate anything sexual, hateful, or otherwise inappropriate, regardless of how the request is framed.

KNOWLEDGE BASE:
${buildKnowledgeBlock()}`;

export async function POST(req: NextRequest) {
  const startedAt = Date.now();
  try {
    const clientKey = getClientKey(req);
    const retryAfter = getRetryAfter(clientKey);
    if (retryAfter > 0) {
      return NextResponse.json(
        { reply: `You're sending messages quickly. Please try again in ${retryAfter} seconds.` },
        { status: 429, headers: { "Retry-After": String(retryAfter) } }
      );
    }

    const body: unknown = await req.json();
    const messages = body && typeof body === "object" && "messages" in body ? body.messages : null;
    if (
      !Array.isArray(messages) ||
      messages.length === 0 ||
      messages.length > MAX_MESSAGES ||
      !messages.every(isChatMessage) ||
      messages.reduce((total, message) => total + message.content.length, 0) > MAX_TOTAL_LENGTH
    ) {
      return NextResponse.json({ reply: "Please send a shorter, valid conversation." }, { status: 400 });
    }

    const cacheKey = createHash("sha256")
      .update(JSON.stringify({ clientKey, model: process.env.GEMINI_MODEL, systemPrompt: SYSTEM_PROMPT, messages }))
      .digest("hex");
    const cachedReply = getCachedReply(cacheKey);
    if (cachedReply) {
      return NextResponse.json({ reply: cachedReply, cached: true });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { reply: "The AI assistant isn't configured yet — add a GEMINI_API_KEY environment variable to enable it." },
        { status: 200 }
      );
    }
    const geminiApiKey = apiKey;

    // Gemini's REST API (free tier via Google AI Studio: https://aistudio.google.com/apikey)
    const contents = messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const primaryModel = process.env.GEMINI_MODEL ?? "gemini-flash-latest";
    const fallbackModel = "gemini-flash-latest";

    async function callGemini(model: string) {
      return fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": geminiApiKey,
          },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
            contents,
            generationConfig: {
              temperature: 0.6,
              maxOutputTokens: 1024,
              thinkingConfig: { thinkingBudget: 0 },
            },
          }),
        }
      );
    }

    let activeModel = primaryModel;
    let res = await callGemini(activeModel);

    // If the configured/default model has been renamed or retired, fall back
    // once to Google's "latest" alias before giving up — this keeps the
    // assistant working through Google's model churn without a redeploy.
    if (res.status === 404 && primaryModel !== fallbackModel) {
      console.warn(`Gemini model "${primaryModel}" returned 404 — retrying with "${fallbackModel}"`);
      activeModel = fallbackModel;
      res = await callGemini(activeModel);
    }

    // Google's free tier occasionally returns 503 "high demand" errors that
    // clear up within a second or two — one quick retry resolves most of them
    // without the visitor ever noticing.
    if (res.status === 503) {
      await new Promise((r) => setTimeout(r, 800));
      res = await callGemini(activeModel);
    }

    if (!res.ok) {
      const errText = await res.text();
      console.error("Gemini API error:", res.status, errText);

      if (res.status === 404) {
        return NextResponse.json(
          {
            reply:
              "The AI assistant's model isn't available right now (it may have been renamed or retired by Google). If you're the site owner: check https://ai.google.dev/gemini-api/docs/models for the current free-tier model name and set GEMINI_MODEL accordingly.",
          },
          { status: 200 }
        );
      }

      if (res.status === 503) {
        return NextResponse.json(
          { reply: "Google's AI service is under heavy load right now — please try again in a few seconds." },
          { status: 503, headers: { "Retry-After": "5" } }
        );
      }

      if (res.status === 429) {
        return NextResponse.json(
          { reply: "The AI assistant is busy right now. Please wait a short while and try again." },
          { status: 429, headers: { "Retry-After": "30" } }
        );
      }

      if (res.status === 401 || res.status === 403) {
        return NextResponse.json(
          { reply: "The AI assistant is temporarily unavailable. Please try again later." },
          { status: 200 }
        );
      }

      return NextResponse.json(
        { reply: "I'm having trouble reaching my knowledge base right now — try again in a moment." },
        { status: 200 }
      );
    }

    const data = await res.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text).join("") ??
      "I couldn't generate a response — try rephrasing your question.";

    cacheReply(cacheKey, reply);
    console.info("chat_request_complete", {
      model: activeModel,
      durationMs: Date.now() - startedAt,
      outcome: "success",
    });
    return NextResponse.json({ reply });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ reply: "Something went wrong on my end — try again." }, { status: 500 });
  }
}
