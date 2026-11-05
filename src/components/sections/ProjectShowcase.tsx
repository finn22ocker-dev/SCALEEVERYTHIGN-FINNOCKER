"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { projects, type Project } from "@/content/projects";
import { ProjectVisual } from "./ProjectVisual";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/** Asymmetrisches Raster: Spaltenbreite/Versatz + Bildformat je Position */
const layout = [
  { cell: "md:col-span-7", frame: "aspect-[4/3] md:aspect-[16/11]" },
  { cell: "md:col-span-5 md:mt-40", frame: "aspect-[4/5]" },
  { cell: "md:col-span-5 md:-mt-24", frame: "aspect-[4/5]" },
  { cell: "md:col-span-7 md:mt-16", frame: "aspect-[4/3] md:aspect-[16/11]" },
];

function Badge({ kind }: { kind: Project["kind"] }) {
  if (kind !== "concept") return null;
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-bone/30 bg-obsidian/80 px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-bone backdrop-blur">
      <span className="size-1.5 rounded-full bg-lime" aria-hidden="true" />
      Konzeptprojekt
    </span>
  );
}

export function ProjectShowcase() {
  const [active, setActive] = useState<Project | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const gridRef = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -3.5 },
          {
            yPercent: 3.5,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
      gsap.utils.toArray<HTMLElement>("[data-mask]").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(18% 8% 18% 8% round 1.5rem)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 1.5rem)",
            duration: 1.4,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          },
        );
      });
    },
    { scope: gridRef },
  );

  function openProject(p: Project, btn: HTMLButtonElement) {
    triggerRef.current = btn;
    setActive(p);
    requestAnimationFrame(() => dialogRef.current?.showModal());
  }

  function closeDialog() {
    dialogRef.current?.close();
  }

  return (
    <>
      <ul ref={gridRef} className="grid gap-x-8 gap-y-16 md:grid-cols-12 md:gap-y-12">
        {projects.map((p, i) => (
          <li key={p.slug} className={`group ${layout[i % layout.length].cell}`}>
            <article aria-labelledby={`project-${p.slug}`}>
              <button
                type="button"
                onClick={(e) => openProject(p, e.currentTarget)}
                className="block w-full text-left"
                aria-haspopup="dialog"
                aria-label={`${p.title} – ${p.category} (Konzeptprojekt) ansehen`}
              >
                <div
                  data-mask
                  className={`relative overflow-hidden rounded-[1.5rem] ${layout[i % layout.length].frame}`}
                >
                  <div data-parallax className="absolute -inset-y-[5%] inset-x-0 transition-transform duration-[1200ms] ease-expo group-hover:scale-[1.04]">
                    {p.image ? (
                      <Image src={p.image.src} alt={p.image.alt} fill sizes="(min-width: 768px) 58vw, 100vw" className="object-cover" />
                    ) : (
                      <ProjectVisual visual={p.visual} />
                    )}
                  </div>
                  {/* Bordeaux-Wipe beim Hover */}
                  <div className="absolute inset-0 origin-bottom scale-y-0 bg-bordeaux/35 mix-blend-multiply transition-transform duration-700 ease-expo group-hover:scale-y-100" />
                  <div className="absolute left-4 top-4">
                    <Badge kind={p.kind} />
                  </div>
                  <span className="absolute bottom-4 right-4 inline-flex size-12 items-center justify-center rounded-full bg-bone text-obsidian transition-transform duration-700 ease-expo md:translate-y-3 md:scale-75 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:scale-100 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
                    <ArrowUpRight className="size-5" aria-hidden="true" />
                  </span>
                </div>
                <div className="mt-5 flex items-start justify-between gap-6">
                  <div>
                    <p className="text-eyebrow text-muted">
                      0{i + 1} — {p.category}
                    </p>
                    <h3 id={`project-${p.slug}`} className="mt-2 font-display text-[clamp(1.6rem,3vw,2.6rem)] font-semibold leading-none tracking-[-0.045em]">
                      {p.title}
                    </h3>
                  </div>
                  <p className="max-w-[16rem] text-right text-sm text-bone/60 max-sm:hidden">{p.summary}</p>
                </div>
              </button>
            </article>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-labelledby="project-dialog-title"
        onClose={() => {
          setActive(null);
          triggerRef.current?.focus();
        }}
        onClick={(e) => e.target === dialogRef.current && closeDialog()}
        className="m-auto w-[min(56rem,calc(100vw-2rem))] max-h-[calc(100dvh-2rem)] overflow-auto rounded-[1.5rem] border border-line bg-charcoal p-0 text-bone backdrop:bg-obsidian/80"
      >
        {active && (
          <div>
            <div className="relative aspect-[16/9] overflow-hidden">
              {active.image ? (
                <Image src={active.image.src} alt={active.image.alt} fill sizes="56rem" className="object-cover" />
              ) : (
                <ProjectVisual visual={active.visual} />
              )}
              <div className="absolute left-4 top-4">
                <Badge kind={active.kind} />
              </div>
            </div>
            <div className="p-6 md:p-10">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-eyebrow text-muted">{active.category}</p>
                  <h3 id="project-dialog-title" className="mt-2 font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-none tracking-[-0.05em]">
                    {active.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={closeDialog}
                  className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-line-strong hover:border-bone"
                  aria-label="Projektdetails schließen"
                >
                  <X className="size-5" aria-hidden="true" />
                </button>
              </div>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-bone/85">{active.details}</p>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Schwerpunkte">
                {active.focus.map((f) => (
                  <li key={f} className="rounded-full border border-bone/25 px-3.5 py-1.5 text-sm">
                    {f}
                  </li>
                ))}
              </ul>
              {active.kind === "concept" && (
                <p className="mt-8 border-l-2 border-lime pl-4 text-sm text-muted">
                  Hinweis: Dies ist ein Konzeptprojekt mit fiktiver Marke. Es handelt sich nicht um ein Kundenprojekt; es werden keine Ergebnisse oder Kennzahlen behauptet.
                </p>
              )}
              <a
                href="#kontakt"
                onClick={closeDialog}
                className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-bone px-6 font-display font-medium text-obsidian transition-colors hover:bg-lime"
              >
                Ähnliches Projekt anfragen
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
