"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/monta-ui/card";

export default function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Projeto Monta</CardTitle>
        <CardDescription>Seu espaço de trabalho.</CardDescription>
      </CardHeader>
      <CardContent>
        Convide sua equipe e organize as próximas entregas.
      </CardContent>
      <CardFooter>Atualizado hoje</CardFooter>
    </Card>
  );
}
