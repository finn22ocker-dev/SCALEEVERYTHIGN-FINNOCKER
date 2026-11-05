"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { HeroFallback } from "./HeroFallback";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

type Mode = "pending" | "static" | "low" | "high";

function detectMode(): Mode {
  if (typeof window === "undefined") return "static";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "static";
  const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
  if (nav.connection?.saveData) return "static";
  try {
    const c = document.createElement("canvas");
    const gl = c.getContext("webgl2") || c.getContext("webgl");
    if (!gl) return "static";
  } catch {
    return "static";
  }
  const cores = navigator.hardwareConcurrency ?? 4;
  const memory = nav.deviceMemory ?? 4;
  if (cores <= 2 || memory <= 2) return "static";
  const small = window.matchMedia("(max-width: 767px)").matches;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  return small || coarse || cores <= 4 ? "low" : "high";
}

/**
 * Progressive Enhancement für den Hero:
 * CSS-Fallback ist immer da (auch SSR) – die WebGL-Szene wird nur auf
 * geeigneten Geräten nachgeladen und weich eingeblendet.
 */
export function HeroVisual() {
  const [mode, setMode] = useState<Mode>("pending");
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Erkennung nach dem ersten Paint, damit Text & CTA nicht warten
    const id = requestAnimationFrame(() => setMode(detectMode()));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!wrap.current) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 });
    io.observe(wrap.current);
    const onVis = () => setVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const use3d = mode === "high" || mode === "low";

  return (
    <div ref={wrap} className="absolute inset-0" aria-hidden="true">
      <div className={`absolute inset-0 transition-opacity duration-[1600ms] ${use3d && ready ? "opacity-0" : "opacity-100"}`}>
        <HeroFallback />
      </div>
      {use3d && (
        <div className={`absolute inset-0 transition-opacity duration-[1800ms] ease-out ${ready ? "opacity-100" : "opacity-0"}`}>
          <HeroScene quality={mode} active={visible} onReady={() => setReady(true)} />
        </div>
      )}
    </div>
  );
}
