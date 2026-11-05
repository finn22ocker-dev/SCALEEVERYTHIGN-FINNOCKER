import type { Metadata, Viewport } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const display = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const sans = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "SCALEEVERYTHING – Digitalagentur für Web, E-Commerce & KI-Automatisierung",
    template: "%s – SCALEEVERYTHING",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.founder }],
  creator: site.founder,
  keywords: [
    "Digitalagentur",
    "Shopify Agentur",
    "Webdesign",
    "E-Commerce",
    "Social Media",
    "Mediengestaltung",
    "KI-Automatisierung",
    "Finn Ocker",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: "/",
    siteName: site.name,
    title: "SCALEEVERYTHING – Digital Experiences. Intelligent Growth.",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "SCALEEVERYTHING – Digital Experiences. Intelligent Growth.",
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#101012",
  colorScheme: "dark",
};

/** Wiederkehrende Besucher überspringen das Intro – läuft vor dem ersten Paint. */
const introScript = `try{if(sessionStorage.getItem("se-intro")){document.documentElement.dataset.intro="skip"}else{sessionStorage.setItem("se-intro","1")}}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body className="grain min-h-dvh antialiased">
        <a
          href="#main"
          className="fixed left-4 top-4 z-[100] -translate-y-24 bg-lime px-4 py-3 font-display text-sm font-semibold text-obsidian transition-transform focus:translate-y-0"
        >
          Zum Inhalt springen
        </a>
        {children}
      </body>
    </html>
  );
}
