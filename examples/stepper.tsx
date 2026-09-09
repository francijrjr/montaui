"use client";

import { Stepper } from "@/components/monta-ui/stepper";
import { useState } from "react";

const etapas = [
  { title: "Cadastro" },
  { title: "Endereço" },
  { title: "Pagamento" },
  { title: "Revisão" },
];

export default function WizardFluxo() {
  const [etapaAtual, setEtapaAtual] = useState(2);

  return (
    <Stepper
      steps={etapas}
      currentStep={etapaAtual}
      onStepClick={(novaEtapa) => setEtapaAtual(novaEtapa)}
    />
  );
}
