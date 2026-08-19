"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { useQuote } from "@/components/quote-provider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/card";
import { cn, formatPrice, getDiscountPct } from "@/lib/utils";
import type { ProductCardData } from "@/lib/types";

function StarRating({ rating }: { rating: number | null }) {
  if (rating == null) return null;
  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={cn(
              "h-3 w-3",
              i <= Math.round(rating) ? "fill-primary text-primary" : "fill-transparent text-muted-foreground/60",
            )}
          />
        ))}
      </div>
      <span className="text-xs text-muted-foreground">{rating.toFixed(1)}</span>
    </div>
  );
}

export function ProductCard({ product }: { product: ProductCardData }) {
  const { addItem } = useQuote();
  const discount = getDiscountPct(product.price, product.wasPrice);

  const badgeLabel = product.badge ?? (discount ? `-${discount}%` : null);
  const badgeTone =
    product.badge === "OFERTA" || discount
      ? "oferta"
      : product.badge === "NUEVO"
        ? "nuevo"
        : product.badge === "MÁS VENDIDO"
          ? "destacado"
          : "neutral";

  return (
    <div className="group flex flex-col border bg-card shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover">
      <Link href={`/productos/${product.slug}`} className="relative block overflow-hidden" style={{ aspectRatio: "1/1" }}>
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
            <span className="text-xs font-bold uppercase tracking-widest">Sin imagen</span>
          </div>
        )}
        {badgeLabel && <Badge tone={badgeTone} className="absolute left-0 top-0">{badgeLabel}</Badge>}
      </Link>

      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <div>
          {product.sku && (
            <div className="mb-1 text-[10px] uppercase tracking-widest text-muted-foreground">
              {product.sku}
            </div>
          )}
          <Link href={`/productos/${product.slug}`}>
            <h3 className="text-sm font-semibold leading-snug transition-colors hover:text-primary">
              {product.name}
            </h3>
          </Link>
        </div>

        <StarRating rating={product.rating} />

        <div className="mt-auto flex items-baseline gap-2">
          <span className="font-display text-xl font-extrabold tracking-tight">{formatPrice(product.price)}</span>
          {product.wasPrice != null && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.wasPrice)}
            </span>
          )}
        </div>

        <Button
          size="sm"
          className="w-full"
          onClick={() =>
            addItem({
              id: product.id,
              name: product.name,
              sku: product.sku,
              price: product.price,
              image: product.image,
              qty: 1,
            })
          }
        >
          Añadir a cotización
        </Button>
      </div>
    </div>
  );
}