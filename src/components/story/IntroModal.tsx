"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { chipIn, fadeUp, stagger } from "@/lib/motion";

type CvLink = {
  id: "es" | "en";
  label: string;
  href: string;
  available: boolean;
};

type IntroModalProps = {
  open: boolean;
  onClose: () => void;
  cvLinks: CvLink[];
};

const LINKEDIN_URL = "https://www.linkedin.com/in/manuel-ferrario/";

export function IntroModal({ open, onClose, cvLinks }: IntroModalProps) {
  const reducedMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const enterButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    lastFocusedRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    enterButtonRef.current?.focus();

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])"
      );

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
      document.body.style.overflow = previousOverflow;
      lastFocusedRef.current?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={reducedMotion ? undefined : { opacity: 0 }}
          animate={reducedMotion ? undefined : { opacity: 1 }}
          exit={reducedMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.24 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[rgba(8,6,20,0.72)] px-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="portfolio-intro-title"
            initial={reducedMotion ? undefined : { opacity: 0, y: 16, scale: 0.98 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.28 }}
            className="w-full max-w-xl rounded-[var(--radius-xl)] border border-white/20 bg-[linear-gradient(150deg,rgba(47,27,70,0.94),rgba(36,22,57,0.94))] p-7 shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
          >
            <motion.p variants={fadeUp(reducedMotion, 8)} initial="hidden" animate="visible" className="text-xs uppercase tracking-[0.18em] text-white/70">
              Presentación
            </motion.p>
            <motion.h1
              id="portfolio-intro-title"
              variants={fadeUp(reducedMotion, 10, 0.05)}
              initial="hidden"
              animate="visible"
              className="mt-3 text-3xl font-semibold text-white sm:text-4xl"
            >
              Portfolio de Manuel Ferrario
            </motion.h1>
            <motion.p variants={fadeUp(reducedMotion, 8, 0.1)} initial="hidden" animate="visible" className="mt-2 text-sm text-white/80 sm:text-base">
              Talento Flux - Naranja X
            </motion.p>

            <motion.div variants={stagger(reducedMotion, 0.06, 0.12)} initial="hidden" animate="visible" className="mt-8 flex flex-wrap gap-3">
              <motion.button
                ref={enterButtonRef}
                type="button"
                onClick={onClose}
                variants={chipIn(reducedMotion)}
                whileHover={reducedMotion ? {} : { y: -1 }}
                whileTap={reducedMotion ? {} : { scale: 0.985 }}
                className="rounded-full bg-[var(--accent-orange)] px-6 py-2.5 text-sm font-semibold text-[#2a1233] transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-orange)]"
              >
                Entrar
              </motion.button>

              {cvLinks.map((link, index) =>
                link.available ? (
                  <motion.a
                    key={link.id}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    variants={chipIn(reducedMotion, index * 0.03)}
                    whileHover={reducedMotion ? {} : { y: -1 }}
                    whileTap={reducedMotion ? {} : { scale: 0.985 }}
                    className="rounded-full border border-[rgba(255,106,0,0.32)] px-5 py-2.5 text-sm font-medium text-white/95 transition hover:bg-[rgba(255,106,0,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-orange)]"
                  >
                    {link.label}
                  </motion.a>
                ) : (
                  <button
                    key={link.id}
                    type="button"
                    disabled
                    className="cursor-not-allowed rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white/45"
                  >
                    {link.label}
                  </button>
                )
              )}

              <motion.a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                variants={chipIn(reducedMotion, 0.08)}
                whileHover={reducedMotion ? {} : { y: -1 }}
                whileTap={reducedMotion ? {} : { scale: 0.985 }}
                className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,106,0,0.32)] px-5 py-2.5 text-sm font-medium text-white/95 transition hover:bg-[rgba(255,106,0,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-orange)]"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6A2.5 2.5 0 0 1 0 3.5 2.5 2.5 0 0 1 2.49 1 2.5 2.5 0 0 1 4.98 3.5ZM.5 8h4v12h-4V8Zm7 0h3.84v1.64h.05c.54-1.02 1.84-2.09 3.79-2.09 4.05 0 4.8 2.67 4.8 6.13V20h-4v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94V20h-4V8Z" />
                </svg>
                <span>LinkedIn</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

