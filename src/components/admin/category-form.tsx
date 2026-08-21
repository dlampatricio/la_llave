"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Check, Pencil, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FieldError, Input, Label } from "@/components/ui/form";
import { IconButton } from "@/components/ui/icon-button";

const categorySchema = z.object({
  name: z.string().trim().min(2, "El nombre es obligatorio (mínimo 2 caracteres)"),
  imageUrl: z
    .string()
    .trim()
    .refine((v) => v === "" || /^https?:\/\/\S+$/.test(v), "Ingresa una URL válida (https://…)"),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

type Props = {
  action: (input: { name: string; imageUrl?: string }) => Promise<void>;
  initial?: { name: string; imageUrl?: string };
  compact?: boolean;
};

export function CategoryForm({ action, initial, compact }: Props) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: initial?.name ?? "",
      imageUrl: initial?.imageUrl ?? "",
    },
  });

  async function onSubmit(values: CategoryFormValues) {
    await action({ name: values.name, imageUrl: values.imageUrl || undefined });
    reset(values);
    setEditing(false);
    router.refresh();
  }

  function cancelEdit() {
    reset();
    setEditing(false);
  }

  if (compact && initial) {
    if (!editing) {
      return (
        <IconButton aria-label={`Editar ${initial.name}`} onClick={() => setEditing(true)}>
          <Pencil className="h-4 w-4" />
        </IconButton>
      );
    }

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="flex items-start gap-1.5">
        <div>
          <Input
            autoFocus
            {...register("name")}
            aria-label="Nombre de categoría"
            aria-invalid={Boolean(errors.name)}
            className="w-40"
          />
          <FieldError message={errors.name?.message} />
        </div>
        <IconButton type="submit" disabled={isSubmitting} aria-label="Guardar nombre">
          <Check className="h-4 w-4" />
        </IconButton>
        <IconButton aria-label="Cancelar edición" onClick={cancelEdit}>
          <X className="h-4 w-4" />
        </IconButton>
      </form>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_auto]"
    >
      <div>
        <Label htmlFor="cat-name">Nombre</Label>
        <Input id="cat-name" {...register("name")} placeholder="Ej: Pinturas" />
        <FieldError message={errors.name?.message} />
      </div>
      <div>
        <Label htmlFor="cat-image">URL de imagen (opcional)</Label>
        <Input id="cat-image" {...register("imageUrl")} placeholder="https://…" />
        <FieldError message={errors.imageUrl?.message} />
      </div>
      <div className="flex items-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Guardando…" : "Guardar"}
        </Button>
      </div>
    </form>
  );
}
