type ParkProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
  border?: string;
  label?: string;
};

export function Park({ x, y, width, height, color = "#2f8f74", border = "rgba(255,255,255,0.35)", label }: ParkProps) {
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx={26} fill={color} />
      <rect x={x + 9} y={y + 9} width={width - 18} height={height - 18} rx={20} fill="transparent" stroke={border} strokeDasharray="8 7" />
      {label ? (
        <text x={x + 24} y={y + 34} fill="rgba(255,255,255,0.88)" fontSize="15" style={{ letterSpacing: "0.2em", fontWeight: 800 }}>
          {label}
        </text>
      ) : null}
    </g>
  );
}

