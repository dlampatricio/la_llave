"use client";

import { Trash2 } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";

export function DeleteForm({ action, label }: { action: () => Promise<void>; label: string }) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!window.confirm(`¿Seguro que quieres eliminar "${label}"? Esta acción no se puede deshacer.`)) {
          e.preventDefault();
        }
      }}
    >
      <IconButton type="submit" variant="destructive" aria-label={`Eliminar ${label}`}>
        <Trash2 className="h-4 w-4" />
      </IconButton>
    </form>
  );
}