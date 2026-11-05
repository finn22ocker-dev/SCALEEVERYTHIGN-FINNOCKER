"use client";

import { useEffect } from "react";

/**
 * Kurzes Marken-Intro „SCALE → EVERYTHING“ (≈1,7 s).
 * Die Animation ist reines CSS und blendet sich selbst aus – Inhalte werden nie
 * blockiert, auch nicht bei JS-Fehlern. Klick oder ESC überspringt sofort.
 * Wiederkehrende Besucher (Session) und reduced-motion sehen es nicht.
 */
export function Intro() {
  useEffect(() => {
    const skip = () => {
      document.documentElement.dataset.intro = "done";
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && skip();
    const t = window.setTimeout(skip, 2600);
    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel", skip, { passive: true, once: true });
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", skip);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      onClick={() => (document.documentElement.dataset.intro = "done")}
      className="intro fixed inset-0 z-[90] flex cursor-pointer items-center justify-center bg-obsidian"
    >
      <div className="grid h-[1.02em] place-items-center overflow-hidden font-display text-[clamp(2.4rem,11vw,9rem)] font-semibold leading-none tracking-[-0.055em]">
        <span className="intro-a block [grid-area:1/1]">SCALE</span>
        <span className="intro-b block text-bordeaux-bright [grid-area:1/1]">EVERYTHING</span>
      </div>
      <span className="text-eyebrow absolute bottom-8 left-1/2 -translate-x-1/2 text-muted">
        Digital Experiences. Intelligent Growth.
      </span>
    </div>
  );
}
