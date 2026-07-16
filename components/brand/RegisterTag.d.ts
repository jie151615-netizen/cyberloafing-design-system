import React from "react";

export interface RegisterTagProps {
  /** Loafing depth: light (浅/#EBC3C6), mid (中/coral), high (高/red). */
  level?: "light" | "mid" | "high";
  /** Show the English label after the Chinese. */
  showEn?: boolean;
  style?: React.CSSProperties;
}

/**
 * The 浅 / 中 / 高 摸鱼 depth chip, color-coded #EBC3C6 / coral / red, white
 * text throughout. Marks how risky (and how restful) a cyberloafing
 * technique is.
 */
export function RegisterTag(props: RegisterTagProps): JSX.Element;
