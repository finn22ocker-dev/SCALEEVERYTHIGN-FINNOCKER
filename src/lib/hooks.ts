"use client";

import { useSyncExternalStore } from "react";

function subscribeMedia(query: string) {
  return (cb: () => void) => {
    const mql = window.matchMedia(query);
    mql.addEventListener("change", cb);
    return () => mql.removeEventListener("change", cb);
  };
}

/** SSR-sicherer Media-Query-Hook (Server-Snapshot = `serverDefault`). */
export function useMediaQuery(query: string, serverDefault = false) {
  return useSyncExternalStore(
    subscribeMedia(query),
    () => window.matchMedia(query).matches,
    () => serverDefault,
  );
}

export function useReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)", false);
}

export function useFinePointer() {
  return useMediaQuery("(hover: hover) and (pointer: fine)", false);
}
