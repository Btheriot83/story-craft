import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ActBadge } from "@/components/ActBadge";
import { Disclaimer } from "@/components/Disclaimer";
import { getBeatSheet, getGenre, isGenreSlug } from "@/lib/content";
import { GENRE_META, GENRE_SLUGS, type GenreSlug } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return GENRE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isGenreSlug(slug)) return { title: "Beats not found" };
  const genre = getGenre(slug);
  return {
    title: `${genre?.display_name ?? slug} beats`,
    description: `Beat sheet timeline for ${genre?.display_name ?? slug}`,
  };
}

export default async function BeatsPage({ params }: Props) {
  const { slug } = await params;
  if (!isGenreSlug(slug)) notFound();
  const sheet = getBeatSheet(slug as GenreSlug);
  const genre = getGenre(slug);
  const meta = GENRE_META[slug as GenreSlug];
  const beats = [...sheet.beats].sort((a, b) => a.order - b.order);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="mb-6 flex flex-wrap items-center gap-3 text-xs text-zinc-500">
        <Link href="/" className="hover:text-zinc-300">
          ← Home
        </Link>
        <Link href={`/genres/${slug}`} className={`hover:underline ${meta.accent}`}>
          {genre?.display_name}
        </Link>
      </div>

      <h1 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
        {genre?.display_name} beat sheet
      </h1>
      <p className="mt-3 text-sm text-zinc-500">
        {sheet.id} · ending strength required:{" "}
        <span className="font-medium text-rose-300">
          {sheet.ending_strength_required ?? "high"}
        </span>
        {sheet.word_count_guide ? (
          <>
            {" "}
            · {sheet.word_count_guide.min}–{sheet.word_count_guide.max} words
          </>
        ) : null}
      </p>

      {sheet.ending_fail_modes && sheet.ending_fail_modes.length > 0 ? (
        <div className="mt-6 rounded-xl border border-rose-500/25 bg-rose-500/5 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-rose-300">
            Ending fail modes
          </p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {sheet.ending_fail_modes.map((m) => (
              <li
                key={m}
                className="rounded-full border border-rose-500/20 bg-zinc-950/40 px-2.5 py-0.5 font-mono text-[11px] text-rose-200/90"
              >
                {m}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <ol className="mt-10 space-y-4">
        {beats.map((beat) => (
          <li
            key={beat.id}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-zinc-500">
                #{beat.order}
              </span>
              <ActBadge phase={beat.act_phase} />
              {beat.reveal_role && beat.reveal_role !== "none" ? (
                <span className="rounded-full border border-zinc-700 px-2 py-0.5 text-[10px] uppercase tracking-wide text-zinc-400">
                  {beat.reveal_role}
                </span>
              ) : null}
            </div>
            <h2 className="mt-2 text-lg font-semibold text-zinc-50">
              {beat.name}
            </h2>
            <p className="mt-1 font-mono text-[11px] text-zinc-500">{beat.id}</p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              {beat.purpose}
            </p>
            {beat.duration_hint_sec ? (
              <p className="mt-2 text-xs text-zinc-500">
                ~{beat.duration_hint_sec[0]}–{beat.duration_hint_sec[1]}s spoken
              </p>
            ) : null}
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {beat.must && beat.must.length > 0 ? (
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-emerald-400/80">
                    Must
                  </p>
                  <ul className="mt-1 list-disc space-y-1 pl-4 text-sm text-zinc-400">
                    {beat.must.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {beat.avoid && beat.avoid.length > 0 ? (
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-amber-400/80">
                    Avoid
                  </p>
                  <ul className="mt-1 list-disc space-y-1 pl-4 text-sm text-zinc-400">
                    {beat.avoid.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-8 text-sm text-zinc-500">
        Machine JSON:{" "}
        <a
          href={`/data/beat-sheets/${slug}.json`}
          className="font-mono text-rose-300 hover:underline"
        >
          /data/beat-sheets/{slug}.json
        </a>
      </p>

      <div className="mt-10">
        <Disclaimer />
      </div>
    </div>
  );
}
