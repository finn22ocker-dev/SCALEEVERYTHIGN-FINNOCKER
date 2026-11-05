"use client";

import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { services, type ServiceId } from "@/content/services";
import { ServiceVisual } from "./ServiceVisual";
import { MagneticLink } from "@/components/ui/MagneticLink";
import { useFinePointer, useReducedMotion } from "@/lib/hooks";
import { selectService } from "@/lib/events";

/**
 * Fünf nummerierte, aufklappbare Service-Zeilen.
 * Desktop (feiner Zeiger): schwebende Vorschau folgt dem Cursor.
 * Touch/Tastatur: Vorschau erscheint im aufgeklappten Detail.
 */
export function ServiceList() {
  const [open, setOpen] = useState<ServiceId | null>(null);
  const [hover, setHover] = useState<ServiceId | null>(null);
  const [last, setLast] = useState<ServiceId>(services[0].id);
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const listRef = useRef<HTMLUListElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  const showPreview = fine && hover !== null && hover !== open;

  // Vorschau weich dem Cursor folgen lassen
  useEffect(() => {
    if (!fine) return;
    let raf = 0;
    const tick = () => {
      const p = pos.current;
      const k = reduced ? 1 : 0.14;
      p.x += (p.tx - p.x) * k;
      p.y += (p.ty - p.y) * k;
      if (previewRef.current) {
        previewRef.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(2rem, -55%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [fine, reduced]);

  function onMove(e: React.MouseEvent) {
    const rect = listRef.current?.getBoundingClientRect();
    if (!rect) return;
    pos.current.tx = e.clientX - rect.left;
    pos.current.ty = e.clientY - rect.top;
  }

  return (
    <div className="relative">
      <ul ref={listRef} className="relative border-t border-line" onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
        {services.map((s) => {
          const isOpen = open === s.id;
          const panelId = `service-panel-${s.id}`;
          const btnId = `service-btn-${s.id}`;
          return (
            <li key={s.id} className="group/row relative border-b border-line" onMouseEnter={() => {
                setHover(s.id);
                setLast(s.id);
              }}>
              {/* Bordeaux-Fläche wischt beim Hover/Öffnen hinein */}
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 origin-bottom bg-bordeaux transition-transform duration-700 ease-expo ${
                  isOpen ? "scale-y-100" : "scale-y-0 group-hover/row:scale-y-100"
                }`}
              />
              <h3 className="relative">
                <button
                  id={btnId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : s.id)}
                  className="grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-4 px-1 py-7 text-left md:grid-cols-[5rem_1.2fr_1fr_auto] md:gap-8 md:px-4 md:py-10"
                >
                  <span className={`font-display text-sm transition-colors ${isOpen ? "text-lime" : "text-muted group-hover/row:text-lime"}`}>
                    {s.number}
                  </span>
                  <span className="min-w-0 hyphens-auto font-display text-[clamp(1.45rem,4.2vw,3.75rem)] font-semibold leading-[0.95] tracking-[-0.045em] transition-transform duration-700 ease-expo md:group-hover/row:translate-x-3">
                    {s.title}
                  </span>
                  <span className="hidden text-base text-bone/70 md:block">{s.teaser}</span>
                  <span
                    className={`inline-flex size-11 items-center justify-center rounded-full border transition-[transform,background-color,border-color,color] duration-500 ease-expo ${
                      isOpen ? "rotate-45 border-lime bg-lime text-obsidian" : "border-line-strong text-bone"
                    }`}
                    aria-hidden="true"
                  >
                    <Plus className="size-5" />
                  </span>
                </button>
              </h3>
              <div id={panelId} role="region" aria-labelledby={btnId} className="accordion-panel relative" data-open={isOpen}>
                <div inert={!isOpen}>
                  <div className="grid gap-8 px-1 pb-10 md:grid-cols-[5rem_1.2fr_1fr] md:gap-8 md:px-4 md:pb-14">
                    <div className="hidden md:block" />
                    <div>
                      <p className="max-w-xl text-[1.0625rem] leading-relaxed text-bone/85 md:hidden">{s.teaser}</p>
                      <p className="mt-3 max-w-xl text-[1.0625rem] leading-relaxed text-bone/85 md:mt-0">{s.description}</p>
                      <ul className="mt-6 flex flex-wrap gap-2" aria-label={`Leistungsumfang ${s.title}`}>
                        {s.deliverables.map((d) => (
                          <li key={d} className="rounded-full border border-bone/25 px-3.5 py-1.5 text-sm text-bone/90">
                            {d}
                          </li>
                        ))}
                      </ul>
                      <MagneticLink href="#kontakt" variant="primary" className="mt-8" onClick={() => selectService(s.id)}>
                        {s.title} anfragen
                      </MagneticLink>
                    </div>
                    <div>
                      <ServiceVisual id={s.id} className="aspect-[4/3] w-full max-w-md" />
                      <p className="mt-4 font-display text-lg italic tracking-[-0.02em] text-bone/80">{s.statement}</p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Schwebende Hover-Vorschau (nur Desktop, dekorativ) */}
      {fine && (
        <div
          ref={previewRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-10 hidden w-[19rem] lg:block"
        >
          <div
            className={`transition-[opacity,scale,rotate] duration-500 ease-expo ${
              showPreview ? "scale-100 rotate-0 opacity-100" : "scale-75 -rotate-6 opacity-0"
            }`}
          >
            {services.map((s) => (
              <div key={s.id} className={last === s.id ? "block" : "hidden"}>
                <ServiceVisual id={s.id} className="aspect-[4/3] w-full shadow-[0_30px_80px_rgba(0,0,0,0.6)]" />
                <p className="mt-3 text-right font-display text-sm italic text-bone/80">{s.statement}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
