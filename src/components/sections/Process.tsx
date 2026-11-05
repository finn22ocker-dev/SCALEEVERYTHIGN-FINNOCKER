"use client";

import { useRef, useState } from "react";
import { processSteps } from "@/content/approach";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/** Verbundene Timeline: Linie füllt sich beim Scrollen, Stationen aktivieren sich. */
export function ProcessTimeline() {
  const ref = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(-1);

  useGSAP(
    () => {
      if (!ref.current) return;
      const items = gsap.utils.toArray<HTMLElement>("[data-step]");
      items.forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 62%",
          end: "bottom 62%",
          onEnter: () => setActive((a) => Math.max(a, i)),
          onLeaveBack: () => setActive(i - 1),
        });
      });
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        "[data-progress]",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top 62%", end: "bottom 62%", scrub: true },
        },
      );
    },
    { scope: ref },
  );

  return (
    <ol ref={ref} className="relative">
      <span aria-hidden="true" className="absolute bottom-0 left-[0.6875rem] top-0 w-px bg-line md:left-1/2">
        <span data-progress className="absolute inset-0 origin-top bg-gradient-to-b from-bordeaux-bright to-lime" />
      </span>
      {processSteps.map((step, i) => {
        const on = i <= active;
        const right = i % 2 === 1;
        return (
          <li key={step.key} data-step className="relative grid pb-20 pl-12 last:pb-0 md:grid-cols-2 md:pl-0">
            <span
              aria-hidden="true"
              className={`absolute left-0 top-1 grid size-6 place-items-center rounded-full border transition-colors duration-500 md:left-1/2 md:-translate-x-1/2 ${
                on ? "border-lime bg-obsidian" : "border-line-strong bg-obsidian"
              }`}
            >
              <span className={`size-2 rounded-full transition-[background-color,transform] duration-500 ${on ? "scale-100 bg-lime" : "scale-50 bg-bone/30"}`} />
            </span>
            <div className={`${right ? "md:col-start-2 md:pl-20" : "md:pr-20 md:text-right"}`}>
              <p lang="en" className={`font-display text-[clamp(3rem,7vw,6.5rem)] font-semibold leading-[0.85] tracking-[-0.06em] transition-colors duration-700 ${on ? "text-bone" : "text-bone/20"}`}>
                {step.key}
              </p>
              <h3 className="mt-4 font-display text-xl font-semibold tracking-[-0.02em]">
                <span className="text-lime">0{i + 1}</span> · {step.title}
              </h3>
              <p className={`mt-3 max-w-md leading-relaxed text-bone/75 ${right ? "" : "md:ml-auto"}`}>{step.text}</p>
              <p className="text-eyebrow mt-5 text-muted">Ergebnis: {step.output}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
