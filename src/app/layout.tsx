import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { QuoteProvider } from "@/components/quote-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "La Llave Ferretería — Herramientas, Materiales y Ofertas",
    template: "%s | La Llave Ferretería",
  },
  description:
    "Ferretería La Llave: herramientas eléctricas y manuales, plomería, electricidad, tornillería y más. Pide tu cotización por WhatsApp.",
  keywords: ["ferretería", "herramientas", "taladros", "materiales", "tornillería", "La Llave"],
  openGraph: {
    title: "La Llave Ferretería",
    description: "Herramientas, materiales y ofertas. Cotiza por WhatsApp.",
    locale: "es_MX",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} ${barlow.variable} font-sans antialiased`}>
        <ThemeProvider>
          <QuoteProvider>{children}</QuoteProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}