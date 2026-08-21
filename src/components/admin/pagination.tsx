import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

function buildWindow(page: number, totalPages: number): (number | "ellipsis")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages = new Set<number>([1, totalPages, page - 1, page, page + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b);

  const result: (number | "ellipsis")[] = [];
  let previous = 0;
  for (const p of sorted) {
    if (previous && p - previous > 1) result.push("ellipsis");
    result.push(p);
    previous = p;
  }
  return result;
}

type PaginationProps = {
  page: number;
  totalPages: number;
  hrefForPage: (page: number) => string;
  className?: string;
};

export function Pagination({ page, totalPages, hrefForPage, className }: PaginationProps) {
  if (totalPages <= 1) return null;

  const linkClasses = (isCurrent: boolean) =>
    cn(
      "flex h-9 min-w-9 items-center justify-center border px-2 text-sm font-semibold transition-colors",
      isCurrent
        ? "border-primary bg-primary text-primary-foreground"
        : "text-muted-foreground hover:bg-muted hover:text-foreground",
    );

  return (
    <nav
      aria-label="Paginación"
      className={cn("mt-6 flex items-center justify-center gap-1.5", className)}
    >
      {page > 1 ? (
        <Link href={hrefForPage(page - 1)} aria-label="Página anterior" className={linkClasses(false)}>
          <ChevronLeft className="h-4 w-4" />
        </Link>
      ) : (
        <span className="flex h-9 min-w-9 items-center justify-center border border-border/50 px-2 text-muted-foreground/40">
          <ChevronLeft className="h-4 w-4" />
        </span>
      )}

      {buildWindow(page, totalPages).map((item, i) =>
        item === "ellipsis" ? (
          <span key={`ellipsis-${i}`} className="px-1 text-sm text-muted-foreground">
            …
          </span>
        ) : (
          <Link
            key={item}
            href={hrefForPage(item)}
            aria-current={item === page ? "page" : undefined}
            aria-label={`Página ${item}`}
            className={linkClasses(item === page)}
          >
            {item}
          </Link>
        ),
      )}

      {page < totalPages ? (
        <Link href={hrefForPage(page + 1)} aria-label="Página siguiente" className={linkClasses(false)}>
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <span className="flex h-9 min-w-9 items-center justify-center border border-border/50 px-2 text-muted-foreground/40">
          <ChevronRight className="h-4 w-4" />
        </span>
      )}
    </nav>
  );
}
