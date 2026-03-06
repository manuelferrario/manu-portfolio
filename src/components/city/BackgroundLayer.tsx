import { memo } from "react";

function BackgroundLayerImpl() {
  return (
    <>
      <defs>
        <linearGradient id="sceneBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff8b44" />
          <stop offset="46%" stopColor="#ff4f92" />
          <stop offset="100%" stopColor="#585fff" />
        </linearGradient>
        <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2f8b74" />
          <stop offset="100%" stopColor="#266c73" />
        </linearGradient>
        <pattern id="grain" width="90" height="90" patternUnits="userSpaceOnUse">
          <circle cx="12" cy="9" r="1" fill="rgba(255,255,255,0.07)" />
          <circle cx="58" cy="21" r="1" fill="rgba(255,255,255,0.06)" />
          <circle cx="28" cy="43" r="1" fill="rgba(255,255,255,0.05)" />
          <circle cx="72" cy="63" r="1" fill="rgba(255,255,255,0.06)" />
          <circle cx="40" cy="73" r="1" fill="rgba(255,255,255,0.05)" />
        </pattern>
      </defs>

      <rect x="0" y="0" width="1320" height="860" fill="url(#sceneBg)" />
      <rect x="0" y="0" width="1320" height="860" fill="rgba(8, 6, 28, 0.18)" />
      <rect x="0" y="0" width="1320" height="860" fill="url(#ground)" opacity="0.94" />
      <rect x="0" y="0" width="1320" height="860" fill="url(#grain)" opacity="0.48" />
      <ellipse cx="180" cy="108" rx="220" ry="120" fill="rgba(255,255,255,0.14)" />
      <ellipse cx="1130" cy="742" rx="260" ry="132" fill="rgba(255,255,255,0.1)" />
    </>
  );
}

export const BackgroundLayer = memo(BackgroundLayerImpl);

