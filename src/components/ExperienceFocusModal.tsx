"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PhotoFrame } from "@/components/story/PhotoFrame";
import { ExperienciaItem } from "@/data/sections";

type ExperienceFocusModalProps = {
  item: ExperienciaItem | null;
  layoutId?: string;
  onClose: () => void;
};

const springTransition = {
  type: "spring",
  stiffness: 260,
  damping: 34,
  mass: 0.9
} as const;

export function ExperienceFocusModal({ item, layoutId, onClose }: ExperienceFocusModalProps) {
  const reducedMotion = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!item) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [item]);

  useEffect(() => {
    if (!item) return;

    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <>
          <motion.button
            key="experience-backdrop"
            type="button"
            aria-label="Cerrar detalle de experiencia"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[70] border-0 bg-[rgba(10,8,22,0.56)] p-0 backdrop-blur-[14px]"
          />

          <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6" onClick={onClose}>
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label={`Detalle de ${item.empresa}`}
              layoutId={layoutId}
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.985 }}
              animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.99 }}
              transition={reducedMotion ? { duration: 0.22 } : springTransition}
              className="relative w-full max-w-4xl overflow-hidden rounded-[28px] border border-[rgba(255,255,255,0.24)] bg-[rgba(16,12,30,0.86)] p-5 shadow-[0_40px_80px_rgba(8,6,20,0.45)] backdrop-blur-xl sm:p-7"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white/90 transition hover:border-[rgba(255,106,0,0.42)] hover:bg-[rgba(255,106,0,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-orange)]"
              >
                <span className="sr-only">Cerrar</span>
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m6 6 12 12M18 6 6 18" />
                </svg>
              </button>

              <div className="pr-10">
                <h3 className="text-2xl font-semibold text-white sm:text-3xl">{item.empresa}</h3>
                <p className="mt-2 text-sm text-white/88 sm:text-base">{item.rol}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/62">{item.periodo}</p>
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <ul className="space-y-2.5 text-sm text-white/90 sm:text-base">
                    {item.bullets.map((point) => (
                      <li key={point} className="flex gap-2.5">
                        <span className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-orange)]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.herramientas.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full border border-[rgba(255,106,0,0.32)] bg-[rgba(255,106,0,0.08)] px-3 py-1 text-xs text-white/92"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  {item.fotos.map((foto, index) => (
                    <PhotoFrame key={foto.src} src={foto.src} alt={foto.alt} ratio="wide" priority={index === 0} />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}


