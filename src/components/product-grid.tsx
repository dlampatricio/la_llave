"use client";

import { useState } from "react";
import { ProductCard } from "@/components/product-card";
import { PhotoLightbox, type LightboxPhoto } from "@/components/photo-lightbox";
import type { ProductCardData } from "@/lib/types";

export function ProductGrid({ products }: { products: ProductCardData[] }) {
  const [photos, setPhotos] = useState<LightboxPhoto[]>([]);
  const [index, setIndex] = useState<number | null>(null);

  function open(photo: LightboxPhoto) {
    setPhotos(products.map((p) => ({ src: p.image ?? "", alt: p.name })).filter((p) => p.src));
    const i = products.findIndex((p) => p.image === photo.src);
    setIndex(Math.max(i, 0));
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onImageClick={open} />
        ))}
      </div>

      <PhotoLightbox
        photos={photos}
        index={index}
        onClose={() => setIndex(null)}
        onNavigate={setIndex}
      />
    </>
  );
}