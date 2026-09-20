import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/Markdown";
import { Disclaimer } from "@/components/Disclaimer";
import {
  exampleGenreLabel,
  exampleToGenreSlug,
  getExampleMarkdown,
  isExampleSlug,
} from "@/lib/content";
import { EXAMPLE_SLUGS, GENRE_META } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return EXAMPLE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isExampleSlug(slug)) return { title: "Example not found" };
  return {
    title: `${exampleGenreLabel(slug)} cold open`,
    description: "Annotated cold-open fragment — not a full script",
  };
}

export default async function ExamplePage({ params }: Props) {
  const { slug } = await params;
  if (!isExampleSlug(slug)) notFound();
  const md = getExampleMarkdown(slug);
  const genreSlug = exampleToGenreSlug(slug);
  const meta = GENRE_META[genreSlug];

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="mb-6 flex flex-wrap items-center gap-3 text-xs text-zinc-500">
        <Link href="/" className="hover:text-zinc-300">
          ← Home
        </Link>
        <Link href={`/genres/${genreSlug}`} className={meta.accent}>
          {exampleGenreLabel(slug)}
        </Link>
      </div>

      <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 px-4 py-3 text-sm text-zinc-300">
        <strong className="text-amber-200">Fragment only.</strong> These
        annotated cold opens illustrate beginning technique. They are{" "}
        <em>not</em> full ≤5-min scripts — full pieces must still clear the
        Strong Ending gate.
      </div>

      <nav className="mt-6 flex flex-wrap gap-2">
        {EXAMPLE_SLUGS.map((s) => (
          <Link
            key={s}
            href={`/examples/${s}`}
            className={`rounded-full border px-3 py-1 text-sm ${
              s === slug
                ? "border-rose-500/40 bg-rose-500/10 text-rose-200"
                : "border-zinc-700 text-zinc-400 hover:border-zinc-500"
            }`}
          >
            {exampleGenreLabel(s)}
          </Link>
        ))}
      </nav>

      <div className="mt-8">
        <Markdown content={md} />
      </div>

      <div className="mt-12">
        <Disclaimer />
      </div>
    </article>
  );
}
