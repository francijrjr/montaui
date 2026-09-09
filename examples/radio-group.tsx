"use client";

import React, { useState } from "react";
import { RadioGroup, RadioGroupCard } from "@/components/monta-ui/radio-group";

export default function PlanSelection() {
  const [plan, setPlan] = useState("enterprise");

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <h3 className="font-heading font-bold text-sm">Selecione seu Plano</h3>
      <RadioGroup value={plan} onValueChange={setPlan}>
        <RadioGroupCard
          value="enterprise"
          title="Enterprise Dedicado"
          description="SLA 99.9%, instâncias dedicadas e suporte 24/7."
          badge="Recomendado"
        />
        <RadioGroupCard
          value="business"
          title="Business Cloud"
          description="Até 50 usuários simultâneos com backups automáticos."
        />
      </RadioGroup>
    </div>
  );
}
