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
];

const HERRAMIENTAS_ELECTRICAS = 'cat-herramientas-electricas';
const HERRAMIENTAS_MANUALES = 'cat-herramientas-manuales';
const PLOMERIA = 'cat-plomeria';
const ELECTRICIDAD = 'cat-electricidad';
const PINTURAS = 'cat-pinturas';
const SEGURIDAD = 'cat-seguridad';

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
