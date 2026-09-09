"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/monta-ui/dialog";

export default function ModalExemplo() {
  return (
    <Dialog>
      <DialogTrigger>Abrir Modal</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar Operação</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          Deseja realmente confirmar esta ação no sistema?
        </p>
      </DialogContent>
    </Dialog>
  );
}
