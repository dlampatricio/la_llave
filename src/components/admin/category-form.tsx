"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/form";

type Props = {
  action: (input: { name: string; imageUrl?: string }) => Promise<void>;
  initial?: { name: string; imageUrl?: string };
  compact?: boolean;
};

export function CategoryForm({ action, initial, compact }: Props) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    if (!name) return;
    const imageUrl = String(formData.get("imageUrl") ?? "").trim();

    startTransition(async () => {
      await action({ name, imageUrl: imageUrl || undefined });
      router.refresh();
    });
  }

  if (compact && initial) {
    return (
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <Input name="name" defaultValue={initial.name} className="w-40" aria-label="Nombre de categoría" />
        <Input name="imageUrl" defaultValue={initial.imageUrl} className="hidden" />
        <Button type="submit" size="sm" variant="secondary" disabled={pending} aria-label="Guardar nombre">
          <Pencil className="h-3.5 w-3.5" />
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-[1fr_1.5fr_auto]">
      <div>
        <Label htmlFor="cat-name">Nombre</Label>
        <Input id="cat-name" name="name" required placeholder="Ej: Pinturas" defaultValue={initial?.name} />
      </div>
      <div>
        <Label htmlFor="cat-image">URL de imagen (opcional)</Label>
        <Input
          id="cat-image"
          name="imageUrl"
          placeholder="https://…"
          defaultValue={initial?.imageUrl}
        />
      </div>
      <div className="flex items-end">
        <Button type="submit" disabled={pending}>
          {pending ? "Guardando…" : "Guardar"}
        </Button>
      </div>
    </form>
  );
}