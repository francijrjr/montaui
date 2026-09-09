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
        function Fixture() {
          const [checked, setChecked] = React.useState(false);
          const [value, setValue] = React.useState('Inicial');
          const [clicks, setClicks] = React.useState(0);
          return <><Checkbox id={checked ? 'checked-id' : undefined} label="Aceitar" checked={checked} onChange={e => setChecked(e.target.checked)} />
            <Switch aria-label="Notificações" onClick={() => setClicks(n => n + 1)} />
            <output data-testid="clicks">{clicks}</output>
            <Textarea aria-label="Descrição" showCount maxLength={20} value={value} onChange={e => setValue(e.target.value)} />
            <button onClick={() => setValue('Novo')}>Atualizar</button></>;
        }
        createRoot(document.getElementById('fixture')).render(<Fixture />);
      `, resolveDir: path.join(__dirname, '..'), loader: 'tsx' },
      bundle: true, platform: 'browser', write: false,
      alias: { '@/lib/utils': path.join(__dirname, '../registry/utils.ts') },
      define: { 'process.env.NODE_ENV': '"development"' },
    });
    await page.goto('about:blank');
    await page.setContent('<div id="fixture"></div>');
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
    assert.deepEqual(errors, []);
    console.log('Browser: motion, reduced motion, mobile navigation and controlled React inputs passed.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
