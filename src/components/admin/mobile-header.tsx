"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { MobileNav } from "@/components/admin/mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";

export function AdminMobileHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-card/80 backdrop-blur-md transition-shadow lg:hidden",
        scrolled && "shadow-card",
      )}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <MobileNav />
          <Link href="/admin" className="flex items-center gap-2.5">
            <span className="font-display text-lg font-extrabold uppercase tracking-tight">
              La Llave
            </span>
          </Link>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <ThemeToggle />
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
          >
            Ver tienda <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </header>
  );
}
