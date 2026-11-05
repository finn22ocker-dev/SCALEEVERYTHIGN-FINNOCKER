import type { ServiceId } from "@/content/services";

/** Kleine, rein gestaltete Vorschau-Kompositionen je Leistung (keine Fotos). */
export function ServiceVisual({ id, className = "" }: { id: ServiceId; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden rounded-[1.25rem] bg-[radial-gradient(circle_at_70%_20%,#8c2240_0%,#641529_35%,#2a0912_100%)] ${className}`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(244,241,235,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(244,241,235,0.06)_1px,transparent_1px)] bg-[size:28px_28px]" />
      {id === "ecommerce" && <Shop />}
      {id === "social" && <Social />}
      {id === "web" && <Web />}
      {id === "media" && <Media />}
      {id === "ai" && <Ai />}
    </div>
  );
}

function Shop() {
  return (
    <div className="absolute inset-[12%] grid grid-cols-2 gap-3">
      {[0, 1].map((i) => (
        <div key={i} className="flex flex-col rounded-lg bg-obsidian/85 p-2.5 shadow-2xl">
          <div className={`aspect-[4/5] rounded-md ${i ? "bg-[linear-gradient(160deg,#3a0b18,#8c2240)]" : "bg-[linear-gradient(160deg,#222226,#4a0d1e)]"}`} />
          <div className="mt-2 h-1.5 w-3/4 rounded bg-bone/60" />
          <div className="mt-1.5 flex items-center justify-between">
            <div className="h-1.5 w-1/3 rounded bg-bone/25" />
            <span className="font-display text-[0.6rem] text-lime">€ —</span>
          </div>
          <div className="mt-2 rounded-full bg-bone py-1 text-center font-display text-[0.55rem] font-semibold text-obsidian">
            In den Warenkorb
          </div>
        </div>
      ))}
    </div>
  );
}

function Social() {
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-3">
      {[-8, 0, 8].map((r, i) => (
        <div
          key={i}
          style={{ transform: `rotate(${r}deg) translateY(${i === 1 ? -8 : 10}px)` }}
          className="relative aspect-[9/16] w-[26%] overflow-hidden rounded-xl border border-bone/15 bg-obsidian/80 shadow-2xl"
        >
          <div className="absolute inset-x-2 top-2 flex gap-1">
            {[0, 1, 2].map((b) => (
              <span key={b} className={`h-0.5 flex-1 rounded ${b <= i ? "bg-bone" : "bg-bone/25"}`} />
            ))}
          </div>
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-bordeaux/80 to-transparent" />
          <div className="absolute bottom-3 left-2 right-2 space-y-1">
            <div className="h-1.5 w-4/5 rounded bg-bone/80" />
            <div className="h-1.5 w-1/2 rounded bg-bone/40" />
          </div>
          {i === 1 && <span className="absolute right-2 top-1/2 size-2 rounded-full bg-lime" />}
        </div>
      ))}
    </div>
  );
}

function Web() {
  return (
    <div className="absolute inset-[10%] overflow-hidden rounded-lg border border-bone/15 bg-obsidian/90 shadow-2xl">
      <div className="flex items-center gap-1.5 border-b border-bone/10 px-3 py-2">
        {[0, 1, 2].map((d) => (
          <span key={d} className="size-1.5 rounded-full bg-bone/30" />
        ))}
        <span className="ml-3 h-1.5 w-1/3 rounded bg-bone/10" />
      </div>
      <div className="p-4">
        <div className="font-display text-[1.35rem] font-semibold leading-[0.9] tracking-[-0.05em]">
          DESIGNED
          <br />
          <span className="text-bordeaux-bright">TO LAST.</span>
        </div>
        <div className="mt-3 h-1.5 w-2/3 rounded bg-bone/25" />
        <div className="mt-1.5 h-1.5 w-1/2 rounded bg-bone/15" />
        <div className="mt-4 inline-block rounded-full bg-lime px-3 py-1 font-display text-[0.55rem] font-semibold text-obsidian">
          CTA
        </div>
      </div>
    </div>
  );
}

function Media() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="absolute aspect-[3/4] w-[42%] -translate-x-[30%] rotate-[-9deg] rounded-md bg-bone/90 shadow-2xl" />
      <div className="relative aspect-[3/4] w-[42%] translate-x-[18%] rotate-[5deg] overflow-hidden rounded-md bg-obsidian shadow-2xl">
        <div className="absolute inset-x-0 top-0 h-3/5 bg-[radial-gradient(circle_at_40%_40%,#c0405f,#641529_50%,#1c0509)]" />
        <div className="absolute bottom-3 left-3 right-3 font-display text-[0.8rem] font-semibold leading-none tracking-[-0.04em]">
          SALE
          <br />
          <span className="text-lime">— 03.</span>
        </div>
      </div>
    </div>
  );
}

function Ai() {
  const nodes = [
    [18, 30],
    [50, 18],
    [82, 34],
    [34, 72],
    [70, 74],
  ];
  return (
    <svg viewBox="0 0 100 100" className="absolute inset-0 size-full">
      <g stroke="rgba(244,241,235,0.35)" strokeWidth="0.4" fill="none">
        <path d="M18 30 L50 18 L82 34 L70 74 L34 72 Z M50 18 L34 72 M18 30 L70 74" />
      </g>
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={i === 4 ? 4.5 : 3.2} fill={i === 4 ? "#c8ff33" : "#101012"} stroke="#f4f1eb" strokeWidth="0.5" />
        </g>
      ))}
    </svg>
  );
}
