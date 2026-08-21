import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronRight,
  PackagePlus,
  Settings,
  TriangleAlert,
  Wrench,
} from "lucide-react";
import { CATEGORIES, PRODUCTS, categoriesWithCounts } from "@/data/catalog";
import { SERVICES } from "@/data/services";
import { offerNeedsFix } from "@/lib/admin-list";
import { Card } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { PageHeader } from "@/components/admin/page-header";

export const dynamic = "force-dynamic";

export default function AdminDashboard() {
  const activeProducts = PRODUCTS.filter((p) => p.active);
  const onSaleCount = activeProducts.filter((p) => p.onSale).length;
  const featuredCount = activeProducts.filter((p) => p.featured).length;

  const stats = [
    { label: "Productos activos", value: String(activeProducts.length), href: "/admin/productos", icon: PackagePlus },
    { label: "Servicios activos", value: String(SERVICES.filter((s) => s.active).length), href: "/admin/servicios", icon: Wrench },
    { label: "En oferta ahora", value: String(onSaleCount), href: "/admin/productos?oferta=1", icon: TriangleAlert },
  ];

  const health = [
    {
      label: "Productos sin foto",
      count: PRODUCTS.filter((p) => p.images.length === 0).length,
      href: "/admin/productos?sin-foto=1",
    },
    {
      label: "Productos ocultos",
      count: PRODUCTS.filter((p) => !p.active).length,
      href: "/admin/productos?ocultos=1",
    },
    {
      label: "Sin descripción",
      count: PRODUCTS.filter((p) => !(p.description ?? "").trim()).length,
      href: "/admin/productos?sin-descripcion=1",
    },
    {
      label: "Ofertas mal armadas",
      count: PRODUCTS.filter(offerNeedsFix).length,
      href: "/admin/productos?oferta-mala=1",
    },
    {
      label: "Categorías vacías",
      count: CATEGORIES.filter((c) => !PRODUCTS.some((p) => p.category.id === c.id)).length,
      href: "/admin/categorias",
    },
  ];

  const visibility = [
    { label: "En oferta ahora", value: onSaleCount, href: "/admin/productos?oferta=1" },
    { label: "Destacados en portada", value: featuredCount, href: "/admin/productos?destacados=1" },
    { label: "Etiqueta NUEVO", value: PRODUCTS.filter((p) => p.badge === "NUEVO").length, href: null },
    {
      label: "Etiqueta más vendido",
      value: PRODUCTS.filter((p) => ["MAS VENDIDO", "MÁS VENDIDO"].includes(p.badge ?? "")).length,
      href: null,
    },
  ];

  const categoryCounts = [...categoriesWithCounts()].sort(
    (a, b) => b._count.products - a._count.products,
  );
  const maxCategoryCount = Math.max(...categoryCounts.map((c) => c._count.products), 1);

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

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href} className="group block min-w-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
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
          Salud del catálogo
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Detalles que tus clientes ven en la web. Entre menos alertas, mejor se vende.
        </p>

        <ul className="divide-y border">
          {health.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                  item.count > 0 ? "hover:bg-muted" : ""
                }`}
              >
                {item.count > 0 ? (
                  <TriangleAlert className="h-4 w-4 shrink-0 text-warning" aria-hidden="true" />
                ) : (
                  <Check className="h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                )}
                <span className="min-w-0 flex-1 text-sm font-semibold leading-snug">{item.label}</span>
                {item.count > 0 ? (
                  <>
                    <span className="shrink-0 border border-warning/40 bg-warning/10 px-2 py-0.5 text-xs font-bold text-warning">
                      {item.count}
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                  </>
                ) : (
                  <span className="shrink-0 text-xs uppercase tracking-widest text-muted-foreground">
                    En orden
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </Card>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card className="min-w-0 p-5">
          <h2 className="font-display mb-1 text-2xl font-extrabold uppercase tracking-tight">
            Visibilidad y promoción
          </h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Cómo está tu catálogo para vender hoy.
          </p>
          <ul className="divide-y border">
            {visibility.map((item) => (
              <li key={item.label} className="flex items-center justify-between gap-3 px-4 py-3">
                <span className="min-w-0 text-sm font-semibold">{item.label}</span>
                {item.href && item.value > 0 ? (
                  <Link
                    href={item.href}
                    className="flex shrink-0 items-center gap-1 font-display text-xl font-black text-primary hover:underline"
                  >
                    {item.value}
                  </Link>
                ) : (
                  <span className="shrink-0 font-display text-xl font-black">{item.value}</span>
                )}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="min-w-0 p-5">
          <h2 className="font-display mb-1 text-2xl font-extrabold uppercase tracking-tight">
            Productos por categoría
          </h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Qué tan repartido está tu catálogo.
          </p>
          <ul className="space-y-3">
            {categoryCounts.map((c) => (
              <li key={c.id}>
                <div className="mb-1 flex items-baseline justify-between gap-2 text-sm">
                  <span className="sm:truncate font-semibold">{c.name}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">{c._count.products}</span>
                </div>
                <div className="h-2 w-full bg-muted">
                  <div
                    className={`h-full ${c._count.products === 0 ? "bg-muted-foreground/30" : "bg-primary"}`}
                    style={{
                      width: `${c._count.products === 0 ? 100 : Math.max((c._count.products / maxCategoryCount) * 100, 6)}%`,
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="mt-4 min-w-0 p-5">
        <h2 className="font-display mb-1 text-2xl font-extrabold uppercase tracking-tight">
          Accesos rápidos
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">Las tareas más frecuentes.</p>
        <ul className="grid gap-2 sm:grid-cols-3">
          {quickActions.map((action) => (
            <li key={action.href} className="min-w-0">
              <Link
                href={action.href}
                className="group flex min-w-0 items-center justify-between gap-3 border px-4 py-3 transition-colors hover:bg-muted"
              >
                <span className="flex min-w-0 items-center gap-2.5 text-sm font-semibold">
                  <action.icon className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />{" "}
                  <span className="sm:truncate">{action.label}</span>                </span>
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
