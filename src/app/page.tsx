import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Intro } from "@/components/ui/Intro";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { RevealGroup } from "@/components/ui/RevealGroup";
import { Hero } from "@/components/hero/Hero";
import { Statement } from "@/components/sections/Statement";
import { SectionIntro } from "@/components/sections/SectionIntro";
import { ServiceList } from "@/components/sections/ServiceList";
import { ProjectShowcase } from "@/components/sections/ProjectShowcase";
import { AiWorkflowDemo } from "@/components/demo/AiWorkflowDemo";
import { Founder } from "@/components/sections/Founder";
import { Approach } from "@/components/sections/Approach";
import { ProcessTimeline } from "@/components/sections/Process";
import { Contact } from "@/components/sections/Contact";
import { Marquee } from "@/components/sections/Marquee";
import { site } from "@/content/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  slogan: site.tagline,
  description: site.description,
  url: site.url,
  founder: { "@type": "Person", name: site.founder },
  areaServed: ["DE", "AT", "CH"],
  knowsLanguage: "de",
};

export default function Home() {
  return (
    <>
      <Intro />
      <ScrollProgress />
      <SiteHeader />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Statement />

        <section id="leistungen" aria-labelledby="services-title" className="relative bg-obsidian pt-24 pb-28 md:pt-32 md:pb-40">
          <RevealGroup className="container-x">
            <SectionIntro
              number="01"
              label="Leistungen"
              id="services-title"
              lines={["Five disciplines.", <span key="b" className="text-bordeaux-bright">One vision.</span>]}
              aside="Von Shop über Social bis Automatisierung: Fünf Disziplinen, die ineinandergreifen – damit dein Auftritt nicht nur gut aussieht, sondern funktioniert."
            />
            <div data-reveal>
              <ServiceList />
            </div>
          </RevealGroup>
        </section>

        <Marquee />

        <section id="projekte" aria-labelledby="work-title" className="relative bg-obsidian pt-24 pb-28 md:pt-32 md:pb-40">
          <RevealGroup className="container-x">
            <SectionIntro
              number="02"
              label="Selected Work"
              id="work-title"
              lines={["Selected", <span key="b">Work<span className="text-bordeaux-bright">.</span></span>]}
              aside={
                <>
                  Ausgewählte <strong className="font-semibold text-bone">Konzeptprojekte</strong>: Studien mit fiktiven Marken, die zeigen, wie ich denke und gestalte. Keine Kundenprojekte, keine erfundenen Ergebnisse.
                </>
              }
            />
            <ProjectShowcase />
          </RevealGroup>
        </section>

        <section id="ki-demo" aria-labelledby="demo-title" className="relative bg-[linear-gradient(180deg,#101012_0%,#1a0710_50%,#101012_100%)] pt-24 pb-28 md:pt-32 md:pb-40">
          <RevealGroup className="container-x">
            <SectionIntro
              number="03"
              label="KI-Automatisierung live"
              id="demo-title"
              lines={["Work smarter.", <span key="b" className="text-lime">Scale faster.</span>]}
              aside="Probier es selbst: So kann eine Kundenanfrage automatisch sortiert, im CRM abgelegt und als Antwortentwurf vorbereitet werden – bis ein Mensch freigibt."
            />
            <div data-reveal>
              <AiWorkflowDemo />
            </div>
            <ul className="mt-12 grid gap-px overflow-hidden rounded-[1.5rem] border border-line bg-line md:grid-cols-3">
              {[
                ["Weniger Wiederholung", "Sortieren, Übertragen, Vorformulieren – Routineschritte können automatisiert vorbereitet werden."],
                ["Klare Übergaben", "Jede Anfrage landet mit Kontext an der richtigen Stelle. Nichts geht im Postfach verloren."],
                ["Menschliche Kontrolle", "Die KI schlägt vor, du entscheidest. Nichts wird ohne deine Freigabe versendet."],
              ].map(([t, d], i) => (
                <li key={t} className="bg-obsidian p-8" data-reveal data-reveal-delay={i * 0.08}>
                  <p className="font-display text-sm text-lime">0{i + 1}</p>
                  <h3 className="mt-3 font-display text-2xl font-semibold tracking-[-0.03em]">{t}</h3>
                  <p className="mt-3 leading-relaxed text-bone/75">{d}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted">Hinweis: Wie viel Zeit eine Automatisierung im Einzelfall spart, hängt von deinen Prozessen ab – das klären wir gemeinsam.</p>
          </RevealGroup>
        </section>

        <Founder />
        <Approach />

        <section id="prozess" aria-labelledby="process-title" className="relative bg-obsidian pt-24 pb-28 md:pt-32 md:pb-40">
          <RevealGroup className="container-x">
            <SectionIntro
              number="06"
              label="Prozess"
              id="process-title"
              lines={["From idea", <span key="b">to <span className="text-bordeaux-bright">impact.</span></span>]}
              aside="Vier klare Phasen, damit du jederzeit weißt, wo dein Projekt steht und was als Nächstes passiert."
            />
            <ProcessTimeline />
          </RevealGroup>
        </section>

        <Contact />
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
