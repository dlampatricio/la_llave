import { MessageCircle } from "lucide-react";
import type { SiteSettings } from "@/lib/settings";
import { whatsappLink } from "@/lib/quote";

export function PromoBanner({ settings }: { settings: SiteSettings }) {
  const message = `Hola ${settings.storeName}, me interesa la cuenta profesional. ¿Me pueden dar más información?`;
  const href = whatsappLink(message);

  return (
    <section className="mx-4 mb-16 sm:mx-6 lg:mx-auto lg:max-w-7xl">
      <div className="flex flex-col items-center justify-between gap-6 bg-primary px-8 py-8 sm:flex-row">
        <div>
          <div className="font-display text-4xl font-black uppercase leading-none tracking-tight text-primary-foreground">
            {settings.promoTitle}
          </div>
          <p className="mt-1 text-sm font-medium text-primary-foreground/80">
            {settings.promoSubtitle}
          </p>
        </div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex shrink-0 items-center gap-2 border-2 border-primary-foreground px-8 py-3 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary-foreground hover:text-primary"
        >
          <MessageCircle className="h-4 w-4" /> {settings.promoCta}
        </a>
      </div>
    </section>
  );
}