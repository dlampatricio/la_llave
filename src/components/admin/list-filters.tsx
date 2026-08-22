"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Select } from "@/components/ui/form";

export function AdminListFilters({
  basePath,
  categories,
  searchPlaceholder,
  searchAriaLabel,
}: {
  basePath: string;
  categories: { slug: string; name: string }[];
  searchPlaceholder: string;
  searchAriaLabel: string;
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
    router.push(`${basePath}?${next.toString()}`);
  }

  function submitSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get("q");
    update({ q: typeof q === "string" ? q.trim() : "" });
  }

  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row">
      <form onSubmit={submitSearch} className="relative sm:flex-1 lg:max-w-xl">
        <input
          type="text"
          name="q"
          defaultValue={params.get("q") ?? ""}
          placeholder={searchPlaceholder}
          aria-label={searchAriaLabel}
          className="w-full border bg-muted py-2 pl-4 pr-10 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring"
        />
        <button
          type="submit"
          aria-label="Buscar"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
        >
          <Search className="h-4 w-4" />
        </button>
      </form>

      <Select
        value={params.get("categoria") ?? ""}
        onChange={(e) => update({ categoria: e.target.value })}
        aria-label="Filtrar por categoría"
        className="sm:w-56"
      >
        <option value="">Todas las categorías</option>
        {categories.map((c) => (
          <option key={c.slug} value={c.slug}>
            {c.name}
          </option>
        ))}
      </Select>
    </div>
  );
}
