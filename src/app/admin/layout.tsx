import { AdminNav } from '@/components/admin/admin-nav';
import { AdminMobileHeader } from '@/components/admin/mobile-header';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <AdminMobileHeader />

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
