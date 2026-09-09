"use client";

import { Textarea } from "@/components/monta-ui/textarea";

export default function Example() {
  return (
    <Textarea
      aria-label="Descrição do projeto"
      placeholder="Descreva sua ideia..."
      rows={4}
    />
  );
}
