import Link from "next/link";

const links = [
  { href: "/#genres", label: "Genres" },
  { href: "/#beats", label: "Beats" },
  { href: "/train", label: "Train" },
  { href: "/agents", label: "Agents" },
  { href: "/sources", label: "Sources" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="group flex flex-col">
          <span className="text-sm font-semibold tracking-tight text-zinc-100 group-hover:text-white">
            Story Craft
          </span>
          <span className="text-[11px] text-zinc-500">≤5-min · Strong endings</span>
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-x-4 gap-y-1 text-sm text-zinc-400">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="transition-colors hover:text-zinc-100"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
