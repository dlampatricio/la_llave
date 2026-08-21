"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FieldError, Input, Label, Select, Textarea } from "@/components/ui/form";
import { createProduct, updateProduct } from "@/app/admin/actions";
import { ImageManager } from "@/components/admin/image-manager";

const productSchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio (mínimo 2 caracteres)"),
  sku: z.string().optional(),
  categoryId: z.string().min(1, "Selecciona una categoría"),
  price: z.number({ message: "El precio es obligatorio" }).positive("El precio debe ser mayor a 0"),
  wasPrice: z.number().positive("El precio anterior debe ser mayor a 0").optional(),
  stock: z.number().int().min(0).default(0),
  description: z.string().optional(),
  badge: z.string().optional(),
  featured: z.boolean(),
  onSale: z.boolean(),
  active: z.boolean(),
  rating: z.number().min(0).max(5).optional(),
  reviewsCount: z.number().int().min(0).default(0),
});

type ProductFormValues = z.input<typeof productSchema>;

type Props = {
  categories: { id: string; name: string }[];
  initial?: ProductFormValues & { id?: string };
  initialImages?: string[];
};

export function ProductForm({ categories, initial, initialImages = [] }: Props) {
  const [images, setImages] = useState<string[]>(initialImages);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      sku: "",
      categoryId: "",
      price: undefined,
      wasPrice: undefined,
      stock: 0,
      description: "",
      badge: "",
      featured: false,
      onSale: false,
      active: true,
      rating: undefined,
      reviewsCount: 0,
      ...initial,
    },
  });

  function asNumber(value: unknown) {
    if (typeof value === "string" && value.trim() === "") return undefined;
    const n = Number(value);
    return Number.isNaN(n) ? undefined : n;
  }

  async function onSubmit(values: ProductFormValues) {
    const data = {
      ...values,
      images,
      wasPrice: values.wasPrice ?? null,
      rating: values.rating ?? null,
      stock: values.stock ?? 0,
      reviewsCount: values.reviewsCount ?? 0,
    };
    if (initial?.id) {
      await updateProduct(initial.id, data);
    } else {
      await createProduct(data);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        <div>
          <Label htmlFor="name">Nombre del producto *</Label>
          <Input id="name" {...register("name")} placeholder="Ej: Taladro percutor 13mm 750W" />
          <FieldError message={errors.name?.message} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="sku">Código / SKU</Label>
            <Input id="sku" {...register("sku")} placeholder="Ej: TL-750W-13" />
          </div>
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
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <Label htmlFor="price">Precio (USD) *</Label>
            <Input id="price" type="number" step="0.01" min="0" {...register("price", { setValueAs: asNumber })} placeholder="49.99" />
            <FieldError message={errors.price?.message} />
          </div>
          <div>
            <Label htmlFor="wasPrice">Precio anterior (opcional)</Label>
            <Input id="wasPrice" type="number" step="0.01" min="0" {...register("wasPrice", { setValueAs: asNumber })} placeholder="59.99" />
            <FieldError message={errors.wasPrice?.message} />
          </div>
          <div>
            <Label htmlFor="stock">Stock</Label>
            <Input id="stock" type="number" min="0" {...register("stock", { setValueAs: asNumber })} />
          </div>
        </div>

        <div>
          <Label htmlFor="description">Descripción</Label>
          <Textarea
            id="description"
            rows={5}
            {...register("description")}
            placeholder="Describe el producto: material, medidas, marca, uso recomendado…"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="badge">Etiqueta (opcional)</Label>
            <Select id="badge" {...register("badge")}>
              <option value="">Sin etiqueta</option>
              <option value="OFERTA">OFERTA</option>
              <option value="NUEVO">NUEVO</option>
              <option value="MAS VENDIDO">MÁS VENDIDO</option>
            </Select>
          </div>
          <div>
            <Label htmlFor="rating">Calificación (0–5)</Label>
            <Input id="rating" type="number" step="0.1" min="0" max="5" {...register("rating", { setValueAs: asNumber })} placeholder="4.8" />
          </div>
        </div>

        <div className="flex flex-wrap gap-6 border p-4">
          <label className="flex items-center gap-2 text-sm font-semibold">
            <input type="checkbox" {...register("featured")} className="h-4 w-4 accent-primary" />
            Destacado en la portada
          </label>
          <label className="flex items-center gap-2 text-sm font-semibold">
            <input type="checkbox" {...register("onSale")} className="h-4 w-4 accent-primary" />
            En oferta
          </label>
          <label className="flex items-center gap-2 text-sm font-semibold">
            <input type="checkbox" {...register("active")} className="h-4 w-4 accent-primary" />
            Visible en la web
          </label>
        </div>
      </div>

      <div className="space-y-4">
        <ImageManager images={images} onChange={setImages} label="Fotos del producto" />

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Guardando…" : initial?.id ? "Guardar cambios" : "Crear producto"}
        </Button>
      </div>
    </form>
  );
}