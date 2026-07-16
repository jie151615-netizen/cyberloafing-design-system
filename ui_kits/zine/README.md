# Zine UI kit — Cyberloafing Manual

An interactive recreation of the printed manual, assembled entirely from the design
system's components. Open `index.html` and use Prev / Next (or the dots) to page through:

1. **Cover** — masthead `CYBERLOAFING / 摸鱼`, deadpan blurb, `FishMark`.
2. **Section opener** — `SectionHeader` + the three `RegisterTag` registers (浅/中/高).
3. **Method · light** — a `MethodCard`-style spread (coral accent) for the mini-teacup
   technique, illustration bleeding into a coral field.
4. **Method · high** — the red-accent "Snack Time!" spread, max Risk index.
5. **Appliance / 用具** — a `ProductCard` grid of branded loafing gear.

## Components used
`SectionHeader`, `MethodCard` layout, `StarIndex`, `PageBadge`, `RegisterTag`,
`ProductCard`, `FishMark`.

## Notes
- The primitives are inlined in `index.html` so the kit renders standalone without the
  compiled bundle; they are byte-for-byte the same API as `components/`. In a consuming
  project, import them from `window.<Namespace>` (the compiled DS bundle) instead.
- Illustrations use the **clean isolated props** from
  `assets/illustrations/objects/`. The full comic scenes in
  `assets/illustrations/scenes/` are complete artboards with baked-in text — use those
  as reference, not as drop-in illustration layers.
- Page canvas is 960×960 to match the square manual page (`--page-w/h`).
