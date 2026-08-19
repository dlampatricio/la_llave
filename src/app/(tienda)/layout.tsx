import { getSettings } from "@/lib/settings";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { QuoteDrawer } from "@/components/quote-drawer";
import { WhatsAppFloat } from "@/components/whatsapp-float";

export default async function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar storeName={settings.storeName} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
      <QuoteDrawer />
      <WhatsAppFloat number={settings.whatsappNumber} />
    </div>
  );
}