# Story Craft data contract · v2
Existing /genres/love, /genres/murder and /genres/crime-of-passion routes remain. Their meaning is now overlapping factual-story lenses. Version 1 fiction contracts, happy-ending requirements and compulsory solved mysteries are retired.

## Policy
/data/training.json contains editorial targets. Spoken_minutes_target.min = 3 is exclusive; max = 4.5 is preferred, not the hard ceiling. Hard ceiling is 300 seconds. Narration word_count_guide = 570–610; word count alone cannot pass timing.

## Claim
Required: id (string), claim (string), source (URL or archive identifier), locator (page/paragraph/time), speaker (string), date (ISO date or documented uncertainty), status (documented_fact | allegation | testimony | finding | later_interpretation | disputed | unknown), contradictions (array), permitted_wording (string). A source record supports only the claim actually contained in it.

## Plan
principal, relationship, central_question, known_outcome, missing_evidence; timeline array with date/event/claim_ids; moments array with time_cue/action/change/claim_ids; opening; ending with claim_ids. Unknown evidence remains explicitly unknown.

## Evaluation
Return:
```json
{
  "version": "2",
  "mode": "factual",
  "narration_word_count": 590,
  "timed_read_seconds": null,
  "hard_gates": {
    "source_support": "unverified",
    "no_invention": "unverified",
    "precise_attribution": "unverified",
    "material_context": "unverified",
    "current_status": "unverified",
    "clear_chronology": "unverified",
    "timed_read": "unverified",
    "specific_supported_ending": "unverified",
    "fiction_labeled": "unverified",
    "copyright_restraint": "unverified"
  },
  "scores": {
    "human_spine": null,
    "causality": null,
    "clarity": null,
    "ending_strength": null,
    "restraint": null
  },
  "decision": "unverified",
  "revisions": []
}
```
This is a shape example, not a completed evaluation. mode is factual or fictional_exercise. Each gate is pass, fail or unverified. Scores are null until assessed, then integers 0–3. Each revision includes passage, issue, repair and claim_ids. Pass requires all gates pass, ending_strength 3 and other scores >=2. Evidence failure means blocked; craft failure means revise; missing verification means unverified. Fictional exercise results never establish factual publication readiness.

## Static corpus
/data/frameworks.json indexes fetchable /corpus Markdown and beat sheets. /data/beats.jsonl has one beat per line, with genre and beat_sheet_id. /data/genre-beat-map.json maps each legacy slug to ordered beat IDs. Human pages and static Markdown use the same source content. Keep copies synchronized when editing.
