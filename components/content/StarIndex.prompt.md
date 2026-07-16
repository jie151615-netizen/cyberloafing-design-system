**StarIndex** — the Risk / Leisure / Realization star ratings that score every technique.

```jsx
<StarIndex rows={[
  { label: "Risk Index:", value: 5 },
  { label: "Leisure Index:", value: 5 },
  { label: "Realization Index:", value: 3 },
]} />

<StarIndex label="Risk Index:" value={2} max={6} />
```

Filled stars are red; keep `max` at 6 to match the manual. Labels are muted ink.
