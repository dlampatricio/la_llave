"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ExternalLink, Menu } from "lucide-react";
import { Drawer } from "@/components/ui/drawer";
import { AdminNav } from "@/components/admin/admin-nav";

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const query = window.matchMedia("(min-width: 1024px)");
    function handleChange(e: MediaQueryListEvent) {
      if (e.matches) setOpen(false);
    }
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-label="Abrir menú de navegación"
        className="inline-flex h-9 w-9 shrink-0 items-center justify-center transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <Menu className="h-4 w-4" aria-hidden="true" />
      </button>

      <Drawer open={open} onClose={() => setOpen(false)} title="Navegación">
        <AdminNav />
        <div className="mt-5 space-y-2 border-t pt-3">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" /> Ver tienda
          </Link>
          <p className="px-3 text-xs text-muted-foreground">Modo demo · datos de prueba</p>
        </div>
      </Drawer>
    </>
  );
}
