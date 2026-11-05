import { z } from "zod";
import { serviceOptions } from "@/content/services";

const serviceValues = serviceOptions.map((o) => o.value) as [string, ...string[]];

export const budgetOptions = [
  { value: "", label: "Keine Angabe" },
  { value: "<2500", label: "unter 2.500 €" },
  { value: "2500-5000", label: "2.500 – 5.000 €" },
  { value: "5000-10000", label: "5.000 – 10.000 €" },
  { value: ">10000", label: "über 10.000 €" },
] as const;

const budgetValues = budgetOptions.map((o) => o.value) as [string, ...string[]];

export const contactSchema = z.object({
  name: z
    .string({ error: "Bitte gib deinen Namen an." })
    .trim()
    .min(2, "Bitte gib deinen Namen an.")
    .max(120, "Der Name ist zu lang."),
  email: z
    .string({ error: "Bitte gib eine gültige E-Mail-Adresse an." })
    .trim()
    .max(200, "Die E-Mail-Adresse ist zu lang.")
    .pipe(z.email("Bitte gib eine gültige E-Mail-Adresse an.")),
  company: z.string().trim().max(160, "Der Firmenname ist zu lang.").optional().default(""),
  service: z.enum(serviceValues, { error: "Bitte wähle eine Leistung aus." }),
  message: z
    .string({ error: "Bitte beschreibe dein Vorhaben." })
    .trim()
    .min(20, "Beschreibe dein Vorhaben bitte in mindestens 20 Zeichen.")
    .max(4000, "Die Beschreibung ist zu lang (max. 4.000 Zeichen)."),
  budget: z.enum(budgetValues).optional().default(""),
  privacy: z.literal(true, { error: "Bitte bestätige die Datenschutzhinweise." }),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;
export type ContactField = keyof ContactInput;

/** Antwortformat der API-Route */
export type ContactResponse =
  | { ok: true }
  | {
      ok: false;
      code: "validation" | "not_configured" | "rate_limited" | "spam" | "provider_error" | "bad_request";
      message: string;
      fieldErrors?: Partial<Record<ContactField, string>>;
    };
