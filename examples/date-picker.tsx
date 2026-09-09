"use client";

import React, { useState } from "react";
import { DatePicker } from "@/components/monta-ui/date-picker";

export default function InvoiceForm() {
  const [dueDate, setDueDate] = useState<Date | null>(new Date());

  return (
    <div className="max-w-sm mx-auto p-4 space-y-3">
      <DatePicker
        label="Data de Vencimento da NF-e"
        value={dueDate}
        onValueChange={setDueDate}
        placeholder="Selecione a data..."
      />
    </div>
  );
}
