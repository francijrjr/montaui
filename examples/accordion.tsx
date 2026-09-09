"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/monta-ui/accordion";

export default function Example() {
  return (
    <Accordion>
      <AccordionItem value="install">
        <AccordionTrigger>Como instalar?</AccordionTrigger>
        <AccordionContent>
          Execute npx montaui add accordion no seu projeto React.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
