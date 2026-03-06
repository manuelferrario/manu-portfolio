"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cardIn, fadeUp, stagger } from "@/lib/motion";

type AccessGateProps = {
  onGranted: () => void;
};

const ACCESS_KEY = "portfolioAccessGranted";
const VISITOR_KEY = "portfolioVisitorName";

export function AccessGate({ onGranted }: AccessGateProps) {
  const reducedMotion = useReducedMotion();
  const nameRef = useRef<HTMLInputElement | null>(null);

  const [nombre, setNombre] = useState("");
  const [codigo, setCodigo] = useState("");

  const canEnter = useMemo(() => nombre.trim().length > 0 || codigo.trim().length > 0, [nombre, codigo]);

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  const grantAccess = () => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(ACCESS_KEY, "true");

    const cleanName = nombre.trim();
    if (cleanName.length > 0) {
      window.localStorage.setItem(VISITOR_KEY, cleanName);
    }

    onGranted();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canEnter) return;
    grantAccess();
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center px-4">
      <div className="story-global-bg" aria-hidden="true">
        <div className="story-mesh story-mesh-a" />
        <div className="story-mesh story-mesh-b" />
        <div className="story-mesh story-mesh-c" />
      </div>

      <motion.form
        onSubmit={handleSubmit}
        initial="hidden"
        animate="visible"
        variants={cardIn(reducedMotion)}
        className="w-full max-w-md rounded-[var(--radius-xl)] border border-white/20 bg-[linear-gradient(150deg,rgba(47,27,70,0.94),rgba(36,22,57,0.94))] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-md"
      >
        <motion.div variants={stagger(reducedMotion, 0.06, 0.03)} initial="hidden" animate="visible" className="space-y-5">
          <motion.div variants={fadeUp(reducedMotion, 10, 0)}>
            <p className="text-xs uppercase tracking-[0.18em] text-white/70">Acceso</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Portfolio de Manuel Ferrario</h1>
          </motion.div>

          <motion.label variants={fadeUp(reducedMotion, 8, 0.04)} className="block">
            <span className="mb-2 block text-sm text-white/88">Nombre</span>
            <input
              ref={nameRef}
              value={nombre}
              onChange={(event) => setNombre(event.target.value)}
              className="w-full rounded-[var(--radius-md)] border border-white/25 bg-black/20 px-3 py-2.5 text-sm text-white placeholder:text-white/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-orange)]"
              placeholder="Tu nombre"
            />
          </motion.label>

          <motion.label variants={fadeUp(reducedMotion, 8, 0.08)} className="block">
            <span className="mb-2 block text-sm text-white/88">Código</span>
            <input
              value={codigo}
              onChange={(event) => setCodigo(event.target.value)}
              className="w-full rounded-[var(--radius-md)] border border-white/25 bg-black/20 px-3 py-2.5 text-sm text-white placeholder:text-white/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-orange)]"
              placeholder="Ingresá cualquier código"
            />
          </motion.label>

          <motion.div variants={fadeUp(reducedMotion, 8, 0.12)} className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={!canEnter}
              className="rounded-full bg-[var(--accent-orange)] px-5 py-2.5 text-sm font-semibold text-[#2a1233] transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-orange)] disabled:cursor-not-allowed disabled:opacity-45"
            >
              Entrar
            </button>

            <button
              type="button"
              onClick={grantAccess}
              className="text-sm text-white/80 underline decoration-white/35 underline-offset-4 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-orange)]"
            >
              Entrar como invitado
            </button>
          </motion.div>
        </motion.div>
      </motion.form>
    </div>
  );
}

