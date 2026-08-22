import { createCategory, deleteCategory, updateCategory } from '@/app/admin/actions';
import { CategoryForm } from '@/components/admin/category-form';
import { DeleteForm } from '@/components/admin/delete-form';
import { EmptyState } from '@/components/admin/empty-state';
import { PageHeader } from '@/components/admin/page-header';
import { Card } from '@/components/ui/card';
import { CATEGORIES, PRODUCTS } from '@/data/catalog';
import { Tags } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function AdminCategoriesPage() {
  return (
    <div className="max-w-3xl">
      <PageHeader
        title="Categorías"
        description="Organiza tu catálogo. Los productos se filtran por categoría en la web."
      />

      <Card className="mb-4 p-5">
        <h2 className="font-display mb-3 flex items-center gap-2 text-xl font-extrabold uppercase tracking-tight">
          Nueva categoría
        </h2>
        <CategoryForm action={createCategory} />
      </Card>

      <Card>
        <div className="border-b px-5 py-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Categorías existentes ({CATEGORIES.length})
          </h2>
        </div>

        {CATEGORIES.length === 0 ? (
          <EmptyState
            icon={Tags}
            title="No hay categorías"
            description="Crea la primera categoría para organizar tus productos."
          />
        ) : (
          <ul className="divide-y">
            {CATEGORIES.map((cat) => (
              <li
                key={cat.id}
                className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 sm:flex-nowrap"
              >
                <div className="min-w-0 flex-1">
                  <div className="font-semibold">{cat.name}</div>
                  <div className="text-xs text-muted-foreground">
                    /{cat.slug} · {PRODUCTS.filter((p) => p.category.id === cat.id).length} producto
                    {PRODUCTS.filter((p) => p.category.id === cat.id).length === 1 ? '' : 's'}
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  <CategoryForm
                    action={updateCategory.bind(null, cat.id)}
                    initial={{ name: cat.name, imageUrl: cat.imageUrl ?? '' }}
                    compact
                  />
                  <DeleteForm
                    action={deleteCategory.bind(null, cat.id)}
                    label={cat.name}
                    entity="categoría"
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
