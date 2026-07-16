import React from "react";

/**
 * ProductCard — an "appliance" / derivative tile: a prop illustration on a
 * flat color field with a name and one line of deadpan copy. Used on the
 * APPLIANCE / 用具 and DERIVATIVES / 衍生品 spreads.
 */
export function ProductCard({
  image,
  name,
  description,
  field = "var(--mint-wash)",
  fit = "contain",
  style,
  ...rest
}) {
  return (
    <article
      style={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        background: "var(--surface-page)",
        boxShadow: "var(--shadow-card)",
        fontFamily: "var(--font-sans)",
        color: "var(--text-primary)",
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          aspectRatio: "4 / 3",
          background: field,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "var(--space-5)",
        }}
      >
        {image ? (
          <img src={image} alt={name} style={{ width: "100%", height: "100%", objectFit: fit }} />
        ) : (
          <span style={{ color: "var(--ink-50)", fontSize: "var(--fs-caption)" }}>prop image</span>
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", padding: "var(--space-4) var(--space-5)" }}>
        <h4 style={{ margin: 0, fontWeight: "var(--fw-bold)", fontSize: "var(--fs-body)" }}>{name}</h4>
        {description && (
          <p style={{ margin: 0, fontSize: "var(--fs-caption)", lineHeight: "var(--lh-body)", color: "var(--text-muted)" }}>
            {description}
          </p>
        )}
      </div>
    </article>
  );
}
