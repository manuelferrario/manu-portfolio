type RoadSegmentProps = {
  d: string;
  width: number;
  roadColor?: string;
  laneColor?: string;
  sidewalkColor?: string;
};

export function RoadSegment({
  d,
  width,
  roadColor = "#e7dfd2",
  laneColor = "#c5b9a8",
  sidewalkColor = "#b8ab97"
}: RoadSegmentProps) {
  return (
    <g>
      <path d={d} stroke={sidewalkColor} strokeWidth={width + 24} strokeLinecap="round" />
      <path d={d} stroke={roadColor} strokeWidth={width} strokeLinecap="round" />
      <path d={d} stroke={laneColor} strokeWidth={2.2} strokeDasharray="12 9" strokeLinecap="round" />
    </g>
  );
}

