(() => {
  const demos = [
    { id: 'button', label: 'Button', icon: 'mouse-pointer-2', title: 'Button.tsx', files: ['button.tsx', 'utils.ts'], logs: ['Importando variantes CVA…', 'Aplicando tokens da marca…', 'Estado de loading disponível.', 'Foco visível e teclado verificados.', 'Button pronto para interação.'] },
    { id: 'input', label: 'Input', icon: 'text-cursor-input', title: 'Input.tsx', files: ['input.tsx', 'utils.ts'], logs: ['Montando campo acessível…', 'Validando estado controlado…', 'Ações de limpar e senha conectadas.', 'Foco e rótulos associados.', 'Input pronto para interação.'] },
    { id: 'modal', label: 'Modal', icon: 'panels-top-left', title: 'Dialog.tsx', files: ['dialog.tsx', 'utils.ts'], logs: ['Preparando camada de diálogo…', 'Backdrop com blur configurado.', 'Escape e foco de retorno ativos.', 'Ações de confirmação conectadas.', 'Dialog pronto para interação.'] },
    { id: 'toast', label: 'Toast', icon: 'bell-ring', title: 'Toast.tsx', files: ['toast.tsx', 'utils.ts'], logs: ['Inicializando viewport de feedback…', 'Variante success selecionada.', 'Dispensa por ação e timeout prontos.', 'Região de anúncio acessível.', 'Toast pronto para interação.'] },
    { id: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard', title: 'dashboard.tsx', files: ['dashboard.tsx', 'statistic.tsx', 'card.tsx'], logs: ['Compondo template executivo…', 'Cards de estatística montados.', 'Gráfico animado por dados locais.', 'Layout responsivo configurado.', 'Dashboard pronto para interação.'] },
  ];
  const root = document.getElementById('montaPlayground');
  if (!root) return;
  const tabs = root.querySelector('.monta-playground-tabs');
  const files = root.querySelector('.monta-file-tree');
  const log = root.querySelector('.monta-run-log');
  const content = root.querySelector('.monta-preview-content');
  const title = root.querySelector('.monta-panel-heading h3');
  const state = root.querySelector('.monta-run-state span');
  const previewFile = root.querySelector('.monta-preview-file');
  const previewPanel = root.querySelector('#playground-preview');
  let active = 'button';
  let timers = [];
  let toastTimer;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const clearTimers = () => { timers.forEach(clearTimeout); timers = []; clearTimeout(toastTimer); };
  const icon = (name) => `<i data-lucide="${name}"></i>`;
  const refreshIcons = () => window.lucide?.createIcons();

  function renderTabs() {
    const focusedTab = tabs.contains(document.activeElement) ? document.activeElement.dataset.demo : null;
    tabs.innerHTML = demos.map((demo) => `<button class="monta-tab" type="button" role="tab" id="playground-tab-${demo.id}" aria-controls="playground-preview" aria-selected="${demo.id === active}" tabindex="${demo.id === active ? 0 : -1}" data-demo="${demo.id}">${icon(demo.icon)}<span>${demo.label}</span></button>`).join('');
    if (focusedTab) tabs.querySelector(`[data-demo="${focusedTab}"]`)?.focus();
  }
  function renderFiles(demo) {
    files.innerHTML = `<div class="monta-file-label">EXPLORER</div>${demo.files.map((file, i) => `<div class="monta-file-item ${i === 0 ? 'is-active' : ''}">${icon(file.endsWith('.tsx') ? 'file-code-2' : 'file')}</i><span>${file}</span></div>`).join('')}`;
  }
  function run(demo) {
    clearTimers();
    title.textContent = demo.title;
    state.textContent = 'executando';
    log.innerHTML = '';
    renderFiles(demo);
    demo.logs.forEach((message, index) => {
      const delay = reducedMotion.matches ? 0 : index * 360;
      timers.push(setTimeout(() => {
        const line = document.createElement('div');
        line.className = `monta-log-line ${index === demo.logs.length - 1 ? 'is-final' : index === 0 ? 'is-muted' : ''}`;
        line.innerHTML = `<span class="monta-log-mark">${index === demo.logs.length - 1 ? '✓' : index === 0 ? '›' : '✓'}</span><span></span>`;
        line.lastElementChild.textContent = message;
        log.append(line);
        if (index === demo.logs.length - 1) state.textContent = 'pronto';
      }, delay));
    });
    if (window.MontaMotion?.mountShowcase) window.MontaMotion.mountShowcase(content, demo.id);
    else content.innerHTML = preview(demo.id);
    previewFile.textContent = `registry/ui/${demo.title}`;
    refreshIcons();
  }
  function preview(id) {
    if (id === 'button') return `<div style="display:flex;flex-direction:column;align-items:center;gap:14px"><button class="mp-button" type="button" data-action="save">${icon('check')}<span>Salvar alterações</span></button><div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center"><button class="mp-button mp-button-secondary" type="button">Secundário</button><button class="mp-button mp-button-danger" type="button">Excluir</button></div><span style="color:hsl(var(--muted-foreground));font-size:10px">Clique no botão para ver o estado de carregamento</span></div>`;
    if (id === 'input') return `<form class="mp-form" onsubmit="return false"><label class="mp-demo-label" for="mp-email">E-mail corporativo</label><div style="position:relative"><input id="mp-email" class="mp-demo-input" type="email" value="hello@montaui.dev" aria-describedby="mp-input-hint" style="padding-right:40px"><button type="button" data-action="clear-input" aria-label="Limpar campo" style="position:absolute;right:10px;top:12px;border:0;background:none;color:hsl(var(--muted-foreground));cursor:pointer">${icon('x')}</button></div><small id="mp-input-hint">Campo com estado de foco e ação para limpar.</small><label class="mp-demo-label" for="mp-pass" style="display:block;margin-top:17px">Senha</label><div style="position:relative"><input id="mp-pass" class="mp-demo-input" type="password" value="montaui2026" style="padding-right:42px"><button type="button" data-action="toggle-password" aria-label="Mostrar senha" style="position:absolute;right:10px;top:12px;border:0;background:none;color:hsl(var(--muted-foreground));cursor:pointer">${icon('eye')}</button></div></form>`;
    if (id === 'modal') return `<button class="mp-button" type="button" data-action="open-modal">${icon('square-arrow-out-up-right')}<span>Abrir diálogo</span></button><span style="display:block;margin-top:12px;color:hsl(var(--muted-foreground));font-size:10px">Experimente Escape ou clique fora para fechar</span><div class="mp-modal-layer" hidden><div class="mp-modal-backdrop" data-action="close-modal"><section class="mp-demo-dialog" role="dialog" aria-modal="true" aria-labelledby="mp-dialog-title" aria-describedby="mp-dialog-desc"><div class="mp-dialog-icon">${icon('sparkles')}</div><h4 id="mp-dialog-title">Publicar alterações?</h4><p id="mp-dialog-desc">Seu novo projeto ficará disponível para toda a equipe. Você poderá atualizar as configurações depois.</p><div class="mp-dialog-actions"><button class="mp-button mp-button-secondary" type="button" data-action="close-modal">Cancelar</button><button class="mp-button" type="button" data-action="confirm-modal">${icon('check')}<span>Publicar</span></button></div></section></div></div>`;
    if (id === 'toast') return `<div style="display:flex;flex-direction:column;align-items:center;gap:16px"><button class="mp-button" type="button" data-action="show-toast">${icon('bell-plus')}<span>Mostrar notificação</span></button><div class="mp-toast-slot" aria-live="polite" aria-atomic="true"></div><span style="color:hsl(var(--muted-foreground));font-size:10px">Notificação success com saída automática</span></div>`;
    return `<div class="mp-dashboard"><div class="mp-dashboard-title"><h4>Visão geral</h4><span>Últimos 30 dias⌄</span></div><div class="mp-kpis"><div class="mp-kpi" style="animation-delay:0ms"><span>Receita total</span><strong>R$ 48.290</strong><em>↗ 12,8%</em></div><div class="mp-kpi" style="animation-delay:70ms"><span>Novos clientes</span><strong>1.284</strong><em>↗ 8,2%</em></div></div><div class="mp-chart" aria-label="Gráfico de receita dos últimos meses">${[32,48,38,70,55,86,64,96].map((h, i) => `<i style="--bar:${h}%;animation-delay:${i * 45}ms"></i>`).join('')}</div>`;
  }
  function select(id, focusTab = false) {
    active = id;
    previewPanel.setAttribute('aria-labelledby', `playground-tab-${id}`);
    renderTabs();
    run(demos.find((demo) => demo.id === id));
    if (focusTab) tabs.querySelector(`[data-demo="${id}"]`)?.focus();
  }
  tabs.addEventListener('click', (event) => {
    const tab = event.target.closest('[data-demo]');
    if (tab) select(tab.dataset.demo);
  });
  tabs.addEventListener('keydown', (event) => {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const index = demos.findIndex((demo) => demo.id === active);
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? demos.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : demos.length - 1)) % demos.length;
    select(demos[next].id, true);
  });
  root.querySelector('#playgroundReplay').addEventListener('click', () => run(demos.find((demo) => demo.id === active)));

  content.addEventListener('click', (event) => {
    const target = event.target.closest('[data-action]');
    if (!target) return;
    const action = target.dataset.action;
    if (action === 'save') {
      target.disabled = true;
      target.innerHTML = `${icon('loader-circle')}<span>Salvando…</span>`;
      const done = setTimeout(() => { if (!target.isConnected) return; target.disabled = false; target.innerHTML = `${icon('check')}<span>Salvo com sucesso</span>`; refreshIcons(); }, reducedMotion.matches ? 0 : 850);
      timers.push(done); refreshIcons();
    }
    if (action === 'clear-input') { const input = content.querySelector('#mp-email'); input.value = ''; input.focus(); }
    if (action === 'toggle-password') { const input = content.querySelector('#mp-pass'); const visible = input.type === 'password'; input.type = visible ? 'text' : 'password'; target.setAttribute('aria-label', visible ? 'Ocultar senha' : 'Mostrar senha'); target.innerHTML = icon(visible ? 'eye-off' : 'eye'); refreshIcons(); }
    if (action === 'open-modal') {
      returnFocus = target;
      const layer = content.querySelector('.mp-modal-layer'); layer.hidden = false; layer.querySelector('.mp-dialog-actions button').focus();
    }
    if (action === 'close-modal' || action === 'confirm-modal') {
      const layer = content.querySelector('.mp-modal-layer'); layer.hidden = true;
      returnFocus?.focus();
    }
    if (action === 'show-toast') showToast('Alterações salvas', 'Seu projeto foi atualizado com sucesso.');
    refreshIcons();
  });
  function showToast(heading, message) {
    if (active !== 'toast') return;
    const slot = content.querySelector('.mp-toast-slot');
    clearTimeout(toastTimer);
    slot.innerHTML = `<div class="mp-toast" role="status"><span class="mp-toast-icon">${icon('circle-check')}</span><div><h4></h4><p></p></div><button type="button" class="mp-toast-close" data-action="dismiss-toast" aria-label="Dispensar notificação">${icon('x')}</button></div>`;
    slot.querySelector('h4').textContent = heading;
    slot.querySelector('p').textContent = message;
    refreshIcons();
    toastTimer = setTimeout(() => { const toast = slot.querySelector('.mp-toast'); if (toast) { toast.style.animation = 'monta-toast-in .2s reverse both'; setTimeout(() => { if (toast.isConnected) toast.remove(); }, reducedMotion.matches ? 0 : 200); } }, reducedMotion.matches ? 1800 : 3200);
  }
  content.addEventListener('click', (event) => { if (event.target.closest('[data-action="dismiss-toast"]')) { clearTimeout(toastTimer); content.querySelector('.mp-toast')?.remove(); } });
  renderTabs();
  select(active);
})();
