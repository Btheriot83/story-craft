import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/Markdown";
import { Disclaimer } from "@/components/Disclaimer";
import { getChecklistMarkdown, isChecklistSlug } from "@/lib/content";
import { CHECKLIST_SLUGS } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CHECKLIST_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return { title: `${slug} checklist` };
}

export default async function ChecklistPage({ params }: Props) {
  const { slug } = await params;
  if (!isChecklistSlug(slug)) notFound();
  const md = getChecklistMarkdown(slug);

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="mb-6 flex flex-wrap items-center gap-3 text-xs text-zinc-500">
        <Link href="/" className="hover:text-zinc-300">
          ← Home
        </Link>
        <span className="text-zinc-600">Checklists</span>
      </div>

      <nav className="mb-8 flex flex-wrap gap-2">
        {CHECKLIST_SLUGS.map((s) => (
          <Link
            key={s}
            href={`/checklists/${s}`}
            className={`rounded-full border px-3 py-1 text-sm ${
              s === slug
                ? "border-rose-500/40 bg-rose-500/10 text-rose-200"
                : "border-zinc-700 text-zinc-400 hover:border-zinc-500"
            }`}
          >
            {s}
          </Link>
        ))}
      </nav>

      <Markdown content={md} />

      <div className="mt-12">
        <Disclaimer />
      </div>
    </article>
  );
}
