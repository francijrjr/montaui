"use client";

import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from "@/components/monta-ui/menubar";

export default function BarraSuperior() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Arquivo</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Novo Arquivo</MenubarItem>
          <MenubarItem>Abrir...</MenubarItem>
          <MenubarItem>Salvar</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Editar</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Desfazer</MenubarItem>
          <MenubarItem>Refazer</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
