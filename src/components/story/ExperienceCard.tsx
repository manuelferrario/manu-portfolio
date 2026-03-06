"use client";

import type { MouseEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PhotoFrame } from "@/components/story/PhotoFrame";
import { ExperienciaItem } from "@/data/sections";
import { cardIn, chipIn, fadeUp, stagger } from "@/lib/motion";

type Props = {
  item: ExperienciaItem;
  targetId?: string;
  layoutId?: string;
  isSelected?: boolean;
  onOpen?: (item: ExperienciaItem, trigger: HTMLButtonElement) => void;
};

export function ExperienceCard({ item, targetId, layoutId, isSelected = false, onOpen }: Props) {
  const reducedMotion = useReducedMotion();

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    onOpen?.(item, event.currentTarget);
  };

  return (
    <motion.button
      id={targetId}
      type="button"
      layoutId={layoutId}
      variants={cardIn(reducedMotion)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      whileHover={reducedMotion ? {} : { y: -2, boxShadow: "0 22px 45px rgba(8, 6, 20, 0.34)" }}
      whileTap={reducedMotion ? {} : { scale: 0.985 }}
      transition={{ duration: 0.2 }}
      onClick={handleOpen}
      aria-haspopup="dialog"
      aria-expanded={isSelected}
      className={`w-full rounded-[var(--radius-xl)] border bg-[rgba(16,12,30,0.48)] p-5 text-left shadow-[var(--shadow-soft)] backdrop-blur-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-orange)] ${
        isSelected
          ? "border-[rgba(255,106,0,0.5)] shadow-[0_28px_60px_rgba(8,6,20,0.4)]"
          : "border-white/20 hover:border-[rgba(255,106,0,0.42)]"
      }`}
    >
      <h3 className="text-xl font-semibold text-white">{item.empresa}</h3>
      <p className="mt-1 text-sm text-white/90">{item.rol}</p>
      <p className="mt-1 text-xs uppercase tracking-[0.14em] text-white/65">{item.periodo}</p>

      <motion.ul
        variants={stagger(reducedMotion, 0.06, 0.04)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        className="mt-4 space-y-2 text-sm text-white/90"
      >
        {item.bullets.map((point) => (
          <motion.li key={point} variants={fadeUp(reducedMotion, 6)} className="flex gap-2.5">
            <span className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-orange)]" />
            <span>{point}</span>
          </motion.li>
        ))}
      </motion.ul>

      <motion.div
        variants={stagger(reducedMotion, 0.05, 0.02)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        className="mt-4 flex flex-wrap gap-2"
      >
        {item.herramientas.map((tool, index) => (
          <motion.span
            key={tool}
            variants={chipIn(reducedMotion, index * 0.03)}
            className="rounded-full border border-[rgba(255,106,0,0.32)] bg-[rgba(255,106,0,0.08)] px-3 py-1 text-xs text-white/92"
          >
            {tool}
          </motion.span>
        ))}
      </motion.div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {item.fotos.map((foto, index) => (
          <PhotoFrame key={foto.src} src={foto.src} alt={foto.alt} ratio="square" priority={index === 0} />
        ))}
      </div>
    </motion.button>
  );
}


