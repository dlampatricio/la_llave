import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  ClipboardList,
  ListChecks,
  MapPin,
  MessageCircle,
  PackageCheck,
  Plus,
  Search,
  Truck,
} from "lucide-react";
import { getSettings } from "@/lib/settings";
import { whatsappLink } from "@/lib/quote";
import { WhatsAppLink } from "@/components/whatsapp-link";

export const metadata: Metadata = {
  title: "Ayuda y preguntas frecuentes",
  description:
    "Cómo hacer un pedido, pedidos por mayoreo y respuestas a las preguntas frecuentes de La Llave Ferretería.",
  alternates: {
    canonical: "/ayuda",
  },
};

const DEMO_NUMBER = "5363834798";

const STEPS = [
  {
    icon: Search,
    title: "Explora el catálogo",
    text: "Busca en productos y servicios por nombre o categoría. Cada ficha muestra precio y disponibilidad.",
  },
  {
    icon: ClipboardList,
    title: "Arma tu pedido",
    text: "Con el botón “Agregar al pedido” guardas lo que necesitas en tu carrito de cotización.",
  },
  {
    icon: ListChecks,
    title: "Revisa cantidades",
    text: "Abre tu pedido desde el menú para ajustar cantidades y ver el total estimado antes de enviarlo.",
  },
  {
    icon: MessageCircle,
    title: "Envíalo por WhatsApp",
    text: "Tu lista llega lista para enviarse. Te confirmamos disponibilidad y total en horario de tienda.",
  },
];

const FAQS = [
  {
    q: "¿Cuál es el horario de atención?",
    a: "Lunes a viernes de 7:30 am a 6:30 pm y sábados de 8:00 am a 2:00 pm. Domingos cerramos; puedes dejar tu pedido por WhatsApp y lo atendemos al abrir.",
  },
  {
    q: "¿Dónde están ubicados?",
    a: "Estamos en Av. del Herrerillo 1234, Col. Centro. Puedes pasar a recoger tu producto el mismo día si hay existencia.",
  },
  {
    q: "¿Cómo hago un pedido?",
    a: "Agrega productos a tu pedido desde el catálogo y envíalo con un clic por WhatsApp. También puedes escribirnos directamente con tu lista o foto del material que necesitas.",
  },
  {
    q: "¿Hacen entregas a domicilio?",
    a: "Sí. Coordinamos la entrega dentro de la ciudad por WhatsApp; el costo depende de la zona y del volumen del pedido. En compras grandes la entrega puede ser sin costo.",
  },
  {
    q: "¿Qué formas de pago aceptan?",
    a: "Efectivo y tarjeta en tienda. Para pedidos con entrega a domicilio o mayoreo también aceptamos transferencia; te confirmamos los datos al confirmar tu pedido.",
  },
  {
    q: "¿El precio de la página es el final?",
    a: "Los precios son estimados y pueden variar según disponibilidad. Al recibir tu pedido por WhatsApp te confirmamos el total exacto antes de preparar todo.",
  },
  {
    q: "¿Puedo apartar un producto?",
    a: "Sí. Escríbenos por WhatsApp con el producto y te confirmamos existencia; lo apartamos a tu nombre por un máximo de 48 horas.",
  },
  {
    q: "¿Manejan precios de mayoreo?",
    a: "Sí, tenemos descuentos por volumen en herramientas y material de construcción. Escríbenos tu lista y te enviamos una cotización especial.",
  },
  {
    q: "¿Los productos tienen garantía?",
    a: "Las herramientas cuentan con la garantía de su fabricante contra defectos de fabricación. Conserva tu comprobante de compra y contáctanos ante cualquier detalle.",
  },
];

function SectionHeading({
  id,
  eyebrow,
  title,
  description,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div id={id} className="scroll-mt-24">
      <div className="text-xs font-bold uppercase tracking-widest text-primary">{eyebrow}</div>
      <h2 className="font-display mt-2 text-3xl font-black uppercase tracking-tight sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}

export default async function AyudaPage() {
  const settings = await getSettings();
  const wa = settings.whatsappNumber || DEMO_NUMBER;

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="mb-10 max-w-2xl">
        <h1 className="font-display text-5xl font-black uppercase leading-none tracking-tight">
          Ayuda
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Todo lo que necesitas saber para pedir en La Llave: cómo armar tu pedido, cotizaciones de
          mayoreo y las dudas más frecuentes de nuestros clientes.
        </p>
      </div>

      <nav className="mb-16 grid gap-3 sm:grid-cols-3" aria-label="Secciones de ayuda">
        <a
          href="#como-pedir"
          className="group flex items-center justify-between gap-3 border bg-card p-5 shadow-card transition-shadow hover:shadow-card-hover"
        >
          <span className="text-sm font-bold uppercase tracking-wide">Cómo hacer un pedido</span>
          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
        </a>
        <a
          href="#mayoreo"
          className="group flex items-center justify-between gap-3 border bg-card p-5 shadow-card transition-shadow hover:shadow-card-hover"
        >
          <span className="text-sm font-bold uppercase tracking-wide">Pedidos por mayoreo</span>
          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
        </a>
        <a
          href="#faq"
          className="group flex items-center justify-between gap-3 border bg-card p-5 shadow-card transition-shadow hover:shadow-card-hover"
        >
          <span className="text-sm font-bold uppercase tracking-wide">Preguntas frecuentes</span>
          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
        </a>
      </nav>

      <section className="mb-16">
        <SectionHeading
          id="como-pedir"
          eyebrow="Paso a paso"
          title="Cómo hacer un pedido"
          description="Sin registros ni pagos en línea: armas tu pedido aquí mismo y lo cierras con nosotros por WhatsApp."
        />
        <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <li key={step.title} className="flex flex-col border bg-card p-5 shadow-card">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center border-2 border-primary/20 bg-primary/10">
                  <step.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="font-display text-4xl font-black leading-none text-muted-foreground/40">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wide">{step.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mb-16 grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <SectionHeading
            id="mayoreo"
            eyebrow="Contratas y proyectos"
            title="Pedidos por mayoreo"
            description="Compra en cantidad y ahorra: atendemos contratas, talleres, constructoras y proyectos de remodelación."
          />
          <ul className="mt-6 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <li className="flex items-start gap-3">
              <PackageCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              Descuentos por volumen en herramienta, plomería, electricidad y material de
              construcción.
            </li>
            <li className="flex items-start gap-3">
              <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              Envíanos tu lista por WhatsApp (texto, foto o Excel) y te devolvemos una cotización
              formal.
            </li>
            <li className="flex items-start gap-3">
              <Truck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              Entrega a domicilio coordinada con tu obra, sin costo extra en pedidos grandes.
            </li>
            <li className="flex items-start gap-3">
              <ClipboardList className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              Atención personalizada para armado de lista de materiales y sustituciones equivalentes.
            </li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <div className="border bg-card p-6 shadow-card">
            <h3 className="font-display text-2xl font-extrabold uppercase tracking-tight">
              Solicita tu cotización
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Cuéntanos qué necesitas y en menos de 30 minutos (horario de tienda) te respondemos con
              precios y disponibilidad.
            </p>
            <WhatsAppLink
              href={whatsappLink(
                `Hola ${settings.storeName}, quiero una cotización de mayoreo.`,
                wa,
              )}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 bg-primary px-8 py-3 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-all hover:brightness-110 active:brightness-95"
            >
              <MessageCircle className="h-4 w-4" /> Cotizar por WhatsApp
            </WhatsAppLink>
            <Link
              href="/contacto"
              className="mt-2 flex w-full items-center justify-center border px-8 py-3 text-sm font-bold uppercase tracking-widest transition-colors hover:bg-muted"
            >
              Usar formulario de contacto
            </Link>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading
          id="faq"
          eyebrow="Dudas comunes"
          title="Preguntas frecuentes"
        />
        <div className="mt-8 space-y-3">
          {FAQS.map((faq) => (
            <details key={faq.q} className="group border bg-card shadow-card">
              <summary className="flex cursor-pointer select-none items-center justify-between gap-4 px-5 py-4 text-sm font-semibold uppercase tracking-wide [&::-webkit-details-marker]:hidden">
                {faq.q}
                <Plus className="h-4 w-4 shrink-0 text-primary transition-transform group-open:rotate-45" />
              </summary>
              <p className="border-t px-5 py-4 text-sm leading-relaxed text-muted-foreground">
                {faq.a}
              </p>
            </details>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start gap-4 border bg-card p-6 shadow-card sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-primary/20 bg-primary/10">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-sm font-bold uppercase tracking-wide">
                ¿No encontraste tu respuesta?
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Visítanos en tienda o escríbenos: te orientamos con gusto.
              </p>
            </div>
          </div>
          <Link
            href="/contacto"
            className="inline-flex shrink-0 items-center justify-center bg-primary px-8 py-3 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-all hover:brightness-110 active:brightness-95"
          >
            Contactar ahora
          </Link>
        </div>
      </section>
    </div>
  );
}
