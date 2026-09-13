# Thread line

| Componente | Quando usar |
| --- | --- |
| `ReplyThreadLine` | Uma mensagem com uma resposta ligada por uma curva. |
| `CommentConnectorLine` | Várias respostas no mesmo nível. Use `last` na última. |
| `ThreadConnector` | Etapas de uma conversa, com pontos e linha vertical. |
| `NestedCommentConnector` | Respostas dentro de respostas. Aninhe o componente. |

Instale com `npx montaui add reply-thread-line` ou substitua o nome por
`comment-connector-line`, `thread-connector` ou `nested-comment-connector`.
Os exemplos completos estão em `examples/` e no catálogo, na categoria **Thread line**.

`children` recebe o conteúdo; `lineColor` aceita uma cor CSS; `last` encerra
a linha. `className` e `style` permitem adaptar o contêiner.
As linhas são decorativas e ficam ocultas dos leitores de tela. Identifique
o autor e a mensagem respondida no conteúdo, como nos exemplos.
