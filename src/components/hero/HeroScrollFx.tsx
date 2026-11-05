"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * Scroll-Übergang des Heros: Inhalt hebt sich ab und verblasst,
 * die Szene färbt sich in Richtung Bordeaux-Schwarz – ohne Pinning.
 */
export function HeroScrollFx() {
  const ref = useRef<HTMLSpanElement>(null);
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const section = ref.current?.closest("section");
    if (!section) return;
    const content = section.querySelector("[data-hero-content]");
    const visual = section.querySelector("[data-hero-visual]");
    const shade = section.querySelector("[data-hero-shade]");
    const tl = gsap.timeline({
      scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 0.6 },
    });
    tl.to(content, { yPercent: -18, autoAlpha: 0.1, ease: "none" }, 0).to(
      visual,
      { scale: 1.06, ease: "none" },
      0,
    ).to(shade, { opacity: 0.75, ease: "none" }, 0);
  });
  return <span ref={ref} hidden />;
}
