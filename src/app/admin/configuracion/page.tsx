import { getSettings } from "@/lib/settings";
import { SettingsForm } from "@/components/admin/settings-form";
import { PageHeader } from "@/components/admin/page-header";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <div className="max-w-5xl">
      <PageHeader
        title="Contenido de la web"
        description="Todo lo que edites aquí se publica de inmediato en la página pública."
      />

      <SettingsForm settings={settings} />
    </div>
  );
}
