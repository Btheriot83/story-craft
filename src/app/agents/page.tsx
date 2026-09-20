import Link from "next/link";
export default function AgentsPage() {
  const links = [
    ["/llms.txt", "Start here", "Loading order and non-negotiables"],
    ["/schema.md", "Output contracts", "Claim ledger, plan and evaluation"],
    [
      "/data/training.json",
      "Editorial policy",
      "Timing targets, gates and rubric",
    ],
    [
      "/data/genres.json",
      "Story lenses",
      "Overlapping lenses using stable legacy slugs",
    ],
    [
      "/data/frameworks.json",
      "Corpus index",
      "Fetchable Markdown and JSON paths",
    ],
    ["/data/beats.jsonl", "Beat index", "One planning moment per line"],
    ["/data/genre-beat-map.json", "Beat map", "Ordered beat IDs for each lens"],
    [
      "/corpus/research/cross-cutting.md",
      "Curriculum",
      "The same text served on the human learning page",
    ],
    [
      "/corpus/frameworks/examples/love-cold-open.md",
      "Complete worked example",
      "Explicitly fictional training case",
    ],
    [
      "/corpus/frameworks/checklists/universal.md",
      "Grading rubric",
      "Hard gates, scores and decision rules",
    ],
  ];
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="eyebrow">The open corpus · v2</p>
      <h1 className="editorial-title">
        Teach the agent
        <br />
        to show its work.
      </h1>
      <p className="mt-5 text-zinc-400 leading-relaxed">
        Fetch the policy, curriculum and evidence contracts before drafting.
        Return the source packet, timeline, claim-linked plan, narration and
        evaluation. Missing central evidence means stop and research. Missing a
        timed read means timing remains unverified.
      </p>
      <div className="mt-10 divide-y divide-zinc-800">
        {links.map(([href, title, detail]) => (
          <a key={href} href={href} className="block py-5">
            <h2 className="text-lg text-zinc-100">
              {title} <span className="text-rose-300">↗</span>
            </h2>
            <p className="mt-1 text-sm text-zinc-400">{detail}</p>
            <code className="mt-2 block break-all text-xs text-rose-300">
              {href}
            </code>
          </a>
        ))}
      </div>
      <p className="mt-8 text-zinc-400">
        Version 2 retires mandatory happy endings, forced solutions and generic
        fiction lanes. Stable URLs remain for compatibility.{" "}
        <Link className="text-rose-300" href="/sources">
          Read the source notes →
        </Link>
      </p>
    </article>
  );
}
