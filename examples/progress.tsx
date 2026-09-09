"use client";

import React, { useState } from "react";
import { Progress } from "@/components/monta-ui/progress";
import { Button } from "@/components/monta-ui/button";

export default function FileUpload() {
  const [progress, setProgress] = useState(65);

  return (
    <div className="max-w-md mx-auto p-6 rounded-xl border bg-card space-y-4">
      {/* Barra com Label e % */}
      <Progress
        label="Processamento de Remessa CNAB"
        value={progress}
        max={100}
        showValue
        variant="default"
        size="default"
      />

      {/* Barra de Sucesso */}
      <Progress value={100} variant="success" size="sm" />

      {/* Barra Indeterminate (Loading Infinito) */}
      <Progress indeterminate variant="default" size="xs" />

      <div className="flex gap-2 pt-2">
        <Button
          size="sm"
          onClick={() => setProgress((p) => Math.min(p + 10, 100))}
        >
          +10%
        </Button>
        <Button size="sm" variant="secondary" onClick={() => setProgress(0)}>
          Resetar
        </Button>
      </div>
    </div>
  );
}
