"use client";

import { useState, type ReactNode } from "react";
import { WhatsAppDialog } from "@/components/whatsapp-dialog";

export function WhatsAppLink({
  href,
  className,
  children,
  ariaLabel,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
        className={className}
        aria-label={ariaLabel}
      >
        {children}
      </a>
      {open && <WhatsAppDialog href={href} onClose={() => setOpen(false)} />}
    </>
  );
}