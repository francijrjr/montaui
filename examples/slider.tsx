"use client";

import React, { useState } from "react";
import { Slider } from "@/components/monta-ui/slider";

export default function CreditForm() {
  const [credit, setCredit] = useState(45000);

  return (
    <div className="max-w-md mx-auto p-6 rounded-xl border bg-card space-y-4">
      <h4 className="font-heading font-bold text-sm">
        Limite de Crédito Aprovado
      </h4>
      <Slider
        min={0}
        max={100000}
        step={1000}
        value={credit}
        onValueChange={setCredit}
        valuePrefix="R$ "
      />
    </div>
  );
}
