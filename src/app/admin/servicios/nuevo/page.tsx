import { getServiceCategoryList } from "@/lib/services";
import { ServiceForm } from "@/components/admin/service-form";
import { PageHeader } from "@/components/admin/page-header";

export default function NewServicePage() {
  const categories = getServiceCategoryList();

  return (
    <div className="max-w-5xl">
      <PageHeader
        title="Nuevo servicio"
        description="Se publicará en la web al guardar."
        backHref="/admin/servicios"
        backLabel="Volver a servicios"
      />

      <ServiceForm categories={categories} />
    </div>
  );
}
