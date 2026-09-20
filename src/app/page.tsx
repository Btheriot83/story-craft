import Link from "next/link";
import { Disclaimer } from "@/components/Disclaimer";
import { getGenres } from "@/lib/content";
import { GENRE_META, type GenreSlug } from "@/lib/site";

export default function HomePage() {
  const genres = getGenres();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-rose-400/80">
        Craft catalog · Adult fiction
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
        Story Craft
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-400">
        Public human-browsable and machine-readable craft catalog for{" "}
        <strong className="font-medium text-zinc-200">≤5-minute</strong> (≤~750
        words) scripts in{" "}
        <strong className="font-medium text-zinc-200">
          love / murder / crime-of-passion
        </strong>
        . Beginning, middle, and ending are first-class. Weak endings fail.
      </p>

      <div className="mt-8 rounded-2xl border border-rose-500/35 bg-rose-500/10 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-rose-300">
          Strong ending gate
        </p>
        <p className="mt-2 text-sm leading-relaxed text-zinc-300">
          Fade-outs, soft landings, and unearned declarations are a hard{" "}
          <span className="font-semibold text-rose-200">FAIL</span> — even when
          the cold open is brilliant. Score{" "}
          <code className="rounded bg-zinc-900 px-1.5 py-0.5 font-mono text-xs text-zinc-200">
            ending_strength
          </code>{" "}
          0–3; production requires <strong className="text-zinc-100">3</strong>.
          Plan crisis → climax → resonant coda before drafting prose.
        </p>
        <Link
          href="/train"
          className="mt-3 inline-block text-sm font-medium text-rose-300 hover:text-rose-200"
        >
          Train the agent →
        </Link>
      </div>

      <section id="genres" className="mt-14 scroll-mt-24">
        <h2 className="text-lg font-semibold text-zinc-100">Three genres</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Pick a lane. Do not conflate engines.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {genres.map((g) => {
            const meta = GENRE_META[g.slug as GenreSlug];
            return (
              <Link
                key={g.id}
                href={`/genres/${g.slug}`}
                className={`rounded-2xl border p-4 transition hover:bg-zinc-900/40 ${meta.accentBorder} ${meta.accentBg}`}
              >
                <p className={`text-xs font-medium uppercase tracking-wide ${meta.accent}`}>
                  Genre
                </p>
                <h3 className="mt-1 text-lg font-semibold text-zinc-50">
                  {g.display_name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {g.short_definition}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      <section id="beats" className="mt-14 scroll-mt-24">
        <h2 className="text-lg font-semibold text-zinc-100">Beat sheets</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Ordered timelines with act-phase badges.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {genres.map((g) => (
            <Link
              key={g.slug}
              href={`/beats/${g.slug}`}
              className="rounded-full border border-zinc-700 bg-zinc-900/50 px-4 py-2 text-sm text-zinc-300 transition hover:border-zinc-500 hover:text-zinc-100"
            >
              {g.display_name} beats
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-14 grid gap-3 sm:grid-cols-2">
        <Link
          href="/train"
          className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5 transition hover:border-zinc-600"
        >
          <h2 className="text-base font-semibold text-zinc-100">Train</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Success criteria, FAIL rules, per-genre contracts.
          </p>
        </Link>
        <Link
          href="/agents"
          className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5 transition hover:border-zinc-600"
        >
          <h2 className="text-base font-semibold text-zinc-100">Agents</h2>
          <p className="mt-2 text-sm text-zinc-400">
            How to load /llms.txt, /schema.md, /data/*.
          </p>
        </Link>
        <Link
          href="/checklists/universal"
          className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5 transition hover:border-zinc-600"
        >
          <h2 className="text-base font-semibold text-zinc-100">Checklists</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Universal + genre QA including Strong Ending gate.
          </p>
        </Link>
        <Link
          href="/examples/love"
          className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5 transition hover:border-zinc-600"
        >
          <h2 className="text-base font-semibold text-zinc-100">Examples</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Annotated cold opens — fragments, not full scripts.
          </p>
        </Link>
      </section>

      <div className="mt-12">
        <Disclaimer />
      </div>
    </div>
  );
}
