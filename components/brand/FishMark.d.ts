import React from "react";

export interface FishMarkProps {
  /** Rendered width in px (height derives from the 280×86 aspect). */
  size?: number;
  /** Stroke color — defaults to navy ink. */
  color?: string;
  /** Outline weight in px. */
  strokeWidth?: number;
  /** Mirror horizontally (fish faces left instead of right). */
  flip?: boolean;
  style?: React.CSSProperties;
}

/**
 * The outline-fish brand mark (摸鱼). Use as a logo bug, list bullet, or
 * end-of-section flourish. Monoline only — never fill it.
 *
 * @startingPoint section="Brand" subtitle="Outline fish brand mark" viewport="200x120"
 */
export function FishMark(props: FishMarkProps): JSX.Element;
