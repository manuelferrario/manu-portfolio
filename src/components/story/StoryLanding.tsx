"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AccessGate } from "@/components/AccessGate";
import { CommandBar } from "@/components/CommandBar";
import { PointerGlow } from "@/components/PointerGlow";
import { IntroModal } from "@/components/story/IntroModal";
import { Section } from "@/components/story/Section";
import { sections } from "@/data/sections";
import { chipIn } from "@/lib/motion";

const SCROLL_HINT_KEY = "story-site-scrolled";
const INTRO_DISMISSED_KEY = "portfolioIntroDismissed";
const ACCESS_KEY = "portfolioAccessGranted";

const cvOptions = [
  {
    id: "es" as const,
    label: "Ver CV (Español)",
    href: "/cv/CV_Manuel_Ferrario_Esp.pdf"
  },
  {
    id: "en" as const,
    label: "Ver CV (English)",
    href: "/cv/CV_Manuel_Ferrario_Eng.pdf"
  }
];

const commandActions = [
  { id: "go-personal", label: "Personal", keywords: ["inicio", "familia", "river", "novia"], type: "scroll" as const, targetId: "personal" },
  {
    id: "go-san-marcos",
    label: "Colegio San Marcos de San Isidro",
    keywords: ["colegio", "san marcos", "amigos", "exámenes"],
    type: "scroll" as const,
    targetId: "san-marcos"
  },
  {
    id: "go-di-tella",
    label: "Universidad Torcuato Di Tella",
    keywords: ["universidad", "di tella", "tecnología digital"],
    type: "scroll" as const,
    targetId: "di-tella"
  },
  { id: "go-trabajo", label: "Experiencia laboral", keywords: ["trabajo", "experiencia"], type: "scroll" as const, targetId: "trabajo" },
  {
    id: "go-perfumundo",
    label: "Perfumundo",
    keywords: ["ventas", "logística", "mayoristas"],
    type: "scroll" as const,
    targetId: "experiencia-perfumundo"
  },
  {
    id: "go-footgolf",
    label: "FootGolf",
    keywords: ["transmisión", "obs", "producción"],
    type: "scroll" as const,
    targetId: "experiencia-footgolf"
  },
  {
    id: "go-freelance",
    label: "Freelance",
    keywords: ["edición", "sony vegas"],
    type: "scroll" as const,
    targetId: "experiencia-freelance"
  },
  {
    id: "cv-es",
    label: "CV Español",
    keywords: ["cv", "español", "currículum"],
    type: "link" as const,
    href: "/cv/CV_Manuel_Ferrario_Esp.pdf"
  },
  {
    id: "cv-en",
    label: "CV English",
    keywords: ["cv", "english", "resume"],
    type: "link" as const,
    href: "/cv/CV_Manuel_Ferrario_Eng.pdf"
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    keywords: ["perfil", "contacto", "manuel ferrario"],
    type: "link" as const,
    href: "https://www.linkedin.com/in/manuel-ferrario/"
  }
];

export function StoryLanding() {
  const reducedMotion = useReducedMotion();

  const [hasScrolled, setHasScrolled] = useState(true);
  const [introReady, setIntroReady] = useState(false);
  const [introOpen, setIntroOpen] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [accessReady, setAccessReady] = useState(false);
  const [cvAvailability, setCvAvailability] = useState<Record<"es" | "en", boolean>>({ es: false, en: false });

  const cvLinks = useMemo(
    () => cvOptions.map((option) => ({ ...option, available: cvAvailability[option.id] })),
    [cvAvailability]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const granted = window.localStorage.getItem(ACCESS_KEY) === "true";
    setHasAccess(granted);
    setAccessReady(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !hasAccess) return;

    const dismissed = window.localStorage.getItem(INTRO_DISMISSED_KEY) === "true";
    const seenScrollHint = window.localStorage.getItem(SCROLL_HINT_KEY) === "1";

    setIntroOpen(!dismissed);
    setHasScrolled(seenScrollHint || window.scrollY > 20);
    setIntroReady(true);
  }, [hasAccess]);

  useEffect(() => {
    let active = true;

    async function checkCV() {
      const results = await Promise.all(
        cvOptions.map(async (option) => {
          try {
            const response = await fetch(option.href, { method: "HEAD", cache: "no-store" });
            return [option.id, response.ok] as const;
          } catch {
            return [option.id, false] as const;
          }
        })
      );

      if (!active) return;

      setCvAvailability({
        es: results.find(([id]) => id === "es")?.[1] ?? false,
        en: results.find(([id]) => id === "en")?.[1] ?? false
      });
    }

    checkCV();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !hasAccess) return;

    const onScroll = () => {
      if (window.scrollY > 20) {
        setHasScrolled(true);
        window.localStorage.setItem(SCROLL_HINT_KEY, "1");
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasAccess]);

  const dismissIntro = () => {
    setIntroOpen(false);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(INTRO_DISMISSED_KEY, "true");
    }
  };

  if (!accessReady) {
    return <main className="story-root min-h-screen" aria-hidden="true" />;
  }

  if (!hasAccess) {
    return <AccessGate onGranted={() => setHasAccess(true)} />;
  }

  if (!introReady) {
    return <main className="story-root min-h-screen" aria-hidden="true" />;
  }

  return (
    <>
      <div className="story-global-bg" aria-hidden="true">
        <div className="story-mesh story-mesh-a" />
        <div className="story-mesh story-mesh-b" />
        <div className="story-mesh story-mesh-c" />
        <div className="story-spark story-spark-a" />
        <div className="story-spark story-spark-b" />
      </div>

      <PointerGlow />

      <main className="story-root relative">
        {sections.map((section, index) => (
          <Section key={section.id} section={section} index={index} />
        ))}

        <div className="fixed bottom-5 left-5 z-40 rounded-full border border-[rgba(255,106,0,0.28)] bg-black/25 p-1.5 backdrop-blur-sm">
          <div className="flex items-center gap-1">
            {cvLinks.map((link, index) =>
              link.available ? (
                <motion.a
                  key={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  variants={chipIn(reducedMotion, index * 0.03)}
                  initial="hidden"
                  animate="visible"
                  whileHover={reducedMotion ? {} : { y: -1 }}
                  whileTap={reducedMotion ? {} : { scale: 0.985 }}
                  className="rounded-full border border-[rgba(255,106,0,0.28)] px-3 py-1.5 text-[11px] font-medium text-white/90 transition hover:bg-[rgba(255,106,0,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-orange)]"
                >
                  {link.label}
                </motion.a>
              ) : (
                <button
                  key={link.id}
                  type="button"
                  disabled
                  className="cursor-not-allowed rounded-full border border-white/15 px-3 py-1.5 text-[11px] font-medium text-white/45"
                >
                  {link.label}
                </button>
              )
            )}
          </div>
        </div>

        <CommandBar actions={commandActions} />

        <AnimatePresence>
          {!hasScrolled && !introOpen && (
            <motion.div
              initial={reducedMotion ? undefined : { opacity: 0, y: 8 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="pointer-events-none fixed bottom-8 left-1/2 z-30 -translate-x-1/2"
              aria-hidden="true"
            >
              <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-xs text-white/85 backdrop-blur-sm">
                <span>Deslizá para explorar</span>
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <IntroModal open={introOpen} onClose={dismissIntro} cvLinks={cvLinks} />
    </>
  );
}

