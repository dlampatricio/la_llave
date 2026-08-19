import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock, Mail, MapPin, MessageCircle } from "lucide-react";
import { getSettings } from "@/lib/settings";
import { whatsappLink } from "@/lib/quote";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contáctanos para pedidos, dudas y precios.",
  alternates: {
    canonical: "/contacto",
  },
};

const DEMO_NUMBER = "5363834798";

const HOURS = [
  { days: "Lunes – Viernes", hours: "7:30 am – 6:30 pm" },
  { days: "Sábado", hours: "8:00 am – 2:00 pm" },
  { days: "Domingo", hours: "Cerrado" },
];

export default async function ContactoPage() {
  const settings = await getSettings();
  const wa = settings.whatsappNumber || DEMO_NUMBER;

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="mb-12 max-w-2xl">
        <h1 className="font-display text-5xl font-black uppercase leading-none tracking-tight">
          Contacto
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Pedidos, dudas sobre productos o precios: escríbenos por WhatsApp o visítanos en tienda.
          Te atendemos en el horario de la ferretería.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-5">
        <div className="flex flex-col gap-4 lg:col-span-2">
          <div className="flex items-start gap-4 border bg-card p-5 shadow-card">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-primary/20 bg-primary/10">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Visítanos
              </div>
              <div className="mt-1 text-sm font-semibold">
                Av. del Herrerillo 1234, Col. Centro
              </div>
              <div className="text-sm text-muted-foreground">Ciudad, CP 44000</div>
            </div>
          </div>

          <div className="flex items-start gap-4 border bg-card p-5 shadow-card">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-primary/20 bg-primary/10">
              <MessageCircle className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                WhatsApp
              </div>
              <Link
                href={whatsappLink(`Hola ${settings.storeName}, quiero hacer un pedido.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:underline"
              >
                {`+${wa.slice(0, 2)} ${wa.slice(2)}`} <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <div className="text-sm text-muted-foreground">Respuesta en menos de 30 min</div>
            </div>
          </div>

          <div className="flex items-start gap-4 border bg-card p-5 shadow-card">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-primary/20 bg-primary/10">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Correo
              </div>
              <Link
                href="mailto:ventas@lallave.mx"
                className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:underline"
              >
                ventas@lallave.mx <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <div className="text-sm text-muted-foreground">Facturación y pedidos</div>
            </div>
          </div>

          <div className="flex items-start gap-4 border bg-card p-5 shadow-card">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-primary/20 bg-primary/10">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Horario
              </div>
              <ul className="mt-2 space-y-1.5">
                {HOURS.map((h) => (
                  <li key={h.days} className="flex items-baseline justify-between gap-4 text-sm">
                    <span className="text-muted-foreground">{h.days}</span>
                    <span className="font-semibold">{h.hours}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border bg-card p-6 shadow-card sm:p-8 lg:col-span-3">
          <h2 className="font-display mb-1 text-2xl font-extrabold uppercase tracking-tight">
            Escríbenos
          </h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Completa el formulario y tu mensaje llega directo a nuestro WhatsApp.
          </p>
          <ContactForm number={wa} storeName={settings.storeName} />
        </div>
      </div>
    </div>
  );
}