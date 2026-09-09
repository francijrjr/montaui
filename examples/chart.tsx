"use client";

import { Chart } from "@/components/monta-ui/chart";

// 1. Dados de Faturamento (Barras & Linha/Área)
const dadosVendas = [
  { label: "Jan", value: 85, target: 70 },
  { label: "Fev", value: 92, target: 75 },
  { label: "Mar", value: 110, target: 80 },
  { label: "Abr", value: 98, target: 85 },
  { label: "Mai", value: 130, target: 90 },
  { label: "Jun", value: 145, target: 95 },
];

// 2. Distribuição por Canal (Donut / Rosca)
const canaisVendas = [
  { label: "E-commerce Web", value: 576, color: "#753399" },
  { label: "Lojas Físicas", value: 384, color: "#10b981" },
  { label: "Marketplace", value: 192, color: "#f59e0b" },
  { label: "API B2B", value: 128, color: "#3b82f6" },
];

// 3. Desempenho Regional (Ranking Horizontal)
const rankingFiliais = [
  { label: "1. São Paulo (Matriz)", value: 450, color: "#753399" },
  { label: "2. Rio de Janeiro", value: 380, color: "#10b981" },
  { label: "3. Minas Gerais", value: 290, color: "#f59e0b" },
  { label: "4. Paraná", value: 240, color: "#3b82f6" },
];

export default function DashboardAnalitico() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {/* 1. Gráfico de Colunas / Barras */}
      <Chart
        type="bar"
        title="Faturamento Semestral vs Meta"
        description="Valores em R$ mil"
        data={dadosVendas}
        color="#753399"
      />

      {/* 2. Gráfico de Área / Linha SVG */}
      <Chart
        type="area"
        title="Evolução de Requisições / Tráfego"
        description="Chamadas por hora em milhares"
        data={dadosVendas}
        color="#753399"
      />

      {/* 3. Gráfico de Rosca / Donut */}
      <Chart
        type="donut"
        title="Canais de Venda"
        description="Participação no faturamento total"
        data={canaisVendas}
      />

      {/* 4. Gráfico de Barras Horizontais / Ranking */}
      <Chart
        type="horizontal-bar"
        title="Ranking por Filial"
        description="Metas orçamentárias atingidas no Q3"
        data={rankingFiliais}
      />
    </div>
  );
}
