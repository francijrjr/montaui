"use client";

import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/monta-ui/field";
import { Input } from "@/components/monta-ui/input";
import { useState } from "react";

export default function CadastroCliente() {
  const [cnpj, setCnpj] = useState("");
  const [error, setError] = useState("CNPJ inválido ou não cadastrado.");

  return (
    <div className="space-y-4 max-w-sm p-4">
      {/* Campo Padrão com Dica */}
      <Field>
        <FieldLabel required>Razão Social</FieldLabel>
        <Input placeholder="Monta Tech S/A" />
        <FieldDescription>
          Nome empresarial oficial conforme cartão CNPJ.
        </FieldDescription>
      </Field>

      {/* Campo com Estado de Erro */}
      <Field error={!!error}>
        <FieldLabel required>CNPJ da Empresa</FieldLabel>
        <Input
          placeholder="00.000.000/0000-00"
          value={cnpj}
          onChange={(e) => setCnpj(e.target.value)}
        />
        <FieldError>{error}</FieldError>
      </Field>
    </div>
  );
}
