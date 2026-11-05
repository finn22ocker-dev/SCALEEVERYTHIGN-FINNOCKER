"use client";

import { useRef, type ReactNode, type MouseEvent as ReactMouseEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { useFinePointer, useReducedMotion } from "@/lib/hooks";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "lime";
  className?: string;
  icon?: boolean;
  onClick?: (e: ReactMouseEvent<HTMLAnchorElement>) => void;
};

const styles = {
  primary: "bg-bone text-obsidian hover:bg-lime",
  lime: "bg-lime text-obsidian hover:bg-bone",
  ghost: "border border-line-strong text-bone hover:border-bone hover:bg-bone/5",
} as const;

/**
 * CTA mit magnetischem Verhalten – nur auf Desktop mit feinem Zeiger
 * und ohne reduced-motion. Auf Touch ein normaler Link.
 */
export function MagneticLink({ href, children, variant = "primary", className = "", icon = true, onClick }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const inner = useRef<HTMLSpanElement>(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const magnetic = fine && !reduced;

  function handleMove(e: ReactMouseEvent<HTMLAnchorElement>) {
    if (!magnetic || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    ref.current.style.transform = `translate3d(${x * 0.22}px, ${y * 0.3}px, 0)`;
    if (inner.current) inner.current.style.transform = `translate3d(${x * 0.1}px, ${y * 0.12}px, 0)`;
  }

  function handleLeave() {
    if (!ref.current) return;
    ref.current.style.transform = "";
    if (inner.current) inner.current.style.transform = "";
  }

  return (
    <a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`group relative inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-6 py-3 font-display text-[0.95rem] font-medium tracking-[-0.01em] transition-[background-color,border-color,color,transform] duration-500 ease-expo ${styles[variant]} ${className}`}
    >
      <span ref={inner} className="inline-flex items-center gap-3 transition-transform duration-500 ease-expo">
        {children}
        {icon && (
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 transition-transform duration-500 ease-expo group-hover:rotate-45"
          />
        )}
      </span>
    </a>
  );
}
