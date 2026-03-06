import { memo } from "react";
import { RoadSegment } from "@/components/city/RoadSegment";

function RoadLayerImpl() {
  return (
    <>
      <RoadSegment d="M 32 160 L 1280 160" width={62} roadColor="#efebe4" laneColor="#c5bdb0" sidewalkColor="#b8ada0" />
      <RoadSegment d="M 32 386 L 1280 386" width={70} roadColor="#efebe4" laneColor="#c5bdb0" sidewalkColor="#b8ada0" />
      <RoadSegment d="M 32 652 L 1280 652" width={68} roadColor="#efebe4" laneColor="#c5bdb0" sidewalkColor="#b8ada0" />
      <RoadSegment d="M 300 40 L 300 820" width={64} roadColor="#efebe4" laneColor="#c5bdb0" sidewalkColor="#b8ada0" />
      <RoadSegment d="M 645 40 L 645 820" width={70} roadColor="#efebe4" laneColor="#c5bdb0" sidewalkColor="#b8ada0" />
      <RoadSegment d="M 1010 40 L 1010 820" width={62} roadColor="#efebe4" laneColor="#c5bdb0" sidewalkColor="#b8ada0" />
    </>
  );
}

export const RoadLayer = memo(RoadLayerImpl);

