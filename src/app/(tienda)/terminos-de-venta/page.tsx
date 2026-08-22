import { getSettings } from '@/lib/settings';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Términos de venta',
  description:
    'Condiciones de compra en La Llave Ferretería: precios, disponibilidad, pagos, entregas, garantías y devoluciones.',
  alternates: {
    canonical: '/terminos-de-venta',
  },
};

const SECTIONS = [
  {
    title: '1. Sobre los precios',
    text: [
      'Los precios mostrados en este sitio son de referencia y pueden variar sin previo aviso según disponibilidad y actualizaciones de lista de proveedores. El total definitivo de tu pedido se confirma al responderlo por WhatsApp, antes de preparar cualquier producto.',
      'Los precios de mayoreo se cotizan caso por caso según volumen y tienen vigencia limitada indicada en cada cotización.',
    ],
  },
  {
    title: '2. Disponibilidad',
    text: [
      'La existencia mostrada es referencial. Al recibir tu pedido confirmamos stock; si algún producto está agotado te ofrecemos una alternativa equivalente o la opción de apartarlo para cuando reingrese.',
    ],
  },
  {
    title: '3. Pedidos',
    text: [
      'Los pedidos se realizan a través del carrito de cotización del sitio, por WhatsApp, teléfono o directamente en tienda. Un pedido se considera confirmado únicamente cuando nuestro personal responde con el detalle y el total final.',
      'Los productos apartados se reservan a tu nombre por un máximo de 48 horas naturales salvo acuerdo distinto por escrito.',
    ],
  },
  {
    title: '4. Formas de pago',
    text: [
      'Aceptamos efectivo y tarjeta en tienda. Para pedidos con entrega a domicilio o de mayoreo aceptamos también transferencia electrónica. El pedido se surte una vez confirmado el pago.',
    ],
  },
  {
    title: '5. Entregas',
    text: [
      'La entrega a domicilio se coordina por WhatsApp; el costo depende de la zona y el volumen, y se informa antes de confirmar tu pedido. Los tiempos de entrega son estimados y pueden verse afectados por factores fuera de nuestro control.',
      'Al recibir, verifica que el producto corresponda a lo solicitado; realiza la recepción antes de firmar o liberar al repartidor cuando aplique.',
    ],
  },
  {
    title: '6. Garantías y devoluciones',
    text: [
      'Las herramientas cuentan con la garantía del fabricante contra defectos de fabricación; dicha garantía no cubre mal uso, desgaste natural ni manipulación indebida.',
      'Para devoluciones o cambios, el producto debe estar sin uso, completo en su empaque original y acompañado de su comprobante de compra. Acude a tienda o contáctanos dentro de los primeros 7 días naturales posteriores a la compra.',
      'El material cortado, a granel o bajo pedido especial no tiene cambio ni devolución.',
    ],
  },
];

export default async function TerminosVentaPage() {
  const settings = await getSettings();

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <div className="mb-12">
        <h1 className="font-display text-5xl font-black uppercase leading-none tracking-tight">
          Términos de venta
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Estas condiciones aplican a todas las compras realizadas en {settings.storeName}{' '}
          Ferretería, ya sea en tienda física, por WhatsApp o a través de este sitio web.
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
            7. Dudas y aclaraciones
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Para cualquier duda sobre estos términos, escríbenos a{' '}
            <Link
              href={`mailto:${settings.contactEmail}`}
              className="font-semibold text-primary hover:underline"
            >
              {settings.contactEmail}
            </Link>{' '}
            o consulta nuestra{' '}
            <Link href="/ayuda" className="font-semibold text-primary hover:underline">
              página de ayuda
            </Link>
            .
          </p>
        </section>

        <p className="text-xs text-muted-foreground">Última actualización: agosto de 2026.</p>
      </div>
    </div>
  );
}
