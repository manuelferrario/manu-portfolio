type ViewState = {
  scale: number;
  positionX: number;
  positionY: number;
};

type MapControlsProps = {
  view: ViewState;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onFocusAll: () => void;
};

function ControlButton({ label, onClick, ariaLabel }: { label: string; onClick: () => void; ariaLabel: string }) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className="rounded-lg border border-white/35 bg-black/30 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/20"
    >
      {label}
    </button>
  );
}

export function MapControls({ view, onZoomIn, onZoomOut, onReset, onFocusAll }: MapControlsProps) {
  return (
    <div className="absolute left-3 top-3 z-20 flex flex-col gap-2 rounded-xl border border-white/30 bg-[#130d2bb3] p-2 backdrop-blur-md">
      <div className="grid grid-cols-2 gap-2">
        <ControlButton label="+" ariaLabel="Zoom in" onClick={onZoomIn} />
        <ControlButton label="-" ariaLabel="Zoom out" onClick={onZoomOut} />
        <ControlButton label="Reset" ariaLabel="Reset map" onClick={onReset} />
        <ControlButton label="Focus" ariaLabel="Focus full city" onClick={onFocusAll} />
      </div>
      <p className="text-[10px] text-white/75">You are here: x{view.scale.toFixed(2)}</p>
    </div>
  );
}

