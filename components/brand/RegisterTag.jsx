import React from "react";

const REGISTERS = {
  light: { zh: "浅摸鱼", en: "LIGHT", color: "var(--register-light)", ink: "var(--paper)" },
  mid: { zh: "中摸鱼", en: "MODERATE", color: "var(--coral)", ink: "var(--paper)" },
  high: { zh: "高摸鱼", en: "HIGH", color: "var(--red)", ink: "var(--paper)" },
};

/**
 * RegisterTag — the depth-of-loafing chip: 浅 / 中 / 高 摸鱼, color-coded
 * #EBC3C6 / coral / red, white text throughout. Signals how risky a
 * technique is.
 */
export function RegisterTag({ level = "light", showEn = true, style, ...rest }) {
  const r = REGISTERS[level] || REGISTERS.light;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "baseline",
        gap: "var(--space-2)",
        padding: "var(--space-2) var(--space-4)",
        borderRadius: "var(--radius-pill)",
        background: r.color,
        color: r.ink,
        fontFamily: "var(--font-sans)",
        lineHeight: 1,
        ...style,
      }}
      {...rest}
    >
      <span style={{ fontWeight: "var(--fw-bold)", fontSize: "var(--fs-caption)", letterSpacing: "0.06em" }}>
        {r.zh}
      </span>
      {showEn && (
        <span style={{ fontWeight: "var(--fw-medium)", fontSize: "var(--fs-micro)", letterSpacing: "var(--ls-caption)", opacity: 0.85 }}>
          {r.en}
        </span>
      )}
    </span>
  );
}
