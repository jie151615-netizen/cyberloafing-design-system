import React from "react";

/**
 * PageBadge — a page number inside a thin circular ring, as used in the
 * top corner of every technique spread (⑤, ⑩ …).
 */
export function PageBadge({
  number,
  color = "var(--red)",
  size = 44,
  style,
  ...rest
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        borderRadius: "var(--radius-pill)",
        border: `var(--stroke-line) solid ${color}`,
        color,
        fontFamily: "var(--font-sans)",
        fontWeight: "var(--fw-medium)",
        fontSize: size * 0.42,
        lineHeight: 1,
        ...style,
      }}
      {...rest}
    >
      {number}
    </span>
  );
}
