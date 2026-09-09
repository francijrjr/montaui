"use client";

import { Timeline, type TimelineItem } from "@/components/monta-ui/timeline";

const auditoriaEventos: TimelineItem[] = [
  {
    title: "Pedido Criado via API",
    description: "Payload JSON recebido de ERP Monta UI. 42 itens incluídos.",
    time: "09:15 · 31/08",
    status: "completed",
  },
  {
    title: "Pagamento R$ 38.450 Confirmado",
    description: "Conciliação automática via PIX Banco Itaú.",
    time: "10:42 · 31/08",
    badge: "NF-e #48910 Aprovada",
    status: "completed",
  },
  {
    title: "Separação em Andamento no CD-01",
    description: "Operador realizando leitura de código de barras das caixas.",
    time: "14:00 (Agora)",
    status: "in-progress",
  },
  {
    title: "Coleta pela Transportadora",
    description: "Caminhão de rota agendado para entrega expressa.",
    time: "Previsão 17:30",
    status: "pending",
  },
];

export default function RastreamentoPedido() {
  return (
    <div className="p-6 max-w-lg">
      <Timeline items={auditoriaEventos} />
    </div>
  );
}
