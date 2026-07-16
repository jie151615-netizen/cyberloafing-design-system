import React from "react";
import { MethodCard } from "../../components/content/MethodCard.jsx";

export function SchoolHighRisk() {
  return (
    <MethodCard
      number={10}
      title={'"Snack Time!"'}
      lead="The riskiest way to Cyberloafing, but also the most fun."
      register="high"
      accent="var(--red)"
      indices={[
        { label: "Risk Index:", value: 6 },
        { label: "Leisure Index:", value: 5 },
        { label: "Realization Index:", value: 3 },
      ]}
      defuse="When you get bored or hungry during class time, try sneaking in some biscuits or candy — chew quietly, keep your eyes on the board, and no one will notice a thing."
    />
  );
}

export function OfficeLightRisk() {
  return (
    <MethodCard
      number={3}
      title="Peace And Quiet"
      lead="A five-minute reset that looks exactly like concentrating."
      register="light"
      accent="var(--register-light)"
      indices={[
        { label: "Risk Index:", value: 2 },
        { label: "Leisure Index:", value: 4 },
        { label: "Realization Index:", value: 5 },
      ]}
      defuse="Put on the anti-disturbance headset and close your eyes for exactly one Pomodoro. Anyone who asks will assume you're deep in thought."
    />
  );
}

export function OfficeModerateRisk() {
  return (
    <MethodCard
      number={6}
      title="The Long Water Break"
      lead="Hydration is a legitimate excuse — nobody times a bathroom trip."
      register="mid"
      accent="var(--coral)"
      indices={[
        { label: "Risk Index:", value: 4 },
        { label: "Leisure Index:", value: 4 },
        { label: "Realization Index:", value: 4 },
      ]}
      defuse="Take the scenic route past every window on the way to the water cooler. Refill twice. Nobody has ever gotten in trouble for staying hydrated."
    />
  );
}
