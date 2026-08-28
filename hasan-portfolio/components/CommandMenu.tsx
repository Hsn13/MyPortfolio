"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FileDown, FolderGit2, MessageCircle, Mail, Compass, Newspaper, Command } from "lucide-react";

type Item = {
  id: string;
  label: string;
  hint?: string;
  icon: React.ElementType;
  action: () => void;
};

export default function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const isMeta = e.metaKey || e.ctrlKey;
      if (isMeta && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) setQuery("");
  }, [open]);

  const goto = (hash: string) => {
    if (window.location.pathname !== "/") {
      router.push(`/${hash}`);
    } else {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false);
  };

  const items: Item[] = useMemo(
    () => [
      { id: "projects", label: "View Projects", hint: "Go to section", icon: FolderGit2, action: () => goto("#projects") },
      { id: "journey", label: "View Career Journey", hint: "Go to section", icon: Compass, action: () => goto("#journey") },
      { id: "ai", label: "Ask Hasan AI", hint: "Open the assistant", icon: MessageCircle, action: () => goto("#ai") },
      { id: "blog", label: "Read the Engineering Journal", hint: "Go to /blog", icon: Newspaper, action: () => { router.push("/blog"); setOpen(false); } },
      { id: "contact", label: "Contact Hasan", hint: "Go to section", icon: Mail, action: () => goto("#contact") },
      {
        id: "cv",
        label: "Download CV",
        hint: "Open PDF",
        icon: FileDown,
        action: () => {
          window.open("/HasanKhesro-CV.pdf", "_blank");
          setOpen(false);
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router]
  );

  const filtered = items.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-4 z-40 hidden items-center gap-1.5 rounded-full border border-border bg-surface/80 px-3 py-2 text-xs text-muted backdrop-blur transition-colors hover:text-ink md:flex"
      >
        <Command className="h-3.5 w-3.5" />
        <span>
          <kbd className="font-sans">⌘</kbd>/<kbd className="font-sans">Ctrl</kbd> K
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[60] flex items-start justify-center bg-black/70 p-4 pt-[15vh] backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-surface-2 shadow-2xl"
            >
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command…"
                className="w-full border-b border-border bg-transparent px-5 py-4 text-sm text-ink outline-none placeholder:text-muted"
              />
              <div className="max-h-80 overflow-y-auto p-2">
                {filtered.length === 0 && (
                  <p className="px-3 py-6 text-center text-sm text-muted">No matching commands.</p>
                )}
                {filtered.map((item) => (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-ink transition-colors hover:bg-surface"
                  >
                    <item.icon className="h-4 w-4 text-muted" />
                    <span className="flex-1">{item.label}</span>
                    {item.hint && <span className="text-xs text-muted">{item.hint}</span>}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
