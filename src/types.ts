export type BuildingId =
  | "river-plate"
  | "home"
  | "san-marcos"
  | "ditella"
  | "perfumundo"
  | "footgolf"
  | "freelance";

export type Building = {
  id: BuildingId;
  zoneId: "personal" | "academic" | "work";
  name: string;
  shortDescription: string;
  story: string;
  bullets: string[];
  shape: {
    x: number;
    y: number;
    width: number;
    height: number;
    rotate?: number;
    color: string;
  };
};

export type CityZone = {
  id: "personal" | "academic" | "work";
  name: string;
  color: string;
};

