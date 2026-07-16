**MethodCard** — the manual's how-to spread as one block: page badge + register tag, big title, red lead, Risk/Leisure/Realization index, and the "HOW TO DEFUSE BEING CAUGHT?" copy.

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
  defuse="When you get bored or hungry during class time, try sneaking in some biscuits…"
/>
```

Set `accent` to red for school scenes, coral for office scenes, or `var(--register-light)` (#EBC3C6) for a light-register technique — it recolors the page badge, title, lead, HOW, and star index together to match the facing illustration. Place a bleeding scene image opposite it.
