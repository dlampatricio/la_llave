import * as React from "react";
import { cn } from "@/lib/utils";

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "destructive";
};

const variantClasses = {
  default: "text-muted-foreground hover:text-foreground hover:bg-muted",
  destructive: "text-destructive hover:bg-destructive/10",
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
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center border transition-colors focus-visible:outline-2 focus-visible:outline-ring",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}