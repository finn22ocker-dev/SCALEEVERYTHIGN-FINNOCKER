const words = ["E-Commerce", "Shopify", "Webdesign", "Social Media", "Mediengestaltung", "KI-Automatisierung", "Performance", "Kampagnen"];

/** Dekoratives Laufband zwischen den Szenen (bei reduced-motion statisch). */
export function Marquee() {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {words.map((w) => (
        <li key={w} className="flex items-center">
          <span className="px-6 font-display text-[clamp(1.5rem,3vw,2.6rem)] font-medium tracking-[-0.04em] text-bone/80">{w}</span>
          <span aria-hidden="true" className="size-2 rotate-45 bg-lime/80" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="overflow-hidden border-y border-line bg-charcoal py-6" aria-label="Leistungsfelder">
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
