import React from "react";

/**
 * StampStrip — a tracked-out stamp word repeated as margin texture, the way
 * "WORKING WORKING…" or "NOT IN CYBERLOAFING" loop down the zine's edges.
 */
export function StampStrip({
  text = "WORKING",
  repeat = 6,
  direction = "vertical",
  color = "var(--ink-25)",
  separator = "\u00A0\u00A0",
  style,
  ...rest
}) {
  const content = Array(repeat).fill(text).join(separator);
  return (
    <div
      style={{
        writingMode: direction === "vertical" ? "vertical-rl" : "horizontal-tb",
        fontFamily: "var(--font-sans)",
        fontWeight: "var(--fw-bold)",
        fontSize: "var(--fs-caption)",
        letterSpacing: "var(--ls-stamp)",
        textTransform: "uppercase",
        color,
        userSelect: "none",
        whiteSpace: "nowrap",
        ...style,
      }}
      aria-hidden="true"
      {...rest}
    >
      {content}
    </div>
  );
}
