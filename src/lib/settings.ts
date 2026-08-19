export type SiteSettings = {
  storeName: string;
  heroBadge: string;
  heroTitleLine1: string;
  heroTitleHighlight: string;
  heroTitleLine2: string;
  heroSubtitle: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  heroImage: string;
  promoTitle: string;
  promoSubtitle: string;
  promoCta: string;
  footerDescription: string;
  whatsappNumber: string;
};

export const DEFAULT_SETTINGS: SiteSettings = {
  storeName: 'La Llave',
  heroBadge: 'Ofertas de la Semana — Hasta 35% OFF',
  heroTitleLine1: 'Construido',
  heroTitleHighlight: 'para el',
  heroTitleLine2: 'Trabajo Serio',
  heroSubtitle:
    'Herramientas profesionales, materiales y equipo de seguridad — todo lo que tu obra necesita, en stock hoy.',
  heroCtaPrimary: 'Ver ofertas',
  heroCtaSecondary: 'Ver catálogo',
  heroImage: '/hero-image.avif',
  promoTitle: 'Cuenta Profesional',
  promoSubtitle:
    'Contratistas ahorran 12% en cada pedido. Facturación a 30 días y asesor dedicado.',
  promoCta: 'Cotizar por WhatsApp',
  footerDescription:
    'Sirviendo a contratistas, maestros albañiles y aficionados serios desde 1978. Herramientas de calidad, precios justos.',
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '',
};

export async function getSettings(): Promise<SiteSettings> {
  return DEFAULT_SETTINGS;
}

export async function saveSettings(_values: Partial<SiteSettings>) {
  return;
}
