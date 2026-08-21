"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";

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

  function handleToggle() {
    startTransition(async () => {
      await action();
      router.refresh();
    });
  }

  return (
    <span className="inline-flex items-center gap-2">
      <Switch checked={checked} onCheckedChange={handleToggle} disabled={pending} aria-label={label} />
      <span
        className={cn(
          "text-[10px] font-bold uppercase tracking-widest",
          checked ? "text-foreground" : "text-muted-foreground",
        )}
      >
        {label}
      </span>
    </span>
  );
}
