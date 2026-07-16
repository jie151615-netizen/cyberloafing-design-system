import React from "react";
import { SectionHeader } from "../../components/brand/SectionHeader.jsx";

export function Display() {
  return <SectionHeader title="Cyberloafing" subtitle="摸鱼" />;
}

export function SpreadHeading() {
  return (
    <SectionHeader
      title="Snack Time!"
      subtitle="零食"
      size="h1"
      color="var(--red)"
      subtitleColor="var(--ink)"
    />
  );
}

export function OnInkField() {
  return (
    <div style={{ background: "var(--ink)", padding: "var(--space-6)" }}>
      <SectionHeader
        title="Work"
        subtitle="工作"
        size="h1"
        color="var(--paper)"
        subtitleColor="var(--coral)"
      />
    </div>
  );
}
