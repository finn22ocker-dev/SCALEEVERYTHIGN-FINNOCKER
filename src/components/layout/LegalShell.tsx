import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { Wordmark } from "@/components/ui/Wordmark";
import { SiteFooter } from "./SiteFooter";

export function LegalShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <header className="border-b border-line">
        <div className="container-x flex h-[var(--header-h)] items-center justify-between">
          <Link href="/" aria-label="SCALEEVERYTHING – zur Startseite">
            <Wordmark />
          </Link>
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-bone/80 hover:text-bone">
            <ArrowLeft className="size-4" aria-hidden="true" /> Zur Startseite
          </Link>
        </div>
      </header>
      <main id="main" tabIndex={-1} className="container-x py-20 outline-none md:py-28">
        <h1 className="text-headline uppercase">{title}</h1>
        <div role="note" className="mt-10 flex max-w-3xl gap-4 rounded-2xl border border-[#ffb547]/50 bg-[#ffb547]/[0.06] p-6 text-sm leading-relaxed">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-[#ffb547]" aria-hidden="true" />
          <p>
            <strong>Platzhalter – nicht veröffentlichungsreif.</strong> Diese Seite enthält nur eine Struktur mit Platzhaltern. Der Inhaber muss alle Pflichtangaben selbst ergänzen und vor der Veröffentlichung rechtlich prüfen lassen (z. B. durch eine Anwältin/einen Anwalt oder einen seriösen Rechtstext-Generator). Es werden hier keine Rechtsaussagen getroffen.
          </p>
        </div>
        <div className="legal mt-14 max-w-3xl space-y-10 leading-relaxed text-bone/85 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-[-0.02em] [&_h2]:text-bone [&_p]:mt-3 [&_li]:mt-1 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5 [&_.ph]:rounded [&_.ph]:bg-bordeaux/50 [&_.ph]:px-1.5 [&_.ph]:py-0.5 [&_.ph]:font-mono [&_.ph]:text-[0.85em] [&_.ph]:text-bone">
          {children}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
