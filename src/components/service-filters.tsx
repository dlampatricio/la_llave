"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Select } from "@/components/ui/form";

export function ServiceFilters({
  categories,
}: {
  categories: { slug: string; name: string }[];
}) {
  const router = useRouter();
  const params = useSearchParams();

  function update(patch: Record<string, string>) {
    const next = new URLSearchParams(params.toString());
    for (const [key, value] of Object.entries(patch)) {
      if (value) next.set(key, value);
      else next.delete(key);
    }
    next.delete("pagina");
    router.push(`/servicios?${next.toString()}`);
  }

  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row">
      <Select
        value={params.get("categoria") ?? ""}
        onChange={(e) => update({ categoria: e.target.value })}
        aria-label="Filtrar por categoría de servicio"
        className="sm:w-64"
      >
        <option value="">Todas las categorías</option>
        {categories.map((c) => (
          <option key={c.slug} value={c.slug}>
            {c.name}
          </option>
        ))}
      </Select>

      <Select
        value={params.get("orden") ?? "recent"}
        onChange={(e) => update({ orden: e.target.value })}
        aria-label="Ordenar servicios"
        className="sm:w-56"
      >
        <option value="recent">Más recientes</option>
        <option value="price-asc">Precio: menor a mayor</option>
        <option value="price-desc">Precio: mayor a menor</option>
      </Select>
    </div>
  );
}