"use server";

import { revalidatePath } from "next/cache";

/**
 * NOTA: estos datos son de prueba (mock). Las acciones no persisten cambios;
 * sirven para validar el flujo de la interfaz. Al implementar el backend
 * (Prisma + Neon) se conectarán a la base de datos real.
 */

type ProductInput = {
  name: string;
  categoryId: string;
  price: number;
  sku?: string;
  description?: string;
  wasPrice?: number | null;
  stock?: number;
  images?: string[];
  featured?: boolean;
  onSale?: boolean;
  badge?: string;
  rating?: number | null;
  reviewsCount?: number;
  active?: boolean;
};

export async function createProduct(_input: ProductInput) {
  revalidatePath("/", "layout");
  revalidatePath("/productos", "layout");
}

export async function updateProduct(_id: string, _input: ProductInput) {
  revalidatePath("/", "layout");
  revalidatePath("/productos", "layout");
}

export async function deleteProduct(_id: string) {
  revalidatePath("/", "layout");
  revalidatePath("/productos", "layout");
}

export async function toggleProduct(_id: string, _field: "active" | "featured" | "onSale") {
  revalidatePath("/", "layout");
  revalidatePath("/productos", "layout");
}

export async function createCategory(_input: { name: string; imageUrl?: string }) {
  revalidatePath("/", "layout");
}

export async function updateCategory(_id: string, _input: { name: string; imageUrl?: string }) {
  revalidatePath("/", "layout");
  revalidatePath("/productos", "layout");
}

export async function deleteCategory(_id: string) {
  revalidatePath("/", "layout");
}

export async function saveSiteSettings(_values: unknown) {
  revalidatePath("/", "layout");
  revalidatePath("/admin/configuracion");
}