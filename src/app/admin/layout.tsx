import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { AdminNav } from "@/components/admin/admin-nav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <header className="sticky top-0 z-40 border-b bg-card lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <span className="font-display text-lg font-extrabold uppercase tracking-tight">
            La Llave
          </span>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
          >
            Ver tienda <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>
        <AdminNav variant="mobile" />
      </header>

      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r bg-card lg:flex">
        <div className="border-b px-4 py-5">
          <span className="font-display text-xl font-extrabold uppercase tracking-tight">
            La Llave
          </span>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          <AdminNav />
        </div>

        <div className="space-y-2 border-t p-3">
          <Link
            href="/"
            className="flex items-center gap-3 rounded px-3 py-2.5 text-sm font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <ExternalLink className="h-4 w-4" /> Ver tienda
          </Link>
          <p className="px-3 text-xs text-muted-foreground">
            Modo demo · datos de prueba
          </p>
        </div>
      </aside>

      <main className="flex-1 overflow-x-auto p-4 sm:p-6 lg:p-10">{children}</main>
    </div>
  );
}