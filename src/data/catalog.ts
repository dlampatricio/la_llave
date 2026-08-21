export type MockCategory = {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
  sortOrder: number;
};

export type MockProduct = {
  id: string;
  name: string;
  slug: string;
  sku: string | null;
  price: number;
  wasPrice: number | null;
  stock: number;
  images: string[];
  featured: boolean;
  onSale: boolean;
  badge: string | null;
  rating: number | null;
  reviewsCount: number;
  active: boolean;
  description: string | null;
  category: { id: string; name: string; slug: string };
  createdAt: string;
  updatedAt: string;
};

export const CATEGORIES: MockCategory[] = [
  {
    id: 'cat-herramientas-electricas',
    name: 'Herramientas Eléctricas',
    slug: 'herramientas-electricas',
    imageUrl:
      'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400&h=300&fit=crop&auto=format',
    sortOrder: 1,
  },
  {
    id: 'cat-herramientas-manuales',
    name: 'Herramientas Manuales',
    slug: 'herramientas-manuales',
    imageUrl:
      'https://images.unsplash.com/photo-1426927308491-6380b6a9936f?w=400&h=300&fit=crop&auto=format',
    sortOrder: 2,
  },
  {
    id: 'cat-tornilleria',
    name: 'Tornillería',
    slug: 'tornilleria',
    imageUrl:
      'https://images.unsplash.com/photo-1570129476815-ba368ac77013?w=400&h=300&fit=crop&auto=format',
    sortOrder: 3,
  },
  {
    id: 'cat-plomeria',
    name: 'Plomería',
    slug: 'plomeria',
    imageUrl:
      'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&h=300&fit=crop&auto=format',
    sortOrder: 4,
  },
  {
    id: 'cat-electricidad',
    name: 'Electricidad',
    slug: 'electricidad',
    imageUrl:
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop&auto=format',
    sortOrder: 5,
  },
  {
    id: 'cat-pinturas',
    name: 'Pinturas',
    slug: 'pinturas',
    imageUrl:
      'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&h=300&fit=crop&auto=format',
    sortOrder: 6,
  },
  {
    id: 'cat-seguridad',
    name: 'Seguridad y Protección',
    slug: 'seguridad-y-proteccion',
    imageUrl:
      'https://images.unsplash.com/photo-1731694411560-050e5b91e943?w=400&h=300&fit=crop&auto=format',
    sortOrder: 7,
  },
  {
    id: 'cat-herramientas-joyeria',
    name: 'Herramientas para Joyería',
    slug: 'herramientas-joyeria',
    imageUrl:
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=300&fit=crop&auto=format',
    sortOrder: 8,
  },
  {
    id: 'cat-materiales-construccion',
    name: 'Materiales de Construcción',
    slug: 'materiales-construccion',
    imageUrl:
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop&auto=format',
    sortOrder: 9,
  },
  {
    id: 'cat-refrigeracion',
    name: 'Refrigeración y Repuestos',
    slug: 'refrigeracion',
    imageUrl:
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop&auto=format',
    sortOrder: 10,
  },
  {
    id: 'cat-piezas-moto',
    name: 'Piezas de Moto',
    slug: 'piezas-moto',
    imageUrl:
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=400&h=300&fit=crop&auto=format',
    sortOrder: 11,
  },
  {
    id: 'cat-paneles-solares',
    name: 'Paneles Solares y Energía',
    slug: 'paneles-solares',
    imageUrl:
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop&auto=format',
    sortOrder: 12,
  },
];

const HERRAMIENTAS_ELECTRICAS = 'cat-herramientas-electricas';
const HERRAMIENTAS_MANUALES = 'cat-herramientas-manuales';
const PLOMERIA = 'cat-plomeria';
const ELECTRICIDAD = 'cat-electricidad';
const PINTURAS = 'cat-pinturas';
const SEGURIDAD = 'cat-seguridad';
const HERRAMIENTAS_JOYERIA = 'cat-herramientas-joyeria';
const MATERIALES_CONSTRUCCION = 'cat-materiales-construccion';
const REFRIGERACION = 'cat-refrigeracion';
const PIEZAS_MOTO = 'cat-piezas-moto';
const PANELES_SOLARES = 'cat-paneles-solares';

type ProductSeed = Omit<MockProduct, 'id' | 'slug' | 'category' | 'createdAt' | 'updatedAt'> & {
  categoryId: string;
};

const PRODUCT_SEEDS: ProductSeed[] = [
  {
    name: 'Taladro Percutor 13mm 750W',
    sku: 'HE-TL-750',
    price: 129,
    wasPrice: 159,
    stock: 14,
    badge: 'OFERTA',
    featured: true,
    onSale: true,
    rating: 4.8,
    reviewsCount: 312,
    active: true,
    categoryId: HERRAMIENTAS_ELECTRICAS,
    description:
      'Taladro percutor profesional de 750W con mandril de 13mm. Incluye maletín, juego de brocas y mango auxiliar.\n\n• Velocidad variable: 0-3,000 RPM\n• Percusión para concreto y mampostería\n• Cable de 2 metros y gancho para cinturón',
    images: [
      'https://images.unsplash.com/photo-1546827209-a218e99fdbe9?w=800&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&h=800&fit=crop&auto=format',
    ],
  },
  {
    name: 'Martillo de Uña 16oz',
    sku: 'HM-MT-16',
    price: 24.99,
    wasPrice: null,
    stock: 45,
    badge: 'MÁS VENDIDO',
    featured: true,
    onSale: false,
    rating: 4.6,
    reviewsCount: 891,
    active: true,
    categoryId: HERRAMIENTAS_MANUALES,
    description:
      'Martillo de uña profesional con cabeza de acero forjado y mango ergonómico de fibra de vidrio.\n\n• Cabeza templada para máxima durabilidad\n• Peso: 16 onzas (450 g)\n• Mango antideslizante con absorción de impacto',
    images: [
      'https://images.unsplash.com/photo-1426927308491-6380b6a9936f?w=800&h=800&fit=crop&auto=format',
    ],
  },
  {
    name: 'Juego de Puntas Torx y Hex 40 pzas',
    sku: 'HM-PT-40',
    price: 18.5,
    wasPrice: null,
    stock: 60,
    badge: 'NUEVO',
    featured: true,
    onSale: false,
    rating: 4.9,
    reviewsCount: 156,
    active: true,
    categoryId: HERRAMIENTAS_MANUALES,
    description:
      'Juego de 40 puntas de acero S2 con adaptador magnético universal y organizador con bisagra.\n\n• Puntas Torx, Hex, Phillips y planas\n• Adaptador de 1/4" con imán\n• Estuche compacto para el cinturón',
    images: [
      'https://images.unsplash.com/photo-1570129476815-ba368ac77013?w=800&h=800&fit=crop&auto=format',
    ],
  },
  {
    name: 'Bolsa de Herramientas 18"',
    sku: 'HM-BL-18',
    price: 64,
    wasPrice: 79,
    stock: 8,
    badge: 'OFERTA',
    featured: true,
    onSale: true,
    rating: 4.7,
    reviewsCount: 204,
    active: true,
    categoryId: HERRAMIENTAS_MANUALES,
    description:
      'Bolsa de herramientas de lona reforzada con 18 bolsillos y base impermeable.\n\n• 18 bolsillos interiores y exteriores\n• Base de PVC reforzada\n• Correa ajustable y asas acolchadas',
    images: [
      'https://images.unsplash.com/photo-1731694411560-050e5b91e943?w=800&h=800&fit=crop&auto=format',
    ],
  },
  {
    name: 'Válvula de Bola 1/2" Latón',
    sku: 'PL-VB-12',
    price: 8.9,
    wasPrice: null,
    stock: 55,
    badge: null,
    featured: false,
    onSale: false,
    rating: 4.6,
    reviewsCount: 66,
    active: true,
    categoryId: PLOMERIA,
    description: 'Válvula de bola de latón de 1/2" con manija de acero inoxidable, rosca NPT.',
    images: [
      'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800&h=800&fit=crop&auto=format',
    ],
  },
  {
    name: 'Cinta Teflón 1/2" x 12 m',
    sku: 'PL-TF-12',
    price: 2.5,
    wasPrice: null,
    stock: 200,
    badge: null,
    featured: false,
    onSale: false,
    rating: 4.9,
    reviewsCount: 320,
    active: true,
    categoryId: PLOMERIA,
    description:
      'Cinta de teflón para sellado de roscas en conexiones de agua y gas. Uso industrial.',
    images: [
      'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800&h=800&fit=crop&auto=format',
    ],
  },
  {
    name: 'Multímetro Digital 600V',
    sku: 'EL-MT-600',
    price: 45,
    wasPrice: 54,
    stock: 0,
    badge: 'OFERTA',
    featured: false,
    onSale: true,
    rating: 4.7,
    reviewsCount: 189,
    active: true,
    categoryId: ELECTRICIDAD,
    description:
      'Multímetro digital con medición de voltaje, corriente y resistencia hasta 600V. Incluye puntas y estuche.',
    images: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=800&fit=crop&auto=format',
    ],
  },
  {
    name: 'Cable THW Calibre 12 Rollo 100 m',
    sku: 'EL-CB-12',
    price: 38.5,
    wasPrice: null,
    stock: 30,
    badge: null,
    featured: false,
    onSale: false,
    rating: 4.8,
    reviewsCount: 154,
    active: true,
    categoryId: ELECTRICIDAD,
    description:
      'Cable de cobre THW calibre 12 AWG para instalaciones eléctricas residenciales, rollo de 100 metros.',
    images: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=800&fit=crop&auto=format',
    ],
  },
  {
    name: 'Pintura Vinílica Blanca 19 L',
    sku: 'PN-VB-19',
    price: 58,
    wasPrice: null,
    stock: 18,
    badge: 'NUEVO',
    featured: true,
    onSale: false,
    rating: 4.4,
    reviewsCount: 88,
    active: true,
    categoryId: PINTURAS,
    description:
      'Pintura vinílica de alta cubrición para interiores y exteriores. Rendimiento aproximado de 70 m² por cubeta.',
    images: [
      'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&h=800&fit=crop&auto=format',
    ],
  },
  {
    name: 'Casco de Seguridad Clase E',
    sku: 'SG-CS-E',
    price: 15.75,
    wasPrice: null,
    stock: 40,
    badge: null,
    featured: false,
    onSale: false,
    rating: 4.8,
    reviewsCount: 210,
    active: true,
    categoryId: SEGURIDAD,
    description:
      'Casco de seguridad clase E con suspensión de 6 puntos y banda de sudor. Cumple norma ANSI Z89.1.',
    images: [
      'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=800&h=800&fit=crop&auto=format',
    ],
  },
  {
    name: 'Juego de Pinzas para Joyería 5 pzas',
    sku: 'JOY-PJ-5',
    price: 32,
    wasPrice: null,
    stock: 22,
    badge: 'NUEVO',
    featured: true,
    onSale: false,
    rating: 4.7,
    reviewsCount: 45,
    active: true,
    categoryId: HERRAMIENTAS_JOYERIA,
    description:
      'Juego de 5 pinzas profesionales para joyería y orfebrería: corte, punta fina, cadena y planas.\n\n• Acero inoxidable con punta endurecida\n• Mango ergonómico antideslizante\n• Estuche de tela incluido',
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=800&fit=crop&auto=format',
    ],
  },
  {
    name: 'Lupa de Joyero 10x con Luz LED',
    sku: 'JOY-LJ-10',
    price: 12,
    wasPrice: 15,
    stock: 34,
    badge: 'OFERTA',
    featured: false,
    onSale: true,
    rating: 4.6,
    reviewsCount: 78,
    active: true,
    categoryId: HERRAMIENTAS_JOYERIA,
    description:
      'Lupa de joyero con aumento 10x y luz LED integrada para inspección de piedras y acabados.',
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=800&fit=crop&auto=format',
    ],
  },
  {
    name: 'Cemento Gris 42.5 kg',
    sku: 'MC-CM-425',
    price: 11.5,
    wasPrice: null,
    stock: 120,
    badge: null,
    featured: false,
    onSale: false,
    rating: 4.8,
    reviewsCount: 340,
    active: true,
    categoryId: MATERIALES_CONSTRUCCION,
    description:
      'Cemento gris Portland de uso general, presentación de 42.5 kg. Ideal para fundiciones, pegas y repello.',
    images: [
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=800&fit=crop&auto=format',
    ],
  },
  {
    name: 'Bloque de Concreto 15x20x40',
    sku: 'MC-BL-1520',
    price: 1.25,
    wasPrice: null,
    stock: 400,
    badge: null,
    featured: false,
    onSale: false,
    rating: 4.5,
    reviewsCount: 96,
    active: true,
    categoryId: MATERIALES_CONSTRUCCION,
    description: 'Bloque de concreto de 15x20x40 cm para muros y paredes. Venta por unidad.',
    images: [
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=800&fit=crop&auto=format',
    ],
  },
  {
    name: 'Gas Refrigerante R-134a 340 g',
    sku: 'RF-GS-134',
    price: 18,
    wasPrice: null,
    stock: 25,
    badge: null,
    featured: false,
    onSale: false,
    rating: 4.9,
    reviewsCount: 132,
    active: true,
    categoryId: REFRIGERACION,
    description:
      'Gas refrigerante R-134a en lata de 340 g para recarga de refrigeradoras y aires acondicionados.',
    images: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=800&fit=crop&auto=format',
    ],
  },
  {
    name: 'Compresor Hermético 1/3 HP R134a',
    sku: 'RF-CP-13',
    price: 145,
    wasPrice: 170,
    stock: 6,
    badge: 'OFERTA',
    featured: true,
    onSale: true,
    rating: 4.7,
    reviewsCount: 58,
    active: true,
    categoryId: REFRIGERACION,
    description:
      'Compresor hermético de 1/3 HP para refrigeradoras, compatible con refrigerante R-134a.\n\n• Voltaje: 115V / 60Hz\n• Incluye capacitor de arranque\n• Garantía de 90 días',
    images: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=800&fit=crop&auto=format',
    ],
  },
  {
    name: 'Bujía NGK para Moto',
    sku: 'MT-BJ-NGK',
    price: 3.5,
    wasPrice: null,
    stock: 80,
    badge: null,
    featured: false,
    onSale: false,
    rating: 4.9,
    reviewsCount: 210,
    active: true,
    categoryId: PIEZAS_MOTO,
    description: 'Bujía NGK de combustión para motos y motorinas de 2 y 4 tiempos. Venta por unidad.',
    images: [
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&h=800&fit=crop&auto=format',
    ],
  },
  {
    name: 'Kit de Arrastre y Cadena 428',
    sku: 'MT-KC-428',
    price: 24,
    wasPrice: null,
    stock: 15,
    badge: 'NUEVO',
    featured: false,
    onSale: false,
    rating: 4.6,
    reviewsCount: 74,
    active: true,
    categoryId: PIEZAS_MOTO,
    description:
      'Kit completo de arrastre para moto: piñón, corona y cadena 428. Compatible con la mayoría de motorinas 150cc.',
    images: [
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&h=800&fit=crop&auto=format',
    ],
  },
  {
    name: 'Panel Solar Monocristalino 450W',
    sku: 'PS-PN-450',
    price: 189,
    wasPrice: null,
    stock: 20,
    badge: 'NUEVO',
    featured: true,
    onSale: false,
    rating: 4.9,
    reviewsCount: 41,
    active: true,
    categoryId: PANELES_SOLARES,
    description:
      'Panel solar monocristalino de 450W para sistemas residenciales y comerciales.\n\n• Eficiencia superior al 21%\n• Marco de aluminio resistente a corrosión\n• Garantía de 25 años',
    images: [
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=800&fit=crop&auto=format',
    ],
  },
  {
    name: 'Inversor Híbrido 3kW 48V',
    sku: 'PS-IN-3K',
    price: 320,
    wasPrice: 360,
    stock: 8,
    badge: 'OFERTA',
    featured: true,
    onSale: true,
    rating: 4.8,
    reviewsCount: 33,
    active: true,
    categoryId: PANELES_SOLARES,
    description:
      'Inversor híbrido de 3kW a 48V con cargador solar integrado (MPPT). Ideal para hogares con paneles solares.',
    images: [
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=800&fit=crop&auto=format',
    ],
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

function buildProducts(): MockProduct[] {
  const catById = new Map(CATEGORIES.map((c) => [c.id, c]));
  return PRODUCT_SEEDS.map((seed, index) => {
    const category = catById.get(seed.categoryId)!;
    return {
      ...seed,
      id: `prod-${index + 1}`,
      slug: toSlug(seed.name),
      category: { id: category.id, name: category.name, slug: category.slug },
      createdAt: new Date(Date.now() - index * 86_400_000).toISOString(),
      updatedAt: new Date(Date.now() - index * 43_200_000).toISOString(),
    };
  });
}

export const PRODUCTS: MockProduct[] = buildProducts();

export function categoriesWithCounts() {
  return CATEGORIES.map((cat) => ({
    ...cat,
    _count: { products: PRODUCTS.filter((p) => p.active && p.category.id === cat.id).length },
  }));
}
