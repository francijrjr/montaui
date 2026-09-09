"use client";

import { Skeleton } from "@/components/monta-ui/skeleton";

export default function Example() {
  return (
    <div aria-label="Carregando conteúdo" role="status">
      <Skeleton className="h-6 w-48" />
      <Skeleton className="mt-3 h-4 w-64" />
    </div>
  );
}
