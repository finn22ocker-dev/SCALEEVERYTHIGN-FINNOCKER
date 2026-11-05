# SCALEEVERYTHING – Website

One-Page-Agenturwebsite für **SCALEEVERYTHING** (Finn Ocker) – *Digital Experiences. Intelligent Growth.*

**Stack:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS 4 · GSAP + ScrollTrigger · React Three Fiber / Three.js · Zod · Resend · Lucide Icons

---

## Schnellstart

```bash
npm install
cp .env.example .env.local   # Werte eintragen (siehe „Kontaktformular“)
npm run dev                  # http://localhost:3000
```

| Befehl | Zweck |
| --- | --- |
| `npm run dev` | Entwicklungsserver |
| `npm run build` | Production-Build (inkl. TypeScript-Prüfung) |
| `npm start` | Production-Server (nach `build`) |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript ohne Build |

Node.js ≥ 20.9 erforderlich (getestet mit Node 22).

---

## ⚠️ Vor der Veröffentlichung erledigen

1. ~~Gründerfoto ablegen~~ – erledigt: `public/images/finn-ocker.png` (freigestellt, siehe unten).
2. **Impressum & Datenschutz** (`src/app/impressum/page.tsx`, `src/app/datenschutz/page.tsx`) mit echten Angaben füllen und **rechtlich prüfen lassen**. Die Seiten enthalten derzeit nur Platzhalter und einen sichtbaren Warnhinweis – den Hinweisblock in `src/components/layout/LegalShell.tsx` erst entfernen, wenn die Texte geprüft sind.
3. **E-Mail-Versand konfigurieren** (Resend, siehe unten). Ohne Konfiguration zeigt das Formular ehrlich „Versand nicht konfiguriert“ – es wird nie ein Erfolg vorgetäuscht.
4. `NEXT_PUBLIC_SITE_URL` auf die echte Domain setzen (Metadaten, Sitemap, OG-Image).
5. Formulierungen zur Ausbildung in `src/components/sections/Founder.tsx` von Finn gegenlesen lassen (Status/Wortlaut der Qualifikationen).

---

## Gründerfoto

- Datei: **`public/images/finn-ocker.png`** (Hochformat empfohlen, mind. 1200 × 1500 px).
- Die Datei wird beim Build automatisch erkannt (`src/lib/portrait.ts`) und über `next/image` optimiert (AVIF/WebP, responsive Größen).
- Bildausschnitt: `object-[50%_22%]` in `src/components/sections/Founder.tsx` – bei Bedarf anpassen, damit das Gesicht auf Mobilgeräten nicht angeschnitten wird.
- Nach dem Ablegen neu bauen (`npm run build`) bzw. den Dev-Server neu starten.

> Aktueller Stand: Finns Foto ist eingebunden. Die Website nutzt eine freigestellte Version auf dunklem Studiohintergrund (Charcoal + Bordeaux-Glow); Person und Gesicht sind unverändert. Original und transparente Freistellung liegen unter `assets/portrait/` (nicht öffentlich ausgeliefert). Fehlt die Datei, zeigt die Seite einen gestalteten Platzhalter mit Initialen – bewusst **kein** Ersatzgesicht.

---

## Inhalte bearbeiten

Alle Texte und Daten liegen typisiert in `src/content/`:

| Datei | Inhalt |
| --- | --- |
| `site.ts` | Name, Tagline, Beschreibung, Navigation, öffentliche Kontakt-E-Mail (`contactEmail`), Social-Profile (`socials`) |
| `services.ts` | Die fünf Leistungen (Titel, Text, Leistungsumfang, Statement) + Auswahl im Formular |
| `projects.ts` | Portfolio. Aktuell **4 Konzeptprojekte** (`kind: "concept"` → sichtbares Label „Konzeptprojekt“). Echte Projekte: `kind: "case"` und optional `image: { src, alt }` |
| `approach.ts` | „Warum SCALEEVERYTHING“-Prinzipien und Prozess-Schritte |
| `workflow.ts` | Simulierte Beispieldaten der KI-Demo |

`contactEmail: null` und `socials: []` bedeuten: **nichts anzeigen**. Bitte nur echte Angaben eintragen.

---

## Kontaktformular (Resend)

Ablauf: Formular (`src/components/sections/ContactForm.tsx`) → `POST /api/contact` (`src/app/api/contact/route.ts`) → E-Mail via [Resend](https://resend.com).

Serverseitige Schutzmaßnahmen:

- gemeinsame Zod-Validierung in Client und Server (`src/lib/contact-schema.ts`)
- Honeypot-Feld + Mindest-Ausfüllzeit (2,5 s)
- In-Memory-Rate-Limit: 5 Anfragen / 10 Min. pro IP (`src/lib/rate-limit.ts`). Auf Serverless-Plattformen gilt das pro Instanz – für hohes Aufkommen ein verteiltes Limit (z. B. Upstash Redis) ergänzen.
- Größenlimit, HTML-Escaping, `replyTo` = Absender der Anfrage
- **Keine Speicherung** personenbezogener Daten in einer Datenbank

Einrichtung:

1. Resend-Konto anlegen, Domain verifizieren.
2. In `.env.local` (lokal) bzw. in den Umgebungsvariablen des Hostings setzen:

```bash
RESEND_API_KEY=re_xxx
CONTACT_FROM_EMAIL="SCALEEVERYTHING <anfrage@deine-domain.de>"
CONTACT_TO_EMAIL=postfach@deine-domain.de
```

Alle Schlüssel sind ausschließlich serverseitig (kein `NEXT_PUBLIC_`-Präfix). Fehlt einer der Werte, antwortet die API mit `503 not_configured` und das Formular zeigt eine klare Fehlermeldung.

---

## Architektur

```
src/
  app/
    layout.tsx            Fonts (lokal via next/font), Metadaten, Skip-Link, Intro-Skript
    page.tsx              One-Page-Komposition + JSON-LD
    api/contact/route.ts  Kontakt-API (Resend)
    impressum/, datenschutz/   Rechtliche Platzhalterseiten
    opengraph-image.tsx, icon.svg, robots.ts, sitemap.ts, not-found.tsx
  components/
    hero/        Hero, HeroVisual (Geräte-Erkennung + Lazy-Load), HeroScene (R3F), HeroFallback (CSS), HeroScrollFx
    demo/        AiWorkflowDemo (State-Machine)
    sections/    Statement, ServiceList, ProjectShowcase, Founder, Approach, Process, Contact, ContactForm, Marquee …
    layout/      SiteHeader (inkl. Mobile-Menü), SiteFooter, LegalShell
    ui/          MagneticLink, RevealGroup, MaskedHeading, Intro, ScrollProgress, Wordmark
  content/       Typisierte Inhalte
  lib/           gsap-Setup, Hooks, Kontakt-Schema, Rate-Limit, Porträt-Erkennung
```

### Die drei Signature-Features

- **3D-Hero:** Prozedurale Liquid-Metal-Skulptur (`MeshPhysicalMaterial` + Simplex-Noise-Vertex-Displacement mit neu berechneten Normalen, prozedurale `RoomEnvironment`-Reflexionen, Orbit-Linien). Wird per `next/dynamic` nur clientseitig nachgeladen. Qualitätsstufen: *high* (Desktop), *low* (Mobil/Touch/≤ 4 Kerne, geringere Geometrie, DPR ≤ 1,25, keine Pointer-Parallaxe), *static* (CSS-Fallback bei `prefers-reduced-motion`, Datensparmodus, fehlendem WebGL oder schwacher Hardware). Rendering pausiert außerhalb des Viewports bzw. bei verstecktem Tab. Ressourcen werden beim Unmount freigegeben.
- **KI-Workflow-Demo:** Lokale State-Machine (Anfrage → KI-Kategorisierung → CRM → Entwurf → Menschliche Freigabe) mit drei Beispielanfragen, Freigeben/Überarbeiten, Zurücksetzen, `aria-live`-Status, Tastaturbedienung. Klar gekennzeichnet als „Interaktive Demo – simulierte Beispieldaten“. Bei reduced-motion ohne wandernde Pulse.
- **Founder-Branding:** Editoriale Komposition „THE MIND / BEHIND THE VISION.“ mit Bordeaux-Panel, Linienornament, maskiertem Scroll-Reveal und Parallax.

### Motion & Barrierefreiheit

- Hero-Reveals per CSS-Keyframes (laufen auch ohne JS bis zum Ende), Scroll-Reveals per GSAP/ScrollTrigger mit `useGSAP`-Cleanup. Inhalte sind im HTML immer sichtbar.
- Kein Scroll-Hijacking, kein Smooth-Scroll-Framework; native `scroll-behavior: smooth` nur ohne reduced-motion. Statement-Sektion nutzt CSS-`sticky` statt GSAP-Pinning.
- `prefers-reduced-motion` wird überall respektiert (statische Varianten).
- Skip-Link, sichtbare Fokus-Stile, Mobile-Menü mit Fokusfalle/ESC/Fokus-Rückgabe, native `<dialog>` für Projektdetails, beschriftete Formularfelder mit verknüpften Fehlermeldungen.
- Kein Tracking, keine Cookies; das Intro merkt sich nur im `sessionStorage`, dass es bereits lief.

---

## Medien

Kein Hintergrundvideo nötig – die Seite ist ohne Videos vollständig. Briefings für optionale, eigene Bordeaux-Loops: [`MEDIA_BRIEFS.md`](./MEDIA_BRIEFS.md). Ablage dann unter `public/media/` (MP4 + WebM + Poster, ohne Ton).

Das OG-Bild wird per `src/app/opengraph-image.tsx` generiert und kann durch ein eigenes Motiv (`src/app/opengraph-image.png`, 1200 × 630) ersetzt werden.

---

## Deployment

Empfohlen: **Vercel** (oder jede Plattform mit Next.js-16-Support / Node-Server).

1. Repository verbinden.
2. Umgebungsvariablen setzen: `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`, `NEXT_PUBLIC_SITE_URL`.
3. Build-Befehl `npm run build`, Start `npm start` (bei Vercel automatisch).

Wird später Tracking/Analytics eingebunden, sind ggf. eine Einwilligungslösung und eine Anpassung der Datenschutzhinweise nötig.

---

## Status & Prüfungen (ehrlicher Stand)

Durchgeführt in der Build-Umgebung:

- `npm run lint` – ohne Fehler/Warnungen
- `npm run typecheck` / TypeScript im Build – ohne Fehler
- `npm run build` – erfolgreich (alle Seiten statisch, `/api/contact` dynamisch)
- Browser-Prüfung mit Playwright/Chromium (Headless, Software-WebGL) bei 1440 × 900 und 375 × 812: Screenshots gesichtet; getestet wurden Service-Akkordeon, Hover-Vorschau, KI-Demo (Start → alle Stufen → Freigabe → Zurücksetzen), Formular-Validierung, „nicht konfiguriert“-Fehler der API, Mobile-Menü (Fokus, ESC), Projekt-Dialog (ESC), kein horizontales Scrollen.

Nicht durchgeführt / bekannte Punkte:

- Keine Lighthouse-/Performance-Messung auf echten Geräten; keine automatisierten Unit-/E2E-Tests im Repository.
- Keine Prüfung mit echten Screenreadern.
- Echter E-Mail-Versand nicht getestet (keine Resend-Zugangsdaten vorhanden).
- In der Browser-Konsole erscheint eine Deprecation-Warnung `THREE.Clock … use THREE.Timer`. Sie stammt aus `@react-three/fiber` 9.8 (aktuelle Version) selbst, nicht aus dem Projektcode, und ist funktional folgenlos.
- Impressums-/Datenschutzangaben und echte Kontaktdaten fehlen noch (siehe oben).
