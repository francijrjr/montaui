import * as React from "react";
import { ThreadConnector } from "@/components/monta-ui/thread-connector";

export default function Example() {
  return (
    <section
      aria-label="Exemplo de conversa"
      style={{ width: "100%", maxWidth: 480, fontSize: 14, lineHeight: 1.6 }}
    >
      <p style={{ marginBottom: 20 }}>
        Conecta etapas de uma conversa em uma linha vertical.
      </p>
      <article>
        <strong>Ana - conversa inicial</strong>
        <p>Como está a nova interface?</p>
      </article>
      <ThreadConnector>
        <strong>Ana</strong>
        <p>Vamos revisar o layout?</p>
      </ThreadConnector>
      <ThreadConnector last>
        <strong>Bruno</strong>
        <p>Revisado. Podemos seguir.</p>
      </ThreadConnector>
    </section>
  );
}
