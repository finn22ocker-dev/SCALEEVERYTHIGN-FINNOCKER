import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="container-x flex min-h-dvh flex-col justify-center py-20">
      <p className="text-eyebrow text-lime">404</p>
      <h1 className="text-giant mt-6 uppercase">
        Lost in <span className="text-bordeaux-bright">scale.</span>
      </h1>
      <p className="mt-6 max-w-md text-lg text-bone/75">Diese Seite gibt es nicht (mehr).</p>
      <Link href="/" className="mt-10 inline-flex min-h-12 w-fit items-center rounded-full bg-bone px-6 font-display font-medium text-obsidian hover:bg-lime">
        Zur Startseite
      </Link>
    </main>
  );
}
