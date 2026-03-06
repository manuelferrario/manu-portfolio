import { memo } from "react";

function crosswalk(x: number, y: number, horizontal = true) {
  const bars = Array.from({ length: 6 }).map((_, idx) => {
    const bx = horizontal ? x + idx * 14 : x;
    const by = horizontal ? y : y + idx * 14;
    return <rect key={`${x}-${y}-${idx}`} x={bx} y={by} width={horizontal ? 9 : 28} height={horizontal ? 28 : 9} rx={1} fill="#fbf8f2" opacity="0.8" />;
  });
  return <g>{bars}</g>;
}

function SidewalkLayerImpl() {
  return (
    <>
      <path d="M 32 160 L 1280 160" stroke="rgba(255,255,255,0.26)" strokeWidth="2" strokeDasharray="1 8" />
      <path d="M 32 386 L 1280 386" stroke="rgba(255,255,255,0.26)" strokeWidth="2" strokeDasharray="1 8" />
      <path d="M 32 652 L 1280 652" stroke="rgba(255,255,255,0.26)" strokeWidth="2" strokeDasharray="1 8" />
      <path d="M 300 40 L 300 820" stroke="rgba(255,255,255,0.24)" strokeWidth="2" strokeDasharray="1 8" />
      <path d="M 645 40 L 645 820" stroke="rgba(255,255,255,0.24)" strokeWidth="2" strokeDasharray="1 8" />
      <path d="M 1010 40 L 1010 820" stroke="rgba(255,255,255,0.24)" strokeWidth="2" strokeDasharray="1 8" />

      {crosswalk(278, 136, false)}
      {crosswalk(624, 136, false)}
      {crosswalk(988, 136, false)}
      {crosswalk(278, 362, false)}
      {crosswalk(624, 362, false)}
      {crosswalk(988, 362, false)}
      {crosswalk(278, 628, false)}
      {crosswalk(624, 628, false)}
      {crosswalk(988, 628, false)}
    </>
  );
}

export const SidewalkLayer = memo(SidewalkLayerImpl);

