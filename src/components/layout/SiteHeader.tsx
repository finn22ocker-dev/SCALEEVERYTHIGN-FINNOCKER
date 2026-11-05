"use client";

import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { navigation } from "@/content/site";
import { Wordmark } from "@/components/ui/Wordmark";
import { MagneticLink } from "@/components/ui/MagneticLink";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("#start");
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Hintergrund ab leichtem Scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Aktiven Abschnitt markieren
  useEffect(() => {
    const ids = navigation.map((n) => n.href.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  // Mobile-Menü: ESC, Fokusfalle, Scroll-Lock
  useEffect(() => {
    if (!open) return;
    const menu = menuRef.current;
    const focusables = () =>
      Array.from(menu?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []);
    focusables()[0]?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key === "Tab") {
        const list = [toggleRef.current!, ...focusables()];
        const first = list[0];
        const last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onMq);
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled && !open
          ? "border-b border-line bg-obsidian/75 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-6">
        <a href="#start" className="relative z-[2] text-[1.05rem]" aria-label="SCALEEVERYTHING – zum Start">
          <Wordmark />
        </a>

        <nav aria-label="Hauptnavigation" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => {
              const isActive = active === item.href;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "location" : undefined}
                    className={`group relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors ${
                      isActive ? "text-bone" : "text-muted hover:text-bone"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`size-1.5 rounded-full bg-lime transition-transform duration-500 ease-expo ${
                        isActive ? "scale-100" : "scale-0"
                      }`}
                    />
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <MagneticLink href="#kontakt" variant="primary" className="!min-h-10 !px-5 !py-2 text-sm">
              Projekt starten
            </MagneticLink>
          </div>
          <button
            ref={toggleRef}
            type="button"
            className="relative z-[2] inline-flex size-12 items-center justify-center rounded-full border border-line-strong lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3 w-5" aria-hidden="true">
              <span
                className={`absolute left-0 top-0 h-px w-5 bg-bone transition-transform duration-500 ease-expo ${
                  open ? "translate-y-1.5 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-px w-5 bg-bone transition-transform duration-500 ease-expo ${
                  open ? "-translate-y-1.5 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Fullscreen-Menü */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        hidden={!open}
        className="fixed inset-0 z-[1] flex flex-col bg-obsidian lg:hidden"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-1/3 top-1/4 size-[120vw] rounded-full bg-bordeaux/40 blur-[120px]"
        />
        <nav aria-label="Mobile Navigation" className="container-x relative flex flex-1 flex-col justify-center pt-[var(--header-h)]">
          <ul className="space-y-1">
            {navigation.map((item, i) => (
              <li key={item.href} className="overflow-hidden">
                <a
                  href={item.href}
                  onClick={() => close(false)}
                  style={{ "--d": `${0.05 + i * 0.06}s` } as React.CSSProperties}
                  className={`hero-rise flex items-baseline gap-4 py-2 font-display text-[clamp(2.4rem,11vw,4.5rem)] font-semibold leading-none tracking-[-0.05em] ${
                    active === item.href ? "text-bone" : "text-bone/70"
                  }`}
                >
                  <span className="font-sans text-xs font-medium tracking-normal text-lime">0{i + 1}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="container-x relative pb-10">
          <MagneticLink href="#kontakt" variant="primary" className="w-full" onClick={() => close(false)}>
            Projekt starten
          </MagneticLink>
          <p className="mt-6 text-sm text-muted">Digital Experiences. Intelligent Growth.</p>
        </div>
      </div>
    </header>
  );
}
