"use client";

import { KeyboardEvent as ReactKeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cardIn, fadeUp, stagger } from "@/lib/motion";

type CommandAction = {
  id: string;
  label: string;
  keywords: string[];
  type: "scroll" | "link";
  targetId?: string;
  href?: string;
};

type CommandBarProps = {
  actions: CommandAction[];
};

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

export function CommandBar({ actions }: CommandBarProps) {
  const reducedMotion = useReducedMotion();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filtered = useMemo(() => {
    const search = normalize(query.trim());
    if (!search) return actions;

    return actions.filter((action) => {
      const haystack = normalize([action.label, ...action.keywords].join(" "));
      return haystack.includes(search);
    });
  }, [actions, query]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isShortcut = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k";
      if (isShortcut) {
        event.preventDefault();
        setOpen(true);
        return;
      }

      if (event.key === "Escape" && open) {
        event.preventDefault();
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) {
      lastFocusedRef.current?.focus();
      return;
    }

    lastFocusedRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const timeout = window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => window.clearTimeout(timeout);
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query, open]);

  const close = () => {
    setOpen(false);
    setQuery("");
    setSelectedIndex(0);
  };

  const executeAction = (action: CommandAction) => {
    if (action.type === "scroll" && action.targetId) {
      const node = document.getElementById(action.targetId);
      node?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "center" });
    }

    if (action.type === "link" && action.href) {
      window.open(action.href, "_blank", "noreferrer");
    }

    close();
  };

  const onInputKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex((current) => (filtered.length === 0 ? 0 : (current + 1) % filtered.length));
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedIndex((current) => (filtered.length === 0 ? 0 : (current - 1 + filtered.length) % filtered.length));
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      const action = filtered[selectedIndex];
      if (action) executeAction(action);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Abrir búsqueda"
        className="fixed bottom-5 right-5 z-40 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/28 text-white/90 backdrop-blur-sm transition hover:border-[rgba(255,106,0,0.45)] hover:bg-[rgba(255,106,0,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-orange)]"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reducedMotion ? undefined : { opacity: 0 }}
            animate={reducedMotion ? undefined : { opacity: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0 }}
            className="fixed inset-0 z-[75] bg-[rgba(8,6,20,0.58)] px-4 backdrop-blur-sm"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) close();
            }}
          >
            <div className="flex min-h-full items-start justify-center pt-[14vh]">
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={cardIn(reducedMotion)}
                className="w-full max-w-2xl rounded-[var(--radius-xl)] border border-white/20 bg-[rgba(25,20,46,0.92)] p-4 shadow-[0_26px_70px_rgba(0,0,0,0.42)]"
              >
                <motion.div variants={stagger(reducedMotion, 0.05, 0.02)} initial="hidden" animate="visible">
                  <motion.div variants={fadeUp(reducedMotion, 8)}>
                    <input
                      ref={inputRef}
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      onKeyDown={onInputKeyDown}
                      placeholder="Buscar (Personal, San Marcos, Di Tella, Trabajo, Perfumundo, FootGolf, Freelance, CV, LinkedIn)"
                      className="w-full rounded-[var(--radius-md)] border border-white/20 bg-black/24 px-3 py-2.5 text-sm text-white placeholder:text-white/48 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-orange)]"
                    />
                  </motion.div>

                  <motion.ul variants={fadeUp(reducedMotion, 8, 0.04)} className="mt-3 max-h-72 space-y-1 overflow-auto">
                    {filtered.length === 0 && (
                      <li className="rounded-[var(--radius-md)] border border-white/15 px-3 py-2 text-sm text-white/65">
                        Sin resultados
                      </li>
                    )}

                    {filtered.map((action, index) => {
                      const active = index === selectedIndex;
                      return (
                        <li key={action.id}>
                          <button
                            type="button"
                            onClick={() => executeAction(action)}
                            onMouseEnter={() => setSelectedIndex(index)}
                            className={`flex w-full items-center justify-between rounded-[var(--radius-md)] border px-3 py-2 text-left text-sm transition ${
                              active
                                ? "border-[rgba(255,106,0,0.5)] bg-[rgba(255,106,0,0.18)] text-white"
                                : "border-white/10 bg-black/15 text-white/85 hover:border-white/20"
                            }`}
                          >
                            <span>{action.label}</span>
                            <span className="text-[11px] text-white/60">{action.type === "scroll" ? "Ir" : "Abrir"}</span>
                          </button>
                        </li>
                      );
                    })}
                  </motion.ul>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


