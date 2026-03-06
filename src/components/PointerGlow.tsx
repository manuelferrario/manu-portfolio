"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export function PointerGlow() {
  const reducedMotion = useReducedMotion();
  const layerRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const xRef = useRef(0);
  const yRef = useRef(0);
  const activeRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (reducedMotion) return;

    const layer = layerRef.current;
    if (!layer) return;

    const render = () => {
      layer.style.setProperty("--mx", `${xRef.current}px`);
      layer.style.setProperty("--my", `${yRef.current}px`);
      frameRef.current = null;
    };

    const queueRender = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(render);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== "mouse") return;

      xRef.current = event.clientX;
      yRef.current = event.clientY;

      if (!activeRef.current) {
        layer.style.opacity = "1";
        activeRef.current = true;
      }

      queueRender();
    };

    const onPointerLeave = () => {
      layer.style.opacity = "0";
      activeRef.current = false;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] hidden opacity-0 transition-opacity duration-200 md:block"
      style={{
        background:
          "radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.11), rgba(255,255,255,0) 74%)",
        filter: "blur(22px)",
        mixBlendMode: "screen"
      }}
    >
      <div
        className="absolute h-5 w-5 rounded-full border border-[rgba(255,106,0,0.45)]"
        style={{
          left: "var(--mx, 50%)",
          top: "var(--my, 50%)",
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 16px rgba(255,106,0,0.22)"
        }}
      />
      <div
        className="absolute h-1.5 w-1.5 rounded-full bg-[rgba(255,106,0,0.75)]"
        style={{
          left: "var(--mx, 50%)",
          top: "var(--my, 50%)",
          transform: "translate(-50%, -50%)"
        }}
      />
    </div>
  );
}

