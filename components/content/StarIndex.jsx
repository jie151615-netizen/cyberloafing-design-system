import React from "react";

/**
 * StarIndex — a single rating row: a label and a star score, as used for
 * Risk / Leisure / Realization indices. Pass an array via `rows` to render
 * the full three-index block.
 */
export function StarIndex({
  label,
  value = 0,
  max = 6,
  rows,
  color = "var(--star-on)",
  offColor = "var(--star-off)",
  labelColor = "var(--text-muted)",
  style,
  ...rest
}) {
  if (rows) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", ...style }} {...rest}>
        {rows.map((r, i) => (
          <StarIndex key={i} label={r.label} value={r.value} max={r.max ?? max}
            color={color} offColor={offColor} labelColor={labelColor} />
        ))}
      </div>
    );
  }
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", ...style }} {...rest}>
      <span
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "var(--fs-caption)",
          fontWeight: "var(--fw-regular)",
          color: labelColor,
          minWidth: 128,
        }}
      >
        {label}
      </span>
      <span style={{ display: "inline-flex", gap: "3px", fontSize: "var(--fs-caption)", lineHeight: 1 }} aria-label={`${value} of ${max}`}>
        {Array.from({ length: max }).map((_, i) => (
          <span key={i} style={{ color: i < value ? color : offColor }}>★</span>
        ))}
      </span>
    </div>
  );
}
