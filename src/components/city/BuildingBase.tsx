import { ReactNode } from "react";

type Face = [number, number];

type BuildingBaseProps = {
  x: number;
  y: number;
  width: number;
  depth: number;
  height: number;
  palette: {
    roof: string;
    left: string;
    right: string;
    accent: string;
  };
  showOutline: boolean;
  children?: ReactNode;
};

function poly(points: Face[]) {
  return points.map(([px, py]) => `${px},${py}`).join(" ");
}

export function BuildingBase({ x, y, width, depth, height, palette, showOutline, children }: BuildingBaseProps) {
  const p1: Face = [x, y];
  const p2: Face = [x + width, y - depth * 0.52];
  const p3: Face = [x + width + depth, y + depth * 0.48];
  const p4: Face = [x + depth, y + depth];

  const p1b: Face = [p1[0], p1[1] + height];
  const p2b: Face = [p2[0], p2[1] + height];
  const p3b: Face = [p3[0], p3[1] + height];
  const p4b: Face = [p4[0], p4[1] + height];

  return (
    <>
      <polygon points={poly([[p1b[0] - 10, p1b[1] + 8], [p3b[0] + 10, p3b[1] + 4], [p4b[0] + 3, p4b[1] + 18], [p1b[0] - 26, p1b[1] + 18]])} fill="rgba(8, 6, 18, 0.25)" />
      <polygon points={poly([p1, p2, p3, p4])} fill={palette.roof} stroke="rgba(255,255,255,0.45)" strokeWidth={showOutline ? 2.4 : 1.1} />
      <polygon points={poly([p1, p4, p4b, p1b])} fill={palette.left} />
      <polygon points={poly([p2, p3, p3b, p2b])} fill={palette.right} />
      <polygon
        points={poly([
          [x + width * 0.2, y + 7],
          [x + width * 0.64, y - depth * 0.16],
          [x + width * 0.88, y + depth * 0.2],
          [x + width * 0.5, y + depth * 0.36]
        ])}
        fill={palette.accent}
        opacity={0.62}
      />
      {children}
    </>
  );
}

