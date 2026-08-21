import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Miniatura de imagen para listas del admin. Centraliza el uso de <img>
 * (las URLs son arbitrarias ingresadas por el usuario, next/image exigiría
 * una allowlist de dominios).
 */
export function Thumb({
  src,
  alt = "",
  className,
}: {
  src?: string;
  alt?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden border bg-muted",
        className,
      )}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" />
      ) : (
        <ImageOff className="h-4 w-4 text-muted-foreground/60" aria-hidden="true" />
      )}
    </span>
  );
}
