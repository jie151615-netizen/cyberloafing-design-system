import React from "react";

export interface PageBadgeProps {
  /** Page / step number. */
  number: number | string;
  /** Ring + text color — defaults to red (coral also used in the zine). */
  color?: string;
  /** Diameter in px. */
  size?: number;
  style?: React.CSSProperties;
}

/**
 * A page-number chip: number inside a thin circular ring. Sits in the
 * corner of technique spreads.
 */
export function PageBadge(props: PageBadgeProps): JSX.Element;
