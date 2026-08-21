import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
};

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center gap-1.5 px-6 py-14 text-center", className)}>
      <span className="mb-3 flex h-12 w-12 items-center justify-center border bg-muted">
        <Icon className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
      </span>
      <p className="font-display text-lg font-extrabold uppercase tracking-tight">{title}</p>
      {description && (
        <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
