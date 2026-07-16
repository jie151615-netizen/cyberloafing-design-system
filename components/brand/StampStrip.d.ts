import React from "react";

export interface StampStripProps {
  /** The word/phrase to repeat (e.g. "WORKING", "NOT IN CYBERLOAFING"). */
  text?: string;
  /** How many repetitions. */
  repeat?: number;
  /** Run down a margin (vertical) or across (horizontal). */
  direction?: "vertical" | "horizontal";
  /** Color — defaults to a faint ink tint (it's texture, not content). */
  color?: string;
  /** Separator between repeats. */
  separator?: string;
  style?: React.CSSProperties;
}

/**
 * Decorative repeated stamp text used as margin/edge texture. Purely
 * graphic — rendered aria-hidden.
 */
export function StampStrip(props: StampStripProps): JSX.Element;
