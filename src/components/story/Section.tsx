"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ExperienceFocusModal } from "@/components/ExperienceFocusModal";
import { ExperienceCard } from "@/components/story/ExperienceCard";
import { PhotoFrame } from "@/components/story/PhotoFrame";
import { ExperienciaItem, SeccionStory } from "@/data/sections";
import { cardIn, chipIn, fadeUp, stagger } from "@/lib/motion";

type SectionProps = {
  section: SeccionStory;
  index: number;
};

const LINKEDIN_URL = "https://www.linkedin.com/in/manuel-ferrario/";

export function Section({ section, index }: SectionProps) {
  const reducedMotion = useReducedMotion();
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const [selectedExperienceId, setSelectedExperienceId] = useState<string | null>(null);

  const selectedExperience = section.experiencias?.find((item) => item.id === selectedExperienceId) ?? null;
  const sanMarcosFotos = section.id === "san-marcos" ? section.fotos ?? [] : [];
  const sanMarcosFotoColegio = sanMarcosFotos[0];
  const sanMarcosFotoAmigos = sanMarcosFotos[1];

  const handleExperienceOpen = (item: ExperienciaItem, trigger: HTMLButtonElement) => {
    openerRef.current = trigger;
    setSelectedExperienceId(item.id);
  };

  const handleExperienceClose = () => {
    setSelectedExperienceId(null);

    if (typeof window !== "undefined") {
      window.requestAnimationFrame(() => {
        openerRef.current?.focus();
      });
    }
  };

  return (
    <section
      id={section.id}
      data-section={section.id}
      className={`story-section relative isolate overflow-hidden px-6 py-16 sm:px-10 lg:px-16 ${
        section.id === "trabajo" ? "pb-24" : ""
      }`}
      style={{ ["--section-overlay" as string]: section.themeGradient }}
      aria-label={`Sección ${section.title}`}
    >
      <div className="mx-auto w-full max-w-7xl">
        <motion.p
          variants={fadeUp(reducedMotion, 10, 0.02)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          className="text-xs uppercase tracking-[0.2em] text-white/70"
        >
          {section.navLabel}
        </motion.p>

        <motion.h2
          variants={fadeUp(reducedMotion, 12, 0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          className="mt-3 max-w-4xl text-balance text-4xl font-semibold leading-[1.02] text-white sm:text-5xl lg:text-6xl"
        >
          {section.title}
        </motion.h2>

        <motion.p
          variants={fadeUp(reducedMotion, 10, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          className="mt-4 max-w-3xl text-base text-white/88 sm:text-lg"
        >
          {section.subtitle}
        </motion.p>

        {section.id === "personal" && section.bloquesPersonales && (
          <motion.div
            variants={stagger(reducedMotion, 0.06, 0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            className="mt-10 grid gap-5 md:grid-cols-3"
          >
            {section.bloquesPersonales.map((bloque, indexCard) => (
              <motion.article
                key={bloque.id}
                variants={cardIn(reducedMotion)}
                className="rounded-[var(--radius-xl)] border border-white/20 bg-[rgba(14,10,28,0.44)] p-4 shadow-[var(--shadow-soft)] backdrop-blur-sm"
              >
                <h3 className="text-xl font-semibold text-white">{bloque.titulo}</h3>
                <p className="mt-2 text-sm text-white/88">{bloque.descripcion}</p>
                <div className="mt-4">
                  <PhotoFrame
                    src={bloque.foto.src}
                    alt={bloque.foto.alt}
                    ratio="wide"
                    priority={index === 0 && indexCard === 0}
                  />
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}

        {section.id === "san-marcos" && (
          <motion.div
            variants={stagger(reducedMotion, 0.06, 0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            className="mt-8 grid items-start gap-5 lg:grid-cols-[1.15fr_0.85fr]"
          >
            <div className="grid gap-4">
              <motion.article
                variants={cardIn(reducedMotion)}
                className="rounded-[var(--radius-xl)] border border-white/20 bg-[rgba(14,10,28,0.44)] p-5 shadow-[var(--shadow-soft)]"
              >
                <p className="text-sm text-white/90">{section.descripcion}</p>
                <h3 className="mt-5 text-lg font-semibold text-white">Exámenes internacionales</h3>
                <motion.ul
                  variants={stagger(reducedMotion, 0.06, 0.05)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.35 }}
                  className="mt-3 space-y-2 text-sm text-white/90"
                >
                  {section.examenesInternacionales?.map((exam) => (
                    <motion.li key={exam.nombre} variants={fadeUp(reducedMotion, 6)} className="flex flex-wrap items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-orange)]" />
                      <span>{exam.nombre}</span>
                      {exam.nota && (
                        <span className="rounded-full border border-[rgba(255,106,0,0.34)] bg-[rgba(255,106,0,0.08)] px-2.5 py-0.5 text-xs text-white/92">
                          Nota: {exam.nota}
                        </span>
                      )}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.article>

              {sanMarcosFotoAmigos && (
                <motion.div variants={cardIn(reducedMotion)}>
                  <PhotoFrame
                    src={sanMarcosFotoAmigos.src}
                    alt={sanMarcosFotoAmigos.alt}
                    priority={index === 1}
                  />
                </motion.div>
              )}
            </div>

            {sanMarcosFotoColegio && (
              <motion.div variants={cardIn(reducedMotion)}>
                <PhotoFrame
                  src={sanMarcosFotoColegio.src}
                  alt={sanMarcosFotoColegio.alt}
                  priority={index === 1}
                />
              </motion.div>
            )}
          </motion.div>
        )}

        {section.id === "di-tella" && (
          <motion.div
            variants={stagger(reducedMotion, 0.06, 0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            className="mt-8 grid items-start gap-5 lg:grid-cols-[1.05fr_0.95fr]"
          >
            <motion.article
              variants={cardIn(reducedMotion)}
              className="rounded-[var(--radius-xl)] border border-white/20 bg-[rgba(14,10,28,0.44)] p-5 shadow-[var(--shadow-soft)]"
            >
              <motion.ul
                variants={stagger(reducedMotion, 0.06, 0.05)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
                className="space-y-2 text-sm text-white/92 sm:text-base"
              >
                {section.bullets?.map((bullet) => (
                  <motion.li key={bullet} variants={fadeUp(reducedMotion, 6)} className="flex gap-2.5">
                    <span className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-orange)]" />
                    <span>{bullet}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.article>

            <motion.div variants={cardIn(reducedMotion)} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {section.fotos?.map((foto, indexPhoto) => (
                <PhotoFrame key={foto.src} src={foto.src} alt={foto.alt} priority={index === 2 && indexPhoto === 0} />
              ))}
            </motion.div>
          </motion.div>
        )}

        {section.id === "trabajo" && section.experiencias && (
          <>
            <motion.div
              variants={stagger(reducedMotion, 0.08, 0.08)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              className="mt-10 grid gap-5 lg:grid-cols-3"
            >
              {section.experiencias.map((item) => (
                <ExperienceCard
                  key={item.id}
                  item={item}
                  targetId={`experiencia-${item.id}`}
                  layoutId={reducedMotion ? undefined : `exp-${item.id}`}
                  isSelected={selectedExperienceId === item.id}
                  onOpen={handleExperienceOpen}
                />
              ))}
            </motion.div>

            <motion.div
              variants={chipIn(reducedMotion, 0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              className="mt-8"
            >
              <motion.a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                whileHover={reducedMotion ? {} : { y: -1 }}
                whileTap={reducedMotion ? {} : { scale: 0.985 }}
                className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,106,0,0.34)] bg-[rgba(255,106,0,0.1)] px-4 py-2 text-sm font-medium text-white/95 transition hover:bg-[rgba(255,106,0,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-orange)]"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6A2.5 2.5 0 0 1 0 3.5 2.5 2.5 0 0 1 2.49 1 2.5 2.5 0 0 1 4.98 3.5ZM.5 8h4v12h-4V8Zm7 0h3.84v1.64h.05c.54-1.02 1.84-2.09 3.79-2.09 4.05 0 4.8 2.67 4.8 6.13V20h-4v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94V20h-4V8Z" />
                </svg>
                <span>LinkedIn</span>
              </motion.a>
            </motion.div>

            <ExperienceFocusModal
              item={selectedExperience}
              layoutId={!reducedMotion && selectedExperience ? `exp-${selectedExperience.id}` : undefined}
              onClose={handleExperienceClose}
            />
          </>
        )}
      </div>
    </section>
  );
}
