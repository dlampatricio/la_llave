import type { SiteSettings } from '@/lib/settings';
import Link from 'next/link';
import { categoriesWithCounts } from '@/data/catalog';
import { serviceCategoriesWithCounts } from '@/data/services';

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V4.9c-.3 0-1.1-.1-2.1-.1-2.1 0-3.6 1.3-3.6 3.7V11H8.3v3h2.4v7h2.8z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const PRODUCT_LINKS = categoriesWithCounts()
  .filter((c) => c._count.products > 0)
  .map((c) => ({ label: c.name, href: `/productos?categoria=${c.slug}` }));

const SERVICE_LINKS = serviceCategoriesWithCounts()
  .filter((c) => c._count.services > 0)
  .map((c) => ({ label: c.name, href: `/servicios?categoria=${c.slug}` }));

const COLUMNS = [
  {
    heading: 'Productos',
    links: PRODUCT_LINKS,
  },
  {
    heading: 'Servicios',
    links: SERVICE_LINKS,
  },
  {
    heading: 'Ayuda',
    links: [
      { label: 'Cómo hacer un pedido', href: '/contacto' },
      { label: 'Pedidos por mayoreo', href: '/contacto' },
      { label: 'Ofertas de la semana', href: '/productos?ofertas=1' },
      { label: 'Nuevos productos', href: '/productos' },
    ],
  },
  {
    heading: 'La Ferretería',
    links: [
      { label: 'Sobre La Llave', href: '/contacto' },
      { label: 'Contáctanos', href: '/contacto' },
      { label: 'Aviso de privacidad', href: '/contacto' },
      { label: 'Términos de venta', href: '/contacto' },
    ],
  },
];

export function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="border-t bg-card pb-8 pt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 grid grid-cols-2 gap-8 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-1">
            <div className="mb-4">
              <span className="font-display text-xl font-extrabold uppercase tracking-tight text-foreground">
                {settings.storeName}
              </span>
            </div>
            <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
              {settings.footerDescription}
            </p>
            {(settings.facebookUrl || settings.instagramUrl) && (
              <div className="mt-4 flex items-center gap-2">
                {settings.facebookUrl && (
                  <a
                    href={settings.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="border p-2 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    <FacebookIcon className="h-4 w-4" />
                  </a>
                )}
                {settings.instagramUrl && (
                  <a
                    href={settings.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="border p-2 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    <InstagramIcon className="h-4 w-4" />
                  </a>
                )}
              </div>
            )}
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <div className="mb-4 text-xs font-bold uppercase tracking-widest text-primary">
                {col.heading}
              </div>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {settings.storeName} Ferretería. Todos los derechos
            reservados.
          </p>
          <div className="flex items-center gap-4 text-xs">
            <Link
              href="https://dlampatricio.github.io"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Design and Dev by <p className="inline underline">David Lam</p>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
