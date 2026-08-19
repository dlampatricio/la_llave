import { CATEGORIES, PRODUCTS, categoriesWithCounts, type MockProduct } from "@/data/catalog";

export type ProductWithCategory = MockProduct;

export async function getHomeData() {
  return {
    categories: categoriesWithCounts()
      .filter((c) => c._count.products > 0)
      .slice(0, 8),
    featured: PRODUCTS.filter((p) => p.active && p.featured),
    onSale: PRODUCTS.filter((p) => p.active && p.onSale),
  };
}

export async function getProducts(params: {
  q?: string;
  category?: string;
  onSale?: boolean;
  order?: string;
  page?: number;
  pageSize?: number;
}) {
  const { q, category, onSale, order = "recent", page = 1, pageSize = 12 } = params;

  let filtered = PRODUCTS.filter((p) => p.active);

  if (q) {
    const needle = q.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(needle) ||
        (p.sku ?? "").toLowerCase().includes(needle) ||
        (p.description ?? "").toLowerCase().includes(needle),
    );
  }
  if (category) filtered = filtered.filter((p) => p.category.slug === category);
  if (onSale) filtered = filtered.filter((p) => p.onSale);

  const sorted = [...filtered].sort((a, b) => {
    if (order === "price-asc") return a.price - b.price;
    if (order === "price-desc") return b.price - a.price;
    return b.createdAt.localeCompare(a.createdAt);
  });

  const total = sorted.length;
  const products = sorted.slice((page - 1) * pageSize, page * pageSize);

  return { products, total, categories: categoriesWithCounts(), page, pageSize };
}

export async function getProductBySlug(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug && p.active) ?? null;
}

export async function getRelatedProducts(product: ProductWithCategory, take = 4) {
  return PRODUCTS.filter(
    (p) => p.active && p.category.id === product.category.id && p.id !== product.id,
  ).slice(0, take);
}

export async function getCategories() {
  return categoriesWithCounts();
}

export function getAllProducts() {
  return PRODUCTS;
}

export function getCategoryList() {
  return CATEGORIES.map((c) => ({ id: c.id, name: c.name, slug: c.slug }));
}