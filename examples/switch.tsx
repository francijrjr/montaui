"use client";

import { Switch } from "@/components/monta-ui/switch";

export default function Example() {
  return (
    <Switch
      aria-label="Receber notificações"
      defaultChecked
      onCheckedChange={(checked) => console.log(checked)}
    />
  );
}
