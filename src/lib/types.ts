export type ProductCardData = {
  id: string;
  name: string;
  slug: string;
  sku: string | null;
  price: number;
  wasPrice: number | null;
  image: string | null;
  badge: string | null;
  rating: number | null;
  reviewsCount: number;
  categoryName: string;
};

export function toProductCardData(product: {
  id: string;
  name: string;
  slug: string;
  sku: string | null;
  price: { toNumber: () => number } | number;
  wasPrice: { toNumber: () => number } | number | null;
  images: string[];
  badge: string | null;
  rating: { toNumber: () => number } | number | null;
  reviewsCount: number;
  category: { name: string };
}): ProductCardData {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    sku: product.sku,
    price: Number(product.price),
    wasPrice: product.wasPrice != null ? Number(product.wasPrice) : null,
    image: product.images[0] ?? null,
    badge: product.badge,
    rating: product.rating != null ? Number(product.rating) : null,
    reviewsCount: product.reviewsCount,
    categoryName: product.category.name,
  };
}

export type ServiceCardData = {
  id: string;
  name: string;
  slug: string;
  priceFrom: number | null;
  image: string | null;
  badge: string | null;
  categoryName: string;
  description: string | null;
};

export function toServiceCardData(service: {
  id: string;
  name: string;
  slug: string;
  priceFrom: { toNumber: () => number } | number | null;
  images: string[];
  badge: string | null;
  description: string | null;
  category: { name: string };
}): ServiceCardData {
  return {
    id: service.id,
    name: service.name,
    slug: service.slug,
    priceFrom: service.priceFrom != null ? Number(service.priceFrom) : null,
    image: service.images[0] ?? null,
    badge: service.badge,
    categoryName: service.category.name,
    description: service.description,
  };
}