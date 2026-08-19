import Link from "next/link";
import { PackagePlus, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { PRODUCTS } from "@/data/catalog";
import { formatPrice } from "@/lib/utils";
import { Badge, Card } from "@/components/ui/card";
import { IconButton } from "@/components/ui/icon-button";
import { deleteProduct, toggleProduct } from "@/app/admin/actions";
import { ToggleField } from "@/components/admin/toggle-field";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; oferta?: string; stock?: string }>;
}) {
  const sp = await searchParams;

  const products = PRODUCTS.filter((p) => {
    if (sp.q) {
      const needle = sp.q.toLowerCase();
      if (!p.name.toLowerCase().includes(needle) && !(p.sku ?? "").toLowerCase().includes(needle)) {
        return false;
      }
    }
    if (sp.oferta === "1" && !p.onSale) return false;
    if (sp.stock === "1" && !(p.active && p.stock <= 5)) return false;
    return true;
  });

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-black uppercase tracking-tight">Productos</h1>
          <p className="mt-1 text-sm text-muted-foreground">{products.length} productos</p>
        </div>
        <Link
          href="/admin/productos/nuevo"
          className="flex items-center gap-2 bg-primary px-5 py-2.5 text-sm font-bold uppercase tracking-widest text-primary-foreground hover:brightness-110"
        >
          <PackagePlus className="h-4 w-4" /> Nuevo producto
        </Link>
      </div>

      <form method="get" className="mb-6 flex flex-wrap gap-2">
        <div className="relative flex-1 sm:max-w-md">
          <input
            type="text"
            name="q"
            defaultValue={sp.q}
            placeholder="Buscar por nombre o código…"
            className="w-full border bg-background py-2 pl-4 pr-10 text-sm outline-none focus:border-primary"
          />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-label="Buscar">
            <Search className="h-4 w-4" />
          </button>
        </div>
        <button
          type="submit"
          name="oferta"
          value={sp.oferta === "1" ? "" : "1"}
          className={`border px-4 py-2 text-xs font-bold uppercase tracking-widest ${
            sp.oferta === "1" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
          }`}
        >
          En oferta
        </button>
        <button
          type="submit"
          name="stock"
          value={sp.stock === "1" ? "" : "1"}
          className={`border px-4 py-2 text-xs font-bold uppercase tracking-widest ${
            sp.stock === "1" ? "bg-destructive text-destructive-foreground" : "hover:bg-muted"
          }`}
        >
          Stock bajo
        </button>
      </form>

      <Card className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead>
            <tr className="border-b text-xs uppercase tracking-widest text-muted-foreground">
              <th className="px-4 py-3 font-semibold">Producto</th>
              <th className="px-4 py-3 font-semibold">Categoría</th>
              <th className="px-4 py-3 font-semibold">Precio</th>
              <th className="px-4 py-3 font-semibold">Stock</th>
              <th className="px-4 py-3 font-semibold">Estado</th>
              <th className="px-4 py-3 text-right font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-muted/40">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 shrink-0 bg-muted">
                      {p.images[0] && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.images[0]} alt="" className="h-full w-full object-cover" />
                      )}
                    </div>
                    <div>
                      <div className="font-semibold">{p.name}</div>
                      {p.sku && <div className="text-xs text-muted-foreground">{p.sku}</div>}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{p.category.name}</td>
                <td className="px-4 py-3">
                  <span className="font-semibold">{formatPrice(p.price)}</span>
                  {p.wasPrice != null && (
                    <span className="ml-1.5 text-xs text-muted-foreground line-through">
                      {formatPrice(p.wasPrice)}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span className={p.stock <= 5 ? "font-semibold text-destructive" : ""}>{p.stock}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <ToggleField
                      label={p.active ? "Activo" : "Oculto"}
                      checked={p.active}
                      action={toggleProduct.bind(null, p.id, "active")}
                    />
                    <ToggleField
                      label={p.featured ? "Destacado" : "Normal"}
                      checked={p.featured}
                      action={toggleProduct.bind(null, p.id, "featured")}
                    />
                    <ToggleField
                      label={p.onSale ? "Oferta" : "Sin oferta"}
                      checked={p.onSale}
                      action={toggleProduct.bind(null, p.id, "onSale")}
                    />
                    {p.badge && <Badge tone="neutral">{p.badge}</Badge>}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/productos/${p.id}/editar`} aria-label={`Editar ${p.name}`}>
                      <IconButton aria-label={`Editar ${p.name}`}>
                        <Pencil className="h-4 w-4" />
                      </IconButton>
                    </Link>
                    <form action={deleteProduct.bind(null, p.id)}>
                      <IconButton type="submit" variant="destructive" aria-label={`Eliminar ${p.name}`}>
                        <Trash2 className="h-4 w-4" />
                      </IconButton>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <p className="font-semibold uppercase tracking-wide">No hay productos</p>
            <Link
              href="/admin/productos/nuevo"
              className="flex items-center gap-1 text-sm font-semibold uppercase tracking-widest text-primary hover:underline"
            >
              <Plus className="h-4 w-4" /> Crear el primero
            </Link>
          </div>
        )}
      </Card>
    </div>
  );
}