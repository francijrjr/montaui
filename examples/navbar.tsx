"use client";

import { Navbar } from "@/components/monta-ui/navbar";
import { Button } from "@/components/monta-ui/button";

const navLinks = [
  { label: "Dashboard", href: "/dashboard", active: true },
  { label: "Clientes", href: "/clientes" },
  { label: "Faturamento", href: "/faturamento" },
  { label: "Relatórios", href: "/relatorios" },
];

export default function TopHeader() {
  return (
    <Navbar
      links={navLinks}
      searchPlaceholder="Buscar no sistema (⌘K)..."
      onSearchClick={() => console.log("Abrir busca...")}
      user={{
        name: "Monta UI",
        role: "Administrador",
        fallback: "MU",
        onProfileClick: () => console.log("Abrir perfil..."),
      }}
      actions={
        <Button size="sm" onClick={() => console.log("Novo Registro")}>
          + Novo Registro
        </Button>
      }
    />
  );
}
