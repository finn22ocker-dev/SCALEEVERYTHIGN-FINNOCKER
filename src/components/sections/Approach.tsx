import { principles } from "@/content/approach";
import { MaskedHeading } from "@/components/ui/MaskedHeading";
import { RevealGroup } from "@/components/ui/RevealGroup";
import { microcopy } from "@/content/site";

/** Warum SCALEEVERYTHING – editoriale Prinzipien statt Testimonials. */
export function Approach() {
  return (
    <section id="ansatz" aria-labelledby="approach-title" className="relative bg-bordeaux py-28 text-bone md:py-40">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgba(255,90,130,0.18),transparent_55%),radial-gradient(ellipse_at_0%_100%,rgba(16,16,18,0.55),transparent_60%)]" />
      <RevealGroup className="container-x relative grid gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <p className="text-eyebrow mb-8 flex items-center gap-3 text-bone/70" data-reveal>
              <span className="text-lime">05</span> Warum SCALEEVERYTHING
            </p>
            <MaskedHeading id="approach-title" className="text-headline uppercase" lines={["Not louder.", "Smarter."]} />
            <p className="mt-8 max-w-md text-lg leading-relaxed text-bone/80" data-reveal>
              Keine erfundenen Erfolgsgeschichten, sondern eine klare Haltung: So arbeite ich – und darauf kannst du dich verlassen.
            </p>
            <p className="mt-10 font-display text-sm italic text-bone/70" data-reveal>
              {microcopy.future}
            </p>
          </div>
        </div>
        <ol className="lg:col-span-7 lg:col-start-6">
          {principles.map((p, i) => (
            <li key={p.title} className="group relative border-t border-bone/20 py-10 last:border-b md:py-12" data-reveal>
              <div className="grid gap-4 md:grid-cols-[5rem_1fr_auto] md:items-baseline md:gap-8">
                <span className="font-display text-sm text-lime">0{i + 1}</span>
                <div>
                  <h3 className="font-display text-[clamp(1.75rem,3.4vw,3rem)] font-semibold leading-none tracking-[-0.045em]">{p.title}</h3>
                  <p className="mt-4 max-w-lg leading-relaxed text-bone/80">{p.text}</p>
                </div>
                <span lang="en" className="font-display text-sm uppercase tracking-[0.2em] text-bone/60 max-md:hidden">
                  {p.keyword}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </RevealGroup>
    </section>
  );
}
