/**
 * Statische/CSS-Fallback-Komposition für den Hero
 * (reduced-motion, Datensparmodus, kein WebGL, schwache Geräte, vor dem Laden).
 * Liquid-Bordeaux-Form aus geschichteten Gradienten – ohne Bilddateien.
 */
export function HeroFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute left-1/2 top-[38%] aspect-square w-[min(115vw,620px)] -translate-x-1/2 -translate-y-1/2 md:left-[66%] md:top-1/2 md:w-[min(52vw,760px)]">
        {/* Glow */}
        <div className="absolute inset-[-25%] rounded-full bg-[radial-gradient(circle,rgba(140,34,64,0.45)_0%,rgba(100,21,41,0.18)_40%,transparent_70%)] blur-2xl" />
        {/* Liquid-Form */}
        <div
          className="blob-drift absolute inset-[6%] shadow-[inset_-30px_-40px_80px_rgba(0,0,0,0.75),inset_20px_25px_60px_rgba(255,120,150,0.18)]"
          style={{
            borderRadius: "42% 58% 61% 39% / 45% 41% 59% 55%",
            background:
              "radial-gradient(circle at 32% 28%, #f6c8d2 0%, #c0405f 7%, #7a1a33 22%, #4a0d1e 48%, #1c0509 78%), radial-gradient(circle at 72% 78%, rgba(200,255,51,0.12), transparent 40%)",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              borderRadius: "inherit",
              background:
                "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.16) 42%, transparent 52%), radial-gradient(circle at 78% 70%, rgba(255,90,130,0.35), transparent 35%)",
              mixBlendMode: "screen",
            }}
          />
        </div>
        {/* Orbit-Linien */}
        <div className="absolute inset-[-12%] rotate-[-18deg] rounded-[50%] border border-bone/15 [transform:rotateX(68deg)_rotate(-18deg)]" />
        <div className="absolute inset-[-24%] rounded-[50%] border border-bordeaux-bright/40 [transform:rotateX(74deg)_rotate(32deg)]" />
        <span className="absolute right-[2%] top-[46%] size-1.5 rounded-full bg-lime shadow-[0_0_12px_#c8ff33]" />
      </div>
    </div>
  );
}
