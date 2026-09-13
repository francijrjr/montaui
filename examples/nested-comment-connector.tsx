import * as React from "react";
import { NestedCommentConnector } from "@/components/monta-ui/nested-comment-connector";

export default function Example() {
  return (
    <section
      aria-label="Exemplo de conversa"
      style={{ width: "100%", maxWidth: 480, fontSize: 14, lineHeight: 1.6 }}
    >
      <p style={{ marginBottom: 20 }}>
        Agrupa respostas dentro de respostas, mantendo a hierarquia.
      </p>
      <article>
        <strong>Ana - conversa inicial</strong>
        <p>Como está a nova interface?</p>
      </article>
      <NestedCommentConnector>
        <strong>Bruno - resposta a Ana</strong>
        <p>Revisei a versão mobile.</p>
        <NestedCommentConnector>
          <strong>Clara - resposta a Bruno</strong>
          <p>Ótimo! Ajustei o espaçamento.</p>
        </NestedCommentConnector>
      </NestedCommentConnector>
    </section>
  );
}
