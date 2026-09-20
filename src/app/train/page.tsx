import type { Metadata } from "next";
import Link from "next/link";
import { Disclaimer } from "@/components/Disclaimer";
import { getGenres } from "@/lib/content";
import { GENRE_META, type GenreSlug } from "@/lib/site";

export const metadata: Metadata = {
  title: "Train the agent",
  description: "Success criteria, FAIL rules, and per-genre contracts",
};

const FAIL_ROWS = [
  {
    n: 1,
    rule: "Weak / fade-out / soft-landing ending",
    detail: "ending_strength < 3",
  },
  {
    n: 2,
    rule: "Missing beginning, middle, or ending",
    detail: "All three act phases are first-class",
  },
  {
    n: 3,
    rule: "Over ~5:00 spoken",
    detail: "~750–900+ words without justification",
  },
  {
    n: 4,
    rule: "Love: no clear HEA or HFN",
    detail: "Ambiguous “maybe” fails",
  },
  {
    n: 5,
    rule: "Murder: unsolved shrug OR invented reveal",
    detail: "Fair play required",
  },
  {
    n: 6,
    rule: "Passion: act off-page OR no aftermath cost",
    detail: "Irreversible act + cost on page",
  },
  { n: 7, rule: "CSAM / prohibited content", detail: "Hard ban" },
  {
    n: 8,
    rule: "Substantial copyrighted prose pasted",
    detail: "Summarize + cite only",
  },
];

export default function TrainPage() {
  const genres = getGenres();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-rose-400/80">
        Agent training
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
        Train the agent
      </h1>
      <p className="mt-4 text-base leading-relaxed text-zinc-400">
        Brilliant hooks do not compensate for weak endings. Load contracts from{" "}
        <Link href="/agents" className="text-rose-300 hover:underline">
          /agents
        </Link>{" "}
        and machine URLs under{" "}
        <code className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-xs">
          /data/*
        </code>
        .
      </p>

      <section className="mt-12">
        <h2 className="text-lg font-semibold text-zinc-100">
          Success criteria
        </h2>
        <div className="mt-4 overflow-x-auto rounded-xl border border-zinc-800">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead className="bg-zinc-900/80 text-xs uppercase tracking-wide text-zinc-500">
              <tr>
                <th className="px-4 py-3">Phase</th>
                <th className="px-4 py-3">Must deliver</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-zinc-400">
              <tr>
                <td className="px-4 py-3 font-medium text-emerald-300">
                  Beginning
                </td>
                <td className="px-4 py-3">
                  Cold open → stake → care in ~30–60s; plant echo token; genre
                  promise signaled
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-violet-300">Middle</td>
                <td className="px-4 py-3">
                  Causal escalation; midpoint turn; no sag; character pressure;
                  clear timeline
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-rose-300">Ending</td>
                <td className="px-4 py-3">
                  Crisis → climax → resonant coda; genre promise kept;{" "}
                  <strong className="text-zinc-200">ending_strength = 3</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-lg font-semibold text-zinc-100">
          FAIL rules — weak endings
        </h2>
        <p className="mt-2 text-sm text-zinc-500">
          Any row fails the script. Production requires ending_strength 3.
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-rose-500/25">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="bg-rose-500/10 text-xs uppercase tracking-wide text-rose-300/90">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Failure</th>
                <th className="px-4 py-3">Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-zinc-400">
              {FAIL_ROWS.map((row) => (
                <tr key={row.n}>
                  <td className="px-4 py-3 font-mono text-xs text-zinc-500">
                    {row.n}
                  </td>
                  <td className="px-4 py-3 text-zinc-200">{row.rule}</td>
                  <td className="px-4 py-3">{row.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-lg font-semibold text-zinc-100">
          Per-genre contracts
        </h2>
        <ul className="mt-4 space-y-3">
          {genres.map((g) => {
            const meta = GENRE_META[g.slug as GenreSlug];
            return (
              <li
                key={g.id}
                className={`rounded-2xl border p-4 ${meta.accentBorder} ${meta.accentBg}`}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className={`text-base font-semibold ${meta.accent}`}>
                    {g.display_name}
                  </h3>
                  <Link
                    href={`/genres/${g.slug}`}
                    className="text-xs text-zinc-400 hover:text-zinc-200"
                  >
                    Research →
                  </Link>
                </div>
                <p className="mt-2 text-sm text-zinc-300">{g.ending_contract}</p>
                <p className="mt-1 text-xs text-zinc-500">{g.short_definition}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-12 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5">
        <h2 className="text-base font-semibold text-zinc-100">
          Next steps for agents
        </h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-zinc-400">
          <li>
            Read{" "}
            <a href="/llms.txt" className="font-mono text-rose-300 hover:underline">
              /llms.txt
            </a>
          </li>
          <li>
            Load{" "}
            <a href="/schema.md" className="font-mono text-rose-300 hover:underline">
              /schema.md
            </a>{" "}
            +{" "}
            <a
              href="/data/genres.json"
              className="font-mono text-rose-300 hover:underline"
            >
              /data/genres.json
            </a>
          </li>
          <li>
            Apply beat sheet + checklists; emit evaluation object
          </li>
          <li>
            Human overview:{" "}
            <Link href="/agents" className="text-rose-300 hover:underline">
              /agents
            </Link>
          </li>
        </ol>
      </section>

      <div className="mt-12">
        <Disclaimer />
      </div>
    </div>
  );
}
