"use client";

import { useRef, type ElementType, type ReactNode, type ComponentPropsWithoutRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

type Props<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

/**
 * Generischer Scroll-Reveal-Container. Animiert Nachfahren mit:
 *  - [data-reveal-lines] .mask-line > span  → Zeilen steigen aus der Maske
 *  - [data-reveal]                           → sanftes Fade-up
 *  - [data-reveal-rule]                      → Linie zeichnet sich (scaleX)
 * Inhalte sind im HTML sichtbar; Animation startet erst nach Hydration
 * und nur ohne reduced-motion.
 */
export function RevealGroup<T extends ElementType = "div">({ as, children, className, ...rest }: Props<T>) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      const root = ref.current;

      root.querySelectorAll<HTMLElement>("[data-reveal-lines]").forEach((heading) => {
        gsap.from(heading.querySelectorAll(".mask-line > span"), {
          yPercent: 108,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.09,
          scrollTrigger: { trigger: heading, start: "top 88%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-reveal]")).forEach((el) => {
        gsap.from(el, {
          autoAlpha: 0,
          y: 32,
          duration: 1.1,
          ease: "expo.out",
          delay: Number(el.dataset.revealDelay ?? 0),
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      root.querySelectorAll<HTMLElement>("[data-reveal-rule]").forEach((el) => {
        gsap.from(el, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.4,
          ease: "expo.inOut",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
