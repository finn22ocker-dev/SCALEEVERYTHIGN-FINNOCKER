/**
 * Portfolio-Datenstruktur.
 * Aktuell ausschließlich KONZEPTPROJEKTE (keine echten Kundenprojekte).
 * Echte Projekte später einfach ergänzen: `kind: "case"` setzen und optional
 * `image` (Pfad in /public) angeben – dann wird das Bild statt der CSS-Visualisierung gezeigt.
 */
export type ProjectVisual = "shop" | "redesign" | "social" | "workflow";

export type Project = {
  slug: string;
  kind: "concept" | "case";
  title: string;
  category: string;
  summary: string;
  details: string;
  focus: string[];
  visual: ProjectVisual;
  image?: { src: string; alt: string };
};

export const projects: Project[] = [
  {
    slug: "maison-noir-shop",
    kind: "concept",
    title: "Maison Noir",
    category: "Premium Shop Interface",
    summary: "Ein Shopify-Konzept für eine fiktive Premium-Lifestyle-Marke.",
    details:
      "Wie wirkt ein Shop, der sich wie eine Boutique anfühlt? Das Konzept untersucht großzügige Produktinszenierung, eine reduzierte Navigation und einen Checkout-Pfad mit möglichst wenig Reibung.",
    focus: ["Shopify", "UX / CRO", "Produktseiten"],
    visual: "shop",
  },
  {
    slug: "atelier-redesign",
    kind: "concept",
    title: "Atelier Nord",
    category: "Website-Redesign",
    summary: "Redesign-Konzept für ein fiktives Architekturbüro.",
    details:
      "Editoriale Typografie, ruhige Raster und klare Projektseiten: Das Konzept zeigt, wie eine Website Kompetenz vermitteln kann, ohne laut zu werden – mobile-first gedacht.",
    focus: ["Webdesign", "Art Direction", "Mobile-first"],
    visual: "redesign",
  },
  {
    slug: "pulse-social-system",
    kind: "concept",
    title: "Pulse Collective",
    category: "Social Creative System",
    summary: "Ein modulares Creative-System für Reels, Stories und Ads.",
    details:
      "Wiederverwendbare Layouts, ein klarer Farbcode und Templates für Kampagnen: So bleibt ein Social-Auftritt auch bei hoher Frequenz konsistent. Fiktive Marke, Konzeptstudie.",
    focus: ["Social Media", "Creatives", "Kampagnen"],
    visual: "social",
  },
  {
    slug: "inbox-flow",
    kind: "concept",
    title: "Inbox Flow",
    category: "AI Workflow Design",
    summary: "Konzept einer KI-gestützten Anfrage-Pipeline mit Freigabe.",
    details:
      "Von der eingehenden Anfrage bis zum freigegebenen Antwortentwurf: Das Konzept visualisiert, wie Automatisierung Routinearbeit reduziert und der Mensch die finale Entscheidung behält.",
    focus: ["KI-Automatisierung", "CRM-Flows", "Service Design"],
    visual: "workflow",
  },
];
