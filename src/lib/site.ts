export const SITE = {
  name: "Story Craft",
  description:
    "Craft catalog for ≤5-minute adult fiction scripts in love, murder, and crime-of-passion. Strong endings required.",
  url: "https://github.com/Btheriot83/story-craft",
  owner: "Brandon Theriot / Btheriot83",
  disclaimer:
    "Adult fiction craft catalog only. Summarize and cite sources — do not paste substantial copyrighted prose. Examples are original fragments, not full scripts. Not legal advice. No CSAM.",
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
    label: "Love",
    accent: "text-rose-300",
    accentBg: "bg-rose-500/10",
    accentBorder: "border-rose-500/30",
    short: "Intimacy vs wound → earned HEA or HFN",
  },
  murder: {
    label: "Murder",
    accent: "text-sky-300",
    accentBg: "bg-sky-500/10",
    accentBorder: "border-sky-500/30",
    short: "Fair clue craft → reveal that reclassifies plants",
  },
  "crime-of-passion": {
    label: "Crime of Passion",
    accent: "text-amber-300",
    accentBg: "bg-amber-500/10",
    accentBorder: "border-amber-500/30",
    short: "Obsession → irreversible act → aftermath cost",
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
