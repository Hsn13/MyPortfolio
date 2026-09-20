"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, Sparkles, ArrowUpRight } from "lucide-react";

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
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

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
      id="ai-chat-dialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-chat-title"
      className="fixed bottom-24 right-4 z-50 flex h-[min(680px,calc(100dvh-7rem))] w-[calc(100vw-2rem)] max-w-md flex-col overflow-hidden rounded-2xl border border-border bg-surface-2 shadow-[0_24px_80px_rgba(0,0,0,0.28)] md:right-8"
    >
      <div className="relative overflow-hidden border-b border-border bg-emerald px-5 py-5 text-[#201515]">
        <div className="absolute -right-5 -top-8 h-28 w-28 rounded-full border border-[#201515]/20" />
        <div className="relative flex items-start justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em]">
              <Sparkles className="h-3.5 w-3.5" /> Signature assistant
            </div>
            <p id="ai-chat-title" className="text-lg font-semibold">Ask Hasan AI</p>
            <p className="mt-1 max-w-[15rem] text-xs text-[#201515]/70">Grounded in his real projects & experience</p>
          </div>
          <button ref={closeRef} onClick={onClose} aria-label="Close chat" className="rounded-full p-2 text-[#201515]/70 transition-colors hover:bg-[#201515]/10 hover:text-[#201515]">
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
        {messages.length === 0 && (
          <div className="space-y-2">
            <p className="text-sm text-muted">Ask me anything about Hasan&apos;s work, projects, or experience.</p>
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
                m.role === "user" ? "bg-emerald text-[#201515]" : "bg-surface border border-border text-ink"
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
          className="rounded-full bg-emerald p-2.5 text-[#201515] disabled:opacity-50"
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
        <div className="container-px mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-8 text-left md:p-12">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full border border-emerald/30" />
            <div className="relative max-w-2xl">
              <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-emerald">
                <Sparkles className="h-3.5 w-3.5" /> Signature feature
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink md:text-5xl">Ask Hasan AI</h2>
              <p className="mt-4 max-w-xl text-muted">
                A live assistant grounded only in Hasan&apos;s real projects, experience, and skills — ask it what a
                resume cannot answer.
              </p>
              <button
                onClick={() => setOpen(true)}
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-emerald px-6 py-3 text-sm font-semibold text-[#201515]"
              >
                <MessageCircle className="h-4 w-4" />
                Start a conversation
              </button>
            </div>
            <div className="absolute bottom-8 right-8 hidden items-center gap-2 text-xs font-medium text-muted md:flex">
              Explore the work <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </section>

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle Ask Hasan AI"
        aria-expanded={open}
        aria-controls={open ? "ai-chat-dialog" : undefined}
        className="fixed bottom-6 right-4 z-50 flex items-center gap-3 rounded-2xl border border-[#201515]/15 bg-emerald px-4 py-3 text-left text-[#201515] shadow-[0_14px_40px_rgba(255,106,42,0.28)] transition-transform hover:-translate-y-1 md:bottom-8 md:right-8"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#201515]/10"><MessageCircle className="h-4 w-4" /></span>
        <span className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em]">Available now</span>
          <span className="text-sm font-semibold">{open ? "Close assistant" : "Ask Hasan AI"}</span>
        </span>
      </button>

      <AnimatePresence>{open && <ChatPanel onClose={() => setOpen(false)} />}</AnimatePresence>
    </>
  );
}
