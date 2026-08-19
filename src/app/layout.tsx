import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { QuoteProvider } from "@/components/quote-provider";
import { ToastProvider } from "@/components/toast-provider";

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
    "Ferretería La Llave: herramientas eléctricas y manuales, plomería, electricidad, tornillería y más. Haz tu pedido por WhatsApp.",
  keywords: ["ferretería", "herramientas", "taladros", "materiales", "tornillería", "La Llave"],
  openGraph: {
    title: "La Llave Ferretería — Herramientas, Materiales y Ofertas",
    description: "Herramientas, materiales y ofertas. Haz tu pedido por WhatsApp.",
    url: "https://lallaveferreteria.vercel.app",
    siteName: "La Llave Ferretería",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1731,
        height: 909,
        alt: "La Llave Ferretería — Herramientas, Materiales y Ofertas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "La Llave Ferretería — Herramientas, Materiales y Ofertas",
    description: "Herramientas, materiales y ofertas. Haz tu pedido por WhatsApp.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://lallaveferreteria.vercel.app"),
};

const THEME_SCRIPT = `(function () {
  try {
    var stored = localStorage.getItem("theme");
    var dark = stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches);
    if (dark) document.documentElement.classList.add("dark");
  } catch (e) {}
})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className={`${inter.variable} ${barlow.variable} font-sans antialiased`}>
        <ThemeProvider>
          <ToastProvider>
            <QuoteProvider>{children}</QuoteProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}