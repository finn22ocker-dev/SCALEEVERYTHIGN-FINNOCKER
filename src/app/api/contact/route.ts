import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";
import { contactSchema, type ContactField, type ContactResponse } from "@/lib/contact-schema";
import { serviceOptions } from "@/content/services";
import { rateLimit } from "@/lib/rate-limit";

/** Mindestzeit (ms) zwischen Formular-Render und Absenden – einfacher Bot-Schutz. */
const MIN_FILL_TIME_MS = 2500;

function json(body: ContactResponse, status: number, headers?: HeadersInit) {
  return NextResponse.json(body, { status, headers });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: NextRequest) {
  // 1) Nur JSON, Größe begrenzen
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return json({ ok: false, code: "bad_request", message: "Ungültige Anfrage." }, 415);
  }
  const raw = await request.text();
  if (raw.length > 20_000) {
    return json({ ok: false, code: "bad_request", message: "Die Anfrage ist zu groß." }, 413);
  }

  let payload: Record<string, unknown>;
  try {
    payload = JSON.parse(raw);
  } catch {
    return json({ ok: false, code: "bad_request", message: "Ungültige Anfrage." }, 400);
  }

  // 2) Rate-Limit pro IP
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  const limit = rateLimit(`contact:${ip}`);
  if (!limit.allowed) {
    return json(
      {
        ok: false,
        code: "rate_limited",
        message: "Zu viele Anfragen in kurzer Zeit. Bitte versuche es in ein paar Minuten erneut.",
      },
      429,
      { "Retry-After": String(limit.retryAfter) },
    );
  }

  // 3) Spam-Schutz: Honeypot + Ausfüllzeit
  const honeypot = typeof payload.website === "string" ? payload.website : "";
  const startedAt = typeof payload.startedAt === "number" ? payload.startedAt : 0;
  if (honeypot.length > 0 || !startedAt || Date.now() - startedAt < MIN_FILL_TIME_MS) {
    return json(
      { ok: false, code: "spam", message: "Die Anfrage konnte nicht verarbeitet werden. Bitte versuche es erneut." },
      400,
    );
  }

  // 4) Validierung (gleiches Schema wie im Client)
  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<ContactField, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as ContactField | undefined;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return json(
      { ok: false, code: "validation", message: "Bitte prüfe die markierten Felder.", fieldErrors },
      422,
    );
  }

  // 5) Provider-Konfiguration prüfen – niemals einen Versand vortäuschen
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !from || !to) {
    console.error("[contact] E-Mail-Versand nicht konfiguriert (RESEND_API_KEY / CONTACT_FROM_EMAIL / CONTACT_TO_EMAIL).");
    return json(
      {
        ok: false,
        code: "not_configured",
        message:
          "Der E-Mail-Versand ist auf dieser Website noch nicht eingerichtet. Deine Nachricht wurde nicht gesendet.",
      },
      503,
    );
  }

  const data = parsed.data;
  const serviceLabel = serviceOptions.find((o) => o.value === data.service)?.label ?? data.service;
  const rows: [string, string][] = [
    ["Name", data.name],
    ["E-Mail", data.email],
    ["Unternehmen", data.company || "–"],
    ["Leistung", serviceLabel],
    ["Budget", data.budget || "Keine Angabe"],
  ];

  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nNachricht:\n${data.message}`;
  const html = `
    <div style="font-family:system-ui,sans-serif;line-height:1.5;color:#101012">
      <h2 style="margin:0 0 16px">Neue Projektanfrage über SCALEEVERYTHING</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="color:#641529;font-weight:600;vertical-align:top">${k}</td><td>${escapeHtml(v)}</td></tr>`,
          )
          .join("")}
      </table>
      <h3 style="margin:24px 0 8px">Nachricht</h3>
      <p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>
    </div>`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: data.email,
      subject: `Projektanfrage: ${serviceLabel} – ${data.name}`.slice(0, 180),
      text,
      html,
    });
    if (error) {
      console.error("[contact] Resend-Fehler:", error.name, error.message);
      return json(
        {
          ok: false,
          code: "provider_error",
          message: "Beim Versand ist ein Fehler aufgetreten. Bitte versuche es später erneut.",
        },
        502,
      );
    }
  } catch (err) {
    console.error("[contact] Versand fehlgeschlagen:", err instanceof Error ? err.message : err);
    return json(
      {
        ok: false,
        code: "provider_error",
        message: "Beim Versand ist ein Fehler aufgetreten. Bitte versuche es später erneut.",
      },
      502,
    );
  }

  return json({ ok: true }, 200);
}
