"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

const STARTERS = [
  "Would Hasan fit a software engineering role?",
  "Explain ReWear Bahrain",
  "What AI projects has Hasan built?",
  "Tell me about Hasan's leadership experience",
];

function ChatPanel({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    if (!text.trim() || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", content: data.reply ?? "Something went wrong — try again." }]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: "I couldn't reach the server. Try again in a moment." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 24, scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-24 right-4 z-50 flex h-[70vh] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-surface-2 shadow-2xl md:right-6 md:h-[560px]"
    >
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <p className="text-sm font-semibold text-ink">Ask Hasan AI</p>
          <p className="text-xs text-muted">Grounded in his real projects & experience</p>
        </div>
        <button onClick={onClose} aria-label="Close chat" className="text-muted hover:text-ink">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
        {messages.length === 0 && (
          <div className="space-y-2">
            <p className="text-sm text-muted">Ask me anything about Hasan's work, projects, or experience.</p>
            <div className="flex flex-col gap-2 pt-2">
              {STARTERS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-lg border border-border px-3 py-2 text-left text-xs text-muted transition-colors hover:border-emerald hover:text-ink"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
                m.role === "user" ? "bg-emerald text-[#04120d]" : "bg-surface border border-border text-ink"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-xs text-muted">
            <Loader2 className="h-3.5 w-3.5 animate-spin" /> Thinking…
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-center gap-2 border-t border-border p-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about a project, skill, or role fit…"
          className="flex-1 rounded-full border border-border bg-bg px-4 py-2.5 text-sm text-ink outline-none focus:border-emerald"
        />
        <button
          type="submit"
          disabled={loading}
          aria-label="Send"
          className="rounded-full bg-emerald p-2.5 text-[#04120d] disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </motion.div>
  );
}

export default function AIChat() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section id="ai" className="border-t border-border py-24 md:py-32">
        <div className="container-px mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-muted">Signature feature</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl">Ask Hasan AI</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            A live assistant grounded only in Hasan's real projects, experience, and skills — ask it what a
            resume can't answer.
          </p>
          <button
            onClick={() => setOpen(true)}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald px-6 py-3 text-sm font-semibold text-[#04120d]"
          >
            <MessageCircle className="h-4 w-4" />
            Start a conversation
          </button>
        </div>
      </section>

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle Ask Hasan AI"
        className="fixed bottom-6 right-4 z-50 flex items-center gap-2 rounded-full bg-emerald px-5 py-3.5 text-sm font-semibold text-[#04120d] shadow-lg md:right-6"
      >
        <MessageCircle className="h-4 w-4" />
        Ask Hasan AI
      </button>

      <AnimatePresence>{open && <ChatPanel onClose={() => setOpen(false)} />}</AnimatePresence>
    </>
  );
}
