import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, PackageSearch } from "lucide-react";
import { getProducts } from "@/lib/products";
import { getServices } from "@/lib/services";
import { suggestTerm } from "@/lib/search";
import { toProductCardData, toServiceCardData } from "@/lib/types";
import { ProductGrid } from "@/components/product-grid";
import { ServiceGrid } from "@/components/service-grid";
import { SectionHeader } from "@/components/section-header";

export const revalidate = 30;

export const metadata: Metadata = {
  title: "Búsqueda",
};

const LIMIT = 8;

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const sp = await searchParams;
  const q = sp.q?.trim();
  if (!q) redirect("/productos");

  const [productsResult, servicesResult] = await Promise.all([
    getProducts({ q, pageSize: LIMIT }),
    getServices({ q, pageSize: LIMIT }),
  ]);

  const productCount = productsResult.total;
  const serviceCount = servicesResult.total;
  const hasResults = productCount > 0 || serviceCount > 0;
  const suggestion = hasResults ? null : suggestTerm(q);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-black uppercase tracking-tight">
          Resultados para «{q}»
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {hasResults
            ? `${productCount} producto${productCount === 1 ? "" : "s"} y ${serviceCount} servicio${serviceCount === 1 ? "" : "s"} encontrados`
            : "Sin resultados en productos ni servicios"}
        </p>
      </div>

      {suggestion && (
        <p className="mb-8 text-sm text-muted-foreground">
          ¿Quisiste decir{" "}
          <Link
            href={`/buscar?q=${encodeURIComponent(suggestion)}`}
            className="font-semibold text-primary hover:underline"
          >
            «{suggestion}»
          </Link>
          ?
        </p>
      )}

      {!hasResults && (
        <div className="flex flex-col items-center gap-4 border border-dashed py-20 text-center">
          <PackageSearch className="h-10 w-10 text-muted-foreground" />
          <div>
            <p className="font-semibold uppercase tracking-wide">No encontramos nada</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Revisa la ortografía o prueba con otra palabra.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/productos"
              className="flex items-center gap-1 text-sm font-semibold uppercase tracking-widest text-primary hover:underline"
            >
              Ver productos <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/servicios"
              className="flex items-center gap-1 text-sm font-semibold uppercase tracking-widest text-primary hover:underline"
            >
              Ver servicios <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}

      {productCount > 0 && (
        <section className={serviceCount > 0 ? "mb-14" : ""}>
          <SectionHeader
            title={`Productos (${productCount})`}
            href={`/productos?q=${encodeURIComponent(q)}`}
            linkLabel="Ver todos"
          />
          <ProductGrid products={productsResult.products.map((p) => toProductCardData(p))} />
        </section>
      )}

      {serviceCount > 0 && (
        <section>
          <SectionHeader
            title={`Servicios (${serviceCount})`}
            href={`/servicios?q=${encodeURIComponent(q)}`}
            linkLabel="Ver todos"
          />
          <ServiceGrid services={servicesResult.services.map((s) => toServiceCardData(s))} />
        </section>
      )}
    </div>
  );
}