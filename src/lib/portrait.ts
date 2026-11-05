import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { cacheLife } from "next/cache";

export const PORTRAIT_PUBLIC_PATH = "/images/finn-ocker.png";

export type Portrait = { src: string; width: number; height: number };

/**
 * Prüft, ob das echte Gründerfoto unter public/images/finn-ocker.png liegt,
 * und liest dessen Abmessungen. Ergebnis wird gecacht (Teil des statischen Shells).
 * Fehlt die Datei, zeigt die Website einen gestalteten Porträt-Slot – niemals ein Ersatzgesicht.
 */
export async function getPortrait(): Promise<Portrait | null> {
  "use cache";
  cacheLife("max");
  try {
    const file = path.join(process.cwd(), "public", PORTRAIT_PUBLIC_PATH);
    const buf = await readFile(file);
    const isPng = buf.toString("ascii", 1, 4) === "PNG";
    return {
      src: PORTRAIT_PUBLIC_PATH,
      width: isPng ? buf.readUInt32BE(16) : 1200,
      height: isPng ? buf.readUInt32BE(20) : 1500,
    };
  } catch {
    return null;
  }
}
