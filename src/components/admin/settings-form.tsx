"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { saveSiteSettings } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { FieldError, Input, Label, Textarea } from "@/components/ui/form";
import type { SiteSettings } from "@/lib/settings";

const optionalUrl = z
  .string()
  .trim()
  .refine((v) => v === "" || /^https?:\/\/\S+$/.test(v), "Ingresa una URL válida (https://…)");

const settingsSchema = z.object({
  storeName: z.string().trim().min(1, "El nombre de la tienda es obligatorio"),
  heroBadge: z.string(),
  heroTitleLine1: z.string(),
  heroTitleHighlight: z.string(),
  heroTitleLine2: z.string(),
  heroSubtitle: z.string(),
  heroCtaPrimary: z.string(),
  heroCtaSecondary: z.string(),
  heroImage: z
    .string()
    .trim()
    .refine(
      (v) => v === "" || v.startsWith("/") || /^https?:\/\/\S+$/.test(v),
      "Ingresa una URL (https://…) o una ruta interna (/…)",
    ),
  promoTitle: z.string(),
  promoSubtitle: z.string(),
  promoCta: z.string(),
  footerDescription: z.string(),
  whatsappNumber: z
    .string()
    .trim()
    .refine(
      (v) => v === "" || /^\d+$/.test(v),
      "Solo dígitos con código de país. Ej: 5215512345678",
    ),
  contactAddressLine1: z.string(),
  contactAddressLine2: z.string(),
  contactEmail: z
    .string()
    .trim()
    .refine((v) => v === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), "Ingresa un correo válido"),
  contactPhone: z.string(),
  hoursWeekdays: z.string(),
  hoursSaturday: z.string(),
  hoursSunday: z.string(),
  facebookUrl: optionalUrl,
  instagramUrl: optionalUrl,
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

const SECTIONS: {
  title: string;
  fields: {
    key: keyof SiteSettings;
    label: string;
    hint?: string;
    multiline?: boolean;
    wide?: boolean;
  }[];
}[] = [
  {
    title: "Mensaje principal (portada)",
    fields: [
      { key: "heroBadge", label: "Etiqueta superior" },
      { key: "heroTitleLine1", label: "Título — línea 1" },
      { key: "heroTitleHighlight", label: "Título — línea 2 (resaltada en amarillo)" },
      { key: "heroTitleLine2", label: "Título — línea 3" },
      { key: "heroSubtitle", label: "Subtítulo", multiline: true, wide: true },
      { key: "heroCtaPrimary", label: "Botón principal" },
      { key: "heroCtaSecondary", label: "Botón secundario" },
      { key: "heroImage", label: "URL de la imagen de fondo", wide: true },
    ],
  },
  {
    title: "Banner de promoción (antes del footer)",
    fields: [
      { key: "promoTitle", label: "Título" },
      { key: "promoCta", label: "Texto del botón" },
      { key: "promoSubtitle", label: "Subtítulo", multiline: true, wide: true },
    ],
  },
  {
    title: "Ferretería",
    fields: [
      { key: "storeName", label: "Nombre de la tienda" },
      {
        key: "whatsappNumber",
        label: "Número de WhatsApp",
        hint: "Solo dígitos con código de país. Ej: 5215512345678. Sin él, los botones de WhatsApp no funcionan.",
      },
      { key: "footerDescription", label: "Descripción del pie de página", multiline: true, wide: true },
    ],
  },
  {
    title: "Datos de contacto (página Contacto)",
    fields: [
      { key: "contactAddressLine1", label: "Dirección — línea 1" },
      { key: "contactAddressLine2", label: "Dirección — línea 2 (ciudad, CP)" },
      { key: "contactEmail", label: "Correo electrónico" },
      { key: "contactPhone", label: "Teléfono visible" },
      { key: "hoursWeekdays", label: "Horario — lunes a viernes" },
      { key: "hoursSaturday", label: "Horario — sábado" },
      { key: "hoursSunday", label: "Horario — domingo" },
    ],
  },
  {
    title: "Redes sociales (pie de página)",
    fields: [
      { key: "facebookUrl", label: "URL de Facebook", hint: "Déjalo vacío para ocultar el ícono." },
      { key: "instagramUrl", label: "URL de Instagram", hint: "Déjalo vacío para ocultar el ícono." },
    ],
  },
];

export function SettingsForm({ settings }: { settings: SiteSettings }) {
  const router = useRouter();
  const [saved, setSaved] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: settings,
    mode: "onBlur",
  });

  const heroImage = watch("heroImage");

  async function onSubmit(values: SettingsFormValues) {
    await saveSiteSettings(values);
    setSaved(true);
    router.refresh();
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid max-w-5xl gap-6">
      {SECTIONS.map((section) => (
        <section key={section.title} className="border bg-card p-5 shadow-card">
          <h2 className="font-display mb-4 text-xl font-extrabold uppercase tracking-tight sm:text-2xl">
            {section.title}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {section.fields.map((field) => (
              <div key={field.key} className={field.wide ? "sm:col-span-2" : ""}>
                <Label htmlFor={`setting-${field.key}`}>{field.label}</Label>
                {field.multiline ? (
                  <Textarea
                    id={`setting-${field.key}`}
                    rows={3}
                    {...register(field.key)}
                    aria-invalid={Boolean(errors[field.key])}
                  />
                ) : (
                  <Input
                    id={`setting-${field.key}`}
                    {...register(field.key)}
                    aria-invalid={Boolean(errors[field.key])}
                  />
                )}
                {field.hint && !errors[field.key] && (
                  <p className="mt-1 text-xs text-muted-foreground">{field.hint}</p>
                )}
                <FieldError message={errors[field.key]?.message} />
                {field.key === "heroImage" && heroImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={heroImage}
                    alt="Vista previa de la imagen del hero"
                    className="mt-2 h-24 w-40 border object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        </section>
      ))}

      <div className="flex items-center gap-3 border bg-card p-4 shadow-card-hover">
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Guardando…" : "Guardar cambios"}
        </Button>
        {saved && (
          <span className="flex items-center gap-1.5 text-sm font-semibold text-success">
            <Check className="h-4 w-4" /> ¡Cambios publicados!
          </span>
        )}
        {!saved && isDirty && !isSubmitting && (
          <span className="text-sm text-muted-foreground">Tienes cambios sin guardar.</span>
        )}
      </div>
    </form>
  );
}
