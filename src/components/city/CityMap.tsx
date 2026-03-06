"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { BuildingId } from "@/components/city/Building";
import { CityLayer } from "@/components/city/CityLayer";
import { Trees } from "@/components/city/Trees";
import { cityBuildings } from "@/data/cityBuildings";
import { Modal } from "@/components/ui/Modal";
import { InfoPanel } from "@/components/ui/InfoPanel";
import { BackgroundLayer } from "@/components/city/BackgroundLayer";
import { RoadLayer } from "@/components/city/RoadLayer";
import { SidewalkLayer } from "@/components/city/SidewalkLayer";
import { ParkLayer } from "@/components/city/ParkLayer";
import { DecorationLayer } from "@/components/city/DecorationLayer";
import { BuildingLayer } from "@/components/city/BuildingLayer";
import { InteractionLayer } from "@/components/city/InteractionLayer";
import { OnboardingOverlay } from "@/components/city/OnboardingOverlay";

type ViewState = {
  scale: number;
  positionX: number;
  positionY: number;
};

const ONBOARDING_KEY = "manu_city_onboarding_dismissed";
const INTERACTION_KEY = "manu_city_has_interacted";

function MinimalIconButton({ label, onClick, children }: { label: string; onClick: () => void; children: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="h-9 w-9 rounded-full border border-white/35 bg-[#0d0a1fbf] text-sm font-semibold text-white/90 backdrop-blur-md hover:bg-white/10"
    >
      {children}
    </button>
  );
}

export function CityMap() {
  const shouldReduceMotion = useReducedMotion();
  const [selectedId, setSelectedId] = useState<BuildingId | null>(null);
  const [hoveredId, setHoveredId] = useState<BuildingId | null>(null);
  const [focusedId, setFocusedId] = useState<BuildingId | null>(null);
  const [pressedId, setPressedId] = useState<BuildingId | null>(null);
  const [previewId, setPreviewId] = useState<BuildingId | null>(null);
  const [view, setView] = useState<ViewState>({ scale: 0.92, positionX: 0, positionY: 0 });
  const [isTouchMode, setIsTouchMode] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [panelLoading, setPanelLoading] = useState(false);
  const lastSelectedRef = useRef<BuildingId | null>(null);

  const selectedBuilding = useMemo(() => cityBuildings.find((item) => item.id === selectedId) ?? null, [selectedId]);
  const movedFromDefault = Math.abs(view.scale - 0.92) > 0.03 || Math.abs(view.positionX) > 14 || Math.abs(view.positionY) > 14;

  const markInteracted = useCallback(() => {
    setHasInteracted((current) => {
      if (!current) {
        window.localStorage.setItem(INTERACTION_KEY, "1");
        return true;
      }
      return current;
    });
  }, []);

  useEffect(() => {
    const touch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    setIsTouchMode(touch);

    const dismissed = window.localStorage.getItem(ONBOARDING_KEY) === "1";
    const interacted = window.localStorage.getItem(INTERACTION_KEY) === "1";
    setShowOnboarding(!dismissed);
    setHasInteracted(interacted);
  }, []);

  useEffect(() => {
    if (hoveredId) markInteracted();
  }, [hoveredId, markInteracted]);

  useEffect(() => {
    if (!selectedId) return;
    setPanelLoading(true);
    const timer = window.setTimeout(() => setPanelLoading(false), shouldReduceMotion ? 0 : 180);
    return () => window.clearTimeout(timer);
  }, [selectedId, shouldReduceMotion]);

  const dismissOnboarding = () => {
    setShowOnboarding(false);
    window.localStorage.setItem(ONBOARDING_KEY, "1");
  };

  const closePanel = () => {
    setSelectedId(null);
    setPreviewId(null);
    if (lastSelectedRef.current) {
      window.setTimeout(() => {
        const target = document.querySelector<HTMLElement>(`[data-building-hitbox='${lastSelectedRef.current}']`);
        target?.focus();
      }, 24);
    }
  };

  const openBuilding = (id: BuildingId) => {
    setSelectedId(id);
    setPreviewId(null);
    markInteracted();
    lastSelectedRef.current = id;
  };

  const ordered = useMemo(() => [...cityBuildings].sort((a, b) => a.order - b.order), []);
  const index = selectedId ? ordered.findIndex((item) => item.id === selectedId) : -1;

  const goNext = () => {
    if (index < 0) return;
    openBuilding(ordered[(index + 1) % ordered.length].id);
  };

  const goPrev = () => {
    if (index < 0) return;
    openBuilding(ordered[(index - 1 + ordered.length) % ordered.length].id);
  };

  return (
    <section className="relative h-screen w-screen overflow-hidden">
      <TransformWrapper
        minScale={0.74}
        maxScale={2.3}
        initialScale={0.92}
        centerOnInit
        centerZoomedOut
        limitToBounds
        wheel={{ smoothStep: 0.01 }}
        pinch={{ step: 5 }}
        panning={{ velocityDisabled: true }}
        doubleClick={{ disabled: false, mode: "zoomIn", step: 1.2 }}
        onTransformed={(_, state) => {
          setView({ scale: state.scale, positionX: state.positionX, positionY: state.positionY });
        }}
      >
        {({ resetTransform, setTransform }) => (
          <>
            <TransformComponent wrapperClass="!w-screen !h-screen" contentClass="!w-[1320px] !h-[860px]">
              <motion.svg
                viewBox="0 0 1320 860"
                className="h-full w-full"
                role="img"
                aria-label="Interactive isometric city map"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.35 }}
              >
                <CityLayer id="background">
                  <BackgroundLayer />
                </CityLayer>

                <CityLayer id="roads">
                  <RoadLayer />
                </CityLayer>

                <CityLayer id="sidewalks">
                  <SidewalkLayer />
                </CityLayer>

                <CityLayer id="parks">
                  <ParkLayer />
                </CityLayer>

                <CityLayer id="props">
                  <DecorationLayer />
                  <Trees />
                </CityLayer>

                <CityLayer id="buildings">
                  <BuildingLayer
                    selectedId={selectedId}
                    hoveredId={hoveredId}
                    focusedId={focusedId}
                    pressedId={pressedId}
                    pulsingEnabled={!hasInteracted}
                  />
                </CityLayer>

                <CityLayer id="hitboxes" interactive>
                  <InteractionLayer
                    selectedId={selectedId}
                    hoveredId={hoveredId}
                    focusedId={focusedId}
                    previewId={previewId}
                    isTouchMode={isTouchMode}
                    setHoveredId={setHoveredId}
                    setFocusedId={setFocusedId}
                    setPressedId={setPressedId}
                    onPreview={(id) => {
                      setPreviewId(id);
                      if (id) markInteracted();
                    }}
                    onActivate={(id, x, y) => {
                      markInteracted();
                      const targetX = -x + 660;
                      const targetY = -y + 360;
                      setTransform(targetX, targetY, 1.36, shouldReduceMotion ? 0 : 360);
                      window.setTimeout(() => openBuilding(id), shouldReduceMotion ? 0 : 200);
                    }}
                  />
                </CityLayer>
              </motion.svg>
            </TransformComponent>

            <OnboardingOverlay open={showOnboarding} onDismiss={dismissOnboarding} />

            {showHelp ? (
              <div className="fixed bottom-16 right-4 z-30 max-w-[320px] rounded-xl border border-white/35 bg-[#0f0b23d9] px-4 py-3 text-sm text-white/90 backdrop-blur-md">
                <p>Drag to explore - Scroll/pinch to zoom</p>
                <p>Click buildings to open the story</p>
              </div>
            ) : null}

            <div className="fixed bottom-4 right-4 z-30 flex items-center gap-2">
              {movedFromDefault ? (
                <MinimalIconButton label="Reset view" onClick={() => resetTransform(shouldReduceMotion ? 0 : 260)}>
                  R
                </MinimalIconButton>
              ) : null}
              <MinimalIconButton label="Open help" onClick={() => setShowHelp((v) => !v)}>
                ?
              </MinimalIconButton>
            </div>
          </>
        )}
      </TransformWrapper>

      <Modal open={Boolean(selectedBuilding)} onClose={closePanel}>
        {selectedBuilding ? (
          <InfoPanel building={selectedBuilding} loading={panelLoading} onClose={closePanel} onNext={goNext} onPrev={goPrev} />
        ) : null}
      </Modal>
    </section>
  );
}

