import React from "react";

export interface SectionHeaderProps {
  /** English display title (rendered ALL CAPS, Black weight). */
  title: string;
  /** Chinese subtitle, shown in red beneath the title. */
  subtitle?: string;
  /** "display" (~120px) for section openers, "h1" (~84px) for spreads. */
  size?: "display" | "h1";
  /** Title color — defaults to navy ink (use white on ink/coral fields). */
  color?: string;
  /** Subtitle color — defaults to alarm red. */
  subtitleColor?: string;
  align?: "left" | "center";
  style?: React.CSSProperties;
}

/**
 * The zine masthead: big EN title + red 中文 subtitle. One per section.
 *
 * @startingPoint section="Brand" subtitle="Bilingual section masthead" viewport="700x260"
 */
export function SectionHeader(props: SectionHeaderProps): JSX.Element;
