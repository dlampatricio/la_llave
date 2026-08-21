import { AdminNav } from '@/components/admin/admin-nav';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { MobileNav } from '@/components/admin/mobile-nav';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <header className="sticky top-0 z-40 border-b bg-card lg:hidden">
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-3">
            <MobileNav />
            <Link href="/admin" className="flex items-center gap-2.5">
              <span className="font-display text-lg font-extrabold uppercase tracking-tight">
                La Llave
              </span>
            </Link>
          </div>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
          >
            Ver tienda <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </header>

      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r bg-card lg:flex">
        <div className="flex items-center gap-2.5 border-b px-4 py-5">
          <div>
            <div className="font-display text-xl font-extrabold uppercase leading-none tracking-tight">
              La Llave
            </div>
            <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Panel de administración
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          <AdminNav />
        </div>

        <div className="space-y-2 border-t p-3">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" /> Ver tienda
          </Link>
          <p className="px-3 text-xs text-muted-foreground">Modo demo · datos de prueba</p>
        </div>
      </aside>

      <main className="w-full flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
        <div className="mx-auto w-full max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
