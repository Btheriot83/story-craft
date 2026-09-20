import Link from "next/link";
import { SITE } from "@/lib/site";

export function Disclaimer({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <p className="text-xs leading-relaxed text-zinc-500">
        Adult fiction craft · summarize + cite only · original examples · not
        legal advice. Owner: {SITE.owner}.{" "}
        <Link href="/sources" className="underline underline-offset-2 hover:text-zinc-300">
          Sources
        </Link>
      </p>
    );
  }

  return (
    <aside className="rounded-xl border border-amber-500/25 bg-amber-500/5 px-4 py-3 text-sm leading-relaxed">
      <p className="font-medium text-amber-200/90">Disclaimer</p>
      <p className="mt-1 text-zinc-400">{SITE.disclaimer}</p>
      <p className="mt-2 text-xs text-zinc-500">Owner: {SITE.owner}</p>
    </aside>
  );
}
