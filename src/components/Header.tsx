import Link from "next/link";
const links = [
  { href: "/cross-cutting", label: "Learn" },
  { href: "/#lenses", label: "Plan" },
  { href: "/examples/love", label: "Write" },
  { href: "/train", label: "Grade" },
  { href: "/agents", label: "For agents" },
];
export function Header() {
  return (
    <header className="desk-header">
      <div className="desk-header-inner">
        <Link href="/" className="wordmark">
          Story Craft<span>THE FACTUAL STORY DESK</span>
        </Link>
        <nav aria-label="Main navigation">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
