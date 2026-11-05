import { ContactForm } from "./ContactForm";
import { RevealGroup } from "@/components/ui/RevealGroup";
import { site } from "@/content/site";

export function Contact() {
  return (
    <section id="kontakt" aria-labelledby="contact-title" className="relative overflow-hidden bg-obsidian pb-28 pt-24 md:pb-40 md:pt-32">
      <div aria-hidden="true" className="pointer-events-none absolute -right-[20%] top-[10%] size-[60vw] rounded-full bg-bordeaux/35 blur-[160px]" />
      <RevealGroup className="container-x relative">
        <p className="text-eyebrow mb-8 flex items-center gap-3 text-muted" data-reveal>
          <span className="text-lime">07</span> Kontakt
        </p>
        <h2 id="contact-title" className="text-mega uppercase" data-reveal-lines="">
          <span className="mask-line">
            <span>GOT A VISION?</span>{" "}
          </span>
          <span className="mask-line">
            <span>
              LET&apos;S <span className="text-transparent [-webkit-text-stroke:1.5px_var(--c-bone)] md:[-webkit-text-stroke:2px_var(--c-bone)]">SCALE</span> IT.
            </span>
          </span>
        </h2>

        <div className="mt-16 grid gap-16 lg:mt-24 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4" data-reveal>
            <p className="text-xl leading-relaxed text-bone/85">
              Erzähl mir von deinem Vorhaben – ob neuer Shop, Website, Kampagne oder Automatisierung. Ich melde mich persönlich mit einer ehrlichen Einschätzung und den nächsten Schritten.
            </p>
            <ul className="mt-10 space-y-4 border-t border-line pt-8 text-bone/75">
              <li className="flex gap-4"><span className="font-display text-lime">01</span> Du schilderst dein Ziel.</li>
              <li className="flex gap-4"><span className="font-display text-lime">02</span> Wir sprechen in einem kurzen Erstgespräch.</li>
              <li className="flex gap-4"><span className="font-display text-lime">03</span> Du erhältst einen klaren Vorschlag.</li>
            </ul>
            {site.contactEmail && (
              <p className="mt-10 text-bone/75">
                Lieber direkt per E-Mail?{" "}
                <a href={`mailto:${site.contactEmail}`} className="text-bone underline underline-offset-4 hover:text-lime">
                  {site.contactEmail}
                </a>
              </p>
            )}
          </div>
          <div className="lg:col-span-7 lg:col-start-6" data-reveal>
            <ContactForm />
          </div>
        </div>
      </RevealGroup>
    </section>
  );
}
