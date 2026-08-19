import { getSettings } from "@/lib/settings";
import { SettingsForm } from "@/components/admin/settings-form";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-black uppercase tracking-tight">
          Contenido de la web
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Todo lo que edites aquí se publica de inmediato en la página pública.
        </p>
      </div>

      <SettingsForm settings={settings} />
    </div>
  );
}