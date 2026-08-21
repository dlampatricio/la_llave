export type QuoteItem = {
  id: string;
  name: string;
  sku?: string | null;
  price: number;
  image?: string | null;
  qty: number;
};

export function buildWhatsAppMessage(
  items: QuoteItem[],
  total: number,
  storeName = "La Llave Ferretería",
) {
  const lines = [
    `Hola ${storeName}, quiero pedir los siguientes productos:`,
    "",
    ...items.map(
      (i) =>
        `• ${i.name}${i.sku ? ` (${i.sku})` : ""} — ${i.qty} x $${i.price.toFixed(2)} = $${(i.price * i.qty).toFixed(2)}`,
    ),
    "",
    `Total estimado: $${total.toFixed(2)}`,
  ];
  return lines.join("\n");
}

export function whatsappLink(message: string, number?: string) {
  const resolved = number ?? process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  return `https://wa.me/${resolved ?? ""}?text=${encodeURIComponent(message)}`;
}

export function buildServiceWhatsAppMessage(
  serviceName: string,
  categoryName?: string,
  storeName = "La Llave",
) {
  const lines = [
    `Hola ${storeName}, me interesa el servicio de "${serviceName}".`,
  ];
  if (categoryName) lines.push(`Categoría: ${categoryName}`);
  lines.push("¿Me pueden dar más información?");
  return lines.join("\n");
}