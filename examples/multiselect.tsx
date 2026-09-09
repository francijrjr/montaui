"use client";

import React, { useState } from "react";
import {
  MultiSelect,
  type MultiSelectOption,
} from "@/components/monta-ui/multiselect";

const permissions: MultiSelectOption[] = [
  { value: "read_nfe", label: "Consulta NF-e" },
  { value: "emit_nfe", label: "Emissão NF-e" },
  { value: "cancel_nfe", label: "Cancelamento" },
  { value: "audit_logs", label: "Auditoria de Logs" },
];

export default function UserPermissions() {
  const [roles, setRoles] = useState<string[]>(["read_nfe", "emit_nfe"]);

  return (
    <div className="max-w-md mx-auto p-4 space-y-3">
      <MultiSelect
        label="Permissões de Acesso"
        options={permissions}
        selected={roles}
        onSelectedChange={setRoles}
        placeholder="Selecione as permissões..."
      />
    </div>
  );
}
