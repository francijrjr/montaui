"use client";

import {
  Loading,
  Spinner,
  LoadingOverlay,
  LoadingDots,
  LoadingBars,
} from "@/components/monta-ui/loading";
import { useState } from "react";
import { Button } from "@/components/monta-ui/button";

export default function PainelSincronizacao() {
  const [loading, setLoading] = useState(false);

  const handleSync = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-lg p-6 border rounded-xl bg-card shadow-sm">
      {/* 1. Spinners Inline e com Texto */}
      <div className="flex items-center gap-4">
        <Loading variant="spinner" size="default" text="Carregando..." />
        <Loading variant="dots" text="Processando..." />
        <Loading variant="bars" text="Otimizando..." />
      </div>

      {/* 2. Botão com Spinner */}
      <Button onClick={handleSync} disabled={loading} className="gap-2">
        {loading && <Spinner size="sm" className="text-white" />}
        <span>{loading ? "Sincronizando..." : "Iniciar Sincronização"}</span>
      </Button>

      {/* 3. Card com Overlay Assíncrono */}
      <div className="relative p-4 border rounded-lg bg-muted/20 min-h-[120px]">
        <h5 className="font-bold text-xs">Dados Financeiros Consolidados</h5>
        <p className="text-xs text-muted-foreground mt-1">
          Saldo Atual: R$ 420.900,00
        </p>

        {loading && (
          <LoadingOverlay
            text="Consultando SEFAZ..."
            subtext="Aguarde a resposta do servidor"
          />
        )}
      </div>
    </div>
  );
}
