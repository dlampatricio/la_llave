import { MessageCircle, PackageCheck, RefreshCcw, Truck } from "lucide-react";

const ITEMS = [
  {
    icon: Truck,
    title: "Envío gratis",
    desc: "En pedidos mayores a $75",
  },
  {
    icon: RefreshCcw,
    title: "Devoluciones 90 días",
    desc: "Sin complicaciones",
  },
  {
    icon: MessageCircle,
    title: "Asesoría experta",
    desc: "Lun–Sáb 7am–7pm",
  },
  {
    icon: PackageCheck,
    title: "Stock garantizado",
    desc: "Material para obra",
  },
];

export function TrustStrip() {
  return (
    <section className="bg-card">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:gap-6">
        {ITEMS.map((item) => (
          <div key={item.title} className="flex flex-col items-center gap-3 text-center">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center border-2 border-primary/20 bg-primary/10">
              <item.icon className="h-6 w-6 text-primary" strokeWidth={2} />
            </div>
            <div>
              <div className="font-display text-lg font-extrabold uppercase tracking-tight">
                {item.title}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}