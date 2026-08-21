import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/card";
import { cn, formatPrice } from "@/lib/utils";
import { buildServiceWhatsAppMessage, whatsappLink } from "@/lib/quote";
import type { ServiceCardData } from "@/lib/types";

export function ServiceCard({ service }: { service: ServiceCardData }) {
  const badgeTone =
    service.badge === "NUEVO"
      ? "nuevo"
      : service.badge === "OFERTA"
        ? "oferta"
        : "neutral";
  const whatsappHref = whatsappLink(
    buildServiceWhatsAppMessage(service.name, service.categoryName),
  );

  return (
    <div className="group flex flex-col border bg-card shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover">
      <Link href={`/servicios/${service.slug}`} className="relative block overflow-hidden" style={{ aspectRatio: "4/3" }}>
        {service.image ? (
          <Image
            src={service.image}
            alt={service.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
            <span className="text-xs font-bold uppercase tracking-widest">Sin imagen</span>
          </div>
        )}
        {service.badge && <Badge tone={badgeTone} className="absolute left-0 top-0">{service.badge}</Badge>}
      </Link>

      <div className="flex flex-1 flex-col gap-2.5 p-3 sm:p-4">
        <div>
          <div className="mb-1 text-[10px] uppercase tracking-widest text-muted-foreground">
            {service.categoryName}
          </div>
          <Link href={`/servicios/${service.slug}`}>
            <h3 className="text-sm font-semibold leading-snug transition-colors hover:text-primary">
              {service.name}
            </h3>
          </Link>
        </div>

        <div className="mt-auto flex items-baseline gap-2">
          {service.priceFrom != null ? (
            <>
              <span className="text-xs text-muted-foreground">Desde</span>
              <span className="font-display text-xl font-extrabold tracking-tight">
                {formatPrice(service.priceFrom)}
              </span>
            </>
          ) : (
            <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Precio a convenir
            </span>
          )}
        </div>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex items-center justify-center gap-2 bg-primary px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-primary-foreground transition-all hover:brightness-110 active:brightness-95",
          )}
        >
          <MessageCircle className="h-3.5 w-3.5" /> Solicitar
        </a>
      </div>
    </div>
  );
}