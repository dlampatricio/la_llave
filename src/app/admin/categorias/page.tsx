import { Plus, Trash2 } from "lucide-react";
import { CATEGORIES, PRODUCTS } from "@/data/catalog";
import { Card } from "@/components/ui/card";
import { IconButton } from "@/components/ui/icon-button";
import { createCategory, deleteCategory, updateCategory } from "@/app/admin/actions";
import { CategoryForm } from "@/components/admin/category-form";

export default function AdminCategoriesPage() {
  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-black uppercase tracking-tight">Categorías</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Organiza tu catálogo. Los productos se filtran por categoría en la web.
        </p>
      </div>

      <Card className="mb-6 p-5">
        <h2 className="font-display mb-3 flex items-center gap-2 text-xl font-extrabold uppercase tracking-tight">
          <Plus className="h-4 w-4 text-primary" /> Nueva categoría
        </h2>
        <CategoryForm action={createCategory} />
      </Card>

      <ul className="divide-y border bg-card">
        {CATEGORIES.map((cat) => (
          <li key={cat.id} className="flex items-center gap-4 px-4 py-3">
            <div className="min-w-0 flex-1">
              <div className="font-semibold">{cat.name}</div>
              <div className="text-xs text-muted-foreground">
                /{cat.slug} · {PRODUCTS.filter((p) => p.category.id === cat.id).length} productos
              </div>
            </div>
            <CategoryForm
              action={updateCategory.bind(null, cat.id)}
              initial={{ name: cat.name, imageUrl: cat.imageUrl ?? "" }}
              compact
            />
            <form action={deleteCategory.bind(null, cat.id)}>
              <IconButton type="submit" variant="destructive" aria-label={`Eliminar categoría ${cat.name}`}>
                <Trash2 className="h-4 w-4" />
              </IconButton>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}