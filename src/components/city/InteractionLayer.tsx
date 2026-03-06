import { BuildingId } from "@/components/city/Building";
import { cityBuildings } from "@/data/cityBuildings";

function buildingBounds(b: (typeof cityBuildings)[number]) {
  const x = b.position.x - 14;
  const y = b.position.y - b.dimensions.depth * 0.62 - 14;
  const width = b.dimensions.width + b.dimensions.depth + 28;
  const height = b.dimensions.height + b.dimensions.depth + 28;
  return { x, y, width, height };
}

type InteractionLayerProps = {
  selectedId: BuildingId | null;
  hoveredId: BuildingId | null;
  focusedId: BuildingId | null;
  previewId: BuildingId | null;
  isTouchMode: boolean;
  setHoveredId: (id: BuildingId | null) => void;
  setFocusedId: (id: BuildingId | null) => void;
  setPressedId: (id: BuildingId | null) => void;
  onActivate: (id: BuildingId, x: number, y: number) => void;
  onPreview: (id: BuildingId | null) => void;
};

export function InteractionLayer({
  selectedId,
  hoveredId,
  focusedId,
  previewId,
  isTouchMode,
  setHoveredId,
  setFocusedId,
  setPressedId,
  onActivate,
  onPreview
}: InteractionLayerProps) {
  return (
    <>
      {cityBuildings.map((building) => {
        const bounds = buildingBounds(building);
        const isHovered = hoveredId === building.id;
        const isFocused = focusedId === building.id;
        const isSelected = selectedId === building.id;
        const isPreview = previewId === building.id;

        return (
          <g key={`${building.id}-hitbox`}>
            <rect
              x={bounds.x}
              y={bounds.y}
              width={bounds.width}
              height={bounds.height}
              rx={12}
              fill="transparent"
              className="cursor-pointer"
              data-building-hitbox={building.id}
              onMouseEnter={() => {
                if (!isTouchMode) setHoveredId(building.id);
              }}
              onMouseLeave={() => {
                if (!isTouchMode) setHoveredId(null);
              }}
              onFocus={() => {
                setFocusedId(building.id);
                if (!isTouchMode) setHoveredId(building.id);
              }}
              onBlur={() => {
                setFocusedId(null);
                if (!isTouchMode) setHoveredId(null);
              }}
              onPointerDown={() => setPressedId(building.id)}
              onPointerUp={() => setPressedId(null)}
              onPointerCancel={() => setPressedId(null)}
              onClick={() => {
                if (isTouchMode && !isSelected && !isPreview) {
                  onPreview(building.id);
                  return;
                }
                onPreview(null);
                onActivate(building.id, building.position.x, building.position.y);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onPreview(null);
                  onActivate(building.id, building.position.x, building.position.y);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`Open ${building.name}`}
              aria-pressed={isSelected}
            />

            {(isHovered || isFocused || isPreview) ? (
              <g pointerEvents="none">
                <rect x={building.position.x - 10} y={building.position.y - building.dimensions.height - 60} width={212} height={40} rx={9} fill="rgba(10,8,25,0.88)" stroke="rgba(255,255,255,0.35)" />
                <text x={building.position.x + 6} y={building.position.y - building.dimensions.height - 37} fill="white" fontSize="12.5" style={{ fontWeight: 700 }}>
                  {building.name}
                </text>
                <text x={building.position.x + 6} y={building.position.y - building.dimensions.height - 23} fill="rgba(255,255,255,0.76)" fontSize="10.5" style={{ letterSpacing: "0.08em" }}>
                  {building.zone}
                </text>
                {isTouchMode ? (
                  <text x={building.position.x + 140} y={building.position.y - building.dimensions.height - 23} fill="rgba(255,255,255,0.75)" fontSize="9.8">
                    Tap again
                  </text>
                ) : null}
              </g>
            ) : null}
          </g>
        );
      })}
    </>
  );
}

