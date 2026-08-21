import Link from "next/link";
import {
  ArrowRight,
  PackagePlus,
  Pencil,
  Settings,
  TriangleAlert,
  Wallet,
  Wrench,
} from "lucide-react";
import { PRODUCTS } from "@/data/catalog";
import { SERVICES } from "@/data/services";
import { formatPrice } from "@/lib/utils";
import { Card } from "@/components/ui/card";

export const dynamic = "force-dynamic";

const LOW_STOCK_LIMIT = 5;

export default function AdminDashboard() {
  const activeProducts = PRODUCTS.filter((p) => p.active);
  const inventoryValue = activeProducts.reduce((sum, p) => sum + p.price * p.stock, 0);
  const lowStock = activeProducts
    .filter((p) => p.stock <= LOW_STOCK_LIMIT)
    .sort((a, b) => a.stock - b.stock);

  const stats = [
    { label: "Productos activos", value: String(activeProducts.length), href: "/admin/productos", icon: PackagePlus },
    { label: "Servicios activos", value: String(SERVICES.filter((s) => s.active).length), href: "/admin/servicios", icon: Wrench },
    { label: "Valor del inventario", value: formatPrice(inventoryValue), href: "/admin/productos", icon: Wallet },
    { label: `Stock bajo (≤${LOW_STOCK_LIMIT})`, value: String(lowStock.length), href: "/admin/productos?stock=1", icon: TriangleAlert },
  ];

  const quickActions = [
    { label: "Nuevo producto", href: "/admin/productos/nuevo", icon: PackagePlus },
    { label: "Nuevo servicio", href: "/admin/servicios/nuevo", icon: Wrench },
    { label: "Editar contenido de la web", href: "/admin/configuracion", icon: Settings },
  ];

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-black uppercase tracking-tight">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">Resumen de tu negocio</p>
        </div>
        <Link
          href="/admin/productos/nuevo"
          className="flex items-center gap-2 bg-primary px-5 py-2.5 text-sm font-bold uppercase tracking-widest text-primary-foreground hover:brightness-110"
        >
          <PackagePlus className="h-4 w-4" /> Nuevo producto
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="p-5 transition-shadow hover:shadow-md">
              <div className="mb-3 flex items-center justify-between">
                <stat.icon className="h-5 w-5 text-primary" />
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="font-display text-3xl font-black">{stat.value}</div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {stat.label}
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <h2 className="font-display mb-1 text-2xl font-extrabold uppercase tracking-tight">
            Alertas de stock
          </h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Productos activos con {LOW_STOCK_LIMIT} unidades o menos.
          </p>

          {lowStock.length === 0 ? (
            <div className="border border-dashed px-4 py-10 text-center">
              <p className="font-semibold uppercase tracking-wide">Sin alertas</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Todo el inventario está en buen nivel.
              </p>
            </div>
          ) : (
            <ul className="divide-y border">
              {lowStock.map((p) => (
                <li key={p.id} className="flex items-center gap-3 px-4 py-3">
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-semibold">{p.name}</div>
                    {p.sku && <div className="text-xs text-muted-foreground">{p.sku}</div>}
                  </div>
                  <span
                    className={`shrink-0 border px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${
                      p.stock === 0
                        ? "border-destructive/30 bg-destructive/10 text-destructive"
                        : "text-muted-foreground"
                    }`}
                  >
                    {p.stock} en stock
                  </span>
                  <Link
                    href={`/admin/productos/${p.id}/editar`}
                    aria-label={`Editar ${p.name}`}
                    className="shrink-0 border p-1.5 transition-colors hover:bg-muted"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card className="p-5">
          <h2 className="font-display mb-1 text-2xl font-extrabold uppercase tracking-tight">
            Accesos rápidos
          </h2>
          <p className="mb-4 text-sm text-muted-foreground">Las tareas más frecuentes.</p>
          <ul className="space-y-2">
            {quickActions.map((action) => (
              <li key={action.href}>
                <Link
                  href={action.href}
                  className="flex items-center justify-between gap-3 border px-4 py-3 transition-colors hover:bg-muted"
                >
                  <span className="flex items-center gap-2.5 text-sm font-semibold">
                    <action.icon className="h-4 w-4 text-primary" /> {action.label}
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}