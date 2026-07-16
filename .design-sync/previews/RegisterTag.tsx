import React from "react";
import { RegisterTag } from "../../components/brand/RegisterTag.jsx";

export function AllLevels() {
  return (
    <div style={{ display: "flex", gap: 12 }}>
      <RegisterTag level="light" />
      <RegisterTag level="mid" />
      <RegisterTag level="high" />
    </div>
  );
}

export function NoEnglishLabel() {
  return <RegisterTag level="high" showEn={false} />;
}
