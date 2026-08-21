import Link from "next/link";
import { LayoutDashboard, Package, Settings, Tags, Wrench } from "lucide-react";

const NAV = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Productos", href: "/admin/productos", icon: Package },
  { label: "Categorías", href: "/admin/categorias", icon: Tags },
  { label: "Servicios", href: "/admin/servicios", icon: Wrench },
  { label: "Categorías de Servicios", href: "/admin/servicios-categorias", icon: Tags },
  { label: "Contenido de la web", href: "/admin/configuracion", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="flex w-60 shrink-0 flex-col border-r bg-card">
        <div className="border-b px-4 py-5">
          <span className="font-display text-xl font-extrabold uppercase tracking-tight">
            La Llave
          </span>
        </div>

        <nav className="flex-1 p-3">
          <ul className="space-y-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 rounded px-3 py-2.5 text-sm font-semibold uppercase tracking-wide transition-colors hover:bg-muted"
                >
                  <item.icon className="h-4 w-4" /> {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t p-3">
          <p className="px-3 text-xs text-muted-foreground">
            Modo demo · datos de prueba
          </p>
        </div>
      </aside>

      <main className="flex-1 overflow-x-auto p-6 lg:p-10">{children}</main>
    </div>
  );
}