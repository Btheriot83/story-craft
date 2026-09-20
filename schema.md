# Story Craft — Schemas & Contracts (Agent Training)

Machine-readable files live in `data/`. Narrative craft lives in `research/` and `frameworks/`.

## Global constraints

| Field | Rule |
|-------|------|
| Genres | Only `love`, `murder`, `crime-of-passion` |
| Spoken length | 2–5 minutes (hard max 5:00) |
| Words | Ideal 600–750; soft max ~900 |
| Structure | **Beginning + Middle + Ending** all required |
| Ending | **`ending_strength` must be `high`** — weak/fade endings **FAIL** |
| Content | Adult fiction craft only; no CSAM; no substantial copyrighted verbatim text |

---

## `data/genres.json`

```json
{
  "version": "string",
  "genres": [
    {
      "id": "genre-love | genre-murder | genre-crime-of-passion",
      "display_name": "string",
      "slug": "love | murder | crime-of-passion",
      "short_definition": "string",
      "sibling_notes": "string — how it differs from siblings",
      "beat_sheet_id": "beats-*-v1",
      "checklist": "path",
      "research": "path",
      "example": "path",
      "spoken_minutes_target": {"min": 2, "max": 5},
      "word_count_guide": {"min": 400, "max": 750},
      "ending_contract": "string — genre-specific ending promise"
    }
  ]
}
```

---

## Beat sheet (`frameworks/beat-sheets/*.json`)

```json
{
  "id": "beats-{genre}-v1",
  "genre": "love|murder|crime-of-passion",
  "version": "1",
  "spoken_minutes_target": {"min": 2, "max": 5},
  "word_count_guide": {"min": 400, "max": 750, "ideal": 650},
  "ending_strength_required": "high",
  "ending_fail_modes": ["fade_out", "..."],
  "timeline_patterns": ["..."],
  "character_depth_rules": ["..."],
  "opening_hook_patterns": ["..."],
  "ending_patterns": ["..."],
  "beats": [ Beat ]
}
```

### Beat object

| Field | Type | Notes |
|-------|------|-------|
| `id` | string | Stable, e.g. `love.hook` |
| `order` | int | 1-based sequence |
| `name` | string | Display |
| `act_phase` | enum | **`beginning` \| `middle` \| `ending`** — required |
| `purpose` | string | Why the beat exists |
| `duration_hint_sec` | [int, int] | Approximate spoken window |
| `must` | string[] | Pass criteria |
| `avoid` | string[] | Fail criteria |
| `reveal_role` | enum | `none` \| `plant` \| `payoff` \| `twist` |
| `ending_strength` | string? | On ending-phase beats: `required_high` |
| `citations` | {title,url,note}[] | Craft sources |

**Invariant:** Every beat sheet MUST include ≥1 `beginning`, ≥1 `middle`, and ≥2 `ending` beats. Ending beats are non-negotiable.

---

## `data/beats.jsonl`

One JSON object per line — flattened beats across genres.

Required keys: `id`, `genre`, `beat_sheet_id`, `order`, `name`, `act_phase`, `purpose`, `duration_hint_sec`, `must`, `avoid`, `reveal_role`, `citations`  
Optional: `ending_strength`

---

## `data/frameworks.json`

Index of beat sheets, checklists, examples, research with:

- `ending_strength_required_global`: `"high"`
- `weak_ending_policy`: `"fail"`
- each framework `path`, `type`, optional `strong_ending_gate: true`

---

## Script evaluation object (agents SHOULD emit)

When scoring or accepting a draft script:

```json
{
  "genre": "love|murder|crime-of-passion",
  "word_count": 0,
  "estimated_spoken_sec": 0,
  "act_coverage": {
    "beginning": true,
    "middle": true,
    "ending": true
  },
  "ending_strength": 0,
  "ending_strength_max": 3,
  "ending_fail_flags": [],
  "checklist_path": "frameworks/checklists/....md",
  "pass": false,
  "notes": []
}
```

### Ending strength rubric

| Score | Definition |
|------:|------------|
| 3 | Decisive change + resonance + genre promise kept |
| 2 | Clear climax but soft/rushed coda |
| 1 | Twist/act without meaning or plant |
| 0 | Fade-out, shrug, unresolved soft landing |

### Hard fail (`pass` MUST be false) if any:

1. `ending_strength < 3`
2. Missing beginning, middle, or ending coverage
3. `estimated_spoken_sec > 300`
4. Fade-out / ambiguous uncommitted ending (love)
5. Unsolved shrug or cheat reveal (murder)
6. Off-page act or no aftermath cost (crime-of-passion)
7. Wrong genre engine (e.g. passion graded as fair-play murder without label)

---

## Checklist contract

Files in `frameworks/checklists/`:

- `universal.md` — all genres; includes **Strong Ending Gate**
- `love.md` / `murder.md` / `crime-of-passion.md` — genre gates

Agents must run universal + genre checklist. Any Strong Ending FAIL box → script FAIL.

---

## Example files

`frameworks/examples/*-cold-open.md` are **annotated beginning fragments**, not complete stories. They demonstrate hooks/plants only. Production scripts still require full middle + strong ending.
