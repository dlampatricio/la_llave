import { getCategoryList } from "@/lib/products";
import { ProductForm } from "@/components/admin/product-form";
import { PageHeader } from "@/components/admin/page-header";

export default function NewProductPage() {
  const categories = getCategoryList();

  return (
    <div className="max-w-5xl">
      <PageHeader
        title="Nuevo producto"
        description="Se publicará en la web al guardar."
        backHref="/admin/productos"
        backLabel="Volver a productos"
      />

      <ProductForm categories={categories} />
    </div>
  );
}
