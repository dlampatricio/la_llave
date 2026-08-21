import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, MessageCircle } from "lucide-react";
import { getRelatedServices, getServiceBySlug } from "@/lib/services";
import { toServiceCardData } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { buildServiceWhatsAppMessage, whatsappLink } from "@/lib/quote";
import { ServiceCard } from "@/components/service-card";
import { ProductGallery } from "@/components/product-gallery";
import { SectionHeader } from "@/components/section-header";

export const revalidate = 30;

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const related = await getRelatedServices(service);
  const whatsappHref = whatsappLink(
    buildServiceWhatsAppMessage(service.name, service.category.name),
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <nav className="mb-6 flex items-center gap-1.5 text-xs uppercase tracking-wide text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Inicio</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/servicios" className="hover:text-foreground">Servicios</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href={`/servicios?categoria=${service.category.slug}`} className="hover:text-foreground">
          {service.category.name}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{service.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="relative">
          <ProductGallery images={service.images} name={service.name} />
        </div>

        <div className="flex flex-col gap-5">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">
            {service.category.name}
          </div>
          <h1 className="font-display text-4xl font-black uppercase leading-none tracking-tight sm:text-5xl">
            {service.name}
          </h1>

          <div className="flex items-baseline gap-3">
            {service.priceFrom != null ? (
              <>
                <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Desde
                </span>
                <span className="font-display text-4xl font-black tracking-tight text-primary">
                  {formatPrice(service.priceFrom)}
                </span>
              </>
            ) : (
              <span className="font-display text-3xl font-black uppercase tracking-tight text-muted-foreground">
                Precio a convenir
              </span>
            )}
          </div>

          <div className="text-sm">
            <span className="font-semibold uppercase tracking-wide text-success">
              Respuesta rápida por WhatsApp
            </span>
          </div>

          {service.description && (
            <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
              {service.description}
            </p>
          )}

          <div className="mt-2">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 bg-primary px-8 py-3 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-all hover:brightness-110 active:brightness-95 sm:w-auto"
            >
              <MessageCircle className="h-4 w-4" /> Solicitar este servicio
            </a>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              Escríbenos por WhatsApp y con gusto te orientamos paso a paso.
            </p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <SectionHeader
            title="Servicios relacionados"
            href={`/servicios?categoria=${service.category.slug}`}
            linkLabel="Ver categoría"
          />
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {related.map((s) => (
              <ServiceCard key={s.id} service={toServiceCardData(s)} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}