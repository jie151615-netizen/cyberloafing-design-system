import React from "react";
import { StarIndex } from "../../components/content/StarIndex.jsx";

export function ThreeIndexBlock() {
  return (
    <StarIndex
      rows={[
        { label: "Risk Index:", value: 5 },
        { label: "Leisure Index:", value: 5 },
        { label: "Realization Index:", value: 3 },
      ]}
    />
  );
}

export function SingleRow() {
  return <StarIndex label="Risk Index:" value={2} max={6} />;
}
