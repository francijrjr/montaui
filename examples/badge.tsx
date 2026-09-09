"use client";

import { Badge } from "@/components/monta-ui/badge";

export default function StatusBadges() {
  return (
    <div className="flex flex-wrap gap-2 p-4">
      {/* Variantes Semânticas */}
      <Badge variant="default">Primary</Badge>
      <Badge variant="success">Homologado</Badge>
      <Badge variant="warning">Em Análise</Badge>
      <Badge variant="destructive">Reprovado</Badge>
      <Badge variant="outline">Neutro</Badge>

      {/* Com Ponto de Status Pulsante */}
      <Badge variant="outline" dot dotColor="bg-emerald-500">
        Servidor Online
      </Badge>

      {/* Tag Removível */}
      <Badge
        variant="default"
        removable
        onRemove={() => console.log("Removido!")}
      >
        Filtro: São Paulo
      </Badge>
    </div>
  );
}
