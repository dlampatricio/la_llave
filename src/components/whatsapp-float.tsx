"use client";

import { MessageCircle } from "lucide-react";
import { useQuote } from "@/components/quote-provider";
import { whatsappLink } from "@/lib/quote";

export function WhatsAppFloat({ number }: { number: string }) {
  const { items, total } = useQuote();

  if (!number) return null;

  const message =
    items.length > 0
      ? `Hola La Llave, quiero cotizar los productos que tengo en mi lista: ${items
          .map((i) => `${i.name} x${i.qty}`)
          .join(", ")}. Total estimado: $${total.toFixed(2)}.`
      : "Hola La Llave, quiero hacer una cotización.";

  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-110"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="h-7 w-7" strokeWidth={2} />
    </a>
  );
}