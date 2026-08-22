import type { Metadata } from "next";
import Link from "next/link";
import { getSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Aviso de privacidad",
  description:
    "Cómo La Llave Ferretería recaba, usa y protege tus datos personales al atenderte por WhatsApp, correo o formulario de contacto.",
  alternates: {
    canonical: "/aviso-de-privacidad",
  },
};

const SECTIONS = [
  {
    title: "1. Responsable del tratamiento",
    text: [
      "La Llave Ferretería (“La Llave”) es responsable del tratamiento de los datos personales que nos proporcionas a través de este sitio web, nuestro WhatsApp, teléfono o correo electrónico.",
    ],
  },
  {
    title: "2. Datos que recabamos",
    text: [
      "Recabamos únicamente los datos necesarios para atenderte:",
      "• Datos de contacto: nombre y número de teléfono o correo que nos proporcionas al escribirnos o llenar el formulario de contacto.",
      "• Datos del pedido: productos solicitados, cantidades y dirección de entrega, cuando aplican.",
      "No utilizamos cookies de rastreo publicitario ni recabamos datos bancarios a través del sitio web.",
    ],
  },
  {
    title: "3. Finalidades del tratamiento",
    text: [
      "Usamos tus datos exclusivamente para:",
      "• Atender solicitudes de información, cotizaciones y pedidos.",
      "• Confirmar disponibilidad, precios y coordinar entregas.",
      "• Dar seguimiento a garantías o aclaraciones sobre tu compra.",
      "Te enviaremos comunicaciones comerciales solo si tú las solicitas o autorizas expresamente.",
    ],
  },
  {
    title: "4. Terceros con quienes compartimos datos",
    text: [
      "No vendemos ni rentamos tu información personal. Los datos que nos proporcionas se comparten únicamente con la plataforma de mensajería (WhatsApp) para poder atenderte, y con paqueterías o transportistas cuando contratas un envío a domicilio.",
    ],
  },
  {
    title: "5. Conservación y protección",
    text: [
      "Conservamos tu información solo durante el tiempo necesario para atender tus pedidos y cumplir con obligaciones fiscales aplicables. Implementamos medidas razonables de seguridad administrativas y técnicas para protegerla contra acceso no autorizado.",
    ],
  },
  {
    title: "6. Tus derechos",
    text: [
      "Puedes solicitar en cualquier momento el acceso, rectificación, cancelación u oposición (derechos ARCO) respecto de tus datos personales, así como revocar el consentimiento otorgado. Para hacerlo, escríbenos por WhatsApp o al correo de contacto indicado abajo y atenderemos tu solicitud en un plazo máximo de 20 días hábiles.",
    ],
  },
];

export default async function AvisoPrivacidadPage() {
  const settings = await getSettings();

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <div className="mb-12">
        <h1 className="font-display text-5xl font-black uppercase leading-none tracking-tight">
          Aviso de privacidad
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          En {settings.storeName} Ferretería respetamos tu privacidad. Este aviso explica qué datos
          recabamos, para qué los usamos y cómo puedes ejercer tus derechos.
        </p>
      </div>

      <div className="space-y-10">
        {SECTIONS.map((section) => (
          <section key={section.title}>
            <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight">
              {section.title}
            </h2>
            {section.text.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}
          </section>
        ))}

        <section>
          <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight">
            7. Contacto
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Para dudas sobre este aviso o el tratamiento de tus datos, contáctanos en{" "}
            <Link
              href={`mailto:${settings.contactEmail}`}
              className="font-semibold text-primary hover:underline"
            >
              {settings.contactEmail}
            </Link>{" "}
            o visítanos en {settings.contactAddressLine1}.
          </p>
        </section>

        <p className="text-xs text-muted-foreground">
          Última actualización: agosto de 2026.
        </p>
      </div>
    </div>
  );
}
