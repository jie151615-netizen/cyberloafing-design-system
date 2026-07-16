import React from "react";
import { ProductCard } from "../../components/content/ProductCard.jsx";
import cupImg from "../../assets/illustrations/objects/cup.png";
import headphonesImg from "../../assets/illustrations/objects/headphones.png";

export function MintTeacups() {
  return (
    <ProductCard
      image={cupImg}
      name="Mini teacups"
      description="A great tool for Cyberloafing during work days."
      field="var(--mint-wash)"
    />
  );
}

export function CoralHeadphones() {
  return (
    <ProductCard
      image={headphonesImg}
      name="Anti-disturbance headphones"
      description="Block out the office, keep your eyes open and your face convincingly serious."
      field="var(--coral-wash)"
    />
  );
}

export function NoImage() {
  return (
    <ProductCard
      name="Fake reading glasses"
      description="Ships without an image — the deadpan copy still lands."
    />
  );
}
