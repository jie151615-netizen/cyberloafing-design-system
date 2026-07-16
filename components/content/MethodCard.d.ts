import React from "react";
import { StarIndexRow } from "./StarIndex";

export interface MethodCardProps {
  /** Technique number (shown in the PageBadge). */
  number?: number | string;
  /** Big display title, e.g. "SNACK TIME!". */
  title: string;
  /** Red lead sentence under the title. */
  lead?: string;
  /** Loafing register (drives the RegisterTag color). */
  register?: "light" | "mid" | "high";
  /** Risk / Leisure / Realization rows for the StarIndex block. */
  indices?: StarIndexRow[];
  /** Body copy for the "HOW TO DEFUSE BEING CAUGHT?" section. */
  defuse?: string;
  /** Accent color for the page badge, title, lead, HOW, and star index —
   *  red (school), coral (office), or the register's own token
   *  (e.g. var(--register-light)) to match the RegisterTag. */
  accent?: string;
  style?: React.CSSProperties;
}

/**
 * A full cyberloafing-technique block: number, title, lead, index ratings,
 * and the "HOW TO DEFUSE BEING CAUGHT?" copy. Pair it with a bleeding scene
 * illustration on the facing side.
 *
 * @startingPoint section="Zine" subtitle="Numbered how-to technique block" viewport="640x760"
 */
export function MethodCard(props: MethodCardProps): JSX.Element;
