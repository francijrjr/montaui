"use client";

import React, { useState } from "react";
import { Lookup, type LookupItem } from "@/components/monta-ui/lookup";

const clients: LookupItem[] = [
  {
    id: "1",
    code: "CLI-101",
    label: "Petrobras Petróleo Brasileiro S/A",
    subtitle: "Rio de Janeiro - RJ",
    tag: "VIP",
  },
  {
    id: "2",
    code: "CLI-102",
    label: "Vale S/A Mineração & Logística",
    subtitle: "Nova Lima - MG",
    tag: "Ativo",
  },
  {
    id: "3",
    code: "CLI-103",
    label: "Ambev Brasil Bebidas S/A",
    subtitle: "São Paulo - SP",
    tag: "Ativo",
  },
];

export default function ClientSelector() {
  const [selected, setSelected] = useState<LookupItem | null>(clients[1]);

  return (
    <div className="max-w-md mx-auto p-4 space-y-3">
      <Lookup
        label="Cliente / Parceiro Comercial"
        title="Consulta de Clientes"
        items={clients}
        value={selected}
        onSelect={setSelected}
        placeholder="Buscar cliente..."
      />
    </div>
  );
}
