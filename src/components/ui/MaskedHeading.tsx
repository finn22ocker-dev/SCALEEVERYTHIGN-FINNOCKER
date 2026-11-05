import type { ElementType, ReactNode } from "react";

type Props = {
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  id?: string;
};

/**
 * Überschrift mit maskierten Zeilen. Der Text steht vollständig im DOM
 * (für Screenreader & ohne JS lesbar). <RevealGroup> animiert `.mask-line > span`.
 */
export function MaskedHeading({ lines, as: Tag = "h2", className = "", lineClassName = "", id }: Props) {
  return (
    <Tag id={id} className={className} data-reveal-lines="">
      {lines.map((line, i) => (
        <span key={i} className={`mask-line ${lineClassName}`}>
          <span>{line}</span>
          {i < lines.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
}
