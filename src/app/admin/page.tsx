import Link from "next/link";
import { ArrowRight, Package, PackagePlus, Percent, Wrench } from "lucide-react";
import { CATEGORIES, PRODUCTS } from "@/data/catalog";
import { SERVICES } from "@/data/services";
import { Card } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default function AdminDashboard() {
  const active = PRODUCTS.filter((p) => p.active);
  const stats = [
    { label: "Productos totales", value: PRODUCTS.length, href: "/admin/productos", icon: Package },
    { label: "Activos en la web", value: active.length, href: "/admin/productos", icon: PackagePlus },
    { label: "En oferta", value: PRODUCTS.filter((p) => p.onSale).length, href: "/admin/productos?oferta=1", icon: Percent },
    { label: "Servicios activos", value: SERVICES.filter((s) => s.active).length, href: "/admin/servicios", icon: Wrench },
  ];

  return (
    <div>
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="font-display text-4xl font-black uppercase tracking-tight">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">Resumen de tu catálogo</p>
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
              <div className="font-display text-4xl font-black">{stat.value}</div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {stat.label}
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <h2 className="font-display mb-2 text-2xl font-extrabold uppercase tracking-tight">
            Categorías ({CATEGORIES.length})
          </h2>
          <p className="text-sm text-muted-foreground">
            Administra las categorías de tu catálogo para organizar los productos.
          </p>
          <Link
            href="/admin/categorias"
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold uppercase tracking-widest text-primary hover:underline"
          >
            Ir a categorías <ArrowRight className="h-4 w-4" />
          </Link>
        </Card>
        <Card className="p-5">
          <h2 className="font-display mb-2 text-2xl font-extrabold uppercase tracking-tight">
            Servicios
          </h2>
          <p className="text-sm text-muted-foreground">
            Administra los servicios que ofreces (reparaciones, montajes, instalaciones) y sus
            categorías.
          </p>
          <Link
            href="/admin/servicios"
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold uppercase tracking-widest text-primary hover:underline"
          >
            Ir a servicios <ArrowRight className="h-4 w-4" />
          </Link>
        </Card>
        <Card className="p-5">
          <h2 className="font-display mb-2 text-2xl font-extrabold uppercase tracking-tight">
            Contenido de la web
          </h2>
          <p className="text-sm text-muted-foreground">
            Edita el anuncio superior, el mensaje principal, el banner de ofertas y tu número de
            WhatsApp.
          </p>
          <Link
            href="/admin/configuracion"
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold uppercase tracking-widest text-primary hover:underline"
          >
            Ir a contenido <ArrowRight className="h-4 w-4" />
          </Link>
        </Card>
      </div>
    </div>
  );
}