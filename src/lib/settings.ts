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
    'Herramientas, materiales y equipo de seguridad para tus proyectos — todo en stock hoy, listo para llevarse.',
  heroCtaPrimary: 'Ver ofertas',
  heroCtaSecondary: 'Ver catálogo',
  heroImage: '/hero-image.avif',
  promoTitle: 'Pedidos por mayoreo',
  promoSubtitle:
    'Ahorra comprando en cantidad. Te ayudamos a armar tu pedido con los mejores precios y entrega a domicilio.',
  promoCta: 'Hacer pedido por WhatsApp',
  footerDescription:
    'Te ayudamos a encontrar la herramienta correcta para cada trabajo. Calidad, buen precio y atención cercana.',
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '',
};

export async function getSettings(): Promise<SiteSettings> {
  return DEFAULT_SETTINGS;
}

export async function saveSettings(_values: Partial<SiteSettings>) {
  return;
}
