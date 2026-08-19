import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/section-header";

type Category = {
  name: string;
  slug: string;
  imageUrl: string | null;
  _count: { products: number };
};

export function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <SectionHeader title="Compra por Categoría" href="/productos" linkLabel="Todas las categorías" />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/productos?categoria=${cat.slug}`}
            className="group relative block overflow-hidden bg-muted shadow-card transition-shadow hover:shadow-card-hover"
            style={{ aspectRatio: "4/3" }}
          >
            {cat.imageUrl ? (
              <Image
                src={cat.imageUrl}
                alt={cat.name}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover brightness-50 transition-all duration-500 group-hover:scale-105 group-hover:brightness-[0.4]"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-b from-muted to-secondary" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute inset-0 bg-primary/0 transition-colors duration-200 group-hover:bg-primary/25" />
            <div className="absolute bottom-0 left-0 p-4">
              <div className="font-display text-2xl font-black uppercase tracking-tight text-white">
                {cat.name}
              </div>
              <div className="mt-0.5 text-xs text-stone-200/90">
                {cat._count.products} productos
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}