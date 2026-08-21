import {
  SERVICE_CATEGORIES,
  SERVICES,
  serviceCategoriesWithCounts,
  type MockService,
} from "@/data/services";
import { normalizeText } from "@/lib/utils";

export type ServiceWithCategory = MockService;

export async function getHomeServices() {
  return {
    categories: serviceCategoriesWithCounts()
      .filter((c) => c._count.services > 0)
      .slice(0, 8),
    featured: SERVICES.filter((s) => s.active && s.featured),
  };
}

export async function getServices(params: {
  q?: string;
  category?: string;
  order?: string;
  page?: number;
  pageSize?: number;
}) {
  const { q, category, order = "recent", page = 1, pageSize = 12 } = params;

  let filtered = SERVICES.filter((s) => s.active);

  if (q) {
    const needle = normalizeText(q);
    filtered = filtered.filter(
      (s) =>
        normalizeText(s.name).includes(needle) ||
        normalizeText(s.category.name).includes(needle) ||
        normalizeText(s.description ?? "").includes(needle),
    );
  }
  if (category) filtered = filtered.filter((s) => s.category.slug === category);

  const sorted = [...filtered].sort((a, b) => {
    if (order === "price-asc") return (a.priceFrom ?? Number.MAX_SAFE_INTEGER) - (b.priceFrom ?? Number.MAX_SAFE_INTEGER);
    if (order === "price-desc") return (b.priceFrom ?? -1) - (a.priceFrom ?? -1);
    return b.createdAt.localeCompare(a.createdAt);
  });

  const total = sorted.length;
  const services = sorted.slice((page - 1) * pageSize, page * pageSize);

  return { services, total, categories: serviceCategoriesWithCounts(), page, pageSize };
}

export async function getServiceBySlug(slug: string) {
  return SERVICES.find((s) => s.slug === slug && s.active) ?? null;
}

export async function getRelatedServices(service: ServiceWithCategory, take = 4) {
  return SERVICES.filter(
    (s) => s.active && s.category.id === service.category.id && s.id !== service.id,
  ).slice(0, take);
}

export async function getServiceCategories() {
  return serviceCategoriesWithCounts();
}

export function getAllServices() {
  return SERVICES;
}

export function getServiceCategoryList() {
  return SERVICE_CATEGORIES.map((c) => ({ id: c.id, name: c.name, slug: c.slug }));
}