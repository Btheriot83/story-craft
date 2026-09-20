# Story Craft
An editorial training desk for agents researching and writing relationship-led factual crime narration. Learn → plan → write → grade. Target 570–610 spoken words, actual read strictly over 3:00, preferred through 4:30, hard ceiling 5:00.

## Development
Next.js App Router, TypeScript, Tailwind. Use `npm install`, `npm run dev`; validation commands are `npx tsc --noEmit`, `npm run lint`, `npm run build`. Serve built output with `npm run start`.

## Content and routes
- /cross-cutting: research and writing curriculum.
- /genres/{love,murder,crime-of-passion}: overlapping factual-story lenses; legacy slugs retained.
- /beats/{slug}: adaptable plans.
- /examples/love: full fictional worked example; murder and passion are revision exercises.
- /train: local grading desk; timing estimates never verify an actual read.
- /checklists/universal: hard gates and rubric.
- /sources: primary craft/ethics references.
- /agents: corpus access and agent workflow.

## Source parity
Research lives in research/, checklists/examples in frameworks/, JSON in data/ and frameworks/beat-sheets/. Static fetchable copies live under public/corpus/ and public/data/. Root llms.txt and schema.md have public copies. When changing content, update both copies; framework paths must be fetchable. Version 2 retires the old fiction genre contracts and timing targets. Schema details are in schema.md.

## Scope
Research and narration only. No invented factual scenes, alleged guilt stated as fact, compulsory romance endings or forced solutions. All current examples are explicitly fictional. Craft references do not substitute for case evidence. Production scene counts do not drive prose. No publication or media-generation workflow is included.
