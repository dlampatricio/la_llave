"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { QuoteItem } from "@/lib/quote";
import { useToast } from "@/components/toast-provider";

type QuoteContextValue = {
  items: QuoteItem[];
  count: number;
  total: number;
  isOpen: boolean;
  openQuote: () => void;
  closeQuote: () => void;
  addItem: (item: QuoteItem) => void;
  removeItem: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clearQuote: () => void;
};

const QuoteContext = createContext<QuoteContextValue | null>(null);

const STORAGE_KEY = "la-llave-quote";

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const count = useMemo(() => items.reduce((acc, i) => acc + i.qty, 0), [items]);
  const total = useMemo(() => items.reduce((acc, i) => acc + i.price * i.qty, 0), [items]);

  function addItem(item: QuoteItem) {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + item.qty } : i));
      }
      return [...prev, item];
    });
    toast(`${item.name} añadido al pedido`, "add");
  }

  function removeItem(id: string) {
    const item = items.find((i) => i.id === id);
    setItems((prev) => prev.filter((i) => i.id !== id));
    if (item) toast(`${item.name} eliminado del pedido`, "remove");
  }

  function setQty(id: string, qty: number) {
    if (qty < 1) return;
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  }

  function clearQuote() {
    setItems([]);
  }

  return (
    <QuoteContext.Provider
      value={{
        items,
        count,
        total,
        isOpen,
        openQuote: () => setIsOpen(true),
        closeQuote: () => setIsOpen(false),
        addItem,
        removeItem,
        setQty,
        clearQuote,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
}

export function useQuote() {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error("useQuote debe usarse dentro de <QuoteProvider>");
  return ctx;
}