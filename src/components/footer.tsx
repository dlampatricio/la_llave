import type { SiteSettings } from '@/lib/settings';
import Link from 'next/link';
import { categoriesWithCounts } from '@/data/catalog';

const PRODUCT_LINKS = categoriesWithCounts()
  .filter((c) => c._count.products > 0)
  .map((c) => ({ label: c.name, href: `/productos?categoria=${c.slug}` }));

const COLUMNS = [
  {
    heading: 'Productos',
    links: PRODUCT_LINKS,
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
        <div className="mb-12 grid grid-cols-2 gap-8 lg:grid-cols-4">
          <div className="col-span-2 lg:col-span-1">
            <div className="mb-4">
              <span className="font-display text-xl font-extrabold uppercase tracking-tight text-foreground">
                {settings.storeName}
              </span>
            </div>
            <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
              {settings.footerDescription}
            </p>
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
