import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "ghost" | "destructive" | "secondary";
  size?: "sm" | "md" | "lg";
};

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-primary text-primary-foreground font-bold uppercase tracking-widest hover:brightness-110 active:brightness-95",
  secondary:
    "bg-secondary text-secondary-foreground font-semibold uppercase tracking-widest hover:brightness-95 active:brightness-90",
  outline:
    "border-2 border-foreground/70 text-foreground font-bold uppercase tracking-widest hover:bg-foreground hover:text-background",
  ghost: "text-foreground font-semibold hover:bg-muted active:bg-secondary",
  destructive:
    "bg-destructive text-destructive-foreground font-bold uppercase tracking-widest hover:brightness-110 active:brightness-95",
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-8 py-3 text-sm",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 transition-all disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
}