"use client";

import { useToast, ToastProvider } from "@/components/monta-ui/toast";
import { Button } from "@/components/monta-ui/button";

function SalvarCliente() {
  const { toast } = useToast();

  const handleSalvar = () => {
    toast({
      title: "Alterações Salvas",
      description: "O cadastro do cliente foi atualizado no banco de dados.",
      variant: "success",
      duration: 5000,
      action: {
        label: "Desfazer",
        onClick: () => console.log("Desfeito!"),
      },
    });
  };

  return (
    <div className="p-4">
      <Button onClick={handleSalvar}>Salvar Dados</Button>
    </div>
  );
}

export default function Example() {
  return (
    <ToastProvider>
      <SalvarCliente />
    </ToastProvider>
  );
}
