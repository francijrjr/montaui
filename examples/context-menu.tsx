"use client";

import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from "@/components/monta-ui/context-menu";

export default function DocumentoItem() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-full items-center justify-center rounded-xl border border-dashed text-xs text-muted-foreground">
        Clique com o Botão Direito Aqui
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuItem>Copiar Link</ContextMenuItem>
        <ContextMenuItem>Duplicar Arquivo</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem className="text-rose-500">Excluir</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
