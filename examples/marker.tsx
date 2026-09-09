"use client";

import { Marker } from "@/components/monta-ui/marker";

export default function MapaOperacoes() {
  return (
    <div className="relative h-64 w-full rounded-xl border bg-muted/30 flex items-center justify-around p-6">
      {/* Marcador Primário */}
      <Marker
        variant="brand"
        label="1"
        pulse
        tooltip={
          <div>
            <p className="font-bold">Matriz São Paulo</p>
            <p className="text-emerald-500 font-semibold">● Operação Normal</p>
          </div>
        }
      />

      {/* Marcador Sucesso */}
      <Marker
        variant="success"
        label="2"
        pulse
        tooltip={
          <div>
            <p className="font-bold">CD Rio de Janeiro</p>
            <p className="text-emerald-500 font-semibold">● 142 Entregas</p>
          </div>
        }
      />

      {/* Marcador Atenção */}
      <Marker
        variant="warning"
        label="3"
        pulse
        tooltip={
          <div>
            <p className="font-bold">Filial Belo Horizonte</p>
            <p className="text-amber-500 font-semibold">▲ Manutenção</p>
          </div>
        }
      />
    </div>
  );
}
