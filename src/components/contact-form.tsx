"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/quote";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/form";

export function ContactForm({ number, storeName }: { number: string; storeName: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const lines = [`Hola ${storeName}, soy ${name}.`, `Mi teléfono es ${phone}.`, "", message];
    window.open(whatsappLink(lines.join("\n"), number), "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="contact-name">Nombre completo</Label>
          <Input
            id="contact-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Juan Pérez"
            required
          />
        </div>
        <div>
          <Label htmlFor="contact-phone">Teléfono</Label>
          <Input
            id="contact-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="55 1234 5678"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="contact-message">Mensaje</Label>
        <Textarea
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Cuéntanos qué necesitas: productos, medidas, cantidades, presupuesto…"
          required
        />
      </div>

      <Button type="submit" size="lg">
        <MessageCircle className="h-4 w-4" /> Enviar por WhatsApp
      </Button>
      <p className="text-xs text-muted-foreground">
        Al enviar se abrirá WhatsApp con tu mensaje listo. Respondemos en horario de tienda.
      </p>
    </form>
  );
}