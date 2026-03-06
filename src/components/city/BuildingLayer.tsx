import { memo } from "react";
import { Building, BuildingId } from "@/components/city/Building";
import { cityBuildings } from "@/data/cityBuildings";

type BuildingLayerProps = {
  selectedId: BuildingId | null;
  hoveredId: BuildingId | null;
  focusedId: BuildingId | null;
  pressedId: BuildingId | null;
  pulsingEnabled: boolean;
};

const PULSE_IDS: BuildingId[] = ["river-stadium", "ditella", "perfumundo"];

function BuildingLayerImpl({ selectedId, hoveredId, focusedId, pressedId, pulsingEnabled }: BuildingLayerProps) {
  return (
    <>
      {cityBuildings.map((building) => (
        <Building
          key={building.id}
          id={building.id}
          x={building.position.x}
          y={building.position.y}
          width={building.dimensions.width}
          depth={building.dimensions.depth}
          height={building.dimensions.height}
          palette={building.palette}
          selected={selectedId === building.id}
          hovered={hoveredId === building.id}
          focused={focusedId === building.id}
          pressed={pressedId === building.id}
          pulsing={pulsingEnabled && PULSE_IDS.includes(building.id)}
        />
      ))}
    </>
  );
}

export const BuildingLayer = memo(BuildingLayerImpl);

