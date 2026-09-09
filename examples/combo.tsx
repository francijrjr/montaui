"use client";

import React, { useState } from "react";
import { Combobox, type ComboboxOption } from "@/components/monta-ui/combo";

const departments: ComboboxOption[] = [
  { value: "ti", label: "Tecnologia da Informação", hint: "CC-0101" },
  { value: "fin", label: "Controladoria & Finanças", hint: "CC-0102" },
  { value: "rh", label: "Recursos Humanos & D.O.", hint: "CC-0103" },
];

export default function DeptSelector() {
  const [dept, setDept] = useState("ti");

  return (
    <div className="max-w-sm mx-auto p-4 space-y-3">
      <Combobox
        label="Centro de Custo / Departamento"
        options={departments}
        value={dept}
        onValueChange={setDept}
        placeholder="Selecione o departamento..."
        searchPlaceholder="Buscar departamento..."
      />
    </div>
  );
}
