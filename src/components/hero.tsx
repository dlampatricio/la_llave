import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PRODUCTS } from "@/data/catalog";
import type { SiteSettings } from "@/lib/settings";

const STOCK_COUNT = PRODUCTS.filter((p) => p.active).length.toLocaleString("es-MX");

export function Hero({ settings }: { settings: SiteSettings }) {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: 480 }}>
      <Image
        src={settings.heroImage}
        alt="Herramientas sobre una mesa de trabajo"
        fill
        priority
        sizes="100vw"
        className="object-cover brightness-[0.8] dark:brightness-[0.65]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/60 to-transparent" />

      <div className="relative mx-auto flex max-w-7xl flex-col justify-center px-4 py-24 sm:px-6" style={{ minHeight: 480 }}>
        <div className="max-w-lg">
          <span className="mb-6 inline-block bg-primary px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary-foreground">
            {settings.heroBadge}
          </span>
          <h1 className="font-display mb-4 text-6xl font-black uppercase leading-none tracking-tight text-white sm:text-7xl">
            {settings.heroTitleLine1}
            <br />
            <span className="text-primary">{settings.heroTitleHighlight}</span>
            <br />
            {settings.heroTitleLine2}
          </h1>
          <p className="mb-8 max-w-sm text-base leading-relaxed text-stone-200/90">{settings.heroSubtitle}</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/productos?ofertas=1"
              className="bg-primary px-8 py-3 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-all hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {settings.heroCtaPrimary}
            </Link>
            <Link
              href="/productos"
              className="flex items-center gap-2 border-2 border-white/90 px-8 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-stone-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {settings.heroCtaSecondary} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 hidden grid-cols-3 divide-x divide-white/10 lg:grid">
        {[
          [STOCK_COUNT, "Productos en stock"],
          ["48 hrs", "Entrega garantizada"],
          ["Pro", "Precios para obra"],
        ].map(([val, label]) => (
          <div
            key={label}
            className="bg-black/55 px-8 py-5 text-right backdrop-blur-sm"
          >
            <div className="font-display text-3xl font-black uppercase text-primary">{val}</div>
            <div className="text-xs uppercase tracking-widest text-stone-300/90">{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}