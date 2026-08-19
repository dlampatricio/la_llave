"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

export function ToggleField({
  label,
  checked,
  action,
}: {
  label: string;
  checked: boolean;
  action: () => Promise<void>;
}) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handleClick() {
    startTransition(async () => {
      await action();
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      className={`border px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest transition-colors disabled:opacity-50 ${
        checked ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
      }`}
    >
      {label}
    </button>
  );
}