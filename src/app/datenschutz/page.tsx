import type { Metadata } from "next";
import { LegalShell } from "@/components/layout/LegalShell";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzhinweise von SCALEEVERYTHING (Platzhalter – vom Inhaber zu ergänzen und rechtlich zu prüfen).",
  robots: { index: false, follow: true },
  alternates: { canonical: "/datenschutz" },
};

export default function DatenschutzPage() {
  return (
    <LegalShell title="Datenschutz">
      <section>
        <h2>1. Verantwortlicher</h2>
        <p>
          <span className="ph">[Name, Anschrift, E-Mail des Verantwortlichen]</span>
        </p>
      </section>
      <section>
        <h2>2. Technischer Stand dieser Website (Information für den Inhaber)</h2>
        <p>Die folgenden Punkte beschreiben, wie die Website technisch umgesetzt ist. Sie ersetzen keine rechtlich geprüfte Datenschutzerklärung:</p>
        <ul>
          <li>Es sind standardmäßig keine Analyse-, Tracking- oder Marketing-Tools eingebunden und es werden keine Tracking-Cookies gesetzt.</li>
          <li>Schriften werden beim Build lokal eingebunden und vom eigenen Server ausgeliefert (keine Laufzeit-Anfragen an Google Fonts).</li>
          <li>
            Für die Intro-Animation wird im Session-Storage des Browsers ein technischer Merker (<code>se-intro</code>) gespeichert, damit das Intro pro Sitzung nur einmal erscheint.
          </li>
          <li>
            Das Kontaktformular übermittelt die eingegebenen Daten (Name, E-Mail, optional Unternehmen und Budget, gewählte Leistung, Nachricht) an den E-Mail-Dienst Resend, der sie per E-Mail an den Inhaber zustellt. Eine Speicherung in einer Datenbank der Website erfolgt nicht.
          </li>
          <li>
            Hosting-Anbieter: <span className="ph">[z. B. Vercel / anderer Anbieter – inkl. Server-Logfiles prüfen]</span>
          </li>
        </ul>
      </section>
      <section>
        <h2>3. Kontaktformular</h2>
        <p>
          <span className="ph">[Zweck, Rechtsgrundlage, Empfänger (Resend), ggf. Drittlandübermittlung, Speicherdauer – vom Inhaber zu ergänzen und zu prüfen]</span>
        </p>
      </section>
      <section>
        <h2>4. Hosting & Server-Logfiles</h2>
        <p>
          <span className="ph">[Angaben zum Hoster, Art der Logdaten, Rechtsgrundlage, Speicherdauer]</span>
        </p>
      </section>
      <section>
        <h2>5. Rechte der betroffenen Personen</h2>
        <p>
          <span className="ph">[Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerspruch, Beschwerderecht – vom Inhaber zu formulieren und zu prüfen]</span>
        </p>
      </section>
      <section>
        <h2>6. Änderungen bei zusätzlichen Diensten</h2>
        <p>
          Werden später Analyse-Tools, eingebettete Inhalte (z. B. Videos, Karten) oder Social-Media-Plugins ergänzt, sind ggf. eine Einwilligungslösung und eine Anpassung dieser Hinweise erforderlich.
        </p>
      </section>
    </LegalShell>
  );
}
