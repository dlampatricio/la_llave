import { notFound } from "next/navigation";
import { PRODUCTS } from "@/data/catalog";
import { getCategoryList } from "@/lib/products";
import { ProductForm } from "@/components/admin/product-form";
import { PageHeader } from "@/components/admin/page-header";

export const dynamic = "force-dynamic";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id) ?? null;

  if (!product) notFound();

  return (
    <div className="max-w-5xl">
      <PageHeader
        title="Editar producto"
        description={product.name}
        backHref="/admin/productos"
        backLabel="Volver a productos"
      />

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
