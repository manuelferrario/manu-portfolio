export type FotoItem = {
  src: string;
  alt: string;
};

export type BloquePersonal = {
  id: string;
  titulo: string;
  descripcion: string;
  foto: FotoItem;
};

export type ExamenInternacional = {
  nombre: string;
  nota?: string;
};

export type ExperienciaItem = {
  id: string;
  empresa: string;
  rol: string;
  periodo: string;
  bullets: string[];
  herramientas: string[];
  fotos: FotoItem[];
};

export type SeccionStory = {
  id: "personal" | "san-marcos" | "di-tella" | "trabajo";
  navLabel: string;
  title: string;
  subtitle: string;
  themeGradient: string;
  descripcion?: string;
  bloquesPersonales?: BloquePersonal[];
  examenesInternacionales?: ExamenInternacional[];
  bullets?: string[];
  fotos?: FotoItem[];
  experiencias?: ExperienciaItem[];
};

export const sections: SeccionStory[] = [
  {
    id: "personal",
    navLabel: "Personal",
    title: "Personal",
    subtitle: "Quién soy fuera del trabajo.",
    themeGradient: "var(--panel-grad-personal)",
    bloquesPersonales: [
      {
        id: "familia",
        titulo: "Familia",
        descripcion:
          "Mi familia es una parte central de mi día a día y del equilibrio con el que encaro mis estudios y trabajo.",
        foto: {
          src: "/portfolio/personal/familia-1.jpeg",
          alt: "Foto familiar"
        }
      },
      {
        id: "river-plate",
        titulo: "River Plate",
        descripcion:
          "Sigo a River desde chico. Es un espacio que comparto con amigos y familia en partidos y conversaciones.",
        foto: {
          src: "/portfolio/personal/river-1.jpeg",
          alt: "Foto relacionada con River Plate"
        }
      },
      {
        id: "novia",
        titulo: "Mi novia",
        descripcion:
          "Es una persona importante en mi vida personal. Compartimos proyectos, salidas y tiempo cotidiano.",
        foto: {
          src: "/portfolio/personal/novia-1.jpeg",
          alt: "Foto con mi novia"
        }
      }
    ]
  },
  {
    id: "san-marcos",
    navLabel: "San Marcos",
    title: "Colegio San Marcos de San Isidro",
    subtitle: "Fue donde me formé y donde hice mis amistades.",
    themeGradient: "var(--panel-grad-san-marcos)",
    descripcion:
      "El colegio marcó mi base académica y social. Muchas de las amistades de esa etapa siguen presentes hoy.",
    examenesInternacionales: [
      {
        nombre: "Trinity Grade 6 (GESE)",
        nota: "Merit"
      },
      {
        nombre: "Trinity Grade 9 (GESE)"
      },
      {
        nombre: "AS Exam — Global Perspectives & Research"
      }
    ],
    fotos: [
      {
        src: "/portfolio/sanmarcos/colegio-1.jpeg",
        alt: "Foto del colegio San Marcos"
      },
      {
        src: "/portfolio/sanmarcos/amigos-1.jpeg",
        alt: "Foto con amigos del colegio"
      }
    ]
  },
  {
    id: "di-tella",
    navLabel: "Di Tella",
    title: "Universidad Torcuato Di Tella",
    subtitle: "Actualmente estudio la Licenciatura en Tecnología Digital.",
    themeGradient: "var(--panel-grad-di-tella)",
    bullets: [
      "Carrera en curso.",
      "Interés en la intersección entre tecnología y negocio.",
      "Aprendizaje de fundamentos de sistemas, datos y programación."
    ],
    fotos: [
      {
        src: "/portfolio/ditella/ditella-1.jpg",
        alt: "Foto de la Universidad Torcuato Di Tella"
      }
    ]
  },
  {
    id: "trabajo",
    navLabel: "Trabajo",
    title: "Experiencia laboral",
    subtitle: "Experiencias concretas en ventas, producción y edición.",
    themeGradient: "var(--panel-grad-trabajo)",
    experiencias: [
      {
        id: "perfumundo",
        empresa: "Perfumundo",
        rol: "Coordinación de ventas mayoristas y logística",
        periodo: "Nov 2024 - Ene 2026",
        bullets: [
          "Gestión de pedidos y seguimiento con clientes por WhatsApp Web.",
          "Coordinación operativa con proveedores y equipo interno.",
          "Registro y control de tareas en Spreadsheets/Excel y Notion."
        ],
        herramientas: ["WhatsApp Web", "Spreadsheets/Excel", "Notion"],
        fotos: [
          {
            src: "/portfolio/work/perfumundo-1.png",
            alt: "Foto de experiencia en Perfumundo"
          }
        ]
      },
      {
        id: "footgolf",
        empresa: "FootGolf",
        rol: "Producción de transmisión deportiva",
        periodo: "Oct 2024",
        bullets: [
          "Armado y supervisión de la transmisión en YouTube e Instagram.",
          "Coordinación de equipo técnico durante la cobertura en vivo.",
          "Configuración de escenas y flujo de salida en OBS."
        ],
        herramientas: ["OBS", "YouTube", "Instagram Live"],
        fotos: [
          {
            src: "/portfolio/work/footgolf-1.png",
            alt: "Foto de transmisión de FootGolf"
          }
        ]
      },
      {
        id: "freelance",
        empresa: "Editor de video freelance",
        rol: "Edición para creadores y proyectos digitales",
        periodo: "Ago 2020 - Jun 2021",
        bullets: [
          "Edición de piezas para distintos formatos y plataformas.",
          "Ajustes por feedback y cumplimiento de entregas acordadas.",
          "Organización de proyectos en paralelo con plazos definidos."
        ],
        herramientas: ["Sony Vegas Pro", "Edición de video", "Entrega por hitos"],
        fotos: [
          {
            src: "/portfolio/work/freelance-1.jpg",
            alt: "Foto de trabajo de edición freelance"
          }
        ]
      }
    ]
  }
];

