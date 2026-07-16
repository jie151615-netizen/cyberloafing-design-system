## Conventions: Cyberloafing 摸鱼 Design System

Bilingual (EN-led, red 中文 subtitle) satirical zine system. Deadpan "instruction
manual" voice. No emoji, no gradients, flat surfaces, generous white margins.

### No provider — just link the stylesheet

There is **no context/theme provider**. Every component (`FishMark`, `PageBadge`,
`RegisterTag`, `SectionHeader`, `StampStrip`, `MethodCard`, `ProductCard`,
`StarIndex`) works standalone the moment `styles.css` is linked — it defines every
CSS custom property every component reads. No wrapper, no `ThemeProvider`, nothing
to configure.

### Styling idiom: classless — style via CSS custom properties, never className

Components carry **zero CSS classes**. All styling is inline `style` props reading
shared `var(--token)` values from `styles.css`. Your own layout glue (page
containers, grids around these components) should follow the same idiom — inline
styles with these vars, not invented utility classes.

Real token vocabulary (see `tokens/colors.css`, `tokens/typography.css`,
`tokens/spacing.css` for the full set):

| Family | Tokens |
|---|---|
| Ink/color | `--ink`, `--ink-90/70/50/25`, `--red`, `--coral`, `--coral-wash`, `--mint`, `--mint-wash`, `--paper`, `--paper-warm` |
| Register (fixed mapping — don't recolor) | `--register-light` (`#EBC3C6`, white text), `--register-mid` (coral), `--register-high` (red) |
| Type | `--font-sans`, `--fs-display` (120px) / `--fs-h1` (84px) / `--fs-h2` / `--fs-h3` / `--fs-lead` / `--fs-body` / `--fs-caption` / `--fs-micro`, `--fw-light/regular/medium/bold/black` |
| Spacing (4px base) | `--space-1` (4px) … `--space-10` (128px), `--content-max` (560px) |
| Shape | `--radius-sm/md/pill`, `--shadow-card` (the ONE allowed shadow — product cards only; everything else is flat) |

Display headings are ALL CAPS, `--fw-black`. Chinese subtitles are always `--red`
(via `SectionHeader`'s `subtitleColor` default) directly beneath the English title —
keep that EN/中文 pairing, it's the core brand cue. The 浅/中/高 (light/mid/high)
loafing register is always `#EBC3C6`/coral/red (white text on all three) — that
mapping is fixed system-wide.

### Where the truth lives

- `styles.css` — link this one file; it `@import`s `tokens/*.css`, `fonts/fonts.css`,
  and `_ds_bundle.css` in the right cascade order.
- `tokens/colors.css`, `tokens/typography.css`, `tokens/spacing.css` — read these
  before inventing a new value; almost everything needed already has a token.
- `components/<group>/<Name>/<Name>.prompt.md` — per-component usage doc with a
  real composed example.
- Chinese fonts fall back to the OS (PingFang SC / Noto Sans SC / Microsoft YaHei) —
  only the Latin HarmonyOS Sans ships as a webfont. This is intentional, not a gap.

### Idiomatic build snippet

```jsx
<MethodCard
  number={10}
  title={'"Snack Time!"'}
  lead="The riskiest way to Cyberloafing, but also the most fun."
  register="high"
  accent="var(--red)"
  indices={[
    { label: "Risk Index:", value: 6 },
    { label: "Leisure Index:", value: 5 },
    { label: "Realization Index:", value: 3 },
  ]}
  defuse="When you get bored or hungry during class time, try sneaking in some biscuits or candy — chew quietly, keep your eyes on the board, and no one will notice a thing."
/>
```

`accent` recolors title/lead/HOW to match the facing scene: red for school scenes,
coral for office scenes. Pair a `MethodCard` with a bleeding illustration on the
opposite side of the spread — never centered, never boxed.
