"use client";

import { Button } from "@/components/monta-ui/button";
import { Check, Trash2 } from "lucide-react";

export default function ExemploPagina() {
  return (
    <div className="flex flex-wrap gap-3 p-4">
      {/* Botão Primário Monta UI */}
      <Button variant="default" onClick={() => console.log("Salvo!")}>
        <Check className="h-4 w-4" />
        Salvar Registro
      </Button>

      {/* Botão Secundário */}
      <Button variant="secondary">Cancelar</Button>

      {/* Botão Danger */}
      <Button variant="danger">
        <Trash2 className="h-4 w-4" />
        Excluir
      </Button>
    </div>
  );
}
