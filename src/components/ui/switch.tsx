"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type SwitchProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "value"> & {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

export function Switch({
  checked,
  onCheckedChange,
  className,
  disabled,
  ...props
}: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "relative inline-flex h-5 w-9 shrink-0 items-center border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50",
        checked ? "border-primary bg-primary" : "border-border bg-muted",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none block h-3.5 w-3.5 transition-transform duration-150",
          checked
            ? "translate-x-[18px] bg-primary-foreground"
            : "translate-x-[3px] bg-muted-foreground",
        )}
      />
    </button>
  );
}
