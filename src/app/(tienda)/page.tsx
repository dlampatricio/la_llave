import { getHomeData } from "@/lib/products";
import { getSettings } from "@/lib/settings";
import { toProductCardData } from "@/lib/types";
import { Hero } from "@/components/hero";
import { CategoryGrid } from "@/components/category-grid";
import { PromoBanner } from "@/components/promo-banner";
import { ProductCard } from "@/components/product-card";
import { TrustStrip } from "@/components/trust-strip";
import { SectionHeader } from "@/components/section-header";

export const revalidate = 30;

export default async function HomePage() {
  const [settings, { categories, featured, onSale }] = await Promise.all([
    getSettings(),
    getHomeData(),
  ]);

  return (
    <>
      <Hero settings={settings} />
      <CategoryGrid categories={categories} />
      <PromoBanner settings={settings} />

      {featured.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
          <SectionHeader title="Productos Destacados" href="/productos" />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={toProductCardData(p)} />
            ))}
          </div>
        </section>
      )}

      {onSale.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
          <SectionHeader title="Ofertas de la Semana" href="/productos?ofertas=1" linkLabel="Ver ofertas" />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {onSale.map((p) => (
              <ProductCard key={p.id} product={toProductCardData(p)} />
            ))}
          </div>
        </section>
      )}

      <TrustStrip />
    </>
  );
}