import fs from "fs";
import path from "path";
import type { BeatSheet, GenreRecord, GenresFile } from "./types";
import {
  CHECKLIST_SLUGS,
  EXAMPLE_SLUGS,
  GENRE_SLUGS,
  type ChecklistSlug,
  type ExampleSlug,
  type GenreSlug,
} from "./site";

const ROOT = process.cwd();
const RESEARCH_DIR = path.join(ROOT, "research");
const FRAMEWORKS_DIR = path.join(ROOT, "frameworks");
const DATA_DIR = path.join(ROOT, "data");
const BEAT_SHEETS_DIR = path.join(FRAMEWORKS_DIR, "beat-sheets");
const CHECKLISTS_DIR = path.join(FRAMEWORKS_DIR, "checklists");
const EXAMPLES_DIR = path.join(FRAMEWORKS_DIR, "examples");

function readText(absPath: string): string {
  return fs.readFileSync(absPath, "utf8");
}

function readJson<T>(absPath: string): T {
  return JSON.parse(readText(absPath)) as T;
}

export function isGenreSlug(slug: string): slug is GenreSlug {
  return (GENRE_SLUGS as readonly string[]).includes(slug);
}

export function isChecklistSlug(slug: string): slug is ChecklistSlug {
  return (CHECKLIST_SLUGS as readonly string[]).includes(slug);
}

export function isExampleSlug(slug: string): slug is ExampleSlug {
  return (EXAMPLE_SLUGS as readonly string[]).includes(slug);
}

export function getGenres(): GenreRecord[] {
  const data = readJson<GenresFile>(path.join(DATA_DIR, "genres.json"));
  return data.genres;
}

export function getGenre(slug: string): GenreRecord | undefined {
  return getGenres().find((g) => g.slug === slug);
}

export function getResearchMarkdown(slug: GenreSlug): string {
  return readText(path.join(RESEARCH_DIR, `${slug}.md`));
}

export function getCrossCuttingMarkdown(): string {
  return readText(path.join(RESEARCH_DIR, "cross-cutting.md"));
}

export function getSourcesMarkdown(): string {
  return readText(path.join(RESEARCH_DIR, "sources.md"));
}

export function getBeatSheet(slug: GenreSlug): BeatSheet {
  return readJson<BeatSheet>(path.join(BEAT_SHEETS_DIR, `${slug}.json`));
}

export function getChecklistMarkdown(slug: ChecklistSlug): string {
  return readText(path.join(CHECKLISTS_DIR, `${slug}.md`));
}

const EXAMPLE_FILE: Record<ExampleSlug, string> = {
  love: "love-cold-open.md",
  murder: "murder-cold-open.md",
  passion: "passion-cold-open.md",
};

export function getExampleMarkdown(slug: ExampleSlug): string {
  return readText(path.join(EXAMPLES_DIR, EXAMPLE_FILE[slug]));
}

export function exampleGenreLabel(slug: ExampleSlug): string {
  if (slug === "passion") return "Crime of Passion";
  if (slug === "love") return "Love";
  return "Murder";
}

export function exampleToGenreSlug(slug: ExampleSlug): GenreSlug {
  if (slug === "passion") return "crime-of-passion";
  return slug;
}
