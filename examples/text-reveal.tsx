"use client";

import { useState } from "react";
import { TextReveal } from "@/components/monta-ui/text-reveal";

export default function Example() {
  const [replay, setReplay] = useState(0);
  return (
    <div>
      <h2>
        <TextReveal key={replay} effect="slide" duration={0.6} stagger={0.08}>
          Cada palavra no seu tempo.
        </TextReveal>
      </h2>
      <button type="button" onClick={() => setReplay((value) => value + 1)}>
        Repetir
      </button>
    </div>
  );
}
