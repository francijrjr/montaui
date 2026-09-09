"use client";

import { Select } from "@/components/monta-ui/select";

export default function Example() {
  return (
    <Select aria-label="Status" defaultValue="active">
      <option value="active">Ativo</option>
      <option value="pending">Pendente</option>
    </Select>
  );
}
