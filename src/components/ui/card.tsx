import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeTone = "oferta" | "nuevo" | "destacado" | "neutral";

const toneClasses: Record<BadgeTone, string> = {
  oferta: "bg-destructive text-destructive-foreground",
  nuevo: "bg-success text-success-foreground",
  destacado: "bg-primary text-primary-foreground",
  neutral: "bg-primary/15 text-foreground",
};

export function Badge({
  tone = "neutral",
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { tone?: BadgeTone }) {
  return (
    <div
      className={cn(
        "inline-flex items-center px-2 py-1 text-[10px] font-bold uppercase tracking-widest",
        toneClasses[tone],
        className,
      )}
      {...props}
    />
  );
}

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "border bg-card text-card-foreground shadow-card",
        className,
      )}
      {...props}
    />
  );
}