type TreeProps = {
  x: number;
  y: number;
  scale?: number;
};

export function Tree({ x, y, scale = 1 }: TreeProps) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cx="0" cy="12" rx="10" ry="5" fill="rgba(8,8,18,0.23)" />
      <rect x="-2.6" y="0" width="5.2" height="14" rx="1.8" fill="#1f6a52" />
      <circle cx="0" cy="-2" r="12" fill="#95d765" />
      <circle cx="-8" cy="1" r="7" fill="#73c654" />
      <circle cx="8" cy="2" r="7" fill="#60b149" />
    </g>
  );
}

