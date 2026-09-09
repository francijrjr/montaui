"use client";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/monta-ui/tabs";

export default function Example() {
  return (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Visão geral</TabsTrigger>
        <TabsTrigger value="activity">Atividade</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Resumo do projeto.</TabsContent>
      <TabsContent value="activity">Últimas alterações.</TabsContent>
    </Tabs>
  );
}
