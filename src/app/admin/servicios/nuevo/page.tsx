import Link from "next/link";
import { getServiceCategoryList } from "@/lib/services";
import { ServiceForm } from "@/components/admin/service-form";

export default function NewServicePage() {
  const categories = getServiceCategoryList();

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <Link href="/admin/servicios" className="text-sm font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground">
          ← Volver a servicios
        </Link>
        <h1 className="font-display mt-2 text-4xl font-black uppercase tracking-tight">
          Nuevo servicio
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Se publicará en la web al guardar.
        </p>
      </div>

      <ServiceForm categories={categories} />
    </div>
  );
}