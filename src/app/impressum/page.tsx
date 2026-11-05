import type { Metadata } from "next";
import { LegalShell } from "@/components/layout/LegalShell";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum von SCALEEVERYTHING (Platzhalter – Angaben werden vom Inhaber ergänzt).",
  robots: { index: false, follow: true },
  alternates: { canonical: "/impressum" },
};

export default function ImpressumPage() {
  return (
    <LegalShell title="Impressum">
      <section>
        <h2>Angaben zum Anbieter</h2>
        <p>
          <span className="ph">[Vollständiger Name / Firmenbezeichnung]</span>
          <br />
          <span className="ph">[Straße und Hausnummer]</span>
          <br />
          <span className="ph">[PLZ Ort]</span>
          <br />
          <span className="ph">[Land]</span>
        </p>
      </section>
      <section>
        <h2>Kontakt</h2>
        <p>
          E-Mail: <span className="ph">[E-Mail-Adresse]</span>
          <br />
          Telefon: <span className="ph">[Telefonnummer, falls angegeben]</span>
        </p>
      </section>
      <section>
        <h2>Weitere Pflichtangaben (falls zutreffend)</h2>
        <ul>
          <li>
            Umsatzsteuer-ID / Steuernummer: <span className="ph">[falls vorhanden]</span>
          </li>
          <li>
            Registereintrag / Registergericht: <span className="ph">[falls vorhanden]</span>
          </li>
          <li>
            Verantwortlich für Inhalte: <span className="ph">[Name und Anschrift]</span>
          </li>
          <li>
            Angaben zur Verbraucherstreitbeilegung: <span className="ph">[vom Inhaber zu prüfen]</span>
          </li>
        </ul>
      </section>
      <section>
        <h2>Hinweis</h2>
        <p>
          Welche Angaben konkret erforderlich sind, hängt von der Rechtsform und Tätigkeit ab. Bitte vor Veröffentlichung rechtlich prüfen lassen.
        </p>
      </section>
    </LegalShell>
  );
}
