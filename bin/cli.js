#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const pkg = require('../package.json');
const registryIndex = require('../registry/index.json');

const args = process.argv.slice(2);
const command = args[0];

function printHeader() {
  console.log('\x1b[35m%s\x1b[0m', '💎 Monta UI CLI v' + pkg.version);
  console.log('\x1b[90m%s\x1b[0m\n', 'Enterprise Design System nativo (React + TS + Tailwind)');
}

function printHelp() {
  printHeader();
  console.log('Uso:');
  console.log('  npx montaui <comando> [opções]\n');
  console.log('Comandos:');
  console.log('  init                 Inicializa a pasta de componentes no seu projeto');
  console.log('  add <componentes...> Adiciona um ou mais componentes');
  console.log('  add --all            Adiciona todos os 44 componentes');
  console.log('  template <nome>      Adiciona um template de tela (login, home, dashboard)');
  console.log('  list                 Lista todos os componentes disponíveis');
  console.log('  help                 Exibe esta mensagem de ajuda\n');
  console.log('Exemplos:');
  console.log('  npx montaui init');
  console.log('  npx montaui add button sidebar chart');
  console.log('  npx montaui template dashboard\n');
}

function getTargetDir() {
  const cwd = process.cwd();
  if (fs.existsSync(path.join(cwd, 'src', 'components'))) {
    return path.join(cwd, 'src', 'components', 'monta-ui');
  }
  if (fs.existsSync(path.join(cwd, 'src'))) {
    return path.join(cwd, 'src', 'components', 'monta-ui');
  }
  return path.join(cwd, 'components', 'monta-ui');
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function initProject() {
  printHeader();
  const targetDir = getTargetDir();
  ensureDir(targetDir);

  const utilsSrc = path.join(__dirname, '..', 'registry', 'utils.ts');
  const utilsDest = path.join(targetDir, 'utils.ts');

  if (fs.existsSync(utilsSrc)) {
    fs.copyFileSync(utilsSrc, utilsDest);
    console.log('\x1b[32m✔\x1b[0m Criado utilitário: ' + utilsDest);
  }

  console.log('\n\x1b[32m✔\x1b[0m Monta UI inicializado com sucesso em: ' + targetDir);
  console.log('\nDependências recomendadas:');
  console.log('  pnpm add clsx tailwind-merge lucide-react');
  console.log('\nPara adicionar componentes:');
  console.log('  npx montaui add button sidebar\n');
}

function getComponentItems() {
  if (Array.isArray(registryIndex.items)) {
    return registryIndex.items;
  }
  return [];
}

function listComponents() {
  printHeader();
  const items = getComponentItems();
  console.log('Componentes disponíveis (' + items.length + '):\n');
  items.sort((a, b) => a.name.localeCompare(b.name)).forEach((item, i) => {
    console.log('  ' + (i + 1).toString().padStart(2, ' ') + '. \x1b[36m' + item.name.padEnd(22, ' ') + '\x1b[0m \x1b[90m' + (item.files ? item.files.join(', ') : '') + '\x1b[0m');
  });
  console.log('\nPara instalar: npx montaui add <nome>\n');
}

function addComponents(componentNames) {
  printHeader();
  if (!componentNames || !componentNames.length) {
    console.log('\x1b[31m✖ Informe os componentes a adicionar. Ex: npx montaui add button\x1b[0m');
    process.exit(1);
  }

  const allItems = getComponentItems();
  let toAdd = componentNames;
  if (componentNames.includes('--all') || componentNames.includes('all')) {
    toAdd = allItems.map(item => item.name);
  }

  const targetDir = getTargetDir();
  ensureDir(targetDir);

  const utilsSrc = path.join(__dirname, '..', 'registry', 'utils.ts');
  const utilsDest = path.join(targetDir, 'utils.ts');
  if (fs.existsSync(utilsSrc) && !fs.existsSync(utilsDest)) {
    fs.copyFileSync(utilsSrc, utilsDest);
    console.log('\x1b[32m✔\x1b[0m Utilitário utils.ts copiado.');
  }

  toAdd.forEach(name => {
    const cleanName = name.toLowerCase().trim();
    const item = allItems.find(it => it.name.toLowerCase() === cleanName);

    if (!item) {
      console.log('\x1b[33m⚠ Componente "' + cleanName + '" não encontrado no registro.\x1b[0m');
      return;
    }

    const srcFile = path.join(__dirname, '..', 'registry', 'ui', cleanName + '.tsx');
    const destFile = path.join(targetDir, cleanName + '.tsx');

    if (fs.existsSync(srcFile)) {
      fs.copyFileSync(srcFile, destFile);
      console.log('\x1b[32m✔\x1b[0m Adicionado: \x1b[1m' + cleanName + '.tsx\x1b[0m -> ' + destFile);
    } else {
      console.log('\x1b[31m✖ Arquivo não encontrado: ' + srcFile + '\x1b[0m');
    }
  });

  console.log('\n\x1b[32m✔ Concluído! Componentes prontos para uso.\x1b[0m\n');
}

function addTemplate(templateName) {
  printHeader();
  if (!templateName) {
    console.log('\x1b[31m✖ Informe o template. Opções: login, home, dashboard\x1b[0m');
    process.exit(1);
  }

  const name = templateName.toLowerCase().replace('.tsx', '').trim();
  const valid = ['login', 'home', 'dashboard'];

  if (!valid.includes(name)) {
    console.log('\x1b[31m✖ Template inválido. Escolha entre: ' + valid.join(', ') + '\x1b[0m');
    process.exit(1);
  }

  const cwd = process.cwd();
  const destDir = fs.existsSync(path.join(cwd, 'src', 'templates'))
    ? path.join(cwd, 'src', 'templates')
    : path.join(cwd, 'templates');

  ensureDir(destDir);

  const srcFile = path.join(__dirname, '..', 'templates', name + '.tsx');
  const destFile = path.join(destDir, name + '.tsx');

  if (fs.existsSync(srcFile)) {
    fs.copyFileSync(srcFile, destFile);
    console.log('\x1b[32m✔\x1b[0m Template \x1b[1m' + name + '.tsx\x1b[0m copiado para: ' + destFile);
  } else {
    console.log('\x1b[31m✖ Template não encontrado: ' + srcFile + '\x1b[0m');
  }
}

switch (command) {
  case 'init':
    initProject();
    break;
  case 'add':
    addComponents(args.slice(1));
    break;
  case 'list':
  case 'ls':
    listComponents();
    break;
  case 'template':
  case 'tpl':
    addTemplate(args[1]);
    break;
  case '-v':
  case '--version':
  case 'version':
    console.log('v' + pkg.version);
    break;
  case '-h':
  case '--help':
  case 'help':
  default:
    printHelp();
    break;
}
