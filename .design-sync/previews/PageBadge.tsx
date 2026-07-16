import React from "react";
import { PageBadge } from "../../components/brand/PageBadge.jsx";

export function Default() {
  return <PageBadge number={5} />;
}

export function Coral() {
  return <PageBadge number={10} color="var(--coral)" size={52} />;
}

export function Row() {
  return (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <PageBadge number={1} />
      <PageBadge number={5} color="var(--coral)" />
      <PageBadge number={11} size={56} />
    </div>
  );
}
