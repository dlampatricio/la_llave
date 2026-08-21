import { ServiceCard } from "@/components/service-card";
import type { ServiceCardData } from "@/lib/types";

export function ServiceGrid({ services }: { services: ServiceCardData[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {services.map((s) => (
        <ServiceCard key={s.id} service={s} />
      ))}
    </div>
  );
}