import React from "react";

export interface ProductCardProps {
  /** Prop illustration URL (a file from assets/illustrations/objects/). */
  image?: string;
  /** Product name, e.g. "Mini teacups". */
  name: string;
  /** One line of deadpan product copy. */
  description?: string;
  /** Flat color field behind the prop (mint/coral washes read best). */
  field?: string;
  /** object-fit for the image. */
  fit?: "contain" | "cover";
  style?: React.CSSProperties;
}

/**
 * A branded "appliance" / derivative product tile: prop illustration on a
 * flat color field, name, and a short line of copy. The one card in the
 * system allowed a soft shadow.
 *
 * @startingPoint section="Zine" subtitle="Appliance / derivative product tile" viewport="340x400"
 */
export function ProductCard(props: ProductCardProps): JSX.Element;
