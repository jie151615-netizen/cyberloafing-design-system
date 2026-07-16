---
name: cyberloafing-design
description: Use this skill to generate well-branded interfaces and assets for 《赛博摸鱼指南》/ Cyberloafing Manual — a bilingual (EN/中文) satirical design system about 摸鱼 (cyberloafing). Contains colors, type, HarmonyOS Sans fonts, prop + scene illustrations, and reusable zine components for production or throwaway prototypes/mocks.
user-invocable: true
---

Read `readme.md` first — it holds the full brand context, content voice, visual
foundations, and iconography rules. Then explore the other files:

- `styles.css` + `tokens/` — the CSS custom properties (colors, type, spacing). Link
  `styles.css` and style with the `--*` variables; never hard-code brand hex.
- `assets/fonts/` — HarmonyOS Sans (Latin master; CJK falls back via the font stack).
- `assets/illustrations/objects/` — clean isolated prop PNGs (cup, headphones, snack…).
- `assets/illustrations/scenes/` — full comic artboards (reference; text is baked in).
- `components/` — reusable primitives (FishMark, SectionHeader, PageBadge, RegisterTag,
  StampStrip, StarIndex, MethodCard, ProductCard). Each has a `.d.ts` + `.prompt.md`.
- `ui_kits/zine/` — a worked, interactive recreation of the manual.

Core brand cues to keep: bilingual EN-led headings with a **red Chinese subtitle**;
navy ink + red + coral + mint on white; ALL-CAPS HarmonyOS Sans Black display; deadpan
"instruction manual" voice; Risk / Leisure / Realization star indices; the 浅/中/高
loafing registers (#EBC3C6/coral/red); the outline **fish** mark. No emoji, no gradients,
flat surfaces, generous white margins.

If creating visual artifacts (slides, mocks, throwaway prototypes), copy the assets you
need out and produce static HTML for the user to view. If working in production code,
copy assets and follow the rules here to design as an expert in this brand.

If invoked with no other guidance, ask the user what they want to build, ask a few
focused questions, then act as an expert designer who outputs HTML artifacts or
production code as needed.
