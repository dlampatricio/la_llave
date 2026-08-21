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

export function AdminNav() {
  const pathname = usePathname();

  const linkClasses = (active: boolean) =>
    cn(
      "flex items-center gap-3 px-3 py-2.5 text-sm font-semibold uppercase tracking-wide transition-colors",
      active
        ? "bg-muted text-foreground shadow-[inset_2px_0_0_0_var(--primary)]"
        : "text-muted-foreground hover:bg-muted hover:text-foreground",
    );

  return (
    <nav aria-label="Navegación del panel">
      <ul className="space-y-1">
        <li>
          <Link
            href={DASHBOARD_ITEM.href}
            aria-current={isActive(DASHBOARD_ITEM.href, pathname) ? "page" : undefined}
            className={linkClasses(isActive(DASHBOARD_ITEM.href, pathname))}
          >
            <DASHBOARD_ITEM.icon className="h-4 w-4 shrink-0" aria-hidden="true" />{" "}
            {DASHBOARD_ITEM.label}
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
                  aria-current={isActive(item.href, pathname) ? "page" : undefined}
                  className={linkClasses(isActive(item.href, pathname))}
                >
                  <item.icon className="h-4 w-4 shrink-0" aria-hidden="true" /> {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
