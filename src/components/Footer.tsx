import Link from "next/link";
import { Disclaimer } from "./Disclaimer";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-800/80">
      <div className="mx-auto max-w-3xl space-y-4 px-4 py-10 sm:px-6">
        <Disclaimer compact />
        <div className="flex flex-wrap gap-4 text-xs text-zinc-500">
          <Link href="/train" className="hover:text-zinc-300">
            Train
          </Link>
          <Link href="/agents" className="hover:text-zinc-300">
            Agents
          </Link>
          <Link href="/sources" className="hover:text-zinc-300">
            Sources
          </Link>
          <Link href="/cross-cutting" className="hover:text-zinc-300">
            Cross-cutting
          </Link>
          <a
            href={SITE.url}
            className="hover:text-zinc-300"
            rel="noopener noreferrer"
            target="_blank"
          >
            GitHub
          </a>
        </div>
        <p className="text-[11px] text-zinc-600">
          {SITE.owner} · Factual story training · Evidence before elegance
        </p>
      </div>
    </footer>
  );
}
