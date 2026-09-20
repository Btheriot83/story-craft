import type { Metadata } from "next";
import Link from "next/link";
import { Disclaimer } from "@/components/Disclaimer";

export const metadata: Metadata = {
  title: "For agents",
  description: "How to load Story Craft machine surfaces",
};

const surfaces = [
  { href: "/llms.txt", label: "/llms.txt", note: "Read first — contracts & write order" },
  { href: "/schema.md", label: "/schema.md", note: "Field contracts + evaluation object" },
  { href: "/data/genres.json", label: "/data/genres.json", note: "Genre metadata" },
  { href: "/data/beats.jsonl", label: "/data/beats.jsonl", note: "Flat beat index (JSONL)" },
  { href: "/data/frameworks.json", label: "/data/frameworks.json", note: "Framework index" },
  {
    href: "/data/genre-beat-map.json",
    label: "/data/genre-beat-map.json",
    note: "Genre → ordered beat ids",
  },
  {
    href: "/data/beat-sheets/love.json",
    label: "/data/beat-sheets/*.json",
    note: "love · murder · crime-of-passion",
  },
];

export default function AgentsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-rose-400/80">
        Machine-readable
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
        For agents
      </h1>
      <p className="mt-4 text-base leading-relaxed text-zinc-400">
        Prefer static fetches of the surfaces below — do not scrape HTML for
        craft rules. Human training overview:{" "}
        <Link href="/train" className="text-rose-300 hover:underline">
          /train
        </Link>
        .
      </p>

      <section className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-500">
          Load order
        </h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-zinc-400">
          <li>
            Fetch <code className="font-mono text-xs text-zinc-200">/llms.txt</code>
          </li>
          <li>
            Fetch <code className="font-mono text-xs text-zinc-200">/schema.md</code>
          </li>
          <li>
            Pick genre from{" "}
            <code className="font-mono text-xs text-zinc-200">/data/genres.json</code>
          </li>
          <li>
            Load matching beat sheet +{" "}
            <code className="font-mono text-xs text-zinc-200">
              /data/genre-beat-map.json
            </code>
          </li>
          <li>
            Run universal + genre checklists (pages or corpus MD)
          </li>
          <li>
            Emit evaluation object; revise if{" "}
            <code className="font-mono text-xs text-zinc-200">
              ending_strength &lt; 3
            </code>
          </li>
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-500">
          Surfaces
        </h2>
        <ul className="mt-3 divide-y divide-zinc-800 rounded-2xl border border-zinc-800">
          {surfaces.map((s) => (
            <li
              key={s.href}
              className="flex flex-col gap-0.5 px-4 py-3 sm:flex-row sm:items-baseline sm:gap-4"
            >
              <a
                href={s.href}
                className="shrink-0 font-mono text-xs text-rose-300 hover:underline"
              >
                {s.label}
              </a>
              <span className="text-sm text-zinc-400">{s.note}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5 text-sm text-zinc-400">
        <h2 className="text-base font-semibold text-zinc-100">Human pages</h2>
        <p className="mt-2">
          <code className="font-mono text-xs">/</code> ·{" "}
          <code className="font-mono text-xs">/genres/*</code> ·{" "}
          <code className="font-mono text-xs">/beats/*</code> ·{" "}
          <code className="font-mono text-xs">/checklists/*</code> ·{" "}
          <code className="font-mono text-xs">/examples/*</code> ·{" "}
          <code className="font-mono text-xs">/train</code> ·{" "}
          <code className="font-mono text-xs">/sources</code> ·{" "}
          <code className="font-mono text-xs">/cross-cutting</code>
        </p>
      </section>

      <div className="mt-12">
        <Disclaimer />
      </div>
    </div>
  );
}
