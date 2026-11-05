import type { ProjectVisual as Visual } from "@/content/projects";

/** CSS-Kompositionen für Konzeptprojekte – keine fremden Bilder, keine Fake-Screens realer Kunden. */
export function ProjectVisual({ visual }: { visual: Visual }) {
  switch (visual) {
    case "shop":
      return <ShopConcept />;
    case "redesign":
      return <RedesignConcept />;
    case "social":
      return <SocialConcept />;
    case "workflow":
      return <WorkflowConcept />;
  }
}

function ShopConcept() {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,#8c2240,#3a0b18_55%,#160609)]">
      <div className="absolute inset-x-[8%] top-[10%] bottom-0 overflow-hidden rounded-t-2xl border border-bone/10 bg-obsidian shadow-2xl">
        <div className="flex items-center justify-between border-b border-bone/10 px-5 py-3 font-display text-[0.65rem] tracking-[0.3em]">
          <span>MAISON NOIR</span>
          <span className="flex gap-4 text-bone/50">
            <span>SHOP</span>
            <span>EDIT</span>
            <span className="text-lime">BAG · 1</span>
          </span>
        </div>
        <div className="grid h-full grid-cols-[1.1fr_1fr]">
          <div className="relative m-4 rounded-xl bg-[radial-gradient(circle_at_50%_35%,#c0405f,#641529_40%,#1c0509_80%)]">
            <div className="absolute left-1/2 top-[42%] size-[42%] -translate-x-1/2 -translate-y-1/2 rounded-[45%_55%_50%_50%] bg-[radial-gradient(circle_at_30%_30%,#f6c8d2,#7a1a33_40%,#2a0912)] shadow-[0_30px_60px_rgba(0,0,0,0.6)]" />
          </div>
          <div className="space-y-3 p-5 pt-6">
            <div className="text-eyebrow text-bone/50">Kollektion 01</div>
            <div className="font-display text-[clamp(1.1rem,2.2vw,2rem)] font-semibold leading-[0.95] tracking-[-0.04em]">
              Objet
              <br />
              Rouge
            </div>
            <div className="h-1.5 w-4/5 rounded bg-bone/20" />
            <div className="h-1.5 w-3/5 rounded bg-bone/15" />
            <div className="flex gap-2 pt-2">
              {["S", "M", "L"].map((s, i) => (
                <span key={s} className={`grid size-7 place-items-center rounded-full border text-[0.6rem] ${i === 1 ? "border-bone bg-bone text-obsidian" : "border-bone/25"}`}>
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-3 rounded-full bg-bone py-2 text-center font-display text-[0.65rem] font-semibold text-obsidian">In den Warenkorb</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RedesignConcept() {
  return (
    <div className="absolute inset-0 bg-[#e9e5dd] text-obsidian">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,16,18,0.08)_1px,transparent_1px)] bg-[size:12.5%_100%]" />
      <div className="relative flex h-full flex-col justify-between p-[7%]">
        <div className="flex justify-between font-display text-[0.65rem] tracking-[0.3em]">
          <span>ATELIER NORD</span>
          <span className="opacity-50">PROJEKTE — BÜRO — KONTAKT</span>
        </div>
        <div>
          <div className="font-display text-[clamp(2rem,5.5vw,5rem)] font-semibold leading-[0.85] tracking-[-0.06em]">
            Räume,
            <br />
            <span className="text-bordeaux">die bleiben.</span>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="aspect-[4/5] bg-obsidian" />
            <div className="aspect-[4/5] bg-bordeaux" />
            <div className="aspect-[4/5] bg-[#c8c2b6]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SocialConcept() {
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-[3%] bg-[linear-gradient(140deg,#171719,#2a0912_60%,#641529)]">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{ transform: `translateY(${[18, -14, 26][i]}px) rotate(${[-6, 0, 5][i]}deg)` }}
          className="relative aspect-[9/16] w-[25%] overflow-hidden rounded-2xl border border-bone/10 bg-obsidian shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
        >
          <div className={`absolute inset-0 ${["bg-[radial-gradient(circle_at_30%_30%,#c0405f,#2a0912_70%)]", "bg-[#f4f1eb]", "bg-[radial-gradient(circle_at_70%_70%,#8c2240,#101012_70%)]"][i]}`} />
          <div className="absolute inset-x-3 top-3 flex gap-1">
            {[0, 1, 2, 3].map((b) => (
              <span key={b} className={`h-0.5 flex-1 rounded ${b <= i ? (i === 1 ? "bg-obsidian" : "bg-bone") : i === 1 ? "bg-obsidian/20" : "bg-bone/25"}`} />
            ))}
          </div>
          <div className={`absolute bottom-[12%] left-3 right-3 font-display text-[clamp(0.8rem,1.6vw,1.4rem)] font-semibold leading-[0.9] tracking-[-0.04em] ${i === 1 ? "text-obsidian" : ""}`}>
            {["DROP 01", "PULSE / COLLECTIVE", "NOW LIVE"][i]}
          </div>
          {i === 1 && <span className="absolute right-3 top-8 size-2.5 rounded-full bg-bordeaux" />}
        </div>
      ))}
    </div>
  );
}

function WorkflowConcept() {
  const steps = ["Anfrage", "KI", "CRM", "Entwurf", "Freigabe"];
  return (
    <div className="absolute inset-0 bg-obsidian">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(100,21,41,0.6),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(244,241,235,0.12)_1px,transparent_1px)] bg-[size:22px_22px]" />
      <div className="relative flex h-full items-center px-[7%]">
        <div className="flex w-full items-center">
          {steps.map((s, i) => (
            <div key={s} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center gap-2">
                <span
                  className={`grid size-[clamp(2rem,4.5vw,3.5rem)] place-items-center rounded-full border font-display text-[0.65rem] ${
                    i === 4 ? "border-lime bg-lime text-obsidian" : "border-bone/30 bg-charcoal"
                  }`}
                >
                  0{i + 1}
                </span>
                <span className="text-[0.6rem] uppercase tracking-[0.2em] text-bone/60">{s}</span>
              </div>
              {i < steps.length - 1 && <span className="mx-1 mb-6 h-px flex-1 bg-gradient-to-r from-bone/40 to-lime/60" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
