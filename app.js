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
  "Gradientes Animados": ["animated-gradient"],
  "Text Animations": ["gradient-text", "shimmer-text", "text-reveal"],
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
  "animated-gradient": "Fundo com gradiente em movimento, três paletas, cores personalizadas e controle de pausa. CSS nativo, sem WebGL.",
  "gradient-text": "Texto com cores em movimento para títulos e destaques. Gradiente personalizável com pausa e movimento reduzido.",
  "shimmer-text": "Faixa de brilho que percorre o texto, com controle de cor, duração e pausa.",
  "text-reveal": "Revelação por palavras com entrada suave ou desfoque. Texto acessível, intervalos configuráveis e sem timers.",
  button: "Dispara uma ação ou evento corporativo com variantes primária, secundária, ghost, danger e loading.",
  "button-group": "Agrupa visualmente um conjunto de botões relacionados para ações coordenadas.",
  field: "Container modular de campo com rótulo, indicador obrigatório, dica contextual e mensagem de erro.",
  form: "Estrutura completa de formulário corporativo com seções, linhas responsivas, validação e ações de envio.",
  input: "Campo de entrada de texto flexível com suporte a ícones, senhas, limpeza rápida e estados de foco.",
  dialog: "Janela modal acessível construída com React nativo para confirmações e fluxos sobrepostos.",
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
  window.MontaMotion?.mountGallery(document.getElementById("motionGallery"));

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
  window.MontaMotion?.unmount(document.getElementById('docPreviewStage'));
  document.body.dataset.view = state.view;
  document.getElementById('sidebar')?.classList.remove('is-open');
  document.getElementById('componentMenuToggle')?.setAttribute('aria-expanded', 'false');
  document.querySelectorAll('#primaryNav a').forEach(link => {
    const active = state.view === link.dataset.view;
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  document.getElementById('homeView')?.classList.add('hidden');
  document.getElementById('docsView')?.classList.add('hidden');
  document.getElementById('installationDocsView')?.classList.add('hidden');
  document.getElementById('tailwindDocsView')?.classList.add('hidden');
  document.getElementById('storybookDocsView')?.classList.add('hidden');
  document.getElementById('templatesView')?.classList.add('hidden');
}

function toggleComponentMenu() {
  const open = document.getElementById('sidebar').classList.toggle('is-open');
  document.getElementById('componentMenuToggle').setAttribute('aria-expanded', String(open));
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
                <span>pnpm dlx montaui init</span>
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
            <span>pnpm dlx montaui init</span>
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
      el.textContent = `npx montaui add ${name}`;
      break;
    case 'yarn':
      el.textContent = `yarn dlx montaui add ${name}`;
      break;
    case 'bun':
      el.textContent = `bunx --bun montaui add ${name}`;
      break;
    case 'pnpm':
    default:
      el.textContent = `pnpm dlx montaui add ${name}`;
      break;
  }
}

// ==================== COMPOSIÇÃO & ANATOMIA ====================
function renderComponentComposition(name) {
  const container = document.getElementById('compositionContainer');
  const countBadge = document.getElementById('compositionCountBadge');
  if (!container) return;

  const contract = window.MONTA_REGISTRY?.[name];
  const data = {
    anatomy: contract?.example || '',
    parts: (contract?.exports || []).map(exportName => ({
      name: exportName,
      type: 'React.Component',
      role: `Export nomeado de ${contract.importPath}`,
      props: contract.props.filter(p => p.component === exportName).map(p => p.prop).join(', ') || 'Atributos nativos; consulte o TypeScript.'
    }))
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
    <p class="mb-3 text-xs text-muted-foreground">Props próprias extraídas do TypeScript. * indica obrigatória. Atributos HTML herdados, className, style e ref seguem o tipo do elemento no código. — indica que não há padrão explícito no contrato.</p>
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
function renderComponentApiReference(name) {
  const container = document.getElementById('apiPropsContainer');
  const countBadge = document.getElementById('apiPropsCountBadge');
  if (!container) return;

  const propsList = window.MONTA_REGISTRY?.[name]?.props?.map(p => ({ ...p, prop: `${p.component}.${p.prop}${p.required ? " *" : ""}` })) || [
    { prop: "className", type: "string", default: "undefined", description: "Classes adicionais para estilização via Tailwind CSS." },
    { prop: "children", type: "React.ReactNode", default: "-", description: "Elementos filhos e conteúdo interno." }
  ];

  if (countBadge) {
    countBadge.textContent = `${propsList.length} ${propsList.length === 1 ? 'Propriedade' : 'Propriedades'}`;
  }

  container.innerHTML = `
    <p class="mb-3 text-xs text-muted-foreground">Props próprias extraídas do TypeScript. * indica obrigatória. Atributos HTML herdados, className, style e ref seguem o tipo do elemento no código. — indica que não há padrão explícito no contrato.</p>
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
        <p class="mt-1 line-clamp-2 text-xs text-muted-foreground">${descriptions[item.name] || 'Componente corporativo de alto nível com React e Tailwind CSS.'}</p>
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
  window.MontaMotion?.unmount(stage);
  if (window.MontaMotion?.names.includes(name)) {
    window.MontaMotion.mount(stage, name);
    return;
  }

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
              Execute <code class="bg-muted px-1.5 py-0.5 rounded font-mono text-brand">pnpm dlx montaui add [componente]</code> no terminal do seu projeto React para baixar o código fonte diretamente.
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
  return window.MONTA_REGISTRY?.[name]?.source || '// Componente não encontrado no registro.';
}

// ==================== 3. EXEMPLO DE USO EM REACT ====================
function getComponentUsage(name) {
  return window.MONTA_REGISTRY?.[name]?.example || '// Consulte o contrato do componente.';
}

// ==================== REGISTRY JSON ====================
function getComponentJSON(name) {
  const tsx = getComponentTSX(name);
  const data = {
    name: name,
    type: "registry:ui",
    dependencies: window.MONTA_REGISTRY?.[name]?.dependencies || [],
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

function copyIntegrationContext() {
  const contract = window.MONTA_REGISTRY?.[state.current];
  if (!contract) return;
  copyText(JSON.stringify({
    guidance: 'Integre usando os exports e props deste contrato. Não invente props Radix como asChild. Preserve os tokens do projeto. Configure o alias @/ e confira as dependências. Para movimento, tempos em segundos e prefers-reduced-motion. Este contrato pode conter mudanças locais ainda não publicadas no npm.',
    ...contract,
  }, null, 2), 'Contexto de integração copiado!');
}

function copyText(text, msg = 'Copiado para a área de transferência!') {
  navigator.clipboard.writeText(text).then(() => {
    showToast(msg);
  }).catch(() => {
    showToast('Falha ao copiar.');
  });
}

function copyInstallCmd() {
  const cmd = `pnpm dlx montaui add button`;
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
    openComponentDocs, toggleComponentMenu, showHomePage, showInstallationDocs, showTailwindDocs, showStorybookDocs,
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
    copyUsageCode, copyIntegrationContext, copyTailwindConfig, copyGlobalsCSS
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
