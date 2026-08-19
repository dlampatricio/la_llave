'use client';

import { useQuote } from '@/components/quote-provider';
import { Button } from '@/components/ui/button';
import { IconButton } from '@/components/ui/icon-button';
import { buildWhatsAppMessage, whatsappLink } from '@/lib/quote';
import { formatPrice } from '@/lib/utils';
import { Minus, Plus, Trash2, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect } from 'react';

export function QuoteDrawer() {
  const { items, total, isOpen, closeQuote, removeItem, setQty, clearQuote } = useQuote();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const message = buildWhatsAppMessage(items, total);
  const link = whatsappLink(message);

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/50" onClick={closeQuote} aria-hidden />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l bg-card shadow-2xl">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight">
            Tu pedido
          </h2>
          <IconButton onClick={closeQuote} aria-label="Cerrar">
            <X className="h-4 w-4" />
          </IconButton>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-wide">Tu pedido está vacío</p>
            <p className="text-xs text-muted-foreground">
              Agrega productos y envíanos tu pedido por WhatsApp.
            </p>
            <Button variant="outline" size="sm" onClick={closeQuote}>
              Ver productos
            </Button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y overflow-y-auto px-5">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4 py-4">
                  <div className="relative w-20 shrink-0 self-stretch overflow-hidden border bg-muted">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    )}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="line-clamp-2 text-sm font-semibold leading-snug">
                      {item.name}
                    </span>
                    <span className="mt-0.5 text-xs text-muted-foreground">
                      {formatPrice(item.price)} c/u
                    </span>
                    <div className="mt-auto flex items-center justify-between gap-3 pt-2">
                      <div className="flex items-center border">
                        <button
                          onClick={() => setQty(item.id, item.qty - 1)}
                          className="flex h-7 w-7 items-center justify-center transition-colors hover:bg-muted"
                          aria-label="Disminuir cantidad"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold">{item.qty}</span>
                        <button
                          onClick={() => setQty(item.id, item.qty + 1)}
                          className="flex h-7 w-7 items-center justify-center transition-colors hover:bg-muted"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold">
                          {formatPrice(item.price * item.qty)}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground transition-colors hover:text-destructive"
                          aria-label={`Quitar ${item.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t px-5 py-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-semibold uppercase tracking-wide">
                  Total estimado
                </span>
                <span className="font-display text-2xl font-extrabold">{formatPrice(total)}</span>
              </div>
              <p className="mb-4 text-[11px] leading-relaxed text-muted-foreground">
                Los precios pueden variar según disponibilidad. Te confirmamos el total al responder
                tu pedido.
              </p>
              <a href={link} target="_blank" rel="noopener noreferrer" className="block">
                <Button className="w-full" size="lg">
                  Enviar pedido por WhatsApp
                </Button>
              </a>
              <Button variant="ghost" size="sm" className="mt-2 w-full" onClick={clearQuote}>
                Vaciar pedido
              </Button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
