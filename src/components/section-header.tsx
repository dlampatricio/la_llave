import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SectionHeader({
  title,
  href,
  linkLabel = "Ver todos",
}: {
  title: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-8 flex items-end justify-between">
      <h2 className="font-display text-4xl font-black uppercase tracking-tight">{title}</h2>
      {href && (
        <Link
          href={href}
          className="flex items-center gap-1 text-sm font-semibold uppercase tracking-widest text-primary transition-colors hover:text-primary-foreground hover:underline dark:hover:text-primary-foreground"
        >
          {linkLabel} <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}