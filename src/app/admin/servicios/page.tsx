import Link from "next/link";
import { Suspense } from "react";
import { Pencil, SearchX, Wrench, WrenchIcon } from "lucide-react";
import { SERVICES, SERVICE_CATEGORIES } from "@/data/services";
import { formatPrice } from "@/lib/utils";
import { buildPageHref, paginate } from "@/lib/admin-list";
import { Badge, Card } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { iconButtonVariants } from "@/components/ui/icon-button";
import { deleteService, toggleService } from "@/app/admin/actions";
import { PageHeader } from "@/components/admin/page-header";
import { Pagination } from "@/components/admin/pagination";
import { EmptyState } from "@/components/admin/empty-state";
import { ToggleField } from "@/components/admin/toggle-field";
import { DeleteForm } from "@/components/admin/delete-form";
import { Thumb } from "@/components/admin/thumb";
import { AdminListFilters } from "@/components/admin/list-filters";

export const dynamic = "force-dynamic";

type Search = { q?: string; destacado?: string; categoria?: string; pagina?: string };

export default async function AdminServicesPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const sp = await searchParams;

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

  const { items: services, total, totalPages, page } = paginate(filtered, Number(sp.pagina) || 1);
  const hasFilters = Boolean(sp.q || sp.categoria || sp.destacado === "1");

  function hrefForPage(p: number) {
    return buildPageHref("/admin/servicios", { q: sp.q, categoria: sp.categoria, destacado: sp.destacado }, p);
  }

  return (
    <div>
      <PageHeader
        title="Servicios"
        description={`${total} servicio${total === 1 ? "" : "s"}${
          totalPages > 1 ? ` · página ${page} de ${totalPages}` : ""
        }`}
        actions={
          <ButtonLink href="/admin/servicios/nuevo">
            <Wrench className="h-4 w-4" /> Nuevo servicio
          </ButtonLink>
        }
      />

      <Suspense fallback={null}>
        <AdminListFilters
          basePath="/admin/servicios"
          categories={SERVICE_CATEGORIES}
          searchPlaceholder="Buscar por nombre o categoría…"
          searchAriaLabel="Buscar servicios"
        />
      </Suspense>

      {services.length === 0 ? (
        <Card>
          {hasFilters || SERVICES.length > 0 ? (
            <EmptyState
              icon={SearchX}
              title="Sin resultados"
              description="Ningún servicio coincide con los filtros aplicados."
              action={
                <ButtonLink href="/admin/servicios" variant="outline" size="sm">
                  Limpiar filtros
                </ButtonLink>
              }
            />
          ) : (
            <EmptyState
              icon={WrenchIcon}
              title="No hay servicios"
              description="Crea tu primer servicio para publicarlo en la web."
              action={
                <ButtonLink href="/admin/servicios/nuevo" size="sm">
                  <Wrench className="h-4 w-4" /> Crear servicio
                </ButtonLink>
              }
            />
          )}
        </Card>
      ) : (
        <>
          <Card className="hidden md:block">
            <table className="w-full text-left text-sm">
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
                  <tr key={s.id} className="align-middle hover:bg-muted/40">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Thumb src={s.images[0]} alt="" />
                        <div className="font-semibold">{s.name}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{s.category.name}</td>
                    <td className="whitespace-nowrap px-4 py-3">
                      {s.priceFrom != null ? (
                        <span className="font-semibold">Desde {formatPrice(s.priceFrom)}</span>
                      ) : (
                        <span className="text-muted-foreground">A convenir</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                        <ToggleField label="Activo" checked={s.active} action={toggleService.bind(null, s.id, "active")} />
                        <ToggleField label="Destacado" checked={s.featured} action={toggleService.bind(null, s.id, "featured")} />
                        {s.badge && <Badge tone="neutral">{s.badge}</Badge>}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/servicios/${s.id}/editar`}
                          aria-label={`Editar ${s.name}`}
                          className={iconButtonVariants()}
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <DeleteForm action={deleteService.bind(null, s.id)} label={s.name} entity="servicio" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <ul className="space-y-3 md:hidden">
            {services.map((s) => (
              <li key={s.id}>
                <Card className="p-4">
                  <div className="flex items-start gap-3">
                    <Thumb src={s.images[0]} alt="" />
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold leading-snug">{s.name}</div>
                      <div className="mt-0.5 text-xs text-muted-foreground">{s.category.name}</div>
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5">
                      <Link
                        href={`/admin/servicios/${s.id}/editar`}
                        aria-label={`Editar ${s.name}`}
                        className={iconButtonVariants()}
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <DeleteForm action={deleteService.bind(null, s.id)} label={s.name} entity="servicio" />
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 border-t pt-3 text-sm">
                    {s.priceFrom != null ? (
                      <span className="font-semibold">Desde {formatPrice(s.priceFrom)}</span>
                    ) : (
                      <span className="text-muted-foreground">A convenir</span>
                    )}
                    {s.badge && <Badge tone="neutral">{s.badge}</Badge>}
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 border-t pt-3">
                    <ToggleField label="Activo" checked={s.active} action={toggleService.bind(null, s.id, "active")} />
                    <ToggleField label="Destacado" checked={s.featured} action={toggleService.bind(null, s.id, "featured")} />
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </>
      )}

      <Pagination page={page} totalPages={totalPages} hrefForPage={hrefForPage} />
    </div>
  );
}
