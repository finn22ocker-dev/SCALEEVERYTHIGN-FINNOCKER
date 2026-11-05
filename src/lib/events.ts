"use client";

export const SELECT_SERVICE_EVENT = "se:select-service";

/** Vorauswahl der Leistung im Kontaktformular (z. B. aus einer Service-Zeile). */
export function selectService(id: string) {
  window.dispatchEvent(new CustomEvent<string>(SELECT_SERVICE_EVENT, { detail: id }));
}
