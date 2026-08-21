"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ChevronRight,
  Menu,
  Moon,
  Search,
  ShoppingCart,
  Sun,
  X,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useQuote } from "@/components/quote-provider";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Productos", href: "/productos" },
  { label: "Servicios", href: "/servicios" },
  { label: "Ofertas", href: "/productos?ofertas=1" },
  { label: "Contacto", href: "/contacto" },
];

export function Navbar({ storeName }: { storeName: string }) {
  const { theme, toggleTheme } = useTheme();
  const { count, openQuote } = useQuote();
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    const onMouseDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMobileOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onMouseDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onMouseDown);
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    router.push(query.trim() ? `/productos?q=${encodeURIComponent(query.trim())}` : "/productos");
    setMobileOpen(false);
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

        <div className="hidden min-w-0 flex-1 justify-center lg:flex">
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
          <Suspense fallback={<NavLinks activeHrefs={[]} />}>
            <NavLinksWithActive />
          </Suspense>
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-1">
          <button
            onClick={toggleTheme}
            className={cn(headerButton, "hidden lg:flex")}
            aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            onClick={openQuote}
            className={cn(headerButton, "relative")}
            aria-label="Ver pedido"
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
            className={cn(headerButton, "lg:hidden")}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          ref={menuRef}
          className="animate-menu-in border-t bg-card shadow-card-hover lg:hidden"
        >
          <div className="mx-auto max-h-[calc(100dvh-4rem)] max-w-7xl overflow-y-auto px-4 py-4 sm:px-6">
            <form onSubmit={submitSearch} className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar herramientas, marcas, códigos…"
                className="w-full border bg-muted py-3 pl-10 pr-10 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring"
                aria-label="Buscar productos"
                autoFocus
              />
              <button type="submit" aria-label="Buscar" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground">
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="-mx-4 mt-4 border-y sm:-mx-6">
              <nav className="divide-y">
                <Suspense fallback={<NavLinks activeHrefs={[]} mobile />}>
                  <NavLinksWithActive mobile />
                </Suspense>
              </nav>
              <div className="border-t">
                <button
                  onClick={toggleTheme}
                  className="flex w-full items-center justify-between gap-4 px-4 py-4 text-sm font-bold uppercase tracking-wide transition-colors hover:bg-muted sm:px-6"
                >
                  {theme === "dark" ? "Modo claro" : "Modo oscuro"}
                  {theme === "dark" ? (
                    <Sun className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Moon className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLinks({ activeHrefs, mobile = false }: { activeHrefs: string[]; mobile?: boolean }) {
  return (
    <>
      {NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            mobile
              ? "group flex items-center justify-between gap-4 px-4 py-4 text-sm font-bold uppercase tracking-wide transition-colors hover:bg-muted sm:px-6"
              : "text-sm font-medium uppercase tracking-wide transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
            activeHrefs.includes(link.href) && "text-primary",
          )}
        >
          {link.label}
          {mobile && (
            <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
          )}
        </Link>
      ))}
    </>
  );
}

function NavLinksWithActive({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeHrefs = NAV_LINKS.filter((link) => isLinkActive(link.href, pathname, searchParams)).map(
    (link) => link.href,
  );

  return <NavLinks activeHrefs={activeHrefs} mobile={mobile} />;
}

function isLinkActive(href: string, pathname: string, searchParams: URLSearchParams) {
  if (href === "/productos?ofertas=1") {
    return pathname === "/productos" && searchParams.get("ofertas") === "1";
  }
  if (href === "/productos") {
    return (
      (pathname === "/productos" && searchParams.get("ofertas") !== "1") ||
      pathname.startsWith("/productos/")
    );
  }
  if (href === "/servicios") return pathname.startsWith("/servicios");
  if (href === "/contacto") return pathname.startsWith("/contacto");
  return pathname === href;
}