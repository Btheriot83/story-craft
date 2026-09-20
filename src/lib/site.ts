export const SITE = {
  name: "Story Craft",
  description:
    "A training desk for researched, relationship-led crime narration. Learn, plan, write and grade stories of five minutes or less.",
  url: "https://github.com/Btheriot83/story-craft",
  owner: "Brandon Theriot / Btheriot83",
  disclaimer:
    "Research and writing education. Examples are explicitly fictional exercises, not factual case evidence. Verify every material claim and preserve uncertainty. Craft readiness is not publication approval.",
};

export const GENRE_SLUGS = ["love", "murder", "crime-of-passion"] as const;
export type GenreSlug = (typeof GENRE_SLUGS)[number];

export const EXAMPLE_SLUGS = ["love", "murder", "passion"] as const;
export type ExampleSlug = (typeof EXAMPLE_SLUGS)[number];

export const CHECKLIST_SLUGS = [
  "universal",
  "love",
  "murder",
  "crime-of-passion",
] as const;
export type ChecklistSlug = (typeof CHECKLIST_SLUGS)[number];

export const GENRE_META: Record<
  GenreSlug,
  { label: string; accent: string; accentBg: string; accentBorder: string; short: string }
> = {
  love: {
    label: "Relationship & betrayal",
    accent: "text-rose-300",
    accentBg: "bg-rose-500/10",
    accentBorder: "border-rose-500/30",
    short: "A documented bond → a consequential choice",
  },
  murder: {
    label: "Death & investigation",
    accent: "text-sky-300",
    accentBg: "bg-sky-500/10",
    accentBorder: "border-sky-500/30",
    short: "A discovery → what it establishes and what it cannot",
  },
  "crime-of-passion": {
    label: "Trial & disputed truth",
    accent: "text-amber-300",
    accentBg: "bg-amber-500/10",
    accentBorder: "border-amber-500/30",
    short: "Competing accounts → a precise human consequence",
  },
};

export const ACT_PHASE_STYLES: Record<
  string,
  { label: string; className: string }
> = {
  beginning: {
    label: "Beginning",
    className: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  },
  middle: {
    label: "Middle",
    className: "bg-violet-500/15 text-violet-300 border-violet-500/30",
  },
  ending: {
    label: "Ending",
    className: "bg-rose-500/15 text-rose-300 border-rose-500/30",
  },
};
