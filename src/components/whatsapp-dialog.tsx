"use client";

import { useEffect, useRef } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";

export function WhatsAppDialog({ href, onClose }: { href: string; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  let preview = "";
  try {
    preview = new URL(href).searchParams.get("text") ?? "";
  } catch {
    preview = "";
  }

  function openWhatsApp() {
    window.open(href, "_blank", "noopener,noreferrer");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Abrir WhatsApp"
        tabIndex={-1}
        className="animate-toast-in relative w-full max-w-md border bg-card shadow-card-hover outline-none"
      >
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h2 className="font-display flex items-center gap-2 text-xl font-extrabold uppercase tracking-tight">
            <MessageCircle className="h-5 w-5 text-primary" /> Abrir WhatsApp
          </h2>
          <IconButton onClick={onClose} aria-label="Cerrar">
            <X className="h-4 w-4" />
          </IconButton>
        </div>

        <div className="px-5 py-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Se abrirá WhatsApp en una pestaña nueva con este mensaje listo para enviar:
          </p>
          <div className="mt-3 max-h-40 overflow-y-auto whitespace-pre-line border bg-muted px-3 py-2.5 text-sm leading-relaxed">
            {preview}
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t px-5 py-4">
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={openWhatsApp}>
            <MessageCircle className="h-4 w-4" /> Abrir WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
}