# Cyberloafing 摸鱼 — Design System

A fixed design system reverse-engineered from **《赛博摸鱼指南》/ Cyberloafing Manual**,
a bilingual satirical zine about the fine art of *摸鱼* ("touching fish" — slacking off
at work). The manual is a mock self-help / instruction guide: it catalogs identities,
grades the fatigue of different jobs, then walks through eleven ranked techniques for
resting on company time without getting caught — each rated on Risk, Leisure, and
Realization indices and paired with a line of branded "appliances" (mini teacups,
anti-disturbance headsets, eye masks, novelty toilet paper).

The tone is deadpan-instructional wrapped around a joke: the layout is clean and
editorial, the copy is written like a real manual, and the humor comes entirely from
what is being so earnestly explained.

> 摸鱼 (mō yú) literally "touch fish", figuratively goofing off / cyberloafing.
> The little outline fish is the mascot of the whole system.

**Repository / 仓库：** [github.com/jie151615-netizen/cyberloafing-design-system](https://github.com/jie151615-netizen/cyberloafing-design-system)

## Tech stack / 技术栈
- **Components** — plain React (`.jsx`), no build step and no framework lock-in;
  drop any component into a React 18+ project as-is.
- **Styling** — CSS custom properties only (`styles.css` + `tokens/*.css`): colors,
  typography, spacing. No CSS-in-JS, no utility classes, no component-scoped CSS.
- **Type** — HarmonyOS Sans (Latin) shipped as a webfont (`assets/fonts/`); Chinese
  falls back to the OS font stack (PingFang SC / Noto Sans SC / Microsoft YaHei).
- **Sync target** — [Claude Design](https://claude.ai/design), via the `.design-sync/`
  toolchain (`.design-sync/config.json`, `.design-sync/NOTES.md`) so the design agent
  builds with these real components instead of generic ones.

## Usage notes / 使用须知
- Link `styles.css` once per page/app; every component reads its look from `var(--*)`
  tokens in that file — never hard-code brand colors, spacing, or type sizes.
- No provider/context is required — each component works standalone.
- Every component ships a `<Name>.d.ts` (prop contract) and `<Name>.prompt.md`
  (usage example) next to its `.jsx` — read those before composing a new usage.
- Code in this repository is MIT-licensed (see `LICENSE`). The bundled HarmonyOS Sans
  font and the zine-derived illustration assets under `assets/illustrations/` may
  carry separate usage terms from their original sources (see "Sources" and
  "Caveats / substitutions" below) — the MIT grant covers the code/component layer,
  not necessarily those third-party-derived assets. Confirm rights before
  redistributing the font or illustrations outside this project.

## Sources
- `Cyberloafing2.pdf` — the 25-page master zine (working copy at `_analysis/`).
- `矢量图/` (object icons) → `assets/illustrations/objects/` — the monoline + spot-color
  "appliance" props: teacup, headphones, phone, plant/leaf, snack, hat, eye-mask,
  carpet, toilet paper, fake-eyes stickers, "don't push the marriage" tee.
- `矢量图2/` (25 artboards) → `assets/illustrations/scenes/` — the full-page comic
  scenes (hands, characters, PUSH!! toilet-paper, HELL/PARADISE doormat, etc.).
- `字体/` (HarmonyOS Sans family) → `assets/fonts/`.

## Content fundamentals
- **Bilingual, English-led.** Big English display heading, a red Chinese subtitle
  beneath it: `IDENTITIES / 身份`, `WORK / 工作`, `SCHOOL / 学校`, `LIFE / 生活`,
  `CYBERLOAFING / 摸鱼`, `APPLIANCE / 用具`, `DERIVATIVES / 衍生品`. A few captions
  drift into Italian (the manual's running gag of over-localization) — keep EN + 中文
  as the norm and treat other languages as an occasional easter egg.
- **Voice: deadpan manual.** Second person, imperative, utterly sincere about an
  absurd goal. "Don't worry, a supervisor won't notice if his employees change their
  cups." "But not for too long. If you attract the attention of your superiors… nothing
  is better than nothing, isn't it?" Instructions are numbered and always followed by a
  **"HOW TO DEFUSE BEING CAUGHT?"** block.
- **Three registers of loafing** run through everything: 浅摸鱼 (light), 中摸鱼
  (moderate), 高摸鱼 (high) — mapped to `#EBC3C6` / coral / red respectively.
- **Rating language:** every technique carries `Risk Index`, `Leisure Index`,
  `Realization Index`, each scored in stars.
- **Casing:** display headings are ALL CAPS; body is sentence case; the fish and short
  stamp words ("WORKING", "NOT IN CYBERLOAFING", "PUSH!!", "HELL / PARADISE") are
  shouty caps used as graphic texture.
- **Punctuation:** loves quotes and exclamation — "SNACK TIME!", "LIFE IS A PAIN…".
- **Emoji:** none. Icons are hand-drawn line art, never emoji.

## Visual foundations
- **Palette — four hues on white.** Navy ink `#13314F` (all body text + monoline art),
  alarm red `#DC2B33` (Chinese subtitles, page numbers, high-risk register, stars),
  soft coral `#E68C81` (whole-spread washes, moderate register, secondary text on light
  pages), calm mint `#9AD5CD` (props), pale rose `#EBC3C6` (low-risk register tag).
  White is the default page;
  `#FCFBF8` is a barely-warm alt surface. Accents share a bright, printed, slightly-flat
  quality — no gradients.
- **Backgrounds.** Overwhelmingly white with wide margins. A spread commits to ONE flat
  color field at a time (a full coral bleed, a solid navy half-page, a mint sign). Never
  gradients, never texture, never photography.
- **Type.** HarmonyOS Sans throughout. Display headings are Black (900), ALL CAPS,
  tightly stacked, often 84–120px. Chinese subtitle sits directly under in red, Medium.
  Body is Regular ~20px with relaxed line-height. See `tokens/typography.css`.
- **Illustration — two coexisting styles.** (1) *Monoline*: thin 2px navy outline,
  no fill, used for the fish mark, desk vignettes, small props. (2) *Spot-color comic*:
  loose black ink linework with a single flat accent fill — either **red** (school /
  student scenes) or **coral + mint** (office / toilet scenes). The accent doubles as a
  drop-shadow offset behind the linework. Illustrations bleed off the page edge.
- **Layout.** Editorial asymmetry: heading anchored to one side, illustration bleeding
  off the opposite edge, a single body column (~560px) and an index block. Lots of
  breathing room; content is never centered-and-boxed.
- **Corners / borders / shadows.** Mostly hard-edged and flat. Rounding appears only on
  small chips, badges and the floating product cards. One soft shadow
  (`--shadow-card`) is allowed for product cards; everything else is flat.
- **Page numbers** sit in a thin circular ring (red or coral), e.g. `⑤`, `⑩`.
- **Graphic texture:** repeated tracked-out stamp words looping down a margin
  ("WORKING WORKING…", "NOT IN CYBERLOAFING") and the star index rows.
- **Motion:** the source is print, so motion is minimal — short fades / standard easing
  only when a surface needs interactivity.

## Iconography
- No icon font, no emoji, no Unicode symbols as icons. Iconography **is** the
  illustration library: PNG line-art props in `assets/illustrations/objects/` and full
  comic scenes in `assets/illustrations/scenes/`. Reuse these directly — do not redraw.
- The one vector glyph reused as a UI mark is the **outline fish** (see `FishMark`),
  drawn as a simple SVG (tail triangle + body ellipse + gill arc + dot eye).
- Stars (★) are used for the index ratings — treat them as a data glyph, not decoration.

## Arcade — interactive games
- `games/arcade/index.html` — **Cyberloafing Arcade**, a standalone (no build step)
  React app hosting three mini-games, one per loafing register:
  - 🟢 **Water Wanderer** (浅摸鱼) — hold to fill a teacup; dodge a colleague or the
    boss's glance with the matching cover story. Low stakes, very forgiving.
  - 🟡 **Toilet Paper Runner** (中摸鱼) — click/scroll to tear off paper; the faster
    you go, the bigger the multiplier and the bigger the risk. Footsteps outside
    force a timed FLUSH to bank your points.
  - 🔴 **Biscuit Stealth** (高摸鱼) — hold to eat while the teacher's back is turned.
    One mistimed release when they turn around ends the run — the arcade's only
    hard fail state.
  - A shared 中/EN/IT language switch (top right) drives every piece of in-game
    copy from structured `Strings` dictionaries — see `games/*/game.jsx`.
  - Each level's mechanics live in its own `games/<level>/game.jsx` (compiled to a
    plain-JS `game.js` via a local Babel pass — see `games/arcade/build-artifact.js`
    for the compile step) so they can be loaded with a plain `<script src>`, no
    runtime Babel and no CORS issues when opened straight from disk.
  - `games/toilet-paper-runner/index.html` also runs the mid-risk level standalone.
  - `games/vendor/` — locally vendored React/ReactDOM UMD builds (no CDN dependency,
    works fully offline).
  - `games/arcade/build-artifact.js` — bundles the whole arcade (tokens, fonts as
    base64, all compiled games) into one self-contained HTML file for publishing
    elsewhere (e.g. a Claude Artifact) with zero external dependencies.
- **Play it live:** https://jie151615-netizen.github.io/cyberloafing-design-system/games/arcade/

## Index (manifest)
- `styles.css` — entry point (imports the three token files).
- `tokens/colors.css`, `tokens/typography.css`, `tokens/spacing.css` — foundations.
- `assets/fonts/` — HarmonyOS Sans (Light/Regular/Medium/Bold/Black).
- `assets/illustrations/objects/` — prop icons. `assets/illustrations/scenes/` — scenes.
- `guidelines/` — foundation specimen cards (Type, Colors, Spacing, Brand).
- `components/` — reusable primitives (see below).
- `ui_kits/zine/` — full-spread recreations of the manual.
- `games/` — the interactive Cyberloafing Arcade (see above).
- `SKILL.md` — portable skill wrapper.

### Components
- **FishMark** — the outline-fish brand mark (SVG).
- **SectionHeader** — EN display title + red 中文 subtitle (IDENTITIES / 身份).
- **StarIndex** — a Risk / Leisure / Realization rating row.
- **PageBadge** — circular page-number ring.
- **RegisterTag** — 浅 / 中 / 高 loafing register chip (`#EBC3C6` / coral / red).
- **MethodCard** — a numbered technique block (title, lead, indices, defuse copy).
- **ProductCard** — an "appliance" / derivative product tile with prop image.
- **StampStrip** — looping tracked-out stamp text used as margin texture.

## Intentional additions
- `RegisterTag` and `StampStrip` formalize motifs that appear graphically in the zine
  (the 浅/中/高 labels and the "WORKING…" loops) into reusable components.
- `FishMark` is redrawn as clean SVG because the source fish is embedded in raster
  scenes; the geometry matches the manual's mark.

## Caveats / substitutions
- The supplied HarmonyOS Sans TTFs are the **Latin masters**; they may not carry the
  full CJK set. Chinese renders through the font stack's CJK fallback (PingFang /
  Noto Sans SC / YaHei). If you need pixel-exact Chinese, supply *HarmonyOS Sans SC*.
- Exact brand hex values were sampled from the raster artboards and may be ±1–2 in
  each channel from the original vector source.
