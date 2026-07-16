import React from "react";

/**
 * FishMark — the outline-fish mascot of the Cyberloafing system.
 * 摸鱼 = "touch fish". A monoline glyph: tail triangle + body + gill + eye.
 */
export function FishMark({
  size = 64,
  color = "var(--ink)",
  strokeWidth = 2,
  flip = false,
  style,
  ...rest
}) {
  return (
    <svg
      width={size}
      height={(size * 86) / 280}
      viewBox="-3 -3 286 92"
      fill="none"
      role="img"
      aria-label="Cyberloafing fish"
      style={{
        display: "block",
        transform: flip ? "scaleX(-1)" : undefined,
        ...style,
      }}
      {...rest}
    >
      <g
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        fill="none"
      >
        {/* tail — triangle on the left */}
        <path d="M0 0 L30 43 L0 86 Z" />
        {/* body — long pointed oval, rounded nose on the right */}
        <path d="M28 43 C58 20 118 4 167 5 C212 6 252 22 279 38 C281 42 281 44 279 48 C252 64 212 80 167 81 C118 82 58 66 28 43 Z" />
        {/* gill arc near the head */}
        <path d="M230 15 Q214 43 230 72" />
      </g>
      {/* eye */}
      <circle cx="252" cy="39" r="2.6" fill={color} />
    </svg>
  );
}
