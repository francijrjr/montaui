# Integrar Monta UI

O contrato de cada componente é o TypeScript instalado. O portal mostra esse mesmo arquivo e suas props são extraídas durante o build. Os exemplos em `examples/` são verificados pelo TypeScript e renderizados no servidor nos testes.

## Instalação

```sh
npx montaui init
npx montaui add button animated-gradient text-reveal
npx montaui info text-reveal --json
```

O mesmo CLI pode ser executado com qualquer gerenciador:

```sh
# npm (usa npx, sem instalação global)
npx montaui init
npx montaui add button animated-gradient text-reveal

# pnpm / yarn / bun
pnpm dlx montaui add button animated-gradient text-reveal
yarn dlx montaui add button animated-gradient text-reveal
bunx --bun montaui add button animated-gradient text-reveal
```

Dependências do projeto usando npm:

```sh
npm install clsx tailwind-merge lucide-react class-variance-authority
```

O pacote se chama **montaui**. `monta-ui` é um alias de executável, não o nome usado para baixar o pacote. O CLI copia arquivos para `src/components/monta-ui` quando existe `src`, ou `components/monta-ui` caso contrário. O utilitário `cn` fica em `src/lib/utils.ts` ou `lib/utils.ts`. Arquivos existentes são preservados; `--overwrite` substitui os componentes explicitamente solicitados. O CLI imprime as dependências necessárias; execute o comando de instalação informado.

Configure `@/` no TypeScript **e no bundler** para apontar para `src/` (ou para a raiz). Importe componentes assim:

```tsx
import { Button } from "@/components/monta-ui/button";
```

Os componentes corporativos usam os tokens de cor e as classes do Tailwind do projeto. Use a configuração de Tailwind 3.4 e os tokens do portal; uma aplicação Tailwind 4 precisa adaptar sua configuração. Não substitua tokens existentes automaticamente. Componentes com hooks, context ou refs incluem `"use client"` para o Next.js App Router. Uma página que passa callbacks também precisa estar em uma fronteira client.

Para validar mudanças locais ainda não publicadas: execute `npm pack` no repositório, depois `npm install /caminho/montaui-1.0.1.tgz` no projeto de teste e use `npx montaui add ...` ali.

## Quatro componentes de movimento

| Componente       | Uso                                  | Props principais                                            | Padrões                     |
| ---------------- | ------------------------------------ | ----------------------------------------------------------- | --------------------------- |
| AnimatedGradient | Fundo de um contêiner `div`          | `preset`, `colors`, `duration`, `paused`                    | `brand`, 12s, sem pausa     |
| GradientText     | Cores em movimento no texto `span`   | `children`, `colors`, `duration`, `paused`                  | paleta Monta, 6s, sem pausa |
| ShimmerText      | Faixa de brilho sobre texto `span`   | `children`, `color`, `highlightColor`, `duration`, `paused` | roxo, brilho claro, 3s      |
| TextReveal       | Entrada de texto por palavras `span` | `children`, `effect`, `duration`, `delay`, `stagger`        | `slide`, 0.6s, 0s, 0.08s    |

Esses quatro arquivos dependem apenas de React: estilos e keyframes já acompanham o TSX. Não exigem Framer Motion, WebGL, `cn` ou configuração de keyframes no Tailwind. `className`, `style`, atributos HTML e `ref` são encaminhados ao elemento externo. `colors` exige pelo menos duas cores CSS e substitui a paleta predefinida.

`duration` é em **segundos**, tem mínimo de 0.1 e usa o padrão se receber um número não finito. `delay` e `stagger` negativos são tratados como zero. `paused` pausa as animações contínuas na posição atual. Não existe uma prop `speed` com significado diferente entre componentes.

Os três componentes de texto recebem **string**, não árvores JSX. Coloque-os dentro de `h1`, `h2`, `p` ou outro elemento semântico. TextReveal preserva espaços/quebras e fornece o texto completo para leitores de tela. Ele anima ao montar, sem observador de viewport; altere sua `key` para repetir. Não passa callbacks fictícios como `onComplete` ou `inView`.

```tsx
import { AnimatedGradient } from "@/components/monta-ui/animated-gradient";
import { TextReveal } from "@/components/monta-ui/text-reveal";

export default function Hero() {
  return (
    <AnimatedGradient preset="brand" style={{ padding: 48, color: "white" }}>
      <h1>
        <TextReveal stagger={0.1}>Seu próximo projeto começa aqui.</TextReveal>
      </h1>
    </AnimatedGradient>
  );
}
```

Defina altura ou padding para o fundo e confira o contraste com as cores escolhidas. Textos herdam tamanho e peso do pai. A preferência `prefers-reduced-motion` desativa os movimentos, deixando o conteúdo legível. Gradientes de texto têm fallback para alto contraste. Se sua política CSP bloquear estilos inline, extraia os estilos do TSX para uma folha permitida e adapte as variáveis antes de integrar.

## Composição sem adivinhação

- Confira `exports` e `runtimeExports` no contrato; use imports nomeados.
- Consulte `props[].component`: em módulos compostos, cada prop pertence a um export específico.
- `required` e `type` vêm do TypeScript. `default` vem de JSDoc, parâmetros ou variantes CVA; `—` significa que o extrator não encontrou um padrão explícito.
- A lista detalha props próprias. Para atributos HTML herdados, leia a interface no `source`; nem todos os componentes encaminham todos os atributos ou refs.
- Monta UI não replica a API Radix: triggers são botões e não aceitam `asChild`. Não aninhe `Button` dentro deles.
- `Stepper` usa `onStepClick`, com etapas numeradas a partir de 1.
- Envolva `Sidebar` em `SidebarProvider` e quem usa `useToast` em `ToastProvider`.
- A prop controlada deve vir com o callback correspondente. Não copie um exemplo visual presumindo que ele persiste dados.

## Manutenção e verificação

Edite os componentes novos em `components/*.tsx`; os corporativos existentes ainda são definidos em `build-registry.js`. Edite exemplos em `examples/`. Não edite os artefatos em `registry/ui`, `registry/json`, `registry/catalog.js` ou `registry/contracts.json` diretamente.

```sh
npm test
```

O comando reconstrói o registro e o portal, verifica tipos, compara os artefatos com a fonte, renderiza os 48 exemplos no servidor e testa o CLI em uma pasta temporária. Isso não substitui uma auditoria completa de acessibilidade e interação de todos os componentes corporativos. Os novos previews de movimento executam o React real; os previews corporativos antigos ainda são demonstrações HTML.

Para os testes no navegador, instale o Chromium com `npx playwright install chromium`, sirva esta pasta em `http://localhost:4173` e execute `npm run test:browser`. Outra URL pode ser definida por `MONTA_TEST_URL`.
