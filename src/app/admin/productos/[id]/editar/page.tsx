import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/data/catalog";
import { getCategoryList } from "@/lib/products";
import { ProductForm } from "@/components/admin/product-form";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id) ?? null;

  if (!product) notFound();

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <Link href="/admin/productos" className="text-sm font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground">
          ← Volver a productos
        </Link>
        <h1 className="font-display mt-2 text-4xl font-black uppercase tracking-tight">
          Editar producto
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{product.name}</p>
      </div>

      <ProductForm
        categories={getCategoryList()}
        initialImages={product.images}
        initial={{
          id: product.id,
          name: product.name,
          sku: product.sku ?? "",
          categoryId: product.category.id,
          price: product.price,
          wasPrice: product.wasPrice ?? undefined,
          stock: product.stock,
          description: product.description ?? "",
          badge: product.badge ?? "",
          featured: product.featured,
          onSale: product.onSale,
          active: product.active,
          rating: product.rating ?? undefined,
          reviewsCount: product.reviewsCount,
        }}
      />
    </div>
  );
}