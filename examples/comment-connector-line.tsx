import * as React from "react";
import { CommentConnectorLine } from "@/components/monta-ui/comment-connector-line";

export default function Example() {
  return (
    <section
      aria-label="Exemplo de conversa"
      style={{ width: "100%", maxWidth: 480, fontSize: 14, lineHeight: 1.6 }}
    >
      <p style={{ marginBottom: 20 }}>
        Liga comentários do mesmo nível, encerrando a linha no último.
      </p>
      <article>
        <strong>Ana - conversa inicial</strong>
        <p>Como está a nova interface?</p>
      </article>
      <CommentConnectorLine>
        <strong>Ana</strong>
        <p>Vamos revisar o layout?</p>
      </CommentConnectorLine>
      <CommentConnectorLine last>
        <strong>Bruno</strong>
        <p>Revisado. Podemos seguir.</p>
      </CommentConnectorLine>
    </section>
  );
}
