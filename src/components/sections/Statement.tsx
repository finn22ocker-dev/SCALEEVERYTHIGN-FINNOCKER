"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { microcopy } from "@/content/site";

/**
 * Signature-Scroll: „THINK BIGGER.“ → „SCALE EVERYTHING.“
 * Ohne JS / bei reduced-motion: beide Aussagen statisch untereinander.
 * Mit Motion: CSS-sticky Bühne (kein GSAP-Pin) + gescrubbte Timeline.
 */
export function Statement() {
  const root = useRef<HTMLElement>(null);
  const [enhanced, setEnhanced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setEnhanced(!mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useGSAP(
    () => {
      if (!enhanced || !root.current) return;
      const q = gsap.utils.selector(root);
      ScrollTrigger.refresh();
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.8 },
      });
      tl.fromTo(q("[data-a]"), { scale: 0.82, autoAlpha: 0.25 }, { scale: 1, autoAlpha: 1, duration: 0.25 })
        .to(q("[data-bg]"), { backgroundColor: "#641529", duration: 0.35 }, 0.1)
        .to(q("[data-a]"), { scale: 1.9, autoAlpha: 0, filter: "blur(6px)", duration: 0.3 }, 0.35)
        .fromTo(
          q("[data-b-line]"),
          { yPercent: 110 },
          { yPercent: 0, stagger: 0.06, duration: 0.25 },
          0.48,
        )
        .fromTo(q("[data-rule]"), { scaleX: 0 }, { scaleX: 1, duration: 0.3 }, 0.55)
        .to(q("[data-bg]"), { backgroundColor: "#101012", duration: 0.3 }, 0.62)
        .fromTo(q("[data-micro]"), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.15 }, 0.75)
        .to({}, { duration: 0.1 });
    },
    { scope: root, dependencies: [enhanced] },
  );

  if (!enhanced) {
    return (
      <section id="statement" ref={root} aria-label="Markenstatement" className="bg-obsidian py-28 md:py-40">
        <div className="container-x space-y-10 text-center">
          <p className="text-giant text-bone/60">THINK BIGGER.</p>
          <p className="text-giant">
            SCALE <span className="text-bordeaux-bright">EVERYTHING.</span>
          </p>
          <p className="text-eyebrow text-muted">{microcopy.standOut}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="statement" ref={root} aria-label="Markenstatement" className="relative h-[240svh]">
      <div data-bg className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden bg-obsidian">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.55)_100%)]" />
        <div className="container-x relative grid place-items-center text-center">
          <p data-a className="text-giant will-change-transform [grid-area:1/1]">
            THINK BIGGER.
          </p>
          <div className="[grid-area:1/1]">
            <p className="text-giant">
              <span className="mask-line">
                <span data-b-line>SCALE</span>
              </span>
              <span className="mask-line">
                <span data-b-line className="text-transparent [-webkit-text-stroke:1.5px_var(--c-bone)] md:[-webkit-text-stroke:2px_var(--c-bone)]">
                  EVERYTHING.
                </span>
              </span>
            </p>
            <div data-rule className="mx-auto mt-10 h-px w-40 origin-center bg-lime" />
            <p data-micro className="text-eyebrow mt-6 text-bone/70">
              {microcopy.standOut}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
