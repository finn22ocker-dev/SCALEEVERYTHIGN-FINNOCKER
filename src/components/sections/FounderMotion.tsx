"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/** Maskierter Porträt-Reveal + subtile Tiefenbewegung (Panel vs. Bild). */
export function FounderMotion() {
  const ref = useRef<HTMLSpanElement>(null);
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const section = ref.current?.closest("section");
    if (!section) return;
    const frame = section.querySelector("[data-founder-frame]");
    const img = section.querySelector("[data-founder-img]");
    const panel = section.querySelector("[data-founder-panel]");

    gsap.fromTo(
      frame,
      { clipPath: "inset(100% 0% 0% 0% round 1.75rem)" },
      {
        clipPath: "inset(0% 0% 0% 0% round 1.75rem)",
        duration: 1.6,
        ease: "expo.inOut",
        scrollTrigger: { trigger: frame, start: "top 80%", once: true },
      },
    );
    gsap.fromTo(img, { scale: 1.25 }, { scale: 1, duration: 2, ease: "expo.out", scrollTrigger: { trigger: frame, start: "top 80%", once: true } });
    gsap.fromTo(panel, { yPercent: 8 }, { yPercent: -8, ease: "none", scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true } });
    gsap.fromTo(img, { yPercent: -3 }, { yPercent: 3, ease: "none", scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true } });
  });
  return <span ref={ref} hidden />;
}
