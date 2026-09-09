"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/monta-ui/popover";

export default function Example() {
  return (
    <Popover>
      <PopoverTrigger>Mais informações</PopoverTrigger>
      <PopoverContent>Os dados são atualizados diariamente.</PopoverContent>
    </Popover>
  );
}
