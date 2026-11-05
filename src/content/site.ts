/**
 * Zentrale Marken- & Kontakteinstellungen.
 * Alles, was hier als `null` steht, wird auf der Website NICHT angezeigt,
 * bis echte Angaben eingetragen sind. Bitte keine Fantasiewerte eintragen.
 */
export const site = {
  name: "SCALEEVERYTHING",
  tagline: "Digital Experiences. Intelligent Growth.",
  description:
    "SCALEEVERYTHING ist eine unabhängige Digitalagentur von Finn Ocker: E-Commerce & Shopify, Webdesign, Social Media, Mediengestaltung und sinnvolle KI-Automatisierung für Marken mit Ambitionen.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "de_DE",
  founder: "Finn Ocker",
  /** Öffentliche Kontakt-E-Mail (optional). Wird im Footer als mailto-Link gezeigt. */
  contactEmail: null as string | null,
  /** Nur echte Profile eintragen – leere Liste = keine Social-Links. */
  socials: [] as { label: string; href: string }[],
} as const;

export const navigation = [
  { label: "Start", href: "#start" },
  { label: "Leistungen", href: "#leistungen" },
  { label: "Projekte", href: "#projekte" },
  { label: "Über Finn", href: "#ueber-finn" },
  { label: "Kontakt", href: "#kontakt" },
] as const;

export const microcopy = {
  standOut: "Built to stand out. Designed to scale.",
  future: "The future doesn't scale itself.",
} as const;
