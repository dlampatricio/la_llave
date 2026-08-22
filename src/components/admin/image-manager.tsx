"use client";

import { useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/form";
import { IconButton } from "@/components/ui/icon-button";

type ImageManagerProps = {
  images: string[];
  onChange: (images: string[]) => void;
  max?: number;
  label: string;
};

export function ImageManager({ images, onChange, max = 4, label }: ImageManagerProps) {
  const [imageUrl, setImageUrl] = useState("");

  function addImageUrl() {
    const url = imageUrl.trim();
    if (!url || images.length >= max) return;
    onChange([...images, url]);
    setImageUrl("");
  }

  function removeImage(index: number) {
    onChange(images.filter((_, i) => i !== index));
  }

  return (
    <div className="border p-4">
      <div className="mb-3 flex items-baseline justify-between gap-2">
        <p className="text-xs font-bold uppercase tracking-widest">{label}</p>
        <p className="text-xs text-muted-foreground">
          {images.length}/{max}
        </p>
      </div>
      <p className="mb-3 text-xs text-muted-foreground">
        Agrega hasta {max} imágenes con su URL (por ahora; la subida de archivos llega con el backend).
      </p>

      {images.length < max && (
        <div className="flex gap-2">
          <Input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addImageUrl();
              }
            }}
            placeholder="https://…/foto.jpg"
            aria-label="URL de la imagen"
          />
          <Button
            type="button"
            variant="secondary"
            disabled={!imageUrl.trim()}
            onClick={addImageUrl}
          >
            <ImagePlus className="h-4 w-4" /> Agregar
          </Button>
        </div>
      )}

      {images.length > 0 && (
        <ul className="mt-4 space-y-2.5">
          {images.map((img, idx) => (
            <li key={`${img}-${idx}`} className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img}
                alt={`Foto ${idx + 1}`}
                className="h-12 w-12 shrink-0 border object-cover"
              />
              <input
                type="text"
                value={img}
                readOnly
                aria-label={`URL de la foto ${idx + 1}`}
                className="min-w-0 flex-1 border bg-muted px-2 py-1.5 text-xs text-muted-foreground outline-none"
              />
              <IconButton
                variant="destructive"
                onClick={() => removeImage(idx)}
                aria-label={`Quitar foto ${idx + 1}`}
              >
                <X className="h-3.5 w-3.5" />
              </IconButton>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
