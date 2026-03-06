import { memo } from "react";

function Car({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="0" y="0" width="30" height="14" rx="5" fill={color} />
      <rect x="6" y="-4" width="16" height="8" rx="3" fill="rgba(255,255,255,0.62)" />
      <circle cx="6" cy="14" r="2.2" fill="#2b3446" />
      <circle cx="24" cy="14" r="2.2" fill="#2b3446" />
    </g>
  );
}

function Bench({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="0" y="0" width="18" height="5" rx="1.2" fill="#d6a86f" />
      <rect x="2" y="5" width="2.8" height="6" rx="1" fill="#8f673d" />
      <rect x="13.2" y="5" width="2.8" height="6" rx="1" fill="#8f673d" />
    </g>
  );
}

function Lamp({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="0" y="0" width="2.2" height="17" rx="1" fill="#cad7e2" />
      <circle cx="1.1" cy="-1.6" r="2.1" fill="#ffeab8" />
    </g>
  );
}

function DecorationLayerImpl() {
  return (
    <>
      <Car x={340} y={145} color="#ffd26f" />
      <Car x={680} y={145} color="#ff8e6d" />
      <Car x={1044} y={145} color="#7ecbff" />
      <Car x={860} y={370} color="#b8a1ff" />
      <Car x={430} y={638} color="#79d7c4" />

      <Bench x={130} y={100} />
      <Bench x={502} y={94} />
      <Bench x={842} y={112} />
      <Bench x={1124} y={114} />
      <Bench x={502} y={514} />
      <Bench x={1120} y={502} />

      <Lamp x={286} y={110} />
      <Lamp x={632} y={112} />
      <Lamp x={996} y={110} />
      <Lamp x={286} y={598} />
      <Lamp x={632} y={598} />
      <Lamp x={996} y={598} />

      <rect x="832" y="86" width="66" height="10" rx="3" fill="#f0e7d3" opacity="0.58" />
      <rect x="1108" y="534" width="52" height="8" rx="3" fill="#f0e7d3" opacity="0.58" />
    </>
  );
}

export const DecorationLayer = memo(DecorationLayerImpl);

