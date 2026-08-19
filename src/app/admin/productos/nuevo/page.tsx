import Link from "next/link";
import { getCategoryList } from "@/lib/products";
import { ProductForm } from "@/components/admin/product-form";

export default function NewProductPage() {
  const categories = getCategoryList();

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <Link href="/admin/productos" className="text-sm font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground">
          ← Volver a productos
        </Link>
        <h1 className="font-display mt-2 text-4xl font-black uppercase tracking-tight">
          Nuevo producto
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Se publicará en la web al guardar.
        </p>
      </div>

      <ProductForm categories={categories} />
    </div>
  );
}