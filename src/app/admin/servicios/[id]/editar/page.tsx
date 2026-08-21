import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICES } from "@/data/services";
import { getServiceCategoryList } from "@/lib/services";
import { ServiceForm } from "@/components/admin/service-form";

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = SERVICES.find((s) => s.id === id) ?? null;

  if (!service) notFound();

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <Link href="/admin/servicios" className="text-sm font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground">
          ← Volver a servicios
        </Link>
        <h1 className="font-display mt-2 text-4xl font-black uppercase tracking-tight">
          Editar servicio
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{service.name}</p>
      </div>

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