/**
 * Simulierte Beispieldaten für die interaktive KI-Workflow-Demo.
 * Es wird KEIN echtes LLM, CRM oder Kundendatum verarbeitet.
 */
export const workflowStages = [
  { id: "inquiry", label: "Kundenanfrage", short: "Eingang" },
  { id: "classify", label: "KI-Kategorisierung", short: "Analyse" },
  { id: "crm", label: "CRM-Eintrag", short: "Ablage" },
  { id: "draft", label: "Antwortentwurf", short: "Entwurf" },
  { id: "approval", label: "Menschliche Freigabe", short: "Freigabe" },
] as const;

export type StageId = (typeof workflowStages)[number]["id"];

export type SampleInquiry = {
  id: string;
  label: string;
  from: string;
  subject: string;
  message: string;
  classification: {
    category: string;
    intent: string;
    priority: "Hoch" | "Mittel" | "Normal";
    tone: string;
    routing: string;
  };
  crm: { pipeline: string; stage: string; tags: string[]; nextStep: string };
  draft: string;
};

export const sampleInquiries: SampleInquiry[] = [
  {
    id: "shop",
    label: "Shop-Redesign",
    from: "Lena M. · Beispiel-Onlineshop",
    subject: "Unser Shop wirkt veraltet",
    message:
      "Hallo, unser Shopify-Shop ist drei Jahre alt und die Absprungrate auf Mobilgeräten ist hoch. Wir würden gern über ein Redesign sprechen – idealerweise vor dem Weihnachtsgeschäft.",
    classification: {
      category: "E-Commerce & Shopify",
      intent: "Neues Projekt · Redesign",
      priority: "Hoch",
      tone: "Sachlich, zeitkritisch",
      routing: "Projektanfrage → Erstgespräch",
    },
    crm: {
      pipeline: "Neue Projekte",
      stage: "Qualifizierung",
      tags: ["Shopify", "Mobile UX", "Saisonal"],
      nextStep: "Erstgespräch innerhalb von 48 h vorschlagen",
    },
    draft:
      "Hallo Lena, danke für deine Nachricht! Ein Redesign vor dem Weihnachtsgeschäft ist ein gutes Ziel. Damit ich einschätzen kann, wo der größte Hebel liegt: Hättest du diese Woche Zeit für ein kurzes Gespräch? Gern schaue ich mir vorab euren Shop auf Mobilgeräten an.",
  },
  {
    id: "social",
    label: "Social-Media-Kampagne",
    from: "Jonas K. · Beispiel-Café",
    subject: "Kampagne zur Neueröffnung",
    message:
      "Hi! Wir eröffnen im Frühjahr eine zweite Filiale und möchten auf Instagram und TikTok eine Kampagne mit Reels starten. Budget ist begrenzt, aber wir sind offen für Ideen.",
    classification: {
      category: "Social Media & Performance",
      intent: "Kampagne · Launch",
      priority: "Mittel",
      tone: "Locker, offen",
      routing: "Projektanfrage → Ideenskizze",
    },
    crm: {
      pipeline: "Neue Projekte",
      stage: "Bedarfsklärung",
      tags: ["Reels", "Launch", "Lokal"],
      nextStep: "Rückfrage zu Zeitraum & Budgetrahmen",
    },
    draft:
      "Hi Jonas, glückwunsch zur zweiten Filiale! Eine Reel-Kampagne passt gut zu einem lokalen Launch. Magst du mir kurz sagen, wann genau eröffnet wird und welcher Budgetrahmen dir vorschwebt? Dann skizziere ich dir zwei, drei Ansätze.",
  },
  {
    id: "support",
    label: "Kundenservice-Anfrage",
    from: "Petra S. · Beispiel-Bestandskundin",
    subject: "Frage zum Kontaktformular",
    message:
      "Guten Tag, seit gestern kommen über das Kontaktformular unserer Website keine E-Mails mehr an. Können Sie sich das bitte zeitnah ansehen?",
    classification: {
      category: "Support · Webdesign & Development",
      intent: "Störung · Bestandskunde",
      priority: "Hoch",
      tone: "Höflich, dringend",
      routing: "Support → Technische Prüfung",
    },
    crm: {
      pipeline: "Support",
      stage: "Offen · Priorität",
      tags: ["Formular", "E-Mail", "Bestandskunde"],
      nextStep: "Technische Prüfung heute einplanen",
    },
    draft:
      "Guten Tag Frau S., vielen Dank für den Hinweis. Ich prüfe die Formular-Zustellung heute und melde mich mit einem Zwischenstand. Falls in der Zwischenzeit dringende Anfragen eingehen, erreichen Sie Kunden vorübergehend am besten direkt per E-Mail.",
  },
];
