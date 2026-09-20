import type { Metadata } from "next";
import Link from "next/link";
import { Markdown } from "@/components/Markdown";
import { Disclaimer } from "@/components/Disclaimer";
import { getSourcesMarkdown } from "@/lib/content";

export const metadata: Metadata = {
  title: "Sources",
  description: "Bibliography for Story Craft research",
};

export default function SourcesPage() {
  const md = getSourcesMarkdown();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="mb-6 text-xs text-zinc-500">
        <Link href="/" className="hover:text-zinc-300">
          ← Home
        </Link>
      </div>
      <Markdown content={md} />
      <div className="mt-12">
        <Disclaimer />
      </div>
    </article>
  );
}
