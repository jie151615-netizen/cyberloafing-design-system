import React from "react";

/**
 * SectionHeader — big English display title with a red Chinese subtitle
 * beneath it. The signature masthead of every zine section.
 * e.g. IDENTITIES / 身份, CYBERLOAFING / 摸鱼.
 */
export function SectionHeader({
  title,
  subtitle,
  size = "display",
  color = "var(--ink)",
  subtitleColor = "var(--red)",
  align = "left",
  style,
  ...rest
}) {
  const fs = size === "display" ? "var(--fs-display)" : "var(--fs-h1)";
  const subFs = size === "display" ? "var(--fs-h3)" : "var(--fs-lead)";
  return (
    <header
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-2)",
        textAlign: align,
        alignItems: align === "center" ? "center" : "flex-start",
        ...style,
      }}
      {...rest}
    >
      <h2
        style={{
          margin: 0,
          fontFamily: "var(--font-sans)",
          fontWeight: "var(--fw-black)",
          fontSize: fs,
          lineHeight: "var(--lh-tight)",
          letterSpacing: "var(--ls-display)",
          textTransform: "uppercase",
          color,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            margin: 0,
            fontFamily: "var(--font-cjk)",
            fontWeight: "var(--fw-medium)",
            fontSize: subFs,
            letterSpacing: "0.08em",
            color: subtitleColor,
          }}
        >
          {subtitle}
        </p>
      )}
    </header>
  );
}
