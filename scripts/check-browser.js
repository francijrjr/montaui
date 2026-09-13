const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const esbuild = require('esbuild');
const path = require('node:path');
const base = process.env.MONTA_TEST_URL || 'http://localhost:4173';

(async () => {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(base, { waitUntil: 'domcontentloaded' });
    await page.locator('#motionGallery a').first().waitFor();
    assert.equal(await page.locator('#sidebar').isVisible(), false);
    for (const name of ['animated-gradient', 'gradient-text', 'shimmer-text', 'text-reveal']) {
      await page.goto(`${base}/#/componente/${name}`, { waitUntil: 'domcontentloaded' });
      await page.locator('.motion-controls').waitFor();
      await page.getByLabel('Texto', { exact: true }).fill('Teste de movimento');
      if (name === 'text-reveal') {
        await page.getByLabel('Efeito').selectOption('blur');
        await page.getByRole('button', { name: 'Repetir', exact: true }).click();
        assert.equal(await page.locator('.motion-stage .monta-readable-text').innerText(), 'Teste de movimento');
      } else {
        const selector = name === 'animated-gradient' ? '.monta-gradient-layer' : name === 'gradient-text' ? '.monta-gradient-text' : '.monta-shimmer-text';
        const animated = page.locator(`.motion-stage ${selector}`);
        await page.getByRole('button', { name: 'Pausar', exact: true }).click();
        assert.equal(await animated.evaluate(el => getComputedStyle(el).animationPlayState), 'paused');
        await page.emulateMedia({ reducedMotion: 'reduce' });
        assert.equal(await animated.evaluate(el => getComputedStyle(el).animationName), 'none');
        await page.emulateMedia({ reducedMotion: 'no-preference' });
      }
    }
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 900 });
      for (const name of ['reply-thread-line', 'comment-connector-line', 'thread-connector', 'nested-comment-connector']) {
        await page.goto(`${base}/#/componente/${name}`, { waitUntil: 'domcontentloaded' });
        const conversation = page.getByRole('region', { name: 'Exemplo de conversa' });
        await conversation.waitFor();
        assert.ok(await conversation.locator('[aria-hidden="true"]').count() > 0);
        assert.ok((await conversation.innerText()).includes('Ana'));
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
        const contentId = await conversation.getByRole('button', { name: 'Ocultar comentários', exact: true }).first().getAttribute('aria-controls');
        const toggle = conversation.locator(`button[aria-controls="${contentId}"]`);
        const content = page.locator(`[id="${contentId}"]`);
        await toggle.click();
        assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
        assert.equal(await content.isVisible(), false);
        assert.ok((await toggle.innerText()).endsWith('Mostrar comentários'));
        await toggle.press('Enter');
        assert.equal(await toggle.getAttribute('aria-expanded'), 'true');
        assert.equal(await content.isVisible(), true);
        await toggle.press('Space');
        assert.equal(await content.isVisible(), false);
        await toggle.click();
        if (name === 'nested-comment-connector') {
          assert.ok((await conversation.innerText()).includes('Clara'));
          const nestedContentId = await conversation.getByRole('button', { name: 'Ocultar comentários', exact: true }).nth(1).getAttribute('aria-controls');
          const nestedToggle = conversation.locator(`button[aria-controls="${nestedContentId}"]`);
          await nestedToggle.click();
          await toggle.click();
          await toggle.click();
          assert.equal(await nestedToggle.getAttribute('aria-expanded'), 'false');
          await nestedToggle.click();
        }
      }
    }
    await page.goto(`${base}/#/componente/text-reveal`, { waitUntil: 'domcontentloaded' });
    await page.locator('.motion-controls').waitFor();
    await page.setViewportSize({ width: 390, height: 844 });
    await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async text => { window.__testClipboard = text; } } }));
    await page.getByRole('button', { name: 'Copiar para IA', exact: true }).click();
    const copied = await page.evaluate(() => JSON.parse(window.__testClipboard));
    assert.equal(copied.name, 'text-reveal');
    assert.ok(copied.source.includes('TextRevealProps'));
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    await page.getByRole('button', { name: 'Menu de componentes' }).click();
    assert.equal(await page.locator('#sidebar').isVisible(), true);

    // Exercise the fixed React controls, independent of the portal's HTML demos.
    const fixture = esbuild.buildSync({
      stdin: { contents: `
        import * as React from 'react';
        import { createRoot } from 'react-dom/client';
        import { Checkbox } from './registry/ui/checkbox';
        import { Switch } from './registry/ui/switch';
        import { Textarea } from './registry/ui/textarea';
        import { ReplyThreadLine } from './registry/ui/reply-thread-line';
        import { CommentConnectorLine } from './registry/ui/comment-connector-line';
        import { ThreadConnector } from './registry/ui/thread-connector';
        import { NestedCommentConnector } from './registry/ui/nested-comment-connector';
        function ControlledThread({ Component }) {
          const [collapsed, setCollapsed] = React.useState(true);
          return <section data-testid="controlled-thread">
            <Component collapsed={collapsed} onCollapsedChange={setCollapsed} expandLabel="Abrir respostas" collapseLabel="Fechar respostas">
              <input aria-label="Rascunho" defaultValue="Texto preservado" />
            </Component>
            <button onClick={() => setCollapsed(false)}>Abrir externamente</button>
          </section>;
        }
        function Fixture() {
          const [checked, setChecked] = React.useState(false);
          const [value, setValue] = React.useState('Inicial');
          const [clicks, setClicks] = React.useState(0);
          return <><Checkbox id={checked ? 'checked-id' : undefined} label="Aceitar" checked={checked} onChange={e => setChecked(e.target.checked)} />
            <Switch aria-label="Notificações" onClick={() => setClicks(n => n + 1)} />
            <output data-testid="clicks">{clicks}</output>
            <Textarea aria-label="Descrição" showCount maxLength={20} value={value} onChange={e => setValue(e.target.value)} />
            <button onClick={() => setValue('Novo')}>Atualizar</button>
            {[ReplyThreadLine, CommentConnectorLine, ThreadConnector, NestedCommentConnector].map((Component, index) =>
              <React.Fragment key={index}>
                <ControlledThread Component={Component} />
                <Component defaultCollapsed data-testid="initially-collapsed">Resposta oculta</Component>
              </React.Fragment>
            )}
          </>;
        }
        createRoot(document.getElementById('fixture')).render(<Fixture />);
      `, resolveDir: path.join(__dirname, '..'), loader: 'tsx' },
      bundle: true, platform: 'browser', write: false,
      alias: { '@/lib/utils': path.join(__dirname, '../registry/utils.ts') },
      define: { 'process.env.NODE_ENV': '"development"' },
    });
    await page.goto('about:blank');
    await page.setContent('<style>label[aria-hidden="true"] { display: inline-block; width: 16px; height: 16px; }</style><div id="fixture"></div>');
    await page.addScriptTag({ content: fixture.outputFiles[0].text });
    await page.locator('label[aria-hidden="true"]').click();
    assert.equal(await page.getByRole('checkbox').isChecked(), true);
    await page.locator('label[aria-hidden="true"]').click();
    assert.equal(await page.getByRole('checkbox').isChecked(), false);
    await page.getByRole('switch').click();
    assert.equal(await page.getByRole('switch').getAttribute('aria-checked'), 'true');
    assert.equal(await page.getByTestId('clicks').innerText(), '1');
    await page.getByRole('button', { name: 'Atualizar' }).click();
    assert.ok((await page.locator('body').innerText()).includes('4/20'));
    for (const thread of await page.getByTestId('controlled-thread').all()) {
      const draft = thread.getByRole('textbox', { name: 'Rascunho', includeHidden: true });
      assert.equal(await draft.isVisible(), false);
      await thread.getByRole('button', { name: 'Abrir respostas', exact: true }).click();
      await draft.fill('Meu rascunho');
      await thread.getByRole('button', { name: 'Fechar respostas', exact: true }).click();
      assert.equal(await draft.isVisible(), false);
      await thread.getByRole('button', { name: 'Abrir externamente' }).click();
      assert.equal(await draft.inputValue(), 'Meu rascunho');
      assert.equal(await draft.isVisible(), true);
    }
    for (const thread of await page.getByTestId('initially-collapsed').all()) {
      const button = thread.getByRole('button');
      assert.equal(await button.getAttribute('aria-expanded'), 'false');
      await button.click();
      assert.equal(await button.getAttribute('aria-expanded'), 'true');
    }
    assert.deepEqual(errors, []);
    console.log('Browser: motion, reduced motion, mobile navigation and controlled React inputs passed.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
