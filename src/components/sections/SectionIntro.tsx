import type { ReactNode } from "react";
import { MaskedHeading } from "@/components/ui/MaskedHeading";

type Props = {
  number: string;
  label: string;
  id: string;
  lines: ReactNode[];
  aside?: ReactNode;
};

/** Einheitlicher, editorialer Abschnittskopf: Nummer, Label, maskierte Headline, optionaler Begleittext. */
export function SectionIntro({ number, label, id, lines, aside }: Props) {
  return (
    <div className="mb-16 grid gap-10 md:mb-24 lg:grid-cols-12 lg:items-end lg:gap-8">
      <div className="lg:col-span-8">
        <p className="text-eyebrow mb-8 flex items-center gap-3 text-muted" data-reveal>
          <span className="text-lime">{number}</span> {label}
        </p>
        <MaskedHeading id={id} className="text-giant uppercase" lines={lines} />
      </div>
      {aside && (
        <div className="max-w-md text-lg leading-relaxed text-bone/75 lg:col-span-4" data-reveal>
          {aside}
        </div>
      )}
    </div>
  );
}
