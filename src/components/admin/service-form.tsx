"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FieldError, Input, Label, Select, Textarea } from "@/components/ui/form";
import { createService, updateService } from "@/app/admin/actions";

const serviceSchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio (mínimo 2 caracteres)"),
  categoryId: z.string().min(1, "Selecciona una categoría"),
  priceFrom: z.number().positive("El precio debe ser mayor a 0").optional(),
  description: z.string().optional(),
  badge: z.string().optional(),
  featured: z.boolean(),
  active: z.boolean(),
});

type ServiceFormValues = z.input<typeof serviceSchema>;

type Props = {
  categories: { id: string; name: string }[];
  initial?: ServiceFormValues & { id?: string };
  initialImages?: string[];
};

export function ServiceForm({ categories, initial, initialImages = [] }: Props) {
  const [images, setImages] = useState<string[]>(initialImages);
  const [imageUrl, setImageUrl] = useState("");

  function addImageUrl() {
    const url = imageUrl.trim();
    if (!url || images.length >= 4) return;
    setImages((prev) => [...prev, url]);
    setImageUrl("");
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: "",
      categoryId: "",
      priceFrom: undefined,
      description: "",
      badge: "",
      featured: false,
      active: true,
      ...initial,
    },
  });

  function asNumber(value: unknown) {
    if (typeof value === "string" && value.trim() === "") return undefined;
    const n = Number(value);
    return Number.isNaN(n) ? undefined : n;
  }

  async function onSubmit(values: ServiceFormValues) {
    const data = {
      ...values,
      images,
      priceFrom: values.priceFrom ?? null,
    };
    if (initial?.id) {
      await updateService(initial.id, data);
    } else {
      await createService(data);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        <div>
          <Label htmlFor="name">Nombre del servicio *</Label>
          <Input id="name" {...register("name")} placeholder="Ej: Reparación de refrigeradoras" />
          <FieldError message={errors.name?.message} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="categoryId">Categoría *</Label>
            <Select id="categoryId" {...register("categoryId")}>
              <option value="">Selecciona…</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>
            <FieldError message={errors.categoryId?.message} />
          </div>
          <div>
            <Label htmlFor="priceFrom">Precio desde (USD, opcional)</Label>
            <Input id="priceFrom" type="number" step="0.01" min="0" {...register("priceFrom", { setValueAs: asNumber })} placeholder="25.00" />
            <FieldError message={errors.priceFrom?.message} />
            <p className="mt-1 text-xs text-muted-foreground">
              Déjalo vacío si el precio depende de cada trabajo.
            </p>
          </div>
        </div>

        <div>
          <Label htmlFor="description">Descripción</Label>
          <Textarea
            id="description"
            rows={5}
            {...register("description")}
            placeholder="Describe el servicio y lo que incluye: trabajos, materiales, cobertura…"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="badge">Etiqueta (opcional)</Label>
            <Select id="badge" {...register("badge")}>
              <option value="">Sin etiqueta</option>
              <option value="NUEVO">NUEVO</option>
              <option value="OFERTA">OFERTA</option>
            </Select>
          </div>
        </div>

        <div className="flex flex-wrap gap-6 border p-4">
          <label className="flex items-center gap-2 text-sm font-semibold">
            <input type="checkbox" {...register("featured")} className="h-4 w-4 accent-primary" />
            Destacado en la portada
          </label>
          <label className="flex items-center gap-2 text-sm font-semibold">
            <input type="checkbox" {...register("active")} className="h-4 w-4 accent-primary" />
            Visible en la web
          </label>
        </div>
      </div>

      <div className="space-y-4">
        <div className="border p-4">
          <Label>Fotos del servicio</Label>
          <p className="mb-3 text-xs text-muted-foreground">
            Agrega hasta 4 imágenes con su URL (por ahora; la subida de archivos llega con el backend).
          </p>
          {images.length < 4 && (
            <div className="flex gap-2">
              <Input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://…/foto.jpg"
                aria-label="URL de la imagen"
              />
              <Button type="button" variant="secondary" onClick={addImageUrl} disabled={!imageUrl.trim()}>
                <ImagePlus className="h-4 w-4" /> Agregar
              </Button>
            </div>
          )}

          <div className="mt-4 space-y-3">
            {images.map((img, idx) => (
              <div key={img} className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt={`Foto ${idx + 1}`} className="h-14 w-14 border object-cover" />
                <input
                  type="text"
                  value={img}
                  readOnly
                  className="flex-1 border bg-muted px-2 py-1.5 text-xs"
                />
                <button
                  type="button"
                  onClick={() => setImages((prev) => prev.filter((_, i) => i !== idx))}
                  className="border p-1.5 text-destructive transition-colors hover:bg-destructive/10"
                  aria-label={`Quitar foto ${idx + 1}`}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Guardando…" : initial?.id ? "Guardar cambios" : "Crear servicio"}
        </Button>
      </div>
    </form>
  );
}