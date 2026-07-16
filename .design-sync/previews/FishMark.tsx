import React from "react";
import { FishMark } from "../../components/brand/FishMark.jsx";

export function Default() {
  return <FishMark size={96} />;
}

export function AccentRed() {
  return <FishMark size={72} color="var(--red)" />;
}

export function FacingPair() {
  return (
    <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
      <FishMark size={64} />
      <FishMark size={64} flip />
    </div>
  );
}
