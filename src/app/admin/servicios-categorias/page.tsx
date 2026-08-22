import {
  createServiceCategory,
  deleteServiceCategory,
  updateServiceCategory,
} from '@/app/admin/actions';
import { CategoryForm } from '@/components/admin/category-form';
import { DeleteForm } from '@/components/admin/delete-form';
import { EmptyState } from '@/components/admin/empty-state';
import { PageHeader } from '@/components/admin/page-header';
import { Card } from '@/components/ui/card';
import { SERVICE_CATEGORIES, SERVICES } from '@/data/services';
import { Tags } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function AdminServiceCategoriesPage() {
  return (
    <div className="max-w-3xl">
      <PageHeader
        title="Categorías de servicios"
        description="Organiza tus servicios. Cada categoría pertenece solo a la sección Servicios."
      />

      <Card className="mb-4 p-5">
        <h2 className="font-display mb-3 flex items-center gap-2 text-xl font-extrabold uppercase tracking-tight">
          Nueva categoría
        </h2>
        <CategoryForm action={createServiceCategory} />
      </Card>

      <Card>
        <div className="border-b px-5 py-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Categorías existentes ({SERVICE_CATEGORIES.length})
          </h2>
        </div>

        {SERVICE_CATEGORIES.length === 0 ? (
          <EmptyState
            icon={Tags}
            title="No hay categorías"
            description="Crea la primera categoría para organizar tus servicios."
          />
        ) : (
          <ul className="divide-y">
            {SERVICE_CATEGORIES.map((cat) => (
              <li
                key={cat.id}
                className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 sm:flex-nowrap"
              >
                <div className="min-w-0 flex-1">
                  <div className="font-semibold">{cat.name}</div>
                  <div className="text-xs text-muted-foreground">
                    /{cat.slug} · {SERVICES.filter((s) => s.category.id === cat.id).length} servicio
                    {SERVICES.filter((s) => s.category.id === cat.id).length === 1 ? '' : 's'}
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  <CategoryForm
                    action={updateServiceCategory.bind(null, cat.id)}
                    initial={{ name: cat.name, imageUrl: cat.imageUrl ?? '' }}
                    compact
                  />
                  <DeleteForm
                    action={deleteServiceCategory.bind(null, cat.id)}
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
