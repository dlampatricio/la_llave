"use client";

import { useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type LightboxPhoto = { src: string; alt: string };

export function PhotoLightbox({
  photos,
  index,
  onClose,
  onNavigate,
}: {
  photos: LightboxPhoto[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const open = index !== null && photos.length > 0;
  const currentIndex = index ?? 0;

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((currentIndex + 1) % photos.length);
      if (e.key === "ArrowLeft") onNavigate((currentIndex - 1 + photos.length) % photos.length);
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, currentIndex, photos.length, onClose, onNavigate]);

  if (!open) return null;

  const photo = photos[currentIndex];

  return (
    <div className="fixed inset-0 z-[80] flex flex-col bg-black/90 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <span className="text-xs font-bold uppercase tracking-widest text-stone-400">
          {currentIndex + 1} / {photos.length}
        </span>
        <button
          onClick={onClose}
          aria-label="Cerrar visor de fotos"
          className="flex h-9 w-9 items-center justify-center text-stone-300 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4 sm:px-20">
        <div className="relative h-full w-full max-w-5xl">
          <Image src={photo.src} alt={photo.alt} fill sizes="90vw" className="object-contain" />
        </div>
      </div>

      <div className="px-4 pb-6 pt-2 text-center">
        <span className="text-sm font-semibold text-stone-200">{photo.alt}</span>
      </div>

      {photos.length > 1 && (
        <>
          <button
            onClick={() => onNavigate((currentIndex - 1 + photos.length) % photos.length)}
            aria-label="Foto anterior"
            className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/20 text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-6"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={() => onNavigate((currentIndex + 1) % photos.length)}
            aria-label="Foto siguiente"
            className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/20 text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-6"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}
    </div>
  );
}