export const PAGE_SIZE = 10;

/**
 * Detecta ofertas inconsistentes que confunden al cliente:
 * - en oferta sin precio de referencia (no se ve el descuento)
 * - precio anterior puesto pero oferta apagada (tachado sin promo)
 * - el "precio anterior" no es mayor al precio actual
 */
export function offerNeedsFix(product: {
  onSale: boolean;
  wasPrice: number | null;
  price: number;
}) {
  if (product.onSale && product.wasPrice == null) return true;
  if (!product.onSale && product.wasPrice != null) return true;
  if (product.wasPrice != null && product.wasPrice <= product.price) return true;
  return false;
}

export function paginate<T>(items: T[], requestedPage: number) {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const page = Math.min(Math.max(1, requestedPage), totalPages);

  return {
    total,
    totalPages,
    page,
    items: items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
  };
}

export function buildPageHref(
  basePath: string,
  params: Record<string, string | undefined>,
  page: number,
) {
  const next = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value) next.set(key, value);
  }
  if (page > 1) next.set("pagina", String(page));

  const qs = next.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}
