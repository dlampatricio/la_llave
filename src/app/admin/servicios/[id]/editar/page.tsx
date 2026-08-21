import { notFound } from "next/navigation";
import { SERVICES } from "@/data/services";
import { getServiceCategoryList } from "@/lib/services";
import { ServiceForm } from "@/components/admin/service-form";
import { PageHeader } from "@/components/admin/page-header";

export const dynamic = "force-dynamic";

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = SERVICES.find((s) => s.id === id) ?? null;

  if (!service) notFound();

  return (
    <div className="max-w-5xl">
      <PageHeader
        title="Editar servicio"
        description={service.name}
        backHref="/admin/servicios"
        backLabel="Volver a servicios"
      />

      <ServiceForm
        categories={getServiceCategoryList()}
        initialImages={service.images}
        initial={{
          id: service.id,
          name: service.name,
          categoryId: service.category.id,
          priceFrom: service.priceFrom ?? undefined,
          description: service.description ?? "",
          badge: service.badge ?? "",
          featured: service.featured,
          active: service.active,
        }}
      />
    </div>
  );
}
