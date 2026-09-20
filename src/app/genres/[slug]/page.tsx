import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/Markdown";
import { Disclaimer } from "@/components/Disclaimer";
import {
  getGenre,
  getResearchMarkdown,
  isGenreSlug,
} from "@/lib/content";
import { GENRE_META, GENRE_SLUGS, type GenreSlug } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return GENRE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isGenreSlug(slug)) return { title: "Genre not found" };
  const genre = getGenre(slug);
  return {
    title: genre?.display_name ?? slug,
    description: genre?.short_definition,
  };
}

export default async function GenrePage({ params }: Props) {
  const { slug } = await params;
  if (!isGenreSlug(slug)) notFound();
  const genre = getGenre(slug);
  if (!genre) notFound();

  const md = getResearchMarkdown(slug as GenreSlug);
  const meta = GENRE_META[slug as GenreSlug];

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="mb-6 flex flex-wrap items-center gap-3 text-xs text-zinc-500">
        <Link href="/" className="hover:text-zinc-300">
          ← Home
        </Link>
        <span
          className={`rounded-full border px-2 py-0.5 font-medium uppercase tracking-wide ${meta.accentBorder} ${meta.accentBg} ${meta.accent}`}
        >
          {genre.display_name}
        </span>
      </div>

      <p className="text-sm text-zinc-500">{genre.ending_contract}</p>

      <div className="mt-4 flex flex-wrap gap-2 text-sm">
        <Link
          href={`/beats/${slug}`}
          className="rounded-full border border-zinc-700 px-3 py-1 text-zinc-300 hover:border-zinc-500"
        >
          Beat sheet
        </Link>
        <Link
          href={`/checklists/${slug}`}
          className="rounded-full border border-zinc-700 px-3 py-1 text-zinc-300 hover:border-zinc-500"
        >
          Checklist
        </Link>
        <Link
          href={`/examples/${slug === "crime-of-passion" ? "passion" : slug}`}
          className="rounded-full border border-zinc-700 px-3 py-1 text-zinc-300 hover:border-zinc-500"
        >
          Cold-open example
        </Link>
      </div>

      <div className="mt-10">
        <Markdown content={md} />
      </div>

      <div className="mt-12">
        <Disclaimer />
      </div>
    </article>
  );
}
