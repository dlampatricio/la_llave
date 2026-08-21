import Link from "next/link";
import { PackageOpen, PackagePlus, Pencil, Search, SearchX } from "lucide-react";
import { CATEGORIES, PRODUCTS } from "@/data/catalog";
import { formatPrice } from "@/lib/utils";
import { buildPageHref, offerNeedsFix, paginate } from "@/lib/admin-list";
import { Badge, Card } from "@/components/ui/card";
import { Button, ButtonLink } from "@/components/ui/button";
import { Input, NativeSelect } from "@/components/ui/form";
import { iconButtonVariants } from "@/components/ui/icon-button";
import { deleteProduct, toggleProduct } from "@/app/admin/actions";
import { PageHeader } from "@/components/admin/page-header";
import { Pagination } from "@/components/admin/pagination";
import { EmptyState } from "@/components/admin/empty-state";
import { ToggleField } from "@/components/admin/toggle-field";
import { DeleteForm } from "@/components/admin/delete-form";
import { Thumb } from "@/components/admin/thumb";

export const dynamic = "force-dynamic";

type Search = {
  q?: string;
  oferta?: string;
  categoria?: string;
  pagina?: string;
  "sin-foto"?: string;
  ocultos?: string;
  "sin-descripcion"?: string;
  "oferta-mala"?: string;
  destacados?: string;
};

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const sp = await searchParams;

  const filtered = PRODUCTS.filter((p) => {
    if (sp["sin-foto"] === "1" && p.images.length > 0) return false;
    if (sp.ocultos === "1" && p.active) return false;
    if (sp["sin-descripcion"] === "1" && (p.description ?? "").trim() !== "") return false;
    if (sp["oferta-mala"] === "1" && !offerNeedsFix(p)) return false;
    if (sp.destacados === "1" && !(p.featured && p.active)) return false;
    if (sp.q) {
      const needle = sp.q.toLowerCase();
      if (!p.name.toLowerCase().includes(needle) && !(p.sku ?? "").toLowerCase().includes(needle)) {
        return false;
      }
    }
    if (sp.oferta === "1" && !p.onSale) return false;
    if (sp.categoria && p.category.slug !== sp.categoria) return false;
    return true;
  });

  const { items: products, total, totalPages, page } = paginate(filtered, Number(sp.pagina) || 1);
  const hasFilters = Boolean(
    sp.q ||
      sp.categoria ||
      sp.oferta === "1" ||
      sp["sin-foto"] === "1" ||
      sp.ocultos === "1" ||
      sp["sin-descripcion"] === "1" ||
      sp["oferta-mala"] === "1" ||
      sp.destacados === "1",
  );

  function hrefForPage(p: number) {
    return buildPageHref(
      "/admin/productos",
      {
        q: sp.q,
        categoria: sp.categoria,
        oferta: sp.oferta,
        "sin-foto": sp["sin-foto"],
        ocultos: sp.ocultos,
        "sin-descripcion": sp["sin-descripcion"],
        "oferta-mala": sp["oferta-mala"],
        destacados: sp.destacados,
      },
      p,
    );
  }

  return (
    <div>
      <PageHeader
        title="Productos"
        description={`${total} producto${total === 1 ? "" : "s"}${
          totalPages > 1 ? ` · página ${page} de ${totalPages}` : ""
        }`}
        actions={
          <ButtonLink href="/admin/productos/nuevo">
            <PackagePlus className="h-4 w-4" /> Nuevo producto
          </ButtonLink>
        }
      />

      <form method="get" className="mb-6 grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto] lg:max-w-3xl lg:grid-cols-[minmax(0,1fr)_auto_auto]">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            type="text"
            name="q"
            defaultValue={sp.q}
            placeholder="Buscar por nombre o código…"
            aria-label="Buscar productos"
            className="pl-9"
          />
        </div>
        <NativeSelect
          name="categoria"
          defaultValue={sp.categoria ?? ""}
          aria-label="Filtrar por categoría"
          className="sm:w-48"
        >
          <option value="">Todas las categorías</option>
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.slug}>
              {c.name}
            </option>
          ))}
        </NativeSelect>
        <Button
          type="submit"
          name="oferta"
          value={sp.oferta === "1" ? "" : "1"}
          variant={sp.oferta === "1" ? "primary" : "outline"}
          size="md"
        >
          En oferta
        </Button>
      </form>

      {products.length === 0 ? (
        <Card>
          {hasFilters || PRODUCTS.length > 0 ? (
            <EmptyState
              icon={SearchX}
              title="Sin resultados"
              description="Ningún producto coincide con los filtros aplicados."
              action={
                <ButtonLink href="/admin/productos" variant="outline" size="sm">
                  Limpiar filtros
                </ButtonLink>
              }
            />
          ) : (
            <EmptyState
              icon={PackageOpen}
              title="No hay productos"
              description="Crea tu primer producto para publicarlo en la tienda."
              action={
                <ButtonLink href="/admin/productos/nuevo" size="sm">
                  <PackagePlus className="h-4 w-4" /> Crear producto
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
                  <th className="px-4 py-3 font-semibold">Producto</th>
                  <th className="px-4 py-3 font-semibold">Categoría</th>
                  <th className="px-4 py-3 font-semibold">Precio</th>
                  <th className="px-4 py-3 font-semibold">Stock</th>
                  <th className="px-4 py-3 font-semibold">Estado</th>
                  <th className="px-4 py-3 text-right font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {products.map((p) => (
                  <tr key={p.id} className="align-middle hover:bg-muted/40">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Thumb src={p.images[0]} alt="" />
                        <div className="min-w-0">
                          <div className="font-semibold">{p.name}</div>
                          {p.sku && <div className="text-xs text-muted-foreground">{p.sku}</div>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{p.category.name}</td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <span className="font-semibold">{formatPrice(p.price)}</span>
                      {p.wasPrice != null && (
                        <span className="ml-1.5 text-xs text-muted-foreground line-through">
                          {formatPrice(p.wasPrice)}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-semibold">{p.stock}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                        <ToggleField label="Activo" checked={p.active} action={toggleProduct.bind(null, p.id, "active")} />
                        <ToggleField label="Destacado" checked={p.featured} action={toggleProduct.bind(null, p.id, "featured")} />
                        <ToggleField label="En oferta" checked={p.onSale} action={toggleProduct.bind(null, p.id, "onSale")} />
                        {p.badge && <Badge tone="neutral">{p.badge}</Badge>}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/productos/${p.id}/editar`}
                          aria-label={`Editar ${p.name}`}
                          className={iconButtonVariants()}
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <DeleteForm action={deleteProduct.bind(null, p.id)} label={p.name} entity="producto" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <ul className="space-y-3 md:hidden">
            {products.map((p) => (
              <li key={p.id}>
                <Card className="p-4">
                  <div className="flex items-start gap-3">
                    <Thumb src={p.images[0]} alt="" />
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold leading-snug">{p.name}</div>
                      <div className="mt-0.5 text-xs text-muted-foreground">
                        {[p.sku, p.category.name].filter(Boolean).join(" · ")}
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5">
                      <Link
                        href={`/admin/productos/${p.id}/editar`}
                        aria-label={`Editar ${p.name}`}
                        className={iconButtonVariants()}
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <DeleteForm action={deleteProduct.bind(null, p.id)} label={p.name} entity="producto" />
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 border-t pt-3 text-sm">
                    <span className="font-semibold">{formatPrice(p.price)}</span>
                    {p.wasPrice != null && (
                      <span className="text-xs text-muted-foreground line-through">
                        {formatPrice(p.wasPrice)}
                      </span>
                    )}
                    <span className="font-semibold">Stock: {p.stock}</span>
                    {p.badge && <Badge tone="neutral">{p.badge}</Badge>}
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 border-t pt-3">
                    <ToggleField label="Activo" checked={p.active} action={toggleProduct.bind(null, p.id, "active")} />
                    <ToggleField label="Destacado" checked={p.featured} action={toggleProduct.bind(null, p.id, "featured")} />
                    <ToggleField label="En oferta" checked={p.onSale} action={toggleProduct.bind(null, p.id, "onSale")} />
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
