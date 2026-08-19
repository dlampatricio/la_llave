"use client";

import { useState } from "react";
import Image from "next/image";
import { PhotoLightbox, type LightboxPhoto } from "@/components/photo-lightbox";
import { cn } from "@/lib/utils";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [selected, setSelected] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  if (images.length === 0) {
    return (
      <div
        className="flex items-center justify-center border bg-card text-muted-foreground"
        style={{ aspectRatio: "1/1" }}
      >
        <span className="text-xs font-bold uppercase tracking-widest">Sin imagen</span>
      </div>
    );
  }

  const photos: LightboxPhoto[] = images.map((src) => ({ src, alt: name }));

  return (
    <>
      <div className="relative overflow-hidden border bg-card" style={{ aspectRatio: "1/1" }}>
        <button
          type="button"
          onClick={() => setLightbox(selected)}
          className="group absolute inset-0 cursor-zoom-in"
          aria-label="Ver foto ampliada"
        >
          <Image
            src={images[selected]}
            alt={name}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </button>
        {photos.length > 1 && (
          <span className="absolute right-3 top-3 bg-black/60 px-2 py-1 text-xs font-bold uppercase tracking-widest text-white">
            {selected + 1} / {photos.length}
          </span>
        )}
      </div>

      {photos.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-3">
          {photos.map((p, i) => (
            <button
              key={p.src}
              type="button"
              onClick={() => setSelected(i)}
              className={cn(
                "relative overflow-hidden border bg-card transition-colors",
                selected === i ? "border-primary" : "hover:border-foreground/40",
              )}
              style={{ aspectRatio: "1/1" }}
              aria-label={`Ver foto ${i + 1}`}
              aria-current={selected === i}
            >
              <Image src={p.src} alt={`${name} — foto ${i + 1}`} fill sizes="25vw" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      <PhotoLightbox
        photos={photos}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onNavigate={setLightbox}
      />
    </>
  );
}