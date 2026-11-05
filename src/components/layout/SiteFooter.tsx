import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { navigation, site, microcopy } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-obsidian pt-20">
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-2xl font-medium leading-tight tracking-[-0.03em]">{microcopy.standOut}</p>
            <a href="#kontakt" className="mt-6 inline-flex items-center gap-2 text-lime underline-offset-4 hover:underline">
              Projekt anfragen
            </a>
            {site.contactEmail && (
              <p className="mt-3">
                <a href={`mailto:${site.contactEmail}`} className="text-bone/80 hover:text-bone">
                  {site.contactEmail}
                </a>
              </p>
            )}
          </div>
          <nav aria-label="Footer-Navigation" className="md:col-span-3 md:col-start-7">
            <p className="text-eyebrow mb-4 text-muted">Navigation</p>
            <ul className="space-y-2">
              {navigation.map((n) => (
                <li key={n.href}>
                  <a href={`/${n.href}`} className="text-bone/80 transition-colors hover:text-bone">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-3">
            <p className="text-eyebrow mb-4 text-muted">Rechtliches</p>
            <ul className="space-y-2">
              <li>
                <Link href="/impressum" className="text-bone/80 hover:text-bone">
                  Impressum
                </Link>
              </li>
              <li>
                <Link href="/datenschutz" className="text-bone/80 hover:text-bone">
                  Datenschutz
                </Link>
              </li>
            </ul>
            {site.socials.length > 0 && (
              <>
                <p className="text-eyebrow mb-4 mt-8 text-muted">Social</p>
                <ul className="space-y-2">
                  {site.socials.map((s) => (
                    <li key={s.href}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-bone/80 hover:text-bone">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="mt-20 select-none whitespace-nowrap text-center font-display text-[12vw] font-semibold leading-[0.78] tracking-[-0.07em] text-bone"
      >
        SCALE<span className="text-bordeaux">EVERYTHING</span>
      </p>

      <div className="container-x flex flex-col gap-4 border-t border-line py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © <span>{site.name}</span> · {site.founder}
        </p>
        <p className="max-sm:hidden">{site.tagline}</p>
        <a href="#main" className="inline-flex items-center gap-2 text-bone/80 hover:text-lime">
          Nach oben <ArrowUp className="size-4" aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
