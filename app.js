// ==============================================================================
// Monta UI - Documentation & Live Registry Manager
// Design System Corporativo em React & Tailwind CSS
// ==============================================================================

const state = {
  theme: localStorage.getItem('monta-theme') || 'dark',
  current: 'button',
  view: 'home', // 'home' | 'docs' | 'installation' | 'tailwind' | 'storybook' | 'templates'
  template: 'login', // 'login' | 'home' | 'dashboard'
  templateTab: 'preview', // 'preview' | 'code'
  templateViewport: 'desktop', // 'desktop' | 'tablet' | 'mobile'
  docTab: 'preview', // 'preview' | 'code'
  pkgManager: 'pnpm',
  filter: 'Todos',
};

// ==================== MAPEAMENTO DE CATEGORIAS ====================
const groups = {
  "Ações & Menus": [
    "button", "button-group", "dropdown-menu", "popover", "context-menu", 
    "menubar", "navigation-menu"
  ],
  "Formulários": [
    "field", "form", "input", "checkbox", "switch", "select", "textarea", "radio-group", 
    "slider", "date-picker", "lookup", "combo", "multiselect"
  ],
  "Layout & Containers": [
    "dialog", "card", "accordion", "tabs"
  ],
  "Feedback": [
    "badge", "toast", "progress", "skeleton", "alert", "loading"
  ],
  "Dados & Visualização": [
    "table", "avatar", "chart", "calendar", "tree-view", "stepper", 
    "timeline", "page-header", "statistic", "marker"
  ],
  "Navegação": [
    "breadcrumb", "navbar", "sidebar", "pagination"
  ]
};

const descriptions = {
  button: "Dispara uma ação ou evento corporativo com variantes primária, secundária, ghost, danger e loading.",
  "button-group": "Agrupa visualmente um conjunto de botões relacionados para ações coordenadas.",
  field: "Container modular de campo com rótulo, indicador obrigatório, dica contextual e mensagem de erro.",
  form: "Estrutura completa de formulário corporativo com seções, linhas responsivas, validação e ações de envio.",
  input: "Campo de entrada de texto flexível com suporte a ícones, senhas, limpeza rápida e estados de foco.",
  dialog: "Janela modal acessível construída sobre as primitivas Radix UI para confirmações e fluxos sobrepostos.",
  card: "Container modular estruturado com cabeçalho, conteúdo e rodapé para organização de informações.",
  accordion: "Seções recolhíveis empilhadas verticalmente para navegação compacta e exibição de detalhes sob demanda.",
  tabs: "Conjunto de abas em camadas para alternar rapidamente entre visualizações no mesmo contexto.",
  switch: "Controle de alternância booleana (ligado/desligado) com animação suave e acessibilidade ARIA.",
  checkbox: "Caixa de seleção com suporte a estados marcado, desmarcado e indeterminado.",
  table: "Tabela de dados corporativa com cabeçalhos estilizados, linhas zebradas e suporte a seleção.",
  badge: "Pequeno rótulo semântico para exibir status, contadores e tags em registros.",
  toast: "Notificação temporária flutuante de alta prioridade com suporte a feedback de ações.",
  progress: "Barra de progresso animada com cálculo percentual dinâmico.",
  skeleton: "Efeito de pulso de carregamento simulando a estrutura do conteúdo enquanto carrega.",
  alert: "Banners de aviso e alerta com ícones semânticos, título e botão de fechar.",
  loading: "Indicadores visuais de carregamento assíncrono com spinner circular, pulso, barras equalizadoras e overlay de tela.",
  avatar: "Elemento de exibição de foto de usuário corporativo com fallback automático de iniciais.",
  breadcrumb: "Trilha de navegação hierárquica para indicar a localização do usuário na aplicação.",
  navbar: "Barra de navegação superior responsiva com logo, links ativos, busca e perfil de usuário.",
  sidebar: "Painel lateral retrátil e recolhível com grupos de navegação, ícones, badges e perfil corporativo.",
  marker: "Marcador de ponto de interesse com pulso radar, índice numérico e card de tooltip informativo.",
  pagination: "Navegação por páginas com botões anterior/próximo, números com reticências e seletor de itens por página.",
  popover: "Panel suspenso acionado por clique para informações adicionais e ações secundárias.",
  "dropdown-menu": "Menu suspenso em cascata para listagem de opções, atalhos de teclado e ações de registro.",
  "context-menu": "Menu de contexto contextual acionado ao clicar com o botão direito sobre áreas do sistema.",
  menubar: "Barra de menus estilo aplicação desktop com submenus em cascata (Arquivo, Editar, Exibir).",
  "navigation-menu": "Mega-menu de navegação com submenus suspensos ricos em cards, ícones e colunas estruturadas.",
  select: "Caixa de seleção suspensa nativa estilizada com suporte a estados ativo e desabilitado.",
  textarea: "Área de texto com auto-redimensionamento para comentários e entradas longas.",
  chart: "Visualizador de gráficos analíticos em barras, linhas e áreas com comparação de metas e tooltips.",
  calendar: "Grade de calendário mensal interativa com marcação de eventos, navegação e seleção de datas.",
  "tree-view": "Estrutura de dados em árvore hierárquica expansível para navegação de pastas e entidades.",
  stepper: "Indicador de progresso passo a passo (wizard) para fluxos de checkout e cadastros multi-etapas.",
  timeline: "Linha do tempo vertical cronológica para rastreamento de status, auditoria e eventos corporativos.",
  "page-header": "Cabeçalho corporativo com breadcrumbs, título, tags de status e grupos de botões de ação.",
  statistic: "Blocos de métricas e KPIs executivos com valores consolidados, tendências percentuais e ícones.",
  "radio-group": "Grupo de opções mutuamente exclusivas com suporte a cards ricos, ícones e descrições.",
  slider: "Controle deslizante contínuo com trilha percentual preenchida, bolha de valor e suporte a limites numéricos.",
  "date-picker": "Campo seletor de data corporativo com calendário popover, atalhos de navegação e formato localizado.",
  lookup: "Campo de consulta avançada com diálogo modal de pesquisa em grade de registros corporativos.",
  combo: "Campo combobox pesquisável com filtragem em tempo real e tags de seleção.",
  multiselect: "Seletor múltiplo com tags removíveis (chips), busca rápida e opções desmarcáveis."
};

// ==================== INICIALIZAÇÃO ====================
function bootstrapApp() {
  initTheme();
  renderSidebar();
  renderCategoryFilter();
  renderComponentsGrid();
  handleRouting();

  window.addEventListener('hashchange', handleRouting);
  window.addEventListener('popstate', handleRouting);
  window.addEventListener('scroll', handleScrollSpy, { passive: true });
  document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);
  document.getElementById('searchTrigger')?.addEventListener('click', openSearchModal);

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openSearchModal();
    }
  });

  if (window.lucide) window.lucide.createIcons();
}

// ==================== TEMA (DARK / LIGHT) ====================
function initTheme() {
  if (state.theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('monta-theme', state.theme);
  initTheme();
}

// ==================== ROTEAMENTO ====================
function handleRouting() {
  const hash = (typeof window !== 'undefined' && window.location && window.location.hash) ? window.location.hash : '#/inicio';
  if (hash === '#/docs/instalacao' || hash === '#/instalacao') {
    showInstallationDocs(false);
  } else if (hash === '#/docs/tailwind' || hash === '#/tailwind' || hash === '#/tailwind-config') {
    showTailwindDocs(false);
  } else if (hash === '#/docs/storybook' || hash === '#/storybook') {
    showStorybookDocs(false);
  } else if (hash === '#/templates' || hash.startsWith('#/templates/')) {
    const tplName = hash.replace('#/templates/', '').replace('#/templates', '') || 'login';
    showTemplatesView(tplName, false);
  } else if (hash.startsWith('#/componente/')) {
    const name = hash.replace('#/componente/', '');
    openComponentDocs(name, false);
  } else {
    showHomePage(false);
  }
}

function hideAllViews() {
  document.getElementById('homeView')?.classList.add('hidden');
  document.getElementById('docsView')?.classList.add('hidden');
  document.getElementById('installationDocsView')?.classList.add('hidden');
  document.getElementById('tailwindDocsView')?.classList.add('hidden');
  document.getElementById('storybookDocsView')?.classList.add('hidden');
  document.getElementById('templatesView')?.classList.add('hidden');
}

function showHomePage(updateHistory = true) {
  state.view = 'home';
  hideAllViews();
  document.getElementById('homeView')?.classList.remove('hidden');
  renderTableOfContents();
  if (updateHistory) {
    if (window.location.hash !== '#/inicio') window.location.hash = '#/inicio';
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showInstallationDocs(updateHistory = true) {
  state.view = 'installation';
  hideAllViews();
  document.getElementById('installationDocsView')?.classList.remove('hidden');
  renderTableOfContents();
  if (updateHistory) {
    if (window.location.hash !== '#/docs/instalacao') window.location.hash = '#/docs/instalacao';
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (window.lucide) window.lucide.createIcons();
}

function showTailwindDocs(updateHistory = true) {
  state.view = 'tailwind';
  hideAllViews();
  document.getElementById('tailwindDocsView')?.classList.remove('hidden');
  renderTableOfContents();
  if (updateHistory) {
    if (window.location.hash !== '#/docs/tailwind') window.location.hash = '#/docs/tailwind';
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (window.lucide) window.lucide.createIcons();
}

function showStorybookDocs(updateHistory = true) {
  state.view = 'storybook';
  hideAllViews();
  document.getElementById('storybookDocsView')?.classList.remove('hidden');
  renderTableOfContents();
  if (updateHistory) {
    if (window.location.hash !== '#/docs/storybook') window.location.hash = '#/docs/storybook';
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (window.lucide) window.lucide.createIcons();
}

// ==================== TEMPLATES DE TELAS COMPLETAS ====================
const templateComponentsUsed = {
  login: ['field', 'form', 'input', 'checkbox', 'button', 'loading', 'card', 'badge'],
  home: ['navbar', 'button', 'badge', 'card', 'statistic', 'chart', 'avatar'],
  dashboard: ['sidebar', 'navbar', 'page-header', 'statistic', 'chart', 'table', 'badge', 'pagination', 'button']
};

function showTemplatesView(tplName = 'login', updateHistory = true) {
  state.view = 'templates';
  state.template = tplName;
  hideAllViews();
  document.getElementById('templatesView')?.classList.remove('hidden');

  renderTemplate(tplName);

  if (updateHistory) {
    const targetHash = `#/templates/${tplName}`;
    if (window.location.hash !== targetHash) window.location.hash = targetHash;
  }

  // Atualizar links da sidebar
  document.querySelectorAll('.sidebar-tpl-link').forEach(link => {
    const active = link.dataset.template === tplName;
    link.className = active
      ? 'sidebar-tpl-link flex items-center justify-between rounded-md bg-[#753399]/15 px-2 py-1.5 text-xs font-bold text-[#753399] dark:text-purple-300'
      : 'sidebar-tpl-link flex items-center justify-between rounded-md px-2 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground';
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (window.lucide) window.lucide.createIcons();
}

function selectTemplate(name) {
  showTemplatesView(name, true);
}

function switchTemplateTab(tab) {
  state.templateTab = tab;
  const isPreview = tab === 'preview';

  const previewBtn = document.getElementById('tplTabPreviewBtn');
  const codeBtn = document.getElementById('tplTabCodeBtn');
  const previewContainer = document.getElementById('templatePreviewContainer');
  const codeContainer = document.getElementById('templateCodeContainer');
  const viewportControls = document.getElementById('tplViewportControls');

  if (isPreview) {
    previewBtn.className = 'flex items-center gap-1.5 rounded-lg bg-card px-3 py-1.5 text-xs font-bold text-foreground shadow-sm border border-border';
    codeBtn.className = 'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors';
    previewContainer?.classList.remove('hidden');
    codeContainer?.classList.add('hidden');
    viewportControls?.classList.remove('hidden');
  } else {
    codeBtn.className = 'flex items-center gap-1.5 rounded-lg bg-card px-3 py-1.5 text-xs font-bold text-foreground shadow-sm border border-border';
    previewBtn.className = 'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors';
    previewContainer?.classList.add('hidden');
    codeContainer?.classList.remove('hidden');
    viewportControls?.classList.add('hidden');
  }
}

function setTemplateViewport(mode) {
  state.templateViewport = mode;
  const wrapper = document.getElementById('templateViewportWrapper');
  const btnD = document.getElementById('tplVpDesktop');
  const btnT = document.getElementById('tplVpTablet');
  const btnM = document.getElementById('tplVpMobile');

  [btnD, btnT, btnM].forEach(b => {
    if (b) b.className = 'rounded p-1.5 text-muted-foreground hover:bg-muted font-medium text-xs flex items-center gap-1';
  });

  if (mode === 'desktop') {
    if (btnD) btnD.className = 'rounded p-1.5 text-[#753399] dark:text-purple-300 bg-[#753399]/15 font-semibold text-xs flex items-center gap-1';
    if (wrapper) wrapper.style.maxWidth = '100%';
  } else if (mode === 'tablet') {
    if (btnT) btnT.className = 'rounded p-1.5 text-[#753399] dark:text-purple-300 bg-[#753399]/15 font-semibold text-xs flex items-center gap-1';
    if (wrapper) wrapper.style.maxWidth = '768px';
  } else if (mode === 'mobile') {
    if (btnM) btnM.className = 'rounded p-1.5 text-[#753399] dark:text-purple-300 bg-[#753399]/15 font-semibold text-xs flex items-center gap-1';
    if (wrapper) wrapper.style.maxWidth = '400px';
  }
}

function renderTemplate(name) {
  // Atualizar botões de seleção de template
  const btnLogin = document.getElementById('tplBtnLogin');
  const btnHome = document.getElementById('tplBtnHome');
  const btnDashboard = document.getElementById('tplBtnDashboard');
  const breadcrumb = document.getElementById('templateBreadcrumbName');
  const titleEl = document.getElementById('templateViewTitle');

  [btnLogin, btnHome, btnDashboard].forEach(b => {
    if (b) b.className = 'flex items-center gap-2 rounded-lg border border-input bg-card px-4 py-2.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all';
  });

  if (name === 'login') {
    if (btnLogin) btnLogin.className = 'flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-bold transition-all bg-[#753399] text-white shadow-sm';
    if (breadcrumb) breadcrumb.textContent = 'Login / Autenticação';
    if (titleEl) titleEl.textContent = 'Template: Login Corporativo';
  } else if (name === 'home') {
    if (btnHome) btnHome.className = 'flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-bold transition-all bg-[#753399] text-white shadow-sm';
    if (breadcrumb) breadcrumb.textContent = 'Landing Page (Home)';
    if (titleEl) titleEl.textContent = 'Template: Landing Page & Portal';
  } else if (name === 'dashboard') {
    if (btnDashboard) btnDashboard.className = 'flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-bold transition-all bg-[#753399] text-white shadow-sm';
    if (breadcrumb) breadcrumb.textContent = 'Dashboard SaaS';
    if (titleEl) titleEl.textContent = 'Template: Painel Administrativo SaaS';
  }

  // Injetar Preview HTML
  const stage = document.getElementById('templatePreviewStage');
  if (stage) {
    if (name === 'login') {
      stage.innerHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-2 min-h-[580px]">
          <!-- Left: Login Form -->
          <div class="flex flex-col justify-between p-6 sm:p-10 bg-card">
            <!-- Brand Header -->
            <div class="flex items-center gap-2.5">
              <img src="https://cdn.dribbble.com/userupload/48878224/file/2fbdb62ff72fa4698957846c2ac8c9a9.png?resize=1024x308&vertical=center" alt="Monta UI" class="h-8 w-auto object-contain">
            </div>

            <!-- Main Form Block -->
            <div class="my-6 max-w-sm w-full mx-auto space-y-6">
              <div class="space-y-1.5 text-left">
                <h3 class="font-heading text-2xl font-bold text-foreground">Bem-vindo de volta</h3>
                <p class="text-xs text-muted-foreground">Digite seu e-mail e senha corporativa para acessar.</p>
              </div>

              <!-- Form Fields -->
              <form onsubmit="handleTemplateLoginSubmit(event)" class="space-y-4 text-left">
                <div class="space-y-1.5">
                  <label class="text-xs font-semibold text-foreground flex items-center justify-between">
                    <span>E-mail Corporativo</span>
                    <span class="text-[10px] text-muted-foreground font-normal">Domínio @empresa.com</span>
                  </label>
                  <div class="relative">
                    <i data-lucide="mail" class="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground"></i>
                    <input
                      id="tplLoginEmail"
                      type="email"
                      required
                      placeholder="usuario@montaui.com.br"
                      class="flex h-9 w-full rounded-md border border-input bg-background pl-9 pr-3 text-xs shadow-sm focus:border-[#753399] focus:outline-none focus:ring-1 focus:ring-[#753399] transition-colors"
                    />
                  </div>
                </div>

                <div class="space-y-1.5">
                  <div class="flex items-center justify-between">
                    <label class="text-xs font-semibold text-foreground">Senha</label>
                    <a href="javascript:void(0)" onclick="showToast('Link de recuperação enviado por e-mail')" class="text-[11px] font-semibold text-[#753399] hover:underline">Esqueceu a senha?</a>
                  </div>
                  <div class="relative">
                    <i data-lucide="lock" class="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground"></i>
                    <input
                      id="tplLoginPassword"
                      type="password"
                      required
                      value="••••••••••••"
                      class="flex h-9 w-full rounded-md border border-input bg-background pl-9 pr-9 text-xs shadow-sm focus:border-[#753399] focus:outline-none focus:ring-1 focus:ring-[#753399] transition-colors"
                    />
                    <button type="button" onclick="toggleTemplatePasswordVisibility()" class="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground">
                      <i data-lucide="eye" id="tplLoginEyeIcon" class="h-4 w-4"></i>
                    </button>
                  </div>
                </div>

                <div class="flex items-center gap-2">
                  <input type="checkbox" id="tplLoginRemember" checked class="h-4 w-4 rounded border-border text-[#753399] focus:ring-[#753399]" />
                  <label for="tplLoginRemember" class="text-xs text-muted-foreground cursor-pointer select-none">Lembrar desta sessão por 30 dias</label>
                </div>

                <button
                  id="tplLoginSubmitBtn"
                  type="submit"
                  class="w-full flex items-center justify-center gap-2 rounded-lg bg-[#753399] py-2.5 text-xs font-bold text-white shadow hover:bg-[#622981] active:scale-[0.99] transition-all"
                >
                  <span>Entrar na Plataforma</span>
                  <i data-lucide="arrow-right" class="h-4 w-4"></i>
                </button>
              </form>

              <div class="relative flex items-center justify-center">
                <hr class="w-full border-border" />
                <span class="absolute bg-card px-2 text-[10px] uppercase font-bold text-muted-foreground tracking-wider">ou acesse com SSO</span>
              </div>

              <!-- SSO Corporate Buttons -->
              <div class="grid grid-cols-2 gap-2.5">
                <button onclick="showToast('Autenticando via Google Workspace...')" class="flex items-center justify-center gap-2 rounded-lg border border-border bg-card py-2 text-xs font-semibold text-foreground hover:bg-muted transition-colors">
                  <svg class="h-3.5 w-3.5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
                  <span>Google</span>
                </button>
                <button onclick="showToast('Autenticando via GitHub Enterprise...')" class="flex items-center justify-center gap-2 rounded-lg border border-border bg-card py-2 text-xs font-semibold text-foreground hover:bg-muted transition-colors">
                  <svg class="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                  <span>GitHub</span>
                </button>
              </div>
            </div>

            <!-- Footer Privacy Policy -->
            <p class="text-[11px] text-muted-foreground text-center">
              Ao continuar, você concorda com nossos <a href="javascript:void(0)" class="underline hover:text-foreground">Termos de Serviço</a> e <a href="javascript:void(0)" class="underline hover:text-foreground">Privacidade</a>.
            </p>
          </div>

          <!-- Right: Hero Banner with Purple Gradient -->
          <div class="hidden lg:flex flex-col justify-between p-10 bg-gradient-to-br from-[#753399] via-[#4d1f66] to-zinc-950 text-white relative overflow-hidden">
            <div class="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl pointer-events-none"></div>
            
            <div class="flex items-center justify-between z-10">
              <span class="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur px-3 py-1 text-xs font-semibold text-white/90 border border-white/15">
                <span class="h-2 w-2 rounded-full bg-emerald-400"></span>
                Sistemas 100% Operacionais
              </span>
              <span class="text-xs text-white/70 font-mono">v2.4.0</span>
            </div>

            <div class="space-y-4 z-10 my-auto py-10 text-left">
              <div class="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur border border-white/20">
                <i data-lucide="shield-check" class="h-5 w-5 text-white"></i>
              </div>
              <h4 class="font-heading text-2xl font-bold leading-tight">
                "O Monta UI garantiu a estabilidade e velocidade na entrega de todas as nossas plataformas financeiras."
              </h4>
              <div class="space-y-0.5">
                <p class="text-xs font-bold text-white">Engenharia de Produto</p>
                <p class="text-[11px] text-white/70">Monta Tech Design System Group</p>
              </div>
            </div>

            <!-- Bottom Stats -->
            <div class="grid grid-cols-2 gap-4 border-t border-white/15 pt-6 z-10 text-left">
              <div>
                <p class="text-lg font-extrabold text-white">44 Componentes</p>
                <p class="text-[11px] text-white/70">100% Zero-Radix Nativo</p>
              </div>
              <div>
                <p class="text-lg font-extrabold text-emerald-300">99.9% Uptime</p>
                <p class="text-[11px] text-white/70">SLA Corporativo</p>
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (name === 'home') {
      stage.innerHTML = `
        <div class="w-full bg-card flex flex-col text-left">
          <!-- 1. Top Mini Navigation -->
          <header class="h-14 border-b border-border px-6 flex items-center justify-between">
            <div class="flex items-center gap-6">
              <div class="flex items-center gap-2">
                <img src="https://cdn.dribbble.com/userupload/48878224/file/2fbdb62ff72fa4698957846c2ac8c9a9.png?resize=1024x308&vertical=center" alt="Monta UI" class="h-7 w-auto object-contain">
              </div>
              <nav class="hidden md:flex items-center gap-4 text-xs font-medium text-muted-foreground">
                <a href="javascript:void(0)" class="text-foreground font-semibold">Recursos</a>
                <a href="javascript:void(0)" class="hover:text-foreground">Componentes</a>
                <a href="javascript:void(0)" class="hover:text-foreground">Templates</a>
                <a href="javascript:void(0)" class="hover:text-foreground">Preços</a>
              </nav>
            </div>
            <div class="flex items-center gap-2.5">
              <button onclick="showToast('Abrindo documentação...')" class="rounded-md border border-input px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted">Docs</button>
              <button onclick="showToast('Iniciando cadastro...')" class="rounded-md bg-[#753399] px-3.5 py-1.5 text-xs font-bold text-white shadow hover:bg-[#622981]">Começar Agora</button>
            </div>
          </header>

          <!-- 2. Hero Section -->
          <div class="p-8 sm:p-14 text-center space-y-5 max-w-3xl mx-auto">
            <span class="inline-flex items-center gap-2 rounded-full border border-[#753399]/30 bg-[#753399]/10 px-3.5 py-1 text-xs font-bold text-[#753399] dark:text-purple-300">
              <span class="h-2 w-2 rounded-full bg-[#753399] animate-pulse"></span>
              Novo Release v2.4 — 44 Componentes Corporativos
            </span>
            
            <h2 class="font-heading text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
              O Design System Enterprise Feito para Alta Performance
            </h2>

            <p class="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Componentes 100% nativos em React, TypeScript e Tailwind CSS, sem amarras do Radix UI. Desenvolvido para dashboards analíticos e sistemas corporativos.
            </p>

            <div class="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button onclick="showToast('Template selecionado: Criando projeto...')" class="inline-flex items-center gap-2 rounded-lg bg-[#753399] px-5 py-2.5 text-xs font-bold text-white shadow-lg hover:bg-[#622981] transition-all">
                <span>Criar Projeto Grátis</span>
                <i data-lucide="arrow-right" class="h-4 w-4"></i>
              </button>
              <button onclick="copyInstallCmd()" class="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-xs font-mono font-medium text-foreground hover:bg-muted transition-colors">
                <i data-lucide="terminal" class="h-3.5 w-3.5 text-[#753399]"></i>
                <span>pnpm dlx monta-ui init</span>
              </button>
            </div>

            <!-- 3. Mockup Visual Preview -->
            <div class="mt-8 rounded-xl border border-border bg-muted/20 p-4 shadow-xl text-left space-y-3">
              <div class="flex items-center justify-between border-b border-border pb-2">
                <div class="flex items-center gap-2">
                  <span class="h-3 w-3 rounded-full bg-rose-500"></span>
                  <span class="h-3 w-3 rounded-full bg-amber-500"></span>
                  <span class="h-3 w-3 rounded-full bg-emerald-500"></span>
                  <span class="text-xs font-bold ml-2 text-foreground">Live SaaS Mockup</span>
                </div>
                <span class="rounded bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">● 1.480 TPS</span>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div class="rounded-lg border border-border bg-card p-3 space-y-1">
                  <span class="text-[10px] uppercase font-bold text-muted-foreground">Faturamento Mês</span>
                  <p class="text-base font-extrabold text-foreground font-mono">R$ 489.250,00</p>
                  <span class="text-[10px] font-bold text-emerald-500">▲ +14.8%</span>
                </div>
                <div class="rounded-lg border border-border bg-card p-3 space-y-1">
                  <span class="text-[10px] uppercase font-bold text-muted-foreground">Transações Aprovadas</span>
                  <p class="text-base font-extrabold text-foreground font-mono">3.420</p>
                  <span class="text-[10px] font-bold text-emerald-500">▲ +8.2%</span>
                </div>
                <div class="rounded-lg border border-border bg-card p-3 space-y-1">
                  <span class="text-[10px] uppercase font-bold text-muted-foreground">Taxa de Conversão</span>
                  <p class="text-base font-extrabold text-foreground font-mono">4.92%</p>
                  <span class="text-[10px] font-bold text-emerald-500">▲ +1.1%</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 4. Feature Cards Grid -->
          <div class="border-t border-border p-8 bg-muted/10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="space-y-2">
              <div class="h-8 w-8 rounded-lg bg-[#753399]/15 flex items-center justify-center text-[#753399]">
                <i data-lucide="shield-check" class="h-4 w-4"></i>
              </div>
              <h4 class="font-heading text-sm font-bold text-foreground">100% Zero Radix</h4>
              <p class="text-xs text-muted-foreground leading-relaxed">Arquitetura totalmente autoral construída diretamente sobre React e Tailwind CSS.</p>
            </div>
            <div class="space-y-2">
              <div class="h-8 w-8 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-600">
                <i data-lucide="zap" class="h-4 w-4"></i>
              </div>
              <h4 class="font-heading text-sm font-bold text-foreground">Ultra Performance</h4>
              <p class="text-xs text-muted-foreground leading-relaxed">Bundle leve com transições otimizadas e renderização em milissegundos.</p>
            </div>
            <div class="space-y-2">
              <div class="h-8 w-8 rounded-lg bg-sky-500/15 flex items-center justify-center text-sky-600">
                <i data-lucide="layout" class="h-4 w-4"></i>
              </div>
              <h4 class="font-heading text-sm font-bold text-foreground">Templates Prontos</h4>
              <p class="text-xs text-muted-foreground leading-relaxed">Telas completas de Login, Home e Dashboard prontas para copiar e colar.</p>
            </div>
          </div>
        </div>
      `;
    } else if (name === 'dashboard') {
      stage.innerHTML = `
        <div class="flex h-[620px] bg-card text-left overflow-hidden">
          <!-- Sidebar Left -->
          <aside class="w-56 border-r border-border bg-card flex flex-col justify-between p-3 select-none">
            <div class="space-y-4">
              <!-- Brand Header -->
              <div class="flex items-center gap-2.5 px-2 py-1">
                <img src="https://cdn.dribbble.com/userupload/48878224/file/2fbdb62ff72fa4698957846c2ac8c9a9.png?resize=1024x308&vertical=center" alt="Monta UI" class="h-6 w-auto object-contain">
              </div>

              <!-- Nav Links -->
              <div class="space-y-1">
                <p class="px-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Plataforma</p>
                <button class="w-full flex items-center gap-2 rounded-lg bg-[#753399]/15 px-2.5 py-1.5 text-xs font-bold text-[#753399] dark:text-purple-300">
                  <i data-lucide="layout-dashboard" class="h-3.5 w-3.5 shrink-0"></i>
                  <span>Dashboard</span>
                </button>
                <button class="w-full flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground">
                  <div class="flex items-center gap-2">
                    <i data-lucide="shopping-cart" class="h-3.5 w-3.5 shrink-0"></i>
                    <span>Vendas</span>
                  </div>
                  <span class="rounded bg-emerald-500/15 px-1 py-0.2 text-[9px] font-bold text-emerald-600">Novo</span>
                </button>
                <button class="w-full flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground">
                  <i data-lucide="users" class="h-3.5 w-3.5 shrink-0"></i>
                  <span>Clientes</span>
                </button>
                <button class="w-full flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground">
                  <i data-lucide="credit-card" class="h-3.5 w-3.5 shrink-0"></i>
                  <span>Financeiro</span>
                </button>
                <button class="w-full flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground">
                  <i data-lucide="bar-chart-2" class="h-3.5 w-3.5 shrink-0"></i>
                  <span>Relatórios</span>
                </button>
              </div>
            </div>

            <!-- Profile Card -->
            <div class="border-t border-border pt-2.5">
              <div class="flex items-center gap-2 p-1.5 rounded-lg hover:bg-muted cursor-pointer" onclick="showToast('Perfil: Monta UI')">
                <div class="h-7 w-7 rounded-full bg-[#753399] text-white flex items-center justify-center font-bold text-xs">MU</div>
                <div class="space-y-0.5 flex-1 min-w-0">
                  <p class="text-xs font-bold text-foreground truncate">Monta UI</p>
                  <p class="text-[10px] text-muted-foreground truncate">admin@montaui.com.br</p>
                </div>
              </div>
            </div>
          </aside>

          <!-- Main Dashboard Content -->
          <main class="flex-1 flex flex-col overflow-y-auto bg-muted/20">
            <!-- Top Navbar -->
            <header class="h-12 border-b border-border bg-card px-4 flex items-center justify-between">
              <div class="flex items-center gap-2 text-xs text-muted-foreground">
                <span>Painel</span>
                <i data-lucide="chevron-right" class="h-3 w-3"></i>
                <span class="font-bold text-foreground">Visão Executiva</span>
              </div>
              <div class="flex items-center gap-2">
                <button onclick="showToast('Exportando relatório consolidado...')" class="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1 text-xs font-semibold text-foreground hover:bg-muted shadow-sm">
                  <i data-lucide="download" class="h-3 w-3"></i>
                  <span>Exportar</span>
                </button>
                <button onclick="showToast('Novo lançamento aberto')" class="inline-flex items-center gap-1.5 rounded-md bg-[#753399] px-3 py-1 text-xs font-semibold text-white hover:bg-[#622981] shadow">
                  <i data-lucide="plus" class="h-3 w-3"></i>
                  <span>Lançamento</span>
                </button>
              </div>
            </header>

            <!-- Dashboard Body -->
            <div class="p-5 space-y-4">
              <!-- KPI 4 Cards Grid -->
              <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <div class="rounded-xl border border-border bg-card p-3 space-y-1 shadow-sm">
                  <span class="text-[10px] font-bold text-muted-foreground uppercase">Faturamento Mês</span>
                  <p class="font-mono text-base font-extrabold text-foreground">R$ 489.250,00</p>
                  <span class="text-[10px] font-bold text-emerald-500">▲ +14.8% vs mês ant.</span>
                </div>
                <div class="rounded-xl border border-border bg-card p-3 space-y-1 shadow-sm">
                  <span class="text-[10px] font-bold text-muted-foreground uppercase">Transações Aprovadas</span>
                  <p class="font-mono text-base font-extrabold text-foreground">3.420</p>
                  <span class="text-[10px] font-bold text-emerald-500">▲ +8.2%</span>
                </div>
                <div class="rounded-xl border border-border bg-card p-3 space-y-1 shadow-sm">
                  <span class="text-[10px] font-bold text-muted-foreground uppercase">Clientes Ativos</span>
                  <p class="font-mono text-base font-extrabold text-foreground">1.280</p>
                  <span class="text-[10px] font-bold text-emerald-500">▲ +12.4%</span>
                </div>
                <div class="rounded-xl border border-border bg-card p-3 space-y-1 shadow-sm">
                  <span class="text-[10px] font-bold text-muted-foreground uppercase">Taxa de Conversão</span>
                  <p class="font-mono text-base font-extrabold text-foreground">4.92%</p>
                  <span class="text-[10px] font-bold text-emerald-500">▲ +1.1%</span>
                </div>
              </div>

              <!-- Middle Charts Row -->
              <div class="grid grid-cols-1 lg:grid-cols-3 gap-3">
                <!-- Area Chart -->
                <div class="lg:col-span-2 rounded-xl border border-border bg-card p-4 space-y-3 shadow-sm">
                  <div class="flex items-center justify-between">
                    <h5 class="font-heading text-xs font-bold text-foreground">Evolução de Receita & Conciliação</h5>
                    <span class="text-[10px] text-muted-foreground font-mono">Últimos 6 meses</span>
                  </div>
                  <div class="h-36 w-full flex items-end justify-between gap-2 pt-4">
                    <div class="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <div class="w-full bg-[#753399]/40 hover:bg-[#753399] rounded-t transition-all h-[45%]"></div>
                      <span class="text-[9px] font-mono text-muted-foreground">MAR</span>
                    </div>
                    <div class="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <div class="w-full bg-[#753399]/40 hover:bg-[#753399] rounded-t transition-all h-[60%]"></div>
                      <span class="text-[9px] font-mono text-muted-foreground">ABR</span>
                    </div>
                    <div class="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <div class="w-full bg-[#753399]/40 hover:bg-[#753399] rounded-t transition-all h-[75%]"></div>
                      <span class="text-[9px] font-mono text-muted-foreground">MAI</span>
                    </div>
                    <div class="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <div class="w-full bg-[#753399]/40 hover:bg-[#753399] rounded-t transition-all h-[65%]"></div>
                      <span class="text-[9px] font-mono text-muted-foreground">JUN</span>
                    </div>
                    <div class="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <div class="w-full bg-[#753399]/40 hover:bg-[#753399] rounded-t transition-all h-[88%]"></div>
                      <span class="text-[9px] font-mono text-muted-foreground">JUL</span>
                    </div>
                    <div class="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <div class="w-full bg-[#753399] rounded-t transition-all h-[95%]"></div>
                      <span class="text-[9px] font-mono text-[#753399] font-bold">AGO</span>
                    </div>
                  </div>
                </div>

                <!-- Donut Breakdown -->
                <div class="rounded-xl border border-border bg-card p-4 space-y-3 shadow-sm flex flex-col justify-between">
                  <h5 class="font-heading text-xs font-bold text-foreground">Canais de Recebimento</h5>
                  <div class="space-y-2">
                    <div class="flex items-center justify-between text-xs">
                      <span class="flex items-center gap-1.5 text-muted-foreground"><span class="h-2 w-2 rounded-full bg-[#753399]"></span> Pix Instantâneo</span>
                      <span class="font-mono font-bold text-foreground">54%</span>
                    </div>
                    <div class="flex items-center justify-between text-xs">
                      <span class="flex items-center gap-1.5 text-muted-foreground"><span class="h-2 w-2 rounded-full bg-emerald-500"></span> Cartão de Crédito</span>
                      <span class="font-mono font-bold text-foreground">32%</span>
                    </div>
                    <div class="flex items-center justify-between text-xs">
                      <span class="flex items-center gap-1.5 text-muted-foreground"><span class="h-2 w-2 rounded-full bg-amber-500"></span> Boleto Bancário</span>
                      <span class="font-mono font-bold text-foreground">14%</span>
                    </div>
                  </div>
                  <div class="p-2 rounded-lg bg-muted/40 text-center">
                    <span class="text-[10px] text-muted-foreground">Total Conciliado: <b>R$ 1.480.290,00</b></span>
                  </div>
                </div>
              </div>

              <!-- Bottom Transactions Table with Pagination -->
              <div class="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
                <div class="p-3 border-b border-border flex items-center justify-between">
                  <h5 class="font-heading text-xs font-bold text-foreground">Últimas Transações Conciliadas</h5>
                  <span class="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground">4 de 180 registros</span>
                </div>
                <table class="w-full text-left text-xs">
                  <thead class="bg-muted/40 border-b border-border text-muted-foreground font-semibold">
                    <tr>
                      <th class="p-2.5">Cliente / Razão</th>
                      <th class="p-2.5">Forma</th>
                      <th class="p-2.5">Valor</th>
                      <th class="p-2.5">Status</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-border">
                    <tr class="hover:bg-muted/30">
                      <td class="p-2.5 font-medium text-foreground">Alpha Logística Ltda</td>
                      <td class="p-2.5 text-muted-foreground">Pix</td>
                      <td class="p-2.5 font-mono font-bold text-foreground">R$ 14.850,00</td>
                      <td class="p-2.5"><span class="rounded bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-bold text-emerald-600">Aprovado</span></td>
                    </tr>
                    <tr class="hover:bg-muted/30">
                      <td class="p-2.5 font-medium text-foreground">Beta Varejo Brasil S/A</td>
                      <td class="p-2.5 text-muted-foreground">Cartão 12x</td>
                      <td class="p-2.5 font-mono font-bold text-foreground">R$ 8.920,00</td>
                      <td class="p-2.5"><span class="rounded bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-bold text-emerald-600">Aprovado</span></td>
                    </tr>
                    <tr class="hover:bg-muted/30">
                      <td class="p-2.5 font-medium text-foreground">Gamma Tech Distribuição</td>
                      <td class="p-2.5 text-muted-foreground">Boleto</td>
                      <td class="p-2.5 font-mono font-bold text-foreground">R$ 32.400,00</td>
                      <td class="p-2.5"><span class="rounded bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-bold text-amber-600">Pendente</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      `;
    }
  }

  // Injetar Código TSX
  const tsxCode = getTemplateTSX(name);
  const codeBlock = document.getElementById('templateCodeBlock');
  const codeFilename = document.getElementById('templateCodeFilename');
  if (codeBlock) codeBlock.innerHTML = highlightCode(tsxCode, 'tsx');
  if (codeFilename) codeFilename.textContent = `templates/${name}.tsx`;

  const copyBtn = document.getElementById('copyTemplateCodeBtn');
  if (copyBtn) copyBtn.onclick = () => copyText(tsxCode, `Código TSX do Template ${name.toUpperCase()} copiado!`);

  // Injetar Componentes Utilizados
  const usedList = document.getElementById('templateUsedComponentsList');
  if (usedList) {
    const list = templateComponentsUsed[name] || [];
    usedList.innerHTML = list.map(comp => `
      <button onclick="openComponentDocs('${comp}')" class="inline-flex items-center rounded-md border border-border bg-muted/40 px-2.5 py-1 text-xs font-semibold text-foreground hover:bg-[#753399]/15 hover:text-[#753399] hover:border-[#753399]/40 transition-colors">
        <span>${formatTitle(comp)}</span>
      </button>
    `).join('');
  }

  if (window.lucide) window.lucide.createIcons();
}

function handleTemplateLoginSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('tplLoginSubmitBtn');
  if (btn) {
    const orig = btn.innerHTML;
    btn.innerHTML = '<span class="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent mr-2"></span> Autenticando...';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = orig;
      btn.disabled = false;
      showToast('✅ Login realizado com sucesso! Redirecionando...');
    }, 1500);
  }
}

function toggleTemplatePasswordVisibility() {
  const input = document.getElementById('tplLoginPassword');
  const icon = document.getElementById('tplLoginEyeIcon');
  if (input) {
    if (input.type === 'password') {
      input.type = 'text';
      if (icon) icon.setAttribute('data-lucide', 'eye-off');
    } else {
      input.type = 'password';
      if (icon) icon.setAttribute('data-lucide', 'eye');
    }
    if (window.lucide) window.lucide.createIcons();
  }
}

function getTemplateTSX(name) {
  if (name === 'login') {
    return `"use client"

import * as React from "react"
import { Field, FieldLabel } from "@/components/monta-ui/field"
import { Input } from "@/components/monta-ui/input"
import { Checkbox } from "@/components/monta-ui/checkbox"
import { Button } from "@/components/monta-ui/button"
import { Spinner } from "@/components/monta-ui/loading"
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)
  const [rememberMe, setRememberMe] = React.useState(true)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      alert("Autenticado com sucesso!")
    }, 1500)
  }

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-background text-foreground">
      {/* Coluna Esquerda: Formulário de Autenticação */}
      <div className="flex flex-col justify-between p-8 sm:p-14">
        {/* Marca & Logo */}
        <div className="flex items-center gap-2.5">
          <img
            src="https://cdn.dribbble.com/userupload/48878224/file/2fbdb62ff72fa4698957846c2ac8c9a9.png?resize=1024x308&vertical=center"
            alt="Monta UI"
            className="h-8 w-auto object-contain"
          />
        </div>

        {/* Bloco Central */}
        <div className="my-8 max-w-sm w-full mx-auto space-y-6">
          <div className="space-y-1.5">
            <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">
              Bem-vindo de volta
            </h1>
            <p className="text-xs text-muted-foreground">
              Digite suas credenciais corporativas para acessar o painel.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Field>
              <FieldLabel required>E-mail Corporativo</FieldLabel>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  required
                  placeholder="usuario@empresa.com.br"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9"
                />
              </div>
            </Field>

            <Field>
              <div className="flex items-center justify-between">
                <FieldLabel required>Senha</FieldLabel>
                <a href="#recuperar" className="text-[11px] font-semibold text-[#753399] hover:underline">
                  Esqueceu a senha?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 pr-9"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </Field>

            <div className="flex items-center gap-2">
              <Checkbox
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(!!checked)}
              />
              <label className="text-xs text-muted-foreground cursor-pointer select-none">
                Lembrar desta sessão por 30 dias
              </label>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full gap-2">
              {isLoading && <Spinner size="sm" className="text-white" />}
              <span>{isLoading ? "Autenticando..." : "Entrar na Plataforma"}</span>
              {!isLoading && <ArrowRight className="h-4 w-4" />}
            </Button>
          </form>
        </div>

        <p className="text-[11px] text-muted-foreground text-center">
          Monta UI Design System · Todos os direitos reservados.
        </p>
      </div>

      {/* Coluna Direita: Banner Hero Corporativo */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-[#753399] via-[#4d1f66] to-zinc-950 text-white relative overflow-hidden">
        <div className="flex items-center justify-between z-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur px-3 py-1 text-xs font-semibold text-white border border-white/15">
            <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
            Sistemas 100% Operacionais
          </span>
          <span className="text-xs text-white/70 font-mono">v2.4.0</span>
        </div>

        <div className="space-y-4 z-10 max-w-md">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur border border-white/20">
            <ShieldCheck className="h-5 w-5 text-white" />
          </div>
          <h2 className="font-heading text-2xl font-bold leading-tight">
            "O Monta UI garantiu a estabilidade e velocidade na entrega de todas as nossas plataformas financeiras."
          </h2>
          <p className="text-xs text-white/80 font-bold">Engenharia de Produto · Monta Tech</p>
        </div>

        <div className="grid grid-cols-2 gap-4 border-t border-white/15 pt-6 z-10">
          <div>
            <p className="text-lg font-extrabold text-white">44 Componentes</p>
            <p className="text-[11px] text-white/70">100% Zero-Radix Nativo</p>
          </div>
          <div>
            <p className="text-lg font-extrabold text-emerald-300">99.9% Uptime</p>
            <p className="text-[11px] text-white/70">SLA Corporativo</p>
          </div>
        </div>
      </div>
    </div>
  )
}`
  }

  if (name === 'home') {
    return `"use client"

import * as React from "react"
import { Navbar } from "@/components/monta-ui/navbar"
import { Button } from "@/components/monta-ui/button"
import { Badge } from "@/components/monta-ui/badge"
import { ArrowRight, Terminal, ShieldCheck, Zap, Layout } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* 1. Navbar Superior */}
      <Navbar
        brand={
          <img
            src="https://cdn.dribbble.com/userupload/48878224/file/2fbdb62ff72fa4698957846c2ac8c9a9.png?resize=1024x308&vertical=center"
            alt="Monta UI"
            className="h-7 w-auto object-contain"
          />
        }
        links={[
          { label: "Recursos", href: "#recursos", active: true },
          { label: "Componentes", href: "#componentes" },
          { label: "Templates", href: "#templates" },
          { label: "Preços", href: "#precos" },
        ]}
        actions={
          <Button size="sm" className="bg-[#753399] hover:bg-[#622981]">
            Começar Agora
          </Button>
        }
      />

      {/* 2. Hero Section */}
      <section className="py-20 px-6 sm:px-12 text-center max-w-4xl mx-auto space-y-6">
        <Badge variant="brand" className="px-3.5 py-1 gap-2 text-xs">
          <span className="h-2 w-2 rounded-full bg-[#753399] animate-pulse" />
          Monta UI Release v2.4 — 44 Componentes Corporativos
        </Badge>

        <h1 className="font-heading text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
          O Design System Enterprise Feito para Alta Performance
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Biblioteca de componentes 100% autorais em React, TypeScript e Tailwind CSS, sem amarras do Radix UI. Ideal para sistemas SaaS, ERPs e fintechs.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <Button size="lg" className="gap-2 bg-[#753399] hover:bg-[#622981]">
            <span>Criar Projeto Grátis</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button size="lg" variant="secondary" className="gap-2 font-mono text-xs">
            <Terminal className="h-4 w-4 text-[#753399]" />
            <span>pnpm dlx monta-ui init</span>
          </Button>
        </div>
      </section>

      {/* 3. Grid de Funcionalidades */}
      <section className="border-t border-border py-16 px-6 sm:px-12 bg-muted/10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2 p-6 rounded-xl border border-border bg-card shadow-sm">
            <div className="h-9 w-9 rounded-lg bg-[#753399]/15 flex items-center justify-center text-[#753399]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-heading text-base font-bold">100% Zero Radix</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Sem dependências pesadas. Código limpo e transparente diretamente no seu repositório.
            </p>
          </div>

          <div className="space-y-2 p-6 rounded-xl border border-border bg-card shadow-sm">
            <div className="h-9 w-9 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-600">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="font-heading text-base font-bold">Ultra Performance</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Renderização imediata sem sobrecarga de wrappers ou transições lentas.
            </p>
          </div>

          <div className="space-y-2 p-6 rounded-xl border border-border bg-card shadow-sm">
            <div className="h-9 w-9 rounded-lg bg-sky-500/15 flex items-center justify-center text-sky-600">
              <Layout className="h-5 w-5" />
            </div>
            <h3 className="font-heading text-base font-bold">Templates Prontos</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Telas completas de Login, Home e Dashboard SaaS prontas para uso em produção.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}`
  }

  if (name === 'dashboard') {
    return `"use client"

import * as React from "react"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarItem,
  SidebarFooter,
  SidebarTrigger
} from "@/components/monta-ui/sidebar"
import { Navbar } from "@/components/monta-ui/navbar"
import { Statistic } from "@/components/monta-ui/statistic"
import { Chart } from "@/components/monta-ui/chart"
import { Badge } from "@/components/monta-ui/badge"
import { Button } from "@/components/monta-ui/button"
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  CreditCard,
  BarChart2,
  Download,
  Plus
} from "lucide-react"

export default function DashboardPage() {
  return (
    <SidebarProvider defaultCollapsed={false}>
      <div className="flex h-screen w-full bg-background text-foreground">
        {/* Barra Lateral (Sidebar) */}
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2.5">
              <img
                src="https://cdn.dribbble.com/userupload/48878224/file/2fbdb62ff72fa4698957846c2ac8c9a9.png?resize=1024x308&vertical=center"
                alt="Monta UI"
                className="h-6 w-auto object-contain"
              />
            </div>
            <SidebarTrigger />
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Plataforma</SidebarGroupLabel>
              <SidebarItem icon={<LayoutDashboard className="h-4 w-4" />} active>
                Dashboard
              </SidebarItem>
              <SidebarItem
                icon={<ShoppingCart className="h-4 w-4" />}
                badge={<Badge variant="success" size="sm">Novo</Badge>}
              >
                Vendas & NF-e
              </SidebarItem>
              <SidebarItem icon={<Users className="h-4 w-4" />}>
                Clientes
              </SidebarItem>
              <SidebarItem icon={<CreditCard className="h-4 w-4" />}>
                Financeiro
              </SidebarItem>
              <SidebarItem icon={<BarChart2 className="h-4 w-4" />}>
                Relatórios DRE
              </SidebarItem>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter>
            <div className="flex items-center gap-2.5 p-1">
              <div className="h-7 w-7 rounded-full bg-[#753399] text-white flex items-center justify-center font-bold text-xs">
                MU
              </div>
              <div className="space-y-0.5 text-left">
                <p className="text-xs font-bold leading-none">Monta UI</p>
                <p className="text-[10px] text-muted-foreground leading-none">admin@montaui.com.br</p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Conteúdo Principal com Top Navbar */}
        <main className="flex-1 flex flex-col overflow-y-auto bg-muted/20">
          <Navbar
            searchPlaceholder="Buscar no sistema (⌘K)..."
            user={{
              name: "Monta UI",
              role: "Administrador",
              fallback: "MU"
            }}
            actions={
              <div className="flex items-center gap-2">
                <Button size="sm" variant="secondary" className="gap-1.5">
                  <Download className="h-3.5 w-3.5" />
                  <span>Exportar</span>
                </Button>
                <Button size="sm" className="gap-1.5 bg-[#753399] hover:bg-[#622981]">
                  <Plus className="h-3.5 w-3.5" />
                  <span>Novo Lançamento</span>
                </Button>
              </div>
            }
          />

          <div className="p-6 space-y-6">
            {/* 4 Cards de KPI Executivo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Statistic title="Faturamento Mês" value="R$ 489.250,00" change="+14.8%" trend="up" />
              <Statistic title="Transações Aprovadas" value="3.420" change="+8.2%" trend="up" />
              <Statistic title="Clientes Ativos" value="1.280" change="+12.4%" trend="up" />
              <Statistic title="Taxa de Conversão" value="4.92%" change="+1.1%" trend="up" />
            </div>

            {/* Linha de Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 p-5 rounded-xl border border-border bg-card shadow-sm space-y-3">
                <h3 className="font-heading text-sm font-bold">Evolução de Receita & Conciliação</h3>
                <Chart
                  type="bar"
                  data={[
                    { label: "Mar", value: 320, target: 300 },
                    { label: "Abr", value: 390, target: 350 },
                    { label: "Mai", value: 450, target: 400 },
                    { label: "Jun", value: 410, target: 400 },
                    { label: "Jul", value: 520, target: 480 },
                    { label: "Ago", value: 580, target: 500 }
                  ]}
                />
              </div>

              <div className="p-5 rounded-xl border border-border bg-card shadow-sm space-y-3">
                <h3 className="font-heading text-sm font-bold">Canais de Recebimento</h3>
                <Chart
                  type="donut"
                  data={[
                    { label: "Pix", value: 54, color: "#753399" },
                    { label: "Cartão", value: 32, color: "#10b981" },
                    { label: "Boleto", value: 14, color: "#f59e0b" }
                  ]}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}`
  }

  return `// Template ${name}`
}

// ==================== DOCUMENTAÇÃO DO COMPONENTE ====================
function openComponentDocs(name, updateHistory = true) {
  state.current = name;
  state.view = 'docs';
  state.docTab = 'preview';

  hideAllViews();
  document.getElementById('docsView')?.classList.remove('hidden');

  const category = getCategoryForComponent(name);
  const title = formatTitle(name);
  const desc = descriptions[name] || `Componente React ${title} do Monta UI Design System.`;

  document.getElementById('breadcrumbCategory').textContent = category;
  document.getElementById('breadcrumbName').textContent = title;
  document.getElementById('docTitle').textContent = title;
  document.getElementById('docCategoryBadge').textContent = category;
  document.getElementById('docDescription').textContent = desc;

  // 1. Exemplo Interativo
  renderComponentPreview(name);

  // 2. Código TSX & Exemplo de Uso
  const tsxCode = getComponentTSX(name);
  const usageCode = getComponentUsage(name);

  document.getElementById('docCodeFilename').textContent = `components/monta-ui/${name}.tsx`;
  document.getElementById('docCodeBlock').innerHTML = highlightCode(tsxCode, 'tsx');
  document.getElementById('docUsageBlock').innerHTML = highlightCode(usageCode, 'tsx');

  // 3. Instalação via CLI
  updateCliCommand();

  // 4. Composição & Anatomia
  renderComponentComposition(name);

  // 5. Referência da API (Props)
  renderComponentApiReference(name);

  // 6. Atualizar Tabela de Conteúdos da Página
  renderTableOfContents();

  // Ações
  document.getElementById('copyDocCodeBtn').onclick = () => copyText(tsxCode, 'Código TSX copiado!');
  document.getElementById('downloadBtn').onclick = () => downloadFile(`${name}.tsx`, tsxCode);

  switchDocTab('preview');

  if (updateHistory) {
    const targetHash = `#/componente/${name}`;
    if (window.location.hash !== targetHash) window.location.hash = targetHash;
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Atualizar sidebar
  document.querySelectorAll('.sidebar-link').forEach(link => {
    const active = link.dataset.component === name;
    link.className = active
      ? 'sidebar-link flex items-center justify-between rounded-md bg-accent px-2 py-1.5 text-xs font-semibold text-accent-foreground'
      : 'sidebar-link flex items-center justify-between rounded-md px-2 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground';
  });

  if (window.lucide) window.lucide.createIcons();
}

function switchDocTab(tab) {
  state.docTab = tab;
  const isPreview = tab === 'preview';
  
  const previewBtn = document.getElementById('tabPreviewBtn');
  const codeBtn = document.getElementById('tabCodeBtn');
  const previewContainer = document.getElementById('docPreviewContainer');
  const codeContainer = document.getElementById('docCodeContainer');

  if (isPreview) {
    previewBtn.className = 'flex items-center gap-1.5 rounded-md bg-background px-3 py-1 text-xs font-semibold text-foreground shadow-sm';
    codeBtn.className = 'flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium hover:text-foreground';
    previewContainer.classList.remove('hidden');
    codeContainer.classList.add('hidden');
  } else {
    codeBtn.className = 'flex items-center gap-1.5 rounded-md bg-background px-3 py-1 text-xs font-semibold text-foreground shadow-sm';
    previewBtn.className = 'flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium hover:text-foreground';
    previewContainer.classList.add('hidden');
    codeContainer.classList.remove('hidden');
  }
}

// ==================== SCROLLSPY & NAVEGAÇÃO "NESTA PÁGINA" ====================
const tableOfContentsMap = {
  home: [
    { id: "homeHeroSection", label: "Destaque & Início" },
    { id: "homeShowcaseSection", label: "Showcase Monta UI" },
    { id: "homeCatalogSection", label: "Catálogo de Componentes" }
  ],
  docs: [
    { id: "docPreviewContainer", label: "Exemplo Interativo" },
    { id: "installationSection", label: "Instalação via Monta CLI" },
    { id: "usageSection", label: "Exemplo de Uso" },
    { id: "compositionSection", label: "Composição & Anatomia" },
    { id: "apiSection", label: "Referência da API" },
    { id: "docCodeContainer", label: "Código TSX", isCode: true }
  ],
  installation: [
    { id: "installStep1", label: "1. Criar Projeto" },
    { id: "installStep2", label: "2. Dependências" },
    { id: "installStep3", label: "3. Inicializar CLI" },
    { id: "installStep4", label: "4. Utilitário cn()" },
    { id: "installStep5", label: "5. Adicionar Componente" }
  ],
  tailwind: [
    { id: "tailwindConfigFileSection", label: "1. tailwind.config.js" },
    { id: "tailwindGlobalsCssSection", label: "2. globals.css & Cores" }
  ],
  storybook: [
    { id: "storybookRunSection", label: "1. Executar Storybook" },
    { id: "storybookSetupSection", label: "2. Configuração & Stories" }
  ]
};

function renderTableOfContents() {
  const container = document.getElementById('tocLinksList');
  if (!container) return;

  const currentKey = state.view || 'home';
  const items = tableOfContentsMap[currentKey] || tableOfContentsMap.home;

  container.innerHTML = items.map(item => {
    const clickHandler = item.isCode
      ? `scrollToCodeSection(event)`
      : `scrollToSection(event, '${item.id}')`;
    
    return `
      <li>
        <a href="#${item.id}" onclick="${clickHandler}" data-section="${item.id}" class="toc-item flex items-center gap-2 rounded-md px-2.5 py-1.5 font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all">
          <span class="toc-indicator h-1.5 w-1.5 rounded-full bg-transparent transition-colors"></span>
          <span>${item.label}</span>
        </a>
      </li>
    `;
  }).join('');

  if (items.length > 0) {
    highlightTocItem(items[0].id);
  }
}

function scrollToSection(e, sectionId) {
  if (e) e.preventDefault();
  const target = document.getElementById(sectionId);
  if (!target) return;
  
  const headerOffset = 90;
  const elementPosition = target.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
  
  highlightTocItem(sectionId);
}

function scrollToCodeSection(e) {
  if (e) e.preventDefault();
  switchDocTab('code');
  setTimeout(() => {
    const target = document.getElementById('docCodeContainer');
    if (!target) return;
    const headerOffset = 90;
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
    highlightTocItem('docCodeContainer');
  }, 60);
}

function highlightTocItem(sectionId) {
  const items = document.querySelectorAll('#tocLinksList .toc-item');
  items.forEach(item => {
    const isTarget = item.dataset.section === sectionId;
    const indicator = item.querySelector('.toc-indicator');
    
    if (isTarget) {
      item.className = 'toc-item flex items-center gap-2 rounded-md px-2.5 py-1.5 text-xs font-semibold text-brand bg-brand/10 dark:text-purple-300 transition-all';
      if (indicator) indicator.className = 'toc-indicator h-1.5 w-1.5 rounded-full bg-brand transition-colors';
    } else {
      item.className = 'toc-item flex items-center gap-2 rounded-md px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all';
      if (indicator) indicator.className = 'toc-indicator h-1.5 w-1.5 rounded-full bg-transparent transition-colors';
    }
  });
}

function handleScrollSpy() {
  const currentKey = state.view || 'home';
  const items = tableOfContentsMap[currentKey] || [];
  if (items.length === 0) return;

  const scrollPosition = window.scrollY + 140;
  let currentSection = items[0].id;

  for (const item of items) {
    const el = document.getElementById(item.id);
    if (el && !el.classList.contains('hidden')) {
      const top = el.offsetTop;
      if (scrollPosition >= top) {
        currentSection = item.id;
      }
    }
  }

  highlightTocItem(currentSection);
}

// ==================== CLI PACKAGE MANAGER SELECTOR ====================
function switchPkgManager(pkg) {
  state.pkgManager = pkg;
  ['pnpm', 'npx', 'yarn', 'bun'].forEach(p => {
    const tab = document.getElementById(`pkgTab-${p}`);
    if (!tab) return;
    if (p === pkg) {
      tab.className = 'text-zinc-100 font-semibold border-b-2 border-brand pb-0.5';
    } else {
      tab.className = 'hover:text-zinc-100 pb-0.5 text-zinc-400';
    }
  });
  updateCliCommand();
}

function updateCliCommand() {
  const name = state.current;
  const el = document.getElementById('docCliCommand');
  if (!el) return;

  switch (state.pkgManager) {
    case 'npx':
      el.textContent = `npx monta-ui add ${name}`;
      break;
    case 'yarn':
      el.textContent = `yarn dlx monta-ui add ${name}`;
      break;
    case 'bun':
      el.textContent = `bunx --bun monta-ui add ${name}`;
      break;
    case 'pnpm':
    default:
      el.textContent = `pnpm dlx monta-ui add ${name}`;
      break;
  }
}

// ==================== COMPOSIÇÃO & ANATOMIA ====================
const componentCompositions = {
  'button': {
    anatomy: `<Button variant="default" size="default" isLoading={false}>\n  <Icon className="h-4 w-4" />\n  <span>Salvar Registro</span>\n</Button>`,
    parts: [
      { name: "Button", type: "HTMLButtonElement", role: "Elemento base de disparo interativo com suporte a loading e variantes", props: "variant, size, fullWidth, isLoading, disabled" },
      { name: "ButtonGroup", type: "HTMLDivElement", role: "Contêiner flex que agrupa botões conectados com bordas contínuas", props: "attached, className, children" }
    ]
  },
  'button-group': {
    anatomy: `<ButtonGroup attached={true}>\n  <Button variant="secondary">Anterior</Button>\n  <Button variant="secondary">Próximo</Button>\n</ButtonGroup>`,
    parts: [
      { name: "ButtonGroup", type: "HTMLDivElement", role: "Agrupador horizontal de botões com cantos arredondados automáticos", props: "attached, className, children" },
      { name: "Button", type: "HTMLButtonElement", role: "Botões filhos que compõem o grupo", props: "variant, size, disabled" }
    ]
  },
  'dropdown-menu': {
    anatomy: `<DropdownMenu>\n  <DropdownMenuTrigger asChild>\n    <Button>Opções ▾</Button>\n  </DropdownMenuTrigger>\n  <DropdownMenuContent align="end">\n    <DropdownMenuItem onClick={...}>\n      Perfil Corporativo\n      <DropdownMenuShortcut>Ctrl+P</DropdownMenuShortcut>\n    </DropdownMenuItem>\n    <DropdownMenuSeparator />\n    <DropdownMenuItem className="text-rose-500">Sair</DropdownMenuItem>\n  </DropdownMenuContent>\n</DropdownMenu>`,
    parts: [
      { name: "DropdownMenu", type: "React.Context Provider", role: "Contêiner raiz que gerencia o estado aberto/fechado e clique externo", props: "children" },
      { name: "DropdownMenuTrigger", type: "HTMLButtonElement", role: "Botão ou gatilho que alterna a visibilidade do menu", props: "children, className, onClick" },
      { name: "DropdownMenuContent", type: "HTMLDivElement", role: "Painel flutuante com sombra, borda e posicionamento configurável", props: "align ('start' | 'center' | 'end'), className" },
      { name: "DropdownMenuItem", type: "HTMLButtonElement", role: "Item de ação selecionável que fecha o menu ao ser acionado", props: "onClick, disabled, className" },
      { name: "DropdownMenuSeparator", type: "HTMLDivElement", role: "Linha divisória sutil para agrupamento semântico", props: "className" },
      { name: "DropdownMenuShortcut", type: "HTMLSpanElement", role: "Rótulo alinhado à direita para atalhos de teclado", props: "className, children" }
    ]
  },
  'context-menu': {
    anatomy: `<ContextMenu>\n  <ContextMenuTrigger className="border-dashed p-8">\n    Clique com o botão direito aqui\n  </ContextMenuTrigger>\n  <ContextMenuContent>\n    <ContextMenuItem onClick={...}>Copiar Link</ContextMenuItem>\n    <ContextMenuItem onClick={...}>Duplicar</ContextMenuItem>\n    <ContextMenuSeparator />\n    <ContextMenuItem className="text-rose-500">Excluir</ContextMenuItem>\n  </ContextMenuContent>\n</ContextMenu>`,
    parts: [
      { name: "ContextMenu", type: "HTMLDivElement", role: "Área de captura de evento de clique com o botão direito do mouse", props: "children, className" },
      { name: "ContextMenuTrigger", type: "HTMLDivElement", role: "Região visual onde o usuário interage", props: "children, className" },
      { name: "ContextMenuContent", type: "HTMLDivElement", role: "Menu flutuante renderizado nas coordenadas do cursor", props: "children, className" },
      { name: "ContextMenuItem", type: "HTMLButtonElement", role: "Ação contextual executável", props: "onClick, className" },
      { name: "ContextMenuSeparator", type: "HTMLDivElement", role: "Divisor de seções do menu contextual", props: "className" }
    ]
  },
  'menubar': {
    anatomy: `<Menubar>\n  <MenubarMenu>\n    <MenubarTrigger>Arquivo</MenubarTrigger>\n    <MenubarContent>\n      <MenubarItem onClick={...}>Novo Arquivo <span className="font-mono">Ctrl+N</span></MenubarItem>\n      <MenubarItem onClick={...}>Salvar <span className="font-mono">Ctrl+S</span></MenubarItem>\n    </MenubarContent>\n  </MenubarMenu>\n</Menubar>`,
    parts: [
      { name: "Menubar", type: "HTMLDivElement", role: "Barra horizontal desktop para menus superiores", props: "children, className" },
      { name: "MenubarMenu", type: "React.Component", role: "Contêiner de cada dropdown da barra com estado independente", props: "children" },
      { name: "MenubarTrigger", type: "HTMLButtonElement", role: "Rótulo do menu superior que abre o submenu em cascata", props: "children, className" },
      { name: "MenubarContent", type: "HTMLDivElement", role: "Painel suspenso de comandos com atalhos de teclado", props: "children, className" },
      { name: "MenubarItem", type: "HTMLButtonElement", role: "Comando executável dentro do menu", props: "onClick, className" }
    ]
  },
  'navigation-menu': {
    anatomy: `<NavigationMenu>\n  <NavigationMenuList>\n    <NavigationMenuItem>\n      <NavigationMenuTrigger>Soluções</NavigationMenuTrigger>\n      <NavigationMenuContent>\n        <NavigationMenuLink href="/core">Monta Core</NavigationMenuLink>\n      </NavigationMenuContent>\n    </NavigationMenuItem>\n  </NavigationMenuList>\n</NavigationMenu>`,
    parts: [
      { name: "NavigationMenu", type: "HTMLElement <nav>", role: "Barra de navegação principal para headers e portais", props: "children, className" },
      { name: "NavigationMenuList", type: "HTMLUListElement <ul>", role: "Lista ordenada de itens de menu", props: "children, className" },
      { name: "NavigationMenuItem", type: "HTMLLIElement <li>", role: "Item individual com suporte a mega-menu expansível", props: "children, className" },
      { name: "NavigationMenuTrigger", type: "HTMLButtonElement", role: "Botão gatilho com rotação animada de chevron", props: "children, className" },
      { name: "NavigationMenuContent", type: "HTMLDivElement", role: "Painel mega-menu com layout flex ou grid para links e cards", props: "children, className" },
      { name: "NavigationMenuLink", type: "HTMLAnchorElement <a>", role: "Link padronizado com hover suave e estados ativos", props: "href, children, className" }
    ]
  },
  'dialog': {
    anatomy: `<Dialog open={isOpen} onOpenChange={setIsOpen}>\n  <DialogTrigger asChild>\n    <Button>Abrir Modal</Button>\n  </DialogTrigger>\n  <DialogContent>\n    <DialogHeader>\n      <DialogTitle>Confirmar Operação</DialogTitle>\n      <DialogDescription>Esta ação atualizará os dados no servidor.</DialogDescription>\n    </DialogHeader>\n    <p>Conteúdo do formulário ou aviso...</p>\n    <DialogFooter>\n      <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancelar</Button>\n      <Button onClick={handleConfirm}>Confirmar</Button>\n    </DialogFooter>\n  </DialogContent>\n</Dialog>`,
    parts: [
      { name: "Dialog", type: "React.Context Provider", role: "Controle de estado (aberto/fechado), tecla ESC e eventos de ciclo de vida", props: "open, onOpenChange, children" },
      { name: "DialogTrigger", type: "HTMLButtonElement", role: "Gatilho de abertura da janela modal", props: "children, className" },
      { name: "DialogContent", type: "HTMLDivElement", role: "Janela modal centralizada com backdrop escuro e botão de fechar (X)", props: "children, className" },
      { name: "DialogHeader", type: "HTMLDivElement", role: "Cabeçalho com espaçamento semântico para título e descrição", props: "children, className" },
      { name: "DialogTitle", type: "HTMLHeadingElement <h3>", role: "Título principal da janela acessível via leitor de tela", props: "children, className" },
      { name: "DialogDescription", type: "HTMLParagraphElement <p>", role: "Texto auxiliar e explicativo do diálogo", props: "children, className" },
      { name: "DialogFooter", type: "HTMLDivElement", role: "Rodapé alinhado à direita para botões de confirmação e cancelamento", props: "children, className" }
    ]
  },
  'popover': {
    anatomy: `<Popover>\n  <PopoverTrigger asChild>\n    <Button variant="secondary">Filtros Rápidos</Button>\n  </PopoverTrigger>\n  <PopoverContent align="center">\n    <h4 className="font-bold text-xs">Parâmetros</h4>\n    <p className="text-xs text-muted-foreground">Defina os critérios de busca.</p>\n  </PopoverContent>\n</Popover>`,
    parts: [
      { name: "Popover", type: "React.Context Provider", role: "Contêiner de ancoragem com detecção de clique externo", props: "children" },
      { name: "PopoverTrigger", type: "HTMLButtonElement", role: "Gatilho que posiciona e abre o popover", props: "children, className" },
      { name: "PopoverContent", type: "HTMLDivElement", role: "Caixa flutuante com sombra elevada e alinhamento configurável", props: "align ('start' | 'center' | 'end'), children, className" }
    ]
  },
  'card': {
    anatomy: `<Card>\n  <CardHeader>\n    <CardTitle>Faturamento Mensal</CardTitle>\n    <CardDescription>Resumo financeiro dos últimos 30 dias</CardDescription>\n  </CardHeader>\n  <CardContent>\n    <p>Conteúdo ou métricas do card...</p>\n  </CardContent>\n  <CardFooter>\n    <Button size="sm">Ver Relatório</Button>\n  </CardFooter>\n</Card>`,
    parts: [
      { name: "Card", type: "HTMLDivElement", role: "Superfície em card com borda, fundo suave e sombra", props: "children, className" },
      { name: "CardHeader", type: "HTMLDivElement", role: "Área superior para título e subtítulo com padding estruturado", props: "children, className" },
      { name: "CardTitle", type: "HTMLHeadingElement <h3>", role: "Tipografia de título em negrito no padrão do Design System", props: "children, className" },
      { name: "CardDescription", type: "HTMLParagraphElement <p>", role: "Texto descritivo em cor atenuada (muted-foreground)", props: "children, className" },
      { name: "CardContent", type: "HTMLDivElement", role: "Área principal de conteúdo do card", props: "children, className" },
      { name: "CardFooter", type: "HTMLDivElement", role: "Rodapé inferior para botões de ação e status", props: "children, className" }
    ]
  },
  'accordion': {
    anatomy: `<Accordion>\n  <AccordionItem value="item-1">\n    <AccordionTrigger>Como funciona o faturamento?</AccordionTrigger>\n    <AccordionContent>O faturamento é processado mensalmente via NF-e automática.</AccordionContent>\n  </AccordionItem>\n  <AccordionItem value="item-2">\n    <AccordionTrigger>Quais as formas de pagamento?</AccordionTrigger>\n    <AccordionContent>PIX Corporativo, Boleto Bancário e Cartão de Crédito.</AccordionContent>\n  </AccordionItem>\n</Accordion>`,
    parts: [
      { name: "Accordion", type: "React.Context Provider", role: "Contêiner raiz com gerenciamento de item expandido", props: "children, className" },
      { name: "AccordionItem", type: "HTMLDivElement", role: "Cada painel recolhível individual", props: "value, children, className" },
      { name: "AccordionTrigger", type: "HTMLButtonElement", role: "Botão de alternância com rotação suave do ícone chevron", props: "children, className" },
      { name: "AccordionContent", type: "HTMLDivElement", role: "Corpo do conteúdo revelado ao expandir a sanfona", props: "children, className" }
    ]
  },
  'tabs': {
    anatomy: `<Tabs defaultValue="dados">\n  <TabsList>\n    <TabsTrigger value="dados">Dados Cadastrais</TabsTrigger>\n    <TabsTrigger value="pedidos">Pedidos</TabsTrigger>\n    <TabsTrigger value="auditoria">Auditoria</TabsTrigger>\n  </TabsList>\n  <TabsContent value="dados">\n    <p>Conteúdo da aba Dados Cadastrais...</p>\n  </TabsContent>\n  <TabsContent value="pedidos">\n    <p>Histórico de pedidos corporativos...</p>\n  </TabsContent>\n</Tabs>`,
    parts: [
      { name: "Tabs", type: "React.Context Provider", role: "Contêiner com controle de aba ativa selecionada", props: "defaultValue, value, onValueChange, children" },
      { name: "TabsList", type: "HTMLDivElement", role: "Barra horizontal estilizada para abrigar os gatilhos", props: "children, className" },
      { name: "TabsTrigger", type: "HTMLButtonElement", role: "Botão de seleção de aba com indicador de estado ativo", props: "value, children, className" },
      { name: "TabsContent", type: "HTMLDivElement", role: "Painel renderizado quando a aba correspondente está ativa", props: "value, children, className" }
    ]
  },
  'table': {
    anatomy: `<Table>\n  <TableHeader>\n    <TableRow>\n      <TableHead>Código</TableHead>\n      <TableHead>Cliente</TableHead>\n      <TableHead>Status</TableHead>\n    </TableRow>\n  </TableHeader>\n  <TableBody>\n    <TableRow>\n      <TableCell>#1042</TableCell>\n      <TableCell>Empresa Exemplo S/A</TableCell>\n      <TableCell><Badge>Ativo</Badge></TableCell>\n    </TableRow>\n  </TableBody>\n</Table>`,
    parts: [
      { name: "Table", type: "HTMLTableElement <table>", role: "Tabela com scroll horizontal responsivo e bordas arredondadas", props: "children, className" },
      { name: "TableHeader", type: "HTMLTableSectionElement <thead>", role: "Cabeçalho superior com fundo atenuado (muted/50)", props: "children, className" },
      { name: "TableBody", type: "HTMLTableSectionElement <tbody>", role: "Corpo da tabela com linhas divisórias sutis", props: "children, className" },
      { name: "TableRow", type: "HTMLTableRowElement <tr>", role: "Linha de dados com efeito hover", props: "children, className" },
      { name: "TableHead", type: "HTMLTableCellElement <th>", role: "Célula de título de coluna em texto médio", props: "children, className" },
      { name: "TableCell", type: "HTMLTableCellElement <td>", role: "Célula individual de conteúdo ou dado", props: "children, className" }
    ]
  },
  'stepper': {
    anatomy: `<Stepper\n  steps={[\n    { title: "Empresa", description: "Dados fiscais" },\n    { title: "Endereço", description: "Logística" },\n    { title: "Pagamento", description: "Faturamento" },\n    { title: "Revisão", description: "Conclusão" }\n  ]}\n  currentStep={2}\n  onStepClick={(step) => setStep(step)}\n/>`,
    parts: [
      { name: "Stepper", type: "HTMLDivElement (CSS Grid)", role: "Trilha sequencial de progresso com conexões matemáticas e responsivas", props: "steps, currentStep, onStepClick, className" }
    ]
  },
  'timeline': {
    anatomy: `<Timeline\n  items={[\n    { title: "Pedido Criado", time: "09:15", status: "completed" },\n    { title: "NF-e Emitida", time: "10:42", status: "completed" },\n    { title: "Separação no CD", time: "14:00", status: "in-progress" },\n    { title: "Entrega Transportadora", time: "17:30", status: "pending" }\n  ]}\n/>`,
    parts: [
      { name: "Timeline", type: "HTMLDivElement", role: "Trilha cronológica vertical com nós de status e linha guia contínua", props: "items (TimelineItem[]), className" }
    ]
  },
  'tree-view': {
    anatomy: `<TreeView\n  data={[\n    {\n      id: "1",\n      label: "src",\n      children: [\n        { id: "2", label: "components" },\n        { id: "3", label: "App.tsx" }\n      ]\n    }\n  ]}\n/>`,
    parts: [
      { name: "TreeView", type: "HTMLDivElement", role: "Árvore hierárquica navegável para pastas, diretórios e categorias", props: "data (TreeNode[]), className" }
    ]
  },
  'chart': {
    anatomy: `<Chart\n  type="bar" // "bar" | "area" | "line" | "donut" | "horizontal-bar"\n  title="Faturamento Semestral"\n  description="Comparativo de metas e vendas"\n  data={[\n    { label: "Jan", value: 85, target: 70 },\n    { label: "Fev", value: 92, target: 75 },\n    { label: "Mar", value: 110, target: 80 }\n  ]}\n  color="#753399"\n/>`,
    parts: [
      { name: "Chart", type: "HTMLDivElement", role: "Gráfico corporativo multi-tipo em SVG nativo (Barras, Linha/Área, Rosca/Donut e Metas Horizontais)", props: "type, data (ChartDataPoint[]), title, description, color, height, showLegend, showGrid, className" }
    ]
  },
  'calendar': {
    anatomy: `<Calendar\n  onSelectDate={(date) => console.log(date)}\n  className="border shadow-sm"\n/>`,
    parts: [
      { name: "Calendar", type: "HTMLDivElement", role: "Grid mensal interativo com navegação de meses e seleção de datas", props: "onSelectDate, className" }
    ]
  },
  'input': {
    anatomy: `<Input\n  icon={Search}\n  placeholder="Buscar produto..."\n  clearable={true}\n  onClear={() => setValue("")}\n/>`,
    parts: [
      { name: "Input", type: "HTMLInputElement", role: "Campo de entrada de texto com suporte a ícones, botão limpar e modo senha", props: "icon, clearable, onClear, disabled, className" }
    ]
  },
  'textarea': {
    anatomy: `<Textarea\n  placeholder="Observações do pedido..."\n  maxLength={250}\n  showCount={true}\n/>`,
    parts: [
      { name: "Textarea", type: "HTMLTextAreaElement", role: "Área de texto com redimensionamento contido e contador de caracteres", props: "maxLength, showCount, value, onChange, className" }
    ]
  },
  'checkbox': {
    anatomy: `<Checkbox\n  label="Aceito os termos de serviço"\n  description="Você receberá atualizações de segurança por e-mail."\n  checked={agreed}\n  onChange={(e) => setAgreed(e.target.checked)}\n/>`,
    parts: [
      { name: "Checkbox", type: "HTMLInputElement", role: "Seleção binária acessível com ícone SVG estilizado e suporte a descrição", props: "label, description, checked, defaultChecked, onChange, disabled" }
    ]
  },
  'switch': {
    anatomy: `<Switch\n  checked={enabled}\n  onCheckedChange={(checked) => setEnabled(checked)}\n/>`,
    parts: [
      { name: "Switch", type: "HTMLButtonElement", role: "Interruptor toggle deslizante com transição suave", props: "checked, defaultChecked, onCheckedChange, disabled" }
    ]
  },
  'select': {
    anatomy: `<Select label="Filial de Faturamento">\n  <option value="1">01 - Matriz São Paulo</option>\n  <option value="2">02 - Filial Rio de Janeiro</option>\n</Select>`,
    parts: [
      { name: "Select", type: "HTMLSelectElement", role: "Dropdown de seleção com ícone chevron e suporte a rótulo e mensagem de erro", props: "label, error, children, disabled, className" }
    ]
  },
  'radio-group': {
    anatomy: `<RadioGroup defaultValue="enterprise" onValueChange={(val) => setPlan(val)}>\n  <RadioGroupCard\n    value="enterprise"\n    title="Enterprise Dedicado"\n    description="SLA 99.9% e instâncias dedicadas"\n    badge="Recomendado"\n  />\n  <RadioGroupCard\n    value="business"\n    title="Business Cloud"\n    description="Até 50 usuários simultâneos"\n  />\n</RadioGroup>`,
    parts: [
      { name: "RadioGroup", type: "React.Context Provider", role: "Contêiner de opções mutuamente exclusivas", props: "value, defaultValue, onValueChange, name, disabled, children" },
      { name: "RadioGroupItem", type: "HTMLDivElement", role: "Opção de rádio padrão com círculo indicador preenchido", props: "value, id, disabled, children, className" },
      { name: "RadioGroupCard", type: "HTMLDivElement", role: "Card de opção rica com título, descrição, ícone e badge", props: "value, title, description, icon, badge, disabled, className" }
    ]
  },
  'slider': {
    anatomy: `<Slider\n  min={0}\n  max={100000}\n  step={1000}\n  value={creditLimit}\n  onValueChange={(val) => setCreditLimit(val)}\n  valuePrefix="R$ "\n/>`,
    parts: [
      { name: "Slider", type: "HTMLDivElement / input[type=range]", role: "Controle deslizante contínuo com trilha percentual preenchida, bolha e limites", props: "min, max, step, value, defaultValue, onValueChange, showValue, valuePrefix, valueSuffix, disabled" }
    ]
  },
  'date-picker': {
    anatomy: `<DatePicker\n  label="Data de Vencimento"\n  value={selectedDate}\n  onValueChange={(date) => setSelectedDate(date)}\n  placeholder="Selecione a data..."\n/>`,
    parts: [
      { name: "DatePicker", type: "HTMLDivElement", role: "Campo seletor de data corporativo com calendário popover, atalhos de navegação e formato localizado", props: "value, defaultValue, onValueChange, placeholder, label, disabled, className" }
    ]
  },
  'lookup': {
    anatomy: `<Lookup\n  label="Cliente / Parceiro Comercial"\n  title="Consulta de Clientes"\n  items={clientsList}\n  value={selectedClient}\n  onSelect={(item) => setSelectedClient(item)}\n  placeholder="Buscar cliente..."\n/>`,
    parts: [
      { name: "Lookup", type: "HTMLDivElement", role: "Campo de consulta avançada com diálogo modal de pesquisa em grade de registros", props: "label, title, placeholder, value, items (LookupItem[]), onSelect, disabled, className" }
    ]
  },
  'combo': {
    anatomy: `<Combobox\n  label="Centro de Custo"\n  options={departmentsList}\n  value={dept}\n  onValueChange={(val) => setDept(val)}\n  placeholder="Selecione o departamento..."\n  searchPlaceholder="Buscar departamento..."\n/>`,
    parts: [
      { name: "Combobox", type: "HTMLDivElement", role: "Select com autocomplete pesquisável, filtragem em tempo real e destaque", props: "options (ComboboxOption[]), value, onValueChange, placeholder, searchPlaceholder, label, disabled, className" }
    ]
  },
  'multiselect': {
    anatomy: `<MultiSelect\n  label="Permissões de Acesso"\n  options={permissionsList}\n  selected={selectedRoles}\n  onSelectedChange={(roles) => setSelectedRoles(roles)}\n  placeholder="Selecione as permissões..."\n/>`,
    parts: [
      { name: "MultiSelect", type: "HTMLDivElement", role: "Seletor de múltiplos itens com badges/tags removíveis e caixa de busca com checkboxes", props: "options (MultiSelectOption[]), selected (string[]), onSelectedChange, placeholder, label, disabled, className" }
    ]
  },
  'badge': {
    anatomy: `<Badge variant="success" dot dotColor="bg-emerald-500">\n  Homologado\n</Badge>\n<Badge variant="default" removable onRemove={handleRemove}>\n  Filtro Ativo\n</Badge>`,
    parts: [
      { name: "Badge", type: "HTMLDivElement", role: "Etiqueta visual de status com suporte a ponto de status (dot), tag removível e variantes", props: "variant, size, dot, dotColor, removable, onRemove, children, className" }
    ]
  },
  'alert': {
    anatomy: `<Alert variant="warning" dismissable onClose={handleClose}>\n  <AlertTitle>Atenção Necessária</AlertTitle>\n  <AlertDescription>O certificado digital expira em 5 dias.</AlertDescription>\n</Alert>`,
    parts: [
      { name: "Alert", type: "HTMLDivElement", role: "Card de notificação contextual em bloco com variantes semânticas e suporte a dismiss", props: "variant ('default' | 'brand' | 'success' | 'warning' | 'destructive' | 'info'), icon, dismissable, onClose, children, className" },
      { name: "AlertTitle", type: "HTMLHeadingElement <h5>", role: "Título de destaque da mensagem", props: "children, className" },
      { name: "AlertDescription", type: "HTMLParagraphElement <p>", role: "Texto explicativo detalhado do aviso", props: "children, className" }
    ]
  },
  'toast': {
    anatomy: `<ToastProvider>\n  <App />\n</ToastProvider>\n\n// No componente:\nconst { toast } = useToast()\ntoast({\n  title: "Fatura Emitida",\n  description: "NF-e #4920 autorizada com sucesso.",\n  variant: "success",\n  duration: 4000\n})`,
    parts: [
      { name: "ToastProvider", type: "React.Context Provider", role: "Provedor global de contexto para notificações toast", props: "children" },
      { name: "ToastViewport", type: "HTMLDivElement", role: "Contêiner flutuante com alinhamento na tela", props: "toasts, onDismiss" },
      { name: "ToastCard", type: "HTMLDivElement", role: "Card individual com animação slide-in, ícone semântico e auto-dismiss", props: "item (ToastItem), onDismiss" },
      { name: "useToast", type: "Hook () => ToastContext", role: "Hook para disparo imperativo de toasts na aplicação", props: "toast(options), dismiss(id)" }
    ]
  },
  'progress': {
    anatomy: `<Progress\n  label="Processamento de Dados"\n  value={65}\n  max={100}\n  showValue={true}\n  variant="default"\n  size="default"\n/>`,
    parts: [
      { name: "Progress", type: "HTMLDivElement", role: "Barra de progresso acessível com porcentagem, variantes de cor e modo indeterminate", props: "value, max, variant, size, indeterminate, showValue, label, indicatorClassName, className" }
    ]
  },
  'skeleton': {
    anatomy: `<SkeletonCard />\n// ou componentes atômicos:\n<div className="flex items-center gap-3">\n  <SkeletonAvatar size="default" />\n  <div className="space-y-1.5 flex-1">\n    <Skeleton className="h-3.5 w-1/3" />\n    <Skeleton className="h-2.5 w-1/2" />\n  </div>\n</div>\n<SkeletonText lines={3} />`,
    parts: [
      { name: "Skeleton", type: "HTMLDivElement", role: "Bloco atômico de carregamento com animação pulse", props: "shape ('rectangle' | 'circle' | 'rounded'), className" },
      { name: "SkeletonAvatar", type: "HTMLDivElement", role: "Esqueleto circular pronto para avatares de usuário", props: "size ('sm' | 'default' | 'lg'), className" },
      { name: "SkeletonText", type: "HTMLDivElement", role: "Conjunto de linhas simulando parágrafos de texto", props: "lines (number), className" },
      { name: "SkeletonCard", type: "HTMLDivElement", role: "Estrutura completa de card em loading", props: "className" }
    ]
  },
  'avatar': {
    anatomy: `<Avatar\n  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb"\n  fallback="FJ"\n  status="online"\n  size="default"\n/>`,
    parts: [
      { name: "Avatar", type: "HTMLDivElement", role: "Imagem de perfil com fallback para iniciais e indicador de presença", props: "src, alt, fallback, status ('online' | 'offline' | 'busy'), size ('sm' | 'default' | 'lg')" }
    ]
  },
  'breadcrumb': {
    anatomy: `<Breadcrumb>\n  <BreadcrumbList>\n    <BreadcrumbItem>\n      <BreadcrumbLink href="/inicio">Início</BreadcrumbLink>\n    </BreadcrumbItem>\n    <BreadcrumbSeparator />\n    <BreadcrumbItem>\n      <BreadcrumbPage>Clientes</BreadcrumbPage>\n    </BreadcrumbItem>\n  </BreadcrumbList>\n</Breadcrumb>`,
    parts: [
      { name: "Breadcrumb", type: "HTMLElement <nav>", role: "Navegação estrutural hierárquica", props: "children, className" },
      { name: "BreadcrumbList", type: "HTMLOListElement <ol>", role: "Lista ordenada de elos do caminho", props: "children, className" },
      { name: "BreadcrumbItem", type: "HTMLLIElement <li>", role: "Nó individual de navegação", props: "children, className" },
      { name: "BreadcrumbLink", type: "HTMLAnchorElement <a>", role: "Link de página intermediária", props: "href, children, className" },
      { name: "BreadcrumbPage", type: "HTMLSpanElement <span>", role: "Página ativa atual sem link", props: "children, className" },
      { name: "BreadcrumbSeparator", type: "HTMLLIElement <li>", role: "Ícone chevron separador entre nós", props: "children, className" }
    ]
  },
  'statistic': {
    anatomy: `<Statistic\n  title="MRR Total"\n  value="R$ 482.900"\n  trend={14.8}\n  trendLabel="vs mês anterior"\n  icon={<TrendingUp className="h-4 w-4" />}\n/>`,
    parts: [
      { name: "Statistic", type: "HTMLDivElement", role: "Card de indicador-chave (KPI) com valor numérico e percentual de tendência", props: "title, value, trend, trendLabel, icon, className" }
    ]
  },
  'page-header': {
    anatomy: `<PageHeader\n  title="Gestão de Faturas"\n  description="Gerencie cobranças e notas fiscais."\n  breadcrumbs={<Breadcrumb>...</Breadcrumb>}\n  badge={<Badge variant="success">Produção</Badge>}\n  actions={<Button>Nova Fatura</Button>}\n/>`,
    parts: [
      { name: "PageHeader", type: "HTMLDivElement", role: "Cabeçalho padronizado de página corporativa com breadcrumb, título, badge e ações", props: "title, description, actions, breadcrumbs, badge, className" }
    ]
  },
  'navbar': {
    anatomy: `<Navbar\n  brand={<div className="font-bold">MontaUI</div>}\n  links={[\n    { label: "Dashboard", href: "/dash", active: true },\n    { label: "Clientes", href: "/clientes" }\n  ]}\n  searchPlaceholder="Buscar registros..."\n  onSearchClick={handleSearch}\n  user={{\n    name: "Francinilton Jr",\n    role: "Admin",\n    fallback: "FJ"\n  }}\n  actions={<Button size="sm">Novo</Button>}\n/>`,
    parts: [
      { name: "Navbar", type: "HTMLElement <header>", role: "Barra de topo sticky/fixa com suporte a links, busca com atalho ⌘K, ações e perfil", props: "brand, links (NavbarLink[]), actions, user, searchPlaceholder, onSearchClick, className" }
    ]
  },
  'sidebar': {
    anatomy: `<SidebarProvider defaultCollapsed={false}>\n  <Sidebar>\n    <SidebarHeader>\n      <SidebarBrand />\n      <SidebarTrigger />\n    </SidebarHeader>\n    <SidebarContent>\n      <SidebarGroup>\n        <SidebarGroupLabel>Plataforma</SidebarGroupLabel>\n        <SidebarItem icon={<DashboardIcon />} active>Dashboard</SidebarItem>\n      </SidebarGroup>\n    </SidebarContent>\n    <SidebarFooter>\n      <UserProfileCard />\n    </SidebarFooter>\n  </Sidebar>\n</SidebarProvider>`,
    parts: [
      { name: "SidebarProvider", type: "React.Context Provider", role: "Provedor de contexto para controle do estado recolhido (collapsed) e gaveta mobile", props: "defaultCollapsed, children" },
      { name: "Sidebar", type: "HTMLElement <aside>", role: "Painel lateral com transição suave de largura (w-64 expandido vs w-16 recolhido)", props: "className, children" },
      { name: "SidebarHeader", type: "HTMLDivElement", role: "Cabeçalho com marca da empresa e botão de recolher", props: "children, className" },
      { name: "SidebarContent", type: "HTMLDivElement", role: "Área de rolagem com os grupos e links de navegação", props: "children, className" },
      { name: "SidebarGroup", type: "HTMLDivElement", role: "Contêiner de agrupamento temático de opções", props: "children, className" },
      { name: "SidebarGroupLabel", type: "HTMLParagraphElement", role: "Rótulo em caixa-alta da seção", props: "children, className" },
      { name: "SidebarItem", type: "HTMLButtonElement", role: "Item de menu com ícone, texto truncável, badge e estado ativo", props: "icon, active, badge, children, className" },
      { name: "SidebarFooter", type: "HTMLDivElement", role: "Rodapé fixo inferior com perfil do usuário logado", props: "children, className" },
      { name: "SidebarTrigger", type: "HTMLButtonElement", role: "Botão de gatilho para recolher ou expandir a barra", props: "className" }
    ]
  },
  'field': {
    anatomy: `<Field error={hasError}>\n  <FieldLabel required>Razão Social</FieldLabel>\n  <Input placeholder="Nome da empresa" />\n  <FieldDescription>Conforme consta no cartão CNPJ.</FieldDescription>\n  <FieldError>Campo obrigatório</FieldError>\n</Field>`,
    parts: [
      { name: "Field", type: "HTMLDivElement", role: "Contêiner flexível do campo com estados de erro e desabilitado", props: "error, disabled, className, children" },
      { name: "FieldLabel", type: "HTMLLabelElement", role: "Rótulo com indicador de obrigatoriedade (*)", props: "required, children, className" },
      { name: "FieldDescription", type: "HTMLParagraphElement", role: "Texto descritivo de apoio e instruções", props: "children, className" },
      { name: "FieldError", type: "HTMLParagraphElement", role: "Mensagem de alerta em vermelho renderizada sob demanda", props: "children, className" }
    ]
  },
  'form': {
    anatomy: `<Form onSubmit={handleSubmit}>\n  <FormHeader title="Cadastro" description="Preencha os dados" />\n  <FormSection title="1. Fiscal">\n    <FormRow>\n      <Field>...</Field>\n      <Field>...</Field>\n    </FormRow>\n  </FormSection>\n  <FormActions>\n    <Button type="submit">Salvar</Button>\n  </FormActions>\n</Form>`,
    parts: [
      { name: "Form", type: "HTMLFormElement", role: "Contêiner principal de formulário com suporte a onSubmit e espaçamento consistente", props: "onSubmit, className, children" },
      { name: "FormHeader", type: "HTMLDivElement", role: "Título, subtítulo e badge contextual do formulário", props: "title, description, badge, className" },
      { name: "FormSection", type: "HTMLDivElement", role: "Seção lógica agrupada com cabeçalho explicativo", props: "title, description, children, className" },
      { name: "FormRow", type: "HTMLDivElement", role: "Linha responsiva em grade de 2 colunas para campos paralelos", props: "children, className" },
      { name: "FormDivider", type: "HTMLHRElement", role: "Linha divisória de separação entre blocos", props: "className" },
      { name: "FormActions", type: "HTMLDivElement", role: "Barra de ações alinhada à direita (Salvar / Cancelar)", props: "children, className" }
    ]
  },
  'marker': {
    anatomy: `<Marker\n  variant="brand" // "brand" | "success" | "warning" | "destructive" | "info"\n  label="1"\n  pulse={true}\n  size="default" // "sm" | "default" | "lg"\n  tooltip={<div>Matriz SP</div>}\n/>`,
    parts: [
      { name: "Marker", type: "HTMLDivElement", role: "Marcador de ponto de interesse com pulso radar, índice numérico e card de tooltip flutuante", props: "variant, label, tooltip, pulse, size, className" }
    ]
  },
  'pagination': {
    anatomy: `<Pagination>\n  <PaginationContent>\n    <PaginationItem><PaginationPrevious /></PaginationItem>\n    <PaginationItem><PaginationLink isActive>1</PaginationLink></PaginationItem>\n    <PaginationItem><PaginationEllipsis /></PaginationItem>\n    <PaginationItem><PaginationNext /></PaginationItem>\n  </PaginationContent>\n</Pagination>`,
    parts: [
      { name: "Pagination", type: "HTMLElement <nav>", role: "Contêiner de navegação acessível com role=navigation", props: "className, children" },
      { name: "PaginationContent", type: "HTMLUListElement <ul>", role: "Lista horizontal flexível de botões de página", props: "children, className" },
      { name: "PaginationItem", type: "HTMLLIElement <li>", role: "Invólucro de cada elemento da paginação", props: "children, className" },
      { name: "PaginationLink", type: "HTMLButtonElement", role: "Botão numerado de página com variante ativa em destaque", props: "isActive, size, onClick, children, className" },
      { name: "PaginationPrevious", type: "HTMLButtonElement", role: "Botão de retrocesso com ícone chevron", props: "onClick, disabled, className" },
      { name: "PaginationNext", type: "HTMLButtonElement", role: "Botão de avanço com ícone chevron", props: "onClick, disabled, className" },
      { name: "PaginationEllipsis", type: "HTMLSpanElement", role: "Ícone de reticências para truncamento de páginas", props: "className" }
    ]
  },
  'loading': {
    anatomy: `<Loading\n  variant="spinner" // "spinner" | "dots" | "pulse" | "bars" | "overlay"\n  size="default" // "xs" | "sm" | "default" | "lg" | "xl"\n  text="Carregando dados..."\n  fullscreen={false}\n/>`,
    parts: [
      { name: "Loading", type: "HTMLDivElement", role: "Contêiner universal com suporte a todas as variantes e rótulos de texto", props: "variant, size, text, fullscreen, className, children" },
      { name: "Spinner", type: "SVGSVGElement", role: "Ícone SVG animado de rotação com espessura calibrada", props: "size, className" },
      { name: "LoadingDots", type: "HTMLDivElement", role: "3 pontos saltitantes em onda senoidal", props: "className" },
      { name: "LoadingBars", type: "HTMLDivElement", role: "Barras verticais equalizadoras animadas", props: "className" },
      { name: "LoadingPulse", type: "HTMLDivElement", role: "Círculo com radar de ondas concêntricas", props: "className" },
      { name: "LoadingOverlay", type: "HTMLDivElement", role: "Camada de bloqueio translúcida com backdrop blur para cards e diálogos", props: "text, subtext, className" }
    ]
  }
};

function renderComponentComposition(name) {
  const container = document.getElementById('compositionContainer');
  const countBadge = document.getElementById('compositionCountBadge');
  if (!container) return;

  const data = componentCompositions[name] || {
    anatomy: `<${formatTitle(name).replace(/\\s+/g, '')} />`,
    parts: [
      { name: formatTitle(name).replace(/\\s+/g, ''), type: "React.Component", role: "Componente corporativo principal", props: "className, children" }
    ]
  };

  if (countBadge) {
    countBadge.textContent = `${data.parts.length} ${data.parts.length === 1 ? 'parte' : 'partes exportadas'}`;
  }

  container.innerHTML = `
    <!-- 1. Anatomia / Estrutura JSX -->
    <div class="rounded-lg border border-zinc-800 bg-zinc-950 overflow-hidden">
      <div class="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-4 py-2 text-xs text-zinc-300 font-mono">
        <span class="flex items-center gap-1.5"><i data-lucide="code-2" class="h-3.5 w-3.5 text-brand"></i> Estrutura JSX / Hierarquia</span>
        <span class="text-[10px] text-zinc-400">Anatomia do Módulo</span>
      </div>
      <pre class="overflow-x-auto p-4 font-mono text-xs leading-relaxed max-h-[260px] text-[#a5d6ff]"><code>${escapeHTML(data.anatomy)}</code></pre>
    </div>

    <!-- 2. Tabela de Subcomponentes -->
    <div class="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs border-collapse">
          <thead class="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
            <tr>
              <th class="p-3 w-44">Subcomponente</th>
              <th class="p-3 w-40">Tipo / Base</th>
              <th class="p-3">Papel & Responsabilidade</th>
              <th class="p-3 w-48 font-mono">Props Chave</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border/60">
            ${data.parts.map(p => `
              <tr class="hover:bg-muted/40 transition-colors">
                <td class="p-3 font-mono font-bold text-brand flex items-center gap-1.5">
                  <span class="h-1.5 w-1.5 rounded-full bg-brand"></span>
                  &lt;${escapeHTML(p.name)}&gt;
                </td>
                <td class="p-3 font-mono text-[11px] text-muted-foreground">
                  ${escapeHTML(p.type)}
                </td>
                <td class="p-3 text-foreground leading-relaxed">
                  ${escapeHTML(p.role)}
                </td>
                <td class="p-3 font-mono text-[11px] text-muted-foreground">
                  ${escapeHTML(p.props)}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  if (window.lucide) window.lucide.createIcons();
}

// ==================== REFERÊNCIA DA API (PROPS) ====================
const componentApiReferences = {
  'button': [
    { prop: "variant", type: '"default" | "secondary" | "ghost" | "danger" | "success"', default: '"default"', description: "Estilo visual e intenção semântica do botão." },
    { prop: "size", type: '"default" | "sm" | "lg" | "icon"', default: '"default"', description: "Dimensões, altura mínima e padding interno." },
    { prop: "isLoading", type: "boolean", default: "false", description: "Ativa o spinner de carregamento e desativa interações." },
    { prop: "fullWidth", type: "boolean", default: "false", description: "Ocupa 100% da largura disponível do contêiner." },
    { prop: "disabled", type: "boolean", default: "false", description: "Desativa o elemento e reduz a opacidade para 50%." },
    { prop: "children", type: "React.ReactNode", default: "-", description: "Conteúdo, texto ou ícones internos do botão." }
  ],
  'button-group': [
    { prop: "attached", type: "boolean", default: "true", description: "Conecta os botões lado a lado eliminando bordas duplas." },
    { prop: "className", type: "string", default: "undefined", description: "Classes utilitárias adicionais do Tailwind CSS." },
    { prop: "children", type: "React.ReactNode", default: "-", description: "Conjunto de elementos <Button>." }
  ],
  'dropdown-menu': [
    { prop: "align", type: '"start" | "center" | "end"', default: '"start"', description: "Alinhamento horizontal do painel <DropdownMenuContent>." },
    { prop: "sideOffset", type: "number", default: "4", description: "Distância em pixels entre o gatilho e o painel flutuante." },
    { prop: "disabled", type: "boolean", default: "false", description: "Desativa o item de menu impedindo cliques." },
    { prop: "onClick", type: "(event: React.MouseEvent) => void", default: "undefined", description: "Callback disparado ao clicar no <DropdownMenuItem>." },
    { prop: "children", type: "React.ReactNode", default: "-", description: "Subcomponentes e itens de menu." }
  ],
  'context-menu': [
    { prop: "onClick", type: "(event: React.MouseEvent) => void", default: "undefined", description: "Callback de ação para o <ContextMenuItem>." },
    { prop: "className", type: "string", default: "undefined", description: "Classes de estilização para o contêiner ou itens." },
    { prop: "children", type: "React.ReactNode", default: "-", description: "Itens contextuais e gatilho." }
  ],
  'menubar': [
    { prop: "open", type: "boolean", default: "false", description: "Estado de abertura de cada submenu da barra." },
    { prop: "align", type: '"start" | "center" | "end"', default: '"start"', description: "Alinhamento do painel suspenso <MenubarContent>." },
    { prop: "onClick", type: "(event: React.MouseEvent) => void", default: "undefined", description: "Ação executada ao selecionar um item." }
  ],
  'navigation-menu': [
    { prop: "href", type: "string", default: "undefined", description: "Destino do link para <NavigationMenuLink>." },
    { prop: "open", type: "boolean", default: "false", description: "Estado de abertura do painel mega-menu." },
    { prop: "children", type: "React.ReactNode", default: "-", description: "Lista de links e painéis." }
  ],
  'dialog': [
    { prop: "open", type: "boolean", default: "undefined", description: "Estado de abertura em modo controlado." },
    { prop: "onOpenChange", type: "(open: boolean) => void", default: "undefined", description: "Callback disparado quando o diálogo abre ou fecha." },
    { prop: "children", type: "React.ReactNode", default: "-", description: "Estrutura com Header, Title, Description, Content e Footer." }
  ],
  'popover': [
    { prop: "align", type: '"start" | "center" | "end"', default: '"start"', description: "Posicionamento horizontal da caixa flutuante." },
    { prop: "children", type: "React.ReactNode", default: "-", description: "Gatilho e conteúdo flutuante." }
  ],
  'card': [
    { prop: "className", type: "string", default: "undefined", description: "Classes Tailwind para ajuste de padding, cor ou sombra." },
    { prop: "children", type: "React.ReactNode", default: "-", description: "Subcomponentes Header, Title, Description, Content e Footer." }
  ],
  'accordion': [
    { prop: "defaultValue", type: "string", default: "undefined", description: "Valor do item que inicia expandido." },
    { prop: "value", type: "string", default: "-", description: "Identificador exclusivo do <AccordionItem>." },
    { prop: "children", type: "React.ReactNode", default: "-", description: "Lista de sanfonas e conteúdos." }
  ],
  'tabs': [
    { prop: "defaultValue", type: "string", default: "undefined", description: "Identificador da aba inicialmente ativa." },
    { prop: "value", type: "string", default: "undefined", description: "Valor da aba ativa em modo controlado." },
    { prop: "onValueChange", type: "(value: string) => void", default: "undefined", description: "Callback disparado ao alternar a aba." }
  ],
  'table': [
    { prop: "className", type: "string", default: "undefined", description: "Classes para ajuste de largura, scroll e espaçamento." },
    { prop: "children", type: "React.ReactNode", default: "-", description: "Estrutura padrão com Thead, Tbody, Tr, Th e Td." }
  ],
  'stepper': [
    { prop: "steps", type: "Array<{ title: string, description?: string }>", default: "[]", description: "Array com as etapas do processo sequencial." },
    { prop: "currentStep", type: "number", default: "1", description: "Etapa ativa atual (índice 1-based)." },
    { prop: "onStepClick", type: "(step: number) => void", default: "undefined", description: "Callback disparado ao clicar em uma etapa navegável." }
  ],
  'timeline': [
    { prop: "items", type: "Array<{ title: string, time: string, status: 'completed'|'in-progress'|'pending', description?: string }>", default: "[]", description: "Conjunto de eventos históricos cronológicos." },
    { prop: "className", type: "string", default: "undefined", description: "Customização da trilha vertical." }
  ],
  'tree-view': [
    { prop: "data", type: "TreeNode[]", default: "[]", description: "Estrutura aninhada com id, label e children recursivos." },
    { prop: "onSelect", type: "(node: TreeNode) => void", default: "undefined", description: "Callback ao clicar em um nó da árvore." }
  ],
  'chart': [
    { prop: "type", type: '"bar" | "area" | "line" | "donut" | "horizontal-bar"', default: '"bar"', description: "Tipo de visualização gráfica a ser renderizada." },
    { prop: "data", type: "ChartDataPoint[]", default: "[]", description: "Array de pontos contendo label, value, target opcional e color." },
    { prop: "title", type: "string", default: '""', description: "Título do cabeçalho do gráfico corporativo." },
    { prop: "description", type: "string", default: '""', description: "Subtítulo de apoio contextual." },
    { prop: "color", type: "string", default: '"#753399"', description: "Cor primária aplicada às barras, linhas ou preenchimentos." },
    { prop: "height", type: "number", default: "180", description: "Altura do contêiner de renderização gráfica em pixels." },
    { prop: "showLegend", type: "boolean", default: "true", description: "Exibe a legenda lateral detalhada com percentuais." },
    { prop: "showGrid", type: "boolean", default: "true", description: "Exibe linhas pontilhadas de grade no fundo (modo área/linha)." }
  ],
  'calendar': [
    { prop: "selectedDate", type: "Date", default: "new Date()", description: "Data selecionada no calendário." },
    { prop: "onSelectDate", type: "(date: Date) => void", default: "undefined", description: "Callback disparado ao selecionar um dia." },
    { prop: "className", type: "string", default: "undefined", description: "Classes de contorno e dimensões." }
  ],
  'input': [
    { prop: "icon", type: "LucideIcon", default: "undefined", description: "Ícone decorativo posicionado à esquerda." },
    { prop: "clearable", type: "boolean", default: "false", description: "Exibe botão X para limpar o texto digitado." },
    { prop: "onClear", type: "() => void", default: "undefined", description: "Callback chamado ao limpar o campo." },
    { prop: "error", type: "string", default: "undefined", description: "Mensagem de erro de validação em vermelho." },
    { prop: "type", type: "string", default: '"text"', description: "Tipo HTML do input (text, password, email, etc.)." }
  ],
  'textarea': [
    { prop: "maxLength", type: "number", default: "undefined", description: "Limite numérico de caracteres." },
    { prop: "showCount", type: "boolean", default: "false", description: "Exibe contador de caracteres no rodapé." },
    { prop: "placeholder", type: "string", default: '""', description: "Texto provisório auxiliar." }
  ],
  'checkbox': [
    { prop: "label", type: "string", default: '""', description: "Texto do rótulo ao lado do seletor." },
    { prop: "description", type: "string", default: "undefined", description: "Texto de apoio abaixo do rótulo." },
    { prop: "checked", type: "boolean", default: "undefined", description: "Estado booleano marcado/desmarcado." },
    { prop: "onChange", type: "(e: React.ChangeEvent<HTMLInputElement>) => void", default: "undefined", description: "Evento de alteração." }
  ],
  'switch': [
    { prop: "checked", type: "boolean", default: "undefined", description: "Estado ativo/inativo do interruptor." },
    { prop: "onCheckedChange", type: "(checked: boolean) => void", default: "undefined", description: "Callback disparado na alternância." },
    { prop: "disabled", type: "boolean", default: "false", description: "Desativa interações com o switch." }
  ],
  'select': [
    { prop: "label", type: "string", default: "undefined", description: "Rótulo superior do seletor." },
    { prop: "error", type: "string", default: "undefined", description: "Texto de validação em caso de erro." },
    { prop: "children", type: "React.ReactNode", default: "-", description: "Elementos <option>." }
  ],
  'radio-group': [
    { prop: "value", type: "string", default: "undefined", description: "Valor do item de rádio atualmente selecionado (modo controlado)." },
    { prop: "defaultValue", type: "string", default: "undefined", description: "Valor inicial selecionado (modo não controlado)." },
    { prop: "onValueChange", type: "(value: string) => void", default: "undefined", description: "Callback disparado quando uma nova opção é selecionada." },
    { prop: "name", type: "string", default: "undefined", description: "Nome do grupo de formulário para envio nativo." },
    { prop: "disabled", type: "boolean", default: "false", description: "Desativa todo o grupo de rádio." }
  ],
  'slider': [
    { prop: "value", type: "number", default: "undefined", description: "Valor numérico atual do slider (modo controlado)." },
    { prop: "defaultValue", type: "number", default: "0", description: "Valor inicial não controlado." },
    { prop: "min", type: "number", default: "0", description: "Valor mínimo da escala do slider." },
    { prop: "max", type: "number", default: "100", description: "Valor máximo da escala do slider." },
    { prop: "step", type: "number", default: "1", description: "Intervalo de incremento ao arrastar." },
    { prop: "showValue", type: "boolean", default: "true", description: "Exibe badge centralizada com o valor atual." },
    { prop: "valuePrefix", type: "string", default: '""', description: "Prefixo exibido junto ao valor (ex: 'R$ ')." },
    { prop: "valueSuffix", type: "string", default: '""', description: "Sufixo exibido junto ao valor (ex: ' %', ' kg')." },
    { prop: "onValueChange", type: "(value: number) => void", default: "undefined", description: "Callback disparado em tempo real ao mover o slider." }
  ],
  'date-picker': [
    { prop: "value", type: "Date | null", default: "undefined", description: "Data selecionada em modo controlado." },
    { prop: "defaultValue", type: "Date | null", default: "null", description: "Data inicial não controlada." },
    { prop: "onValueChange", type: "(date: Date | null) => void", default: "undefined", description: "Callback disparado ao escolher ou limpar a data." },
    { prop: "placeholder", type: "string", default: '"Selecione uma data..."', description: "Texto exibido quando nenhuma data foi selecionada." },
    { prop: "label", type: "string", default: "undefined", description: "Rótulo superior do campo." },
    { prop: "disabled", type: "boolean", default: "false", description: "Desabilita a interação com o date picker." }
  ],
  'lookup': [
    { prop: "label", type: "string", default: "undefined", description: "Rótulo superior do campo de consulta." },
    { prop: "title", type: "string", default: '"Buscar Registro Corporativo"', description: "Título do diálogo modal de pesquisa." },
    { prop: "placeholder", type: "string", default: '"Clique para buscar..."', description: "Texto indicativo no botão do campo." },
    { prop: "items", type: "LookupItem[]", default: "[]", description: "Lista de registros corporativos com id, code, label e subtitle." },
    { prop: "value", type: "LookupItem | null", default: "undefined", description: "Registro atualmente selecionado." },
    { prop: "onSelect", type: "(item: LookupItem | null) => void", default: "undefined", description: "Callback executado ao confirmar a seleção." },
    { prop: "disabled", type: "boolean", default: "false", description: "Desativa o campo e impede abertura do modal." }
  ],
  'combo': [
    { prop: "options", type: "ComboboxOption[]", default: "[]", description: "Lista de opções pesquisáveis com value, label e hint opcional." },
    { prop: "value", type: "string", default: "undefined", description: "Valor do item selecionado." },
    { prop: "onValueChange", type: "(value: string) => void", default: "undefined", description: "Callback disparado ao escolher uma opção." },
    { prop: "placeholder", type: "string", default: '"Selecione uma opção..."', description: "Placeholder do botão do dropdown." },
    { prop: "searchPlaceholder", type: "string", default: '"Buscar na lista..."', description: "Placeholder da caixa de busca interna." },
    { prop: "label", type: "string", default: "undefined", description: "Rótulo superior do combobox." }
  ],
  'multiselect': [
    { prop: "options", type: "MultiSelectOption[]", default: "[]", description: "Lista de opções disponíveis para múltipla escolha." },
    { prop: "selected", type: "string[]", default: "[]", description: "Array com os valores dos itens selecionados." },
    { prop: "onSelectedChange", type: "(values: string[]) => void", default: "undefined", description: "Callback disparado ao adicionar ou remover itens." },
    { prop: "placeholder", type: "string", default: '"Selecione múltiplos itens..."', description: "Texto exibido quando nenhum item está marcado." },
    { prop: "label", type: "string", default: "undefined", description: "Rótulo superior do seletor." }
  ],
  'badge': [
    { prop: "variant", type: '"default" | "secondary" | "success" | "warning" | "destructive" | "outline" | "brand" | "ghost"', default: '"default"', description: "Tonalidade semântica e cor de fundo do badge." },
    { prop: "size", type: '"sm" | "default" | "lg"', default: '"default"', description: "Tamanho e padding do badge." },
    { prop: "dot", type: "boolean", default: "false", description: "Exibe ponto luminoso indicador de status no canto esquerdo." },
    { prop: "dotColor", type: "string", default: "undefined", description: "Classe de cor Tailwind para o ponto (ex: 'bg-emerald-500')." },
    { prop: "removable", type: "boolean", default: "false", description: "Exibe botão 'x' para remoção da tag." },
    { prop: "onRemove", type: "(e: React.MouseEvent) => void", default: "undefined", description: "Callback disparado ao clicar no botão de remoção." }
  ],
  'alert': [
    { prop: "variant", type: '"default" | "brand" | "success" | "warning" | "destructive" | "info"', default: '"default"', description: "Nível de severidade e esquema de cores do alerta." },
    { prop: "icon", type: "React.ReactNode", default: "undefined", description: "Ícone customizado. Se omitido, utiliza o ícone automático da variante." },
    { prop: "dismissable", type: "boolean", default: "false", description: "Exibe botão de fechar no canto superior direito." },
    { prop: "onClose", type: "() => void", default: "undefined", description: "Callback disparado ao fechar o alerta." },
    { prop: "children", type: "React.ReactNode", default: "-", description: "Subcomponentes AlertTitle, AlertDescription e ações." }
  ],
  'toast': [
    { prop: "title", type: "string", default: '""', description: "Título de destaque da notificação temporária." },
    { prop: "description", type: "string", default: '""', description: "Texto de apoio ou detalhes da ação executada." },
    { prop: "variant", type: '"default" | "success" | "destructive" | "warning" | "info"', default: '"default"', description: "Estilo visual e ícone temático do toast." },
    { prop: "duration", type: "number", default: "4000", description: "Tempo em milissegundos antes do fechamento automático." },
    { prop: "action", type: "{ label: string, onClick: () => void }", default: "undefined", description: "Botão de ação interativa (ex: 'Desfazer')." }
  ],
  'progress': [
    { prop: "value", type: "number", default: "0", description: "Valor numérico atual da barra de progresso." },
    { prop: "max", type: "number", default: "100", description: "Valor máximo de referência da escala (100%)." },
    { prop: "variant", type: '"default" | "success" | "warning" | "destructive" | "info"', default: '"default"', description: "Cor da barra de preenchimento." },
    { prop: "size", type: '"xs" | "sm" | "default" | "lg" | "xl"', default: '"default"', description: "Espessura/altura vertical da barra." },
    { prop: "indeterminate", type: "boolean", default: "false", description: "Ativa animação contínua em loop para carregamento indeterminado." },
    { prop: "showValue", type: "boolean", default: "false", description: "Exibe percentual formatado ao lado do rótulo." },
    { prop: "label", type: "string", default: "undefined", description: "Rótulo descritivo superior do progresso." }
  ],
  'skeleton': [
    { prop: "shape", type: '"rectangle" | "circle" | "rounded"', default: '"rounded"', description: "Formato geométrico do bloco em pulso." },
    { prop: "className", type: "string", default: "undefined", description: "Dimensões personalizadas via Tailwind (ex: 'h-4 w-full')." }
  ],
  'avatar': [
    { prop: "src", type: "string", default: "undefined", description: "URL da imagem de perfil." },
    { prop: "fallback", type: "string", default: '""', description: "Iniciais de texto para fallback de imagem quebrada." },
    { prop: "status", type: '"online" | "offline" | "busy"', default: "undefined", description: "Indicador de status colorido no canto." },
    { prop: "size", type: '"sm" | "default" | "lg"', default: '"default"', description: "Tamanho do círculo do avatar." }
  ],
  'breadcrumb': [
    { prop: "children", type: "React.ReactNode", default: "-", description: "Links intermediários e página atual." },
    { prop: "className", type: "string", default: "undefined", description: "Classes para alinhamento e espaçamento." }
  ],
  'statistic': [
    { prop: "title", type: "string", default: '""', description: "Rótulo da métrica ou KPI." },
    { prop: "value", type: "string | number", default: '""', description: "Número ou quantia em destaque." },
    { prop: "trend", type: "number", default: "undefined", description: "Percentual numérico de tendência." },
    { prop: "trendLabel", type: "string", default: '""', description: "Texto descritivo do comparativo." },
    { prop: "icon", type: "React.ReactNode", default: "undefined", description: "Ícone temático exibido no card." }
  ],
  'page-header': [
    { prop: "title", type: "string", default: '""', description: "Título principal da página corporativa." },
    { prop: "description", type: "string", default: '""', description: "Descrição ou subtítulo de apoio." },
    { prop: "breadcrumbs", type: "React.ReactNode", default: "undefined", description: "Trilha de navegação superior." },
    { prop: "badge", type: "React.ReactNode", default: "undefined", description: "Tag de status ou homologação." },
    { prop: "actions", type: "React.ReactNode", default: "undefined", description: "Botões de ação no cabeçalho." }
  ],
  'navbar': [
    { prop: "brand", type: "React.ReactNode", default: "undefined", description: "Elemento de marca e logo no canto esquerdo." },
    { prop: "links", type: "Array<{ label: string, href?: string, active?: boolean, onClick?: () => void }>", default: "[]", description: "Links de navegação exibidos no desktop." },
    { prop: "actions", type: "React.ReactNode", default: "undefined", description: "Botões de ação rápida à direita (ex: Novo, Notificações)." },
    { prop: "user", type: "{ name: string, role?: string, fallback?: string, onProfileClick?: () => void }", default: "undefined", description: "Dados do perfil do usuário logado com avatar." },
    { prop: "searchPlaceholder", type: "string", default: '"Buscar no sistema..."', description: "Texto do atalho de busca." },
    { prop: "onSearchClick", type: "() => void", default: "undefined", description: "Callback ao clicar na caixa de busca ou atalho ⌘K." }
  ],
  'sidebar': [
    { prop: "defaultCollapsed", type: "boolean", default: "false", description: "Define se o painel inicia recolhido no SidebarProvider." },
    { prop: "children", type: "React.ReactNode", default: "-", description: "Subcomponentes estruturais (Header, Content, Group, Item, Footer)." },
    { prop: "className", type: "string", default: "undefined", description: "Classes de largura ou tema adicional." }
  ],
  'field': [
    { prop: "error", type: "boolean", default: "false", description: "Ativa o estado de validação de erro em vermelho nos filhos." },
    { prop: "disabled", type: "boolean", default: "false", description: "Desabilita a interação com o conjunto do campo." },
    { prop: "children", type: "React.ReactNode", default: "-", description: "Composição de Label, Input/Control, Description e Error." }
  ],
  'form': [
    { prop: "onSubmit", type: "(e: React.FormEvent) => void", default: "undefined", description: "Handler disparado ao submeter o formulário." },
    { prop: "children", type: "React.ReactNode", default: "-", description: "Seções, linhas e controles do formulário." }
  ],
  'marker': [
    { prop: "variant", type: '"brand" | "success" | "warning" | "destructive" | "info"', default: '"brand"', description: "Cor semântica do marcador e do pulso de radar." },
    { prop: "label", type: "React.ReactNode", default: "undefined", description: "Conteúdo central (número, letra ou mini-ícone)." },
    { prop: "tooltip", type: "React.ReactNode", default: "undefined", description: "Card flutuante aberto ao passar o mouse." },
    { prop: "pulse", type: "boolean", default: "true", description: "Ativa animação de onda radar (ping) em torno do ponto." },
    { prop: "size", type: '"sm" | "default" | "lg"', default: '"default"', description: "Dimensão do marcador circular." }
  ],
  'pagination': [
    { prop: "children", type: "React.ReactNode", default: "-", description: "Subcomponentes (Content, Item, Link, Previous, Next, Ellipsis)." },
    { prop: "className", type: "string", default: "undefined", description: "Classes para centralização e alinhamento." }
  ],
  'loading': [
    { prop: "variant", type: '"spinner" | "dots" | "pulse" | "bars" | "overlay"', default: '"spinner"', description: "Estilo visual da animação de carregamento." },
    { prop: "size", type: '"xs" | "sm" | "default" | "lg" | "xl"', default: '"default"', description: "Tamanho do elemento visual indicador." },
    { prop: "text", type: "string", default: "undefined", description: "Texto ou rótulo contextual exibido ao lado ou abaixo." },
    { prop: "fullscreen", type: "boolean", default: "false", description: "Ativa camada modal fixa em tela cheia com backdrop blur." },
    { prop: "className", type: "string", default: "undefined", description: "Classes CSS customizadas adicionais." }
  ]
};

function renderComponentApiReference(name) {
  const container = document.getElementById('apiPropsContainer');
  const countBadge = document.getElementById('apiPropsCountBadge');
  if (!container) return;

  const propsList = componentApiReferences[name] || [
    { prop: "className", type: "string", default: "undefined", description: "Classes adicionais para estilização via Tailwind CSS." },
    { prop: "children", type: "React.ReactNode", default: "-", description: "Elementos filhos e conteúdo interno." }
  ];

  if (countBadge) {
    countBadge.textContent = `${propsList.length} ${propsList.length === 1 ? 'Propriedade' : 'Propriedades'}`;
  }

  container.innerHTML = `
    <div class="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs border-collapse">
          <thead class="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
            <tr>
              <th class="p-3 w-40 font-mono">Propriedade</th>
              <th class="p-3 w-64 font-mono">Tipo TypeScript</th>
              <th class="p-3 w-28 font-mono">Padrão</th>
              <th class="p-3">Descrição & Comportamento</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border/60">
            ${propsList.map(p => `
              <tr class="hover:bg-muted/40 transition-colors">
                <td class="p-3 font-mono font-bold text-brand flex items-center gap-1.5">
                  <span class="h-1.5 w-1.5 rounded-full bg-brand"></span>
                  ${escapeHTML(p.prop)}
                </td>
                <td class="p-3 font-mono text-[11px] text-[#79c0ff] dark:text-[#a5d6ff]">
                  ${escapeHTML(p.type)}
                </td>
                <td class="p-3 font-mono text-[11px] text-muted-foreground">
                  ${escapeHTML(p.default)}
                </td>
                <td class="p-3 text-foreground leading-relaxed">
                  ${escapeHTML(p.description)}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  if (window.lucide) window.lucide.createIcons();
}

// ==================== SIDEBAR ====================
function renderSidebar() {
  const container = document.getElementById('sidebarContent');
  if (!container) return;

  let html = `
    <div class="flex flex-col gap-1">
      <h4 class="px-2 text-xs font-bold uppercase tracking-wider text-muted-foreground font-heading">Começando</h4>
      <a href="#/inicio" class="flex items-center rounded-md px-2 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground">Introdução</a>
      <a href="#/docs/instalacao" class="flex items-center rounded-md px-2 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground">Instalação CLI</a>
      <a href="#/docs/tailwind" class="flex items-center rounded-md px-2 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground">Tailwind Config</a>
      <a href="#/docs/storybook" class="flex items-center rounded-md px-2 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground">Storybook</a>
    </div>

    <div class="flex flex-col gap-1">
      <div class="flex items-center justify-between px-2">
        <h4 class="text-xs font-bold uppercase tracking-wider text-[#753399] dark:text-purple-300 font-heading">Templates</h4>
        <span class="rounded bg-[#753399]/15 px-1.5 py-0.2 text-[9px] font-bold text-[#753399] dark:text-purple-300">3 Prontos</span>
      </div>
      <a href="#/templates/login" class="sidebar-tpl-link flex items-center justify-between rounded-md px-2 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground" data-template="login">
        <span>Login & Autenticação</span>
      </a>
      <a href="#/templates/home" class="sidebar-tpl-link flex items-center justify-between rounded-md px-2 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground" data-template="home">
        <span>Landing Page (Home)</span>
      </a>
      <a href="#/templates/dashboard" class="sidebar-tpl-link flex items-center justify-between rounded-md px-2 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground" data-template="dashboard">
        <span>Dashboard SaaS Executivo</span>
      </a>
    </div>
  `;

  Object.entries(groups).forEach(([groupName, items]) => {
    html += `
      <div class="flex flex-col gap-1">
        <h4 class="px-2 text-xs font-bold uppercase tracking-wider text-muted-foreground font-heading">${groupName}</h4>
        ${items.map(name => `
          <button onclick="openComponentDocs('${name}')" data-component="${name}" class="sidebar-link flex items-center justify-between rounded-md px-2 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground text-left">
            <span>${formatTitle(name)}</span>
          </button>
        `).join('')}
      </div>
    `;
  });

  container.innerHTML = html;
}

// ==================== GRID DE COMPONENTES NA HOME ====================
function renderCategoryFilter() {
  const container = document.getElementById('categoryFilter');
  if (!container) return;

  const categories = ['Todos', ...Object.keys(groups)];
  container.innerHTML = categories.map(cat => `
    <button onclick="setFilter('${cat}')" class="rounded-full px-3 py-1 text-xs font-semibold transition-all ${
      state.filter === cat
        ? 'bg-brand text-white shadow-sm'
        : 'border border-input bg-background text-muted-foreground hover:bg-accent hover:text-foreground'
    }">
      ${cat}
    </button>
  `).join('');
}

function setFilter(cat) {
  state.filter = cat;
  renderCategoryFilter();
  renderComponentsGrid();
}

function renderComponentsGrid() {
  const container = document.getElementById('componentsGrid');
  if (!container) return;

  let allComponents = [];
  Object.entries(groups).forEach(([category, items]) => {
    items.forEach(name => {
      if (state.filter === 'Todos' || state.filter === category) {
        allComponents.push({ name, category });
      }
    });
  });

  container.innerHTML = allComponents.map(item => `
    <div onclick="openComponentDocs('${item.name}')" class="group relative flex flex-col justify-between rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:border-brand/50 hover:shadow-md cursor-pointer">
      <div>
        <div class="flex items-center justify-between">
          <span class="rounded-md bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">${item.category}</span>
          <i data-lucide="arrow-up-right" class="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 group-hover:text-brand"></i>
        </div>
        <h3 class="mt-3 font-heading text-base font-bold text-foreground group-hover:text-brand transition-colors">${formatTitle(item.name)}</h3>
        <p class="mt-1 line-clamp-2 text-xs text-muted-foreground">${descriptions[item.name] || 'Componente corporativo de alto nível com Tailwind e Radix.'}</p>
      </div>
      <div class="mt-4 flex items-center justify-between border-t border-border/50 pt-3 text-[11px] font-mono text-muted-foreground">
        <span>ui/${item.name}.tsx</span>
        <span class="text-brand font-semibold">Ver docs →</span>
      </div>
    </div>
  `).join('');

  if (window.lucide) window.lucide.createIcons();
}

// ==================== 1. EXEMPLOS INTERATIVOS REAIS ====================
function renderComponentPreview(name) {
  const stage = document.getElementById('docPreviewStage');
  if (!stage) return;

  switch (name) {
    case 'button':
      stage.innerHTML = `
        <div class="flex flex-col items-center gap-4">
          <div class="flex flex-wrap items-center justify-center gap-3">
            <button onclick="showToast('Ação Primária executada!')" class="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-md bg-brand px-5 py-2 text-[13px] font-semibold text-white shadow hover:bg-brand-hover active:scale-[0.99] transition-all">
              <i data-lucide="check" class="h-4 w-4"></i> Primário
            </button>
            <button onclick="showToast('Ação Secundária!')" class="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-md border border-input bg-background px-5 py-2 text-[13px] font-semibold text-foreground shadow-sm hover:border-brand hover:text-brand active:scale-[0.99] transition-all">
              Secundário
            </button>
            <button onclick="showToast('Ação Ghost!')" class="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-md bg-transparent px-5 py-2 text-[13px] font-semibold text-brand hover:bg-brand/10 active:scale-[0.99] transition-all">
              Ghost
            </button>
            <button onclick="showToast('Registro excluído!')" class="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-md bg-destructive px-5 py-2 text-[13px] font-semibold text-white shadow hover:bg-destructive/90 active:scale-[0.99] transition-all">
              <i data-lucide="trash-2" class="h-4 w-4"></i> Danger
            </button>
            <button onclick="simulateLoading(this)" class="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-md bg-emerald-600 px-5 py-2 text-[13px] font-semibold text-white shadow hover:bg-emerald-700 active:scale-[0.99] transition-all">
              <i data-lucide="loader-2" class="h-4 w-4 hidden animate-spin"></i>
              <span>Clique p/ Loading</span>
            </button>
          </div>
          <p class="text-[11px] text-muted-foreground">Clique nos botões acima para disparar eventos reais e animações.</p>
        </div>
      `;
      break;

    case 'button-group':
      stage.innerHTML = `
        <div class="flex flex-col items-center gap-3">
          <div class="inline-flex rounded-lg border border-border bg-background p-1 shadow-sm">
            <button onclick="toggleGroupItem(this)" class="group-btn rounded-md bg-brand px-4 py-1.5 text-xs font-bold text-white transition-all">Dia</button>
            <button onclick="toggleGroupItem(this)" class="group-btn rounded-md px-4 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-all">Semana</button>
            <button onclick="toggleGroupItem(this)" class="group-btn rounded-md px-4 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-all">Mês</button>
            <button onclick="toggleGroupItem(this)" class="group-btn rounded-md px-4 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-all">Ano</button>
          </div>
          <span class="text-xs text-muted-foreground">Filtro de período agrupado</span>
        </div>
      `;
      break;

    case 'input':
      stage.innerHTML = `
        <div class="w-full max-w-sm mx-auto space-y-4">
          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-foreground">Razão Social / Nome</label>
            <div class="relative flex items-center">
              <input id="demoInputClear" class="flex min-h-[40px] w-full rounded-md border border-input bg-background px-3.5 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 pr-10" value="Monta UI Enterprise Tecnologia" placeholder="Digite o nome...">
              <button onclick="clearDemoInput()" class="absolute right-3 text-muted-foreground hover:text-foreground"><i data-lucide="x" class="h-4 w-4"></i></button>
            </div>
          </div>
          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-foreground">Senha Corporativa</label>
            <div class="relative flex items-center">
              <input id="demoPassInput" type="password" value="MontaUI#2026" class="flex min-h-[40px] w-full rounded-md border border-input bg-background px-3.5 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 pr-10">
              <button onclick="togglePassVisibility()" class="absolute right-3 text-muted-foreground hover:text-foreground"><i id="demoPassIcon" data-lucide="eye" class="h-4 w-4"></i></button>
            </div>
          </div>
        </div>
      `;
      break;

    case 'dialog':
      stage.innerHTML = `
        <div class="flex flex-col items-center justify-center gap-4">
          <button onclick="openDemoModal()" class="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-brand px-5 text-sm font-semibold text-white shadow hover:bg-brand-hover">
            <i data-lucide="external-link" class="h-4 w-4"></i> Abrir Modal Interativo
          </button>

          <!-- Modal Mockup -->
          <div id="demoModal" class="hidden fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div class="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
              <div class="flex items-center justify-between border-b border-border pb-3">
                <h3 class="font-heading text-lg font-bold text-foreground">Aprovar Faturamento</h3>
                <button onclick="closeDemoModal()" class="rounded p-1 hover:bg-muted text-muted-foreground"><i data-lucide="x" class="h-4 w-4"></i></button>
              </div>
              <p class="text-xs text-muted-foreground leading-relaxed">
                Você está prestes a aprovar a fatura #9481 no valor de <b>R$ 14.500,00</b>. Deseja registrar a operação?
              </p>
              <div class="flex justify-end gap-2 pt-2 border-t border-border">
                <button onclick="closeDemoModal()" class="rounded-md border border-input px-4 py-2 text-xs font-semibold hover:bg-muted">Cancelar</button>
                <button onclick="closeDemoModal(); showToast('Fatura aprovada com sucesso!')" class="rounded-md bg-brand px-4 py-2 text-xs font-semibold text-white shadow hover:bg-brand-hover">Confirmar</button>
              </div>
            </div>
          </div>
        </div>
      `;
      break;

    case 'card':
      stage.innerHTML = `
        <div class="rounded-xl border border-border bg-card p-6 shadow-sm max-w-sm mx-auto space-y-4">
          <div class="flex items-center justify-between border-b border-border pb-3">
            <div>
              <h4 class="font-heading text-sm font-bold text-foreground">Receita Mensal</h4>
              <p class="text-xs text-muted-foreground">Visão consolidada Q3</p>
            </div>
            <span class="rounded-full bg-emerald-500/15 p-2 text-emerald-600 dark:text-emerald-400"><i data-lucide="trending-up" class="h-4 w-4"></i></span>
          </div>
          <div class="space-y-1">
            <span class="font-heading text-2xl font-extrabold text-foreground">R$ 128.450,00</span>
            <p class="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">+18.2% em relação ao mês anterior</p>
          </div>
          <div class="pt-2 border-t border-border flex justify-between items-center text-xs text-muted-foreground">
            <span>Metas atingidas</span>
            <span class="font-bold text-brand">94%</span>
          </div>
        </div>
      `;
      break;

    case 'accordion':
      stage.innerHTML = `
        <div class="w-full max-w-md mx-auto space-y-2">
          <div class="rounded-lg border border-border bg-card overflow-hidden">
            <button onclick="toggleAccordionItem(this)" class="flex w-full items-center justify-between p-4 text-xs font-bold text-foreground hover:bg-muted/50 transition-colors">
              <span>Como instalo os componentes com o Monta CLI?</span>
              <i data-lucide="chevron-down" class="h-4 w-4 transition-transform duration-200"></i>
            </button>
            <div class="accordion-content hidden px-4 pb-4 text-xs text-muted-foreground leading-relaxed border-t border-border/50 pt-2">
              Execute <code class="bg-muted px-1.5 py-0.5 rounded font-mono text-brand">pnpm dlx monta-ui add [componente]</code> no terminal do seu projeto React para baixar o código fonte diretamente.
            </div>
          </div>
          <div class="rounded-lg border border-border bg-card overflow-hidden">
            <button onclick="toggleAccordionItem(this)" class="flex w-full items-center justify-between p-4 text-xs font-bold text-foreground hover:bg-muted/50 transition-colors">
              <span>Posso customizar os estilos com Tailwind?</span>
              <i data-lucide="chevron-down" class="h-4 w-4 transition-transform duration-200"></i>
            </button>
            <div class="accordion-content hidden px-4 pb-4 text-xs text-muted-foreground leading-relaxed border-t border-border/50 pt-2">
              Sim! Todo o código é seu (copy-paste). O estilo é 100% utilitário Tailwind CSS e aceita a prop <code class="bg-muted px-1.5 py-0.5 rounded font-mono">className</code>.
            </div>
          </div>
        </div>
      `;
      break;

    case 'tabs':
      stage.innerHTML = `
        <div class="w-full max-w-md mx-auto space-y-4">
          <div class="inline-flex h-11 w-full items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground border border-border">
            <button onclick="switchTabPane('conta', this)" class="tab-btn inline-flex flex-1 items-center justify-center rounded-md bg-background px-3.5 py-1.5 text-xs font-bold text-brand shadow-sm">Conta</button>
            <button onclick="switchTabPane('seguranca', this)" class="tab-btn inline-flex flex-1 items-center justify-center rounded-md px-3.5 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground">Segurança</button>
            <button onclick="switchTabPane('notif', this)" class="tab-btn inline-flex flex-1 items-center justify-center rounded-md px-3.5 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground">Notificações</button>
          </div>
          <div id="pane-conta" class="tab-pane rounded-lg border border-border bg-card p-4 text-xs space-y-2">
            <p class="font-bold text-foreground">Configurações de Conta</p>
            <p class="text-muted-foreground">Atualize seu e-mail institucional e dados cadastrais.</p>
          </div>
          <div id="pane-seguranca" class="tab-pane hidden rounded-lg border border-border bg-card p-4 text-xs space-y-2">
            <p class="font-bold text-foreground">Autenticação em 2 Etapas</p>
            <p class="text-muted-foreground">Configure seu aplicativo autenticador ou chave de segurança.</p>
          </div>
          <div id="pane-notif" class="tab-pane hidden rounded-lg border border-border bg-card p-4 text-xs space-y-2">
            <p class="font-bold text-foreground">Preferências de Alerta</p>
            <p class="text-muted-foreground">Escolha os tipos de e-mails transacionais e avisos que deseja receber.</p>
          </div>
        </div>
      `;
      break;

    case 'switch':
      stage.innerHTML = `
        <div class="w-full max-w-xs mx-auto space-y-3">
          <div class="flex items-center justify-between rounded-lg border border-border bg-card p-4">
            <div>
              <p class="text-xs font-bold text-foreground">Notificações Push</p>
              <p class="text-[11px] text-muted-foreground">Alertar faturas pendentes</p>
            </div>
            <button onclick="toggleSwitch(this)" class="switch-btn relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-brand transition-colors">
              <span class="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"></span>
            </button>
          </div>
        </div>
      `;
      break;

    case 'checkbox':
      stage.innerHTML = `
        <div class="w-full max-w-xs mx-auto space-y-2.5">
          <label class="flex items-center gap-3 rounded-lg border border-border bg-card p-3 cursor-pointer hover:bg-muted/40 transition-colors">
            <input type="checkbox" checked onchange="showToast(this.checked ? 'Opção Ativada' : 'Opção Desativada')" class="h-4 w-4 rounded border-border text-brand focus:ring-brand accent-[#753399]">
            <div class="text-xs">
              <span class="font-bold text-foreground block">Aceitar Termos LGPD</span>
              <span class="text-[11px] text-muted-foreground">Concordo com o tratamento de dados.</span>
            </div>
          </label>
        </div>
      `;
      break;

    case 'table':
      stage.innerHTML = `
        <div class="w-full space-y-3">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div class="relative flex-1 max-w-xs">
              <i data-lucide="search" class="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground"></i>
              <input oninput="filterDemoTable(this.value)" class="h-8 w-full rounded-md border border-input bg-background pl-8 pr-3 text-xs shadow-sm focus:border-brand focus:outline-none" placeholder="Buscar cliente...">
            </div>
            <div class="flex gap-2">
              <button onclick="showToast('Exportando CSV de 48 registros...')" class="inline-flex h-8 items-center gap-1.5 rounded-md border border-input bg-background px-3 text-xs font-semibold hover:bg-muted">
                <i data-lucide="download" class="h-3 w-3"></i> Exportar
              </button>
            </div>
          </div>
          <div class="rounded-lg border border-border bg-card overflow-hidden">
            <table class="w-full text-left text-xs">
              <thead class="bg-muted/60 text-muted-foreground font-semibold border-b border-border">
                <tr>
                  <th class="p-3 w-8"><input type="checkbox" onchange="toggleSelectAllRows(this)" class="h-3.5 w-3.5 rounded border-border accent-[#753399]"></th>
                  <th class="p-3">Código</th>
                  <th class="p-3">Cliente / Empresa</th>
                  <th class="p-3">Status</th>
                  <th class="p-3 text-right">Valor Total</th>
                  <th class="p-3 w-10"></th>
                </tr>
              </thead>
              <tbody id="demoTableBody" class="divide-y divide-border/50">
                <tr class="hover:bg-muted/30 transition-colors">
                  <td class="p-3"><input type="checkbox" class="row-checkbox h-3.5 w-3.5 rounded border-border accent-[#753399]"></td>
                  <td class="p-3 font-mono text-muted-foreground">#CLI-1024</td>
                  <td class="p-3 font-semibold text-foreground flex items-center gap-2">
                    <div class="h-6 w-6 rounded-full bg-brand/15 text-brand flex items-center justify-center font-bold text-[10px]">HC</div>
                    <span>Hospital das Clínicas</span>
                  </td>
                  <td class="p-3"><span class="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">Ativo</span></td>
                  <td class="p-3 text-right font-mono font-semibold">R$ 24.500,00</td>
                  <td class="p-3 text-center"><button onclick="showToast('Opções de CLI-1024')" class="text-muted-foreground hover:text-foreground"><i data-lucide="more-horizontal" class="h-4 w-4"></i></button></td>
                </tr>
                <tr class="hover:bg-muted/30 transition-colors">
                  <td class="p-3"><input type="checkbox" class="row-checkbox h-3.5 w-3.5 rounded border-border accent-[#753399]"></td>
                  <td class="p-3 font-mono text-muted-foreground">#CLI-1025</td>
                  <td class="p-3 font-semibold text-foreground flex items-center gap-2">
                    <div class="h-6 w-6 rounded-full bg-amber-500/15 text-amber-600 flex items-center justify-center font-bold text-[10px]">LE</div>
                    <span>Logística Express S/A</span>
                  </td>
                  <td class="p-3"><span class="rounded-full bg-amber-500/15 px-2.5 py-0.5 text-[10px] font-bold text-amber-600 dark:text-amber-400">Pendente</span></td>
                  <td class="p-3 text-right font-mono font-semibold">R$ 8.900,00</td>
                  <td class="p-3 text-center"><button onclick="showToast('Opções de CLI-1025')" class="text-muted-foreground hover:text-foreground"><i data-lucide="more-horizontal" class="h-4 w-4"></i></button></td>
                </tr>
                <tr class="hover:bg-muted/30 transition-colors">
                  <td class="p-3"><input type="checkbox" class="row-checkbox h-3.5 w-3.5 rounded border-border accent-[#753399]"></td>
                  <td class="p-3 font-mono text-muted-foreground">#CLI-1026</td>
                  <td class="p-3 font-semibold text-foreground flex items-center gap-2">
                    <div class="h-6 w-6 rounded-full bg-purple-500/15 text-purple-400 flex items-center justify-center font-bold text-[10px]">CA</div>
                    <span>Construtora Alvorada</span>
                  </td>
                  <td class="p-3"><span class="rounded-full bg-brand/15 px-2.5 py-0.5 text-[10px] font-bold text-brand">Homologado</span></td>
                  <td class="p-3 text-right font-mono font-semibold">R$ 45.000,00</td>
                  <td class="p-3 text-center"><button onclick="showToast('Opções de CLI-1026')" class="text-muted-foreground hover:text-foreground"><i data-lucide="more-horizontal" class="h-4 w-4"></i></button></td>
                </tr>
              </tbody>
            </table>
            <div class="flex items-center justify-between border-t border-border bg-muted/30 px-3 py-2 text-xs text-muted-foreground">
              <span>Mostrando 3 de 48 registros</span>
              <div class="flex gap-1">
                <button class="h-6 px-2 rounded border border-border bg-card text-[11px] disabled:opacity-50" disabled>Anterior</button>
                <button onclick="showToast('Página 2')" class="h-6 px-2 rounded border border-border bg-card text-[11px] hover:bg-muted">Próximo</button>
              </div>
            </div>
          </div>
        </div>
      `;
      break;

    case 'chart':
      stage.innerHTML = `
        <div class="w-full max-w-xl mx-auto space-y-4">
          <!-- Chart Type Selector Buttons -->
          <div class="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
            <div class="space-y-0.5 text-left">
              <h4 class="font-heading text-xs font-bold text-foreground">Monta UI Corporate Charts</h4>
              <p class="text-[11px] text-muted-foreground">4 tipos nativos em SVG & Tailwind com acessibilidade e tooltips.</p>
            </div>
            <div class="flex items-center gap-1 rounded-lg border border-border bg-muted/60 p-1">
              <button id="chartTabBtn-bar" onclick="switchChartDemoType('bar')" class="chart-tab-btn inline-flex items-center gap-1 rounded-md bg-card px-2.5 py-1 text-xs font-bold text-foreground shadow-sm transition-all">
                <i data-lucide="bar-chart-3" class="h-3.5 w-3.5 text-[#753399]"></i> Barras
              </button>
              <button id="chartTabBtn-area" onclick="switchChartDemoType('area')" class="chart-tab-btn inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-all">
                <i data-lucide="activity" class="h-3.5 w-3.5"></i> Área / Linha
              </button>
              <button id="chartTabBtn-donut" onclick="switchChartDemoType('donut')" class="chart-tab-btn inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-all">
                <i data-lucide="pie-chart" class="h-3.5 w-3.5"></i> Rosca / Donut
              </button>
              <button id="chartTabBtn-horizontal" onclick="switchChartDemoType('horizontal')" class="chart-tab-btn inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-all">
                <i data-lucide="align-left" class="h-3.5 w-3.5"></i> Ranking
              </button>
            </div>
          </div>

          <!-- 1. BAR CHART CONTAINER -->
          <div id="chartView-bar" class="chart-view-pane rounded-xl border border-border bg-card p-5 space-y-4 shadow-sm text-left animate-in fade-in duration-200">
            <div class="flex items-center justify-between">
              <div>
                <h5 class="font-heading text-xs font-bold text-foreground">Faturamento vs Meta Mensal</h5>
                <p class="text-[11px] text-muted-foreground">Evolução do primeiro semestre (valores em R$ mil)</p>
              </div>
              <div class="flex items-center gap-3 text-[11px] font-medium">
                <span class="flex items-center gap-1 text-[#753399] font-bold"><span class="h-2 w-2 rounded-sm bg-[#753399]"></span> Receita</span>
                <span class="flex items-center gap-1 text-muted-foreground"><span class="h-2 w-2 rounded-sm bg-muted-foreground/30"></span> Meta</span>
              </div>
            </div>

            <!-- Bar Visualizer -->
            <div class="pt-4 flex items-end justify-between gap-3 h-48 border-b border-border pb-2 px-2">
              <div class="flex-1 flex flex-col items-center gap-2 group cursor-pointer" onclick="showToast('Janeiro: R$ 85.000 (Meta 70k)')">
                <div class="w-full flex items-end justify-center gap-1 h-36">
                  <div class="w-3/5 bg-[#753399] rounded-t transition-all group-hover:bg-[#622981]" style="height: 65%;"></div>
                  <div class="w-2/5 bg-muted-foreground/20 rounded-t" style="height: 50%;"></div>
                </div>
                <span class="text-[10px] font-semibold text-muted-foreground">Jan</span>
              </div>
              <div class="flex-1 flex flex-col items-center gap-2 group cursor-pointer" onclick="showToast('Fevereiro: R$ 92.000 (Meta 75k)')">
                <div class="w-full flex items-end justify-center gap-1 h-36">
                  <div class="w-3/5 bg-[#753399] rounded-t transition-all group-hover:bg-[#622981]" style="height: 72%;"></div>
                  <div class="w-2/5 bg-muted-foreground/20 rounded-t" style="height: 55%;"></div>
                </div>
                <span class="text-[10px] font-semibold text-muted-foreground">Fev</span>
              </div>
              <div class="flex-1 flex flex-col items-center gap-2 group cursor-pointer" onclick="showToast('Março: R$ 110.000 (Meta 80k)')">
                <div class="w-full flex items-end justify-center gap-1 h-36">
                  <div class="w-3/5 bg-[#753399] rounded-t transition-all group-hover:bg-[#622981]" style="height: 85%;"></div>
                  <div class="w-2/5 bg-muted-foreground/20 rounded-t" style="height: 60%;"></div>
                </div>
                <span class="text-[10px] font-semibold text-muted-foreground">Mar</span>
              </div>
              <div class="flex-1 flex flex-col items-center gap-2 group cursor-pointer" onclick="showToast('Abril: R$ 98.000 (Meta 85k)')">
                <div class="w-full flex items-end justify-center gap-1 h-36">
                  <div class="w-3/5 bg-[#753399] rounded-t transition-all group-hover:bg-[#622981]" style="height: 76%;"></div>
                  <div class="w-2/5 bg-muted-foreground/20 rounded-t" style="height: 65%;"></div>
                </div>
                <span class="text-[10px] font-semibold text-muted-foreground">Abr</span>
              </div>
              <div class="flex-1 flex flex-col items-center gap-2 group cursor-pointer" onclick="showToast('Maio: R$ 130.000 (Meta 90k)')">
                <div class="w-full flex items-end justify-center gap-1 h-36">
                  <div class="w-3/5 bg-[#753399] rounded-t transition-all group-hover:bg-[#622981]" style="height: 95%;"></div>
                  <div class="w-2/5 bg-muted-foreground/20 rounded-t" style="height: 70%;"></div>
                </div>
                <span class="text-[10px] font-semibold text-muted-foreground">Mai</span>
              </div>
              <div class="flex-1 flex flex-col items-center gap-2 group cursor-pointer" onclick="showToast('Junho (Recorde!): R$ 145.000 (Meta 95k)')">
                <div class="w-full flex items-end justify-center gap-1 h-36">
                  <div class="w-3/5 bg-[#753399] rounded-t transition-all group-hover:bg-[#622981] shadow-lg shadow-[#753399]/20" style="height: 100%;"></div>
                  <div class="w-2/5 bg-muted-foreground/20 rounded-t" style="height: 72%;"></div>
                </div>
                <span class="text-[10px] font-bold text-[#753399]">Jun</span>
              </div>
            </div>
            <div class="flex justify-between items-center text-xs text-muted-foreground pt-1">
              <span>Média Semestral: <b class="text-foreground font-mono">R$ 110.3k</b></span>
              <span class="text-emerald-500 font-bold flex items-center gap-1"><i data-lucide="trending-up" class="h-3.5 w-3.5"></i> +24.8% YoY</span>
            </div>
          </div>

          <!-- 2. AREA / LINE CHART CONTAINER -->
          <div id="chartView-area" class="chart-view-pane hidden rounded-xl border border-border bg-card p-5 space-y-4 shadow-sm text-left animate-in fade-in duration-200">
            <div class="flex items-center justify-between">
              <div>
                <h5 class="font-heading text-xs font-bold text-foreground">Tráfego de API & Requisições</h5>
                <p class="text-[11px] text-muted-foreground">Volume de chamadas por hora (em milhares)</p>
              </div>
              <span class="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                <span class="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span> 99.98% Uptime
              </span>
            </div>

            <!-- SVG Smooth Area Chart -->
            <div class="relative h-44 w-full pt-2">
              <svg viewBox="0 0 500 160" class="w-full h-full overflow-visible" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="montaAreaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#753399" stop-opacity="0.35"/>
                    <stop offset="100%" stop-color="#753399" stop-opacity="0.0"/>
                  </linearGradient>
                </defs>
                <!-- Grid Lines -->
                <line x1="0" y1="40" x2="500" y2="40" stroke="currentColor" stroke-opacity="0.08" stroke-dasharray="4"/>
                <line x1="0" y1="80" x2="500" y2="80" stroke="currentColor" stroke-opacity="0.08" stroke-dasharray="4"/>
                <line x1="0" y1="120" x2="500" y2="120" stroke="currentColor" stroke-opacity="0.08" stroke-dasharray="4"/>

                <!-- Area Fill -->
                <path d="M 0,120 Q 80,100 120,60 T 240,40 T 360,70 T 500,20 L 500,160 L 0,160 Z" fill="url(#montaAreaGradient)"/>
                <!-- Line Stroke -->
                <path d="M 0,120 Q 80,100 120,60 T 240,40 T 360,70 T 500,20" fill="none" stroke="#753399" stroke-width="3" stroke-linecap="round"/>

                <!-- Data Dots -->
                <circle cx="120" cy="60" r="4" fill="#753399" stroke="white" stroke-width="2" class="cursor-pointer hover:r-6 transition-all" onclick="showToast('04:00 - 45k req/s')"/>
                <circle cx="240" cy="40" r="4" fill="#753399" stroke="white" stroke-width="2" class="cursor-pointer hover:r-6 transition-all" onclick="showToast('08:00 - 82k req/s')"/>
                <circle cx="360" cy="70" r="4" fill="#753399" stroke="white" stroke-width="2" class="cursor-pointer hover:r-6 transition-all" onclick="showToast('12:00 - 64k req/s')"/>
                <circle cx="500" cy="20" r="5" fill="#753399" stroke="white" stroke-width="2" class="cursor-pointer hover:r-6 transition-all" onclick="showToast('Pico: 16:00 - 118k req/s')"/>
              </svg>
            </div>
            <div class="flex justify-between text-[10px] text-muted-foreground font-mono px-1 border-t border-border pt-2">
              <span>00:00</span>
              <span>04:00</span>
              <span>08:00</span>
              <span>12:00</span>
              <span>16:00</span>
              <span>20:00</span>
              <span>23:59</span>
            </div>
          </div>

          <!-- 3. DONUT / PIE CHART CONTAINER -->
          <div id="chartView-donut" class="chart-view-pane hidden rounded-xl border border-border bg-card p-5 space-y-4 shadow-sm text-left animate-in fade-in duration-200">
            <div class="flex items-center justify-between">
              <div>
                <h5 class="font-heading text-xs font-bold text-foreground">Distribuição por Canal de Vendas</h5>
                <p class="text-[11px] text-muted-foreground">Participação no volume financeiro total</p>
              </div>
              <span class="font-mono text-xs font-bold text-foreground">Total: R$ 1.28M</span>
            </div>

            <div class="flex flex-col sm:flex-row items-center justify-around gap-6 pt-2">
              <!-- SVG Donut -->
              <div class="relative w-40 h-40 flex items-center justify-center">
                <svg viewBox="0 0 36 36" class="w-full h-full -rotate-90">
                  <!-- Background Track -->
                  <circle cx="18" cy="18" r="14" fill="none" stroke="currentColor" stroke-opacity="0.1" stroke-width="4.5"/>
                  <!-- Segment 1: E-commerce (45%) -->
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#753399" stroke-width="4.5" stroke-dasharray="39.6 88" stroke-dashoffset="0" class="cursor-pointer hover:opacity-80 transition-opacity" onclick="showToast('E-commerce: 45% (R$ 576.000)')"/>
                  <!-- Segment 2: PDV / Lojas (30%) -->
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#10b981" stroke-width="4.5" stroke-dasharray="26.4 88" stroke-dashoffset="-39.6" class="cursor-pointer hover:opacity-80 transition-opacity" onclick="showToast('Lojas Físicas: 30% (R$ 384.000)')"/>
                  <!-- Segment 3: Marketplace (15%) -->
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#f59e0b" stroke-width="4.5" stroke-dasharray="13.2 88" stroke-dashoffset="-66" class="cursor-pointer hover:opacity-80 transition-opacity" onclick="showToast('Marketplace: 15% (R$ 192.000)')"/>
                  <!-- Segment 4: API B2B (10%) -->
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#3b82f6" stroke-width="4.5" stroke-dasharray="8.8 88" stroke-dashoffset="-79.2" class="cursor-pointer hover:opacity-80 transition-opacity" onclick="showToast('Integrações B2B: 10% (R$ 128.000)')"/>
                </svg>
                <div class="absolute flex flex-col items-center justify-center text-center">
                  <span class="font-heading text-lg font-bold text-foreground">100%</span>
                  <span class="text-[9px] text-muted-foreground uppercase tracking-wider font-semibold">Canais</span>
                </div>
              </div>

              <!-- Legend List -->
              <div class="space-y-2 flex-1 max-w-xs">
                <div class="flex items-center justify-between text-xs cursor-pointer p-1.5 rounded-lg hover:bg-muted transition-colors" onclick="showToast('E-commerce: 45%')">
                  <div class="flex items-center gap-2">
                    <span class="h-2.5 w-2.5 rounded-full bg-[#753399]"></span>
                    <span class="font-medium text-foreground">E-commerce / Web</span>
                  </div>
                  <span class="font-mono font-bold text-foreground">45% <span class="text-muted-foreground font-normal">(576k)</span></span>
                </div>
                <div class="flex items-center justify-between text-xs cursor-pointer p-1.5 rounded-lg hover:bg-muted transition-colors" onclick="showToast('Lojas Físicas: 30%')">
                  <div class="flex items-center gap-2">
                    <span class="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                    <span class="font-medium text-foreground">Lojas / PDV</span>
                  </div>
                  <span class="font-mono font-bold text-foreground">30% <span class="text-muted-foreground font-normal">(384k)</span></span>
                </div>
                <div class="flex items-center justify-between text-xs cursor-pointer p-1.5 rounded-lg hover:bg-muted transition-colors" onclick="showToast('Marketplace: 15%')">
                  <div class="flex items-center gap-2">
                    <span class="h-2.5 w-2.5 rounded-full bg-amber-500"></span>
                    <span class="font-medium text-foreground">Marketplace</span>
                  </div>
                  <span class="font-mono font-bold text-foreground">15% <span class="text-muted-foreground font-normal">(192k)</span></span>
                </div>
                <div class="flex items-center justify-between text-xs cursor-pointer p-1.5 rounded-lg hover:bg-muted transition-colors" onclick="showToast('API B2B: 10%')">
                  <div class="flex items-center gap-2">
                    <span class="h-2.5 w-2.5 rounded-full bg-blue-500"></span>
                    <span class="font-medium text-foreground">Integração API</span>
                  </div>
                  <span class="font-mono font-bold text-foreground">10% <span class="text-muted-foreground font-normal">(128k)</span></span>
                </div>
              </div>
            </div>
          </div>

          <!-- 4. HORIZONTAL BAR / RANKING CONTAINER -->
          <div id="chartView-horizontal" class="chart-view-pane hidden rounded-xl border border-border bg-card p-5 space-y-4 shadow-sm text-left animate-in fade-in duration-200">
            <div class="flex items-center justify-between">
              <div>
                <h5 class="font-heading text-xs font-bold text-foreground">Desempenho por Unidade Regional</h5>
                <p class="text-[11px] text-muted-foreground">Atingimento da meta orçamentária do Q3</p>
              </div>
              <span class="text-[11px] font-bold text-emerald-500">+18% Geral</span>
            </div>

            <!-- Horizontal Bars -->
            <div class="space-y-3 pt-1">
              <div class="space-y-1">
                <div class="flex justify-between text-xs font-medium">
                  <span class="text-foreground font-bold">1. Filial São Paulo (Matriz)</span>
                  <span class="font-mono text-[#753399] font-bold">R$ 450k (112%)</span>
                </div>
                <div class="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                  <div class="h-full bg-[#753399] rounded-full" style="width: 100%;"></div>
                </div>
              </div>

              <div class="space-y-1">
                <div class="flex justify-between text-xs font-medium">
                  <span class="text-foreground font-bold">2. Filial Rio de Janeiro</span>
                  <span class="font-mono text-emerald-600 dark:text-emerald-400 font-bold">R$ 380k (95%)</span>
                </div>
                <div class="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                  <div class="h-full bg-emerald-500 rounded-full" style="width: 85%;"></div>
                </div>
              </div>

              <div class="space-y-1">
                <div class="flex justify-between text-xs font-medium">
                  <span class="text-foreground font-bold">3. Filial Minas Gerais</span>
                  <span class="font-mono text-amber-600 dark:text-amber-400 font-bold">R$ 290k (78%)</span>
                </div>
                <div class="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                  <div class="h-full bg-amber-500 rounded-full" style="width: 68%;"></div>
                </div>
              </div>

              <div class="space-y-1">
                <div class="flex justify-between text-xs font-medium">
                  <span class="text-foreground font-bold">4. Filial Paraná</span>
                  <span class="font-mono text-blue-600 dark:text-blue-400 font-bold">R$ 240k (72%)</span>
                </div>
                <div class="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                  <div class="h-full bg-blue-500 rounded-full" style="width: 58%;"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      break;

    case 'calendar':
      stage.innerHTML = `
        <div class="w-full max-w-sm mx-auto rounded-xl border border-border bg-card p-4 space-y-3">
          <div class="flex items-center justify-between border-b border-border pb-2">
            <span class="font-heading text-sm font-bold text-foreground">Agosto de 2026</span>
            <div class="flex gap-1">
              <button onclick="showToast('Mês Anterior')" class="h-7 w-7 rounded border border-border flex items-center justify-center hover:bg-muted"><i data-lucide="chevron-left" class="h-3.5 w-3.5"></i></button>
              <button onclick="showToast('Próximo Mês')" class="h-7 w-7 rounded border border-border flex items-center justify-center hover:bg-muted"><i data-lucide="chevron-right" class="h-3.5 w-3.5"></i></button>
            </div>
          </div>
          <div class="grid grid-cols-7 gap-1 text-center text-[11px] font-bold text-muted-foreground mb-1">
            <div>D</div><div>S</div><div>T</div><div>Q</div><div>Q</div><div>S</div><div>S</div>
          </div>
          <div class="grid grid-cols-7 gap-1 text-center text-xs">
            <div class="p-1.5 text-muted-foreground/30">26</div><div class="p-1.5 text-muted-foreground/30">27</div><div class="p-1.5 text-muted-foreground/30">28</div><div class="p-1.5 text-muted-foreground/30">29</div><div class="p-1.5 text-muted-foreground/30">30</div><div class="p-1.5 text-muted-foreground/30">31</div>
            <div onclick="selectCalDay(this, 1)" class="p-1.5 rounded hover:bg-muted cursor-pointer">1</div>
            <div onclick="selectCalDay(this, 2)" class="p-1.5 rounded hover:bg-muted cursor-pointer">2</div>
            <div onclick="selectCalDay(this, 3)" class="p-1.5 rounded hover:bg-muted cursor-pointer">3</div>
            <div onclick="selectCalDay(this, 4)" class="p-1.5 rounded hover:bg-muted cursor-pointer">4</div>
            <div onclick="selectCalDay(this, 5)" class="p-1.5 rounded hover:bg-muted cursor-pointer">5</div>
            <div onclick="selectCalDay(this, 6)" class="p-1.5 rounded hover:bg-muted cursor-pointer">6</div>
            <div onclick="selectCalDay(this, 7)" class="p-1.5 rounded hover:bg-muted cursor-pointer">7</div>
            <div onclick="selectCalDay(this, 8)" class="p-1.5 rounded hover:bg-muted cursor-pointer">8</div>
            <div onclick="selectCalDay(this, 9)" class="p-1.5 rounded hover:bg-muted cursor-pointer">9</div>
            <div onclick="selectCalDay(this, 10)" class="p-1.5 rounded hover:bg-muted cursor-pointer">10</div>
            <div onclick="selectCalDay(this, 11)" class="p-1.5 rounded hover:bg-muted cursor-pointer">11</div>
            <div onclick="selectCalDay(this, 12)" class="p-1.5 rounded hover:bg-muted cursor-pointer">12</div>
            <div onclick="selectCalDay(this, 13)" class="p-1.5 rounded hover:bg-muted cursor-pointer">13</div>
            <div onclick="selectCalDay(this, 14)" class="p-1.5 rounded hover:bg-muted cursor-pointer">14</div>
            <div onclick="selectCalDay(this, 15)" class="p-1.5 rounded hover:bg-muted cursor-pointer font-bold relative">15<span class="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-brand"></span></div>
            <div onclick="selectCalDay(this, 16)" class="p-1.5 rounded hover:bg-muted cursor-pointer">16</div>
            <div onclick="selectCalDay(this, 17)" class="p-1.5 rounded hover:bg-muted cursor-pointer">17</div>
            <div onclick="selectCalDay(this, 18)" class="p-1.5 rounded hover:bg-muted cursor-pointer">18</div>
            <div onclick="selectCalDay(this, 19)" class="p-1.5 rounded hover:bg-muted cursor-pointer">19</div>
            <div onclick="selectCalDay(this, 20)" class="p-1.5 rounded hover:bg-muted cursor-pointer">20</div>
            <div onclick="selectCalDay(this, 21)" class="p-1.5 rounded hover:bg-muted cursor-pointer">21</div>
            <div onclick="selectCalDay(this, 22)" class="p-1.5 rounded hover:bg-muted cursor-pointer">22</div>
            <div onclick="selectCalDay(this, 23)" class="p-1.5 rounded hover:bg-muted cursor-pointer">23</div>
            <div onclick="selectCalDay(this, 24)" class="p-1.5 rounded hover:bg-muted cursor-pointer">24</div>
            <div onclick="selectCalDay(this, 25)" class="p-1.5 rounded hover:bg-muted cursor-pointer">25</div>
            <div onclick="selectCalDay(this, 26)" class="p-1.5 rounded hover:bg-muted cursor-pointer">26</div>
            <div onclick="selectCalDay(this, 27)" class="p-1.5 rounded hover:bg-muted cursor-pointer">27</div>
            <div onclick="selectCalDay(this, 28)" class="p-1.5 rounded hover:bg-muted cursor-pointer font-bold relative">28<span class="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-emerald-500"></span></div>
            <div onclick="selectCalDay(this, 29)" class="p-1.5 rounded hover:bg-muted cursor-pointer">29</div>
            <div onclick="selectCalDay(this, 30)" class="p-1.5 rounded hover:bg-muted cursor-pointer">30</div>
            <div onclick="selectCalDay(this, 31)" class="p-1.5 rounded bg-brand text-white font-bold cursor-pointer shadow">31</div>
          </div>
        </div>
      `;
      break;

    case 'tree-view':
      stage.innerHTML = `
        <div class="w-full max-w-sm mx-auto rounded-xl border border-border bg-card p-4 space-y-1 text-xs">
          <div class="font-bold text-foreground pb-2 border-b border-border mb-2 flex items-center justify-between">
            <span>Explorador de Arquivos</span>
            <span class="text-[10px] text-muted-foreground font-mono">src/</span>
          </div>
          <div>
            <div onclick="toggleTreeNode(this)" class="flex items-center gap-2 p-1.5 rounded hover:bg-muted cursor-pointer font-semibold">
              <i data-lucide="chevron-down" class="h-3.5 w-3.5 transition-transform"></i>
              <i data-lucide="folder" class="h-4 w-4 text-brand"></i>
              <span>components</span>
            </div>
            <div class="pl-5 space-y-1 border-l border-border/60 ml-2 mt-1">
              <div>
                <div onclick="toggleTreeNode(this)" class="flex items-center gap-2 p-1.5 rounded hover:bg-muted cursor-pointer font-semibold">
                  <i data-lucide="chevron-down" class="h-3.5 w-3.5 transition-transform"></i>
                  <i data-lucide="folder" class="h-4 w-4 text-brand"></i>
                  <span>monta-ui</span>
                </div>
                <div class="pl-5 space-y-1 border-l border-border/60 ml-2 mt-1">
                  <div onclick="selectTreeFile(this, 'button.tsx')" class="flex items-center gap-2 p-1.5 rounded hover:bg-muted cursor-pointer text-muted-foreground hover:text-foreground">
                    <i data-lucide="file-code" class="h-3.5 w-3.5 text-blue-400"></i>
                    <span>button.tsx</span>
                  </div>
                  <div onclick="selectTreeFile(this, 'dialog.tsx')" class="flex items-center gap-2 p-1.5 rounded hover:bg-muted cursor-pointer text-muted-foreground hover:text-foreground">
                    <i data-lucide="file-code" class="h-3.5 w-3.5 text-blue-400"></i>
                    <span>dialog.tsx</span>
                  </div>
                  <div onclick="selectTreeFile(this, 'table.tsx')" class="flex items-center gap-2 p-1.5 rounded hover:bg-muted cursor-pointer text-muted-foreground hover:text-foreground">
                    <i data-lucide="file-code" class="h-3.5 w-3.5 text-blue-400"></i>
                    <span>table.tsx</span>
                  </div>
                </div>
              </div>
              <div onclick="selectTreeFile(this, 'App.tsx')" class="flex items-center gap-2 p-1.5 rounded hover:bg-muted cursor-pointer text-muted-foreground hover:text-foreground">
                <i data-lucide="file-code" class="h-3.5 w-3.5 text-blue-400"></i>
                <span>App.tsx</span>
              </div>
            </div>
          </div>
        </div>
      `;
      break;

    case 'stepper':
      stage.innerHTML = `
        <div class="w-full max-w-lg mx-auto space-y-6">
          <!-- Stepper Header Navigation -->
          <div class="space-y-2">
            <div class="flex items-center justify-between text-xs text-muted-foreground font-semibold px-1">
              <span>Progresso do Cadastro</span>
              <span id="stepperPct" class="text-brand font-mono font-bold">50% Concluído</span>
            </div>
            <div class="h-1.5 w-full rounded-full bg-muted overflow-hidden border border-border">
              <div id="stepperBar" class="h-full bg-brand rounded-full transition-all duration-300" style="width: 50%;"></div>
            </div>
          </div>

          <!-- Perfectly Aligned Grid Steps -->
          <div class="grid grid-cols-4 relative px-2">
            <!-- Step 1 -->
            <div id="step-node-1" onclick="jumpToStep(1)" class="flex flex-col items-center text-center cursor-pointer group relative">
              <div id="step-line-1" class="absolute top-4 left-1/2 w-full h-0.5 bg-emerald-600 -z-0"></div>
              <div class="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white font-bold text-xs shadow ring-4 ring-card group-hover:scale-105 transition-all">
                <i data-lucide="check" class="h-4 w-4"></i>
              </div>
              <span class="mt-2 text-xs font-bold text-foreground">1. Empresa</span>
            </div>

            <!-- Step 2 -->
            <div id="step-node-2" onclick="jumpToStep(2)" class="flex flex-col items-center text-center cursor-pointer group relative">
              <div id="step-line-2" class="absolute top-4 left-1/2 w-full h-0.5 bg-border -z-0"></div>
              <div class="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white font-bold text-xs shadow ring-4 ring-brand/20 group-hover:scale-105 transition-all">
                2
              </div>
              <span class="mt-2 text-xs font-bold text-brand">2. Logística</span>
            </div>

            <!-- Step 3 -->
            <div id="step-node-3" onclick="jumpToStep(3)" class="flex flex-col items-center text-center cursor-pointer group relative">
              <div id="step-line-3" class="absolute top-4 left-1/2 w-full h-0.5 bg-border -z-0"></div>
              <div class="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground border border-border font-bold text-xs ring-4 ring-card group-hover:scale-105 transition-all">
                3
              </div>
              <span class="mt-2 text-xs font-medium text-muted-foreground">3. Pagamento</span>
            </div>

            <!-- Step 4 -->
            <div id="step-node-4" onclick="jumpToStep(4)" class="flex flex-col items-center text-center cursor-pointer group relative">
              <div class="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground border border-border font-bold text-xs ring-4 ring-card group-hover:scale-105 transition-all">
                4
              </div>
              <span class="mt-2 text-xs font-medium text-muted-foreground">4. Conclusão</span>
            </div>
          </div>

          <!-- Dynamic Step Content Form -->
          <div class="rounded-xl border border-border bg-card p-5 space-y-4 shadow-sm">
            <div class="border-b border-border pb-3">
              <h3 id="stepTitle" class="font-heading text-sm font-bold text-foreground">Etapa 2: Endereço & Logística</h3>
              <p id="stepDesc" class="text-xs text-muted-foreground mt-0.5">Informe os dados para entrega e conferência tributária.</p>
            </div>

            <!-- Form Content Box -->
            <div id="stepFormContainer" class="space-y-3 text-xs">
              <div class="grid grid-cols-2 gap-3">
                <div class="space-y-1">
                  <label class="font-semibold text-foreground">CEP</label>
                  <input class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-xs focus:border-brand focus:outline-none font-mono" value="04538-133">
                </div>
                <div class="space-y-1">
                  <label class="font-semibold text-foreground">UF / Estado</label>
                  <input class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-xs focus:border-brand focus:outline-none" value="São Paulo - SP">
                </div>
              </div>
              <div class="space-y-1">
                <label class="font-semibold text-foreground">Logradouro & Número</label>
                <input class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-xs focus:border-brand focus:outline-none" value="Av. Brigadeiro Faria Lima, 4300 - 10º Andar">
              </div>
            </div>

            <!-- Action Controls -->
            <div class="flex justify-between items-center pt-3 border-t border-border">
              <button onclick="prevStepDemo()" id="stepperBackBtn" class="inline-flex h-9 items-center gap-1.5 rounded-md border border-input bg-background px-4 text-xs font-semibold hover:bg-muted transition-colors">
                <i data-lucide="arrow-left" class="h-3.5 w-3.5"></i> Voltar
              </button>
              <div class="flex gap-2">
                <button onclick="resetStepperDemo()" class="h-9 px-3 rounded-md text-xs text-muted-foreground hover:text-foreground">
                  Reiniciar
                </button>
                <button onclick="nextStepDemo()" id="stepperNextBtn" class="inline-flex h-9 items-center gap-1.5 rounded-md bg-brand px-5 text-xs font-semibold text-white shadow hover:bg-brand-hover transition-colors">
                  <span>Avançar Etapa</span> <i data-lucide="arrow-right" class="h-3.5 w-3.5"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
      break;

    case 'timeline':
      stage.innerHTML = `
        <div class="w-full max-w-lg mx-auto space-y-4">
          <!-- Timeline Header -->
          <div class="flex items-center justify-between border-b border-border pb-3">
            <div>
              <h4 class="font-heading text-sm font-bold text-foreground">Auditoria do Pedido #PED-9481</h4>
              <p class="text-xs text-muted-foreground">Rastreamento de ponta a ponta em tempo real</p>
            </div>
            <span class="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> Conectado
            </span>
          </div>

          <!-- Perfectly Aligned Timeline Events -->
          <div class="space-y-4 pt-2">
            
            <!-- Event 1: Concluído -->
            <div class="flex gap-4 items-start relative">
              <div class="absolute left-3.5 top-7 bottom-0 w-0.5 bg-border -z-0"></div>
              <div class="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white shadow-sm ring-4 ring-card">
                <i data-lucide="check" class="h-3.5 w-3.5"></i>
              </div>
              <div class="flex-1 rounded-xl border border-border bg-card p-4 space-y-2 hover:border-brand/40 transition-colors shadow-sm">
                <div class="flex items-center justify-between">
                  <span class="font-heading text-xs font-bold text-foreground">Pedido Criado via API Gateway</span>
                  <span class="text-[10px] font-mono text-muted-foreground">09:15 · 31/08</span>
                </div>
                <p class="text-[11px] text-muted-foreground leading-relaxed">
                  Payload JSON recebido de <b>ERP Monta UI Enterprise</b>. 42 itens incluídos no pedido.
                </p>
                <div class="flex items-center gap-2 pt-1">
                  <div class="flex items-center gap-1 text-[10px] text-muted-foreground font-semibold">
                    <div class="h-4 w-4 rounded-full bg-muted flex items-center justify-center text-[9px]">API</div>
                    <span>Webhook Integrador</span>
                  </div>
                  <span class="text-[10px] rounded bg-muted px-1.5 py-0.5 font-mono text-muted-foreground">status: 201_CREATED</span>
                </div>
              </div>
            </div>

            <!-- Event 2: Pagamento Aprovado -->
            <div class="flex gap-4 items-start relative">
              <div class="absolute left-3.5 top-7 bottom-0 w-0.5 bg-border -z-0"></div>
              <div class="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white shadow-sm ring-4 ring-card">
                <i data-lucide="check" class="h-3.5 w-3.5"></i>
              </div>
              <div class="flex-1 rounded-xl border border-border bg-card p-4 space-y-2 hover:border-brand/40 transition-colors shadow-sm">
                <div class="flex items-center justify-between">
                  <span class="font-heading text-xs font-bold text-foreground">Pagamento R$ 38.450,00 Confirmado</span>
                  <span class="text-[10px] font-mono text-muted-foreground">10:42 · 31/08</span>
                </div>
                <p class="text-[11px] text-muted-foreground leading-relaxed">
                  Conciliação automática via PIX Corporativo Banco Itaú. NF-e emitida com sucesso.
                </p>
                <div class="flex items-center justify-between pt-1">
                  <span class="rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 text-[10px] font-bold">NF-e #48.910 Aprovada</span>
                  <button onclick="showToast('Baixando XML da NF-e #48910...')" class="text-[11px] text-brand font-semibold hover:underline flex items-center gap-1">
                    <i data-lucide="file-text" class="h-3 w-3"></i> Ver DANFE
                  </button>
                </div>
              </div>
            </div>

            <!-- Event 3: Em Separação (Ativo Pulsante) -->
            <div class="flex gap-4 items-start relative">
              <div class="absolute left-3.5 top-7 bottom-0 w-0.5 bg-border -z-0"></div>
              <div class="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-white shadow-lg ring-4 ring-brand/20 animate-pulse">
                <i data-lucide="package" class="h-3.5 w-3.5"></i>
              </div>
              <div class="flex-1 rounded-xl border-2 border-brand/50 bg-card p-4 space-y-2 shadow-md">
                <div class="flex items-center justify-between">
                  <span class="font-heading text-xs font-bold text-brand">Separação em Andamento no CD-01</span>
                  <span class="text-[10px] font-bold text-brand font-mono">14:00 (Agora)</span>
                </div>
                <p class="text-[11px] text-muted-foreground leading-relaxed">
                  Operador <b>Carlos Mendes</b> realizando leitura de código de barras das caixas de expedição.
                </p>
                <div class="flex items-center justify-between pt-1 text-[11px]">
                  <span class="text-xs text-muted-foreground">Progresso: <b class="text-foreground">38 / 42 itens</b></span>
                  <button onclick="showToast('Notificação enviada ao operador!')" class="rounded bg-brand px-2.5 py-1 text-[10px] font-semibold text-white shadow hover:bg-brand-hover">
                    Priorizar Lote
                  </button>
                </div>
              </div>
            </div>

            <!-- Event 4: Próxima Etapa -->
            <div class="flex gap-4 items-start relative opacity-60">
              <div class="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted border border-border text-muted-foreground ring-4 ring-card">
                <i data-lucide="truck" class="h-3.5 w-3.5"></i>
              </div>
              <div class="flex-1 rounded-xl border border-border bg-card/60 p-4 space-y-1">
                <div class="flex items-center justify-between">
                  <span class="font-heading text-xs font-semibold text-muted-foreground">Coleta por Transportadora Jadlog</span>
                  <span class="text-[10px] font-mono text-muted-foreground">Previsão: 17:30</span>
                </div>
                <p class="text-[11px] text-muted-foreground">Caminhão de rota agendado para entrega expressa.</p>
              </div>
            </div>

          </div>
        </div>
      `;
      break;

    case 'statistic':
      stage.innerHTML = `
        <div class="w-full grid gap-3 sm:grid-cols-3">
          <div class="rounded-xl border border-border bg-card p-4 space-y-2 shadow-sm">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold text-muted-foreground">MRR Total</span>
              <span class="rounded-full bg-emerald-500/15 p-1 text-emerald-500"><i data-lucide="trending-up" class="h-3.5 w-3.5"></i></span>
            </div>
            <h3 class="font-heading text-xl font-extrabold text-foreground">R$ 482.900</h3>
            <p class="text-[10px] text-emerald-500 font-bold">+14.8% vs mês anterior</p>
          </div>

          <div class="rounded-xl border border-border bg-card p-4 space-y-2 shadow-sm">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold text-muted-foreground">NPS Corporativo</span>
              <span class="rounded-full bg-brand/15 p-1 text-brand"><i data-lucide="star" class="h-3.5 w-3.5"></i></span>
            </div>
            <h3 class="font-heading text-xl font-extrabold text-foreground">89 <span class="text-xs font-normal text-muted-foreground">/ 100</span></h3>
            <p class="text-[10px] text-brand font-bold">Zona de Excelência</p>
          </div>

          <div class="rounded-xl border border-border bg-card p-4 space-y-2 shadow-sm">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold text-muted-foreground">SLA de Atendimento</span>
              <span class="rounded-full bg-purple-500/15 p-1 text-purple-400"><i data-lucide="shield-check" class="h-3.5 w-3.5"></i></span>
            </div>
            <h3 class="font-heading text-xl font-extrabold text-foreground">99.4%</h3>
            <p class="text-[10px] text-muted-foreground font-medium">1.420 chamados finalizados</p>
          </div>
        </div>
      `;
      break;

    case 'page-header':
      stage.innerHTML = `
        <div class="w-full rounded-xl border border-border bg-card p-6 space-y-4">
          <div class="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Financeiro</span>
            <i data-lucide="chevron-right" class="h-3 w-3"></i>
            <span class="font-semibold text-foreground">Faturamento</span>
          </div>
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <h2 class="font-heading text-2xl font-bold text-foreground">Gestão de Faturas</h2>
                <span class="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">Produção</span>
              </div>
              <p class="text-xs text-muted-foreground">Gerencie cobranças, boletos e conciliações financeiras da sua empresa.</p>
            </div>
            <div class="flex items-center gap-2">
              <button onclick="showToast('Exportando relatório...')" class="inline-flex h-8 items-center gap-1.5 rounded-md border border-input px-3 text-xs font-semibold hover:bg-muted">
                <i data-lucide="download" class="h-3.5 w-3.5"></i> Exportar
              </button>
              <button onclick="showToast('Abrindo formulário de nova fatura')" class="inline-flex h-8 items-center gap-1.5 rounded-md bg-brand px-3 text-xs font-semibold text-white shadow hover:bg-brand-hover">
                <i data-lucide="plus" class="h-3.5 w-3.5"></i> Nova Fatura
              </button>
            </div>
          </div>
        </div>
      `;
      break;

    case 'avatar':
      stage.innerHTML = `
        <div class="flex flex-col items-center gap-6">
          <div class="flex items-center justify-center gap-4">
            <div class="relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white font-heading font-bold text-sm shadow-md">
              <span>FJ</span>
              <span class="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-background bg-emerald-500"></span>
            </div>
            <div class="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-muted text-foreground font-heading font-bold text-xs border border-border">
              <span>DS</span>
            </div>
            <div class="relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-purple-300 font-heading font-bold text-[10px] border border-purple-500/30">
              <span>MU</span>
            </div>
          </div>
          <div class="flex items-center">
            <div class="h-8 w-8 rounded-full border-2 border-background bg-purple-600 text-white text-xs font-bold flex items-center justify-center -mr-2">A</div>
            <div class="h-8 w-8 rounded-full border-2 border-background bg-emerald-600 text-white text-xs font-bold flex items-center justify-center -mr-2">B</div>
            <div class="h-8 w-8 rounded-full border-2 border-background bg-blue-600 text-white text-xs font-bold flex items-center justify-center -mr-2">C</div>
            <div class="h-8 w-8 rounded-full border-2 border-background bg-zinc-800 text-zinc-300 text-[10px] font-bold flex items-center justify-center">+4</div>
            <span class="text-xs text-muted-foreground ml-3">Equipe de Desenvolvimento</span>
          </div>
        </div>
      `;
      break;

    case 'breadcrumb':
      stage.innerHTML = `
        <nav class="flex items-center justify-center gap-2 text-xs font-medium text-muted-foreground">
          <a href="#/inicio" class="flex items-center gap-1 hover:text-brand transition-colors"><i data-lucide="home" class="h-3.5 w-3.5"></i> Início</a>
          <i data-lucide="chevron-right" class="h-3 w-3"></i>
          <span class="hover:text-brand cursor-pointer">Cadastros</span>
          <i data-lucide="chevron-right" class="h-3 w-3"></i>
          <span class="font-bold text-foreground">Clientes Corporativos</span>
        </nav>
      `;
      break;

    case 'dropdown-menu':
      stage.innerHTML = `
        <div class="flex flex-col items-center justify-center gap-4 relative py-6">
          <div class="relative inline-block text-left">
            <button onclick="toggleDropdownDemo()" class="inline-flex h-9 items-center gap-2 rounded-md bg-brand px-4 text-xs font-semibold text-white shadow hover:bg-brand-hover transition-all">
              <i data-lucide="user" class="h-3.5 w-3.5"></i>
              <span>Minha Conta</span>
              <i data-lucide="chevron-down" class="h-3.5 w-3.5"></i>
            </button>

            <!-- Dropdown Menu Box -->
            <div id="demoDropdownMenu" class="hidden absolute left-1/2 -translate-x-1/2 mt-2 w-56 rounded-xl border border-border bg-card p-1.5 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
              <div class="px-2.5 py-2 border-b border-border mb-1">
                <p class="text-xs font-bold text-foreground">Monta UI Enterprise</p>
                <p class="text-[10px] text-muted-foreground font-mono">admin@montaui.com.br</p>
              </div>
              <div class="space-y-0.5 text-xs">
                <button onclick="showToast('Abrindo Perfil'); toggleDropdownDemo()" class="flex w-full items-center justify-between px-2.5 py-1.5 rounded-md hover:bg-muted text-foreground transition-colors">
                  <span class="flex items-center gap-2"><i data-lucide="user-cog" class="h-3.5 w-3.5 text-muted-foreground"></i> Perfil Corporativo</span>
                  <span class="text-[10px] text-muted-foreground font-mono">Ctrl+P</span>
                </button>
                <button onclick="showToast('Abrindo Faturamento'); toggleDropdownDemo()" class="flex w-full items-center justify-between px-2.5 py-1.5 rounded-md hover:bg-muted text-foreground transition-colors">
                  <span class="flex items-center gap-2"><i data-lucide="credit-card" class="h-3.5 w-3.5 text-muted-foreground"></i> Faturamento & NF-e</span>
                  <span class="text-[10px] text-muted-foreground font-mono">Ctrl+B</span>
                </button>
                <button onclick="showToast('Abrindo Gestão de Equipe'); toggleDropdownDemo()" class="flex w-full items-center justify-between px-2.5 py-1.5 rounded-md hover:bg-muted text-foreground transition-colors">
                  <span class="flex items-center gap-2"><i data-lucide="users" class="h-3.5 w-3.5 text-muted-foreground"></i> Gestão de Equipe</span>
                  <span class="text-[10px] text-muted-foreground font-mono">Ctrl+T</span>
                </button>
              </div>
              <div class="h-px bg-border my-1"></div>
              <button onclick="showToast('Sessão encerrada'); toggleDropdownDemo()" class="flex w-full items-center justify-between px-2.5 py-1.5 rounded-md text-rose-500 hover:bg-rose-500/10 text-xs font-semibold transition-colors">
                <span class="flex items-center gap-2"><i data-lucide="log-out" class="h-3.5 w-3.5"></i> Encerrar Sessão</span>
                <span class="text-[10px] font-mono opacity-70">Ctrl+Q</span>
              </button>
            </div>
          </div>
        </div>
      `;
      break;

    case 'context-menu':
      stage.innerHTML = `
        <div class="w-full max-w-md mx-auto space-y-4">
          <!-- Right Click Trigger Area -->
          <div oncontextmenu="handleContextMenuDemo(event)" class="rounded-xl border-2 border-dashed border-border bg-muted/20 p-8 text-center space-y-2 cursor-context-menu hover:border-brand/50 hover:bg-muted/40 transition-all select-none relative">
            <div class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand mx-auto">
              <i data-lucide="mouse-pointer-click" class="h-5 w-5"></i>
            </div>
            <h4 class="font-heading text-xs font-bold text-foreground">Área com Menu de Contexto</h4>
            <p class="text-[11px] text-muted-foreground">Clique com o botão direito do mouse dentro deste cartão para abrir o menu contextual.</p>
            <div class="pt-2">
              <button onclick="toggleContextMenuDirect()" class="inline-flex h-7 items-center gap-1 rounded border border-border bg-card px-2.5 text-[11px] font-semibold text-muted-foreground hover:text-foreground">
                Ou clique aqui para simular
              </button>
            </div>

            <!-- Context Menu Float Box -->
            <div id="demoContextMenu" class="hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-52 rounded-xl border border-border bg-card p-1.5 shadow-2xl z-50 text-left animate-in fade-in zoom-in-95 duration-100">
              <div class="space-y-0.5 text-xs">
                <button onclick="showToast('Link copiado!'); hideContextMenuDemo()" class="flex w-full items-center justify-between px-2.5 py-1.5 rounded-md hover:bg-muted text-foreground transition-colors">
                  <span class="flex items-center gap-2"><i data-lucide="copy" class="h-3.5 w-3.5 text-muted-foreground"></i> Copiar Link</span>
                  <span class="text-[10px] text-muted-foreground font-mono">Ctrl+C</span>
                </button>
                <button onclick="showToast('Registro duplicado!'); hideContextMenuDemo()" class="flex w-full items-center justify-between px-2.5 py-1.5 rounded-md hover:bg-muted text-foreground transition-colors">
                  <span class="flex items-center gap-2"><i data-lucide="files" class="h-3.5 w-3.5 text-muted-foreground"></i> Duplicar</span>
                  <span class="text-[10px] text-muted-foreground font-mono">Ctrl+D</span>
                </button>
                <button onclick="showToast('Modo de edição'); hideContextMenuDemo()" class="flex w-full items-center justify-between px-2.5 py-1.5 rounded-md hover:bg-muted text-foreground transition-colors">
                  <span class="flex items-center gap-2"><i data-lucide="pencil" class="h-3.5 w-3.5 text-muted-foreground"></i> Renomear</span>
                  <span class="text-[10px] text-muted-foreground font-mono">F2</span>
                </button>
              </div>
              <div class="h-px bg-border my-1"></div>
              <div class="space-y-0.5 text-xs">
                <button onclick="showToast('Exportando PDF...'); hideContextMenuDemo()" class="flex w-full items-center justify-between px-2.5 py-1.5 rounded-md hover:bg-muted text-foreground transition-colors">
                  <span class="flex items-center gap-2"><i data-lucide="file-down" class="h-3.5 w-3.5 text-muted-foreground"></i> Exportar PDF</span>
                  <span class="text-[10px] text-muted-foreground font-mono">Ctrl+E</span>
                </button>
                <button onclick="showToast('Item movido para lixeira'); hideContextMenuDemo()" class="flex w-full items-center justify-between px-2.5 py-1.5 rounded-md text-rose-500 hover:bg-rose-500/10 font-semibold transition-colors">
                  <span class="flex items-center gap-2"><i data-lucide="trash-2" class="h-3.5 w-3.5"></i> Excluir</span>
                  <span class="text-[10px] font-mono opacity-70">Del</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
      break;

    case 'menubar':
      stage.innerHTML = `
        <div class="w-full max-w-lg mx-auto space-y-4">
          <!-- Menubar Container -->
          <div class="inline-flex h-9 items-center rounded-lg border border-border bg-card p-1 text-xs shadow-sm relative">
            
            <!-- Item 1: Arquivo -->
            <div class="relative">
              <button onclick="toggleMenubarMenu('file')" class="menubar-trigger rounded px-3 py-1 font-semibold text-foreground hover:bg-muted transition-colors">
                Arquivo
              </button>
              <div id="menubar-menu-file" class="menubar-dropdown hidden absolute left-0 mt-2 w-48 rounded-xl border border-border bg-card p-1.5 shadow-2xl z-50 space-y-0.5 text-xs">
                <button onclick="showToast('Novo Arquivo'); closeAllMenubars()" class="flex w-full items-center justify-between px-2.5 py-1.5 rounded hover:bg-muted text-foreground">
                  <span>Novo Arquivo</span>
                  <span class="text-[10px] text-muted-foreground font-mono">Ctrl+N</span>
                </button>
                <button onclick="showToast('Abrindo Arquivo...'); closeAllMenubars()" class="flex w-full items-center justify-between px-2.5 py-1.5 rounded hover:bg-muted text-foreground">
                  <span>Abrir...</span>
                  <span class="text-[10px] text-muted-foreground font-mono">Ctrl+O</span>
                </button>
                <button onclick="showToast('Arquivo Salvo!'); closeAllMenubars()" class="flex w-full items-center justify-between px-2.5 py-1.5 rounded hover:bg-muted text-foreground">
                  <span>Salvar</span>
                  <span class="text-[10px] text-muted-foreground font-mono">Ctrl+S</span>
                </button>
              </div>
            </div>

            <!-- Item 2: Editar -->
            <div class="relative">
              <button onclick="toggleMenubarMenu('edit')" class="menubar-trigger rounded px-3 py-1 font-semibold text-foreground hover:bg-muted transition-colors">
                Editar
              </button>
              <div id="menubar-menu-edit" class="menubar-dropdown hidden absolute left-0 mt-2 w-48 rounded-xl border border-border bg-card p-1.5 shadow-2xl z-50 space-y-0.5 text-xs">
                <button onclick="showToast('Desfazer ação'); closeAllMenubars()" class="flex w-full items-center justify-between px-2.5 py-1.5 rounded hover:bg-muted text-foreground">
                  <span>Desfazer</span>
                  <span class="text-[10px] text-muted-foreground font-mono">Ctrl+Z</span>
                </button>
                <button onclick="showToast('Refazer ação'); closeAllMenubars()" class="flex w-full items-center justify-between px-2.5 py-1.5 rounded hover:bg-muted text-foreground">
                  <span>Refazer</span>
                  <span class="text-[10px] text-muted-foreground font-mono">Ctrl+Y</span>
                </button>
              </div>
            </div>

            <!-- Item 3: Exibir -->
            <div class="relative">
              <button onclick="toggleMenubarMenu('view')" class="menubar-trigger rounded px-3 py-1 font-semibold text-foreground hover:bg-muted transition-colors">
                Exibir
              </button>
              <div id="menubar-menu-view" class="menubar-dropdown hidden absolute left-0 mt-2 w-48 rounded-xl border border-border bg-card p-1.5 shadow-2xl z-50 space-y-0.5 text-xs">
                <button onclick="toggleTheme(); closeAllMenubars()" class="flex w-full items-center justify-between px-2.5 py-1.5 rounded hover:bg-muted text-foreground">
                  <span>Alternar Tema</span>
                  <span class="text-[10px] text-muted-foreground font-mono">Ctrl+T</span>
                </button>
                <button onclick="showToast('Tela cheia'); closeAllMenubars()" class="flex w-full items-center justify-between px-2.5 py-1.5 rounded hover:bg-muted text-foreground">
                  <span>Tela Cheia</span>
                  <span class="text-[10px] text-muted-foreground font-mono">F11</span>
                </button>
              </div>
            </div>

            <!-- Item 4: Ajuda -->
            <div class="relative">
              <button onclick="toggleMenubarMenu('help')" class="menubar-trigger rounded px-3 py-1 font-semibold text-foreground hover:bg-muted transition-colors">
                Ajuda
              </button>
              <div id="menubar-menu-help" class="menubar-dropdown hidden absolute left-0 mt-2 w-48 rounded-xl border border-border bg-card p-1.5 shadow-2xl z-50 space-y-0.5 text-xs">
                <button onclick="showToast('Documentação do Monta UI'); closeAllMenubars()" class="flex w-full items-center justify-between px-2.5 py-1.5 rounded hover:bg-muted text-foreground">
                  <span>Docs Monta UI</span>
                </button>
                <button onclick="showToast('Versão 2.0.0 instalada'); closeAllMenubars()" class="flex w-full items-center justify-between px-2.5 py-1.5 rounded hover:bg-muted text-foreground">
                  <span>Sobre o Sistema</span>
                </button>
              </div>
            </div>

          </div>

          <div class="rounded-xl border border-border bg-muted/20 p-6 text-center text-xs text-muted-foreground">
            Clique nos itens da barra superior para navegar pelos menus em cascata com atalhos de teclado nativos.
          </div>
        </div>
      `;
      break;

    case 'navigation-menu':
      stage.innerHTML = `
        <div class="w-full max-w-lg mx-auto space-y-4">
          <!-- Navigation Menu Bar -->
          <div class="flex items-center justify-center gap-1 relative">
            
            <!-- Dropdown Trigger 1 -->
            <div class="relative">
              <button onclick="toggleNavMegaMenu('solucoes')" class="inline-flex h-9 items-center gap-1.5 rounded-md px-3 text-xs font-semibold text-foreground hover:bg-muted transition-colors">
                <span>Soluções</span>
                <i data-lucide="chevron-down" class="h-3.5 w-3.5"></i>
              </button>

              <!-- Mega Menu Dropdown -->
              <div id="nav-mega-solucoes" class="nav-mega-dropdown hidden absolute left-1/2 -translate-x-1/2 mt-2 w-80 sm:w-96 rounded-xl border border-border bg-card p-4 shadow-2xl z-50 space-y-3 animate-in fade-in zoom-in-95 duration-150">
                <div class="grid grid-cols-2 gap-2">
                  <div onclick="showToast('Módulo Core'); closeAllNavMenus()" class="rounded-lg p-2.5 hover:bg-muted cursor-pointer transition-colors space-y-1">
                    <div class="flex items-center gap-1.5 font-bold text-xs text-brand">
                      <i data-lucide="component" class="h-3.5 w-3.5"></i>
                      <span>Monta Core</span>
                    </div>
                    <p class="text-[10px] text-muted-foreground leading-tight">27 componentes acessíveis e customizáveis.</p>
                  </div>
                  <div onclick="showToast('Módulo CLI'); closeAllNavMenus()" class="rounded-lg p-2.5 hover:bg-muted cursor-pointer transition-colors space-y-1">
                    <div class="flex items-center gap-1.5 font-bold text-xs text-foreground">
                      <i data-lucide="terminal" class="h-3.5 w-3.5 text-muted-foreground"></i>
                      <span>Monta CLI</span>
                    </div>
                    <p class="text-[10px] text-muted-foreground leading-tight">Instalação direta via pnpm dlx / npx.</p>
                  </div>
                  <div onclick="showToast('Módulo Analytics'); closeAllNavMenus()" class="rounded-lg p-2.5 hover:bg-muted cursor-pointer transition-colors space-y-1">
                    <div class="flex items-center gap-1.5 font-bold text-xs text-foreground">
                      <i data-lucide="bar-chart-3" class="h-3.5 w-3.5 text-emerald-500"></i>
                      <span>Analytics</span>
                    </div>
                    <p class="text-[10px] text-muted-foreground leading-tight">Dashboards de KPIs e métricas corporativas.</p>
                  </div>
                  <div onclick="showToast('Módulo Enterprise'); closeAllNavMenus()" class="rounded-lg p-2.5 hover:bg-muted cursor-pointer transition-colors space-y-1">
                    <div class="flex items-center gap-1.5 font-bold text-xs text-purple-400">
                      <i data-lucide="shield-check" class="h-3.5 w-3.5"></i>
                      <span>Enterprise</span>
                    </div>
                    <p class="text-[10px] text-muted-foreground leading-tight">Suporte 24/7 e auditoria avançada.</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Dropdown Trigger 2 -->
            <div class="relative">
              <button onclick="toggleNavMegaMenu('docs')" class="inline-flex h-9 items-center gap-1.5 rounded-md px-3 text-xs font-semibold text-foreground hover:bg-muted transition-colors">
                <span>Documentação</span>
                <i data-lucide="chevron-down" class="h-3.5 w-3.5"></i>
              </button>

              <div id="nav-mega-docs" class="nav-mega-dropdown hidden absolute left-1/2 -translate-x-1/2 mt-2 w-72 rounded-xl border border-border bg-card p-3 shadow-2xl z-50 space-y-1 text-xs animate-in fade-in zoom-in-95 duration-150">
                <a href="#/docs/instalacao" onclick="closeAllNavMenus()" class="block rounded-lg p-2 hover:bg-muted text-foreground transition-colors">
                  <p class="font-bold">Guia de Instalação</p>
                  <p class="text-[10px] text-muted-foreground">Configuração em 5 passos com Tailwind CSS.</p>
                </a>
                <a href="#/docs/storybook" onclick="closeAllNavMenus()" class="block rounded-lg p-2 hover:bg-muted text-foreground transition-colors">
                  <p class="font-bold">Storybook 8</p>
                  <p class="text-[10px] text-muted-foreground">Ambiente isolado de testes de componentes.</p>
                </a>
              </div>
            </div>

            <!-- Direct Nav Link -->
            <a href="#/docs/tailwind" class="inline-flex h-9 items-center gap-1.5 rounded-md px-3 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors">
              Tailwind Config
            </a>
          </div>
        </div>
      `;
      break;

    case 'popover':
      stage.innerHTML = `
        <div class="flex flex-col items-center justify-center gap-4">
          <button onclick="togglePopoverDemo()" class="inline-flex h-9 items-center gap-1.5 rounded-md bg-brand px-4 text-xs font-semibold text-white shadow hover:bg-brand-hover">
            <i data-lucide="sliders-horizontal" class="h-3.5 w-3.5"></i> Configurações Rápidas
          </button>
          <div id="demoPopover" class="hidden rounded-lg border border-border bg-card p-4 shadow-xl max-w-xs space-y-2.5 animate-in fade-in zoom-in-95 duration-150">
            <h4 class="font-bold text-xs text-foreground">Filtro Rápido</h4>
            <p class="text-[11px] text-muted-foreground">Defina os parâmetros de visualização do grid.</p>
            <div class="pt-2 flex justify-end">
              <button onclick="togglePopoverDemo()" class="text-xs text-brand font-semibold hover:underline">Fechar</button>
            </div>
          </div>
        </div>
      `;
      break;

    case 'select':
      stage.innerHTML = `
        <div class="w-full max-w-xs mx-auto space-y-1.5">
          <label class="text-xs font-semibold text-foreground">Filial de Faturamento</label>
          <select onchange="showToast('Filial selecionada: ' + this.value)" class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-xs shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand">
            <option value="01 - Matriz São Paulo">01 - Matriz São Paulo</option>
            <option value="02 - Filial Rio de Janeiro">02 - Filial Rio de Janeiro</option>
            <option value="03 - Filial Belo Horizonte">03 - Filial Belo Horizonte</option>
            <option value="04 - Filial Porto Alegre">04 - Filial Porto Alegre</option>
          </select>
        </div>
      `;
      break;

    case 'textarea':
      stage.innerHTML = `
        <div class="w-full max-w-md mx-auto space-y-1.5">
          <label class="text-xs font-semibold text-foreground">Observações do Pedido</label>
          <textarea id="demoTextarea" oninput="updateCharCount(this)" rows="3" class="flex w-full rounded-md border border-input bg-background p-3 text-xs shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand resize-none placeholder:text-muted-foreground" placeholder="Descreva os detalhes da entrega..."></textarea>
          <div class="flex justify-between text-[11px] text-muted-foreground">
            <span>Máximo 250 caracteres</span>
            <span id="demoCharCount" class="font-mono">0/250</span>
          </div>
        </div>
      `;
      break;

    case 'radio-group':
      stage.innerHTML = `
        <div class="w-full max-w-md mx-auto space-y-4">
          <div class="space-y-1">
            <label class="text-xs font-semibold text-foreground">Plano de Subscrição Corporativa</label>
            <p class="text-[11px] text-muted-foreground">Selecione a capacidade computacional da sua organização.</p>
          </div>
          
          <div class="grid gap-2.5">
            <!-- Card 1 -->
            <div onclick="selectRadioDemo('enterprise')" id="radio-card-enterprise" class="radio-demo-card relative flex cursor-pointer items-start gap-4 rounded-xl border-2 border-brand bg-brand/5 dark:bg-brand/10 p-4 shadow-sm transition-all">
              <div class="mt-0.5 h-4 w-4 shrink-0 rounded-full border border-brand bg-brand flex items-center justify-center">
                <div class="h-1.5 w-1.5 rounded-full bg-white"></div>
              </div>
              <div class="flex-1 space-y-1">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <i data-lucide="building-2" class="h-4 w-4 text-brand"></i>
                    <span class="font-heading text-xs font-bold text-foreground">Enterprise Dedicado</span>
                  </div>
                  <span class="rounded-full bg-brand/15 px-2 py-0.5 text-[10px] font-bold text-brand dark:text-purple-300">Recomendado</span>
                </div>
                <p class="text-[11px] text-muted-foreground leading-relaxed">SLA 99.9%, instâncias dedicadas e suporte 24/7 com engenheiro nomeado.</p>
              </div>
            </div>

            <!-- Card 2 -->
            <div onclick="selectRadioDemo('business')" id="radio-card-business" class="radio-demo-card relative flex cursor-pointer items-start gap-4 rounded-xl border border-border bg-card p-4 shadow-sm hover:border-brand/40 transition-all">
              <div class="mt-0.5 h-4 w-4 shrink-0 rounded-full border border-input bg-background flex items-center justify-center"></div>
              <div class="flex-1 space-y-1">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <i data-lucide="briefcase" class="h-4 w-4 text-muted-foreground"></i>
                    <span class="font-heading text-xs font-bold text-foreground">Business Cloud</span>
                  </div>
                  <span class="text-xs font-bold font-mono text-muted-foreground">R$ 890/mês</span>
                </div>
                <p class="text-[11px] text-muted-foreground leading-relaxed">Até 50 usuários simultâneos com backups diários automáticos.</p>
              </div>
            </div>

            <!-- Card 3 -->
            <div onclick="selectRadioDemo('starter')" id="radio-card-starter" class="radio-demo-card relative flex cursor-pointer items-start gap-4 rounded-xl border border-border bg-card p-4 shadow-sm hover:border-brand/40 transition-all">
              <div class="mt-0.5 h-4 w-4 shrink-0 rounded-full border border-input bg-background flex items-center justify-center"></div>
              <div class="flex-1 space-y-1">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <i data-lucide="rocket" class="h-4 w-4 text-muted-foreground"></i>
                    <span class="font-heading text-xs font-bold text-foreground">Starter Startup</span>
                  </div>
                  <span class="text-xs font-bold font-mono text-muted-foreground">R$ 290/mês</span>
                </div>
                <p class="text-[11px] text-muted-foreground leading-relaxed">Ideal para testes rápidos e pequenos times de até 5 membros.</p>
              </div>
            </div>
          </div>
        </div>
      `;
      break;

    case 'slider':
      stage.innerHTML = `
        <div class="w-full max-w-md mx-auto space-y-6">
          <div class="flex items-center justify-between">
            <div>
              <h4 class="font-heading text-xs font-bold text-foreground">Limite de Crédito Aprovado</h4>
              <p class="text-[11px] text-muted-foreground">Arraste para ajustar o teto orçamentário operacional.</p>
            </div>
            <span id="sliderBadgeValue" class="rounded-lg bg-brand/15 px-3 py-1 text-xs font-bold font-mono text-brand dark:text-purple-300">
              R$ 45.000,00
            </span>
          </div>

          <div class="space-y-2">
            <div class="relative flex items-center">
              <input id="demoSliderRange" type="range" min="0" max="100000" step="1000" value="45000" oninput="updateSliderDemo(this.value)" class="absolute inset-0 h-full w-full cursor-pointer opacity-0 z-10">
              <div class="relative h-2.5 w-full overflow-hidden rounded-full bg-muted">
                <div id="sliderFillBar" class="h-full bg-brand transition-all" style="width: 45%;"></div>
              </div>
              <div id="sliderThumbDot" class="pointer-events-none absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand bg-background shadow-md ring-4 ring-brand/20 transition-all" style="left: 45%;"></div>
            </div>
            <div class="flex justify-between text-[11px] font-mono text-muted-foreground">
              <span>R$ 0,00</span>
              <span class="text-[10px] text-muted-foreground font-sans">Passo: R$ 1.000,00</span>
              <span>R$ 100.000,00</span>
            </div>
          </div>

          <div class="rounded-xl border border-border bg-muted/20 p-3.5 flex items-center justify-between text-xs">
            <span class="text-muted-foreground">Projeção de Juros Estimada:</span>
            <span id="sliderInterestEst" class="font-bold text-foreground font-mono">R$ 540,00 / mês</span>
          </div>
        </div>
      `;
      break;

    case 'date-picker':
      stage.innerHTML = `
        <div class="w-full max-w-sm mx-auto space-y-4">
          <div class="space-y-1.5 relative">
            <label class="text-xs font-semibold text-foreground">Data de Vencimento da NF-e</label>
            <div class="relative flex items-center">
              <button onclick="toggleDatePickerDemo()" class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3.5 text-xs shadow-sm hover:border-brand transition-colors focus:ring-1 focus:ring-brand">
                <span class="flex items-center gap-2 text-foreground font-medium">
                  <i data-lucide="calendar" class="h-4 w-4 text-brand"></i>
                  <span id="demoDatePickerLabel">31/08/2026</span>
                </span>
                <span onclick="clearDatePickerDemo(event)" class="rounded p-1 hover:bg-muted text-muted-foreground hover:text-foreground">
                  <i data-lucide="x" class="h-3.5 w-3.5"></i>
                </span>
              </button>
            </div>

            <!-- Date Picker Calendar Popover -->
            <div id="demoDatePickerPopover" class="hidden absolute left-0 top-full mt-2 w-72 rounded-xl border border-border bg-card p-3 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
              <!-- Shortcuts -->
              <div class="flex gap-1 border-b border-border pb-2 mb-2">
                <button onclick="selectDatePreset(0)" class="rounded bg-muted px-2 py-1 text-[10px] font-semibold hover:bg-brand hover:text-white transition-colors">Hoje</button>
                <button onclick="selectDatePreset(1)" class="rounded bg-muted px-2 py-1 text-[10px] font-semibold hover:bg-brand hover:text-white transition-colors">Amanhã</button>
                <button onclick="selectDatePreset(7)" class="rounded bg-muted px-2 py-1 text-[10px] font-semibold hover:bg-brand hover:text-white transition-colors">+7 Dias</button>
                <button onclick="selectDatePreset(30)" class="rounded bg-muted px-2 py-1 text-[10px] font-semibold hover:bg-brand hover:text-white transition-colors">+30 Dias</button>
              </div>

              <!-- Header -->
              <div class="flex items-center justify-between pb-2 mb-2 border-b border-border/60">
                <button onclick="navDateMonth(-1)" class="rounded p-1 hover:bg-muted text-muted-foreground"><i data-lucide="chevron-left" class="h-3.5 w-3.5"></i></button>
                <span id="datePickerMonthYear" class="font-heading text-xs font-bold text-foreground">Agosto 2026</span>
                <button onclick="navDateMonth(1)" class="rounded p-1 hover:bg-muted text-muted-foreground"><i data-lucide="chevron-right" class="h-3.5 w-3.5"></i></button>
              </div>

              <!-- Days Grid -->
              <div class="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-muted-foreground mb-1">
                <span>D</span><span>S</span><span>T</span><span>Q</span><span>Q</span><span>S</span><span>S</span>
              </div>
              <div id="datePickerDaysGrid" class="grid grid-cols-7 gap-1"></div>
            </div>
          </div>
          <p class="text-[11px] text-muted-foreground">Clique no campo para abrir o calendário mensal com seleção dinâmica.</p>
        </div>
      `;
      setTimeout(renderCalendarDaysDemo, 50);
      break;

    case 'lookup':
      stage.innerHTML = `
        <div class="w-full max-w-md mx-auto space-y-4">
          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-foreground">Cliente / Parceiro Comercial</label>
            <div class="relative flex items-center">
              <button onclick="openLookupDemo()" class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3.5 text-xs shadow-sm hover:border-brand transition-colors focus:ring-1 focus:ring-brand">
                <span id="lookupSelectedDisplay" class="flex items-center gap-2 font-medium text-foreground">
                  <span class="font-mono text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground">CLI-102</span>
                  <span>Vale S/A Mineração</span>
                </span>
                <span class="flex items-center gap-1 text-brand font-semibold text-xs">
                  <i data-lucide="search" class="h-4 w-4"></i>
                  <span>Buscar</span>
                </span>
              </button>
            </div>
          </div>

          <!-- Lookup Modal -->
          <div id="demoLookupModal" class="hidden fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
            <div class="relative w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
              <div class="flex items-center justify-between border-b border-border bg-muted/40 px-5 py-3.5">
                <div class="flex items-center gap-2">
                  <i data-lucide="building-2" class="h-4 w-4 text-brand"></i>
                  <h3 class="font-heading text-sm font-bold text-foreground">Consulta de Clientes Corporativos</h3>
                </div>
                <button onclick="closeLookupDemo()" class="rounded p-1 hover:bg-muted text-muted-foreground"><i data-lucide="x" class="h-4 w-4"></i></button>
              </div>

              <div class="p-4 space-y-3">
                <div class="relative">
                  <i data-lucide="search" class="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground"></i>
                  <input id="lookupSearchInput" oninput="filterLookupDemo(this.value)" type="text" placeholder="Filtrar por código, CNPJ ou razão social..." class="flex h-9 w-full rounded-md border border-input bg-background pl-9 pr-3 text-xs shadow-sm focus:border-brand focus:outline-none">
                </div>

                <div id="lookupItemsContainer" class="max-h-60 overflow-y-auto rounded-lg border border-border divide-y divide-border/60">
                  <!-- Inserido dinamicamente via JS -->
                </div>
              </div>
            </div>
          </div>
          <p class="text-[11px] text-muted-foreground">Abre diálogo modal com busca em tempo real e retorno formatado de entidade.</p>
        </div>
      `;
      setTimeout(renderLookupItemsDemo, 50);
      break;

    case 'combo':
      stage.innerHTML = `
        <div class="w-full max-w-sm mx-auto space-y-4 relative">
          <div class="space-y-1.5 relative">
            <label class="text-xs font-semibold text-foreground">Centro de Custo / Departamento</label>
            <button onclick="toggleComboDemo()" class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3.5 text-xs shadow-sm hover:border-brand transition-colors">
              <span id="comboSelectedLabel" class="font-medium text-foreground">Tecnologia da Informação</span>
              <i data-lucide="chevrons-up-down" class="h-3.5 w-3.5 opacity-50"></i>
            </button>

            <!-- Combo Dropdown -->
            <div id="demoComboDropdown" class="hidden absolute left-0 top-full mt-1.5 w-full rounded-xl border border-border bg-card p-1.5 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-100">
              <div class="flex items-center border-b border-border px-2 pb-1.5 mb-1.5">
                <i data-lucide="search" class="h-3.5 w-3.5 text-muted-foreground mr-2 shrink-0"></i>
                <input id="comboSearchInput" oninput="filterComboDemo(this.value)" type="text" placeholder="Buscar departamento..." class="w-full bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus:outline-none">
              </div>
              <div id="comboOptionsList" class="max-h-48 overflow-y-auto space-y-0.5"></div>
            </div>
          </div>
          <p class="text-[11px] text-muted-foreground">Select enriquecido com caixa de filtragem instantânea.</p>
        </div>
      `;
      setTimeout(renderComboOptionsDemo, 50);
      break;

    case 'multiselect':
      stage.innerHTML = `
        <div class="w-full max-w-md mx-auto space-y-4 relative">
          <div class="space-y-1.5 relative">
            <label class="text-xs font-semibold text-foreground">Permissões de Acesso por Módulo</label>
            <div onclick="toggleMultiSelectDemo()" class="flex min-h-[42px] w-full flex-wrap items-center gap-1.5 rounded-md border border-input bg-background p-1.5 text-xs shadow-sm hover:border-brand cursor-pointer">
              <div id="multiSelectTagsContainer" class="flex flex-wrap gap-1.5"></div>
              <i data-lucide="chevrons-up-down" class="ml-auto h-3.5 w-3.5 opacity-50 pr-1 shrink-0"></i>
            </div>

            <!-- MultiSelect Dropdown -->
            <div id="demoMultiSelectDropdown" class="hidden absolute left-0 top-full mt-1.5 w-full rounded-xl border border-border bg-card p-1.5 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-100">
              <div class="flex items-center border-b border-border px-2 pb-1.5 mb-1.5">
                <i data-lucide="search" class="h-3.5 w-3.5 text-muted-foreground mr-2 shrink-0"></i>
                <input id="multiSelectSearchInput" oninput="filterMultiSelectDemo(this.value)" type="text" placeholder="Filtrar permissões..." class="w-full bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus:outline-none">
              </div>
              <div id="multiSelectOptionsList" class="max-h-48 overflow-y-auto space-y-0.5"></div>
            </div>
          </div>
          <p class="text-[11px] text-muted-foreground">Seleção múltipla com remoção de tags por chip e checkboxes de seleção.</p>
        </div>
      `;
      setTimeout(renderMultiSelectDemo, 50);
      break;

    case 'badge':
      stage.innerHTML = `
        <div class="w-full max-w-lg space-y-6 text-left">
          <!-- 1. Variantes Semânticas -->
          <div class="space-y-2">
            <h4 class="font-heading text-xs font-bold text-foreground">1. Variantes Semânticas</h4>
            <div class="flex flex-wrap items-center gap-2">
              <span class="inline-flex items-center rounded-full bg-[#753399]/15 px-3 py-1 text-xs font-bold text-[#753399] dark:bg-[#753399]/30 dark:text-purple-300">
                Primary Brand
              </span>
              <span class="inline-flex items-center rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <i data-lucide="check" class="h-3 w-3 mr-1"></i> Aprovado
              </span>
              <span class="inline-flex items-center rounded-full bg-amber-500/15 px-3 py-1 text-xs font-bold text-amber-600 dark:text-amber-400">
                <i data-lucide="clock" class="h-3 w-3 mr-1"></i> Pendente
              </span>
              <span class="inline-flex items-center rounded-full bg-rose-500/15 px-3 py-1 text-xs font-bold text-rose-600 dark:text-rose-400">
                <i data-lucide="alert-triangle" class="h-3 w-3 mr-1"></i> Cancelado
              </span>
              <span class="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-foreground">
                Outline
              </span>
              <span class="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                Secondary
              </span>
            </div>
          </div>

          <!-- 2. Badges com Dot Indicator -->
          <div class="space-y-2">
            <h4 class="font-heading text-xs font-bold text-foreground">2. Indicadores de Status (Luminous Dot)</h4>
            <div class="flex flex-wrap items-center gap-3">
              <span class="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-foreground shadow-sm">
                <span class="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Servidor Online</span>
              </span>
              <span class="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-foreground shadow-sm">
                <span class="h-2 w-2 rounded-full bg-amber-500"></span>
                <span>Manutenção Programada</span>
              </span>
              <span class="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-foreground shadow-sm">
                <span class="h-2 w-2 rounded-full bg-[#753399]"></span>
                <span>Sincronizando</span>
              </span>
              <span class="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-foreground shadow-sm">
                <span class="h-2 w-2 rounded-full bg-zinc-400"></span>
                <span>Inativo</span>
              </span>
            </div>
          </div>

          <!-- 3. Tags Removíveis Interativas -->
          <div class="space-y-2">
            <h4 class="font-heading text-xs font-bold text-foreground">3. Badges Removíveis (Clique para remover)</h4>
            <div id="demoBadgeChipsContainer" class="flex flex-wrap items-center gap-2">
              <span id="chip-1" class="inline-flex items-center gap-1.5 rounded-md bg-[#753399]/15 px-2.5 py-1 text-xs font-semibold text-[#753399] dark:text-purple-300">
                <span>React 19</span>
                <button onclick="removeBadgeChipDemo('chip-1')" class="rounded p-0.5 hover:bg-[#753399]/25 transition-colors"><i data-lucide="x" class="h-3 w-3"></i></button>
              </span>
              <span id="chip-2" class="inline-flex items-center gap-1.5 rounded-md bg-[#753399]/15 px-2.5 py-1 text-xs font-semibold text-[#753399] dark:text-purple-300">
                <span>TypeScript</span>
                <button onclick="removeBadgeChipDemo('chip-2')" class="rounded p-0.5 hover:bg-[#753399]/25 transition-colors"><i data-lucide="x" class="h-3 w-3"></i></button>
              </span>
              <span id="chip-3" class="inline-flex items-center gap-1.5 rounded-md bg-[#753399]/15 px-2.5 py-1 text-xs font-semibold text-[#753399] dark:text-purple-300">
                <span>Tailwind CSS</span>
                <button onclick="removeBadgeChipDemo('chip-3')" class="rounded p-0.5 hover:bg-[#753399]/25 transition-colors"><i data-lucide="x" class="h-3 w-3"></i></button>
              </span>
              <span id="chip-4" class="inline-flex items-center gap-1.5 rounded-md bg-[#753399]/15 px-2.5 py-1 text-xs font-semibold text-[#753399] dark:text-purple-300">
                <span>Zero Radix</span>
                <button onclick="removeBadgeChipDemo('chip-4')" class="rounded p-0.5 hover:bg-[#753399]/25 transition-colors"><i data-lucide="x" class="h-3 w-3"></i></button>
              </span>
              <button onclick="resetBadgeChipsDemo()" class="text-[11px] font-semibold text-[#753399] hover:underline ml-1">Restaurar tags</button>
            </div>
          </div>
        </div>
      `;
      break;

    case 'toast':
      stage.innerHTML = `
        <div class="w-full max-w-md space-y-6 text-left">
          <div class="space-y-3">
            <h4 class="font-heading text-xs font-bold text-foreground">Disparar Notificações Corporativas</h4>
            <div class="grid grid-cols-2 gap-2.5">
              <button onclick="showToastDemo('success')" class="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-3.5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700 active:scale-95 transition-all">
                <i data-lucide="check-circle" class="h-4 w-4"></i> Toast Sucesso
              </button>
              <button onclick="showToastDemo('danger')" class="inline-flex items-center justify-center gap-2 rounded-lg bg-rose-600 px-3.5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-rose-700 active:scale-95 transition-all">
                <i data-lucide="alert-circle" class="h-4 w-4"></i> Toast Erro
              </button>
              <button onclick="showToastDemo('warning')" class="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-600 px-3.5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-amber-700 active:scale-95 transition-all">
                <i data-lucide="alert-triangle" class="h-4 w-4"></i> Toast Aviso
              </button>
              <button onclick="showToastDemo('brand')" class="inline-flex items-center justify-center gap-2 rounded-lg bg-[#753399] px-3.5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#622981] active:scale-95 transition-all">
                <i data-lucide="bell" class="h-4 w-4"></i> Toast Monta Brand
              </button>
            </div>
          </div>

          <!-- Toast Card Preview Inline -->
          <div class="space-y-2 pt-2">
            <h4 class="font-heading text-xs font-bold text-foreground">Estrutura Visual do Toast</h4>
            <div class="relative flex items-start justify-between gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-800 dark:text-emerald-300 shadow-md">
              <div class="flex items-start gap-3">
                <div class="rounded-full bg-emerald-500/20 p-1 mt-0.5">
                  <i data-lucide="check" class="h-4 w-4 text-emerald-600 dark:text-emerald-400"></i>
                </div>
                <div class="space-y-1">
                  <h5 class="font-heading text-xs font-bold">Fatura Emitida com Sucesso</h5>
                  <p class="text-[11px] opacity-90 leading-relaxed">A Nota Fiscal NF-e #4920 foi autorizada pela SEFAZ e enviada ao cliente.</p>
                </div>
              </div>
              <button class="text-emerald-700 dark:text-emerald-400 hover:opacity-100 opacity-60 p-0.5">
                <i data-lucide="x" class="h-3.5 w-3.5"></i>
              </button>
            </div>
          </div>
        </div>
      `;
      break;

    case 'progress':
      stage.innerHTML = `
        <div class="w-full max-w-md space-y-6 text-left">
          <!-- 1. Barra Controlada com Botões -->
          <div class="space-y-2.5">
            <div class="flex items-center justify-between">
              <span class="font-heading text-xs font-bold text-foreground">1. Upload de Arquivos / Backup</span>
              <span id="demoProgressValueBadge" class="font-mono text-xs font-bold text-[#753399] bg-[#753399]/10 px-2 py-0.5 rounded">65%</span>
            </div>
            <div class="relative h-3 w-full overflow-hidden rounded-full bg-muted">
              <div id="demoProgressBar" class="h-full bg-[#753399] transition-all duration-300 shadow-sm" style="width: 65%;"></div>
            </div>
            <div class="flex items-center justify-between pt-1">
              <div class="flex items-center gap-2">
                <button onclick="adjustProgressDemo(-15)" class="rounded-md border border-input bg-card px-2.5 py-1 text-xs font-medium hover:bg-muted">-15%</button>
                <button onclick="adjustProgressDemo(15)" class="rounded-md border border-input bg-card px-2.5 py-1 text-xs font-medium hover:bg-muted">+15%</button>
                <button onclick="setProgressDemo(100)" class="rounded-md border border-input bg-card px-2.5 py-1 text-xs font-medium hover:bg-muted">100%</button>
              </div>
              <button onclick="simulateProgressDemo()" class="inline-flex items-center gap-1.5 rounded-md bg-[#753399] px-3 py-1 text-xs font-semibold text-white shadow hover:bg-[#622981]">
                <i data-lucide="play" class="h-3 w-3"></i> Simular Download
              </button>
            </div>
          </div>

          <!-- 2. Variantes de Cores e Estados -->
          <div class="space-y-3 pt-2">
            <h4 class="font-heading text-xs font-bold text-foreground">2. Variantes Semânticas & Tamanhos</h4>
            
            <div class="space-y-1">
              <div class="flex justify-between text-[11px] text-muted-foreground font-medium">
                <span>Armazenamento em Nuvem</span>
                <span class="text-amber-500 font-bold">88% (Alerta)</span>
              </div>
              <div class="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div class="h-full bg-amber-500" style="width: 88%;"></div>
              </div>
            </div>

            <div class="space-y-1">
              <div class="flex justify-between text-[11px] text-muted-foreground font-medium">
                <span>Migração de Banco de Dados</span>
                <span class="text-emerald-500 font-bold">100% (Concluído)</span>
              </div>
              <div class="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div class="h-full bg-emerald-500" style="width: 100%;"></div>
              </div>
            </div>

            <div class="space-y-1">
              <div class="flex justify-between text-[11px] text-muted-foreground font-medium">
                <span>Processamento em Segundo Plano (Indeterminate)</span>
                <span class="text-[#753399] font-mono text-[10px]">Calculando...</span>
              </div>
              <div class="relative h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div class="absolute h-full w-1/3 bg-[#753399] rounded-full animate-[indeterminate_1.5s_infinite_ease-in-out]"></div>
              </div>
            </div>
          </div>
        </div>
      `;
      break;

    case 'skeleton':
      stage.innerHTML = `
        <div class="w-full max-w-md space-y-4 text-left">
          <div class="flex items-center justify-between border-b border-border pb-3">
            <div>
              <h4 class="font-heading text-xs font-bold text-foreground">Simulador de Estado de Carregamento</h4>
              <p class="text-[11px] text-muted-foreground">Alternar entre conteúdo carregado e animação pulse/shimmer.</p>
            </div>
            <button id="toggleSkeletonBtn" onclick="toggleSkeletonDemo()" class="inline-flex items-center gap-1.5 rounded-md bg-[#753399] px-3 py-1.5 text-xs font-semibold text-white shadow hover:bg-[#622981] transition-all">
              <i data-lucide="refresh-cw" class="h-3.5 w-3.5"></i> <span id="skeletonBtnText">Simular Loading</span>
            </button>
          </div>

          <!-- Skeleton Loading Card -->
          <div id="demoSkeletonContainer" class="rounded-xl border border-border bg-card p-5 space-y-4 shadow-sm">
            <!-- Header Skeleton -->
            <div class="flex items-center gap-3">
              <div class="h-10 w-10 rounded-full bg-muted animate-pulse shrink-0"></div>
              <div class="space-y-2 flex-1">
                <div class="h-3.5 w-1/3 rounded bg-muted animate-pulse"></div>
                <div class="h-2.5 w-1/2 rounded bg-muted/70 animate-pulse"></div>
              </div>
            </div>
            <!-- Body Skeleton -->
            <div class="space-y-2 pt-2">
              <div class="h-3 w-full rounded bg-muted animate-pulse"></div>
              <div class="h-3 w-5/6 rounded bg-muted animate-pulse"></div>
              <div class="h-3 w-2/3 rounded bg-muted animate-pulse"></div>
            </div>
            <!-- Footer Skeleton -->
            <div class="flex items-center justify-between pt-2 border-t border-border/50">
              <div class="h-7 w-20 rounded-md bg-muted animate-pulse"></div>
              <div class="h-7 w-28 rounded-md bg-muted animate-pulse"></div>
            </div>
          </div>

          <!-- Real Content Card (Hidden by default in demo) -->
          <div id="demoRealContentContainer" class="hidden rounded-xl border border-border bg-card p-5 space-y-4 shadow-sm">
            <div class="flex items-center gap-3">
              <div class="h-10 w-10 rounded-full bg-[#753399] text-white flex items-center justify-center font-bold text-sm shrink-0">
                FJ
              </div>
              <div class="space-y-0.5">
                <h4 class="font-heading text-xs font-bold text-foreground">Francinilton Júnior</h4>
                <p class="text-[11px] text-muted-foreground">Engenheiro de Software Sênior · Monta UI</p>
              </div>
            </div>
            <p class="text-xs text-muted-foreground leading-relaxed">
              Ambiente de dados sincronizado com sucesso. O módulo financeiro registrou 1.480 transações conciliadas nas últimas 24 horas.
            </p>
            <div class="flex items-center justify-between pt-2 border-t border-border/50">
              <span class="inline-flex items-center rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">Ativo</span>
              <button onclick="showToast('Abrindo perfil...')" class="inline-flex h-7 items-center rounded-md bg-[#753399] px-3 text-xs font-semibold text-white shadow hover:bg-[#622981]">
                Ver Perfil
              </button>
            </div>
          </div>
        </div>
      `;
      break;

    case 'alert':
      stage.innerHTML = `
        <div class="w-full max-w-lg space-y-3.5 text-left">
          <!-- 1. Alerta Informativo Brand -->
          <div id="alert-info" class="relative flex items-start gap-3 rounded-xl border border-[#753399]/40 bg-[#753399]/10 p-4 text-[#753399] dark:text-purple-300 shadow-sm">
            <i data-lucide="info" class="h-5 w-5 shrink-0 mt-0.5 text-[#753399] dark:text-purple-300"></i>
            <div class="flex-1 space-y-1">
              <h5 class="font-heading text-xs font-bold text-foreground">Atualização do Monta UI Disponível</h5>
              <p class="text-xs text-muted-foreground leading-relaxed">A versão 2.4.0 inclui novos componentes 100% nativos sem dependência do Radix.</p>
            </div>
            <button onclick="dismissAlertDemo('alert-info')" class="rounded p-1 text-muted-foreground hover:text-foreground opacity-70 hover:opacity-100">
              <i data-lucide="x" class="h-3.5 w-3.5"></i>
            </button>
          </div>

          <!-- 2. Alerta Sucesso -->
          <div id="alert-success" class="relative flex items-start gap-3 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-emerald-800 dark:text-emerald-300 shadow-sm">
            <i data-lucide="check-circle" class="h-5 w-5 shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400"></i>
            <div class="flex-1 space-y-1">
              <h5 class="font-heading text-xs font-bold text-emerald-800 dark:text-emerald-200">Conciliação Bancária Concluída</h5>
              <p class="text-xs text-emerald-700 dark:text-emerald-300/90 leading-relaxed">Todos os 340 lançamentos do Banco do Brasil e Itaú foram conciliados com sucesso.</p>
            </div>
            <button onclick="dismissAlertDemo('alert-success')" class="rounded p-1 text-emerald-700 dark:text-emerald-300 opacity-70 hover:opacity-100">
              <i data-lucide="x" class="h-3.5 w-3.5"></i>
            </button>
          </div>

          <!-- 3. Alerta Aviso -->
          <div id="alert-warning" class="relative flex items-start gap-3 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 text-amber-800 dark:text-amber-300 shadow-sm">
            <i data-lucide="alert-triangle" class="h-5 w-5 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400"></i>
            <div class="flex-1 space-y-1">
              <h5 class="font-heading text-xs font-bold text-amber-800 dark:text-amber-200">Certificado Digital Prestes a Vencer</h5>
              <p class="text-xs text-amber-700 dark:text-amber-300/90 leading-relaxed">O certificado A1 da Matriz expira em 7 dias. Renove para evitar bloqueio de emissão de NF-e.</p>
            </div>
            <button onclick="dismissAlertDemo('alert-warning')" class="rounded p-1 text-amber-700 dark:text-amber-300 opacity-70 hover:opacity-100">
              <i data-lucide="x" class="h-3.5 w-3.5"></i>
            </button>
          </div>

          <!-- 4. Alerta Destrutivo / Erro -->
          <div id="alert-danger" class="relative flex items-start gap-3 rounded-xl border border-rose-500/40 bg-rose-500/10 p-4 text-rose-800 dark:text-rose-300 shadow-sm">
            <i data-lucide="alert-octagon" class="h-5 w-5 shrink-0 mt-0.5 text-rose-600 dark:text-rose-400"></i>
            <div class="flex-1 space-y-1">
              <h5 class="font-heading text-xs font-bold text-rose-800 dark:text-rose-200">Falha de Autenticação na API SEFAZ</h5>
              <p class="text-xs text-rose-700 dark:text-rose-300/90 leading-relaxed">Tempo limite excedido na consulta de status do serviço do estado de São Paulo.</p>
            </div>
            <button onclick="dismissAlertDemo('alert-danger')" class="rounded p-1 text-rose-700 dark:text-rose-300 opacity-70 hover:opacity-100">
              <i data-lucide="x" class="h-3.5 w-3.5"></i>
            </button>
          </div>

          <div class="text-center pt-1">
            <button onclick="restoreAlertsDemo()" class="text-xs font-semibold text-[#753399] hover:underline">
              Restaurar todos os alertas fechados
            </button>
          </div>
        </div>
      `;
      break;

    case 'navbar':
      stage.innerHTML = `
        <div class="w-full max-w-2xl mx-auto space-y-4 text-left">
          <!-- Navbar Preview Header Component -->
          <div class="rounded-xl border border-border bg-card shadow-lg overflow-hidden">
            <header class="h-14 border-b border-border bg-card/90 backdrop-blur px-4 flex items-center justify-between gap-4">
              <!-- Left: Brand & Links -->
              <div class="flex items-center gap-6">
                <div class="flex items-center gap-2 cursor-pointer" onclick="showToast('Logo Monta UI clicado')">
                  <div class="h-7 w-7 rounded-lg bg-[#753399] flex items-center justify-center text-white shadow-sm font-black text-xs">
                    M
                  </div>
                  <span class="font-heading text-sm font-bold text-foreground tracking-tight">Monta<span class="text-[#753399]">UI</span></span>
                  <span class="rounded-full bg-[#753399]/15 px-1.5 py-0.2 text-[9px] font-bold text-[#753399] dark:text-purple-300">PRO</span>
                </div>

                <!-- Nav Links Desktop -->
                <nav class="hidden md:flex items-center gap-1 text-xs font-medium">
                  <button onclick="selectNavbarLinkDemo(this, 'Dashboard')" class="navbar-demo-link rounded-md bg-[#753399]/10 px-2.5 py-1 font-bold text-[#753399] dark:text-purple-300 transition-colors">
                    Dashboard
                  </button>
                  <button onclick="selectNavbarLinkDemo(this, 'Clientes')" class="navbar-demo-link rounded-md px-2.5 py-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                    Clientes
                  </button>
                  <button onclick="selectNavbarLinkDemo(this, 'Faturamento')" class="navbar-demo-link rounded-md px-2.5 py-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                    Faturamento
                  </button>
                  <button onclick="selectNavbarLinkDemo(this, 'Relatórios')" class="navbar-demo-link rounded-md px-2.5 py-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                    Relatórios
                  </button>
                </nav>
              </div>

              <!-- Right: Search, Notifications & User -->
              <div class="flex items-center gap-2">
                <!-- Search Input Quick Trigger -->
                <div class="hidden sm:flex items-center gap-1.5 rounded-lg border border-border bg-muted/50 px-2.5 py-1 text-xs text-muted-foreground cursor-pointer hover:border-input transition-colors" onclick="openSearchModal()">
                  <i data-lucide="search" class="h-3.5 w-3.5"></i>
                  <span>Buscar no sistema...</span>
                  <kbd class="ml-2 rounded border border-border bg-background px-1 py-0.2 text-[9px] font-mono">⌘K</kbd>
                </div>

                <!-- Notification Bell -->
                <button onclick="showToast('3 novas notificações não lidas')" class="relative rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                  <i data-lucide="bell" class="h-4 w-4"></i>
                  <span class="absolute top-1 right-1 h-2 w-2 rounded-full bg-[#753399] animate-pulse"></span>
                </button>

                <!-- User Profile Dropdown Trigger -->
                <div class="flex items-center gap-2 pl-2 border-l border-border cursor-pointer group" onclick="showToast('Perfil: Monta UI')">
                  <div class="h-7 w-7 rounded-full bg-[#753399] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                    MU
                  </div>
                  <div class="hidden lg:block text-left">
                    <p class="text-xs font-semibold text-foreground leading-none">Monta UI</p>
                    <p class="text-[10px] text-muted-foreground leading-none mt-0.5">admin@montaui.com.br</p>
                  </div>
                  <i data-lucide="chevron-down" class="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition-colors"></i>
                </div>
              </div>
            </header>

            <!-- Mock Page Body under Navbar -->
            <div class="p-6 bg-muted/20 space-y-3">
              <div class="flex items-center justify-between">
                <div>
                  <h5 class="font-heading text-xs font-bold text-foreground">Visão Geral da Operação</h5>
                  <p class="text-[11px] text-muted-foreground">Área de trabalho conectada com a Navbar corporativa.</p>
                </div>
                <span class="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                  <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> Online
                </span>
              </div>
            </div>
          </div>
        </div>
      `;
      break;

    case 'sidebar':
      stage.innerHTML = `
        <div class="w-full max-w-2xl mx-auto space-y-3 text-left">
          <div class="flex items-center justify-between border-b border-border pb-2">
            <div>
              <h4 class="font-heading text-xs font-bold text-foreground">Collapsible Enterprise Sidebar</h4>
              <p class="text-[11px] text-muted-foreground">Alternar entre modo expandido (250px) e recolhido icon-only (68px).</p>
            </div>
            <button id="sidebarToggleDemoBtn" onclick="toggleSidebarCollapseDemo()" class="inline-flex items-center gap-1.5 rounded-md bg-[#753399] px-3 py-1.5 text-xs font-semibold text-white shadow hover:bg-[#622981] transition-all">
              <i data-lucide="panel-left-close" class="h-3.5 w-3.5"></i> <span id="sidebarToggleBtnText">Recolher Sidebar</span>
            </button>
          </div>

          <!-- Demo Workspace Container with Sidebar -->
          <div class="flex h-[420px] rounded-xl border border-border bg-card shadow-lg overflow-hidden">
            <!-- Collapsible Aside -->
            <aside id="demoCollapsibleSidebar" class="w-60 border-r border-border bg-card flex flex-col justify-between transition-all duration-300 select-none">
              <!-- Sidebar Header -->
              <div class="p-3.5 border-b border-border space-y-2">
                <div class="flex items-center gap-2.5">
                  <div class="h-8 w-8 rounded-lg bg-[#753399] flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-sm">
                    M
                  </div>
                  <div id="sidebarBrandTexts" class="space-y-0.5 overflow-hidden transition-all duration-200">
                    <h5 class="font-heading text-xs font-bold text-foreground leading-tight truncate">Monta Tech S/A</h5>
                    <p class="text-[10px] text-muted-foreground truncate">Workspace Financeiro</p>
                  </div>
                </div>
              </div>

              <!-- Sidebar Navigation Links List -->
              <div class="flex-1 overflow-y-auto p-2 space-y-4">
                <!-- Group 1: Core -->
                <div class="space-y-1">
                  <p id="sidebarGroupLabel1" class="px-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">Plataforma</p>
                  
                  <button onclick="selectSidebarItemDemo(this, 'Dashboard Geral')" class="sidebar-item-btn w-full flex items-center justify-between rounded-lg bg-[#753399]/15 px-2.5 py-2 text-xs font-bold text-[#753399] dark:text-purple-300 transition-colors">
                    <div class="flex items-center gap-2.5 min-w-0">
                      <i data-lucide="layout-dashboard" class="h-4 w-4 shrink-0"></i>
                      <span class="sidebar-item-label truncate">Dashboard Geral</span>
                    </div>
                  </button>

                  <button onclick="selectSidebarItemDemo(this, 'Vendas & NF-e')" class="sidebar-item-btn w-full flex items-center justify-between rounded-lg px-2.5 py-2 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                    <div class="flex items-center gap-2.5 min-w-0">
                      <i data-lucide="shopping-cart" class="h-4 w-4 shrink-0"></i>
                      <span class="sidebar-item-label truncate">Vendas & NF-e</span>
                    </div>
                    <span class="sidebar-item-badge rounded bg-emerald-500/15 px-1.5 py-0.2 text-[9px] font-bold text-emerald-600 dark:text-emerald-400">Novo</span>
                  </button>

                  <button onclick="selectSidebarItemDemo(this, 'Base de Clientes')" class="sidebar-item-btn w-full flex items-center justify-between rounded-lg px-2.5 py-2 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                    <div class="flex items-center gap-2.5 min-w-0">
                      <i data-lucide="users" class="h-4 w-4 shrink-0"></i>
                      <span class="sidebar-item-label truncate">Base de Clientes</span>
                    </div>
                  </button>
                </div>

                <!-- Group 2: Gestão -->
                <div class="space-y-1">
                  <p id="sidebarGroupLabel2" class="px-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">Gestão & Finanças</p>
                  
                  <button onclick="selectSidebarItemDemo(this, 'Contas a Pagar')" class="sidebar-item-btn w-full flex items-center justify-between rounded-lg px-2.5 py-2 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                    <div class="flex items-center gap-2.5 min-w-0">
                      <i data-lucide="credit-card" class="h-4 w-4 shrink-0"></i>
                      <span class="sidebar-item-label truncate">Contas a Pagar</span>
                    </div>
                  </button>

                  <button onclick="selectSidebarItemDemo(this, 'Relatórios DRE')" class="sidebar-item-btn w-full flex items-center justify-between rounded-lg px-2.5 py-2 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                    <div class="flex items-center gap-2.5 min-w-0">
                      <i data-lucide="bar-chart-2" class="h-4 w-4 shrink-0"></i>
                      <span class="sidebar-item-label truncate">Relatórios DRE</span>
                    </div>
                  </button>
                </div>
              </div>

              <!-- Sidebar Footer: Profile Card -->
              <div class="p-2.5 border-t border-border">
                <div class="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-muted cursor-pointer transition-colors" onclick="showToast('Usuário: Monta UI (Administrador)')">
                  <div class="h-8 w-8 rounded-full bg-[#753399] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow">
                    MU
                  </div>
                  <div id="sidebarUserTexts" class="space-y-0.5 overflow-hidden transition-all duration-200 flex-1">
                    <p class="text-xs font-bold text-foreground leading-none truncate">Monta UI</p>
                    <p class="text-[10px] text-muted-foreground leading-none truncate mt-0.5">admin@montaui.com.br</p>
                  </div>
                  <i data-lucide="log-out" id="sidebarLogoutIcon" class="h-3.5 w-3.5 text-muted-foreground hover:text-rose-500 transition-colors shrink-0"></i>
                </div>
              </div>
            </aside>

            <!-- Main Content Stage on the Right -->
            <main class="flex-1 bg-muted/20 p-6 flex flex-col justify-between">
              <div class="space-y-3">
                <div class="flex items-center justify-between border-b border-border pb-3">
                  <div>
                    <h4 id="sidebarActivePageTitle" class="font-heading text-sm font-bold text-foreground">Dashboard Geral</h4>
                    <p class="text-xs text-muted-foreground">Módulo administrativo renderizado ao lado da Sidebar.</p>
                  </div>
                  <button onclick="showToast('Exportando dados do painel...')" class="inline-flex h-8 items-center gap-1.5 rounded-md bg-[#753399] px-3 text-xs font-semibold text-white shadow hover:bg-[#622981]">
                    <i data-lucide="download" class="h-3 w-3"></i> Exportar
                  </button>
                </div>

                <!-- KPI Mini Cards -->
                <div class="grid grid-cols-2 gap-3">
                  <div class="rounded-xl border border-border bg-card p-3 space-y-1 shadow-sm">
                    <span class="text-[10px] font-bold text-muted-foreground uppercase">Faturamento Mês</span>
                    <p class="text-base font-bold text-foreground">R$ 482.900</p>
                    <span class="text-[10px] font-bold text-emerald-500">+14.2% YoY</span>
                  </div>
                  <div class="rounded-xl border border-border bg-card p-3 space-y-1 shadow-sm">
                    <span class="text-[10px] font-bold text-muted-foreground uppercase">Notas Emitidas</span>
                    <p class="text-base font-bold text-foreground">1.420 NF-e</p>
                    <span class="text-[10px] font-bold text-[#753399]">100% Sincronizado</span>
                  </div>
                </div>
              </div>

              <p class="text-[11px] text-muted-foreground text-center">Clique nos itens da Sidebar à esquerda ou use o botão de recolher para testar a responsividade.</p>
            </main>
          </div>
        </div>
      `;
      break;

    case 'field':
      stage.innerHTML = `
        <div class="w-full max-w-md mx-auto space-y-5 text-left">
          <div class="flex items-center justify-between border-b border-border pb-2">
            <div>
              <h4 class="font-heading text-xs font-bold text-foreground">Estrutura de Campo (Field)</h4>
              <p class="text-[11px] text-muted-foreground">Rótulo, indicador obrigatório, dica contextual e validação.</p>
            </div>
            <button onclick="toggleFieldErrorDemo()" class="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted transition-colors">
              <i data-lucide="alert-circle" class="h-3.5 w-3.5 text-rose-500"></i> Alternar Erro
            </button>
          </div>

          <!-- Field 1: Standard with hint -->
          <div class="space-y-1.5">
            <div class="flex items-center justify-between">
              <label for="demoFieldRazao" class="text-xs font-bold text-foreground flex items-center gap-1">
                Razão Social <span class="text-rose-500 font-bold">*</span>
              </label>
              <span class="text-[10px] text-muted-foreground">Obrigatório</span>
            </div>
            <input
              id="demoFieldRazao"
              type="text"
              placeholder="Ex: Monta Soluções Tecnológicas Ltda"
              value="Monta Tech S/A"
              class="flex h-9 w-full rounded-md border border-input bg-background px-3 text-xs shadow-sm focus:border-[#753399] focus:outline-none focus:ring-1 focus:ring-[#753399]"
            />
            <p class="text-[11px] text-muted-foreground">Nome empresarial oficial registrado no cartão do CNPJ.</p>
          </div>

          <!-- Field 2: Error state demo -->
          <div class="space-y-1.5" id="demoFieldErrorContainer">
            <div class="flex items-center justify-between">
              <label for="demoFieldCnpj" class="text-xs font-bold text-foreground flex items-center gap-1">
                CNPJ da Matriz <span class="text-rose-500 font-bold">*</span>
              </label>
              <span class="text-[10px] text-rose-500 font-medium" id="demoFieldStatusLabel">Inválido</span>
            </div>
            <input
              id="demoFieldCnpj"
              type="text"
              placeholder="00.000.000/0000-00"
              value="12.345.678/0001-9"
              class="flex h-9 w-full rounded-md border border-rose-500 bg-rose-500/5 px-3 text-xs text-rose-900 dark:text-rose-200 shadow-sm focus:outline-none focus:ring-1 focus:ring-rose-500 transition-colors"
            />
            <p id="demoFieldErrorText" class="text-[11px] font-medium text-rose-600 dark:text-rose-400 flex items-center gap-1">
              <i data-lucide="alert-circle" class="h-3 w-3"></i> O CNPJ informado contém dígito verificador incorreto.
            </p>
          </div>

          <!-- Field 3: Textarea with Counter -->
          <div class="space-y-1.5">
            <div class="flex items-center justify-between">
              <label for="demoFieldObs" class="text-xs font-bold text-foreground">
                Observações de Faturamento
              </label>
              <span class="text-[10px] text-muted-foreground font-mono" id="demoFieldCharCounter">35 / 200</span>
            </div>
            <textarea
              id="demoFieldObs"
              rows="3"
              oninput="updateFieldCharCounter(this)"
              maxlength="200"
              placeholder="Instruções para cobrança e nota fiscal..."
              class="flex w-full rounded-md border border-input bg-background p-3 text-xs shadow-sm focus:border-[#753399] focus:outline-none focus:ring-1 focus:ring-[#753399]"
            >Faturar com vencimento em 30 dias.</textarea>
          </div>
        </div>
      `;
      break;

    case 'form':
      stage.innerHTML = `
        <div class="w-full max-w-lg mx-auto space-y-4 text-left">
          <form onsubmit="handleFormSubmitDemo(event)" class="rounded-xl border border-border bg-card shadow-lg p-5 space-y-5">
            <!-- Form Header -->
            <div class="border-b border-border pb-3 flex items-center justify-between">
              <div>
                <h4 class="font-heading text-sm font-bold text-foreground">Cadastro de Empresa Fornecedora</h4>
                <p class="text-xs text-muted-foreground">Preencha os dados cadastrais para emissão de pedidos.</p>
              </div>
              <span class="rounded-full bg-[#753399]/15 px-2.5 py-0.5 text-[10px] font-bold text-[#753399] dark:text-purple-300">
                Formulário Seguro
              </span>
            </div>

            <!-- Form Section 1: Dados Gerais -->
            <div class="space-y-3">
              <h5 class="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">1. Identificação Fiscal</h5>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div class="space-y-1">
                  <label class="text-xs font-semibold text-foreground">Razão Social *</label>
                  <input required id="formRazao" type="text" placeholder="Nome empresarial" value="Alpha Logística Ltda" class="flex h-9 w-full rounded-md border border-input bg-background px-3 text-xs shadow-sm focus:border-[#753399] focus:outline-none focus:ring-1 focus:ring-[#753399]" />
                </div>
                <div class="space-y-1">
                  <label class="text-xs font-semibold text-foreground">CNPJ *</label>
                  <input required id="formCnpj" type="text" placeholder="00.000.000/0000-00" value="84.920.184/0001-45" class="flex h-9 w-full rounded-md border border-input bg-background px-3 text-xs font-mono shadow-sm focus:border-[#753399] focus:outline-none focus:ring-1 focus:ring-[#753399]" />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div class="space-y-1">
                  <label class="text-xs font-semibold text-foreground">E-mail Financeiro *</label>
                  <input required id="formEmail" type="email" placeholder="financeiro@empresa.com" value="nfe@alphalog.com.br" class="flex h-9 w-full rounded-md border border-input bg-background px-3 text-xs shadow-sm focus:border-[#753399] focus:outline-none focus:ring-1 focus:ring-[#753399]" />
                </div>
                <div class="space-y-1">
                  <label class="text-xs font-semibold text-foreground">Telefone Contato</label>
                  <input id="formTel" type="tel" placeholder="(11) 99999-9999" value="(11) 4002-8922" class="flex h-9 w-full rounded-md border border-input bg-background px-3 text-xs shadow-sm focus:border-[#753399] focus:outline-none focus:ring-1 focus:ring-[#753399]" />
                </div>
              </div>
            </div>

            <!-- Form Divider -->
            <div class="border-t border-border pt-3 space-y-3">
              <h5 class="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">2. Regime Tributário</h5>
              <div class="flex items-center gap-4">
                <label class="flex items-center gap-2 text-xs font-medium cursor-pointer">
                  <input type="radio" name="formRegime" checked class="accent-[#753399]" /> Lucro Presumido
                </label>
                <label class="flex items-center gap-2 text-xs font-medium cursor-pointer">
                  <input type="radio" name="formRegime" class="accent-[#753399]" /> Simples Nacional
                </label>
                <label class="flex items-center gap-2 text-xs font-medium cursor-pointer">
                  <input type="radio" name="formRegime" class="accent-[#753399]" /> Lucro Real
                </label>
              </div>
            </div>

            <!-- Form Actions -->
            <div class="border-t border-border pt-4 flex items-center justify-between gap-3">
              <button type="button" onclick="resetFormDemo()" class="rounded-md border border-border px-4 py-2 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                Limpar Campos
              </button>
              <div class="flex items-center gap-2">
                <button type="submit" id="formSubmitBtn" class="inline-flex items-center gap-2 rounded-md bg-[#753399] px-4 py-2 text-xs font-semibold text-white shadow hover:bg-[#622981] active:scale-95 transition-all">
                  <i data-lucide="check" class="h-4 w-4"></i> Salvar Cadastro
                </button>
              </div>
            </div>
          </form>
        </div>
      `;
      break;

    case 'marker':
      stage.innerHTML = `
        <div class="w-full max-w-lg mx-auto space-y-4 text-left">
          <div class="flex items-center justify-between border-b border-border pb-2">
            <div>
              <h4 class="font-heading text-xs font-bold text-foreground">Interactive Markers & Hotspots</h4>
              <p class="text-[11px] text-muted-foreground">Pontos de interesse interativos com radar pulsante e tooltips.</p>
            </div>
            <span class="text-[11px] font-mono font-bold text-[#753399]">3 Marcadores Ativos</span>
          </div>

          <!-- Simulated Map / Floor Plan Stage -->
          <div class="relative h-64 w-full rounded-2xl border border-border bg-gradient-to-br from-muted/30 to-muted/80 overflow-hidden shadow-inner flex items-center justify-center">
            <!-- Background Map Grid Pattern -->
            <div class="absolute inset-0 bg-[radial-gradient(#753399_1px,transparent_1px)] [background-size:16px_16px] opacity-15"></div>

            <!-- Marker 1: Matriz SP -->
            <div class="absolute top-12 left-16 group cursor-pointer" onclick="showToast('Marcador #1: Matriz São Paulo (Operação 100%)')">
              <div class="relative flex items-center justify-center">
                <span class="absolute h-8 w-8 rounded-full bg-[#753399]/30 animate-ping"></span>
                <div class="relative h-7 w-7 rounded-full bg-[#753399] text-white flex items-center justify-center font-bold text-xs shadow-lg border-2 border-background hover:scale-110 transition-transform">
                  1
                </div>
              </div>
              <div class="absolute top-8 left-1/2 -translate-x-1/2 mt-1 hidden group-hover:flex flex-col items-center z-20">
                <div class="rounded-lg border border-border bg-card px-3 py-1.5 shadow-xl text-center whitespace-nowrap">
                  <p class="text-xs font-bold text-foreground">Matriz São Paulo</p>
                  <p class="text-[10px] text-emerald-500 font-semibold">● Operação Normal</p>
                </div>
              </div>
            </div>

            <!-- Marker 2: CD Rio -->
            <div class="absolute bottom-16 left-1/2 -translate-x-1/2 group cursor-pointer" onclick="showToast('Marcador #2: CD Logístico Rio (Em trânsito)')">
              <div class="relative flex items-center justify-center">
                <span class="absolute h-8 w-8 rounded-full bg-emerald-500/30 animate-ping"></span>
                <div class="relative h-7 w-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-lg border-2 border-background hover:scale-110 transition-transform">
                  2
                </div>
              </div>
              <div class="absolute top-8 left-1/2 -translate-x-1/2 mt-1 hidden group-hover:flex flex-col items-center z-20">
                <div class="rounded-lg border border-border bg-card px-3 py-1.5 shadow-xl text-center whitespace-nowrap">
                  <p class="text-xs font-bold text-foreground">CD Logístico Rio</p>
                  <p class="text-[10px] text-emerald-500 font-semibold">● 142 Entregas Hoje</p>
                </div>
              </div>
            </div>

            <!-- Marker 3: Filial BH -->
            <div class="absolute top-16 right-16 group cursor-pointer" onclick="showToast('Marcador #3: Filial Minas Gerais (Aguardando Vistoria)')">
              <div class="relative flex items-center justify-center">
                <span class="absolute h-8 w-8 rounded-full bg-amber-500/30 animate-ping"></span>
                <div class="relative h-7 w-7 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs shadow-lg border-2 border-background hover:scale-110 transition-transform">
                  3
                </div>
              </div>
              <div class="absolute top-8 left-1/2 -translate-x-1/2 mt-1 hidden group-hover:flex flex-col items-center z-20">
                <div class="rounded-lg border border-border bg-card px-3 py-1.5 shadow-xl text-center whitespace-nowrap">
                  <p class="text-xs font-bold text-foreground">Filial Belo Horizonte</p>
                  <p class="text-[10px] text-amber-500 font-semibold">▲ Manutenção Preventiva</p>
                </div>
              </div>
            </div>
          </div>

          <p class="text-xs text-muted-foreground text-center">Passe o mouse sobre os marcadores para abrir o card de detalhes ou clique para disparar o evento.</p>
        </div>
      `;
      break;

    case 'pagination':
      stage.innerHTML = `
        <div class="w-full max-w-xl mx-auto space-y-4 text-left">
          <div class="flex items-center justify-between border-b border-border pb-2">
            <div>
              <h4 class="font-heading text-xs font-bold text-foreground">Paginação de Registros</h4>
              <p class="text-[11px] text-muted-foreground">Navegação multi-páginas com reticências e seletor de limite.</p>
            </div>
            <span id="demoPaginationInfoText" class="text-xs font-mono text-muted-foreground font-semibold">Página 3 de 18</span>
          </div>

          <!-- Pagination Bar Component -->
          <div class="rounded-xl border border-border bg-card p-4 shadow-sm space-y-4">
            <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
              <!-- Info left -->
              <p id="demoPaginationRangeText" class="text-xs text-muted-foreground">
                Mostrando <span class="font-bold text-foreground">21 a 30</span> de <span class="font-bold text-foreground">180</span> registros
              </p>

              <!-- Controls Right -->
              <nav class="flex items-center gap-1" aria-label="Paginação">
                <button id="demoPagPrevBtn" onclick="changePaginationDemoPage(-1)" class="inline-flex h-8 items-center gap-1 rounded-md border border-border px-2.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-40 transition-colors">
                  <i data-lucide="chevron-left" class="h-3.5 w-3.5"></i>
                  <span class="hidden sm:inline">Anterior</span>
                </button>

                <div class="flex items-center gap-1">
                  <button onclick="setPaginationDemoPage(1)" class="demo-pag-btn h-8 w-8 rounded-md border border-border text-xs font-medium hover:bg-muted transition-colors">1</button>
                  <button onclick="setPaginationDemoPage(2)" class="demo-pag-btn h-8 w-8 rounded-md border border-border text-xs font-medium hover:bg-muted transition-colors">2</button>
                  <button onclick="setPaginationDemoPage(3)" class="demo-pag-btn h-8 w-8 rounded-md bg-[#753399] text-xs font-bold text-white shadow-sm">3</button>
                  <button onclick="setPaginationDemoPage(4)" class="demo-pag-btn h-8 w-8 rounded-md border border-border text-xs font-medium hover:bg-muted transition-colors">4</button>
                  <span class="px-1 text-xs text-muted-foreground">...</span>
                  <button onclick="setPaginationDemoPage(18)" class="demo-pag-btn h-8 w-8 rounded-md border border-border text-xs font-medium hover:bg-muted transition-colors">18</button>
                </div>

                <button id="demoPagNextBtn" onclick="changePaginationDemoPage(1)" class="inline-flex h-8 items-center gap-1 rounded-md border border-border px-2.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                  <span class="hidden sm:inline">Próximo</span>
                  <i data-lucide="chevron-right" class="h-3.5 w-3.5"></i>
                </button>
              </nav>
            </div>
          </div>
        </div>
      `;
      break;

    case 'loading':
      stage.innerHTML = `
        <div class="w-full max-w-xl mx-auto space-y-6 text-left">
          <!-- 1. Variantes de Spinners e Animações -->
          <div class="rounded-xl border border-border bg-card p-5 shadow-sm space-y-4">
            <h4 class="font-heading text-xs font-bold text-foreground">Variantes de Indicadores de Carregamento</h4>
            
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <!-- Circular Spinner -->
              <div class="rounded-xl border border-border/60 bg-muted/20 p-4 flex flex-col items-center justify-center gap-2">
                <svg class="h-6 w-6 animate-spin text-[#753399]" viewBox="0 0 24 24" fill="none">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3.5"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                <span class="text-[11px] font-semibold text-foreground">Circular Spinner</span>
              </div>

              <!-- Pulse Radar -->
              <div class="rounded-xl border border-border/60 bg-muted/20 p-4 flex flex-col items-center justify-center gap-2">
                <div class="relative flex h-6 w-6 items-center justify-center">
                  <span class="absolute h-full w-full animate-ping rounded-full bg-[#753399]/40"></span>
                  <span class="relative h-3 w-3 rounded-full bg-[#753399]"></span>
                </div>
                <span class="text-[11px] font-semibold text-foreground">Radar Pulse</span>
              </div>

              <!-- Wave Dots -->
              <div class="rounded-xl border border-border/60 bg-muted/20 p-4 flex flex-col items-center justify-center gap-2">
                <div class="flex items-center gap-1.5 h-6">
                  <span class="h-2 w-2 rounded-full bg-[#753399] animate-bounce [animation-delay:-0.3s]"></span>
                  <span class="h-2 w-2 rounded-full bg-[#753399] animate-bounce [animation-delay:-0.15s]"></span>
                  <span class="h-2 w-2 rounded-full bg-[#753399] animate-bounce"></span>
                </div>
                <span class="text-[11px] font-semibold text-foreground">Wave Dots</span>
              </div>

              <!-- Equalizer Bars -->
              <div class="rounded-xl border border-border/60 bg-muted/20 p-4 flex flex-col items-center justify-center gap-2">
                <div class="flex items-end gap-1 h-6">
                  <span class="w-1 bg-[#753399] rounded-full animate-pulse h-3"></span>
                  <span class="w-1 bg-[#753399] rounded-full animate-pulse h-6 [animation-delay:0.2s]"></span>
                  <span class="w-1 bg-[#753399] rounded-full animate-pulse h-4 [animation-delay:0.4s]"></span>
                  <span class="w-1 bg-[#753399] rounded-full animate-pulse h-5 [animation-delay:0.1s]"></span>
                </div>
                <span class="text-[11px] font-semibold text-foreground">Equalizer Bars</span>
              </div>
            </div>
          </div>

          <!-- 2. Overlay Assíncrono com Simulação Interativa -->
          <div class="rounded-xl border border-border bg-card p-5 shadow-sm space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h4 class="font-heading text-xs font-bold text-foreground">Simulação de Loading em Painel</h4>
                <p class="text-[11px] text-muted-foreground">Bloqueio de interface assíncrono com mensagem contextual.</p>
              </div>
              <button onclick="triggerAsyncLoadingDemo()" class="inline-flex items-center gap-2 rounded-md bg-[#753399] px-3.5 py-1.5 text-xs font-semibold text-white shadow hover:bg-[#622981] active:scale-95 transition-all">
                <i data-lucide="play" class="h-3.5 w-3.5"></i> Simular Carregamento
              </button>
            </div>

            <!-- Card Stage with Overlay -->
            <div class="relative rounded-xl border border-border bg-muted/10 p-5 space-y-3 overflow-hidden min-h-[140px] flex flex-col justify-center">
              <!-- Content below -->
              <div class="flex items-center justify-between">
                <div class="space-y-0.5">
                  <h5 class="text-xs font-bold text-foreground">Relatório Financeiro Consolidado</h5>
                  <p class="text-[11px] text-muted-foreground">Última atualização: Hoje às 11:42</p>
                </div>
                <span class="font-mono text-xs font-bold text-emerald-500">R$ 1.840.290,00</span>
              </div>
              <p class="text-xs text-muted-foreground leading-relaxed">
                Dados consolidados de faturamento, conciliação de recebíveis via Pix e cartões de crédito.
              </p>

              <!-- Loading Overlay Element (Hidden by default) -->
              <div id="demoLoadingOverlay" class="hidden absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 bg-card/85 backdrop-blur-sm animate-in fade-in-0 duration-150">
                <svg class="h-8 w-8 animate-spin text-[#753399]" viewBox="0 0 24 24" fill="none">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                <div class="text-center space-y-0.5">
                  <p class="text-xs font-bold text-foreground">Sincronizando dados...</p>
                  <p class="text-[10px] text-muted-foreground">Consultando base de registros da SEFAZ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      break;

    default:
      stage.innerHTML = `
        <div class="rounded-xl border border-border bg-card p-8 text-center space-y-3 max-w-md mx-auto">
          <div class="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand mx-auto">
            <i data-lucide="layers" class="h-6 w-6"></i>
          </div>
          <h3 class="font-heading text-base font-bold text-foreground">${formatTitle(name)}</h3>
          <p class="text-xs text-muted-foreground">Componente corporativo estilizado com Tailwind CSS e acessibilidade nativa.</p>
          <button onclick="showToast('Interação com ${formatTitle(name)}')" class="inline-flex h-8 items-center gap-1.5 rounded-md bg-brand px-3 text-xs font-semibold text-white shadow hover:bg-brand-hover">
            Testar Componente
          </button>
        </div>
      `;
      break;
  }

  if (window.lucide) window.lucide.createIcons();
}

// Helpers de Menus e Navegação
function toggleDropdownDemo() {
  const el = document.getElementById('demoDropdownMenu');
  el?.classList.toggle('hidden');
}

function handleContextMenuDemo(e) {
  e.preventDefault();
  const el = document.getElementById('demoContextMenu');
  if (el) {
    el.classList.remove('hidden');
    showToast('Menu contextual acionado via botão direito');
  }
}

function toggleContextMenuDirect() {
  const el = document.getElementById('demoContextMenu');
  el?.classList.toggle('hidden');
}

function hideContextMenuDemo() {
  document.getElementById('demoContextMenu')?.classList.add('hidden');
}

function toggleMenubarMenu(menuId) {
  const target = document.getElementById(`menubar-menu-${menuId}`);
  const wasHidden = target?.classList.contains('hidden');
  closeAllMenubars();
  if (wasHidden && target) {
    target.classList.remove('hidden');
  }
}

function closeAllMenubars() {
  document.querySelectorAll('.menubar-dropdown').forEach(m => m.classList.add('hidden'));
}

function toggleNavMegaMenu(navId) {
  const target = document.getElementById(`nav-mega-${navId}`);
  const wasHidden = target?.classList.contains('hidden');
  closeAllNavMenus();
  if (wasHidden && target) {
    target.classList.remove('hidden');
  }
}

function closeAllNavMenus() {
  document.querySelectorAll('.nav-mega-dropdown').forEach(m => m.classList.add('hidden'));
}

// Helpers de Interação no Preview
function toggleGroupItem(btn) {
  const parent = btn.parentElement;
  parent.querySelectorAll('.group-btn').forEach(b => {
    b.className = 'group-btn rounded-md px-4 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-all';
  });
  btn.className = 'group-btn rounded-md bg-brand px-4 py-1.5 text-xs font-bold text-white transition-all';
  showToast(`Período alterado para: ${btn.textContent}`);
}

function clearDemoInput() {
  const el = document.getElementById('demoInputClear');
  if (el) {
    el.value = '';
    el.focus();
    showToast('Campo limpo!');
  }
}

function togglePassVisibility() {
  const inp = document.getElementById('demoPassInput');
  const icon = document.getElementById('demoPassIcon');
  if (inp && icon) {
    const isPass = inp.type === 'password';
    inp.type = isPass ? 'text' : 'password';
    icon.setAttribute('data-lucide', isPass ? 'eye-off' : 'eye');
    if (window.lucide) window.lucide.createIcons();
  }
}

function openDemoModal() {
  document.getElementById('demoModal')?.classList.remove('hidden');
}

function closeDemoModal() {
  document.getElementById('demoModal')?.classList.add('hidden');
}

function toggleAccordionItem(btn) {
  const content = btn.nextElementSibling;
  const icon = btn.querySelector('[data-lucide="chevron-down"]');
  if (content.classList.contains('hidden')) {
    content.classList.remove('hidden');
    if (icon) icon.style.transform = 'rotate(180deg)';
  } else {
    content.classList.add('hidden');
    if (icon) icon.style.transform = 'rotate(0deg)';
  }
}

function switchTabPane(paneId, btn) {
  document.querySelectorAll('.tab-btn').forEach(b => {
    b.className = 'tab-btn inline-flex flex-1 items-center justify-center rounded-md px-3.5 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground';
  });
  btn.className = 'tab-btn inline-flex flex-1 items-center justify-center rounded-md bg-background px-3.5 py-1.5 text-xs font-bold text-brand shadow-sm';

  document.querySelectorAll('.tab-pane').forEach(p => p.classList.add('hidden'));
  document.getElementById(`pane-${paneId}`)?.classList.remove('hidden');
}

function toggleSwitch(btn) {
  const circle = btn.querySelector('span');
  const isChecked = btn.classList.contains('bg-brand');
  if (isChecked) {
    btn.classList.remove('bg-brand');
    btn.classList.add('bg-muted');
    circle.classList.remove('translate-x-5');
    circle.classList.add('translate-x-0');
    showToast('Notificações desativadas.');
  } else {
    btn.classList.remove('bg-muted');
    btn.classList.add('bg-brand');
    circle.classList.remove('translate-x-0');
    circle.classList.add('translate-x-5');
    showToast('Notificações ativadas!');
  }
}

function updateProg(delta) {
  const bar = document.getElementById('demoProgBar');
  const val = document.getElementById('demoProgVal');
  if (!bar || !val) return;
  let current = parseInt(val.textContent) || 50;
  current = Math.min(100, Math.max(0, current + delta));
  val.textContent = `${current}%`;
  bar.style.width = `${current}%`;
}

// ==================== HELPERS DE FORMULÁRIOS ====================
// 1. Radio Group Demo
function selectRadioDemo(plan) {
  const cards = document.querySelectorAll('.radio-demo-card');
  cards.forEach(c => {
    c.className = 'radio-demo-card relative flex cursor-pointer items-start gap-4 rounded-xl border border-border bg-card p-4 shadow-sm hover:border-brand/40 transition-all';
    const circle = c.querySelector('.rounded-full');
    if (circle) {
      circle.className = 'mt-0.5 h-4 w-4 shrink-0 rounded-full border border-input bg-background flex items-center justify-center';
      circle.innerHTML = '';
    }
  });

  const selected = document.getElementById(`radio-card-${plan}`);
  if (selected) {
    selected.className = 'radio-demo-card relative flex cursor-pointer items-start gap-4 rounded-xl border-2 border-brand bg-brand/5 dark:bg-brand/10 p-4 shadow-sm transition-all';
    const circle = selected.querySelector('.rounded-full');
    if (circle) {
      circle.className = 'mt-0.5 h-4 w-4 shrink-0 rounded-full border border-brand bg-brand flex items-center justify-center';
      circle.innerHTML = '<div class="h-1.5 w-1.5 rounded-full bg-white animate-in zoom-in-50 duration-150"></div>';
    }
  }
  showToast(`Plano ${plan.toUpperCase()} selecionado com sucesso!`);
}

// 2. Slider Demo
function updateSliderDemo(val) {
  const num = Number(val);
  const percent = (num / 100000) * 100;
  
  const badge = document.getElementById('sliderBadgeValue');
  const bar = document.getElementById('sliderFillBar');
  const thumb = document.getElementById('sliderThumbDot');
  const interest = document.getElementById('sliderInterestEst');

  if (badge) badge.textContent = `R$ ${num.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
  if (bar) bar.style.width = `${percent}%`;
  if (thumb) thumb.style.left = `${percent}%`;
  if (interest) {
    const est = (num * 0.012).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    interest.textContent = `R$ ${est} / mês`;
  }
}

// 3. Date Picker Demo
let demoSelectedDate = new Date(2026, 7, 31);
let demoViewingMonth = 7;
let demoViewingYear = 2026;

function toggleDatePickerDemo() {
  const popover = document.getElementById('demoDatePickerPopover');
  popover?.classList.toggle('hidden');
}

function clearDatePickerDemo(e) {
  if (e) e.stopPropagation();
  demoSelectedDate = null;
  const label = document.getElementById('demoDatePickerLabel');
  if (label) label.textContent = 'Selecione uma data...';
  renderCalendarDaysDemo();
  showToast('Data removida.');
}

function navDateMonth(delta) {
  demoViewingMonth += delta;
  if (demoViewingMonth > 11) {
    demoViewingMonth = 0;
    demoViewingYear++;
  } else if (demoViewingMonth < 0) {
    demoViewingMonth = 11;
    demoViewingYear--;
  }
  renderCalendarDaysDemo();
}

function selectDatePreset(daysAhead) {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  selectCalendarDate(d.getDate(), d.getMonth(), d.getFullYear());
}

function selectCalendarDate(day, month = demoViewingMonth, year = demoViewingYear) {
  demoSelectedDate = new Date(year, month, day);
  demoViewingMonth = month;
  demoViewingYear = year;
  
  const label = document.getElementById('demoDatePickerLabel');
  if (label) {
    const dStr = String(day).padStart(2, '0');
    const mStr = String(month + 1).padStart(2, '0');
    label.textContent = `${dStr}/${mStr}/${year}`;
  }
  
  renderCalendarDaysDemo();
  toggleDatePickerDemo();
  showToast(`Data selecionada: ${label ? label.textContent : ''}`);
}

function renderCalendarDaysDemo() {
  const grid = document.getElementById('datePickerDaysGrid');
  const title = document.getElementById('datePickerMonthYear');
  if (!grid || !title) return;

  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];
  title.textContent = `${monthNames[demoViewingMonth]} ${demoViewingYear}`;

  const firstDay = new Date(demoViewingYear, demoViewingMonth, 1).getDay();
  const totalDays = new Date(demoViewingYear, demoViewingMonth + 1, 0).getDate();

  let html = '';
  for (let i = 0; i < firstDay; i++) {
    html += '<div></div>';
  }

  for (let day = 1; day <= totalDays; day++) {
    const isSelected = demoSelectedDate &&
      demoSelectedDate.getDate() === day &&
      demoSelectedDate.getMonth() === demoViewingMonth &&
      demoSelectedDate.getFullYear() === demoViewingYear;

    const isToday = new Date().getDate() === day &&
      new Date().getMonth() === demoViewingMonth &&
      new Date().getFullYear() === demoViewingYear;

    const cls = isSelected
      ? 'bg-brand font-bold text-white shadow-sm ring-2 ring-brand/30'
      : (isToday ? 'border border-brand text-brand font-bold hover:bg-muted' : 'hover:bg-muted text-foreground');

    html += `
      <button onclick="selectCalendarDate(${day})" class="flex h-7 w-7 items-center justify-center rounded-md text-xs transition-all ${cls}">
        ${day}
      </button>
    `;
  }

  grid.innerHTML = html;
  if (window.lucide) window.lucide.createIcons();
}

// 4. Lookup Demo
const lookupDataDemo = [
  { id: '1', code: 'CLI-101', name: 'Petrobras Petróleo Brasileiro S/A', cnpj: '33.000.167/0001-01', location: 'Rio de Janeiro - RJ', tag: 'VIP' },
  { id: '2', code: 'CLI-102', name: 'Vale S/A Mineração & Logística', cnpj: '33.592.510/0001-54', location: 'Nova Lima - MG', tag: 'Ativo' },
  { id: '3', code: 'CLI-103', name: 'Ambev Brasil Bebidas S/A', cnpj: '02.808.708/0001-07', location: 'São Paulo - SP', tag: 'Ativo' },
  { id: '4', code: 'CLI-104', name: 'Embraer Aviação Corporativa S/A', cnpj: '60.701.190/0001-04', location: 'São José dos Campos - SP', tag: 'Especial' },
  { id: '5', code: 'CLI-105', name: 'Suzano Papel e Celulose S/A', cnpj: '16.404.287/0001-55', location: 'Salvador - BA', tag: 'Ativo' }
];
let selectedLookupItem = lookupDataDemo[1];

function openLookupDemo() {
  document.getElementById('demoLookupModal')?.classList.remove('hidden');
  renderLookupItemsDemo();
}

function closeLookupDemo() {
  document.getElementById('demoLookupModal')?.classList.add('hidden');
}

function filterLookupDemo(query) {
  renderLookupItemsDemo(query);
}

function renderLookupItemsDemo(query = '') {
  const container = document.getElementById('lookupItemsContainer');
  if (!container) return;

  const filtered = lookupDataDemo.filter(item => 
    item.code.toLowerCase().includes(query.toLowerCase()) ||
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    item.cnpj.includes(query) ||
    item.location.toLowerCase().includes(query.toLowerCase())
  );

  if (filtered.length === 0) {
    container.innerHTML = `<div class="p-6 text-center text-xs text-muted-foreground">Nenhum cliente correspondente encontrado.</div>`;
    return;
  }

  container.innerHTML = filtered.map(item => {
    const isSelected = selectedLookupItem?.id === item.id;
    return `
      <div onclick="selectLookupItem('${item.id}')" class="flex items-center justify-between p-3 text-xs cursor-pointer hover:bg-muted/60 transition-colors ${isSelected ? 'bg-brand/10 font-semibold' : ''}">
        <div class="space-y-0.5">
          <div class="flex items-center gap-2">
            <span class="font-mono text-[11px] font-bold text-brand">${item.code}</span>
            <span class="text-foreground">${item.name}</span>
          </div>
          <p class="text-[11px] text-muted-foreground font-mono">${item.cnpj} · ${item.location}</p>
        </div>
        <div class="flex items-center gap-2">
          <span class="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">${item.tag}</span>
          ${isSelected ? '<i data-lucide="check" class="h-4 w-4 text-brand"></i>' : ''}
        </div>
      </div>
    `;
  }).join('');

  if (window.lucide) window.lucide.createIcons();
}

function selectLookupItem(id) {
  const item = lookupDataDemo.find(i => i.id === id);
  if (item) {
    selectedLookupItem = item;
    const display = document.getElementById('lookupSelectedDisplay');
    if (display) {
      display.innerHTML = `
        <span class="font-mono text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground">${item.code}</span>
        <span>${item.name}</span>
      `;
    }
    closeLookupDemo();
    showToast(`Cliente selecionado: ${item.name}`);
  }
}

// 5. Combobox Demo
const comboOptionsDemo = [
  { value: 'ti', label: 'Tecnologia da Informação', hint: 'CC-0101' },
  { value: 'fin', label: 'Controladoria & Finanças', hint: 'CC-0102' },
  { value: 'rh', label: 'Recursos Humanos & D.O.', hint: 'CC-0103' },
  { value: 'jur', label: 'Jurídico & Compliance', hint: 'CC-0104' },
  { value: 'log', label: 'Logística & Suprimentos', hint: 'CC-0105' },
  { value: 'mkt', label: 'Marketing & Vendas B2B', hint: 'CC-0106' },
  { value: 'eng', label: 'Engenharia de Produto', hint: 'CC-0107' }
];
let selectedComboValue = 'ti';

function toggleComboDemo() {
  document.getElementById('demoComboDropdown')?.classList.toggle('hidden');
  renderComboOptionsDemo();
}

function filterComboDemo(query) {
  renderComboOptionsDemo(query);
}

function renderComboOptionsDemo(query = '') {
  const list = document.getElementById('comboOptionsList');
  if (!list) return;

  const filtered = comboOptionsDemo.filter(opt =>
    opt.label.toLowerCase().includes(query.toLowerCase()) ||
    opt.hint.toLowerCase().includes(query.toLowerCase())
  );

  if (filtered.length === 0) {
    list.innerHTML = `<div class="p-3 text-center text-xs text-muted-foreground">Nenhuma opção encontrada.</div>`;
    return;
  }

  list.innerHTML = filtered.map(opt => {
    const isSelected = selectedComboValue === opt.value;
    return `
      <div onclick="selectComboOption('${opt.value}')" class="flex items-center justify-between rounded-md px-2.5 py-2 text-xs cursor-pointer select-none transition-colors ${isSelected ? 'bg-brand text-white font-semibold' : 'hover:bg-muted text-foreground'}">
        <div>
          <span>${opt.label}</span>
          <span class="ml-2 font-mono text-[10px] ${isSelected ? 'text-purple-200' : 'text-muted-foreground'}">${opt.hint}</span>
        </div>
        ${isSelected ? '<i data-lucide="check" class="h-3.5 w-3.5 shrink-0"></i>' : ''}
      </div>
    `;
  }).join('');

  if (window.lucide) window.lucide.createIcons();
}

function selectComboOption(val) {
  selectedComboValue = val;
  const opt = comboOptionsDemo.find(o => o.value === val);
  const label = document.getElementById('comboSelectedLabel');
  if (label && opt) {
    label.textContent = opt.label;
  }
  toggleComboDemo();
  showToast(`Departamento selecionado: ${opt ? opt.label : val}`);
}

// 6. MultiSelect Demo
const multiSelectOptionsDemo = [
  { value: 'read_nfe', label: 'Consulta NF-e' },
  { value: 'emit_nfe', label: 'Emissão NF-e' },
  { value: 'cancel_nfe', label: 'Cancelamento' },
  { value: 'audit_logs', label: 'Auditoria de Logs' },
  { value: 'export_csv', label: 'Exportar Relatórios' },
  { value: 'manage_users', label: 'Gerenciar Usuários' }
];
let selectedMultiValues = ['read_nfe', 'emit_nfe', 'export_csv'];

function toggleMultiSelectDemo() {
  document.getElementById('demoMultiSelectDropdown')?.classList.toggle('hidden');
  renderMultiSelectDemo();
}

function filterMultiSelectDemo(query) {
  renderMultiSelectOptionsList(query);
}

function removeMultiSelectTag(e, val) {
  if (e) e.stopPropagation();
  selectedMultiValues = selectedMultiValues.filter(v => v !== val);
  renderMultiSelectDemo();
  showToast('Permissão removida.');
}

function toggleMultiSelectOption(val) {
  if (selectedMultiValues.includes(val)) {
    selectedMultiValues = selectedMultiValues.filter(v => v !== val);
  } else {
    selectedMultiValues.push(val);
  }
  renderMultiSelectDemo();
}

function renderMultiSelectDemo() {
  const container = document.getElementById('multiSelectTagsContainer');
  if (container) {
    if (selectedMultiValues.length === 0) {
      container.innerHTML = `<span class="px-1.5 text-muted-foreground">Selecione permissões...</span>`;
    } else {
      container.innerHTML = selectedMultiValues.map(val => {
        const opt = multiSelectOptionsDemo.find(o => o.value === val);
        const label = opt ? opt.label : val;
        return `
          <span class="inline-flex items-center gap-1 rounded-md bg-brand/15 px-2 py-0.5 text-xs font-semibold text-brand dark:text-purple-300">
            <span>${label}</span>
            <span onclick="removeMultiSelectTag(event, '${val}')" class="rounded hover:bg-brand/20 p-0.5 cursor-pointer">
              <i data-lucide="x" class="h-3 w-3"></i>
            </span>
          </span>
        `;
      }).join('');
    }
  }
  renderMultiSelectOptionsList();
  if (window.lucide) window.lucide.createIcons();
}

function renderMultiSelectOptionsList(query = '') {
  const list = document.getElementById('multiSelectOptionsList');
  if (!list) return;

  const filtered = multiSelectOptionsDemo.filter(opt =>
    opt.label.toLowerCase().includes(query.toLowerCase())
  );

  if (filtered.length === 0) {
    list.innerHTML = `<div class="p-3 text-center text-xs text-muted-foreground">Nenhuma permissão encontrada.</div>`;
    return;
  }

  list.innerHTML = filtered.map(opt => {
    const isSelected = selectedMultiValues.includes(opt.value);
    return `
      <div onclick="toggleMultiSelectOption('${opt.value}')" class="flex items-center justify-between rounded-md px-2.5 py-1.5 text-xs cursor-pointer select-none transition-colors ${isSelected ? 'bg-brand/15 text-brand font-bold dark:text-purple-300' : 'hover:bg-muted text-foreground'}">
        <span>${opt.label}</span>
        ${isSelected ? '<i data-lucide="check" class="h-3.5 w-3.5 text-brand"></i>' : ''}
      </div>
    `;
  }).join('');

  if (window.lucide) window.lucide.createIcons();
}

function togglePopoverDemo() {
  const el = document.getElementById('demoPopover');
  el?.classList.toggle('hidden');
}

function updateCharCount(textarea) {
  const count = document.getElementById('demoCharCount');
  if (count) count.textContent = `${textarea.value.length}/250`;
}

function simulateLoading(btn) {
  const spinner = btn.querySelector('[data-lucide="loader-2"]');
  const text = btn.querySelector('span');
  if (spinner && text) {
    spinner.classList.remove('hidden');
    text.textContent = 'Processando...';
    btn.disabled = true;
    setTimeout(() => {
      spinner.classList.add('hidden');
      text.textContent = 'Clique p/ Loading';
      btn.disabled = false;
      showToast('Processamento concluído com sucesso!');
    }, 1800);
  }
}

// Helpers de Feedback (Badge, Toast, Progress, Skeleton, Alert)
function removeBadgeChipDemo(id) {
  const el = document.getElementById(id);
  if (el) {
    el.style.opacity = '0';
    el.style.transform = 'scale(0.8)';
    setTimeout(() => el.remove(), 150);
  }
}

function resetBadgeChipsDemo() {
  const container = document.getElementById('demoBadgeChipsContainer');
  if (!container) return;
  container.innerHTML = `
    <span id="chip-1" class="inline-flex items-center gap-1.5 rounded-md bg-[#753399]/15 px-2.5 py-1 text-xs font-semibold text-[#753399] dark:text-purple-300">
      <span>React 19</span>
      <button onclick="removeBadgeChipDemo('chip-1')" class="rounded p-0.5 hover:bg-[#753399]/25 transition-colors"><i data-lucide="x" class="h-3 w-3"></i></button>
    </span>
    <span id="chip-2" class="inline-flex items-center gap-1.5 rounded-md bg-[#753399]/15 px-2.5 py-1 text-xs font-semibold text-[#753399] dark:text-purple-300">
      <span>TypeScript</span>
      <button onclick="removeBadgeChipDemo('chip-2')" class="rounded p-0.5 hover:bg-[#753399]/25 transition-colors"><i data-lucide="x" class="h-3 w-3"></i></button>
    </span>
    <span id="chip-3" class="inline-flex items-center gap-1.5 rounded-md bg-[#753399]/15 px-2.5 py-1 text-xs font-semibold text-[#753399] dark:text-purple-300">
      <span>Tailwind CSS</span>
      <button onclick="removeBadgeChipDemo('chip-3')" class="rounded p-0.5 hover:bg-[#753399]/25 transition-colors"><i data-lucide="x" class="h-3 w-3"></i></button>
    </span>
    <span id="chip-4" class="inline-flex items-center gap-1.5 rounded-md bg-[#753399]/15 px-2.5 py-1 text-xs font-semibold text-[#753399] dark:text-purple-300">
      <span>Zero Radix</span>
      <button onclick="removeBadgeChipDemo('chip-4')" class="rounded p-0.5 hover:bg-[#753399]/25 transition-colors"><i data-lucide="x" class="h-3 w-3"></i></button>
    </span>
    <button onclick="resetBadgeChipsDemo()" class="text-[11px] font-semibold text-[#753399] hover:underline ml-1">Restaurar tags</button>
  `;
  if (window.lucide) window.lucide.createIcons();
}

function showToastDemo(type) {
  const configs = {
    success: { title: "Operação Concluída", msg: "Registro corporativo salvo com sucesso no banco de dados." },
    danger: { title: "Erro na Requisição", msg: "Falha ao conectar com o serviço SEFAZ. Tente novamente." },
    warning: { title: "Sessão Expirando", msg: "Sua autenticação expira em 5 minutos por inatividade." },
    brand: { title: "Monta UI v2.4.0", msg: "Módulo compilado com 37 componentes nativos em TypeScript." }
  };
  const config = configs[type] || configs.success;
  showToast(`${config.title}: ${config.msg}`);
}

let currentProgressVal = 65;
function setProgressDemo(val) {
  currentProgressVal = Math.min(Math.max(val, 0), 100);
  const bar = document.getElementById('demoProgressBar');
  const badge = document.getElementById('demoProgressValueBadge');
  if (bar) bar.style.width = currentProgressVal + '%';
  if (badge) badge.textContent = currentProgressVal + '%';
}

function adjustProgressDemo(delta) {
  setProgressDemo(currentProgressVal + delta);
}

function simulateProgressDemo() {
  setProgressDemo(0);
  let step = 0;
  const interval = setInterval(() => {
    step += 5;
    setProgressDemo(step);
    if (step >= 100) {
      clearInterval(interval);
      showToast('Download concluído com 100% de integridade!');
    }
  }, 100);
}

let isSkeletonLoading = true;
function toggleSkeletonDemo() {
  isSkeletonLoading = !isSkeletonLoading;
  const skeletonBox = document.getElementById('demoSkeletonContainer');
  const contentBox = document.getElementById('demoRealContentContainer');
  const btnText = document.getElementById('skeletonBtnText');

  if (isSkeletonLoading) {
    skeletonBox?.classList.remove('hidden');
    contentBox?.classList.add('hidden');
    if (btnText) btnText.textContent = "Simular Loading";
  } else {
    skeletonBox?.classList.add('hidden');
    contentBox?.classList.remove('hidden');
    if (btnText) btnText.textContent = "Exibir Esqueleto";
  }
  if (window.lucide) window.lucide.createIcons();
}

function dismissAlertDemo(id) {
  const el = document.getElementById(id);
  if (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(-10px)';
    setTimeout(() => el.classList.add('hidden'), 200);
  }
}

function restoreAlertsDemo() {
  ['alert-info', 'alert-success', 'alert-warning', 'alert-danger'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.remove('hidden');
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }
  });
  if (window.lucide) window.lucide.createIcons();
  showToast('Alertas restaurados.');
}

// Helpers de Gráficos (Chart Switcher)
function switchChartDemoType(type) {
  ['bar', 'area', 'donut', 'horizontal'].forEach(t => {
    const pane = document.getElementById(`chartView-${t}`);
    const btn = document.getElementById(`chartTabBtn-${t}`);
    if (pane) {
      if (t === type) {
        pane.classList.remove('hidden');
      } else {
        pane.classList.add('hidden');
      }
    }
    if (btn) {
      if (t === type) {
        btn.className = "chart-tab-btn inline-flex items-center gap-1 rounded-md bg-card px-2.5 py-1 text-xs font-bold text-foreground shadow-sm transition-all";
        btn.querySelector('i')?.classList.add('text-[#753399]');
      } else {
        btn.className = "chart-tab-btn inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-all";
        btn.querySelector('i')?.classList.remove('text-[#753399]');
      }
    }
  });
  if (window.lucide) window.lucide.createIcons();
}

// Helpers de Navbar e Sidebar Demo
function selectNavbarLinkDemo(btn, label) {
  document.querySelectorAll('.navbar-demo-link').forEach(b => {
    b.className = 'navbar-demo-link rounded-md px-2.5 py-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors';
  });
  btn.className = 'navbar-demo-link rounded-md bg-[#753399]/10 px-2.5 py-1 font-bold text-[#753399] dark:text-purple-300 transition-colors';
  showToast(`Navegando para: ${label}`);
}

let isSidebarCollapsed = false;
function toggleSidebarCollapseDemo() {
  isSidebarCollapsed = !isSidebarCollapsed;
  const sidebar = document.getElementById('demoCollapsibleSidebar');
  const btnText = document.getElementById('sidebarToggleBtnText');
  const brandTexts = document.getElementById('sidebarBrandTexts');
  const userTexts = document.getElementById('sidebarUserTexts');
  const logoutIcon = document.getElementById('sidebarLogoutIcon');
  const groupLabel1 = document.getElementById('sidebarGroupLabel1');
  const groupLabel2 = document.getElementById('sidebarGroupLabel2');

  if (isSidebarCollapsed) {
    if (sidebar) {
      sidebar.style.width = '64px';
    }
    if (btnText) btnText.textContent = "Expandir Sidebar";
    if (brandTexts) brandTexts.classList.add('hidden');
    if (userTexts) userTexts.classList.add('hidden');
    if (logoutIcon) logoutIcon.classList.add('hidden');
    if (groupLabel1) groupLabel1.classList.add('hidden');
    if (groupLabel2) groupLabel2.classList.add('hidden');
    document.querySelectorAll('.sidebar-item-label').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.sidebar-item-badge').forEach(el => el.classList.add('hidden'));
    showToast('Sidebar recolhida (Modo Mini / Icon-only)');
  } else {
    if (sidebar) {
      sidebar.style.width = '240px';
    }
    if (btnText) btnText.textContent = "Recolher Sidebar";
    if (brandTexts) brandTexts.classList.remove('hidden');
    if (userTexts) userTexts.classList.remove('hidden');
    if (logoutIcon) logoutIcon.classList.remove('hidden');
    if (groupLabel1) groupLabel1.classList.remove('hidden');
    if (groupLabel2) groupLabel2.classList.remove('hidden');
    document.querySelectorAll('.sidebar-item-label').forEach(el => el.classList.remove('hidden'));
    document.querySelectorAll('.sidebar-item-badge').forEach(el => el.classList.remove('hidden'));
    showToast('Sidebar expandida');
  }
}

function selectSidebarItemDemo(btn, pageTitle) {
  document.querySelectorAll('.sidebar-item-btn').forEach(b => {
    b.className = 'sidebar-item-btn w-full flex items-center justify-between rounded-lg px-2.5 py-2 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors';
  });
  btn.className = 'sidebar-item-btn w-full flex items-center justify-between rounded-lg bg-[#753399]/15 px-2.5 py-2 text-xs font-bold text-[#753399] dark:text-purple-300 transition-colors';
  const titleEl = document.getElementById('sidebarActivePageTitle');
  if (titleEl) titleEl.textContent = pageTitle;
  showToast(`Módulo carregado: ${pageTitle}`);
}

// Helpers de Field Demo
let isFieldInError = true;
function toggleFieldErrorDemo() {
  isFieldInError = !isFieldInError;
  const input = document.getElementById('demoFieldCnpj');
  const label = document.getElementById('demoFieldStatusLabel');
  const errorText = document.getElementById('demoFieldErrorText');

  if (isFieldInError) {
    if (input) input.className = 'flex h-9 w-full rounded-md border border-rose-500 bg-rose-500/5 px-3 text-xs text-rose-900 dark:text-rose-200 shadow-sm focus:outline-none focus:ring-1 focus:ring-rose-500 transition-colors';
    if (label) {
      label.textContent = 'Inválido';
      label.className = 'text-[10px] text-rose-500 font-medium';
    }
    if (errorText) errorText.classList.remove('hidden');
    showToast('Estado de erro ativado');
  } else {
    if (input) input.className = 'flex h-9 w-full rounded-md border border-input bg-background px-3 text-xs shadow-sm focus:border-[#753399] focus:outline-none focus:ring-1 focus:ring-[#753399] transition-colors';
    if (label) {
      label.textContent = 'Válido';
      label.className = 'text-[10px] text-emerald-500 font-medium';
    }
    if (errorText) errorText.classList.add('hidden');
    showToast('Campo validado com sucesso');
  }
}

function updateFieldCharCounter(textarea) {
  const counter = document.getElementById('demoFieldCharCounter');
  if (counter) {
    counter.textContent = `${textarea.value.length} / ${textarea.maxLength}`;
  }
}

// Helpers de Form Demo
function handleFormSubmitDemo(e) {
  e.preventDefault();
  const btn = document.getElementById('formSubmitBtn');
  if (btn) {
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span class="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent mr-2"></span> Salvando...';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
      showToast('✅ Formulário de Fornecedor salvo com sucesso!');
    }, 1000);
  }
}

function resetFormDemo() {
  const r = document.getElementById('formRazao');
  const c = document.getElementById('formCnpj');
  const em = document.getElementById('formEmail');
  const t = document.getElementById('formTel');
  if (r) r.value = '';
  if (c) c.value = '';
  if (em) em.value = '';
  if (t) t.value = '';
  showToast('Campos do formulário resetados.');
}

// Helpers de Paginação Demo
let currentPagPage = 3;
const totalPagPages = 18;

function setPaginationDemoPage(page) {
  currentPagPage = page;
  updatePaginationDemoUI();
  showToast(`Navegando para a página ${page}`);
}

function changePaginationDemoPage(delta) {
  const newPage = currentPagPage + delta;
  if (newPage >= 1 && newPage <= totalPagPages) {
    setPaginationDemoPage(newPage);
  }
}

function updatePaginationDemoUI() {
  const infoText = document.getElementById('demoPaginationInfoText');
  const rangeText = document.getElementById('demoPaginationRangeText');
  const prevBtn = document.getElementById('demoPagPrevBtn');
  const nextBtn = document.getElementById('demoPagNextBtn');

  if (infoText) infoText.textContent = `Página ${currentPagPage} de ${totalPagPages}`;
  if (rangeText) {
    const start = (currentPagPage - 1) * 10 + 1;
    const end = Math.min(currentPagPage * 10, 180);
    rangeText.innerHTML = `Mostrando <span class="font-bold text-foreground">${start} a ${end}</span> de <span class="font-bold text-foreground">180</span> registros`;
  }
  if (prevBtn) prevBtn.disabled = currentPagPage === 1;
  if (nextBtn) nextBtn.disabled = currentPagPage === totalPagPages;

  document.querySelectorAll('.demo-pag-btn').forEach(btn => {
    const num = parseInt(btn.textContent);
    if (!isNaN(num)) {
      if (num === currentPagPage) {
        btn.className = 'demo-pag-btn h-8 w-8 rounded-md bg-[#753399] text-xs font-bold text-white shadow-sm';
      } else {
        btn.className = 'demo-pag-btn h-8 w-8 rounded-md border border-border text-xs font-medium hover:bg-muted transition-colors';
      }
    }
  });
}

// Helpers de Loading Demo
function triggerAsyncLoadingDemo() {
  const overlay = document.getElementById('demoLoadingOverlay');
  if (overlay) {
    overlay.classList.remove('hidden');
    showToast('Iniciando carregamento assíncrono...');
    setTimeout(() => {
      overlay.classList.add('hidden');
      showToast('✅ Dados sincronizados com sucesso!');
    }, 2000);
  }
}

// Helpers de Dados & Visualização
function filterDemoTable(val) {
  const q = val.toLowerCase();
  const rows = document.querySelectorAll('#demoTableBody tr');
  rows.forEach(r => {
    const text = r.textContent.toLowerCase();
    r.style.display = text.includes(q) ? '' : 'none';
  });
}

function toggleSelectAllRows(masterCheckbox) {
  const checkboxes = document.querySelectorAll('.row-checkbox');
  checkboxes.forEach(cb => cb.checked = masterCheckbox.checked);
  showToast(masterCheckbox.checked ? 'Todos os registros selecionados' : 'Seleção desmarcada');
}

function selectCalDay(el, day) {
  document.querySelectorAll('#docPreviewStage .grid-cols-7 div').forEach(d => {
    if (d.classList.contains('bg-brand')) {
      d.className = 'p-1.5 rounded hover:bg-muted cursor-pointer';
    }
  });
  el.className = 'p-1.5 rounded bg-brand text-white font-bold cursor-pointer shadow';
  showToast(`Data selecionada: ${day} de Agosto de 2026`);
}

function toggleTreeNode(el) {
  const sub = el.nextElementSibling;
  const icon = el.querySelector('[data-lucide="chevron-down"]');
  if (sub) {
    sub.classList.toggle('hidden');
    if (icon) {
      icon.style.transform = sub.classList.contains('hidden') ? 'rotate(-90deg)' : 'rotate(0deg)';
    }
  }
}

function selectTreeFile(el, filename) {
  document.querySelectorAll('#docPreviewStage .cursor-pointer').forEach(n => {
    n.classList.remove('bg-accent', 'text-brand', 'font-bold');
  });
  el.classList.add('bg-accent', 'text-brand', 'font-bold');
  showToast(`Arquivo selecionado: ${filename}`);
}

let currentStepperIndex = 2;
const stepperData = [
  { title: "Identificação & CNPJ", desc: "Informe a Razão Social, CNPJ e contato principal do faturamento." },
  { title: "Endereço & Logística", desc: "Informe os dados para entrega e conferência tributária estadual." },
  { title: "Condições de Pagamento", desc: "Defina os prazos comerciais e forma de faturamento da conta." },
  { title: "Revisão & Aprovação", desc: "Revise todos os dados antes de finalizar o cadastro no sistema." }
];

const stepperForms = [
  `<div class="space-y-3 text-xs">
    <div class="space-y-1">
      <label class="font-semibold text-foreground">Razão Social</label>
      <input class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-xs focus:border-brand focus:outline-none" value="Monta UI Enterprise Tecnologia S/A">
    </div>
    <div class="grid grid-cols-2 gap-3">
      <div class="space-y-1">
        <label class="font-semibold text-foreground">CNPJ</label>
        <input class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-xs focus:border-brand focus:outline-none font-mono" value="53.113.791/0001-22">
      </div>
      <div class="space-y-1">
        <label class="font-semibold text-foreground">E-mail Financeiro</label>
        <input class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-xs focus:border-brand focus:outline-none" value="faturamento@empresa.com.br">
      </div>
    </div>
  </div>`,
  `<div class="space-y-3 text-xs">
    <div class="grid grid-cols-2 gap-3">
      <div class="space-y-1">
        <label class="font-semibold text-foreground">CEP</label>
        <input class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-xs focus:border-brand focus:outline-none font-mono" value="04538-133">
      </div>
      <div class="space-y-1">
        <label class="font-semibold text-foreground">UF / Estado</label>
        <input class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-xs focus:border-brand focus:outline-none" value="São Paulo - SP">
      </div>
    </div>
    <div class="space-y-1">
      <label class="font-semibold text-foreground">Logradouro & Número</label>
      <input class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-xs focus:border-brand focus:outline-none" value="Av. Brigadeiro Faria Lima, 4300 - 10º Andar">
    </div>
  </div>`,
  `<div class="space-y-3 text-xs">
    <div class="space-y-1">
      <label class="font-semibold text-foreground">Condição Comercial</label>
      <select class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-xs focus:border-brand focus:outline-none">
        <option>Boleto Bancário Faturado (30/60/90 Dias)</option>
        <option>PIX Corporativo com 5% de Desconto</option>
        <option>Cartão de Crédito Corporativo</option>
      </select>
    </div>
    <div class="space-y-1">
      <label class="font-semibold text-foreground">Limite de Crédito Aprovado</label>
      <input class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-xs font-mono font-semibold text-brand" value="R$ 150.000,00" disabled>
    </div>
  </div>`,
  `<div class="rounded-lg border border-border bg-muted/40 p-4 space-y-2 text-xs">
    <div class="flex items-center justify-between border-b border-border pb-2">
      <span class="font-bold text-foreground">Resumo da Homologação</span>
      <span class="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">Pronto p/ Envio</span>
    </div>
    <p class="text-muted-foreground">Todos os dados cadastrais, endereço e limites de faturamento foram validados com sucesso.</p>
    <div class="pt-2 flex justify-between text-muted-foreground font-mono">
      <span>Status: Homologado</span>
      <span class="font-bold text-foreground">Taxa 0%</span>
    </div>
  </div>`
];

function updateStepperUI() {
  const title = document.getElementById('stepTitle');
  const desc = document.getElementById('stepDesc');
  const formContainer = document.getElementById('stepFormContainer');
  const pct = document.getElementById('stepperPct');
  const bar = document.getElementById('stepperBar');
  const backBtn = document.getElementById('stepperBackBtn');
  const nextBtn = document.getElementById('stepperNextBtn');

  const p = Math.round((currentStepperIndex / 4) * 100);
  if (pct) pct.textContent = `${p}% Concluído`;
  if (bar) bar.style.width = `${p}%`;

  if (title && desc) {
    title.textContent = `Etapa ${currentStepperIndex}: ${stepperData[currentStepperIndex - 1].title}`;
    desc.textContent = stepperData[currentStepperIndex - 1].desc;
  }

  if (formContainer) {
    formContainer.innerHTML = stepperForms[currentStepperIndex - 1];
  }

  if (backBtn) {
    backBtn.disabled = currentStepperIndex === 1;
    backBtn.style.opacity = currentStepperIndex === 1 ? '0.5' : '1';
  }

  if (nextBtn) {
    if (currentStepperIndex === 4) {
      nextBtn.innerHTML = `<span>Finalizar Cadastro</span> <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="m5 12 5 5L20 7"/></svg>`;
    } else {
      nextBtn.innerHTML = `<span>Avançar Etapa</span> <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>`;
    }
  }

  for (let i = 1; i <= 4; i++) {
    const node = document.getElementById(`step-node-${i}`);
    if (!node) continue;
    const circle = node.querySelector('.rounded-full');
    const label = node.querySelector('span');
    const line = document.getElementById(`step-line-${i}`);

    if (line) {
      line.className = i < currentStepperIndex ? 'absolute top-4 left-1/2 w-full h-0.5 bg-emerald-600 -z-0' : 'absolute top-4 left-1/2 w-full h-0.5 bg-border -z-0';
    }

    if (circle && label) {
      if (i < currentStepperIndex) {
        circle.className = 'relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white font-bold text-xs shadow ring-4 ring-card group-hover:scale-105 transition-all';
        circle.innerHTML = '<svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path d="m5 12 5 5L20 7"/></svg>';
        label.className = 'mt-2 text-xs font-bold text-foreground';
      } else if (i === currentStepperIndex) {
        circle.className = 'relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white font-bold text-xs shadow ring-4 ring-brand/20 group-hover:scale-105 transition-all';
        circle.textContent = i;
        label.className = 'mt-2 text-xs font-bold text-brand';
      } else {
        circle.className = 'relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground border border-border font-bold text-xs ring-4 ring-card group-hover:scale-105 transition-all';
        circle.textContent = i;
        label.className = 'mt-2 text-xs font-medium text-muted-foreground';
      }
    }
  }

  if (window.lucide) window.lucide.createIcons();
}

function nextStepDemo() {
  if (currentStepperIndex < 4) {
    currentStepperIndex++;
    updateStepperUI();
    showToast(`Avançado para a Etapa ${currentStepperIndex}`);
  } else {
    showToast('Cadastro corporativo homologado com sucesso!');
  }
}

function prevStepDemo() {
  if (currentStepperIndex > 1) {
    currentStepperIndex--;
    updateStepperUI();
    showToast(`Retornado para a Etapa ${currentStepperIndex}`);
  }
}

function jumpToStep(step) {
  currentStepperIndex = step;
  updateStepperUI();
  showToast(`Navegado para a Etapa ${step}`);
}

function resetStepperDemo() {
  currentStepperIndex = 1;
  updateStepperUI();
  showToast('Fluxo de cadastro reiniciado.');
}

// ==================== 2. GERADORES DE CÓDIGO TSX ====================
function getComponentTSX(name) {
  const pascal = formatTitle(name).replace(/\s+/g, '');

  if (name === 'button') {
    return `import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-[13px] font-semibold transition-all select-none relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#753399] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none active:scale-[0.99] [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-[#753399] text-white shadow-[0_2px_8px_rgba(117,51,153,0.35)] hover:bg-[#632982] hover:shadow-[0_5px_16px_rgba(117,51,153,0.45)] hover:-translate-y-0.5 active:translate-y-0 active:bg-[#52206d] dark:bg-[#8b3fb5] dark:hover:bg-[#753399]",
        secondary: "bg-background text-foreground border border-input shadow-sm hover:border-[#753399] hover:bg-[#753399]/10 hover:text-[#753399] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(117,51,153,0.12)] active:translate-y-0 active:bg-[#753399]/20",
        ghost: "text-[#753399] bg-transparent hover:bg-[#753399]/10 active:bg-[#753399]/20 dark:text-[#a855f7] dark:hover:bg-[#a855f7]/10",
        danger: "bg-[#c83c4d] text-white shadow-[0_2px_8px_rgba(200,60,77,0.3)] hover:bg-[#b52e3e] hover:shadow-[0_5px_16px_rgba(200,60,77,0.4)] hover:-translate-y-0.5 active:translate-y-0 active:bg-[#9e2332]",
        success: "bg-[#168862] text-white shadow-[0_2px_8px_rgba(22,136,98,0.3)] hover:bg-[#116f4f] hover:shadow-[0_5px_16px_rgba(22,136,98,0.4)] hover:-translate-y-0.5 active:translate-y-0 active:bg-[#0d593f]",
      },
      size: {
        default: "min-h-[42px] px-5 py-2 [&_svg]:size-4",
        sm: "min-h-[34px] px-3.5 py-1.5 text-xs rounded-sm gap-1.5 [&_svg]:size-3.5",
        lg: "min-h-[50px] px-7 py-3 text-[15px] font-bold rounded-lg gap-2.5 [&_svg]:size-4.5",
        icon: "h-[42px] w-[42px] p-0 [&_svg]:size-4",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      fullWidth: false,
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, isLoading = false, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin mr-2 size-4" />
            <span>Carregando...</span>
          </>
        ) : (
          children
        )}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }`;
  }

  if (name === 'input') {
    return `import * as React from "react"
import { Eye, EyeOff, X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  clearable?: boolean
  onClear?: () => void
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", clearable = false, onClear, disabled, value, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const isPassword = type === "password"
    const inputType = isPassword ? (showPassword ? "text" : "password") : type

    return (
      <div className="relative flex w-full items-center">
        <input
          type={inputType}
          className={cn(
            "flex min-h-[42px] w-full rounded-md border border-input bg-background px-3.5 py-2 text-sm shadow-sm transition-all placeholder:text-muted-foreground focus:border-[#753399] focus:outline-none focus:ring-2 focus:ring-[#753399]/20 disabled:cursor-not-allowed disabled:opacity-50",
            (isPassword || clearable) && "pr-10",
            className
          )}
          ref={ref}
          value={value}
          disabled={disabled}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            className="absolute right-3 text-muted-foreground hover:text-foreground focus:outline-none"
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        )}
        {clearable && value && !isPassword && (
          <button
            type="button"
            onClick={onClear}
            tabIndex={-1}
            className="absolute right-3 text-muted-foreground hover:text-foreground focus:outline-none"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }`;
  }

  if (name === 'dialog') {
    return `import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface DialogContextType {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const DialogContext = React.createContext<DialogContextType | null>(null)

export function Dialog({
  children,
  open: controlledOpen,
  onOpenChange
}: {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen

  const setOpen = React.useCallback(
    (next: boolean | ((prev: boolean) => boolean)) => {
      const nextValue = typeof next === "function" ? next(open) : next
      if (!isControlled) setUncontrolledOpen(nextValue)
      onOpenChange?.(nextValue)
    },
    [isControlled, onOpenChange, open]
  )

  return <DialogContext.Provider value={{ open, setOpen }}>{children}</DialogContext.Provider>
}

export function DialogTrigger({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const context = React.useContext(DialogContext)
  return (
    <button
      type="button"
      onClick={() => context?.setOpen(true)}
      className={cn("inline-flex items-center justify-center", className)}
      {...props}
    >
      {children}
    </button>
  )
}

export function DialogContent({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const context = React.useContext(DialogContext)
  if (!context?.open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in-0 duration-200 p-4">
      <div
        className={cn(
          "relative w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-2xl animate-in zoom-in-95 duration-200",
          className
        )}
        {...props}
      >
        <button
          type="button"
          onClick={() => context.setOpen(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Fechar</span>
        </button>
        {children}
      </div>
    </div>
  )
}

export function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left mb-4", className)} {...props} />
}

export function DialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("font-heading text-lg font-bold leading-none tracking-tight text-foreground", className)} {...props} />
}

export function DialogDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-xs text-muted-foreground", className)} {...props} />
}

export function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6", className)} {...props} />
}

export { Dialog as Modal }`;
  }

  if (name === 'dropdown-menu') {
    return `import * as React from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface DropdownContextType {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const DropdownContext = React.createContext<DropdownContextType | null>(null)

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  const menuRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div ref={menuRef} className="relative inline-block text-left">
        {children}
      </div>
    </DropdownContext.Provider>
  )
}

export function DropdownMenuTrigger({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const context = React.useContext(DropdownContext)
  return (
    <button
      type="button"
      onClick={() => context?.setOpen(!context.open)}
      className={cn("inline-flex items-center justify-center", className)}
      {...props}
    >
      {children}
    </button>
  )
}

export function DropdownMenuContent({
  children,
  className,
  align = "start",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { align?: "start" | "end" | "center" }) {
  const context = React.useContext(DropdownContext)
  if (!context?.open) return null

  const alignmentClass =
    align === "end" ? "right-0" : align === "center" ? "left-1/2 -translate-x-1/2" : "left-0"

  return (
    <div
      className={cn(
        "absolute mt-2 min-w-[12rem] z-50 rounded-xl border border-border bg-card p-1.5 text-foreground shadow-2xl animate-in fade-in zoom-in-95 duration-100",
        alignmentClass,
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function DropdownMenuItem({
  children,
  className,
  onClick,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const context = React.useContext(DropdownContext)
  return (
    <button
      type="button"
      onClick={(e) => {
        context?.setOpen(false)
        onClick?.(e)
      }}
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-2.5 py-1.5 text-xs font-medium outline-none transition-colors hover:bg-muted text-foreground disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export function DropdownMenuSeparator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("-mx-1 my-1 h-px bg-border", className)} {...props} />
}

export function DropdownMenuShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("ml-auto text-[10px] tracking-widest text-muted-foreground font-mono", className)} {...props} />
}`;
  }

  if (name === 'context-menu') {
    return `import * as React from "react"
import { cn } from "@/lib/utils"

export function ContextMenu({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("relative", className)} {...props}>{children}</div>
}

export function ContextMenuTrigger({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={className} {...props}>{children}</div>
}

export function ContextMenuContent({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-0.5", className)} {...props}>{children}</div>
}

export function ContextMenuItem({ children, className, onClick, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-2.5 py-1.5 text-xs font-medium outline-none transition-colors hover:bg-muted text-foreground disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export function ContextMenuSeparator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("-mx-1 my-1 h-px bg-border", className)} {...props} />
}`;
  }

  if (name === 'menubar') {
    return `import * as React from "react"
import { cn } from "@/lib/utils"

export function Menubar({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex h-9 items-center space-x-1 rounded-lg border border-border bg-card p-1 shadow-sm relative", className)} {...props}>
      {children}
    </div>
  )
}

export function MenubarMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  const menuRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={menuRef} className="relative inline-block">
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, { open, setOpen })
        }
        return child
      })}
    </div>
  )
}

export function MenubarTrigger({
  children,
  className,
  open,
  setOpen,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { open?: boolean; setOpen?: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <button
      type="button"
      onClick={() => setOpen?.(!open)}
      className={cn(
        "flex cursor-pointer select-none items-center rounded px-3 py-1 text-xs font-semibold outline-none hover:bg-muted text-foreground transition-colors",
        open && "bg-muted",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export function MenubarContent({
  children,
  className,
  open,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { open?: boolean }) {
  if (!open) return null
  return (
    <div
      className={cn(
        "absolute left-0 mt-2 min-w-[12rem] z-50 rounded-xl border border-border bg-card p-1.5 text-foreground shadow-2xl space-y-0.5 text-xs animate-in fade-in zoom-in-95 duration-100",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function MenubarItem({ children, className, onClick, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center justify-between rounded-md px-2.5 py-1.5 text-xs font-medium outline-none hover:bg-muted text-foreground transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}`;
  }

  if (name === 'navigation-menu') {
    return `import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export function NavigationMenu({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn("relative z-10 flex max-w-max flex-1 items-center justify-center", className)} {...props}>
      {children}
    </nav>
  )
}

export function NavigationMenuList({ children, className, ...props }: React.HTMLAttributes<HTMLUListElement>) {
  return (
    <ul className={cn("group flex flex-1 list-none items-center justify-center space-x-1", className)} {...props}>
      {children}
    </ul>
  )
}

export function NavigationMenuItem({ children, className, ...props }: React.HTMLAttributes<HTMLLIElement>) {
  const [open, setOpen] = React.useState(false)
  const itemRef = React.useRef<HTMLLIElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (itemRef.current && !itemRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <li ref={itemRef} className={cn("relative", className)} {...props}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, { open, setOpen })
        }
        return child
      })}
    </li>
  )
}

export function NavigationMenuTrigger({
  children,
  className,
  open,
  setOpen,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { open?: boolean; setOpen?: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <button
      type="button"
      onClick={() => setOpen?.(!open)}
      className={cn(
        "group inline-flex h-9 w-max items-center justify-center gap-1 rounded-md px-3 text-xs font-semibold transition-colors hover:bg-muted hover:text-foreground",
        open && "bg-muted text-foreground",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", open && "rotate-180")} />
    </button>
  )
}

export function NavigationMenuContent({
  children,
  className,
  open,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { open?: boolean }) {
  if (!open) return null
  return (
    <div
      className={cn(
        "absolute left-1/2 -translate-x-1/2 mt-2 w-80 sm:w-96 rounded-xl border border-border bg-card p-4 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function NavigationMenuLink({ children, className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={cn("block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted", className)} {...props}>
      {children}
    </a>
  )
}`;
  }

  if (name === 'table') {
    return `import * as React from "react"
import { cn } from "@/lib/utils"

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto rounded-lg border border-border bg-card">
      <table ref={ref} className={cn("w-full caption-bottom text-sm text-left", className)} {...props} />
    </div>
  )
)
Table.displayName = "Table"

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <thead ref={ref} className={cn("[&_tr]:border-b bg-muted/50 font-semibold text-muted-foreground", className)} {...props} />
)
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <tbody ref={ref} className={cn("[&_tr:last-child]:border-0 divide-y divide-border/50", className)} {...props} />
)
TableBody.displayName = "TableBody"

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr ref={ref} className={cn("border-b border-border/50 transition-colors hover:bg-muted/40 data-[state=selected]:bg-muted", className)} {...props} />
  )
)
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => <th ref={ref} className={cn("h-10 px-3 text-left align-middle font-medium text-xs text-muted-foreground", className)} {...props} />
)
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => <td ref={ref} className={cn("p-3 align-middle text-xs [&:has([role=checkbox])]:pr-0", className)} {...props} />
)
TableCell.displayName = "TableCell"

export { Table, TableHeader, TableBody, TableHead, TableRow, TableCell }`;
  }

  if (name === 'chart') {
    return `import * as React from "react"
import { cn } from "@/lib/utils"

export type ChartType = "bar" | "area" | "line" | "donut" | "horizontal-bar"

export interface ChartDataPoint {
  label: string
  value: number
  target?: number
  color?: string
  percentage?: number
}

export interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: ChartType
  data: ChartDataPoint[]
  title?: string
  description?: string
  color?: string
  height?: number
  showLegend?: boolean
  showGrid?: boolean
}

export function Chart({
  type = "bar",
  data,
  title,
  description,
  color = "#753399",
  height = 180,
  showLegend = true,
  showGrid = true,
  className,
  ...props
}: ChartProps) {
  const maxValue = Math.max(...data.map(d => Math.max(d.value, d.target || 0)), 1)
  const totalValue = data.reduce((acc, curr) => acc + curr.value, 0)

  return (
    <div className={cn("w-full rounded-xl border border-border bg-card p-5 space-y-4 shadow-sm select-none", className)} {...props}>
      {(title || description) && (
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div>
            {title && <h4 className="font-heading text-sm font-bold text-foreground">{title}</h4>}
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
          </div>
          {type === "donut" && (
            <span className="font-mono text-xs font-bold text-foreground">Total: {totalValue.toLocaleString()}</span>
          )}
        </div>
      )}

      {/* 1. BAR CHART */}
      {type === "bar" && (
        <div className="pt-2 flex items-end justify-between gap-3 border-b border-border pb-2 px-1" style={{ height: \`\${height}px\` }}>
          {data.map((item, idx) => {
            const heightPct = Math.round((item.value / maxValue) * 100)
            const targetPct = item.target ? Math.round((item.target / maxValue) * 100) : null
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 group h-full justify-end cursor-pointer">
                <span className="text-[10px] font-mono text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.value}
                </span>
                <div className="w-full flex items-end justify-center gap-1 h-3/4">
                  <div
                    className="w-3/5 rounded-t transition-all group-hover:brightness-110 shadow-sm"
                    style={{ height: \`\${heightPct}%\`, backgroundColor: item.color || color }}
                  />
                  {targetPct && (
                    <div
                      className="w-2/5 rounded-t bg-muted-foreground/20"
                      style={{ height: \`\${targetPct}%\` }}
                    />
                  )}
                </div>
                <span className="text-[11px] font-semibold text-muted-foreground truncate w-full text-center">
                  {item.label}
                </span>
              </div>
            )
          })}
        </div>
      )}

      {/* 2. AREA / LINE CHART */}
      {(type === "area" || type === "line") && (
        <div className="relative w-full pt-2" style={{ height: \`\${height}px\` }}>
          <svg viewBox="0 0 500 160" className="w-full h-full overflow-visible" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity="0.35"/>
                <stop offset="100%" stopColor={color} stopOpacity="0.0"/>
              </linearGradient>
            </defs>
            {showGrid && (
              <>
                <line x1="0" y1="40" x2="500" y2="40" stroke="currentColor" strokeOpacity="0.08" strokeDasharray="4"/>
                <line x1="0" y1="80" x2="500" y2="80" stroke="currentColor" strokeOpacity="0.08" strokeDasharray="4"/>
                <line x1="0" y1="120" x2="500" y2="120" stroke="currentColor" strokeOpacity="0.08" strokeDasharray="4"/>
              </>
            )}
            {type === "area" && (
              <path
                d={\`M 0,\${160 - (data[0]?.value / maxValue) * 140} \${data.map((d, i) => \`L \${(i / (data.length - 1)) * 500},\${160 - (d.value / maxValue) * 140}\`).join(' ')} L 500,160 L 0,160 Z\`}
                fill="url(#chartGradient)"
              />
            )}
            <path
              d={\`M 0,\${160 - (data[0]?.value / maxValue) * 140} \${data.map((d, i) => \`L \${(i / (data.length - 1)) * 500},\${160 - (d.value / maxValue) * 140}\`).join(' ')}\`}
              fill="none"
              stroke={color}
              strokeWidth="3"
              strokeLinecap="round"
            />
            {data.map((d, i) => (
              <circle
                key={i}
                cx={(i / (data.length - 1)) * 500}
                cy={160 - (d.value / maxValue) * 140}
                r="4"
                fill={color}
                stroke="white"
                strokeWidth="2"
                className="cursor-pointer hover:r-6 transition-all"
              />
            ))}
          </svg>
          <div className="flex justify-between text-[10px] text-muted-foreground font-mono px-1 border-t border-border pt-2">
            {data.map((d, i) => (
              <span key={i}>{d.label}</span>
            ))}
          </div>
        </div>
      )}

      {/* 3. DONUT / PIE CHART */}
      {type === "donut" && (
        <div className="flex flex-col sm:flex-row items-center justify-around gap-6 pt-2">
          <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              <circle cx="18" cy="18" r="14" fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="4.5"/>
              {(() => {
                let accumulatedOffset = 0
                const colors = ["#753399", "#10b981", "#f59e0b", "#3b82f6", "#ec4899", "#8b5cf6"]
                return data.map((item, idx) => {
                  const pct = (item.value / totalValue) * 88
                  const itemColor = item.color || colors[idx % colors.length]
                  const offset = accumulatedOffset
                  accumulatedOffset += pct
                  return (
                    <circle
                      key={idx}
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      stroke={itemColor}
                      strokeWidth="4.5"
                      strokeDasharray={\`\${pct} 88\`}
                      strokeDashoffset={-offset}
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  )
                })
              })()}
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="font-heading text-base font-bold text-foreground">100%</span>
              <span className="text-[9px] text-muted-foreground uppercase font-semibold">Total</span>
            </div>
          </div>
          {showLegend && (
            <div className="space-y-2 flex-1 w-full max-w-xs">
              {data.map((item, idx) => {
                const colors = ["#753399", "#10b981", "#f59e0b", "#3b82f6", "#ec4899", "#8b5cf6"]
                const itemColor = item.color || colors[idx % colors.length]
                const pct = Math.round((item.value / totalValue) * 100)
                return (
                  <div key={idx} className="flex items-center justify-between text-xs p-1.5 rounded-lg hover:bg-muted transition-colors">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: itemColor }} />
                      <span className="font-medium text-foreground">{item.label}</span>
                    </div>
                    <span className="font-mono font-bold text-foreground">{pct}% <span className="text-muted-foreground font-normal">({item.value})</span></span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* 4. HORIZONTAL BAR / RANKING */}
      {type === "horizontal-bar" && (
        <div className="space-y-3 pt-1">
          {data.map((item, idx) => {
            const pct = Math.round((item.value / maxValue) * 100)
            return (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-foreground font-bold">{item.label}</span>
                  <span className="font-mono font-bold" style={{ color: item.color || color }}>{item.value} ({pct}%)</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: \`\${pct}%\`, backgroundColor: item.color || color }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}`;
  }

  if (name === 'stepper') {
    return `import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export interface StepItem {
  title: string
  description?: string
}

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: StepItem[]
  currentStep: number
  onStepChange?: (step: number) => void
}

export function Stepper({ steps, currentStep, onStepChange, className, ...props }: StepperProps) {
  return (
    <div className={cn("w-full space-y-4", className)} {...props}>
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-full bg-border -z-0" />
        {steps.map((step, idx) => {
          const stepNum = idx + 1
          const isDone = stepNum < currentStep
          const isCurrent = stepNum === currentStep

          return (
            <div
              key={idx}
              onClick={() => onStepChange?.(stepNum)}
              className="relative z-10 flex flex-col items-center gap-1.5 cursor-pointer select-none"
            >
              <div
                className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs shadow-sm transition-all",
                  isDone && "bg-emerald-600 text-white",
                  isCurrent && "bg-[#753399] text-white ring-4 ring-[#753399]/20",
                  !isDone && !isCurrent && "bg-muted text-muted-foreground border border-border"
                )}
              >
                {isDone ? <Check className="h-4 w-4" /> : stepNum}
              </div>
              <span
                className={cn(
                  "text-[10px] font-medium transition-colors",
                  isCurrent && "font-bold text-[#753399]",
                  isDone && "font-semibold text-foreground",
                  !isDone && !isCurrent && "text-muted-foreground"
                )}
              >
                {step.title}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}`;
  }

  if (name === 'timeline') {
    return `import * as React from "react"
import { Check, Clock, AlertTriangle, XCircle, Package } from "lucide-react"
import { cn } from "@/lib/utils"

export type TimelineStatus = "completed" | "in-progress" | "warning" | "error" | "pending"

export interface TimelineItem {
  id?: string
  title: string
  description?: string
  time?: string
  status?: TimelineStatus
  icon?: React.ReactNode
  badge?: string
  children?: React.ReactNode
}

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TimelineItem[]
}

export function Timeline({ items, className, ...props }: TimelineProps) {
  const getStatusIcon = (status: TimelineStatus = "completed") => {
    switch (status) {
      case "completed":
        return <Check className="h-3 w-3 text-white" />
      case "in-progress":
        return <Package className="h-3 w-3 text-white" />
      case "warning":
        return <AlertTriangle className="h-3 w-3 text-white" />
      case "error":
        return <XCircle className="h-3 w-3 text-white" />
      default:
        return <Clock className="h-3 w-3 text-muted-foreground" />
    }
  }

  const getStatusBadgeClass = (status: TimelineStatus = "completed") => {
    switch (status) {
      case "completed":
        return "bg-emerald-600 ring-4 ring-card text-white shadow-sm"
      case "in-progress":
        return "bg-[#753399] ring-4 ring-[#753399]/20 text-white shadow-lg animate-pulse"
      case "warning":
        return "bg-amber-500 ring-4 ring-card text-white shadow-sm"
      case "error":
        return "bg-rose-500 ring-4 ring-card text-white shadow-sm"
      default:
        return "bg-muted border border-border ring-4 ring-card text-muted-foreground"
    }
  }

  return (
    <div className={cn("relative pl-7 space-y-5 border-l-2 border-border ml-3", className)} {...props}>
      {items.map((item, idx) => {
        const status = item.status || "completed"
        return (
          <div key={item.id || idx} className="relative group">
            <span className={cn("absolute -left-[37px] top-1 flex h-5 w-5 items-center justify-center rounded-full transition-transform group-hover:scale-110", getStatusBadgeClass(status))}>
              {item.icon || getStatusIcon(status)}
            </span>
            <div className={cn("rounded-lg border bg-card p-3.5 space-y-2 transition-all shadow-sm", status === "in-progress" ? "border-[#753399]/50 shadow-md" : "border-border hover:border-[#753399]/30")}>
              <div className="flex items-center justify-between">
                <span className={cn("font-heading text-xs font-bold", status === "in-progress" ? "text-[#753399]" : "text-foreground")}>
                  {item.title}
                </span>
                {item.time && <span className="text-[10px] font-mono text-muted-foreground">{item.time}</span>}
              </div>
              {item.description && <p className="text-[11px] text-muted-foreground leading-relaxed">{item.description}</p>}
              {item.badge && <span className="inline-block rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 text-[10px] font-bold">{item.badge}</span>}
              {item.children}
            </div>
          </div>
        )
      })}
    </div>
  )
}`;
  }

  if (name === 'statistic') {
    return `import * as React from "react"
import { TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

export interface StatisticProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  value: string | number
  trend?: number
  trendLabel?: string
  icon?: React.ReactNode
}

export function Statistic({ title, value, trend, trendLabel, icon, className, ...props }: StatisticProps) {
  const isPositive = trend !== undefined && trend >= 0

  return (
    <div className={cn("rounded-xl border border-border bg-card p-4 space-y-2 shadow-sm", className)} {...props}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-muted-foreground">{title}</span>
        {icon && <div className="p-1 rounded-md bg-muted text-foreground">{icon}</div>}
      </div>
      <h3 className="font-heading text-2xl font-extrabold text-foreground">{value}</h3>
      {trend !== undefined && (
        <div className={cn("flex items-center gap-1 text-[11px] font-bold", isPositive ? "text-emerald-500" : "text-rose-500")}>
          {isPositive ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
          <span>{isPositive ? "+" : ""}{trend}%</span>
          {trendLabel && <span className="text-muted-foreground font-normal ml-1">{trendLabel}</span>}
        </div>
      )}
    </div>
  )
}`;
  }

  if (name === 'radio-group') {
    return `import * as React from "react"
import { cn } from "@/lib/utils"

interface RadioGroupContextType {
  value?: string
  onChange?: (value: string) => void
  name?: string
  disabled?: boolean
}

const RadioGroupContext = React.createContext<RadioGroupContextType | null>(null)

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  name?: string
  disabled?: boolean
}

export function RadioGroup({
  className,
  value: controlledValue,
  defaultValue,
  onValueChange,
  name,
  disabled,
  children,
  ...props
}: RadioGroupProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue || "")
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : uncontrolledValue

  const onChange = React.useCallback(
    (val: string) => {
      if (!isControlled) setUncontrolledValue(val)
      onValueChange?.(val)
    },
    [isControlled, onValueChange]
  )

  return (
    <RadioGroupContext.Provider value={{ value, onChange, name, disabled }}>
      <div role="radiogroup" className={cn("grid gap-2.5", className)} {...props}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  )
}

export interface RadioGroupItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  id?: string
  disabled?: boolean
}

export function RadioGroupItem({
  className,
  value,
  id,
  disabled: itemDisabled,
  children,
  ...props
}: RadioGroupItemProps) {
  const context = React.useContext(RadioGroupContext)
  const isSelected = context?.value === value
  const isDisabled = itemDisabled || context?.disabled

  return (
    <div
      role="radio"
      aria-checked={isSelected}
      aria-disabled={isDisabled}
      id={id}
      onClick={() => {
        if (!isDisabled) context?.onChange?.(value)
      }}
      className={cn(
        "flex items-center gap-3 cursor-pointer select-none text-xs font-medium transition-all",
        isDisabled && "cursor-not-allowed opacity-50",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "h-4 w-4 rounded-full border border-input flex items-center justify-center transition-all",
          isSelected
            ? "border-[#753399] bg-[#753399] text-white shadow-sm shadow-[#753399]/30"
            : "bg-background hover:border-[#753399]/70"
        )}
      >
        {isSelected && <div className="h-1.5 w-1.5 rounded-full bg-white animate-in zoom-in-50 duration-150" />}
      </div>
      {children && <div className="flex-1">{children}</div>}
    </div>
  )
}

export interface RadioGroupCardProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  title: string
  description?: string
  icon?: React.ReactNode
  badge?: string
  disabled?: boolean
}

export function RadioGroupCard({
  className,
  value,
  title,
  description,
  icon,
  badge,
  disabled,
  ...props
}: RadioGroupCardProps) {
  const context = React.useContext(RadioGroupContext)
  const isSelected = context?.value === value
  const isDisabled = disabled || context?.disabled

  return (
    <div
      onClick={() => {
        if (!isDisabled) context?.onChange?.(value)
      }}
      className={cn(
        "relative flex cursor-pointer items-start gap-4 rounded-xl border p-4 shadow-sm transition-all",
        isSelected
          ? "border-[#753399] bg-[#753399]/5 ring-1 ring-[#753399] dark:bg-[#753399]/10"
          : "border-border bg-card hover:border-[#753399]/40 hover:bg-muted/30",
        isDisabled && "cursor-not-allowed opacity-50",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "mt-0.5 h-4 w-4 shrink-0 rounded-full border flex items-center justify-center transition-all",
          isSelected
            ? "border-[#753399] bg-[#753399]"
            : "border-input bg-background"
        )}
      >
        {isSelected && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {icon && <span className="text-[#753399]">{icon}</span>}
            <span className="font-heading text-xs font-bold text-foreground">{title}</span>
          </div>
          {badge && (
            <span className="rounded-full bg-[#753399]/15 px-2 py-0.5 text-[10px] font-bold text-[#753399] dark:text-purple-300">
              {badge}
            </span>
          )}
        </div>
        {description && <p className="text-[11px] text-muted-foreground leading-relaxed">{description}</p>}
      </div>
    </div>
  )
}`;
  }

  if (name === 'slider') {
    return `import * as React from "react"
import { cn } from "@/lib/utils"

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  showValue?: boolean
  valuePrefix?: string
  valueSuffix?: string
  onValueChange?: (value: number) => void
}

export function Slider({
  className,
  value: controlledValue,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  showValue = true,
  valuePrefix = "",
  valueSuffix = "",
  onValueChange,
  disabled,
  ...props
}: SliderProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue)
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : uncontrolledValue
  const percentage = Math.min(Math.max(((value - min) / (max - min)) * 100, 0), 100)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value)
    if (!isControlled) setUncontrolledValue(val)
    onValueChange?.(val)
  }

  return (
    <div className={cn("w-full space-y-2 select-none", className)}>
      <div className="relative flex items-center">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          onChange={handleChange}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed z-10"
          {...props}
        />
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-[#753399] transition-all"
            style={{ width: percentage + "%" }}
          />
        </div>
        <div
          className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#753399] bg-background shadow-md transition-all ring-offset-background"
          style={{ left: percentage + "%" }}
        />
      </div>
      <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
        <span>{valuePrefix}{min}{valueSuffix}</span>
        {showValue && (
          <span className="font-bold text-[#753399] bg-[#753399]/10 px-2 py-0.5 rounded">
            {valuePrefix}{value}{valueSuffix}
          </span>
        )}
        <span>{valuePrefix}{max}{valueSuffix}</span>
      </div>
    </div>
  )
}`;
  }

  if (name === 'date-picker') {
    return `import * as React from "react"
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface DatePickerProps {
  value?: Date | null
  defaultValue?: Date | null
  onValueChange?: (date: Date | null) => void
  placeholder?: string
  disabled?: boolean
  label?: string
  className?: string
}

export function DatePicker({
  value: controlledValue,
  defaultValue = null,
  onValueChange,
  placeholder = "Selecione uma data...",
  disabled,
  label,
  className
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [uncontrolledValue, setUncontrolledValue] = React.useState<Date | null>(defaultValue)
  const isControlled = controlledValue !== undefined
  const selectedDate = isControlled ? controlledValue : uncontrolledValue

  const [currentMonth, setCurrentMonth] = React.useState<Date>(selectedDate || new Date())
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelect = (date: Date) => {
    if (!isControlled) setUncontrolledValue(date)
    onValueChange?.(date)
    setOpen(false)
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isControlled) setUncontrolledValue(null)
    onValueChange?.(null)
  }

  const formatDate = (d: Date | null) => {
    if (!d) return ""
    const day = String(d.getDate()).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const year = d.getFullYear()
    return day + "/" + month + "/" + year
  }

  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()
  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ]

  const firstDay = new Date(year, month, 1).getDay()
  const totalDays = new Date(year, month + 1, 0).getDate()

  return (
    <div ref={containerRef} className={cn("relative w-full text-left space-y-1.5", className)}>
      {label && <label className="block text-xs font-semibold text-foreground">{label}</label>}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen(!open)}
        className={cn(
          "flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-xs shadow-sm transition-colors hover:border-[#753399] focus:outline-none focus:ring-1 focus:ring-[#753399]",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        <span className={cn("flex items-center gap-2", !selectedDate && "text-muted-foreground")}>
          <CalendarIcon className="h-4 w-4 text-[#753399]" />
          {selectedDate ? formatDate(selectedDate) : placeholder}
        </span>
        {selectedDate && (
          <span onClick={handleClear} className="rounded p-0.5 hover:bg-muted text-muted-foreground hover:text-foreground">
            <X className="h-3 w-3" />
          </span>
        )}
      </button>

      {open && (
        <div className="absolute left-0 z-50 mt-1 w-64 rounded-xl border border-border bg-card p-3 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-150">
          <div className="flex items-center justify-between border-b border-border pb-2 mb-2">
            <button
              type="button"
              onClick={() => setCurrentMonth(new Date(year, month - 1, 1))}
              className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <span className="font-heading text-xs font-bold text-foreground">
              {monthNames[month]} {year}
            </span>
            <button
              type="button"
              onClick={() => setCurrentMonth(new Date(year, month + 1, 1))}
              className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-muted-foreground mb-1">
            <span>D</span><span>S</span><span>T</span><span>Q</span><span>Q</span><span>S</span><span>S</span>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={"empty-" + i} />
            ))}
            {Array.from({ length: totalDays }).map((_, i) => {
              const day = i + 1
              const date = new Date(year, month, day)
              const isSelected =
                selectedDate &&
                date.getDate() === selectedDate.getDate() &&
                date.getMonth() === selectedDate.getMonth() &&
                date.getFullYear() === selectedDate.getFullYear()
              const isToday =
                new Date().getDate() === day &&
                new Date().getMonth() === month &&
                new Date().getFullYear() === year

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleSelect(date)}
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-md text-xs transition-colors",
                    isSelected
                      ? "bg-[#753399] font-bold text-white shadow-sm"
                      : "hover:bg-muted text-foreground",
                    isToday && !isSelected && "border border-[#753399] text-[#753399] font-bold"
                  )}
                >
                  {day}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}`;
  }

  if (name === 'lookup') {
    return `import * as React from "react"
import { Search, X, Check, Table as TableIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export interface LookupItem {
  id: string | number
  code: string
  label: string
  subtitle?: string
  tag?: string
}

export interface LookupProps {
  label?: string
  placeholder?: string
  title?: string
  value?: LookupItem | null
  items: LookupItem[]
  onSelect?: (item: LookupItem | null) => void
  disabled?: boolean
  className?: string
}

export function Lookup({
  label,
  placeholder = "Clique para buscar registro...",
  title = "Buscar Registro Corporativo",
  value,
  items = [],
  onSelect,
  disabled,
  className
}: LookupProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")

  const filtered = items.filter(
    (item) =>
      item.code.toLowerCase().includes(search.toLowerCase()) ||
      item.label.toLowerCase().includes(search.toLowerCase()) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(search.toLowerCase()))
  )

  const handleChoose = (item: LookupItem) => {
    onSelect?.(item)
    setOpen(false)
    setSearch("")
  }

  return (
    <div className={cn("w-full space-y-1.5 text-left", className)}>
      {label && <label className="block text-xs font-semibold text-foreground">{label}</label>}
      <div className="relative flex items-center">
        <button
          type="button"
          disabled={disabled}
          onClick={() => setOpen(true)}
          className={cn(
            "flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 text-xs shadow-sm transition-colors hover:border-[#753399] focus:outline-none focus:ring-1 focus:ring-[#753399]",
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          {value ? (
            <span className="flex items-center gap-2 font-medium text-foreground">
              <span className="font-mono text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground">{value.code}</span>
              <span>{value.label}</span>
            </span>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          <span className="flex items-center gap-1.5 text-[#753399]">
            <Search className="h-3.5 w-3.5" />
          </span>
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onSelect?.(null)}
            className="absolute right-8 text-muted-foreground hover:text-foreground p-1"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in-0 duration-150">
          <div className="relative w-full max-w-xl rounded-2xl border border-border bg-card shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-border bg-muted/40 px-5 py-3.5">
              <div className="flex items-center gap-2">
                <TableIcon className="h-4 w-4 text-[#753399]" />
                <h3 className="font-heading text-sm font-bold text-foreground">{title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-sm opacity-70 hover:opacity-100 p-1"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-4 space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Pesquise por código, razão social ou filial..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-background pl-9 pr-3 text-xs shadow-sm focus:border-[#753399] focus:outline-none focus:ring-1 focus:ring-[#753399]"
                />
              </div>

              <div className="max-h-60 overflow-y-auto rounded-lg border border-border divide-y divide-border/60">
                {filtered.length === 0 ? (
                  <div className="p-6 text-center text-xs text-muted-foreground">
                    Nenhum registro correspondente encontrado.
                  </div>
                ) : (
                  filtered.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleChoose(item)}
                      className={cn(
                        "flex items-center justify-between p-3 text-xs cursor-pointer hover:bg-muted/50 transition-colors",
                        value?.id === item.id && "bg-[#753399]/10 font-semibold"
                      )}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[11px] text-[#753399] font-bold">{item.code}</span>
                          <span className="text-foreground">{item.label}</span>
                        </div>
                        {item.subtitle && <p className="text-[11px] text-muted-foreground">{item.subtitle}</p>}
                      </div>
                      <div className="flex items-center gap-2">
                        {item.tag && (
                          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                            {item.tag}
                          </span>
                        )}
                        {value?.id === item.id && <Check className="h-4 w-4 text-[#753399]" />}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}`;
  }

  if (name === 'combo') {
    return `import * as React from "react"
import { Check, ChevronsUpDown, Search } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ComboboxOption {
  value: string
  label: string
  hint?: string
}

export interface ComboboxProps {
  options: ComboboxOption[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  label?: string
  disabled?: boolean
  className?: string
}

export function Combobox({
  options = [],
  value,
  onValueChange,
  placeholder = "Selecione uma opção...",
  searchPlaceholder = "Buscar na lista...",
  label,
  disabled,
  className
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const selectedOption = options.find((opt) => opt.value === value)
  const filtered = options.filter(
    (opt) =>
      opt.label.toLowerCase().includes(search.toLowerCase()) ||
      (opt.hint && opt.hint.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div ref={containerRef} className={cn("relative w-full text-left space-y-1.5", className)}>
      {label && <label className="block text-xs font-semibold text-foreground">{label}</label>}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen(!open)}
        className={cn(
          "flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-xs shadow-sm transition-colors hover:border-[#753399] focus:outline-none focus:ring-1 focus:ring-[#753399]",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        <span className={cn(!selectedOption && "text-muted-foreground")}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronsUpDown className="h-3.5 w-3.5 opacity-50" />
      </button>

      {open && (
        <div className="absolute left-0 z-50 mt-1 w-full rounded-xl border border-border bg-card p-1.5 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-100">
          <div className="flex items-center border-b border-border px-2 pb-1.5 mb-1.5">
            <Search className="h-3.5 w-3.5 text-muted-foreground mr-2 shrink-0" />
            <input
              type="text"
              autoFocus
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
          <div className="max-h-48 overflow-y-auto space-y-0.5">
            {filtered.length === 0 ? (
              <div className="p-3 text-center text-xs text-muted-foreground">Nenhuma opção encontrada.</div>
            ) : (
              filtered.map((opt) => (
                <div
                  key={opt.value}
                  onClick={() => {
                    onValueChange?.(opt.value)
                    setOpen(false)
                    setSearch("")
                  }}
                  className={cn(
                    "flex items-center justify-between rounded-md px-2.5 py-1.5 text-xs cursor-pointer select-none transition-colors",
                    value === opt.value
                      ? "bg-[#753399] text-white font-semibold"
                      : "hover:bg-muted text-foreground"
                  )}
                >
                  <div>
                    <span>{opt.label}</span>
                    {opt.hint && (
                      <span className={cn("ml-2 text-[10px]", value === opt.value ? "text-purple-200" : "text-muted-foreground")}>
                        {opt.hint}
                      </span>
                    )}
                  </div>
                  {value === opt.value && <Check className="h-3.5 w-3.5 shrink-0" />}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}`;
  }

  if (name === 'multiselect') {
    return `import * as React from "react"
import { Check, ChevronsUpDown, X, Search } from "lucide-react"
import { cn } from "@/lib/utils"

export interface MultiSelectOption {
  value: string
  label: string
}

export interface MultiSelectProps {
  options: MultiSelectOption[]
  selected?: string[]
  onSelectedChange?: (values: string[]) => void
  placeholder?: string
  label?: string
  disabled?: boolean
  className?: string
}

export function MultiSelect({
  options = [],
  selected = [],
  onSelectedChange,
  placeholder = "Selecione múltiplos itens...",
  label,
  disabled,
  className
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const toggleOption = (val: string) => {
    if (selected.includes(val)) {
      onSelectedChange?.(selected.filter((item) => item !== val))
    } else {
      onSelectedChange?.([...selected, val])
    }
  }

  const removeOption = (e: React.MouseEvent, val: string) => {
    e.stopPropagation()
    onSelectedChange?.(selected.filter((item) => item !== val))
  }

  const filtered = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div ref={containerRef} className={cn("relative w-full text-left space-y-1.5", className)}>
      {label && <label className="block text-xs font-semibold text-foreground">{label}</label>}
      <div
        onClick={() => !disabled && setOpen(!open)}
        className={cn(
          "flex min-h-[38px] w-full flex-wrap items-center gap-1.5 rounded-md border border-input bg-background p-1.5 text-xs shadow-sm transition-colors hover:border-[#753399] cursor-pointer",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        {selected.length === 0 ? (
          <span className="px-1.5 text-muted-foreground">{placeholder}</span>
        ) : (
          selected.map((val) => {
            const opt = options.find((o) => o.value === val)
            return (
              <span
                key={val}
                className="inline-flex items-center gap-1 rounded-md bg-[#753399]/15 px-2 py-0.5 text-xs font-semibold text-[#753399] dark:text-purple-300"
              >
                <span>{opt ? opt.label : val}</span>
                <span
                  onClick={(e) => removeOption(e, val)}
                  className="rounded hover:bg-[#753399]/20 p-0.5"
                >
                  <X className="h-3 w-3" />
                </span>
              </span>
            )
          })
        )}
        <ChevronsUpDown className="ml-auto h-3.5 w-3.5 opacity-50 pr-1" />
      </div>

      {open && (
        <div className="absolute left-0 z-50 mt-1 w-full rounded-xl border border-border bg-card p-1.5 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-100">
          <div className="flex items-center border-b border-border px-2 pb-1.5 mb-1.5">
            <Search className="h-3.5 w-3.5 text-muted-foreground mr-2 shrink-0" />
            <input
              type="text"
              autoFocus
              placeholder="Filtrar opções..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
          <div className="max-h-48 overflow-y-auto space-y-0.5">
            {filtered.length === 0 ? (
              <div className="p-3 text-center text-xs text-muted-foreground">Nenhuma opção encontrada.</div>
            ) : (
              filtered.map((opt) => {
                const isSelected = selected.includes(opt.value)
                return (
                  <div
                    key={opt.value}
                    onClick={() => toggleOption(opt.value)}
                    className={cn(
                      "flex items-center justify-between rounded-md px-2.5 py-1.5 text-xs cursor-pointer select-none transition-colors",
                      isSelected
                        ? "bg-[#753399]/15 text-[#753399] font-bold dark:text-purple-300"
                        : "hover:bg-muted text-foreground"
                    )}
                  >
                    <span>{opt.label}</span>
                    {isSelected && <Check className="h-3.5 w-3.5 text-[#753399]" />}
                  </div>
                )
              })
            )}
          </div>
        </div>
      )}
    </div>
  )
}`;
  }

  if (name === 'badge') {
    return `import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors select-none",
  {
    variants: {
      variant: {
        default: "border-transparent bg-[#753399]/15 text-[#753399] dark:bg-[#753399]/30 dark:text-purple-300",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        success: "border-transparent bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
        warning: "border-transparent bg-amber-500/15 text-amber-600 dark:text-amber-400",
        destructive: "border-transparent bg-rose-500/15 text-rose-600 dark:text-rose-400",
        outline: "text-foreground border border-border bg-card",
        brand: "bg-[#753399] text-white shadow-sm hover:bg-[#622981]",
        ghost: "text-muted-foreground hover:bg-muted"
      },
      size: {
        sm: "px-2 py-0.2 text-[10px]",
        default: "px-2.5 py-0.5 text-xs",
        lg: "px-3.5 py-1 text-sm font-bold"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean
  dotColor?: string
  removable?: boolean
  onRemove?: (e: React.MouseEvent) => void
}

export function Badge({
  className,
  variant,
  size,
  dot = false,
  dotColor,
  removable = false,
  onRemove,
  children,
  ...props
}: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {dot && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full shrink-0",
            dotColor || "bg-current"
          )}
        />
      )}
      <span>{children}</span>
      {removable && (
        <button
          type="button"
          onClick={onRemove}
          className="rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10 ml-0.5"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  )
}

export { badgeVariants }`;
  }

  if (name === 'toast') {
    return `import * as React from "react"
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from "lucide-react"
import { cn } from "@/lib/utils"

export type ToastVariant = "default" | "success" | "destructive" | "warning" | "info"

export interface ToastItem {
  id: string
  title?: string
  description?: string
  variant?: ToastVariant
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

interface ToastContextType {
  toasts: ToastItem[]
  toast: (options: Omit<ToastItem, "id">) => void
  dismiss: (id: string) => void
}

const ToastContext = React.createContext<ToastContextType | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([])

  const toast = React.useCallback((options: Omit<ToastItem, "id">) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast: ToastItem = { ...options, id }
    setToasts((prev) => [...prev, newToast])
  }, [])

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast deve ser utilizado dentro de um <ToastProvider>")
  }
  return context
}

export function ToastViewport({
  toasts,
  onDismiss
}: {
  toasts: ToastItem[]
  onDismiss: (id: string) => void
}) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((t) => (
        <ToastCard key={t.id} item={t} onDismiss={() => onDismiss(t.id)} />
      ))}
    </div>
  )
}

const variantIcons = {
  default: <Info className="h-4 w-4 text-[#753399]" />,
  success: <CheckCircle2 className="h-4 w-4 text-emerald-500" />,
  destructive: <AlertCircle className="h-4 w-4 text-rose-500" />,
  warning: <AlertTriangle className="h-4 w-4 text-amber-500" />,
  info: <Info className="h-4 w-4 text-sky-500" />
}

const variantBorders = {
  default: "border-[#753399]/30 bg-card text-foreground",
  success: "border-emerald-500/30 bg-card text-foreground",
  destructive: "border-rose-500/30 bg-card text-foreground",
  warning: "border-amber-500/30 bg-card text-foreground",
  info: "border-sky-500/30 bg-card text-foreground"
}

export function ToastCard({
  item,
  onDismiss
}: {
  item: ToastItem
  onDismiss: () => void
}) {
  React.useEffect(() => {
    const timer = setTimeout(onDismiss, item.duration || 4000)
    return () => clearTimeout(timer)
  }, [item.duration, onDismiss])

  const variant = item.variant || "default"

  return (
    <div
      className={cn(
        "pointer-events-auto relative flex w-full items-start justify-between gap-3 overflow-hidden rounded-xl border p-4 shadow-2xl animate-in slide-in-from-bottom-4 fade-in duration-200",
        variantBorders[variant]
      )}
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 shrink-0">{variantIcons[variant]}</span>
        <div className="space-y-1">
          {item.title && <h5 className="font-heading text-xs font-bold leading-tight">{item.title}</h5>}
          {item.description && (
            <p className="text-[11px] text-muted-foreground leading-relaxed">{item.description}</p>
          )}
          {item.action && (
            <button
              onClick={item.action.onClick}
              className="mt-1 text-xs font-bold text-[#753399] hover:underline"
            >
              {item.action.label}
            </button>
          )}
        </div>
      </div>
      <button
        onClick={onDismiss}
        className="rounded p-1 text-muted-foreground hover:text-foreground opacity-70 hover:opacity-100"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}`;
  }

  if (name === 'progress') {
    return `import * as React from "react"
import { cn } from "@/lib/utils"

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  variant?: "default" | "success" | "warning" | "destructive" | "info"
  size?: "xs" | "sm" | "default" | "lg" | "xl"
  indeterminate?: boolean
  showValue?: boolean
  label?: string
  indicatorClassName?: string
}

const variantColors = {
  default: "bg-[#753399]",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  destructive: "bg-rose-500",
  info: "bg-sky-500"
}

const sizeHeights = {
  xs: "h-1",
  sm: "h-1.5",
  default: "h-2.5",
  lg: "h-3.5",
  xl: "h-4"
}

export function Progress({
  className,
  value = 0,
  max = 100,
  variant = "default",
  size = "default",
  indeterminate = false,
  showValue = false,
  label,
  indicatorClassName,
  ...props
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  return (
    <div className={cn("w-full space-y-1.5 select-none", className)} {...props}>
      {(label || showValue) && (
        <div className="flex items-center justify-between text-xs font-semibold text-foreground">
          {label && <span>{label}</span>}
          {showValue && !indeterminate && (
            <span className="font-mono text-[11px] text-muted-foreground">{Math.round(percentage)}%</span>
          )}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuemin={0}
        aria-valuemax={max}
        className={cn("relative w-full overflow-hidden rounded-full bg-muted", sizeHeights[size])}
      >
        {indeterminate ? (
          <div
            className={cn(
              "absolute h-full w-1/3 rounded-full animate-[indeterminate_1.5s_infinite_ease-in-out]",
              variantColors[variant],
              indicatorClassName
            )}
          />
        ) : (
          <div
            className={cn("h-full rounded-full transition-all duration-300", variantColors[variant], indicatorClassName)}
            style={{ width: \`\${percentage}%\` }}
          />
        )}
      </div>
    </div>
  )
}`;
  }

  if (name === 'skeleton') {
    return `import * as React from "react"
import { cn } from "@/lib/utils"

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  shape?: "rectangle" | "circle" | "rounded"
}

export function Skeleton({ className, shape = "rounded", ...props }: SkeletonProps) {
  const shapeClass = {
    rectangle: "rounded-none",
    rounded: "rounded-md",
    circle: "rounded-full"
  }[shape]

  return (
    <div
      className={cn("animate-pulse bg-muted/70", shapeClass, className)}
      {...props}
    />
  )
}

export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn("h-3", i === lines - 1 ? "w-2/3" : i === 0 ? "w-full" : "w-5/6")}
        />
      ))}
    </div>
  )
}

export function SkeletonAvatar({ size = "default", className }: { size?: "sm" | "default" | "lg"; className?: string }) {
  const sizeClass = {
    sm: "h-8 w-8",
    default: "h-10 w-10",
    lg: "h-14 w-14"
  }[size]

  return <Skeleton shape="circle" className={cn(sizeClass, "shrink-0", className)} />
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-xl border border-border bg-card p-5 space-y-4 shadow-sm", className)}>
      <div className="flex items-center gap-3">
        <SkeletonAvatar />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-3.5 w-1/3" />
          <Skeleton className="h-2.5 w-1/2" />
        </div>
      </div>
      <SkeletonText lines={3} />
      <div className="flex items-center justify-between pt-2 border-t border-border/50">
        <Skeleton className="h-7 w-20 rounded-md" />
        <Skeleton className="h-7 w-28 rounded-md" />
      </div>
    </div>
  )
}`;
  }

  if (name === 'alert') {
    return `import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from "lucide-react"
import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-xl border p-4 shadow-sm transition-all flex items-start gap-3",
  {
    variants: {
      variant: {
        default: "border-border bg-card text-foreground",
        brand: "border-[#753399]/40 bg-[#753399]/10 text-[#753399] dark:text-purple-300",
        success: "border-emerald-500/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300",
        warning: "border-amber-500/40 bg-amber-500/10 text-amber-800 dark:text-amber-300",
        destructive: "border-rose-500/40 bg-rose-500/10 text-rose-800 dark:text-rose-300",
        info: "border-sky-500/40 bg-sky-500/10 text-sky-800 dark:text-sky-300"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

const alertIcons = {
  default: <Info className="h-5 w-5 shrink-0 text-muted-foreground mt-0.5" />,
  brand: <Info className="h-5 w-5 shrink-0 text-[#753399] dark:text-purple-300 mt-0.5" />,
  success: <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />,
  warning: <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />,
  destructive: <AlertCircle className="h-5 w-5 shrink-0 text-rose-600 dark:text-rose-400 mt-0.5" />,
  info: <Info className="h-5 w-5 shrink-0 text-sky-600 dark:text-sky-400 mt-0.5" />
}

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  icon?: React.ReactNode
  dismissable?: boolean
  onClose?: () => void
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", icon, dismissable = false, onClose, children, ...props }, ref) => {
    return (
      <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props}>
        {icon !== undefined ? icon : alertIcons[variant || "default"]}
        <div className="flex-1 space-y-1">{children}</div>
        {dismissable && (
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-muted-foreground hover:text-foreground opacity-70 hover:opacity-100 transition-opacity"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    )
  }
)
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5 ref={ref} className={cn("font-heading font-bold text-xs leading-none tracking-tight text-foreground", className)} {...props} />
  )
)
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-xs leading-relaxed text-muted-foreground", className)} {...props} />
  )
)
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription, alertVariants }`;
  }

  if (name === 'navbar') {
    return `import * as React from "react"
import { Search, Bell, Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  brand?: React.ReactNode
  links?: Array<{ label: string; href?: string; active?: boolean; onClick?: () => void }>
  actions?: React.ReactNode
  user?: {
    name: string
    role?: string
    avatar?: string
    fallback?: string
    onProfileClick?: () => void
  }
  searchPlaceholder?: string
  onSearchClick?: () => void
}

export function Navbar({
  brand,
  links = [],
  actions,
  user,
  searchPlaceholder = "Buscar no sistema...",
  onSearchClick,
  className,
  children,
  ...props
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false)

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 transition-all",
        className
      )}
      {...props}
    >
      <div className="flex h-14 items-center justify-between px-4 md:px-6 gap-4">
        {/* Brand */}
        <div className="flex items-center gap-6">
          {brand || (
            <div className="flex items-center gap-2 font-heading text-sm font-bold text-foreground cursor-pointer">
              <div className="h-7 w-7 rounded-lg bg-[#753399] text-white flex items-center justify-center font-black text-xs shadow-sm">
                M
              </div>
              <span>Monta<span className="text-[#753399]">UI</span></span>
            </div>
          )}

          {/* Desktop Nav Links */}
          {links.length > 0 && (
            <nav className="hidden md:flex items-center gap-1 text-xs font-medium">
              {links.map((link, idx) => (
                <button
                  key={idx}
                  onClick={link.onClick}
                  className={cn(
                    "rounded-md px-3 py-1.5 transition-colors",
                    link.active
                      ? "bg-[#753399]/10 text-[#753399] font-bold dark:text-purple-300"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          )}
        </div>

        {/* Right Actions & User */}
        <div className="flex items-center gap-2 sm:gap-3">
          {onSearchClick && (
            <button
              onClick={onSearchClick}
              className="hidden sm:flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-2.5 py-1 text-xs text-muted-foreground hover:border-input hover:text-foreground transition-colors"
            >
              <Search className="h-3.5 w-3.5" />
              <span>{searchPlaceholder}</span>
              <kbd className="rounded border border-border bg-background px-1 py-0.2 text-[9px] font-mono">⌘K</kbd>
            </button>
          )}

          {actions}

          {user && (
            <div
              onClick={user.onProfileClick}
              className="flex items-center gap-2 pl-2 border-l border-border cursor-pointer group"
            >
              <div className="h-7 w-7 rounded-full bg-[#753399] text-white flex items-center justify-center font-bold text-xs shadow-sm shrink-0">
                {user.fallback || user.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-xs font-semibold text-foreground leading-none">{user.name}</p>
                {user.role && <p className="text-[10px] text-muted-foreground leading-none mt-0.5">{user.role}</p>}
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition-colors hidden sm:block" />
            </div>
          )}

          {/* Mobile Menu Toggle */}
          {links.length > 0 && (
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileOpen && links.length > 0 && (
        <div className="md:hidden border-t border-border bg-card p-4 space-y-2 animate-in slide-in-from-top-2 duration-150">
          {links.map((link, idx) => (
            <button
              key={idx}
              onClick={() => {
                link.onClick?.()
                setMobileOpen(false)
              }}
              className={cn(
                "w-full text-left rounded-md px-3 py-2 text-xs font-medium transition-colors",
                link.active
                  ? "bg-[#753399]/15 text-[#753399] font-bold dark:text-purple-300"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}`;
  }

  if (name === 'sidebar') {
    return `import * as React from "react"
import { PanelLeftClose, PanelLeft, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarContextType {
  collapsed: boolean
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
  toggle: () => void
}

const SidebarContext = React.createContext<SidebarContextType | null>(null)

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar deve ser utilizado dentro de um <SidebarProvider>")
  }
  return context
}

export function SidebarProvider({
  defaultCollapsed = false,
  children
}: {
  defaultCollapsed?: boolean
  children: React.ReactNode
}) {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed)
  const toggle = React.useCallback(() => setCollapsed(prev => !prev), [])

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed, toggle }}>
      {children}
    </SidebarContext.Provider>
  )
}

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  collapsible?: boolean
}

export function Sidebar({ className, children, ...props }: SidebarProps) {
  const { collapsed } = useSidebar()

  return (
    <aside
      className={cn(
        "flex flex-col justify-between border-r border-border bg-card transition-all duration-300 select-none h-screen",
        collapsed ? "w-16" : "w-64",
        className
      )}
      {...props}
    >
      {children}
    </aside>
  )
}

export function SidebarHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-3.5 border-b border-border flex items-center justify-between", className)} {...props}>
      {children}
    </div>
  )
}

export function SidebarContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex-1 overflow-y-auto p-2 space-y-4", className)} {...props}>
      {children}
    </div>
  )
}

export function SidebarGroup({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("space-y-1", className)} {...props}>
      {children}
    </div>
  )
}

export function SidebarGroupLabel({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  const { collapsed } = useSidebar()
  if (collapsed) return null

  return (
    <p className={cn("px-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80", className)} {...props}>
      {children}
    </p>
  )
}

export interface SidebarItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode
  active?: boolean
  badge?: React.ReactNode
}

export function SidebarItem({
  icon,
  active = false,
  badge,
  children,
  className,
  ...props
}: SidebarItemProps) {
  const { collapsed } = useSidebar()

  return (
    <button
      type="button"
      className={cn(
        "w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs transition-colors",
        active
          ? "bg-[#753399]/15 text-[#753399] font-bold dark:text-purple-300"
          : "text-muted-foreground hover:bg-muted hover:text-foreground font-medium",
        collapsed && "justify-center px-0",
        className
      )}
      title={collapsed && typeof children === "string" ? children : undefined}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {!collapsed && (
        <>
          <span className="truncate flex-1 text-left">{children}</span>
          {badge && <span className="shrink-0">{badge}</span>}
        </>
      )}
    </button>
  )
}

export function SidebarFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-2.5 border-t border-border", className)} {...props}>
      {children}
    </div>
  )
}

export function SidebarTrigger({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { collapsed, toggle } = useSidebar()

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn("rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors", className)}
      {...props}
    >
      {collapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
    </button>
  )
}`;
  }

  if (name === 'field') {
    return `import * as React from "react"
import { cn } from "@/lib/utils"

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  error?: boolean
  disabled?: boolean
}

export function Field({ className, error, disabled, children, ...props }: FieldProps) {
  return (
    <div
      className={cn("space-y-1.5 w-full", disabled && "opacity-60 pointer-events-none", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export interface FieldLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
}

export function FieldLabel({ className, required, children, ...props }: FieldLabelProps) {
  return (
    <label
      className={cn(
        "text-xs font-semibold text-foreground flex items-center gap-1 select-none",
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="text-rose-500 font-bold">*</span>}
    </label>
  )
}

export function FieldDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-[11px] text-muted-foreground leading-relaxed", className)} {...props} />
  )
}

export function FieldError({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  if (!children) return null
  return (
    <p
      role="alert"
      className={cn("text-[11px] font-medium text-rose-600 dark:text-rose-400 flex items-center gap-1 animate-in fade-in-0 duration-150", className)}
      {...props}
    >
      {children}
    </p>
  )
}`;
  }

  if (name === 'form') {
    return `import * as React from "react"
import { cn } from "@/lib/utils"

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {}

export function Form({ className, children, ...props }: FormProps) {
  return (
    <form className={cn("space-y-6 w-full", className)} {...props}>
      {children}
    </form>
  )
}

export function FormHeader({
  title,
  description,
  badge,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  title?: string
  description?: string
  badge?: React.ReactNode
}) {
  return (
    <div className={cn("border-b border-border pb-4 flex items-center justify-between gap-4", className)} {...props}>
      <div className="space-y-1">
        {title && <h3 className="font-heading text-base font-bold text-foreground">{title}</h3>}
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </div>
      {badge}
    </div>
  )
}

export function FormSection({
  title,
  description,
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  title?: string
  description?: string
}) {
  return (
    <div className={cn("space-y-4", className)} {...props}>
      {(title || description) && (
        <div className="space-y-0.5">
          {title && <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{title}</h4>}
          {description && <p className="text-[11px] text-muted-foreground">{description}</p>}
        </div>
      )}
      {children}
    </div>
  )
}

export function FormRow({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 gap-4", className)} {...props}>
      {children}
    </div>
  )
}

export function FormDivider({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) {
  return <hr className={cn("border-border my-6", className)} {...props} />
}

export function FormActions({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center justify-end gap-3 pt-4 border-t border-border", className)} {...props}>
      {children}
    </div>
  )
}`;
  }

  if (name === 'marker') {
    return `import * as React from "react"
import { cn } from "@/lib/utils"

export type MarkerVariant = "brand" | "success" | "warning" | "destructive" | "info"

export interface MarkerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: MarkerVariant
  label?: React.ReactNode
  tooltip?: React.ReactNode
  pulse?: boolean
  size?: "sm" | "default" | "lg"
}

const markerColors: Record<MarkerVariant, { bg: string; pulse: string }> = {
  brand: { bg: "bg-[#753399]", pulse: "bg-[#753399]/30" },
  success: { bg: "bg-emerald-600", pulse: "bg-emerald-500/30" },
  warning: { bg: "bg-amber-500", pulse: "bg-amber-500/30" },
  destructive: { bg: "bg-rose-600", pulse: "bg-rose-500/30" },
  info: { bg: "bg-sky-600", pulse: "bg-sky-500/30" }
}

const markerSizes = {
  sm: "h-5 w-5 text-[10px]",
  default: "h-7 w-7 text-xs",
  lg: "h-9 w-9 text-sm"
}

export function Marker({
  variant = "brand",
  label,
  tooltip,
  pulse = true,
  size = "default",
  className,
  ...props
}: MarkerProps) {
  const [open, setOpen] = React.useState(false)
  const color = markerColors[variant]

  return (
    <div
      className={cn("relative inline-flex flex-col items-center group cursor-pointer select-none", className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      {...props}
    >
      <div className="relative flex items-center justify-center">
        {pulse && <span className={cn("absolute h-full w-full rounded-full animate-ping scale-150", color.pulse)} />}
        <div
          className={cn(
            "relative rounded-full text-white flex items-center justify-center font-bold shadow-lg border-2 border-background transition-transform group-hover:scale-110",
            color.bg,
            markerSizes[size]
          )}
        >
          {label}
        </div>
      </div>

      {tooltip && (open || undefined) && (
        <div className="absolute top-full mt-1 z-30 animate-in fade-in-0 zoom-in-95 duration-150">
          <div className="rounded-lg border border-border bg-card p-2 shadow-xl text-center whitespace-nowrap text-xs">
            {tooltip}
          </div>
        </div>
      )}
    </div>
  )
}`;
  }

  if (name === 'pagination') {
    return `import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {}

export function Pagination({ className, ...props }: PaginationProps) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    >
      {children}
    </nav>
  )
}

export function PaginationContent({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) {
  return (
    <ul className={cn("flex flex-row items-center gap-1", className)} {...props} />
  )
}

export function PaginationItem({ className, ...props }: React.LiHTMLAttributes<HTMLLIElement>) {
  return <li className={cn("", className)} {...props} />
}

export interface PaginationLinkProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean
  size?: "default" | "sm"
}

export function PaginationLink({
  className,
  isActive,
  size = "default",
  ...props
}: PaginationLinkProps) {
  return (
    <button
      type="button"
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#753399]",
        size === "default" ? "h-8 min-w-8 px-3" : "h-7 min-w-7 px-2 text-[11px]",
        isActive
          ? "bg-[#753399] font-bold text-white shadow-sm"
          : "border border-border bg-card text-foreground hover:bg-muted",
        className
      )}
      {...props}
    />
  )
}

export function PaginationPrevious({
  className,
  children = "Anterior",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-8 items-center gap-1 rounded-md border border-border bg-card px-2.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors disabled:opacity-40",
        className
      )}
      {...props}
    >
      <ChevronLeft className="h-3.5 w-3.5" />
      <span>{children}</span>
    </button>
  )
}

export function PaginationNext({
  className,
  children = "Próximo",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-8 items-center gap-1 rounded-md border border-border bg-card px-2.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors disabled:opacity-40",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      <ChevronRight className="h-3.5 w-3.5" />
    </button>
  )
}

export function PaginationEllipsis({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      aria-hidden
      className={cn("flex h-8 w-8 items-center justify-center text-muted-foreground", className)}
      {...props}
    >
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">Mais páginas</span>
    </span>
  )
}`;
  }

  if (name === 'loading') {
    return `import * as React from "react"
import { cn } from "@/lib/utils"

export type LoadingVariant = "spinner" | "dots" | "pulse" | "bars" | "overlay"
export type LoadingSize = "xs" | "sm" | "default" | "lg" | "xl"

export interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: LoadingVariant
  size?: LoadingSize
  text?: string
  fullscreen?: boolean
}

const spinnerSizes: Record<LoadingSize, string> = {
  xs: "h-3.5 w-3.5",
  sm: "h-4 w-4",
  default: "h-6 w-6",
  lg: "h-8 w-8",
  xl: "h-12 w-12"
}

export function Spinner({ className, size = "default", ...props }: React.SVGAttributes<SVGSVGElement> & { size?: LoadingSize }) {
  return (
    <svg
      className={cn("animate-spin text-[#753399]", spinnerSizes[size], className)}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3.5" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  )
}

export function LoadingDots({ className }: { className?: string }) {
  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
      <span className="h-2 w-2 rounded-full bg-[#753399] animate-bounce [animation-delay:-0.3s]" />
      <span className="h-2 w-2 rounded-full bg-[#753399] animate-bounce [animation-delay:-0.15s]" />
      <span className="h-2 w-2 rounded-full bg-[#753399] animate-bounce" />
    </div>
  )
}

export function LoadingBars({ className }: { className?: string }) {
  return (
    <div className={cn("inline-flex items-end gap-1 h-6", className)}>
      <span className="w-1 bg-[#753399] rounded-full animate-pulse h-3" />
      <span className="w-1 bg-[#753399] rounded-full animate-pulse h-6 [animation-delay:0.2s]" />
      <span className="w-1 bg-[#753399] rounded-full animate-pulse h-4 [animation-delay:0.4s]" />
      <span className="w-1 bg-[#753399] rounded-full animate-pulse h-5 [animation-delay:0.1s]" />
    </div>
  )
}

export function LoadingPulse({ className }: { className?: string }) {
  return (
    <div className={cn("relative inline-flex h-6 w-6 items-center justify-center", className)}>
      <span className="absolute h-full w-full animate-ping rounded-full bg-[#753399]/40" />
      <span className="relative h-3 w-3 rounded-full bg-[#753399]" />
    </div>
  )
}

export function LoadingOverlay({
  text = "Carregando dados...",
  subtext,
  className
}: {
  text?: string
  subtext?: string
  className?: string
}) {
  return (
    <div className={cn("absolute inset-0 z-50 flex flex-col items-center justify-center gap-3 bg-card/85 backdrop-blur-sm animate-in fade-in-0 duration-150 select-none", className)}>
      <Spinner size="lg" />
      <div className="text-center space-y-0.5">
        <p className="text-xs font-bold text-foreground">{text}</p>
        {subtext && <p className="text-[10px] text-muted-foreground">{subtext}</p>}
      </div>
    </div>
  )
}

export function Loading({
  variant = "spinner",
  size = "default",
  text,
  fullscreen = false,
  className,
  children,
  ...props
}: LoadingProps) {
  const content = (
    <div className={cn("inline-flex flex-col items-center justify-center gap-2", className)} {...props}>
      {variant === "spinner" && <Spinner size={size} />}
      {variant === "dots" && <LoadingDots />}
      {variant === "bars" && <LoadingBars />}
      {variant === "pulse" && <LoadingPulse />}
      {variant === "overlay" && <LoadingOverlay text={text} />}
      {text && variant !== "overlay" && (
        <span className="text-xs font-medium text-muted-foreground">{text}</span>
      )}
      {children}
    </div>
  )

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in-0">
        {content}
      </div>
    )
  }

  return content
}`;
  }

  return `import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const ${name.replace(/-/g, '')}Variants = cva(
  "relative w-full rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm transition-all",
  {
    variants: {
      variant: {
        default: "border-border bg-card",
        brand: "border-[#753399]/30 bg-[#753399]/5 text-[#753399]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface ${pascal}Props
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof ${name.replace(/-/g, '')}Variants> {}

const ${pascal} = React.forwardRef<HTMLDivElement, ${pascal}Props>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(${name.replace(/-/g, '')}Variants({ variant }), className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
${pascal}.displayName = "${pascal}"

export { ${pascal}, ${name.replace(/-/g, '')}Variants }`;
}

// ==================== 3. EXEMPLO DE USO EM REACT ====================
function getComponentUsage(name) {
  const pascal = formatTitle(name).replace(/\s+/g, '');

  if (name === 'button') {
    return `import { Button } from "@/components/monta-ui/button"
import { Check, Trash2 } from "lucide-react"

export default function ExemploPagina() {
  return (
    <div className="flex flex-wrap gap-3 p-4">
      {/* Botão Primário Monta UI */}
      <Button variant="default" onClick={() => console.log("Salvo!")}>
        <Check className="h-4 w-4" />
        Salvar Registro
      </Button>

      {/* Botão Secundário */}
      <Button variant="secondary">
        Cancelar
      </Button>

      {/* Botão Danger */}
      <Button variant="danger">
        <Trash2 className="h-4 w-4" />
        Excluir
      </Button>
    </div>
  )
}`;
  }

  if (name === 'input') {
    return `import { Input } from "@/components/monta-ui/input"
import { useState } from "react"

export default function Formulario() {
  const [nome, setNome] = useState("")

  return (
    <div className="space-y-4 max-w-sm">
      <Input
        placeholder="Razão Social..."
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        clearable
        onClear={() => setNome("")}
      />
      <Input
        type="password"
        placeholder="Senha de Acesso"
      />
    </div>
  )
}`;
  }

  if (name === 'dialog') {
    return `import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/monta-ui/dialog"
import { Button } from "@/components/monta-ui/button"

export default function ModalExemplo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Abrir Modal</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar Operação</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          Deseja realmente confirmar esta ação no sistema?
        </p>
      </DialogContent>
    </Dialog>
  )
}`;
  }

  if (name === 'table') {
    return `import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/monta-ui/table"

export default function TabelaClientes() {
  const dados = [
    { id: "CLI-1024", nome: "Hospital das Clínicas", status: "Ativo", valor: "R$ 24.500,00" },
    { id: "CLI-1025", nome: "Logística Express S/A", status: "Pendente", valor: "R$ 8.900,00" },
  ]

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Código</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Valor</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dados.map((c) => (
          <TableRow key={c.id}>
            <TableCell className="font-mono">{c.id}</TableCell>
            <TableCell className="font-semibold">{c.nome}</TableCell>
            <TableCell>{c.status}</TableCell>
            <TableCell className="text-right font-mono">{c.valor}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}`;
  }

  if (name === 'chart') {
    return `import { Chart } from "@/components/monta-ui/chart"

// 1. Dados de Faturamento (Barras & Linha/Área)
const dadosVendas = [
  { label: "Jan", value: 85, target: 70 },
  { label: "Fev", value: 92, target: 75 },
  { label: "Mar", value: 110, target: 80 },
  { label: "Abr", value: 98, target: 85 },
  { label: "Mai", value: 130, target: 90 },
  { label: "Jun", value: 145, target: 95 },
]

// 2. Distribuição por Canal (Donut / Rosca)
const canaisVendas = [
  { label: "E-commerce Web", value: 576, color: "#753399" },
  { label: "Lojas Físicas", value: 384, color: "#10b981" },
  { label: "Marketplace", value: 192, color: "#f59e0b" },
  { label: "API B2B", value: 128, color: "#3b82f6" },
]

// 3. Desempenho Regional (Ranking Horizontal)
const rankingFiliais = [
  { label: "1. São Paulo (Matriz)", value: 450, color: "#753399" },
  { label: "2. Rio de Janeiro", value: 380, color: "#10b981" },
  { label: "3. Minas Gerais", value: 290, color: "#f59e0b" },
  { label: "4. Paraná", value: 240, color: "#3b82f6" },
]

export default function DashboardAnalitico() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {/* 1. Gráfico de Colunas / Barras */}
      <Chart
        type="bar"
        title="Faturamento Semestral vs Meta"
        description="Valores em R$ mil"
        data={dadosVendas}
        color="#753399"
      />

      {/* 2. Gráfico de Área / Linha SVG */}
      <Chart
        type="area"
        title="Evolução de Requisições / Tráfego"
        description="Chamadas por hora em milhares"
        data={dadosVendas}
        color="#753399"
      />

      {/* 3. Gráfico de Rosca / Donut */}
      <Chart
        type="donut"
        title="Canais de Venda"
        description="Participação no faturamento total"
        data={canaisVendas}
      />

      {/* 4. Gráfico de Barras Horizontais / Ranking */}
      <Chart
        type="horizontal-bar"
        title="Ranking por Filial"
        description="Metas orçamentárias atingidas no Q3"
        data={rankingFiliais}
      />
    </div>
  )
}`;
  }

  if (name === 'stepper') {
    return `import { Stepper } from "@/components/monta-ui/stepper"
import { useState } from "react"

const etapas = [
  { title: "Cadastro" },
  { title: "Endereço" },
  { title: "Pagamento" },
  { title: "Revisão" },
]

export default function WizardFluxo() {
  const [etapaAtual, setEtapaAtual] = useState(2)

  return (
    <Stepper
      steps={etapas}
      currentStep={etapaAtual}
      onStepChange={(novaEtapa) => setEtapaAtual(novaEtapa)}
    />
  )
}`;
  }

  if (name === 'statistic') {
    return `import { Statistic } from "@/components/monta-ui/statistic"

export default function MetricasGerais() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Statistic
        title="MRR Total"
        value="R$ 482.900"
        trend={14.8}
        trendLabel="vs mês anterior"
      />
      <Statistic
        title="NPS Corporativo"
        value="89 / 100"
      />
      <Statistic
        title="SLA Atendimento"
        value="99.4%"
        trend={2.1}
      />
    </div>
  )
}`;
  }

  if (name === 'timeline') {
    return `import { Timeline } from "@/components/monta-ui/timeline"

const auditoriaEventos = [
  {
    title: "Pedido Criado via API",
    description: "Payload JSON recebido de ERP Monta UI. 42 itens incluídos.",
    time: "09:15 · 31/08",
    status: "completed"
  },
  {
    title: "Pagamento R$ 38.450 Confirmado",
    description: "Conciliação automática via PIX Banco Itaú.",
    time: "10:42 · 31/08",
    badge: "NF-e #48910 Aprovada",
    status: "completed"
  },
  {
    title: "Separação em Andamento no CD-01",
    description: "Operador realizando leitura de código de barras das caixas.",
    time: "14:00 (Agora)",
    status: "in-progress"
  },
  {
    title: "Coleta pela Transportadora",
    description: "Caminhão de rota agendado para entrega expressa.",
    time: "Previsão 17:30",
    status: "pending"
  }
]

export default function RastreamentoPedido() {
  return (
    <div className="p-6 max-w-lg">
      <Timeline items={auditoriaEventos} />
    </div>
  )
}`;
  }

  if (name === 'dropdown-menu') {
    return `import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@/components/monta-ui/dropdown-menu"
import { Button } from "@/components/monta-ui/button"

export default function MenuUsuario() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">Opções da Conta</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem>
          Perfil Corporativo
          <DropdownMenuShortcut>Ctrl+P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Faturamento
          <DropdownMenuShortcut>Ctrl+B</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-rose-500">
          Encerrar Sessão
          <DropdownMenuShortcut>Ctrl+Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`;
  }

  if (name === 'context-menu') {
    return `import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from "@/components/monta-ui/context-menu"

export default function DocumentoItem() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-full items-center justify-center rounded-xl border border-dashed text-xs text-muted-foreground">
        Clique com o Botão Direito Aqui
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuItem>Copiar Link</ContextMenuItem>
        <ContextMenuItem>Duplicar Arquivo</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem className="text-rose-500">Excluir</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}`;
  }

  if (name === 'menubar') {
    return `import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from "@/components/monta-ui/menubar"

export default function BarraSuperior() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Arquivo</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Novo Arquivo</MenubarItem>
          <MenubarItem>Abrir...</MenubarItem>
          <MenubarItem>Salvar</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Editar</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Desfazer</MenubarItem>
          <MenubarItem>Refazer</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}`;
  }

  if (name === 'navigation-menu') {
    return `import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/monta-ui/navigation-menu"

export default function TopbarHeader() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Soluções</NavigationMenuTrigger>
          <NavigationMenuContent className="p-4 md:w-[400px]">
            <div className="grid gap-3">
              <NavigationMenuLink href="/core" className="block select-none space-y-1 rounded-md p-3 hover:bg-muted">
                <div className="text-sm font-bold">Monta UI Core</div>
                <p className="text-xs text-muted-foreground">27 componentes corporativos prontos para uso.</p>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}`;
  }

  if (name === 'radio-group') {
    return `import React, { useState } from "react"
import { RadioGroup, RadioGroupCard } from "@/components/monta-ui/radio-group"

export default function PlanSelection() {
  const [plan, setPlan] = useState("enterprise")

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <h3 className="font-heading font-bold text-sm">Selecione seu Plano</h3>
      <RadioGroup value={plan} onValueChange={setPlan}>
        <RadioGroupCard
          value="enterprise"
          title="Enterprise Dedicado"
          description="SLA 99.9%, instâncias dedicadas e suporte 24/7."
          badge="Recomendado"
        />
        <RadioGroupCard
          value="business"
          title="Business Cloud"
          description="Até 50 usuários simultâneos com backups automáticos."
        />
      </RadioGroup>
    </div>
  )
}`;
  }

  if (name === 'slider') {
    return `import React, { useState } from "react"
import { Slider } from "@/components/monta-ui/slider"

export default function CreditForm() {
  const [credit, setCredit] = useState(45000)

  return (
    <div className="max-w-md mx-auto p-6 rounded-xl border bg-card space-y-4">
      <h4 className="font-heading font-bold text-sm">Limite de Crédito Aprovado</h4>
      <Slider
        min={0}
        max={100000}
        step={1000}
        value={credit}
        onValueChange={setCredit}
        valuePrefix="R$ "
      />
    </div>
  )
}`;
  }

  if (name === 'date-picker') {
    return `import React, { useState } from "react"
import { DatePicker } from "@/components/monta-ui/date-picker"

export default function InvoiceForm() {
  const [dueDate, setDueDate] = useState<Date | null>(new Date())

  return (
    <div className="max-w-sm mx-auto p-4 space-y-3">
      <DatePicker
        label="Data de Vencimento da NF-e"
        value={dueDate}
        onValueChange={setDueDate}
        placeholder="Selecione a data..."
      />
    </div>
  )
}`;
  }

  if (name === 'lookup') {
    return `import React, { useState } from "react"
import { Lookup, type LookupItem } from "@/components/monta-ui/lookup"

const clients: LookupItem[] = [
  { id: "1", code: "CLI-101", label: "Petrobras Petróleo Brasileiro S/A", subtitle: "Rio de Janeiro - RJ", tag: "VIP" },
  { id: "2", code: "CLI-102", label: "Vale S/A Mineração & Logística", subtitle: "Nova Lima - MG", tag: "Ativo" },
  { id: "3", code: "CLI-103", label: "Ambev Brasil Bebidas S/A", subtitle: "São Paulo - SP", tag: "Ativo" },
]

export default function ClientSelector() {
  const [selected, setSelected] = useState<LookupItem | null>(clients[1])

  return (
    <div className="max-w-md mx-auto p-4 space-y-3">
      <Lookup
        label="Cliente / Parceiro Comercial"
        title="Consulta de Clientes"
        items={clients}
        value={selected}
        onSelect={setSelected}
        placeholder="Buscar cliente..."
      />
    </div>
  )
}`;
  }

  if (name === 'combo') {
    return `import React, { useState } from "react"
import { Combobox, type ComboboxOption } from "@/components/monta-ui/combo"

const departments: ComboboxOption[] = [
  { value: "ti", label: "Tecnologia da Informação", hint: "CC-0101" },
  { value: "fin", label: "Controladoria & Finanças", hint: "CC-0102" },
  { value: "rh", label: "Recursos Humanos & D.O.", hint: "CC-0103" },
]

export default function DeptSelector() {
  const [dept, setDept] = useState("ti")

  return (
    <div className="max-w-sm mx-auto p-4 space-y-3">
      <Combobox
        label="Centro de Custo / Departamento"
        options={departments}
        value={dept}
        onValueChange={setDept}
        placeholder="Selecione o departamento..."
        searchPlaceholder="Buscar departamento..."
      />
    </div>
  )
}`;
  }

  if (name === 'multiselect') {
    return `import React, { useState } from "react"
import { MultiSelect, type MultiSelectOption } from "@/components/monta-ui/multiselect"

const permissions: MultiSelectOption[] = [
  { value: "read_nfe", label: "Consulta NF-e" },
  { value: "emit_nfe", label: "Emissão NF-e" },
  { value: "cancel_nfe", label: "Cancelamento" },
  { value: "audit_logs", label: "Auditoria de Logs" },
]

export default function UserPermissions() {
  const [roles, setRoles] = useState<string[]>(["read_nfe", "emit_nfe"])

  return (
    <div className="max-w-md mx-auto p-4 space-y-3">
      <MultiSelect
        label="Permissões de Acesso"
        options={permissions}
        selected={roles}
        onSelectedChange={setRoles}
        placeholder="Selecione as permissões..."
      />
    </div>
  )
}`;
  }

  if (name === 'badge') {
    return `import { Badge } from "@/components/monta-ui/badge"

export default function StatusBadges() {
  return (
    <div className="flex flex-wrap gap-2 p-4">
      {/* Variantes Semânticas */}
      <Badge variant="default">Primary</Badge>
      <Badge variant="success">Homologado</Badge>
      <Badge variant="warning">Em Análise</Badge>
      <Badge variant="destructive">Reprovado</Badge>
      <Badge variant="outline">Neutro</Badge>

      {/* Com Ponto de Status Pulsante */}
      <Badge variant="outline" dot dotColor="bg-emerald-500">
        Servidor Online
      </Badge>

      {/* Tag Removível */}
      <Badge variant="default" removable onRemove={() => console.log("Removido!")}>
        Filtro: São Paulo
      </Badge>
    </div>
  )
}`;
  }

  if (name === 'toast') {
    return `import { useToast } from "@/components/monta-ui/toast"
import { Button } from "@/components/monta-ui/button"

export default function SalvarCliente() {
  const { toast } = useToast()

  const handleSalvar = () => {
    toast({
      title: "Alterações Salvas",
      description: "O cadastro do cliente foi atualizado no banco de dados.",
      variant: "success",
      duration: 5000,
      action: {
        label: "Desfazer",
        onClick: () => console.log("Desfeito!")
      }
    })
  }

  return (
    <div className="p-4">
      <Button onClick={handleSalvar}>Salvar Dados</Button>
    </div>
  )
}`;
  }

  if (name === 'progress') {
    return `import React, { useState } from "react"
import { Progress } from "@/components/monta-ui/progress"
import { Button } from "@/components/monta-ui/button"

export default function FileUpload() {
  const [progress, setProgress] = useState(65)

  return (
    <div className="max-w-md mx-auto p-6 rounded-xl border bg-card space-y-4">
      {/* Barra com Label e % */}
      <Progress
        label="Processamento de Remessa CNAB"
        value={progress}
        max={100}
        showValue
        variant="default"
        size="default"
      />

      {/* Barra de Sucesso */}
      <Progress value={100} variant="success" size="sm" />

      {/* Barra Indeterminate (Loading Infinito) */}
      <Progress indeterminate variant="default" size="xs" />

      <div className="flex gap-2 pt-2">
        <Button size="sm" onClick={() => setProgress(p => Math.min(p + 10, 100))}>+10%</Button>
        <Button size="sm" variant="secondary" onClick={() => setProgress(0)}>Resetar</Button>
      </div>
    </div>
  )
}`;
  }

  if (name === 'skeleton') {
    return `import { Skeleton, SkeletonAvatar, SkeletonText, SkeletonCard } from "@/components/monta-ui/skeleton"

export default function LoadingDashboard({ isLoading }: { isLoading: boolean }) {
  if (isLoading) {
    return (
      <div className="space-y-4 max-w-md p-4">
        {/* Card Completo Pré-estruturado */}
        <SkeletonCard />

        {/* Blocos Individuais */}
        <div className="flex items-center gap-3">
          <SkeletonAvatar size="default" />
          <div className="space-y-1.5 flex-1">
            <Skeleton className="h-3.5 w-1/3" />
            <Skeleton className="h-2.5 w-1/2" />
          </div>
        </div>
        <SkeletonText lines={4} />
      </div>
    )
  }

  return <div>Conteúdo carregado!</div>
}`;
  }

  if (name === 'alert') {
    return `import { Alert, AlertTitle, AlertDescription } from "@/components/monta-ui/alert"

export default function NotificacoesPainel() {
  return (
    <div className="space-y-3 max-w-lg p-4">
      {/* Alerta de Sucesso */}
      <Alert variant="success" dismissable onClose={() => console.log("Fechado")}>
        <AlertTitle>Nota Fiscal Emitida</AlertTitle>
        <AlertDescription>O lote 4920 foi processado e autorizado com sucesso pela SEFAZ.</AlertDescription>
      </Alert>

      {/* Alerta de Atenção */}
      <Alert variant="warning">
        <AlertTitle>Certificado A1</AlertTitle>
        <AlertDescription>Expira em 5 dias. Renove para evitar interrupções no faturamento.</AlertDescription>
      </Alert>

      {/* Alerta de Erro */}
      <Alert variant="destructive">
        <AlertTitle>Falha de Conexão</AlertTitle>
        <AlertDescription>Não foi possível sincronizar o inventário com a filial Rio de Janeiro.</AlertDescription>
      </Alert>
    </div>
  )
}`;
  }

  if (name === 'navbar') {
    return `import { Navbar } from "@/components/monta-ui/navbar"
import { Button } from "@/components/monta-ui/button"

const navLinks = [
  { label: "Dashboard", href: "/dashboard", active: true },
  { label: "Clientes", href: "/clientes" },
  { label: "Faturamento", href: "/faturamento" },
  { label: "Relatórios", href: "/relatorios" },
]

export default function TopHeader() {
  return (
    <Navbar
      links={navLinks}
      searchPlaceholder="Buscar no sistema (⌘K)..."
      onSearchClick={() => console.log("Abrir busca...")}
      user={{
        name: "Monta UI",
        role: "Administrador",
        fallback: "MU",
        onProfileClick: () => console.log("Abrir perfil...")
      }}
      actions={
        <Button size="sm" onClick={() => console.log("Novo Registro")}>
          + Novo Registro
        </Button>
      }
    />
  )
}`;
  }

  if (name === 'sidebar') {
    return `import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarItem,
  SidebarFooter,
  SidebarTrigger,
  useSidebar
} from "@/components/monta-ui/sidebar"
import { LayoutDashboard, ShoppingCart, Users, CreditCard, BarChart2 } from "lucide-react"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultCollapsed={false}>
      <div className="flex h-screen w-full">
        <Sidebar>
          {/* Cabeçalho */}
          <SidebarHeader>
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-[#753399] text-white flex items-center justify-center font-bold text-xs">M</div>
              <span className="font-bold text-sm">Monta Tech</span>
            </div>
            <SidebarTrigger />
          </SidebarHeader>

          {/* Links e Grupos */}
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Plataforma</SidebarGroupLabel>
              <SidebarItem icon={<LayoutDashboard className="h-4 w-4" />} active>
                Dashboard
              </SidebarItem>
              <SidebarItem
                icon={<ShoppingCart className="h-4 w-4" />}
                badge={<span className="rounded bg-emerald-500/15 px-1.5 py-0.2 text-[9px] font-bold text-emerald-600">Novo</span>}
              >
                Vendas & NF-e
              </SidebarItem>
              <SidebarItem icon={<Users className="h-4 w-4" />}>
                Clientes
              </SidebarItem>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Finanças</SidebarGroupLabel>
              <SidebarItem icon={<CreditCard className="h-4 w-4" />}>
                Contas a Pagar
              </SidebarItem>
              <SidebarItem icon={<BarChart2 className="h-4 w-4" />}>
                Relatórios DRE
              </SidebarItem>
            </SidebarGroup>
          </SidebarContent>

          {/* Rodapé com Usuário */}
          <SidebarFooter>
            <div className="flex items-center gap-2.5 p-1">
              <div className="h-7 w-7 rounded-full bg-[#753399] text-white flex items-center justify-center font-bold text-xs">MU</div>
              <div className="space-y-0.5 text-left">
                <p className="text-xs font-bold leading-none">Monta UI</p>
                <p className="text-[10px] text-muted-foreground leading-none">admin@montaui.com.br</p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Conteúdo Principal */}
        <main className="flex-1 overflow-y-auto p-6 bg-muted/20">
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}`;
  }

  if (name === 'field') {
    return `import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/monta-ui/field"
import { Input } from "@/components/monta-ui/input"
import { useState } from "react"

export default function CadastroCliente() {
  const [cnpj, setCnpj] = useState("")
  const [error, setError] = useState("CNPJ inválido ou não cadastrado.")

  return (
    <div className="space-y-4 max-w-sm p-4">
      {/* Campo Padrão com Dica */}
      <Field>
        <FieldLabel required>Razão Social</FieldLabel>
        <Input placeholder="Monta Tech S/A" />
        <FieldDescription>Nome empresarial oficial conforme cartão CNPJ.</FieldDescription>
      </Field>

      {/* Campo com Estado de Erro */}
      <Field error={!!error}>
        <FieldLabel required>CNPJ da Empresa</FieldLabel>
        <Input
          placeholder="00.000.000/0000-00"
          value={cnpj}
          onChange={(e) => setCnpj(e.target.value)}
        />
        <FieldError>{error}</FieldError>
      </Field>
    </div>
  )
}`;
  }

  if (name === 'form') {
    return `import {
  Form,
  FormHeader,
  FormSection,
  FormRow,
  FormDivider,
  FormActions
} from "@/components/monta-ui/form"
import { Field, FieldLabel } from "@/components/monta-ui/field"
import { Input } from "@/components/monta-ui/input"
import { Button } from "@/components/monta-ui/button"

export default function CadastroFornecedor() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Formulário enviado com sucesso!")
  }

  return (
    <Form onSubmit={handleSubmit} className="max-w-lg p-6 border rounded-xl bg-card shadow-sm">
      <FormHeader
        title="Cadastro de Fornecedor"
        description="Preencha os dados cadastrais da empresa."
      />

      <FormSection title="1. Identificação Fiscal">
        <FormRow>
          <Field>
            <FieldLabel required>Razão Social</FieldLabel>
            <Input required placeholder="Alpha Logística Ltda" />
          </Field>
          <Field>
            <FieldLabel required>CNPJ</FieldLabel>
            <Input required placeholder="00.000.000/0000-00" />
          </Field>
        </FormRow>

        <FormRow>
          <Field>
            <FieldLabel required>E-mail Financeiro</FieldLabel>
            <Input required type="email" placeholder="financeiro@empresa.com" />
          </Field>
          <Field>
            <FieldLabel>Telefone</FieldLabel>
            <Input placeholder="(11) 99999-9999" />
          </Field>
        </FormRow>
      </FormSection>

      <FormActions>
        <Button variant="secondary" type="button">Cancelar</Button>
        <Button type="submit">Salvar Cadastro</Button>
      </FormActions>
    </Form>
  )
}`;
  }

  if (name === 'marker') {
    return `import { Marker } from "@/components/monta-ui/marker"

export default function MapaOperacoes() {
  return (
    <div className="relative h-64 w-full rounded-xl border bg-muted/30 flex items-center justify-around p-6">
      {/* Marcador Primário */}
      <Marker
        variant="brand"
        label="1"
        pulse
        tooltip={
          <div>
            <p className="font-bold">Matriz São Paulo</p>
            <p className="text-emerald-500 font-semibold">● Operação Normal</p>
          </div>
        }
      />

      {/* Marcador Sucesso */}
      <Marker
        variant="success"
        label="2"
        pulse
        tooltip={
          <div>
            <p className="font-bold">CD Rio de Janeiro</p>
            <p className="text-emerald-500 font-semibold">● 142 Entregas</p>
          </div>
        }
      />

      {/* Marcador Atenção */}
      <Marker
        variant="warning"
        label="3"
        pulse
        tooltip={
          <div>
            <p className="font-bold">Filial Belo Horizonte</p>
            <p className="text-amber-500 font-semibold">▲ Manutenção</p>
          </div>
        }
      />
    </div>
  )
}`;
  }

  if (name === 'pagination') {
    return `import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis
} from "@/components/monta-ui/pagination"
import { useState } from "react"

export default function GridPaginada() {
  const [currentPage, setCurrentPage] = useState(3)

  return (
    <div className="space-y-4 p-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            />
          </PaginationItem>
          
          <PaginationItem>
            <PaginationLink isActive={currentPage === 1} onClick={() => setCurrentPage(1)}>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive={currentPage === 2} onClick={() => setCurrentPage(2)}>2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive={currentPage === 3} onClick={() => setCurrentPage(3)}>3</PaginationLink>
          </PaginationItem>
          
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          
          <PaginationItem>
            <PaginationLink isActive={currentPage === 18} onClick={() => setCurrentPage(18)}>18</PaginationLink>
          </PaginationItem>
          
          <PaginationItem>
            <PaginationNext
              onClick={() => setCurrentPage(p => Math.min(18, p + 1))}
              disabled={currentPage === 18}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}`;
  }

  if (name === 'loading') {
    return `import { Loading, Spinner, LoadingOverlay, LoadingDots, LoadingBars } from "@/components/monta-ui/loading"
import { useState } from "react"
import { Button } from "@/components/monta-ui/button"

export default function PainelSincronizacao() {
  const [loading, setLoading] = useState(false)

  const handleSync = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2500)
  }

  return (
    <div className="space-y-6 max-w-lg p-6 border rounded-xl bg-card shadow-sm">
      {/* 1. Spinners Inline e com Texto */}
      <div className="flex items-center gap-4">
        <Loading variant="spinner" size="default" text="Carregando..." />
        <Loading variant="dots" text="Processando..." />
        <Loading variant="bars" text="Otimizando..." />
      </div>

      {/* 2. Botão com Spinner */}
      <Button onClick={handleSync} disabled={loading} className="gap-2">
        {loading && <Spinner size="sm" className="text-white" />}
        <span>{loading ? "Sincronizando..." : "Iniciar Sincronização"}</span>
      </Button>

      {/* 3. Card com Overlay Assíncrono */}
      <div className="relative p-4 border rounded-lg bg-muted/20 min-h-[120px]">
        <h5 className="font-bold text-xs">Dados Financeiros Consolidados</h5>
        <p className="text-xs text-muted-foreground mt-1">Saldo Atual: R$ 420.900,00</p>
        
        {loading && (
          <LoadingOverlay
            text="Consultando SEFAZ..."
            subtext="Aguarde a resposta do servidor"
          />
        )}
      </div>
    </div>
  )
}`;
  }

  return `import { ${pascal} } from "@/components/monta-ui/${name}"

export default function MinhaPagina() {
  return (
    <div className="p-4">
      <${pascal}>
        Conteúdo do componente ${pascal}
      </${pascal}>
    </div>
  )
}`;
}

// ==================== REGISTRY JSON ====================
function getComponentJSON(name) {
  const tsx = getComponentTSX(name);
  const data = {
    name: name,
    type: "registry:ui",
    dependencies: [
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
      "lucide-react"
    ],
    devDependencies: [],
    registryDependencies: [],
    files: [
      {
        path: `ui/${name}.tsx`,
        content: tsx,
        type: "registry:ui",
        target: `components/monta-ui/${name}.tsx`
      }
    ]
  };
  return JSON.stringify(data, null, 2);
}

// ==================== UTILITÁRIOS ====================
function formatTitle(name) {
  return name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function getCategoryForComponent(name) {
  for (const [category, items] of Object.entries(groups)) {
    if (items.includes(name)) return category;
  }
  return 'Componentes';
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#039;',
    '"': '&quot;'
  })[c]);
}

function highlightCode(code, lang) {
  let safe = escapeHTML(code);
  if (lang === 'json') {
    safe = safe.replace(/(&quot;.*?&quot;)(\s*:)/g, '<span class="tok-prop">$1</span>$2');
    safe = safe.replace(/:\s*(&quot;.*?&quot;)/g, ': <span class="tok-str">$1</span>');
    safe = safe.replace(/:\s*(\b\d+\b|true|false|null)/g, ': <span class="tok-num">$1</span>');
  } else {
    // Comentários
    safe = safe.replace(/(\/\/.*$)/gm, '<span class="tok-comm">$1</span>');
    
    // Strings
    safe = safe.replace(/(&quot;.*?&quot;|&#039;.*?&#039;|`[\s\S]*?`)/g, '<span class="tok-str">$1</span>');
    
    // Palavras-chave JavaScript / TypeScript
    const kws = ['import', 'export', 'from', 'const', 'let', 'var', 'function', 'return', 'if', 'else', 'new', 'interface', 'type', 'default', 'as', 'typeof', 'extends'];
    kws.forEach(kw => {
      safe = safe.replace(new RegExp('\\b(' + kw + ')\\b', 'g'), '<span class="tok-kw">$1</span>');
    });

    // Tipos TypeScript
    const types = ['boolean', 'string', 'number', 'void', 'any', 'HTMLButtonElement', 'HTMLInputElement', 'HTMLDivElement', 'ClassValue', 'VariantProps', 'ButtonProps', 'InputProps', 'DialogProps'];
    types.forEach(t => {
      safe = safe.replace(new RegExp('\\b(' + t + ')\\b', 'g'), '<span class="tok-type">$1</span>');
    });

    // Funções e React Hooks
    const builtins = ['React', 'useState', 'useEffect', 'useRef', 'forwardRef', 'Slot', 'cva', 'cn', 'displayName', 'createElement', 'createRef'];
    builtins.forEach(b => {
      safe = safe.replace(new RegExp('\\b(' + b + ')\\b', 'g'), '<span class="tok-fn">$1</span>');
    });

    // Tags JSX (ex: <Button>, <Dialog>, <Input>, <div/>)
    safe = safe.replace(/(&lt;\/?)([A-Z][a-zA-Z0-9\.]*)/g, '$1<span class="tok-tag">$2</span>');

    // Props comuns
    const props = ['className', 'variant', 'size', 'children', 'disabled', 'asChild', 'isLoading', 'fullWidth', 'placeholder', 'onClick', 'onChange', 'value'];
    props.forEach(p => {
      safe = safe.replace(new RegExp('\\b(' + p + ')=', 'g'), '<span class="tok-attr">$1</span>=');
    });
  }
  return safe;
}

function copyText(text, msg = 'Copiado para a área de transferência!') {
  navigator.clipboard.writeText(text).then(() => {
    showToast(msg);
  }).catch(() => {
    showToast('Falha ao copiar.');
  });
}

function copyInstallCmd() {
  const cmd = `pnpm dlx monta-ui add button`;
  copyText(cmd, 'Comando Monta UI copiado!');
  const el = document.getElementById('heroInstallText');
  if (el) {
    const orig = el.textContent;
    el.textContent = 'Copiado!';
    setTimeout(() => el.textContent = orig, 1500);
  }
}

function copyCliCommand() {
  const cmd = document.getElementById('docCliCommand')?.textContent || '';
  copyText(cmd, 'Comando CLI copiado!');
  const text = document.getElementById('copyCliText');
  if (text) {
    text.textContent = 'Copiado!';
    setTimeout(() => text.textContent = 'Copiar', 1500);
  }
}

function copyUsageCode() {
  const code = document.querySelector('#usageSection pre code')?.textContent || '';
  copyText(code, 'Exemplo de uso copiado!');
}

function copyTailwindConfig() {
  const code = document.querySelector('#tailwindDocsView pre:nth-of-type(1) code')?.textContent || '';
  copyText(code, 'Configuração do Tailwind CSS copiada!');
}

function copyGlobalsCSS() {
  const code = document.querySelector('#tailwindDocsView pre:nth-of-type(2) code')?.textContent || '';
  copyText(code, 'Arquivo globals.css copiado!');
}

function downloadFile(filename, content) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  showToast(`Download de ${filename} concluído!`);
}

function showToast(msg) {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const item = document.createElement('div');
  item.className = 'pointer-events-auto flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-3 text-xs font-semibold text-foreground shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-200';
  item.innerHTML = `<span class="flex h-2 w-2 rounded-full bg-brand"></span><span>${escapeHTML(msg)}</span>`;
  container.appendChild(item);
  setTimeout(() => {
    item.remove();
  }, 2400);
}

// ==================== COMMAND PALETTE / BUSCA GLOBAL ====================
let searchResultsData = [];
let selectedSearchIndex = 0;

function openSearchModal() {
  const modal = document.getElementById('searchModal');
  const input = document.getElementById('searchInputModal');
  if (!modal || !input) return;

  modal.classList.remove('hidden');
  input.value = '';
  renderSearchResults('');
  setTimeout(() => input.focus(), 50);
}

function closeSearchModal() {
  const modal = document.getElementById('searchModal');
  if (modal) modal.classList.add('hidden');
}

function getSearchCatalog() {
  const catalog = [
    { title: "Guia de Instalação", category: "Documentação", type: "doc", hash: "#/docs/instalacao", icon: "book-open", desc: "Configuração do Monta UI em 5 passos" },
    { title: "Storybook 8", category: "Documentação", type: "doc", hash: "#/docs/storybook", icon: "book-marked", desc: "Ambiente isolado de testes e histórias" },
    { title: "Tailwind CSS Config", category: "Documentação", type: "doc", hash: "#/docs/tailwind", icon: "palette", desc: "Cores HSL, variáveis CSS e tokens" },
  ];

  for (const [category, items] of Object.entries(groups)) {
    for (const comp of items) {
      catalog.push({
        title: formatTitle(comp),
        id: comp,
        category: category,
        type: "component",
        hash: `#/componente/${comp}`,
        icon: "box",
        desc: descriptions[comp] || "Componente corporativo de alto desempenho."
      });
    }
  }

  return catalog;
}

function renderSearchResults(query = '') {
  const container = document.getElementById('searchResultsList');
  if (!container) return;

  const catalog = getSearchCatalog();
  const q = query.toLowerCase().trim();

  if (!q) {
    searchResultsData = catalog.slice(0, 10);
  } else {
    searchResultsData = catalog.filter(item => {
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchId = (item.id || '').toLowerCase().includes(q);
      const matchCat = item.category.toLowerCase().includes(q);
      const matchDesc = item.desc.toLowerCase().includes(q);
      return matchTitle || matchId || matchCat || matchDesc;
    });
  }

  selectedSearchIndex = 0;

  if (searchResultsData.length === 0) {
    container.innerHTML = `
      <div class="p-6 text-center text-muted-foreground space-y-1">
        <p class="text-xs font-semibold text-foreground">Nenhum resultado encontrado</p>
        <p class="text-[11px]">Tente buscar por termos como <code>button</code>, <code>chart</code>, <code>modal</code> ou <code>instalação</code>.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = searchResultsData.map((item, idx) => `
    <div onclick="selectSearchResult(${idx})" onmouseenter="highlightSearchResult(${idx})" id="searchItem-${idx}" class="search-result-item flex items-center justify-between rounded-xl px-3 py-2 cursor-pointer transition-all ${idx === 0 ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'}">
      <div class="flex items-center gap-3 min-w-0">
        <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
          <i data-lucide="${item.icon}" class="h-4 w-4"></i>
        </div>
        <div class="min-w-0">
          <div class="flex items-center gap-2">
            <span class="font-heading font-bold text-xs text-foreground truncate">${escapeHTML(item.title)}</span>
            <span class="rounded bg-muted px-1.5 py-0.5 text-[9px] font-semibold text-muted-foreground uppercase tracking-wide shrink-0">${escapeHTML(item.category)}</span>
          </div>
          <p class="text-[11px] text-muted-foreground truncate leading-tight">${escapeHTML(item.desc)}</p>
        </div>
      </div>
      <i data-lucide="chevron-right" class="h-3.5 w-3.5 text-muted-foreground opacity-50 shrink-0"></i>
    </div>
  `).join('');

  if (window.lucide) window.lucide.createIcons();
}

function highlightSearchResult(index) {
  selectedSearchIndex = index;
  document.querySelectorAll('.search-result-item').forEach((el, idx) => {
    if (idx === index) {
      el.classList.add('bg-muted', 'text-foreground');
      el.classList.remove('text-muted-foreground');
    } else {
      el.classList.remove('bg-muted', 'text-foreground');
      el.classList.add('text-muted-foreground');
    }
  });
}

function selectSearchResult(index) {
  const item = searchResultsData[index];
  if (!item) return;

  closeSearchModal();
  if (item.type === 'component') {
    openComponentDocs(item.id);
  } else {
    window.location.hash = item.hash;
  }
}

// Event Listeners da Busca
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInputModal');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderSearchResults(e.target.value);
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (selectedSearchIndex < searchResultsData.length - 1) {
          highlightSearchResult(selectedSearchIndex + 1);
          document.getElementById(`searchItem-${selectedSearchIndex}`)?.scrollIntoView({ block: 'nearest' });
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (selectedSearchIndex > 0) {
          highlightSearchResult(selectedSearchIndex - 1);
          document.getElementById(`searchItem-${selectedSearchIndex}`)?.scrollIntoView({ block: 'nearest' });
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        selectSearchResult(selectedSearchIndex);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closeSearchModal();
      }
    });
  }
});

// ==================== EXPORTAÇÃO GLOBAL DE MÉTODOS ====================
if (typeof window !== 'undefined') {
  const _fnMap = {
    openComponentDocs, showHomePage, showInstallationDocs, showTailwindDocs, showStorybookDocs,
    showTemplatesView, selectTemplate, switchTemplateTab, setTemplateViewport, switchDocTab,
    setFilter, toggleTheme, openSearchModal, closeSearchModal, copyCliCommand, switchPkgManager,
    scrollToSection, scrollToCodeSection, handleTemplateLoginSubmit, handleRouting, getTemplateTSX,
    renderTemplate, showToast, copyText, downloadFile,
    toggleTemplatePasswordVisibility, copyInstallCmd, simulateLoading, toggleGroupItem, clearDemoInput,
    togglePassVisibility, openDemoModal, closeDemoModal, toggleAccordionItem, switchTabPane,
    toggleSwitch, switchChartDemoType, selectCalDay, toggleTreeNode, selectTreeFile, jumpToStep,
    prevStepDemo, resetStepperDemo, nextStepDemo, toggleDropdownDemo, toggleContextMenuDirect,
    toggleMenubarMenu, toggleNavMegaMenu, closeAllNavMenus, togglePopoverDemo, selectRadioDemo,
    toggleDatePickerDemo, clearDatePickerDemo, selectDatePreset, navDateMonth, openLookupDemo,
    closeLookupDemo, toggleComboDemo, toggleMultiSelectDemo, removeBadgeChipDemo, resetBadgeChipsDemo,
    showToastDemo, adjustProgressDemo, setProgressDemo, simulateProgressDemo, toggleSkeletonDemo,
    dismissAlertDemo, restoreAlertsDemo, selectNavbarLinkDemo, toggleSidebarCollapseDemo,
    selectSidebarItemDemo, toggleFieldErrorDemo, resetFormDemo, changePaginationDemoPage,
    setPaginationDemoPage, triggerAsyncLoadingDemo, selectCalendarDate, selectLookupItem,
    selectComboOption, removeMultiSelectTag, toggleMultiSelectOption, selectSearchResult,
    copyUsageCode, copyTailwindConfig, copyGlobalsCSS
  };
  Object.keys(_fnMap).forEach(key => {
    try {
      if (typeof _fnMap[key] !== 'undefined') {
        window[key] = _fnMap[key];
      }
    } catch(e) {}
  });
}

// Inicialização segura após declaração de todas as variáveis e mapas
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrapApp);
  } else {
    bootstrapApp();
  }
}
