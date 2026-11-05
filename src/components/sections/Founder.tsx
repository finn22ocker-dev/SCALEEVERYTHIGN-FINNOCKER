import Image from "next/image";
import { getPortrait } from "@/lib/portrait";
import { MagneticLink } from "@/components/ui/MagneticLink";
import { MaskedHeading } from "@/components/ui/MaskedHeading";
import { RevealGroup } from "@/components/ui/RevealGroup";
import { FounderMotion } from "./FounderMotion";

export async function Founder() {
  const portrait = await getPortrait();

  return (
    <section id="ueber-finn" aria-labelledby="founder-title" className="relative overflow-hidden bg-obsidian pt-24 pb-28 md:pt-32 md:pb-40">
      <FounderMotion />
      <RevealGroup className="container-x relative">
        <p className="text-eyebrow mb-8 flex items-center gap-3 text-muted" data-reveal>
          <span className="text-lime">04</span> Über Finn
        </p>
        <MaskedHeading
          id="founder-title"
          className="relative z-10 font-display text-[clamp(2.6rem,8.4vw,11.5rem)] font-semibold uppercase leading-[0.86] tracking-[-0.055em]"
          lines={[
            "THE MIND",
            <>
              BEHIND <span className="text-bordeaux-bright">THE VISION.</span>
            </>,
          ]}
        />

        <div className="relative mt-12 grid gap-12 md:mt-20 md:grid-cols-12 md:gap-8">
          {/* Porträt-Komposition */}
          <div className="relative self-start md:col-span-6 md:col-start-1 lg:col-span-5 lg:col-start-2">
            <div data-founder-panel aria-hidden="true" className="absolute -right-4 -top-6 bottom-10 left-10 rounded-[2rem] bg-bordeaux md:-right-10 md:-top-10 md:left-16" />
            {/* Ornament-Linien */}
            <svg aria-hidden="true" className="pointer-events-none absolute -left-6 -top-10 z-20 h-[calc(100%+5rem)] w-[calc(100%+3rem)] text-bone/25" viewBox="0 0 100 130" preserveAspectRatio="none" fill="none">
              <path d="M4 0 V130" stroke="currentColor" strokeWidth="0.15" vectorEffect="non-scaling-stroke" />
              <path d="M0 18 H100" stroke="currentColor" strokeWidth="0.15" vectorEffect="non-scaling-stroke" />
              <circle cx="4" cy="18" r="1.2" fill="#c8ff33" />
            </svg>
            <figure data-founder-frame className="relative z-10 overflow-hidden rounded-[1.75rem] bg-charcoal">
              <div data-founder-img className="relative aspect-[4/5]">
                {portrait ? (
                  <Image
                    src={portrait.src}
                    alt="Porträt von Finn Ocker, Gründer von SCALEEVERYTHING"
                    fill
                    priority={false}
                    sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover object-[50%_22%]"
                  />
                ) : (
                  <PortraitSlot />
                )}
                <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(16,16,18,0.75)_100%)]" />
              </div>
              <figcaption className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                <span className="font-display text-lg font-semibold tracking-[-0.02em]">Finn Ocker — Founder</span>
                <span className="text-eyebrow text-bone/60">SCALEEVERYTHING</span>
              </figcaption>
            </figure>
          </div>

          {/* Narrative */}
          <div className="relative z-10 flex flex-col justify-end md:col-span-6 md:col-start-7 md:pt-[14vw] lg:col-span-5 lg:col-start-8">
            <p className="font-display text-[clamp(1.4rem,2.4vw,2.1rem)] font-medium leading-[1.2] tracking-[-0.025em]" data-reveal>
              Ich bin Finn Ocker und verbinde E-Commerce-Know-how, kreatives Design und künstliche Intelligenz. Mit SCALEEVERYTHING unterstütze ich Unternehmen dabei, ihre digitale Präsenz weiterzuentwickeln und Prozesse intelligenter zu gestalten.
            </p>
            <div className="rule mt-10" data-reveal-rule />
            <div className="mt-10 grid gap-8 text-bone/80 sm:grid-cols-2" data-reveal>
              <p className="leading-relaxed">
                Ich bin 19 Jahre alt. Meine Basis ist die Ausbildung zum Kaufmann im E-Commerce – ergänzt um eine KI-Zusatzqualifikation und die Zusatzqualifikation „Internationaler Kaufmann“.
              </p>
              <p className="leading-relaxed">
                Meine Arbeit liegt an der Schnittstelle von Strategie, Kreation und geschäftsorientierter Technologie: Ich frage zuerst, was dein Unternehmen wirklich weiterbringt – und gestalte dann die passende Lösung.
              </p>
            </div>
            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-6 text-sm" data-reveal>
              <div>
                <dt className="text-muted">Ausbildung</dt>
                <dd className="mt-1 font-display">Kaufmann im E-Commerce</dd>
              </div>
              <div>
                <dt className="text-muted">Zusatz</dt>
                <dd className="mt-1 font-display">KI-Qualifikation</dd>
              </div>
              <div>
                <dt className="text-muted">Zusatz</dt>
                <dd className="mt-1 font-display">Internationaler Kaufmann</dd>
              </div>
            </dl>
            <div className="mt-10" data-reveal>
              <MagneticLink href="#kontakt" variant="primary">
                Mit Finn sprechen
              </MagneticLink>
            </div>
          </div>
        </div>
      </RevealGroup>
    </section>
  );
}

/** Gestalteter Platzhalter, solange /public/images/finn-ocker.png fehlt – bewusst ohne Gesicht. */
function PortraitSlot() {
  const isDev = process.env.NODE_ENV === "development";
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_30%,#2a0912,#171719_60%)]">
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(rgba(244,241,235,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(244,241,235,0.05)_1px,transparent_1px)] bg-[size:32px_32px]" />
      <span aria-hidden="true" className="relative font-display text-[clamp(5rem,14vw,10rem)] font-semibold leading-none tracking-[-0.08em] text-transparent [-webkit-text-stroke:1.5px_rgba(244,241,235,0.5)]">
        FO
      </span>
      <span className="text-eyebrow relative mt-4 text-bone/60">Porträt folgt</span>
      {isDev && (
        <span className="relative mt-3 max-w-[16rem] px-4 text-center text-xs text-lime">
          Dev-Hinweis: Foto als <code>public/images/finn-ocker.png</code> ablegen.
        </span>
      )}
    </div>
  );
}
