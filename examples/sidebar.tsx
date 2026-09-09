"use client";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarItem,
  SidebarTrigger,
} from "@/components/monta-ui/sidebar";

export default function Example() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>Monta UI</SidebarHeader>
        <SidebarContent>
          <SidebarItem active>Visão geral</SidebarItem>
          <SidebarItem>Projetos</SidebarItem>
        </SidebarContent>
      </Sidebar>
      <SidebarTrigger aria-label="Alternar menu" />
    </SidebarProvider>
  );
}
