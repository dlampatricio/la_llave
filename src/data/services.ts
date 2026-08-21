export type MockServiceCategory = {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
  sortOrder: number;
};

export type MockService = {
  id: string;
  name: string;
  slug: string;
  priceFrom: number | null;
  images: string[];
  featured: boolean;
  active: boolean;
  badge: string | null;
  description: string | null;
  category: { id: string; name: string; slug: string };
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export const SERVICE_CATEGORIES: MockServiceCategory[] = [
  {
    id: 'cat-srv-refrigeracion',
    name: 'Reparación de Refrigeradores',
    slug: 'reparacion-refrigeradores',
    imageUrl:
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop&auto=format',
    sortOrder: 1,
  },
  {
    id: 'cat-srv-split',
    name: 'Montaje de A/C (Split)',
    slug: 'montaje-split',
    imageUrl:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop&auto=format',
    sortOrder: 2,
  },
  {
    id: 'cat-srv-paneles',
    name: 'Instalación de Paneles Solares',
    slug: 'instalacion-paneles-solares',
    imageUrl:
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop&auto=format',
    sortOrder: 3,
  },
  {
    id: 'cat-srv-plomeria',
    name: 'Plomería y Fugas',
    slug: 'plomeria-y-fugas',
    imageUrl:
      'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&h=300&fit=crop&auto=format',
    sortOrder: 4,
  },
  {
    id: 'cat-srv-electricidad',
    name: 'Electricidad e Instalaciones',
    slug: 'electricidad-e-instalaciones',
    imageUrl:
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop&auto=format',
    sortOrder: 5,
  },
  {
    id: 'cat-srv-cerrajeria',
    name: 'Cerrajería',
    slug: 'cerrajeria',
    imageUrl:
      'https://images.unsplash.com/photo-1546827209-a218e99fdbe9?w=400&h=300&fit=crop&auto=format',
    sortOrder: 6,
  },
  {
    id: 'cat-srv-asesoria',
    name: 'Asesoría y Soluciones',
    slug: 'asesoria-y-soluciones',
    imageUrl:
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop&auto=format',
    sortOrder: 7,
  },
  {
    id: 'cat-srv-joyeria',
    name: 'Joyería y Orfebrería',
    slug: 'joyeria-y-orfebreria',
    imageUrl:
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=300&fit=crop&auto=format',
    sortOrder: 8,
  },
  {
    id: 'cat-srv-herramientas',
    name: 'Herramientas y Repuestos',
    slug: 'herramientas-y-repuestos',
    imageUrl:
      'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400&h=300&fit=crop&auto=format',
    sortOrder: 9,
  },
  {
    id: 'cat-srv-motos',
    name: 'Motos y Motorinas',
    slug: 'motos-y-motorinas',
    imageUrl:
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=400&h=300&fit=crop&auto=format',
    sortOrder: 10,
  },
];

const SRV_REFRIGERACION = 'cat-srv-refrigeracion';
const SRV_SPLIT = 'cat-srv-split';
const SRV_PANELES = 'cat-srv-paneles';
const SRV_PLOMERIA = 'cat-srv-plomeria';
const SRV_ELECTRICIDAD = 'cat-srv-electricidad';
const SRV_CERRAJERIA = 'cat-srv-cerrajeria';
const SRV_ASESORIA = 'cat-srv-asesoria';
const SRV_JOYERIA = 'cat-srv-joyeria';
const SRV_HERRAMIENTAS = 'cat-srv-herramientas';
const SRV_MOTOS = 'cat-srv-motos';

type ServiceSeed = Omit<MockService, 'id' | 'slug' | 'category' | 'createdAt' | 'updatedAt'> & {
  categoryId: string;
};

const SERVICE_SEEDS: ServiceSeed[] = [
  {
    name: 'Reparación de Refrigeradoras y Congeladores',
    priceFrom: 25,
    images: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=800&fit=crop&auto=format',
    ],
    featured: true,
    active: true,
    badge: null,
    sortOrder: 1,
    categoryId: SRV_REFRIGERACION,
    description:
      'Diagnóstico y reparación de refrigeradoras, congeladores y dispensadores de agua.\n\n• Recarga de gas (R-134a, R-600a, R-290)\n• Cambio de compresor y termostatos\n• Reparación de fugas y ruidos\n• Mantenimiento preventivo a domicilio',
  },
  {
    name: 'Montaje e Instalación de A/C Split',
    priceFrom: 40,
    images: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=800&fit=crop&auto=format',
    ],
    featured: true,
    active: true,
    badge: null,
    sortOrder: 2,
    categoryId: SRV_SPLIT,
    description:
      'Instalación y montaje de aires acondicionados tipo split, incluyendo soporte y línea de gas.\n\n• Montaje de unidad interior y exterior\n• Instalación de tubería de cobre y drenaje\n• Recarga de gas refrigerante\n• Instalación eléctrica del equipo',
  },
  {
    name: 'Instalación de Paneles Solares',
    priceFrom: 300,
    images: [
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=800&fit=crop&auto=format',
    ],
    featured: true,
    active: true,
    badge: 'NUEVO',
    sortOrder: 3,
    categoryId: SRV_PANELES,
    description:
      'Diseño e instalación de sistemas fotovoltaicos residenciales y comerciales.\n\n• Diseño del sistema según tu consumo de energía\n• Instalación de paneles, inversores y baterías\n• Cableado y protecciones\n• Puesta en marcha y asesoría de uso',
  },
  {
    name: 'Reparación de Fugas de Agua',
    priceFrom: 15,
    images: [
      'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800&h=800&fit=crop&auto=format',
    ],
    featured: false,
    active: true,
    badge: null,
    sortOrder: 4,
    categoryId: SRV_PLOMERIA,
    description:
      'Detección y reparación de fugas de agua en tuberías, tanques y grifería.\n\n• Reparación de fugas en paredes y pisos\n• Cambio de llaves, válvulas y conexiones\n• Instalación de sanitarios y lavamanos\n• Limpieza de desagües y desatascos',
  },
  {
    name: 'Instalaciones Eléctricas Residenciales',
    priceFrom: 20,
    images: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=800&fit=crop&auto=format',
    ],
    featured: false,
    active: true,
    badge: null,
    sortOrder: 5,
    categoryId: SRV_ELECTRICIDAD,
    description:
      'Instalación y mantenimiento de sistemas eléctricos para el hogar y el comercio.\n\n• Tableros y breakers\n• Circuitos nuevos y ampliaciones\n• Reparación de cortocircuitos\n• Instalación de lámparas y tomacorrientes',
  },
  {
    name: 'Cambio de Chapas y Copias de Llaves',
    priceFrom: 5,
    images: [
      'https://images.unsplash.com/photo-1546827209-a218e99fdbe9?w=800&h=800&fit=crop&auto=format',
    ],
    featured: false,
    active: true,
    badge: null,
    sortOrder: 6,
    categoryId: SRV_CERRAJERIA,
    description:
      'Servicio de cerrajería para casas, negocios y vehículos.\n\n• Cambio e instalación de chapas\n• Apertura de puertas\n• Copias de llaves (incluye llaves de moto)\n• Reparación de cerraduras',
  },
  {
    name: 'Asesoría Técnica a Domicilio',
    priceFrom: null,
    images: [
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&h=800&fit=crop&auto=format',
    ],
    featured: false,
    active: true,
    badge: null,
    sortOrder: 7,
    categoryId: SRV_ASESORIA,
    description:
      'Te orientamos para elegir la herramienta, el material o el equipo correcto para tu proyecto.\n\n• Recomendación de productos según tu uso\n• Orientación sobre sistemas solares y aire acondicionado\n• Soluciones a la medida de tu taller o negocio',
  },
  {
    name: 'Reparación de Joyas y Orfebrería',
    priceFrom: 5,
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=800&fit=crop&auto=format',
    ],
    featured: false,
    active: true,
    badge: null,
    sortOrder: 8,
    categoryId: SRV_JOYERIA,
    description:
      'Reparación y mantenimiento de joyas, anillos, cadenas y piezas de orfebrería.\n\n• Cambio de piedras y engastes\n• Soldadura de eslabones y broches\n• Pulido y limpieza profesional\n• Elaboración de piezas a pedido',
  },
  {
    name: 'Reparación de Herramientas y Repuestos',
    priceFrom: 8,
    images: [
      'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800&h=800&fit=crop&auto=format',
    ],
    featured: false,
    active: true,
    badge: null,
    sortOrder: 9,
    categoryId: SRV_HERRAMIENTAS,
    description:
      'Reparación y mantenimiento de herramientas eléctricas y manuales.\n\n• Cambio de escobillas, mandriles e interruptores\n• Afilado de brocas y cuchillas\n• Búsqueda y venta de repuestos\n• Mantenimiento preventivo',
  },
  {
    name: 'Mantenimiento de Motos y Motorinas',
    priceFrom: 10,
    images: [
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&h=800&fit=crop&auto=format',
    ],
    featured: true,
    active: true,
    badge: null,
    sortOrder: 10,
    categoryId: SRV_MOTOS,
    description:
      'Mantenimiento y reparación de motos de combustión y motorinas.\n\n• Cambio de aceite y filtros\n• Ajuste de carburador y bujías\n• Cambio de arrastres, cadenas y frenos\n• Reparación de motor',
  },
];

function toSlug(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

function buildServices(): MockService[] {
  const catById = new Map(SERVICE_CATEGORIES.map((c) => [c.id, c]));
  return SERVICE_SEEDS.map((seed, index) => {
    const category = catById.get(seed.categoryId)!;
    return {
      ...seed,
      id: `srv-${index + 1}`,
      slug: toSlug(seed.name),
      category: { id: category.id, name: category.name, slug: category.slug },
      createdAt: new Date(Date.now() - index * 86_400_000).toISOString(),
      updatedAt: new Date(Date.now() - index * 43_200_000).toISOString(),
    };
  });
}

export const SERVICES: MockService[] = buildServices();

export function serviceCategoriesWithCounts() {
  return SERVICE_CATEGORIES.map((cat) => ({
    ...cat,
    _count: { services: SERVICES.filter((s) => s.active && s.category.id === cat.id).length },
  }));
}