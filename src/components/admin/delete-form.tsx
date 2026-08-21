"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { IconButton } from "@/components/ui/icon-button";

type DeleteFormProps = {
  action: () => Promise<void>;
  label: string;
  entity?: string;
};

export function DeleteForm({ action, label, entity = "elemento" }: DeleteFormProps) {
  const [confirming, setConfirming] = useState(false);
  const [pending, setPending] = useState(false);

  function close() {
    if (!pending) setConfirming(false);
  }

  async function handleConfirm() {
    setPending(true);
    try {
      await action();
      setConfirming(false);
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <IconButton
        variant="destructive"
        aria-label={`Eliminar ${label}`}
        onClick={() => setConfirming(true)}
      >
        <Trash2 className="h-4 w-4" />
      </IconButton>

      <Dialog
        open={confirming}
        onClose={close}
        title={`Eliminar ${entity}`}
        description={`Vas a eliminar "${label}". Esta acción no se puede deshacer.`}
        destructive
        footer={
          <>
            <Button variant="ghost" onClick={close} disabled={pending}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleConfirm} disabled={pending}>
              {pending ? "Eliminando…" : "Sí, eliminar"}
            </Button>
          </>
        }
      />
    </>
  );
}
