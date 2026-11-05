type Props = { variant?: "inline" | "split"; className?: string };

/** Wortmarke: `SCALEEVERYTHING` oder `SCALE / EVERYTHING` */
export function Wordmark({ variant = "inline", className = "" }: Props) {
  if (variant === "split") {
    return (
      <span className={`font-display font-semibold tracking-[-0.03em] ${className}`}>
        SCALE <span className="text-bordeaux-bright" aria-hidden="true">/</span> EVERYTHING
      </span>
    );
  }
  return (
    <span className={`font-display font-semibold tracking-[-0.03em] ${className}`}>
      SCALE<span className="text-muted">EVERYTHING</span>
    </span>
  );
}
