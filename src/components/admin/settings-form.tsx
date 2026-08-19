"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveSiteSettings } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/form";
import type { SiteSettings } from "@/lib/settings";

export function SettingsForm({ settings }: { settings: SiteSettings }) {
  const router = useRouter();
  const [values, setValues] = useState(settings);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function update(key: keyof SiteSettings, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await saveSiteSettings(values);
    setSaving(false);
    setSaved(true);
    router.refresh();
    setTimeout(() => setSaved(false), 3000);
  }

  const sections: { title: string; fields: { key: keyof SiteSettings; label: string; hint?: string; multiline?: boolean }[] }[] = [
    {
      title: "Mensaje principal (portada)",
      fields: [
        { key: "heroBadge", label: "Etiqueta superior" },
        { key: "heroTitleLine1", label: "Título — línea 1" },
        { key: "heroTitleHighlight", label: "Título — línea 2 (resaltada en amarillo)" },
        { key: "heroTitleLine2", label: "Título — línea 3" },
        { key: "heroSubtitle", label: "Subtítulo", multiline: true },
        { key: "heroCtaPrimary", label: "Botón principal" },
        { key: "heroCtaSecondary", label: "Botón secundario" },
        { key: "heroImage", label: "URL de la imagen de fondo" },
      ],
    },
    {
      title: "Banner de promoción (antes del footer)",
      fields: [
        { key: "promoTitle", label: "Título" },
        { key: "promoSubtitle", label: "Subtítulo", multiline: true },
        { key: "promoCta", label: "Texto del botón" },
      ],
    },
    {
      title: "Ferretería",
      fields: [
        { key: "storeName", label: "Nombre de la tienda" },
        { key: "footerDescription", label: "Descripción del pie de página", multiline: true },
        {
          key: "whatsappNumber",
          label: "Número de WhatsApp (solo dígitos con código de país)",
          hint: "Ejemplo: 5215512345678. Sin él, los botones de WhatsApp no funcionan.",
        },
      ],
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="grid max-w-5xl gap-6">
      {sections.map((section) => (
        <section key={section.title} className="border bg-card p-5">
          <h2 className="font-display mb-4 text-2xl font-extrabold uppercase tracking-tight">
            {section.title}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {section.fields.map((field) => (
              <div key={field.key} className={field.multiline ? "sm:col-span-2" : ""}>
                <Label htmlFor={`setting-${field.key}`}>{field.label}</Label>
                {field.multiline ? (
                  <Textarea
                    id={`setting-${field.key}`}
                    rows={3}
                    value={values[field.key]}
                    onChange={(e) => update(field.key, e.target.value)}
                  />
                ) : (
                  <Input
                    id={`setting-${field.key}`}
                    value={values[field.key]}
                    onChange={(e) => update(field.key, e.target.value)}
                  />
                )}
                {field.hint && <p className="mt-1 text-xs text-muted-foreground">{field.hint}</p>}
              </div>
            ))}
          </div>
        </section>
      ))}

      <div className="flex items-center gap-4">
        <Button type="submit" size="lg" disabled={saving}>
          {saving ? "Guardando…" : "Guardar cambios"}
        </Button>
        {saved && <span className="text-sm font-semibold text-success">¡Cambios publicados!</span>}
      </div>
    </form>
  );
}