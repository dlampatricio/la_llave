import Link from "next/link";
import {
  ArrowRight,
  PackagePlus,
  Settings,
  Wallet,
  Wrench,
} from "lucide-react";
import { PRODUCTS } from "@/data/catalog";
import { SERVICES } from "@/data/services";
import { formatPrice } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { PageHeader } from "@/components/admin/page-header";

export const dynamic = "force-dynamic";

export default function AdminDashboard() {
  const activeProducts = PRODUCTS.filter((p) => p.active);
  const inventoryValue = activeProducts.reduce((sum, p) => sum + p.price * p.stock, 0);

  const stats = [
    { label: "Productos activos", value: String(activeProducts.length), href: "/admin/productos", icon: PackagePlus },
    { label: "Servicios activos", value: String(SERVICES.filter((s) => s.active).length), href: "/admin/servicios", icon: Wrench },
    { label: "Valor del inventario", value: formatPrice(inventoryValue), href: "/admin/productos", icon: Wallet },
  ];

  const quickActions = [
    { label: "Nuevo producto", href: "/admin/productos/nuevo", icon: PackagePlus },
    { label: "Nuevo servicio", href: "/admin/servicios/nuevo", icon: Wrench },
    { label: "Editar contenido de la web", href: "/admin/configuracion", icon: Settings },
  ];

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Resumen de tu negocio"
        actions={
          <ButtonLink href="/admin/productos/nuevo">
            <PackagePlus className="h-4 w-4" /> Nuevo producto
          </ButtonLink>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href} className="group min-w-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
            <Card className="h-full p-5 transition-shadow group-hover:shadow-card-hover">
              <div className="mb-3 flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center border bg-primary/10">
                  <stat.icon className="h-4 w-4 text-primary" aria-hidden="true" />
                </span>
                <ArrowRight
                  className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </div>
              <div className="font-display text-3xl font-black leading-none">{stat.value}</div>
              <div className="mt-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {stat.label}
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <Card className="mt-8 min-w-0 p-5">
        <h2 className="font-display mb-1 text-2xl font-extrabold uppercase tracking-tight">
          Accesos rápidos
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">Las tareas más frecuentes.</p>
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action) => (
            <li key={action.href}>
              <Link
                href={action.href}
                className="group flex min-w-0 items-center justify-between gap-3 border px-4 py-3 transition-colors hover:bg-muted"
              >
                <span className="flex min-w-0 items-center gap-2.5 text-sm font-semibold">
                  <action.icon className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />{" "}
                  <span className="truncate">{action.label}</span>
                </span>
                <ArrowRight
                  className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
