"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Moon, Search, ShoppingCart, Sun, X } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useQuote } from "@/components/quote-provider";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Productos", href: "/productos" },
  { label: "Ofertas", href: "/productos?ofertas=1" },
  { label: "Contacto", href: "/contacto" },
];

export function Navbar({ storeName }: { storeName: string }) {
  const { theme, toggleTheme } = useTheme();
  const { count, openQuote } = useQuote();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    router.push(query.trim() ? `/productos?q=${encodeURIComponent(query.trim())}` : "/productos");
  }

  const headerButton =
    "flex h-9 w-9 items-center justify-center text-muted-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-card/80 backdrop-blur-md transition-shadow",
        scrolled && "shadow-card",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="font-display text-2xl font-extrabold uppercase tracking-tight transition-colors hover:text-primary">
            {storeName}
          </span>
        </Link>

        <div className="flex min-w-0 flex-1 justify-center">
          <form onSubmit={submitSearch} className="w-full max-w-xl">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar herramientas, marcas, códigos…"
                className="w-full border bg-muted py-2 pl-4 pr-10 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring"
                aria-label="Buscar productos"
              />
              <button type="submit" aria-label="Buscar" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground">
                <Search className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>

        <nav className="hidden shrink-0 items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium uppercase tracking-wide transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={toggleTheme}
            className={headerButton}
            aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            onClick={openQuote}
            className={cn(headerButton, "relative")}
            aria-label="Ver cotización"
          >
            <ShoppingCart className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center bg-primary text-[10px] font-bold text-primary-foreground">
                {count}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileOpen((o) => !o)}
            className={cn(headerButton, "border lg:hidden")}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t bg-card pb-4 lg:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors hover:bg-muted"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}