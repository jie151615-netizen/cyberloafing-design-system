import React from "react";
import { StampStrip } from "../../components/brand/StampStrip.jsx";

export function VerticalMargin() {
  return <StampStrip text="WORKING" repeat={8} style={{ height: 220 }} />;
}

export function HorizontalAccentBand() {
  return (
    <StampStrip
      text="NOT IN CYBERLOAFING"
      direction="horizontal"
      color="var(--coral)"
    />
  );
}
