"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Check, Inbox, Sparkles, Database, PenLine, UserCheck, Play, RotateCcw, Undo2 } from "lucide-react";
import { sampleInquiries, workflowStages, type SampleInquiry } from "@/content/workflow";
import { useReducedMotion } from "@/lib/hooks";

type Phase = "idle" | "running" | "awaiting" | "approved";

const icons = [Inbox, Sparkles, Database, PenLine, UserCheck];
const STEP_MS = 1700;

const stageStatus = [
  "Neue Kundenanfrage ist eingegangen und wird eingelesen …",
  "KI-Kategorisierung: Thema, Absicht und Priorität werden erkannt …",
  "CRM-Eintrag wird angelegt und der passenden Pipeline zugeordnet …",
  "Antwortentwurf wird auf Basis der Kategorie vorbereitet …",
  "Wartet auf menschliche Freigabe – bitte prüfen und entscheiden.",
];

/**
 * Interaktive Mini-Simulation einer KI-gestützten Anfragebearbeitung.
 * Lokale State-Machine, keine Netzwerkaufrufe, keine echten Daten.
 */
export function AiWorkflowDemo() {
  const [sampleId, setSampleId] = useState(sampleInquiries[0].id);
  const [phase, setPhase] = useState<Phase>("idle");
  const [stage, setStage] = useState(-1);
  const [typed, setTyped] = useState(0);
  const [revised, setRevised] = useState(false);
  const [status, setStatus] = useState("Bereit. Wähle eine Beispielanfrage und starte die Demo.");
  const timers = useRef<number[]>([]);
  const reduced = useReducedMotion();
  const groupName = useId();
  const sample = sampleInquiries.find((s) => s.id === sampleId) as SampleInquiry;
  const draftText = revised ? `${sample.draft} (Überarbeitet: Ton angepasst, Rückfrage präzisiert.)` : sample.draft;

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  // Schreibmaschinen-Effekt für den Antwortentwurf
  useEffect(() => {
    if (stage < 3) return;
    const full = draftText.length;
    if (reduced) {
      const t = window.setTimeout(() => setTyped(full), 0);
      return () => window.clearTimeout(t);
    }
    const id = window.setInterval(() => {
      setTyped((n) => {
        if (n >= full) {
          window.clearInterval(id);
          return n;
        }
        return Math.min(full, n + 4);
      });
    }, 16);
    return () => window.clearInterval(id);
  }, [stage, draftText, reduced]);

  function goTo(index: number) {
    setStage(index);
    setStatus(`Schritt ${index + 1} von 5 · ${stageStatus[index]}`);
  }

  function start() {
    clearTimers();
    setRevised(false);
    setTyped(0);
    setPhase("running");
    goTo(0);
    for (let i = 1; i < workflowStages.length; i++) {
      const t = window.setTimeout(() => {
        goTo(i);
        if (i === workflowStages.length - 1) setPhase("awaiting");
      }, i * STEP_MS);
      timers.current.push(t);
    }
  }

  function approve() {
    clearTimers();
    setPhase("approved");
    setStatus("Freigegeben. In einem echten Setup würde die Antwort jetzt versendet – hier wurde nichts gesendet (Simulation).");
  }

  function revise() {
    clearTimers();
    setPhase("running");
    setRevised(true);
    setTyped(0);
    goTo(3);
    setStatus("Zur Überarbeitung zurückgegeben. Der Entwurf wird mit deinem Hinweis neu vorbereitet …");
    timers.current.push(
      window.setTimeout(() => {
        goTo(4);
        setPhase("awaiting");
      }, STEP_MS),
    );
  }

  function reset() {
    clearTimers();
    setPhase("idle");
    setStage(-1);
    setTyped(0);
    setRevised(false);
    setStatus("Zurückgesetzt. Bereit für einen neuen Durchlauf.");
  }

  const running = phase === "running";
  const nodeState = (i: number) => {
    if (phase === "approved") return "done";
    if (i < stage) return "done";
    if (i === stage) return "active";
    return "waiting";
  };

  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-line bg-charcoal">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(244,241,235,0.07)_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 -top-40 size-[30rem] rounded-full bg-bordeaux/30 blur-[120px]" />

      {/* Kopfzeile */}
      <div className="relative flex flex-wrap items-center justify-between gap-4 border-b border-line px-5 py-4 md:px-8">
        <p className="inline-flex items-center gap-2.5 text-sm font-semibold text-bone">
          <span className="size-2 rounded-full bg-lime" aria-hidden="true" />
          Interaktive Demo – simulierte Beispieldaten
        </p>
        <p className="text-xs text-muted">Kein echtes CRM, kein LLM, keine Kundendaten.</p>
      </div>

      <div className="relative grid gap-0 lg:grid-cols-[22rem_1fr]">
        {/* Steuerung */}
        <div className="border-b border-line p-5 md:p-8 lg:border-b-0 lg:border-r">
          <fieldset disabled={running}>
            <legend className="text-eyebrow mb-4 text-muted">1 · Beispielanfrage wählen</legend>
            <div className="space-y-2">
              {sampleInquiries.map((s) => (
                <label
                  key={s.id}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3.5 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-lime ${
                    sampleId === s.id ? "border-bone/60 bg-bone/[0.06]" : "border-line hover:border-line-strong"
                  } ${running ? "cursor-not-allowed opacity-60" : ""}`}
                >
                  <input
                    type="radio"
                    name={groupName}
                    value={s.id}
                    checked={sampleId === s.id}
                    onChange={() => {
                      setSampleId(s.id);
                      if (phase !== "idle") reset();
                    }}
                    className="peer sr-only"
                  />
                  <span
                    aria-hidden="true"
                    className={`grid size-4 place-items-center rounded-full border ${sampleId === s.id ? "border-lime" : "border-bone/40"}`}
                  >
                    {sampleId === s.id && <span className="size-2 rounded-full bg-lime" />}
                  </span>
                  <span className="font-display font-medium">{s.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <p className="text-eyebrow mb-4 mt-8 text-muted">2 · Ablauf steuern</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={start}
              disabled={running || phase === "awaiting"}
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-lime px-5 font-display font-semibold text-obsidian transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Play className="size-4" aria-hidden="true" />
              {phase === "approved" ? "Erneut starten" : "Demo starten"}
            </button>
            <button
              type="button"
              onClick={reset}
              disabled={phase === "idle"}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-line-strong px-5 font-display font-medium transition-colors hover:border-bone disabled:cursor-not-allowed disabled:opacity-40"
            >
              <RotateCcw className="size-4" aria-hidden="true" />
              Zurücksetzen
            </button>
          </div>

          <div className="mt-6 rounded-xl border border-line bg-obsidian/60 p-4">
            <p className="text-eyebrow mb-2 text-muted">Status</p>
            <p role="status" aria-live="polite" aria-atomic="true" className="text-sm leading-relaxed text-bone/90">
              {status}
            </p>
          </div>
        </div>

        {/* Diagramm + Ausgabe */}
        <div className="p-5 md:p-8">
          <ol aria-label="Workflow-Stufen" className="flex flex-col gap-0 md:flex-row md:items-start">
            {workflowStages.map((st, i) => {
              const state = nodeState(i);
              const Icon = icons[i];
              const linkActive = running && stage === i + 1;
              const linkDone = phase === "approved" || stage > i;
              return (
                <li key={st.id} className="flex flex-row md:flex-1 md:flex-col md:items-center md:last:flex-none">
                  <div className="flex flex-col items-center md:w-full md:flex-row">
                    <span
                      className={`relative grid size-12 shrink-0 place-items-center rounded-full border transition-[background-color,border-color,color,box-shadow] duration-500 md:size-14 ${
                        state === "active"
                          ? "ping-soft border-lime bg-lime text-obsidian"
                          : state === "done"
                            ? "border-lime/70 bg-obsidian text-lime"
                            : "border-line-strong bg-obsidian text-bone/50"
                      }`}
                    >
                      {state === "done" ? <Check className="size-5" aria-hidden="true" /> : <Icon className="size-5" aria-hidden="true" />}
                    </span>
                    {i < workflowStages.length - 1 && (
                      <span aria-hidden="true" className="relative h-10 w-px bg-line-strong md:h-px md:w-auto md:flex-1">
                        <span
                          className={`absolute inset-0 origin-top bg-lime transition-transform duration-700 md:origin-left ${
                            linkDone ? "scale-100" : "max-md:scale-y-0 md:scale-x-0"
                          }`}
                        />
                        {linkActive && !reduced && (
                          <>
                            <span className="absolute left-1/2 size-2 -translate-x-1/2 rounded-full bg-lime shadow-[0_0_14px_#c8ff33] [animation:pulse-travel-y_0.9s_ease-in-out_infinite] md:hidden" />
                            <span className="absolute top-1/2 hidden size-2 -translate-y-1/2 rounded-full bg-lime shadow-[0_0_14px_#c8ff33] [animation:pulse-travel-x_0.9s_ease-in-out_infinite] md:block" />
                          </>
                        )}
                      </span>
                    )}
                  </div>
                  <div className="ml-4 pt-2.5 md:ml-0 md:mt-3 md:pr-2 md:pt-0">
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted">0{i + 1}</p>
                    <p className={`font-display text-sm font-medium leading-tight ${state === "waiting" ? "text-bone/60" : "text-bone"}`}>{st.label}</p>
                    <p className="sr-only">
                      {state === "done" ? "erledigt" : state === "active" ? "aktiv" : "wartet"}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>

          {/* Ausgabe */}
          <div className="mt-8 grid gap-4 xl:grid-cols-2">
            <OutputCard title="Kundenanfrage" visible={stage >= 0} placeholder="Noch keine Anfrage – Demo starten.">
              <p className="text-xs text-muted">{sample.from}</p>
              <p className="mt-1 font-display font-semibold">{sample.subject}</p>
              <p className="mt-2 text-sm leading-relaxed text-bone/80">{sample.message}</p>
            </OutputCard>

            <OutputCard title="KI-Kategorisierung" visible={stage >= 1} badge="simuliert">
              <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm">
                <dt className="text-muted">Kategorie</dt>
                <dd>{sample.classification.category}</dd>
                <dt className="text-muted">Absicht</dt>
                <dd>{sample.classification.intent}</dd>
                <dt className="text-muted">Priorität</dt>
                <dd>
                  <span className={sample.classification.priority === "Hoch" ? "text-lime" : ""}>{sample.classification.priority}</span>
                </dd>
                <dt className="text-muted">Tonalität</dt>
                <dd>{sample.classification.tone}</dd>
                <dt className="text-muted">Weiterleitung</dt>
                <dd>{sample.classification.routing}</dd>
              </dl>
            </OutputCard>

            <OutputCard title="CRM-Eintrag" visible={stage >= 2} badge="Beispiel">
              <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm">
                <dt className="text-muted">Pipeline</dt>
                <dd>{sample.crm.pipeline}</dd>
                <dt className="text-muted">Phase</dt>
                <dd>{sample.crm.stage}</dd>
                <dt className="text-muted">Nächster Schritt</dt>
                <dd>{sample.crm.nextStep}</dd>
              </dl>
              <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Tags">
                {sample.crm.tags.map((t) => (
                  <li key={t} className="rounded-full bg-bordeaux/60 px-2.5 py-1 text-xs">
                    {t}
                  </li>
                ))}
              </ul>
            </OutputCard>

            <OutputCard title="Antwortentwurf" visible={stage >= 3} badge="Entwurf">
              <p className="text-sm leading-relaxed text-bone/90">
                <span aria-hidden="true">
                  {draftText.slice(0, Math.max(typed, 0))}
                  {typed < draftText.length && <span className="caret ml-0.5 inline-block w-1.5 after:content-['▍']" />}
                </span>
                <span className="sr-only">{draftText}</span>
              </p>
            </OutputCard>
          </div>

          {/* Freigabe */}
          <div
            className={`mt-4 rounded-2xl border p-5 transition-colors ${
              phase === "awaiting" ? "border-lime/60 bg-lime/[0.04]" : phase === "approved" ? "border-lime/40" : "border-line"
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-eyebrow text-muted">05 · Menschliche Freigabe</p>
                <p className="mt-1 text-sm text-bone/85">
                  {phase === "approved"
                    ? "Freigegeben – in dieser Simulation wurde nichts versendet."
                    : phase === "awaiting"
                      ? "Die KI schlägt vor – du entscheidest. Nichts geht ohne Freigabe raus."
                      : "Jede Antwort wird vor dem Versand von einem Menschen geprüft."}
                </p>
              </div>
              {phase === "awaiting" && (
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={approve}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full bg-lime px-5 font-display text-sm font-semibold text-obsidian"
                  >
                    <Check className="size-4" aria-hidden="true" />
                    Entwurf freigeben
                  </button>
                  <button
                    type="button"
                    onClick={revise}
                    disabled={revised}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-5 font-display text-sm font-medium hover:border-bone disabled:opacity-40"
                  >
                    <Undo2 className="size-4" aria-hidden="true" />
                    Überarbeiten lassen
                  </button>
                </div>
              )}
              {phase === "approved" && (
                <span className="inline-flex items-center gap-2 rounded-full bg-lime/15 px-4 py-2 text-sm font-semibold text-lime">
                  <Check className="size-4" aria-hidden="true" /> Freigegeben
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OutputCard({
  title,
  visible,
  badge,
  placeholder,
  children,
}: {
  title: string;
  visible: boolean;
  badge?: string;
  placeholder?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      aria-label={title}
      className={`rounded-2xl border p-5 transition-[opacity,transform,border-color] duration-700 ease-expo ${
        visible ? "translate-y-0 border-line-strong bg-obsidian/70 opacity-100" : "translate-y-2 border-dashed border-line opacity-50"
      }`}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-eyebrow text-bone/70">{title}</h3>
        {badge && visible && <span className="rounded-full border border-line-strong px-2 py-0.5 text-[0.65rem] uppercase tracking-wider text-muted">{badge}</span>}
      </div>
      {visible ? children : <p className="text-sm text-muted">{placeholder ?? "Wartet auf vorherigen Schritt …"}</p>}
    </section>
  );
}
