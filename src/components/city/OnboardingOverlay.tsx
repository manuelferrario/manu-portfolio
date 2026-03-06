"use client";

type OnboardingOverlayProps = {
  open: boolean;
  onDismiss: () => void;
};

export function OnboardingOverlay({ open, onDismiss }: OnboardingOverlayProps) {
  if (!open) return null;

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#0c091a]/46 backdrop-blur-[1px]" onClick={onDismiss}>
      <button
        type="button"
        onClick={onDismiss}
        className="rounded-xl border border-white/35 bg-[#17102fcc] px-5 py-4 text-left text-sm text-white/90 shadow-2xl"
      >
        <p>Drag to explore - Scroll/pinch to zoom</p>
        <p>Click buildings to open the story</p>
      </button>
    </div>
  );
}


