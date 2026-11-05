export type ServiceId = "ecommerce" | "social" | "web" | "media" | "ai";

export type Service = {
  id: ServiceId;
  number: string;
  title: string;
  /** Kurze Zeile in der Übersicht */
  teaser: string;
  /** Kundenzentrierter Absatz im aufgeklappten Detail */
  description: string;
  deliverables: string[];
  /** Englische Editorial-Zeile für die Hover-Vorschau */
  statement: string;
};

export const services: Service[] = [
  {
    id: "ecommerce",
    number: "01",
    title: "E-Commerce & Shopify",
    teaser: "Shops, die verkaufen – nicht nur gut aussehen.",
    description:
      "Ob neuer Shop oder bestehender Store: Ich denke von der Produktseite bis zum Checkout wie ein Kunde und wie ein Händler. Klare Navigation, überzeugende Produktdarstellung und schnelle Ladezeiten schaffen die Grundlage, damit aus Besuchern Käufer werden.",
    deliverables: [
      "Shop-Erstellung",
      "Redesign",
      "UX / CRO",
      "Produktseiten",
      "Performance",
      "Shop-Optimierung",
    ],
    statement: "Commerce with conviction.",
  },
  {
    id: "social",
    number: "02",
    title: "Social Media & Performance",
    teaser: "Content mit Haltung. Kampagnen mit Ziel.",
    description:
      "Sichtbarkeit entsteht durch Konsistenz und Ideen, die hängen bleiben. Ich entwickle Content, Creatives und Kampagnen, die zu deiner Marke passen – von Reels und KI-gestützten Videos bis zu bezahlten Anzeigen mit klaren Zielen.",
    deliverables: [
      "Content",
      "Social Media Management",
      "Paid Ads",
      "KI-Videos",
      "Reels",
      "Creatives",
      "Kampagnen",
    ],
    statement: "Attention, engineered.",
  },
  {
    id: "web",
    number: "03",
    title: "Webdesign & Development",
    teaser: "Websites mit Charakter und sauberem Code.",
    description:
      "Deine Website ist oft der erste echte Eindruck. Ich gestalte und entwickle Websites und Landingpages mobile-first – mit einer eigenständigen Gestaltung, verständlicher Struktur und einer technischen Umsetzung, die schnell und wartbar bleibt.",
    deliverables: [
      "Websites",
      "Landingpages",
      "Mobile-first UX/UI",
      "Redesign",
      "Technische Umsetzung",
      "Performance",
    ],
    statement: "Designed to be remembered.",
  },
  {
    id: "media",
    number: "04",
    title: "Mediengestaltung",
    teaser: "Ein visueller Auftritt – on- und offline.",
    description:
      "Von Flyer bis Social Visual: Ich gestalte Materialien, die deine Marke auf jedem Kanal wiedererkennbar machen. Ein konsistentes Kampagnendesign spart dir Abstimmungsrunden und wirkt professionell – digital wie gedruckt.",
    deliverables: [
      "Flyer",
      "Banner",
      "Print- & Digitalmaterialien",
      "Social Visuals",
      "Kampagnendesign",
    ],
    statement: "Every touchpoint, on brand.",
  },
  {
    id: "ai",
    number: "05",
    title: "KI-Automatisierung",
    teaser: "Weniger Routine. Mehr Zeit für das Wesentliche.",
    description:
      "Viele Abläufe wiederholen sich täglich: Anfragen sortieren, Daten übertragen, Antworten vorbereiten. Ich baue Automatisierungen und Assistenten, die genau solche Schritte übernehmen – mit sauberen Integrationen und immer mit menschlicher Freigabe dort, wo es darauf ankommt.",
    deliverables: [
      "Workflow-Automatisierungen",
      "Anfragebearbeitung",
      "CRM-Flows",
      "Assistenten",
      "Integrationen",
      "Menschliche Freigabe",
    ],
    statement: "Intelligence that works for you.",
  },
];

/** Auswahlmöglichkeiten im Kontaktformular – spiegeln exakt die Leistungen. */
export const serviceOptions = [
  ...services.map((s) => ({ value: s.id, label: s.title })),
  { value: "beratung", label: "Noch unklar – Beratung gewünscht" },
] as const;
