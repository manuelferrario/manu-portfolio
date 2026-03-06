import { memo } from "react";

function lot(x: number, y: number, w: number, h: number, color = "#2f886f") {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={18} fill={color} />
      <rect x={x + 8} y={y + 8} width={w - 16} height={h - 16} rx={12} fill="transparent" stroke="rgba(255,255,255,0.26)" />
    </g>
  );
}

function ParkLayerImpl() {
  return (
    <>
      {lot(86, 70, 182, 260, "#2f856f")}
      {lot(356, 58, 252, 264, "#2f8f75")}
      {lot(730, 58, 246, 266, "#2f8b74")}
      {lot(1042, 70, 216, 252, "#2f856f")}

      {lot(82, 452, 184, 170, "#2f8f75")}
      {lot(356, 468, 252, 170, "#2f856f")}
      {lot(722, 454, 252, 210, "#2f8b74")}
      {lot(1046, 456, 208, 196, "#2f8f75")}

      <path d="M 62 558 C 110 528, 190 528, 264 560 C 216 600, 140 614, 66 590 Z" fill="#68b4d6" opacity="0.93" />
      <path d="M 84 564 C 138 546, 190 548, 240 566" stroke="rgba(255,255,255,0.45)" strokeWidth="2" fill="none" />
      <rect x="220" y="570" width="42" height="8" rx="4" fill="#f1efe9" opacity="0.75" />

      <ellipse cx="1162" cy="540" rx="74" ry="42" fill="#2d8d72" />
      <ellipse cx="1162" cy="540" rx="46" ry="26" fill="#f2efe8" />
      <ellipse cx="1162" cy="540" rx="30" ry="17" fill="#9fd9ff" />
    </>
  );
}

export const ParkLayer = memo(ParkLayerImpl);

