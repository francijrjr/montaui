"use client";

import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/components/monta-ui/alert";

export default function NotificacoesPainel() {
  return (
    <div className="space-y-3 max-w-lg p-4">
      {/* Alerta de Sucesso */}
      <Alert
        variant="success"
        dismissable
        onClose={() => console.log("Fechado")}
      >
        <AlertTitle>Nota Fiscal Emitida</AlertTitle>
        <AlertDescription>
          O lote 4920 foi processado e autorizado com sucesso pela SEFAZ.
        </AlertDescription>
      </Alert>

      {/* Alerta de Atenção */}
      <Alert variant="warning">
        <AlertTitle>Certificado A1</AlertTitle>
        <AlertDescription>
          Expira em 5 dias. Renove para evitar interrupções no faturamento.
        </AlertDescription>
      </Alert>

      {/* Alerta de Erro */}
      <Alert variant="destructive">
        <AlertTitle>Falha de Conexão</AlertTitle>
        <AlertDescription>
          Não foi possível sincronizar o inventário com a filial Rio de Janeiro.
        </AlertDescription>
      </Alert>
    </div>
  );
}
