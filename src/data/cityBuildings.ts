import type { BuildingId } from "@/components/city/Building";

export type BuildingContent = {
  id: BuildingId;
  name: string;
  zone: "Personal" | "Academic" | "Work";
  order: number;
  position: { x: number; y: number };
  dimensions: { width: number; depth: number; height: number };
  palette: { roof: string; left: string; right: string; accent: string };
  description: string;
  story: string;
  bullets: string[];
  timeline: string;
  location: string;
  skills: string[];
  links: Array<{ label: string; href: string }>;
};

type ProfileContent = {
  name: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  summary: string;
  skills: string[];
  languages: string[];
  passions: string[];
  education: string[];
};

export const profile: ProfileContent = {
  name: "Manuel Ferrario (Manu)",
  location: "Nunez, Buenos Aires",
  phone: "+54 11 5004-7253",
  email: "manuelferrarioM@gmail.com",
  linkedin: "https://www.linkedin.com/in/manuel-ferrario/",
  summary:
    "Estudiante de Tecnologia Digital con interes en tecnologia y negocio. Experiencia en operaciones comerciales, coordinacion y produccion de contenidos.",
  skills: [
    "Meta Business Manager",
    "Google Suite",
    "Python (basico)",
    "C (basico)",
    "C++ (basico)",
    "Sony Vegas Pro",
    "OBS Studio",
    "Canva"
  ],
  languages: ["Espanol (nativo)", "Ingles (profesional)"],
  passions: ["Deportes", "Running", "Aprender nuevas habilidades"],
  education: [
    "Universidad Torcuato Di Tella - Lic. en Tecnologia Digital (2024-presente)",
    "Colegio San Marcos de San Isidro - Bachiller bilingue (2016-2022)",
    "Trinity Grade 9 (GESE)",
    "Trinity Grade 6 (GESE) - Merit",
    "AS Exam - Global Perspectives & Research"
  ]
};

const defaultLinks = [
  { label: "LinkedIn", href: profile.linkedin },
  { label: "Contact", href: `mailto:${profile.email}` }
];

export const cityBuildings: BuildingContent[] = [
  {
    id: "river-stadium",
    order: 1,
    name: "River Plate Stadium",
    zone: "Personal",
    position: { x: 220, y: 224 },
    dimensions: { width: 126, depth: 86, height: 64 },
    palette: { roof: "#f4d773", left: "#d1b355", right: "#b99b43", accent: "#fff2b0" },
    description: "Sports and discipline as daily training.",
    story: "River represents consistency, focus, and long-term performance mindset.",
    bullets: ["Running and football routine", "Discipline through repetition", "Healthy competitive spirit"],
    timeline: "Ongoing",
    location: "Nunez, Buenos Aires",
    skills: ["Resilience", "Consistency", "Teamwork"],
    links: defaultLinks
  },
  {
    id: "home",
    order: 2,
    name: "Manu Home",
    zone: "Personal",
    position: { x: 430, y: 206 },
    dimensions: { width: 98, depth: 66, height: 72 },
    palette: { roof: "#f6a8ba", left: "#d77f95", right: "#c36d83", accent: "#ffd6e1" },
    description: "Core values and family support.",
    story: "Home is the anchor point behind ambition, learning, and long-term decisions.",
    bullets: ["Values-first decisions", "Curiosity from everyday life", "Stable personal foundation"],
    timeline: "Always",
    location: "Nunez, Buenos Aires",
    skills: ["Empathy", "Accountability", "Adaptability"],
    links: defaultLinks
  },
  {
    id: "san-marcos",
    order: 3,
    name: "San Marcos School",
    zone: "Personal",
    position: { x: 616, y: 212 },
    dimensions: { width: 128, depth: 80, height: 78 },
    palette: { roof: "#bcd6ff", left: "#8caedb", right: "#789ac8", accent: "#e2ecff" },
    description: "Community and bilingual communication.",
    story: "San Marcos strengthened communication skills, collaboration, and social awareness.",
    bullets: ["Bilingual environment", "Strong community links", "Collaborative mindset"],
    timeline: "2016-2022",
    location: "San Isidro",
    skills: ["Communication", "Collaboration", "English"],
    links: defaultLinks
  },
  {
    id: "ditella",
    order: 4,
    name: "Di Tella Campus",
    zone: "Academic",
    position: { x: 302, y: 492 },
    dimensions: { width: 150, depth: 90, height: 96 },
    palette: { roof: "#cfb8ff", left: "#a58cda", right: "#9078c4", accent: "#ecdeff" },
    description: "Academic systems thinking and digital foundations.",
    story: "Di Tella is where business understanding and digital execution start to converge.",
    bullets: ["Lic. en Tecnologia Digital", "GPA 7.78/10", "Global perspectives approach"],
    timeline: "2024-present",
    location: "Belgrano, Buenos Aires",
    skills: ["Analytical thinking", "Problem solving", "Digital strategy"],
    links: defaultLinks
  },
  {
    id: "perfumundo",
    order: 5,
    name: "Perfumundo Office",
    zone: "Work",
    position: { x: 742, y: 316 },
    dimensions: { width: 134, depth: 86, height: 108 },
    palette: { roof: "#9be8cd", left: "#6fc1a7", right: "#5aa98f", accent: "#c9f7e8" },
    description: "Wholesale e-commerce operation at scale.",
    story: "Managed 50+ clients in parallel with focus on sales flow, logistics, and suppliers.",
    bullets: ["WhatsApp sales and support", "Supplier and logistics coordination", "Weekly commercial analysis"],
    timeline: "Nov 2024-Jan 2026",
    location: "Buenos Aires",
    skills: ["Operations", "Client management", "Execution"],
    links: defaultLinks
  },
  {
    id: "footgolf-truck",
    order: 6,
    name: "FootGolf Media Field",
    zone: "Work",
    position: { x: 980, y: 224 },
    dimensions: { width: 126, depth: 80, height: 42 },
    palette: { roof: "#f3ce9c", left: "#d9a874", right: "#be8f5f", accent: "#ffe4c8" },
    description: "Live sports production and field coordination.",
    story: "Managed live broadcasting and team coordination for real-time sports coverage.",
    bullets: ["Live streaming execution", "Camera and field coordination", "Fast operational decisions"],
    timeline: "Oct 2024",
    location: "Buenos Aires",
    skills: ["Production", "Coordination", "Problem solving"],
    links: defaultLinks
  },
  {
    id: "freelance-studio",
    order: 7,
    name: "Freelance Studio",
    zone: "Work",
    position: { x: 936, y: 508 },
    dimensions: { width: 118, depth: 76, height: 74 },
    palette: { roof: "#9fcaf8", left: "#76a5da", right: "#608ec8", accent: "#d5e8ff" },
    description: "Creative editing studio for digital formats.",
    story: "Delivered platform-adapted video content with clear deadlines and changing briefs.",
    bullets: ["Cross-platform editing", "Client requirement management", "Fast creative delivery"],
    timeline: "2020-2021",
    location: "Remote",
    skills: ["Sony Vegas", "OBS", "Canva"],
    links: defaultLinks
  }
];
