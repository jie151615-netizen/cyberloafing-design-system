# Sync notes — Cyberloafing 摸鱼 Design System

## Repo shape (off-script accommodation)

This repo has **no package.json, no build system, no git repo, no Storybook** — it's a
hand-authored brand kit (`.jsx` + `.d.ts` + `.prompt.md` per component, already close to
the design-sync output shape) rather than a compiled component library. To let the
standard `package-build.mjs` converter run in its documented "no dist, synth from src/"
path:

- Added a minimal root `package.json` (`name: cyberloafing-design`) and ran
  `npm install react react-dom @types/react @types/react-dom`.
- Created `node_modules/cyberloafing-design` as a **self-referential symlink**
  (`ln -sfn ../. node_modules/cyberloafing-design`) so `resolvePackage`'s
  `PKG_DIR = NODE_MODULES/PKG` resolves back to the repo root, where `components/`,
  `styles.css`, and `tokens/` already live in exactly the layout the `package` shape
  expects (`srcDir` default already matches `components/`).
- Build command: `node .ds-sync/package-build.mjs --config .design-sync/config.json --node-modules ./node_modules --out ./ds-bundle` (no separate build step — synth-entry every time; deterministic, so re-running is always safe).

**Re-sync risk**: if this repo ever gains a real build step or gets committed to git,
re-verify `node_modules/cyberloafing-design` still resolves (npm install can sometimes
prune unrecognized symlinks) — recreate with the `ln -sfn` command above if missing.

## cssEntry: tokens/colors.css (not a "real" compiled stylesheet)

This DS is **classless** — every component styles itself via inline `style` props
referencing shared CSS custom properties (`var(--ink)`, etc.); there is no
component-scoped stylesheet at all (`grep className components/*/*.jsx` → zero hits).
The root `styles.css` is just an `@import` manifest for `tokens/*.css`.

`package-validate.mjs` requires `_ds_bundle.css` to contain real (non-`@import`-only)
CSS or it fails `[CSS_PLACEHOLDER]`. Since there's no separate "compiled" stylesheet to
point at, `cfg.cssEntry` is set to `tokens/colors.css` — a real, representative token
file — purely to satisfy that check. This duplicates colors.css's content into
`_ds_bundle.css` (harmless: same values, and it's covered by the `styles.css` `@import`
closure anyway via `tokens/colors.css` regardless). `tokens/` already ships the
authoritative token files via `cfg.tokensGlob`.

## guidelines/ — manual copy step (converter is markdown-only)

`emitGuidelines` (`lib/docs.mjs`) hardcodes `isDocExt` to `.md`/`.mdx` — `cfg.guidelinesGlob`
can redirect WHICH files it looks at, but never WHAT extension it accepts, so it
silently matches zero files against `guidelines/*.html` (no warning; `copied.length`
is just 0). This repo's `guidelines/` is 13 pre-built HTML specimen pages (colors,
type, spacing, brand), not markdown — genuinely outside this mechanism.

**Every rebuild before upload, manually run:**
```sh
mkdir -p ds-bundle/guidelines && cp guidelines/*.html ds-bundle/guidelines/
```
(`ds-bundle/guidelines/index.md` was hand-written once; only needs updating if a
guideline page is added/removed/renamed.) Not worth forking `lib/docs.mjs` for —
a plain `cp` is simpler and the fork-declaration/maintenance overhead isn't justified
for one silently-skipped copy step.

## Known render warns

- **`[FONT_MISSING] "Microsoft YaHei"`** — `--font-sans` stack is
  `"HarmonyOS Sans", "PingFang SC", "Noto Sans SC", "Microsoft YaHei", -apple-system,
  "Segoe UI", sans-serif`. Only "HarmonyOS Sans" is the shipped brand font (5 weights,
  wired via `cfg.extraFonts: ["tokens/typography.css"]`); the rest are **intentional
  OS-level CJK fallbacks** per readme.md ("CJK falls back via system font stack" — the
  supplied TTFs are Latin-only masters). Not shipping Microsoft YaHei/PingFang SC is
  correct (they're proprietary OS fonts, not redistributable, and not meant to ship).
  Accepted as-is — do not chase this warning on future syncs.
- **Dangling `@font-face` urls inside the copied `tokens/typography.css`** — harmless.
  `tokensGlob` copies `tokens/typography.css` verbatim (including its
  `../assets/fonts/...`-relative `@font-face` rules, which don't resolve from
  `OUT/tokens/`). The REAL, working font-face rules ship separately via
  `cfg.extraFonts` → `OUT/fonts/fonts.css`, imported by `styles.css` AFTER
  `tokens/typography.css`, so the correct rule wins the cascade (same
  family/weight/style, later declaration wins). `package-validate.mjs` doesn't flag
  this (no `[FONT_DANGLING]` was reported), but if a future validate run does, this is
  the known, non-blocking cause.
- **`[RENDER_THIN] FishMark`** — triaged as legitimate. FishMark is a deliberately
  minimal 2px monoline SVG mark (tail triangle + body outline + gill arc + dot eye,
  navy on white) with no fill and no text — low ink coverage is the correct rendering,
  not a broken preview. Confirmed visually via the contact sheet across all 3 authored
  exports (Default, AccentRed, FacingPair). Do not chase this warning on future syncs.
- **`cfg.overrides` cardMode: "column"`** set for `SectionHeader`, `StampStrip`,
  `MethodCard` — their exports (long display titles, tracked-out stamp text, full
  technique blocks) are naturally wider/taller than a multi-column grid cell. Fixed
  per the `[GRID_OVERFLOW]` tag; column mode can't re-flag by construction.

## Grade carry-forward doesn't see component/token source edits

`package-capture.mjs`'s "carried forward" check tracks the authored `.tsx` and
preview-affecting config, NOT the underlying component `.jsx`/`.d.ts` or `tokens/*.css`
bytes ("styling... never invalidate" by design — see non-storybook SKILL.md §4.3).
When `RegisterTag`'s light-register color changed from mint to `#EBC3C6` (component
source + token edit, no preview `.tsx` touched), `package-capture.mjs` still reported
`RegisterTag: carried forward` even though its rendered pixels changed — the stale
grade would have shipped unverified if not manually re-checked against
`ds-bundle/_screenshots/brand__RegisterTag.png` (the plain render-check screenshot,
regenerated every validate run, as opposed to the grading-review sheet which only
regenerates on a detected preview change).

**Re-sync risk**: any future edit to a component's own `.jsx`/`.d.ts` or to `tokens/*.css`
(not the preview `.tsx`) needs a MANUAL visual re-check against the render-check
screenshots (`ds-bundle/_screenshots/<group>__<Name>.png`) — don't trust "carried
forward" alone to mean the grade is still accurate for source-level changes.

## Re-sync risks

- No git repo exists yet for this project — `.design-sync/` durable files (config,
  this NOTES.md, `conventions.md`, `previews/`) aren't version-controlled. Consider
  `git init` so future syncs (and the user) can track what changed.
- The self-referential `node_modules` symlink and root `package.json`/`package-lock.json`
  are sync scaffolding, not part of the original brand-kit repo — safe to keep
  (gitignored if a `.gitignore` gets added) but not required by anything except this
  sync process.
