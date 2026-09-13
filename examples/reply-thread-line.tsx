import * as React from "react";
import { ReplyThreadLine } from "@/components/monta-ui/reply-thread-line";

export default function Example() {
  return (
    <section
      aria-label="Exemplo de conversa"
      style={{ width: "100%", maxWidth: 480, fontSize: 14, lineHeight: 1.6 }}
    >
      <p style={{ marginBottom: 20 }}>Liga uma mensagem à sua resposta.</p>
      <article>
        <strong>Ana - conversa inicial</strong>
        <p>Como está a nova interface?</p>
      </article>
      <ReplyThreadLine>
        <strong>Bruno - resposta a Ana</strong>
        <p>Sim, o layout está pronto para revisão.</p>
      </ReplyThreadLine>
    </section>
  );
}
