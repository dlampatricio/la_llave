"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Settings,
  Tags,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";

const DASHBOARD_ITEM = { label: "Dashboard", href: "/admin", icon: LayoutDashboard };

const GROUPS = [
  {
    label: "Catálogo",
    items: [
      { label: "Productos", href: "/admin/productos", icon: Package },
      { label: "Categorías", href: "/admin/categorias", icon: Tags },
    ],
  },
  {
    label: "Servicios",
    items: [
      { label: "Servicios", href: "/admin/servicios", icon: Wrench },
      { label: "Categorías de servicios", href: "/admin/servicios-categorias", icon: Tags },
    ],
  },
  {
    label: "Sitio",
    items: [
      { label: "Contenido de la web", href: "/admin/configuracion", icon: Settings },
    ],
  },
];

function isActive(href: string, pathname: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminNav({ variant = "sidebar" }: { variant?: "sidebar" | "mobile" }) {
  const pathname = usePathname();

  if (variant === "mobile") {
    const items = [DASHBOARD_ITEM, ...GROUPS.flatMap((g) => g.items)];
    return (
      <div className="flex items-center gap-1.5 overflow-x-auto px-3 pb-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex shrink-0 items-center gap-1.5 whitespace-nowrap border px-3 py-1.5 text-xs font-bold uppercase tracking-wide transition-colors",
              isActive(item.href, pathname)
                ? "border-primary bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted",
            )}
          >
            <item.icon className="h-3.5 w-3.5" /> {item.label}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <nav>
      <ul className="space-y-1">
        <li>
          <Link
            href={DASHBOARD_ITEM.href}
            className={cn(
              "flex items-center gap-3 rounded px-3 py-2.5 text-sm font-semibold uppercase tracking-wide transition-colors hover:bg-muted",
              isActive(DASHBOARD_ITEM.href, pathname) && "bg-muted text-primary",
            )}
          >
            <DASHBOARD_ITEM.icon className="h-4 w-4" /> {DASHBOARD_ITEM.label}
          </Link>
        </li>
      </ul>

      {GROUPS.map((group) => (
        <div key={group.label} className="mt-5">
          <div className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            {group.label}
          </div>
          <ul className="space-y-1">
            {group.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded px-3 py-2.5 text-sm font-semibold uppercase tracking-wide transition-colors hover:bg-muted",
                    isActive(item.href, pathname) && "bg-muted text-primary",
                  )}
                >
                  <item.icon className="h-4 w-4" /> {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}