import React from "react";

export interface StarIndexRow {
  label: string;
  value: number;
  max?: number;
}

export interface StarIndexProps {
  /** Row label, e.g. "Risk Index:". Ignored when `rows` is given. */
  label?: string;
  /** Filled star count. */
  value?: number;
  /** Total stars (the zine uses up to 6). */
  max?: number;
  /** Render several rows at once (Risk / Leisure / Realization). */
  rows?: StarIndexRow[];
  /** Filled-star color (red by default). */
  color?: string;
  /** Empty-star color. */
  offColor?: string;
  /** Label color. */
  labelColor?: string;
  style?: React.CSSProperties;
}

/**
 * A star rating row for the manual's Risk / Leisure / Realization indices.
 * Pass `rows` for the whole block, or single `label`+`value` for one line.
 */
export function StarIndex(props: StarIndexProps): JSX.Element;
