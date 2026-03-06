"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { Building } from "@/types";

type Props = {
  building: Building | null;
  onClose: () => void;
};

export function BuildingPanel({ building, onClose }: Props) {
  return (
    <AnimatePresence>
      {building ? (
        <>
          <motion.button
            type="button"
            className="fixed inset-0 z-40 bg-black/45"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-label="Close building panel"
          />
          <motion.aside
            initial={{ x: "100%", opacity: 0.7 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "105%", opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="panel-scroll fixed right-0 top-0 z-50 h-full w-full overflow-y-auto border-l border-white/30 bg-[#24153fcc]/95 p-6 backdrop-blur-xl sm:w-[430px]"
          >
            <div className="mb-5 flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/70">{building.zoneId} zone</p>
                <h2 className="mt-1 text-2xl font-semibold text-white">{building.name}</h2>
                <p className="mt-1 text-sm text-white/75">{building.shortDescription}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-white/30 px-3 py-1 text-xs text-white/90 hover:bg-white/10"
              >
                Close
              </button>
            </div>

            <section className="space-y-5 text-sm leading-relaxed text-white/90">
              <div className="rounded-2xl border border-white/25 bg-white/5 p-4">
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">Story</h3>
                <p>{building.story}</p>
              </div>

              <div className="rounded-2xl border border-white/25 bg-white/5 p-4">
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">Highlights</h3>
                <ul className="space-y-2 pl-4">
                  {building.bullets.map((item) => (
                    <li key={item} className="list-disc text-white/90">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}

