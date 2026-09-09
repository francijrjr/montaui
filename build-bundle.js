const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

// Preserve Unicode and readable source. The legacy filename remains for existing deployments.
fs.copyFileSync(path.join(__dirname, 'app.js'), path.join(__dirname, 'app.min.js'));
esbuild.buildSync({
  entryPoints: [path.join(__dirname, 'components/motion-preview.tsx')],
  outfile: path.join(__dirname, 'motion-preview.js'),
  bundle: true,
  minify: true,
  platform: 'browser',
  target: ['es2020'],
  define: { 'process.env.NODE_ENV': '"production"' },
  legalComments: 'linked',
});
console.log('[Monta UI] Portal e previews React compilados.');
