import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BuildingBase } from "@/components/city/BuildingBase";

export type BuildingId =
  | "river-stadium"
  | "home"
  | "san-marcos"
  | "ditella"
  | "perfumundo"
  | "footgolf-truck"
  | "freelance-studio";

type IsoBuildingProps = {
  id: BuildingId;
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
  selected: boolean;
  hovered: boolean;
  focused: boolean;
  pressed: boolean;
  pulsing: boolean;
};

function BuildingDetail({ id, x, y, width, depth, height }: { id: BuildingId; x: number; y: number; width: number; depth: number; height: number }) {
  if (id === "river-stadium") {
    return (
      <g>
        <ellipse cx={x + width * 0.62} cy={y + depth * 0.44} rx={40} ry={22} fill="#f8f3de" opacity={0.95} />
        <ellipse cx={x + width * 0.62} cy={y + depth * 0.44} rx={26} ry={13} fill="#6ab85a" />
        <path d={`M ${x + width * 0.42} ${y + depth * 0.44} L ${x + width * 0.84} ${y + depth * 0.44}`} stroke="#e8dab2" strokeWidth={2} />
      </g>
    );
  }

  if (id === "home") {
    return (
      <g>
        <polygon points={`${x + width * 0.32},${y + 10} ${x + width * 0.62},${y - depth * 0.2} ${x + width * 0.9},${y + depth * 0.2}`} fill="#ffd8e4" />
        <rect x={x + depth + 18} y={y + depth + 18} width="20" height="24" rx="4" fill="rgba(255,255,255,0.3)" />
        <rect x={x + width * 0.19} y={y + depth * 0.57} width="28" height="14" rx="3" fill="#80c982" opacity="0.8" />
      </g>
    );
  }

  if (id === "san-marcos") {
    return (
      <g>
        <rect x={x + width * 0.24} y={y + 10} width="54" height="30" rx="5" fill="#f8f4ef" opacity="0.88" />
        <rect x={x + width * 0.34} y={y + 18} width="24" height="14" rx="2" fill="#9edc7a" />
        <rect x={x + width * 0.77} y={y + depth + 14} width="2.6" height="18" fill="#dbe6f2" />
        <polygon points={`${x + width * 0.79},${y + depth + 14} ${x + width * 0.88},${y + depth + 18} ${x + width * 0.79},${y + depth + 22}`} fill="#ff8c74" />
      </g>
    );
  }

  if (id === "ditella") {
    return (
      <g>
        <rect x={x + width * 0.2} y={y + 10} width="94" height="28" rx="6" fill="#f8f0ff" opacity="0.74" />
        <rect x={x + width * 0.27} y={y + depth + 25} width="60" height="10" rx="3" fill="rgba(255,255,255,0.28)" />
        <rect x={x + width * 0.3} y={y + depth + 35} width="10" height="20" rx="2" fill="rgba(255,255,255,0.3)" />
        <rect x={x + width * 0.38} y={y + depth + 31} width="10" height="24" rx="2" fill="rgba(255,255,255,0.28)" />
        <rect x={x + width * 0.46} y={y + depth + 27} width="10" height="28" rx="2" fill="rgba(255,255,255,0.26)" />
      </g>
    );
  }

  if (id === "perfumundo") {
    return (
      <g>
        {Array.from({ length: 4 }).map((_, i) => (
          <rect key={`w-${i}`} x={x + width * 0.26 + i * 14} y={y + depth + 14} width="9" height={Math.max(46, height * 0.42)} rx="2" fill="rgba(255,255,255,0.27)" />
        ))}
        <rect x={x + width * 0.74} y={y + depth + 44} width="18" height="11" rx="2" fill="#d4b78f" />
        <rect x={x + width * 0.8} y={y + depth + 50} width="14" height="8" rx="2" fill="#c6a174" />
      </g>
    );
  }

  if (id === "footgolf-truck") {
    return (
      <g>
        <rect x={x + width * 0.14} y={y + 10} width="80" height="34" rx="8" fill="#6abd67" opacity="0.95" />
        <path d={`M ${x + width * 0.18} ${y + 26} L ${x + width * 0.86} ${y + 26}`} stroke="#eef9e0" strokeWidth={2} />
        <circle cx={x + width * 0.54} cy={y + 26} r="6" fill="none" stroke="#eef9e0" strokeWidth={1.4} />
        <rect x={x + width * 0.72} y={y + 7} width="2" height="11" fill="#eff4ff" />
        <polygon points={`${x + width * 0.74},${y + 7} ${x + width * 0.82},${y + 10} ${x + width * 0.74},${y + 13}`} fill="#ff8b74" />
      </g>
    );
  }

  return (
    <g>
      <rect x={x + width * 0.24} y={y + 10} width="66" height="26" rx="6" fill="#e7f2ff" opacity="0.8" />
      <polygon points={`${x + width * 0.35},${y + 16} ${x + width * 0.58},${y + 4} ${x + width * 0.81},${y + 16}`} fill="#b6d8ff" opacity="0.8" />
      <rect x={x + width * 0.27} y={y + depth + 20} width="52" height="14" rx="3" fill="rgba(255,255,255,0.24)" />
      <rect x={x + width * 0.31} y={y + depth + 38} width="42" height="6" rx="2" fill="#83b8ff" opacity="0.72" />
    </g>
  );
}

function BuildingImpl({ id, x, y, width, depth, height, palette, selected, hovered, focused, pressed, pulsing }: IsoBuildingProps) {
  const shouldReduceMotion = useReducedMotion();
  const showOutline = selected || hovered || focused;

  return (
    <motion.g
      id={id}
      initial={false}
      animate={{
        y: hovered && !shouldReduceMotion ? -5 : 0,
        scale: hovered && !shouldReduceMotion ? 1.022 : pressed ? 0.992 : 1
      }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2, ease: "easeOut" }}
      style={{ transformOrigin: `${x + width / 2}px ${y + depth / 2}px` }}
    >
      <BuildingBase x={x} y={y} width={width} depth={depth} height={height} palette={palette} showOutline={showOutline}>
        <BuildingDetail id={id} x={x} y={y} width={width} depth={depth} height={height} />
      </BuildingBase>

      {focused ? (
        <rect
          x={x - 14}
          y={y - depth * 0.6 - 14}
          width={width + depth + 30}
          height={height + depth + 28}
          rx={14}
          fill="transparent"
          stroke="#8ce6ff"
          strokeWidth={2}
          strokeDasharray="5 5"
        />
      ) : null}

      {selected ? <circle cx={x + width + depth + 9} cy={y + depth} r={5} fill="#c7f6ff" /> : null}

      {pulsing && !showOutline ? (
        <motion.rect
          x={x - 10}
          y={y - depth * 0.6 - 9}
          width={width + depth + 22}
          height={height + depth + 20}
          rx={12}
          fill="transparent"
          stroke="rgba(255,255,255,0.72)"
          strokeWidth={1.9}
          animate={shouldReduceMotion ? {} : { opacity: [0.14, 0.9, 0.14] }}
          transition={shouldReduceMotion ? {} : { duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : null}
    </motion.g>
  );
}

export const Building = memo(BuildingImpl);

