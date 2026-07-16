import React from "react";
import { PageBadge } from "../brand/PageBadge.jsx";
import { StarIndex } from "./StarIndex.jsx";
import { RegisterTag } from "../brand/RegisterTag.jsx";

/**
 * MethodCard — a numbered cyberloafing technique: page badge, big title +
 * lead, an index block, and the "HOW TO DEFUSE BEING CAUGHT?" body. `accent`
 * recolors the page badge, title, lead, HOW, and star index together.
 * The workhorse layout of the manual's how-to spreads.
 */
export function MethodCard({
  number,
  title,
  lead,
  register = "light",
  indices = [],
  defuse,
  accent = "var(--red)",
  style,
  ...rest
}) {
  return (
    <article
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-5)",
        maxWidth: "var(--content-max)",
        fontFamily: "var(--font-sans)",
        color: "var(--text-primary)",
        ...style,
      }}
      {...rest}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
        {number != null && <PageBadge number={number} color={accent} />}
        <RegisterTag level={register} />
      </div>

      <h3
        style={{
          margin: 0,
          fontWeight: "var(--fw-black)",
          fontSize: "var(--fs-h1)",
          lineHeight: "var(--lh-tight)",
          letterSpacing: "var(--ls-display)",
          textTransform: "uppercase",
          color: accent,
        }}
      >
        {title}
      </h3>

      {lead && (
        <p style={{ margin: 0, fontSize: "var(--fs-lead)", lineHeight: "var(--lh-body)", color: accent }}>
          {lead}
        </p>
      )}

      {indices.length > 0 && <StarIndex rows={indices} color={accent} />}

      {defuse && (
        <div>
          <p
            style={{
              margin: "0 0 var(--space-1)",
              fontWeight: "var(--fw-black)",
              fontSize: "var(--fs-h2)",
              lineHeight: 0.95,
              color: accent,
            }}
          >
            HOW
          </p>
          <p
            style={{
              margin: "0 0 var(--space-4)",
              fontWeight: "var(--fw-medium)",
              fontSize: "var(--fs-h3)",
              letterSpacing: "var(--ls-caption)",
              textTransform: "uppercase",
              color: accent,
            }}
          >
            To Defuse Being Caught?
          </p>
          <p style={{ margin: 0, fontSize: "var(--fs-body)", lineHeight: "var(--lh-loose)", color: accent }}>
            {defuse}
          </p>
        </div>
      )}
    </article>
  );
}
