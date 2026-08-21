import { CategoryGrid } from '@/components/category-grid';
import { Hero } from '@/components/hero';
import { ProductCard } from '@/components/product-card';
import { PromoBanner } from '@/components/promo-banner';
import { SectionHeader } from '@/components/section-header';
import { ServiceCard } from '@/components/service-card';
import { ServiceCategoryGrid } from '@/components/service-category-grid';
import { getHomeData } from '@/lib/products';
import { getHomeServices } from '@/lib/services';
import { getSettings } from '@/lib/settings';
import { toProductCardData, toServiceCardData } from '@/lib/types';
import type { Metadata } from 'next';

export const revalidate = 30;

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

export default async function HomePage() {
  const [settings, { categories, featured, onSale }, homeServices] = await Promise.all([
    getSettings(),
    getHomeData(),
    getHomeServices(),
  ]);

  return (
    <>
      <Hero settings={settings} />
      <CategoryGrid categories={categories} />

      {homeServices.categories.length > 0 && (
        <ServiceCategoryGrid categories={homeServices.categories} />
      )}

      <PromoBanner settings={settings} />

      {featured.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
          <SectionHeader title="Productos Destacados" href="/productos" />
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={toProductCardData(p)} />
            ))}
          </div>
        </section>
      )}

      {homeServices.featured.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
          <SectionHeader title="Servicios Destacados" href="/servicios" linkLabel="Ver todos" />
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {homeServices.featured.map((s) => (
              <ServiceCard key={s.id} service={toServiceCardData(s)} />
            ))}
          </div>
        </section>
      )}

      {onSale.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
          <SectionHeader
            title="Ofertas de la Semana"
            href="/productos?ofertas=1"
            linkLabel="Ver ofertas"
          />
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {onSale.map((p) => (
              <ProductCard key={p.id} product={toProductCardData(p)} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
