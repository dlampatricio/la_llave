"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox, FieldError, Input, Label, Select, Textarea } from "@/components/ui/form";
import { createService, updateService } from "@/app/admin/actions";
import { ImageManager } from "@/components/admin/image-manager";

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
            <Label htmlFor="badge">Etiqueta</Label>
            <Select id="badge" {...register("badge")}>
              <option value="">Sin etiqueta</option>
              <option value="NUEVO">NUEVO</option>
              <option value="OFERTA">OFERTA</option>
            </Select>
          </div>
        </div>

        <div className="flex flex-wrap gap-6 border p-4">
          <label className="flex items-center gap-2 text-sm font-semibold">
            <Checkbox {...register("featured")} />
            Destacado en la portada
          </label>
          <label className="flex items-center gap-2 text-sm font-semibold">
            <Checkbox {...register("active")} />
            Visible en la web
          </label>
        </div>
      </div>

      <div className="space-y-4">
        <ImageManager images={images} onChange={setImages} label="Fotos del servicio" />

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Guardando…" : initial?.id ? "Guardar cambios" : "Crear servicio"}
        </Button>
      </div>
    </form>
  );
}