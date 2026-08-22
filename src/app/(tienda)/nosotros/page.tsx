import { WhatsAppLink } from '@/components/whatsapp-link';
import { whatsappLink } from '@/lib/quote';
import { getSettings } from '@/lib/settings';
import {
  ArrowUpRight,
  BadgeDollarSign,
  Clock,
  Hammer,
  HeartHandshake,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sobre La Llave',
  description:
    'Conoce La Llave Ferretería: nuestra historia, nuestros valores y todo lo que encontramos en tienda para tu obra y tu hogar.',
  alternates: {
    canonical: '/nosotros',
  },
};

const DEMO_NUMBER = '5363834798';

const VALUES = [
  {
    icon: Hammer,
    title: 'Calidad que dura',
    text: 'Trabajamos con marcas probadas. Si una herramienta no nos la compraríamos nosotros, no entra al catálogo.',
  },
  {
    icon: BadgeDollarSign,
    title: 'Precios justos',
    text: 'Del tornillo a la rotomartillo: precios claros, descuentos reales por volumen y cotizaciones sin compromiso.',
  },
  {
    icon: HeartHandshake,
    title: 'Atención cercana',
    text: 'Te asesoramos como en la ferretería de barrio: te escuchamos, recomendamos lo correcto y te ayudamos a no gastar de más.',
  },
];

export default async function NosotrosPage() {
  const settings = await getSettings();
  const wa = settings.whatsappNumber || DEMO_NUMBER;
  const hours = [settings.hoursWeekdays, settings.hoursSaturday, settings.hoursSunday].filter(
    (h) => h.trim().length > 0
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="mb-12 max-w-2xl">
        <h1 className="font-display text-5xl font-black uppercase leading-none tracking-tight">
          Sobre La Llave
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Una ferretería de barrio con ambición grande: que encuentres la herramienta correcta para
          cada trabajo, a buen precio y con atención de verdad.
        </p>
      </div>

      <div className="grid items-center gap-10">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-primary">
            Nuestra historia
          </div>
          <h2 className="font-display mt-2 text-3xl font-black uppercase tracking-tight sm:text-4xl">
            La ferretería que te acompaña en cada proyecto
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              La Llave nació con una idea sencilla: que nadie tenga que recorrer media ciudad por un
              material faltante ni pagar de más por una herramienta que solo usará un fin de semana.
              Abrimos nuestras puertas en el corazón del Centro y desde entonces crecimos junto a
              nuestros clientes: plomeros, electricistas, albañiles, talleres y familias que están
              arreglando o construyendo su propio espacio.
            </p>
            <p>
              Hoy combinamos lo mejor de los dos mundos: el trato cercano y el conocimiento técnico
              de la ferretería tradicional, con un catálogo en línea para que armes tu pedido desde
              donde estés y lo tengas listo —para pasar por él o con entrega a domicilio— sin filas
              ni sorpresas.
            </p>
            <p>
              Del tornillo que falta al proyecto completo de tu contrata, nuestro compromiso es el
              mismo: existencias reales, precios honestos y alguien que te oriente con experiencia.
            </p>
          </div>
          <div className="mt-7 flex flex-col gap-2 sm:flex-row">
            <Link
              href="/productos"
              className="inline-flex items-center justify-center bg-primary px-8 py-3 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-all hover:brightness-110 active:brightness-95"
            >
              Ver catálogo
            </Link>
            <Link
              href="/servicios"
              className="inline-flex items-center justify-center border px-8 py-3 text-sm font-bold uppercase tracking-widest transition-colors hover:bg-muted"
            >
              Conocer servicios
            </Link>
          </div>
        </div>
      </div>

      <section className="mt-20">
        <div className="text-xs font-bold uppercase tracking-widest text-primary">
          Lo que nos define
        </div>
        <h2 className="font-display mt-2 text-3xl font-black uppercase tracking-tight sm:text-4xl">
          Nuestros valores
        </h2>
        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {VALUES.map((value) => (
            <div key={value.title} className="border bg-card p-6 shadow-card">
              <div className="flex h-11 w-11 items-center justify-center border-2 border-primary/20 bg-primary/10">
                <value.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-4 text-sm font-bold uppercase tracking-wide">{value.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{value.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="text-xs font-bold uppercase tracking-widest text-primary">Visítanos</div>
          <h2 className="font-display mt-2 text-3xl font-black uppercase tracking-tight sm:text-4xl">
            Estamos cerca de ti
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Pasa a la tienda, escríbenos por WhatsApp o llámanos: aquí siempre hay alguien listo
            para ayudarte a encontrar lo que necesitas.
          </p>
          <WhatsAppLink
            href={whatsappLink(`Hola ${settings.storeName}, quiero hacer una consulta.`, wa)}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-primary px-8 py-3 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-all hover:brightness-110 active:brightness-95 sm:w-auto"
          >
            <MessageCircle className="h-4 w-4" /> Escríbenos por WhatsApp
          </WhatsAppLink>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-3">
          <div className="flex items-start gap-4 border bg-card p-5 shadow-card">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-primary/20 bg-primary/10">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Dirección
              </div>
              <div className="mt-1 text-sm font-semibold">{settings.contactAddressLine1}</div>
              <div className="text-sm text-muted-foreground">{settings.contactAddressLine2}</div>
            </div>
          </div>

          <div className="flex items-start gap-4 border bg-card p-5 shadow-card">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-primary/20 bg-primary/10">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Teléfono
              </div>
              {settings.contactPhone ? (
                <a
                  href={`tel:${settings.contactPhone.replace(/[^+\d]/g, '')}`}
                  className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:underline"
                >
                  {settings.contactPhone} <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              ) : (
                <div className="mt-1 text-sm font-semibold">Pídenoslo por WhatsApp</div>
              )}
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
                href={`mailto:${settings.contactEmail}`}
                className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:underline"
              >
                {settings.contactEmail} <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <div className="flex items-start gap-4 border bg-card p-5 shadow-card">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-primary/20 bg-primary/10">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Horario
              </div>
              <ul className="mt-1 space-y-1">
                {hours.map((h) => (
                  <li key={h} className="text-sm text-muted-foreground">
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
