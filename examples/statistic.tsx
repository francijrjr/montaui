"use client";

import { Statistic } from "@/components/monta-ui/statistic";

export default function MetricasGerais() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Statistic
        title="MRR Total"
        value="R$ 482.900"
        trend={14.8}
        trendLabel="vs mês anterior"
      />
      <Statistic title="NPS Corporativo" value="89 / 100" />
      <Statistic title="SLA Atendimento" value="99.4%" trend={2.1} />
    </div>
  );
}
