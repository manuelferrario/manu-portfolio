import { ReactNode } from "react";

type CityLayerProps = {
  id: string;
  children: ReactNode;
  opacity?: number;
  interactive?: boolean;
};

export function CityLayer({ id, children, opacity = 1, interactive = false }: CityLayerProps) {
  return (
    <g id={id} data-layer={id} opacity={opacity} style={{ pointerEvents: interactive ? "auto" : "none" }}>
      {children}
    </g>
  );
}

