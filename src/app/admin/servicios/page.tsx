import Link from "next/link";
import { Pencil, Plus, Search, Wrench } from "lucide-react";
import { SERVICES, SERVICE_CATEGORIES } from "@/data/services";
import { formatPrice } from "@/lib/utils";
import { Badge, Card } from "@/components/ui/card";
import { IconButton } from "@/components/ui/icon-button";
import { deleteService, toggleService } from "@/app/admin/actions";
import { ToggleField } from "@/components/admin/toggle-field";
import { DeleteForm } from "@/components/admin/delete-form";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 10;

export default async function AdminServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; destacado?: string; categoria?: string; pagina?: string }>;
}) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.pagina) || 1);

  const filtered = SERVICES.filter((s) => {
    if (sp.q) {
      const needle = sp.q.toLowerCase();
      if (!s.name.toLowerCase().includes(needle) && !s.category.name.toLowerCase().includes(needle)) {
        return false;
      }
    }
    if (sp.destacado === "1" && !s.featured) return false;
    if (sp.categoria && s.category.slug !== sp.categoria) return false;
    return true;
  });

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const services = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function hrefForPage(p: number) {
    const next = new URLSearchParams();
    if (sp.q) next.set("q", sp.q);
    if (sp.categoria) next.set("categoria", sp.categoria);
    if (sp.destacado === "1") next.set("destacado", "1");
    if (p > 1) next.set("pagina", String(p));
    return `/admin/servicios?${next.toString()}`;
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-black uppercase tracking-tight">Servicios</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {total} servicio{total === 1 ? "" : "s"}
            {totalPages > 1 ? ` · página ${page} de ${totalPages}` : ""}
          </p>
        </div>
        <Link
          href="/admin/servicios/nuevo"
          className="flex items-center gap-2 bg-primary px-5 py-2.5 text-sm font-bold uppercase tracking-widest text-primary-foreground hover:brightness-110"
        >
          <Wrench className="h-4 w-4" /> Nuevo servicio
        </Link>
      </div>

      <form method="get" className="mb-6 flex flex-wrap gap-2">
        <div className="relative min-w-52 flex-1 sm:max-w-md">
          <input
            type="text"
            name="q"
            defaultValue={sp.q}
            placeholder="Buscar por nombre o categoría…"
            className="w-full border bg-background py-2 pl-4 pr-10 text-sm outline-none focus:border-primary"
          />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-label="Buscar">
            <Search className="h-4 w-4" />
          </button>
        </div>
        <select
          name="categoria"
          defaultValue={sp.categoria ?? ""}
          aria-label="Filtrar por categoría"
          className="border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
        >
          <option value="">Todas las categorías</option>
          {SERVICE_CATEGORIES.map((c) => (
            <option key={c.id} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          name="destacado"
          value={sp.destacado === "1" ? "" : "1"}
          className={`border px-4 py-2 text-xs font-bold uppercase tracking-widest ${
            sp.destacado === "1" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
          }`}
        >
          Destacados
        </button>
      </form>

      <Card className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead>
            <tr className="border-b text-xs uppercase tracking-widest text-muted-foreground">
              <th className="px-4 py-3 font-semibold">Servicio</th>
              <th className="px-4 py-3 font-semibold">Categoría</th>
              <th className="px-4 py-3 font-semibold">Precio</th>
              <th className="px-4 py-3 font-semibold">Estado</th>
              <th className="px-4 py-3 text-right font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {services.map((s) => (
              <tr key={s.id} className="hover:bg-muted/40">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 shrink-0 bg-muted">
                      {s.images[0] && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={s.images[0]} alt="" className="h-full w-full object-cover" />
                      )}
                    </div>
                    <div className="font-semibold">{s.name}</div>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{s.category.name}</td>
                <td className="px-4 py-3">
                  {s.priceFrom != null ? (
                    <span className="font-semibold">Desde {formatPrice(s.priceFrom)}</span>
                  ) : (
                    <span className="text-muted-foreground">A convenir</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <ToggleField
                      label={s.active ? "Activo" : "Oculto"}
                      checked={s.active}
                      action={toggleService.bind(null, s.id, "active")}
                    />
                    <ToggleField
                      label={s.featured ? "Destacado" : "Normal"}
                      checked={s.featured}
                      action={toggleService.bind(null, s.id, "featured")}
                    />
                    {s.badge && <Badge tone="neutral">{s.badge}</Badge>}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/servicios/${s.id}/editar`} aria-label={`Editar ${s.name}`}>
                      <IconButton aria-label={`Editar ${s.name}`}>
                        <Pencil className="h-4 w-4" />
                      </IconButton>
                    </Link>
                    <DeleteForm action={deleteService.bind(null, s.id)} label={s.name} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {services.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <p className="font-semibold uppercase tracking-wide">No hay servicios</p>
            <Link
              href="/admin/servicios/nuevo"
              className="flex items-center gap-1 text-sm font-semibold uppercase tracking-widest text-primary hover:underline"
            >
              <Plus className="h-4 w-4" /> Crear el primero
            </Link>
          </div>
        )}
      </Card>

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={hrefForPage(p)}
              className={`flex h-9 w-9 items-center justify-center border text-sm font-semibold ${
                p === page ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
            >
              {p}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}