import * as React from "react";
import { cn } from "@/lib/utils";

type IconButtonVariant = "default" | "destructive";

const variantClasses: Record<IconButtonVariant, string> = {
  default: "text-muted-foreground hover:text-foreground hover:bg-muted",
  destructive: "text-destructive hover:bg-destructive/10",
};

export function iconButtonVariants({
  variant = "default",
  className,
}: {
  variant?: IconButtonVariant;
  className?: string;
} = {}) {
  return cn(
    "inline-flex h-8 w-8 shrink-0 items-center justify-center border transition-colors focus-visible:outline-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50",
    variantClasses[variant],
    className,
  );
}

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: IconButtonVariant;
};

export function IconButton({
  variant = "default",
  className,
  type = "button",
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      className={iconButtonVariants({ variant, className })}
      {...props}
    />
  );
}
