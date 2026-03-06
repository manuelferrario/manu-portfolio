"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { imageReveal } from "@/lib/motion";

type PhotoFrameProps = {
  src: string;
  alt: string;
  ratio?: "wide" | "square";
  priority?: boolean;
};

export function PhotoFrame({ src, alt, ratio = "wide", priority = false }: PhotoFrameProps) {
  const reducedMotion = useReducedMotion();
  const [hasError, setHasError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const ratioClass = ratio === "square" ? "aspect-square" : "aspect-[16/10]";

  return (
    <div
      className={`relative overflow-hidden rounded-[var(--radius-lg)] border border-white/20 shadow-[0_16px_35px_rgba(8,6,20,0.28)] ${ratioClass}`}
    >
      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(135deg,rgba(255,138,58,0.35),rgba(142,123,255,0.32))] placeholder-shimmer">
          <div className="flex items-center gap-2 rounded-full border border-white/30 bg-black/20 px-3 py-1.5 text-xs text-white/90 backdrop-blur-sm">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <circle cx="9" cy="10" r="2" />
              <path d="m21 16-5.5-5.5L7 19" />
            </svg>
            <span>Espacio para foto</span>
          </div>
        </div>
      ) : (
        <motion.div
          variants={imageReveal(reducedMotion)}
          initial="hidden"
          animate={loaded ? "visible" : "hidden"}
          className="absolute inset-0"
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover object-center"
            onError={() => setHasError(true)}
            onLoadingComplete={() => setLoaded(true)}
          />
        </motion.div>
      )}

      {!hasError && !loaded && (
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.05),rgba(255,255,255,0.14),rgba(255,255,255,0.05))] placeholder-shimmer" />
      )}

      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]" />
    </div>
  );
}

