"use client";

import { Input } from "@/components/monta-ui/input";
import { useState } from "react";

export default function Formulario() {
  const [nome, setNome] = useState("");

  return (
    <div className="space-y-4 max-w-sm">
      <Input
        placeholder="Razão Social..."
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        clearable
        onClear={() => setNome("")}
      />
      <Input type="password" placeholder="Senha de Acesso" />
    </div>
  );
}
