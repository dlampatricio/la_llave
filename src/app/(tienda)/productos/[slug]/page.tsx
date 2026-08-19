import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { getProductBySlug, getRelatedProducts } from "@/lib/products";
import { toProductCardData } from "@/lib/types";
import { formatPrice, getDiscountPct } from "@/lib/utils";
import { ProductCard } from "@/components/product-card";
import { AddToQuoteButton } from "@/components/add-to-quote-button";
import { ProductGallery } from "@/components/product-gallery";
import { SectionHeader } from "@/components/section-header";

export const revalidate = 30;

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product);
  const discount = getDiscountPct(Number(product.price), product.wasPrice != null ? Number(product.wasPrice) : null);
  const mainImage = product.images[0] ?? null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <nav className="mb-6 flex items-center gap-1.5 text-xs uppercase tracking-wide text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Inicio</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/productos" className="hover:text-foreground">Productos</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href={`/productos?categoria=${product.category.slug}`} className="hover:text-foreground">
          {product.category.name}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="relative">
          <ProductGallery images={product.images} name={product.name} />
          {discount && (
            <span className="absolute left-0 top-0 z-10 bg-destructive px-2 py-1 text-xs font-bold uppercase tracking-widest text-destructive-foreground">
              -{discount}%
            </span>
          )}
        </div>

        <div className="flex flex-col gap-5">
          {product.sku && (
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              Código: {product.sku}
            </div>
          )}
          <h1 className="font-display text-4xl font-black uppercase leading-none tracking-tight sm:text-5xl">
            {product.name}
          </h1>

          <div className="flex items-baseline gap-3">
            <span className="font-display text-4xl font-black tracking-tight text-primary">
              {formatPrice(Number(product.price))}
            </span>
            {product.wasPrice != null && (
              <span className="text-xl text-muted-foreground line-through">
                {formatPrice(Number(product.wasPrice))}
              </span>
            )}
          </div>

          <div className="text-sm">
            {product.stock > 0 ? (
              <span className="font-semibold uppercase tracking-wide text-success">
                Disponible · {product.stock} en stock
              </span>
            ) : (
              <span className="font-semibold uppercase tracking-wide text-destructive">Sin stock</span>
            )}
          </div>

          {product.description && (
            <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>
          )}

          <div className="mt-2">
            <AddToQuoteButton
              product={{
                id: product.id,
                name: product.name,
                sku: product.sku,
                price: Number(product.price),
                image: mainImage ?? null,
              }}
            />
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              Al enviar tu pedido te confirmamos la disponibilidad y el precio final por WhatsApp.
            </p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <SectionHeader
            title="También te puede interesar"
            href={`/productos?categoria=${product.category.slug}`}
            linkLabel="Ver categoría"
          />
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={toProductCardData(p)} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}