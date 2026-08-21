export const PAGE_SIZE = 10;

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
