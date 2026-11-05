import type { CSSProperties } from "react";
import { HeroVisual } from "./HeroVisual";
import { HeroScrollFx } from "./HeroScrollFx";
import { MagneticLink } from "@/components/ui/MagneticLink";
import { site } from "@/content/site";

const lines = ["WE BUILD.", "WE CREATE.", "WE SCALE."];

export function Hero() {
  return (
    <section
      id="start"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-obsidian"
    >
      {/* Szene */}
      <div data-hero-visual className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_45%,#2a0912_0%,#160609_35%,#101012_70%)]" />
        <HeroVisual />
        {/* Vignette & Lesbarkeit */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,16,18,0.85)_0%,rgba(16,16,18,0.35)_45%,transparent_70%)] max-md:bg-[linear-gradient(180deg,transparent_25%,rgba(16,16,18,0.65)_60%,#101012_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-obsidian" />
        <div data-hero-shade className="absolute inset-0 bg-[linear-gradient(180deg,#1a0610,#101012)] opacity-0" />
      </div>

      {/* Architektonische Linien */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-[5]">
        <div className="container-x relative h-full">
          <div className="absolute inset-y-0 left-[var(--gutter)] w-px bg-line" />
          <div className="absolute inset-y-0 right-[var(--gutter)] w-px bg-line max-md:hidden" />
        </div>
      </div>

      <div data-hero-content className="container-x relative flex flex-1 flex-col justify-end pb-24 pt-[calc(var(--header-h)+2rem)] md:justify-center md:pb-28">
        <p className="hero-fade text-eyebrow mb-6 flex items-center gap-3 text-muted md:mb-8" style={{ "--d": "0.15s" } as CSSProperties}>
          <span className="inline-block h-px w-8 bg-lime" aria-hidden="true" />
          {site.tagline}
        </p>

        <h1 id="hero-title" className="text-mega max-w-[11ch] uppercase">
          {lines.map((line, i) => (
            <span key={line} className="mask-line">
              <span
                className={`hero-rise ${i === 2 ? "text-transparent [-webkit-text-stroke:1.5px_var(--c-bone)] md:[-webkit-text-stroke:2px_var(--c-bone)]" : ""}`}
                style={{ "--d": `${0.25 + i * 0.12}s` } as CSSProperties}
              >
                {line}
              </span>{" "}
            </span>
          ))}
        </h1>

        <div className="mt-8 grid gap-8 md:mt-12 md:grid-cols-[minmax(0,30rem)_auto] md:items-end md:gap-16">
          <p className="hero-fade max-w-[30rem] text-[1.0625rem] leading-relaxed text-bone/80 md:text-lg" style={{ "--d": "0.7s" } as CSSProperties}>
            Wir entwickeln digitale Erlebnisse, intelligente Automatisierungen und skalierbare Lösungen für Marken mit Ambitionen.
          </p>
          <div className="hero-fade flex flex-col gap-3 sm:flex-row" style={{ "--d": "0.85s" } as CSSProperties}>
            <MagneticLink href="#kontakt" variant="primary">
              Projekt anfragen
            </MagneticLink>
            <MagneticLink href="#leistungen" variant="ghost" icon={false}>
              Leistungen entdecken
            </MagneticLink>
          </div>
        </div>
      </div>

      {/* Scroll-Cue */}
      <a
        href="#statement"
        className="hero-fade absolute bottom-6 right-[var(--gutter)] hidden items-center gap-4 text-eyebrow text-muted transition-colors hover:text-bone md:flex"
        style={{ "--d": "1.2s" } as CSSProperties}
      >
        Scroll
        <span className="relative block h-12 w-px overflow-hidden bg-line">
          <span className="scroll-cue-line absolute inset-0 bg-lime" />
        </span>
      </a>
      <HeroScrollFx />
    </section>
  );
}
