<div align="center">

<img src="https://cdn.dribbble.com/userupload/48878224/file/2fbdb62ff72fa4698957846c2ac8c9a9.png?resize=1024x308&vertical=center" alt="Monta UI Design System" width="380" />

<br>

<p align="center">
  <b>48 componentes corporativos autorais e 3 templates de telas completas em React, TypeScript e Tailwind CSS (100% Zero Radix).</b>
</p>

[![React](https://img.shields.io/badge/React-18%2F19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Zero Radix](https://img.shields.io/badge/Zero_Radix-100%25_Próprio-753399?style=for-the-badge)](https://github.com/francijrjr/montaui)
[![Dark Mode](https://img.shields.io/badge/Dark%20Mode-Nativo-753399?style=for-the-badge)](https://github.com/francijrjr/montaui)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

[Abrir documentação online](https://montaui.vercel.app/) · [Ver pacote no npm](https://www.npmjs.com/package/montaui) · [Ver Packages no GitHub](https://github.com/users/francijrjr/packages?repo_name=montaui)

---

</div>

## Principais Recursos

- **100% Zero Radix**: Construído diretamente em **React + TypeScript + Tailwind CSS** nativos, sem Radix UI. As dependências de cada componente estão declaradas no registro.
- **Monta CLI**: Instalação simples e individual de componentes com `pnpm dlx montaui add [componente]`.
- **Paleta Corporativa**: Roxo `#753399`, modo escuro/claro nativo (`class="dark"`) e tokens HSL universais.
- **Suíte de Gráficos**: Gráficos analíticos de Barras com Metas, Linhas/Área com gradientes, Donut e Barras Horizontais.
- **Templates Prontos**: Telas completas de **Login**, **Landing Page** e **Dashboard SaaS Executivo**.
- **Storybook 8**: Laboratório interativo de componentes configurado com Tailwind CSS e temas.

---

## Instalação Rápida

### 1. Inicializar Monta UI no seu projeto React
```bash
# Inicializa a estrutura de componentes e utilitários
pnpm dlx montaui init
```

Com npm, use `npx` sem instalar o CLI globalmente:

```bash
npx montaui init
npx montaui add button animated-gradient text-reveal
```

Também funciona com `yarn dlx montaui ...` e `bunx --bun montaui ...`.

Dependências usando npm:

```bash
npm install clsx tailwind-merge lucide-react class-variance-authority
```

### 2. Adicionar Componentes
```bash
# Adiciona qualquer um dos 48 componentes
pnpm dlx montaui add button
pnpm dlx montaui add sidebar
pnpm dlx montaui add chart
pnpm dlx montaui add form
pnpm dlx montaui add loading
```

---

## Catálogo dos 48 Componentes Corporativos

| Categoria | Componentes |
| :--- | :--- |
| **Gradientes Animados** | `animated-gradient` |
| **Text Animations** | `gradient-text`, `shimmer-text`, `text-reveal` |
| **Ações & Menus** | `button`, `button-group`, `dropdown-menu`, `popover`, `context-menu`, `menubar`, `navigation-menu` |
| **Formulários** | `field`, `form`, `input`, `checkbox`, `switch`, `select`, `textarea`, `radio-group`, `slider`, `date-picker`, `lookup`, `combo`, `multiselect` |
| **Layout & Containers** | `dialog`, `card`, `accordion`, `tabs` |
| **Feedback** | `badge`, `toast`, `progress`, `skeleton`, `alert`, `loading` |
| **Dados & Visualização** | `table`, `avatar`, `chart`, `calendar`, `tree-view`, `stepper`, `timeline`, `page-header`, `statistic`, `marker` |
| **Navegação** | `breadcrumb`, `navbar`, `sidebar`, `pagination` |

---

## Templates de Telas Completas

1. **Login / Autenticação (`templates/login.tsx`)**: Layout split em 2 colunas com campos de e-mail, senha com show/hide, checkbox de sessão, botão com spinner e SSO.
2. **Landing Page (`templates/home.tsx`)**: Navbar superior, hero de alto impacto, preview ao vivo do dashboard, métricas e grid de features.
3. **Dashboard SaaS (`templates/dashboard.tsx`)**: Sidebar retrátil, navbar com atalhos, 4 cards de KPI executivos, gráficos de receita/canais e tabela com paginação.

---

## Estrutura do Projeto

```text
├── index.html                  # Portal interativo de documentação e laboratório
├── app.js                      # Motor interativo, live previews e gerador TSX
├── build-registry.js           # Compilador dos 48 componentes para TSX e JSON
├── registry/                   # Registro oficial com os 48 componentes .tsx e .json
│   ├── ui/                     # Componentes React + TypeScript nativos
│   └── json/                   # Definições de dependências para o Monta CLI
├── templates/                  # Telas completas (Login, Home, Dashboard)
│   ├── login.tsx
│   ├── home.tsx
│   └── dashboard.tsx
├── .storybook/                 # Configuração do Storybook 8
└── stories/                    # Exemplos de stories
```

---

## Licença

Distribuído sob a licença **MIT**. Consulte o arquivo `LICENSE` para obter mais detalhes.

---

<div align="center">
  <b>Monta UI — Design System Enterprise</b>
</div>

## Integração para pessoas e agentes

Consulte [o guia de integração](docs/integration.md), os [contratos derivados do TypeScript](registry/contracts.json) e os [exemplos compiláveis](examples/). Use `npx montaui info text-reveal --json` para obter um contrato específico.

Os quatro componentes de movimento dependem somente de React e incluem seu CSS. As durações são em segundos e respeitam movimento reduzido.

Execute `npm test` para reconstruir e verificar os 48 componentes e exemplos.
