"use client";

import { ShoppingCart } from "lucide-react";
import { useQuote } from "@/components/quote-provider";
import { Button } from "@/components/ui/button";

export function AddToQuoteButton({
  product,
}: {
  product: { id: string; name: string; sku: string | null; price: number; image: string | null };
}) {
  const { addItem } = useQuote();

  return (
    <Button
      size="lg"
      className="w-full"
      onClick={() => addItem({ ...product, qty: 1 })}
    >
      <ShoppingCart className="h-4 w-4" /> Añadir al pedido
    </Button>
  );
}