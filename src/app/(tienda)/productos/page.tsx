import Link from "next/link";
import { ArrowRight, PackageSearch } from "lucide-react";
import { getProducts } from "@/lib/products";
import { toProductCardData } from "@/lib/types";
import { ProductGrid } from "@/components/product-grid";
import { ProductFilters } from "@/components/product-filters";

export const revalidate = 30;

const PAGE_SIZE = 12;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; categoria?: string; ofertas?: string; orden?: string; pagina?: string }>;
}) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.pagina) || 1);

  const { products, total, categories, pageSize } = await getProducts({
    q: sp.q,
    category: sp.categoria,
    onSale: sp.ofertas === "1",
    order: sp.orden,
    page,
    pageSize: PAGE_SIZE,
  });

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const hasFilter = Boolean(sp.q || sp.categoria || sp.ofertas === "1");

  function hrefForPage(p: number) {
    const next = new URLSearchParams();
    if (sp.q) next.set("q", sp.q);
    if (sp.categoria) next.set("categoria", sp.categoria);
    if (sp.ofertas === "1") next.set("ofertas", "1");
    if (sp.orden) next.set("orden", sp.orden);
    if (p > 1) next.set("pagina", String(p));
    return `/productos?${next.toString()}`;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-black uppercase tracking-tight">
          {sp.ofertas === "1" ? "Ofertas de la Semana" : "Catálogo de Productos"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {hasFilter ? `${total} resultado${total === 1 ? "" : "s"}` : `${total} productos disponibles`}
        </p>
      </div>

      <ProductFilters categories={categories} />

      {products.length === 0 ? (
        <div className="flex flex-col items-center gap-4 border border-dashed py-20 text-center">
          <PackageSearch className="h-10 w-10 text-muted-foreground" />
          <div>
            <p className="font-semibold uppercase tracking-wide">Sin resultados</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Prueba con otra búsqueda o quita los filtros.
            </p>
          </div>
          <Link
            href="/productos"
            className="flex items-center gap-1 text-sm font-semibold uppercase tracking-widest text-primary hover:underline"
          >
            Ver todo el catálogo <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <>
          <ProductGrid products={products.map((p) => toProductCardData(p))} />

          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
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
        </>
      )}
    </div>
  );
}