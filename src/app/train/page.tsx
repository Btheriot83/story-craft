"use client";
import { useState } from "react";
import Link from "next/link";
import policy from "../../../data/training.json";
const gateLabels: Record<string, string> = {
  source_support: "Every material claim has a source and locator",
  no_invention: "No invented dialogue, motives, guilt or evidence",
  precise_attribution: "Allegations, testimony and findings stay distinct",
  material_context: "Contradictions and exculpatory context are included",
  current_status: "Latest case status has been checked",
  clear_chronology: "Chronology and flashbacks are clear",
  timed_read: "An actual read has been timed",
  specific_supported_ending: "The ending is specific, supported and human",
  fiction_labeled: "Fiction and reconstruction are labeled",
  copyright_restraint: "Quotations and source use are appropriate",
};
const labels: Record<string, string> = {
  human_spine: "Human spine",
  causality: "Causal progression",
  clarity: "Clarity aloud",
  ending_strength: "Ending strength",
  restraint: "Humane restraint",
};
export default function TrainPage() {
  const [script, setScript] = useState("");
  const [seconds, setSeconds] = useState("");
  const [gates, setGates] = useState<Record<string, string>>({});
  const [scores, setScores] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const words = script.trim() ? script.trim().split(/\s+/u).length : 0;
  const duration = Number(seconds);
  const timed =
    seconds.trim() !== "" && Number.isFinite(duration) && duration > 0;
  const evidenceFail = policy.hard_gates
    .filter(
      (g) =>
        g !== "timed_read" &&
        g !== "specific_supported_ending" &&
        g !== "clear_chronology",
    )
    .some((g) => gates[g] === "fail");
  const timingFail = timed && (duration <= 180 || duration > 300);
  const craftFail =
    policy.hard_gates.some((g) => gates[g] === "fail") ||
    Object.entries(policy.rubric).some(
      ([key, min]) =>
        scores[key] !== undefined &&
        scores[key] !== "" &&
        Number(scores[key]) < min,
    );
  const incomplete =
    !script.trim() ||
    !timed ||
    policy.hard_gates.some((g) => gates[g] !== "pass") ||
    Object.keys(policy.rubric).some((key) => !scores[key]);
  const decision = evidenceFail
    ? "blocked"
    : timingFail || craftFail
      ? "revise"
      : incomplete
        ? "unverified"
        : "pass";
  const evaluation = {
    version: "2",
    mode: "factual",
    narration_word_count: words,
    timed_read_seconds: timed ? duration : null,
    hard_gates: Object.fromEntries(
      policy.hard_gates.map((g) => [
        g,
        g === "timed_read"
          ? timingFail
            ? "fail"
            : timed
              ? gates[g] || "unverified"
              : "unverified"
          : gates[g] || "unverified",
      ]),
    ),
    scores: Object.fromEntries(
      Object.keys(policy.rubric).map((k) => [
        k,
        scores[k] ? Number(scores[k]) : null,
      ]),
    ),
    decision,
    revisions: [],
  };
  async function copy() {
    try {
      await navigator.clipboard.writeText(JSON.stringify(evaluation, null, 2));
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="eyebrow">04 / The grading desk</p>
      <h1 className="editorial-title">
        Evidence before
        <br />
        <em>elegance.</em>
      </h1>
      <p className="mt-5 text-zinc-400 leading-relaxed">
        Use this local worksheet after your source audit. It counts words and
        applies your assessments; it cannot verify facts or judge a story for
        you. Nothing entered here is sent to an AI service or saved after you
        leave.
      </p>
      <div className="mt-6 flex flex-wrap gap-5 text-sm text-rose-300">
        <Link href="/checklists/universal">Read the scoring anchors →</Link>
        <Link href="/examples/love">See an annotated evaluation →</Link>
      </div>
      <section className="mt-10">
        <label htmlFor="narration" className="block text-lg text-zinc-100">
          Narration only
        </label>
        <p id="script-help" className="mt-1 mb-3 text-sm text-zinc-400">
          Exclude notes and citations. Aim for 570–610 words; do not pad for
          scene counts.
        </p>
        <textarea
          id="narration"
          aria-describedby="script-help"
          value={script}
          onChange={(e) => {
            setScript(e.target.value);
            setCopied(false);
          }}
          className="desk-input min-h-64"
          placeholder="Paste your draft here…"
        />
        <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-zinc-300">
            {words} words ·{" "}
            {words === 0
              ? "Awaiting draft"
              : words < 570
                ? "Below calibration target"
                : words > 610
                  ? "Above calibration target"
                  : "Within calibration target"}
          </p>
          <label className="text-sm text-zinc-300">
            Actual read, seconds{" "}
            <input
              className="desk-input ml-2 w-24"
              type="number"
              min="1"
              step="1"
              value={seconds}
              onChange={(e) => {
                setSeconds(e.target.value);
                setCopied(false);
              }}
            />
          </label>
        </div>
        <p className="mt-3 text-xs text-zinc-400">
          Over 180 seconds; preferred through 270; never over 300.{" "}
          {timed && duration > 270 && duration <= 300
            ? "This read is within the ceiling but needs a trimming pass and an editorial reason."
            : ""}
        </p>
      </section>
      <section className="mt-12">
        <h2 className="text-2xl">The hard gates</h2>
        <p className="mt-2 text-sm text-zinc-400">
          Mark pass only after checking evidence. An unchecked gate is
          unverified.
        </p>
        <div className="mt-5 divide-y divide-zinc-800">
          {policy.hard_gates.map((g) => (
            <label
              key={g}
              className="flex items-center justify-between gap-4 py-4 text-sm text-zinc-300"
            >
              <span>{gateLabels[g]}</span>
              <select
                className="desk-input w-32 shrink-0"
                value={gates[g] || "unverified"}
                onChange={(e) => {
                  setGates({ ...gates, [g]: e.target.value });
                  setCopied(false);
                }}
              >
                <option value="unverified">Unverified</option>
                <option value="pass">Pass</option>
                <option value="fail">Fail</option>
              </select>
            </label>
          ))}
        </div>
      </section>
      <section className="mt-12">
        <h2 className="text-2xl">The craft score</h2>
        <p className="mt-2 text-sm text-zinc-400">
          Use the checklist’s anchored 0–3 rubric. Ending requires 3; other
          dimensions require at least 2.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {Object.keys(policy.rubric).map((k) => (
            <label
              key={k}
              className="flex items-center justify-between gap-4 border-b border-zinc-800 py-3 text-sm text-zinc-300"
            >
              {labels[k]}
              <select
                className="desk-input w-24"
                value={scores[k] || ""}
                onChange={(e) => {
                  setScores({ ...scores, [k]: e.target.value });
                  setCopied(false);
                }}
              >
                <option value="">—</option>
                {[0, 1, 2, 3].map((n) => (
                  <option key={n} value={String(n)}>
                    {n}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>
      </section>
      <section className="grade-result mt-12" aria-live="polite">
        <p className="eyebrow">Your recorded assessment</p>
        <h2 className="mt-2 text-3xl capitalize">{decision}</h2>
        <p className="mt-3 text-sm text-zinc-300">
          {decision === "blocked"
            ? "A factual or ethical gate failed. Resolve that issue before craft sign-off."
            : decision === "revise"
              ? "A gate, timing limit or craft threshold failed. Identify the exact passage and repair it."
              : decision === "pass"
                ? "Your recorded gates and scores meet the local rubric. This is self-assessment, not independent verification or publication approval."
                : "Complete the evidence checks, scores and an actual timed read before calling this ready."}
        </p>
        <button onClick={copy} className="primary-link mt-5" type="button">
          {copied ? "Evaluation copied" : "Copy evaluation JSON"}
        </button>
        <details className="mt-5">
          <summary className="cursor-pointer text-sm text-zinc-300">
            View or manually copy the evaluation
          </summary>
          <pre className="mt-3 overflow-x-auto text-xs text-zinc-400">
            {JSON.stringify(evaluation, null, 2)}
          </pre>
        </details>
      </section>
    </article>
  );
}
