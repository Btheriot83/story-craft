# Story Craft

Public **human-browsable** and **machine-readable** craft catalog for ≤5-minute (≤~750 words) adult fiction scripts in three genres:

| Genre | Promise |
|-------|---------|
| **Love** | Intimacy vs wound → earned HEA or HFN |
| **Murder** | Fair clue craft → reveal that reclassifies plants |
| **Crime of Passion** | Obsession → irreversible act → aftermath cost |

**Strong endings are non-negotiable.** Fade-outs and soft landings = FAIL (`ending_strength` must be 3).

Owner: Brandon Theriot / Btheriot83

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # serve production
npm run lint
```

Stack: Next.js 16 · App Router · TypeScript · Tailwind 4 · free Vercel-ready (no paid deps).

## Routes

| Path | What |
|------|------|
| `/` | Landing — genres, pitch, ending gate |
| `/genres/[slug]` | Research (`love` · `murder` · `crime-of-passion`) |
| `/beats/[slug]` | Beat sheet timeline + act badges |
| `/checklists/[slug]` | Universal + genre QA checklists |
| `/examples/[slug]` | Cold-open fragments (`love` · `murder` · `passion`) |
| `/train` | Success criteria + FAIL rules + contracts |
| `/agents` | How to load machine surfaces |
| `/sources` | Bibliography |
| `/cross-cutting` | Shared craft notes |

## Machine surfaces (static)

Prefer these over scraping HTML:

| URL | Source |
|-----|--------|
| `/llms.txt` | Agent briefing (site-path version) |
| `/schema.md` | Field contracts + evaluation object |
| `/data/genres.json` | Genre metadata |
| `/data/beats.jsonl` | Flat beat index |
| `/data/frameworks.json` | Framework index |
| `/data/genre-beat-map.json` | Genre → ordered beat ids |
| `/data/beat-sheets/{slug}.json` | Full beat sheets |

Corpus also lives at repo root: `research/`, `frameworks/`, `data/`, `llms.txt`, `schema.md`.

## Deploy (Vercel free)

1. Push to GitHub: `https://github.com/Btheriot83/story-craft`
2. Import the repo in [Vercel](https://vercel.com) (Hobby / free)
3. Framework preset: Next.js — defaults fine
4. Deploy

## Non-negotiables

- Adult fiction craft only. No CSAM.
- Summarize + cite — no substantial copyrighted prose.
- Original micro-examples only (fragments, not full scripts sold as complete).
- Beginning / Middle / Ending are first-class; weak endings fail QA.

## License / disclaimer

Educational craft catalog. Not legal advice. See site footer disclaimer.
