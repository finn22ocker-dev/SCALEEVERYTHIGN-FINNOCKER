"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, AlertTriangle, Loader2 } from "lucide-react";
import { serviceOptions } from "@/content/services";
import { budgetOptions, contactSchema, type ContactField, type ContactResponse } from "@/lib/contact-schema";
import { SELECT_SERVICE_EVENT } from "@/lib/events";

type Status =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "success" }
  | { state: "error"; message: string; code?: string };

type Values = {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
  budget: string;
  privacy: boolean;
};

const initial: Values = { name: "", email: "", company: "", service: "", message: "", budget: "", privacy: false };

export function ContactForm() {
  const [values, setValues] = useState<Values>(initial);
  const [errors, setErrors] = useState<Partial<Record<ContactField, string>>>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const startedAt = useRef<number>(0);
  const honeypot = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
    const onSelect = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (serviceOptions.some((o) => o.value === id)) {
        setValues((v) => ({ ...v, service: id }));
        setErrors((er) => ({ ...er, service: undefined }));
      }
    };
    window.addEventListener(SELECT_SERVICE_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_SERVICE_EVENT, onSelect);
  }, []);

  function update<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  }

  function validateField(key: ContactField) {
    const result = contactSchema.safeParse(values);
    const issue = result.success ? undefined : result.error.issues.find((i) => i.path[0] === key);
    setErrors((er) => ({ ...er, [key]: issue?.message }));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.state === "loading") return;

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const next: Partial<Record<ContactField, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as ContactField;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      setStatus({ state: "error", message: "Bitte prüfe die markierten Felder." });
      const first = Object.keys(next)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus({ state: "loading" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honeypot.current?.value ?? "", startedAt: startedAt.current }),
      });
      const data = (await res.json().catch(() => null)) as ContactResponse | null;
      if (res.ok && data?.ok) {
        setStatus({ state: "success" });
        setValues(initial);
        setErrors({});
      } else if (data && !data.ok) {
        if (data.fieldErrors) setErrors(data.fieldErrors);
        setStatus({ state: "error", message: data.message, code: data.code });
      } else {
        setStatus({ state: "error", message: "Unerwartete Antwort vom Server. Bitte versuche es später erneut." });
      }
    } catch {
      setStatus({ state: "error", message: "Keine Verbindung möglich. Bitte prüfe deine Internetverbindung und versuche es erneut." });
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  const fieldProps = (key: ContactField) => ({
    id: `contact-${key}`,
    name: key,
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `contact-${key}-error` : undefined,
    onBlur: () => {
      if (values[key as keyof Values] !== initial[key as keyof Values]) validateField(key);
    },
  });

  if (status.state === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-[1.75rem] border border-lime/50 bg-lime/[0.05] p-8 md:p-12">
        <span className="grid size-14 place-items-center rounded-full bg-lime text-obsidian">
          <Check className="size-6" aria-hidden="true" />
        </span>
        <h3 className="mt-6 font-display text-3xl font-semibold tracking-[-0.04em]">Danke – deine Anfrage ist angekommen.</h3>
        <p className="mt-3 max-w-lg text-bone/80">Ich melde mich persönlich bei dir zurück. Bis dahin: Think bigger.</p>
        <button
          type="button"
          onClick={() => {
            startedAt.current = Date.now();
            setStatus({ state: "idle" });
          }}
          className="mt-8 inline-flex min-h-12 items-center rounded-full border border-line-strong px-6 font-display hover:border-bone"
        >
          Weitere Anfrage senden
        </button>
      </div>
    );
  }

  const loading = status.state === "loading";

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby="contact-required-note" className="relative">
      <p id="contact-required-note" className="mb-8 text-sm text-muted">
        Pflichtfelder sind mit <span aria-hidden="true">*</span>
        <span className="sr-only">Stern</span> markiert.
      </p>

      {/* Honeypot – für Menschen unsichtbar */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-website">Website (bitte leer lassen)</label>
        <input ref={honeypot} id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div className="grid gap-x-8 gap-y-8 md:grid-cols-2">
        <Field label="Name" required error={errors.name} htmlFor="contact-name">
          <input {...fieldProps("name")} type="text" autoComplete="name" required className="field" value={values.name} onChange={(e) => update("name", e.target.value)} />
        </Field>
        <Field label="E-Mail" required error={errors.email} htmlFor="contact-email">
          <input {...fieldProps("email")} type="email" autoComplete="email" inputMode="email" required className="field" value={values.email} onChange={(e) => update("email", e.target.value)} />
        </Field>
        <Field label="Unternehmen" optional error={errors.company} htmlFor="contact-company">
          <input {...fieldProps("company")} type="text" autoComplete="organization" className="field" value={values.company} onChange={(e) => update("company", e.target.value)} />
        </Field>
        <Field label="Gewünschte Dienstleistung" required error={errors.service} htmlFor="contact-service">
          <select {...fieldProps("service")} required className="field" value={values.service} onChange={(e) => update("service", e.target.value)}>
            <option value="" disabled>
              Bitte wählen …
            </option>
            {serviceOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
        <div className="md:col-span-2">
          <Field label="Beschreibung deines Vorhabens" required error={errors.message} htmlFor="contact-message">
            <textarea
              {...fieldProps("message")}
              required
              rows={5}
              maxLength={4000}
              className="field resize-y"
              placeholder="Worum geht es, was ist dein Ziel, gibt es einen Zeitrahmen?"
              value={values.message}
              onChange={(e) => update("message", e.target.value)}
            />
          </Field>
        </div>
        <Field label="Budget" optional error={errors.budget} htmlFor="contact-budget">
          <select {...fieldProps("budget")} className="field" value={values.budget} onChange={(e) => update("budget", e.target.value)}>
            {budgetOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-10">
        <label htmlFor="contact-privacy" className="flex cursor-pointer items-start gap-4 text-sm leading-relaxed text-bone/80">
          <input
            id="contact-privacy"
            name="privacy"
            type="checkbox"
            required
            checked={values.privacy}
            aria-invalid={errors.privacy ? true : undefined}
            aria-describedby={errors.privacy ? "contact-privacy-error" : undefined}
            onChange={(e) => update("privacy", e.target.checked)}
            className="mt-0.5 size-5 shrink-0 cursor-pointer accent-[#c8ff33]"
          />
          <span>
            Ich habe die{" "}
            <Link href="/datenschutz" className="underline decoration-bone/40 underline-offset-4 hover:decoration-lime">
              Datenschutzhinweise
            </Link>{" "}
            gelesen und bin einverstanden, dass meine Angaben zur Bearbeitung meiner Anfrage verwendet werden. <span aria-hidden="true">*</span>
          </span>
        </label>
        {errors.privacy && (
          <p id="contact-privacy-error" className="mt-2 pl-9 text-sm text-[#ff8a8a]">
            {errors.privacy}
          </p>
        )}
      </div>

      <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={loading}
          className="group inline-flex min-h-14 shrink-0 items-center justify-center gap-3 whitespace-nowrap rounded-full bg-bone px-8 font-display text-lg font-medium text-obsidian transition-colors hover:bg-lime disabled:cursor-wait disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2 className="size-5 animate-spin" aria-hidden="true" /> Wird gesendet …
            </>
          ) : (
            <>
              Anfrage senden
              <ArrowUpRight className="size-5 transition-transform duration-500 group-hover:rotate-45" aria-hidden="true" />
            </>
          )}
        </button>
        <p className="text-sm text-muted">Deine Daten werden nur zur Beantwortung deiner Anfrage per E-Mail übermittelt und nicht in einer Datenbank gespeichert.</p>
      </div>

      <div ref={statusRef} tabIndex={-1} aria-live="assertive" className="mt-6 outline-none">
        {status.state === "error" && (
          <div
            role="alert"
            className={`flex items-start gap-3 rounded-2xl border p-5 text-sm ${
              status.code === "not_configured" ? "border-[#ffb547]/50 bg-[#ffb547]/[0.06]" : "border-[#ff6b6b]/50 bg-[#ff6b6b]/[0.06]"
            }`}
          >
            <AlertTriangle className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
            <div>
              <p className="font-semibold">{status.code === "not_configured" ? "Versand nicht konfiguriert" : "Senden nicht möglich"}</p>
              <p className="mt-1 text-bone/85">{status.message}</p>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required,
  optional,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-eyebrow block text-bone/70">
        {label}
        {required && <span aria-hidden="true"> *</span>}
        {optional && <span className="ml-2 normal-case tracking-normal text-muted">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="mt-2 text-sm text-[#ff8a8a]">
          {error}
        </p>
      )}
    </div>
  );
}
