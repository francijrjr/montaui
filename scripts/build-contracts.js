// Deriva os contratos do TypeScript instalado, sem manter outra cópia das props.
const fs = require("fs");
const path = require("path");
const ts = require("typescript");
const root = path.join(__dirname, "..");
const index = JSON.parse(
  fs.readFileSync(path.join(root, "registry/index.json"), "utf8"),
);
const config = ts.readConfigFile(
  path.join(root, "tsconfig.json"),
  ts.sys.readFile,
);
const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, root);
const program = ts.createProgram(parsed.fileNames, parsed.options);
const checker = program.getTypeChecker();
const contracts = {};
const descriptions = require("../docs/prop-descriptions.json");
for (const item of index.items) {
  const file = path.join(root, "registry/ui", `${item.name}.tsx`);
  const source = program.getSourceFile(file);
  const exports = checker.getExportsOfModule(
    checker.getSymbolAtLocation(source),
  );
  const api = [];
  const exportedNames = [];
  const runtimeExports = [];
  const variantDefaults = {};
  function readVariantDefaults(node) {
    if (
      ts.isCallExpression(node) &&
      node.expression.getText(source) === "cva"
    ) {
      const options = node.arguments[1];
      const defaults =
        options &&
        ts.isObjectLiteralExpression(options) &&
        options.properties.find(
          (p) => p.name?.getText(source) === "defaultVariants",
        );
      if (
        defaults &&
        ts.isPropertyAssignment(defaults) &&
        ts.isObjectLiteralExpression(defaults.initializer)
      ) {
        defaults.initializer.properties.forEach((p) => {
          if (ts.isPropertyAssignment(p))
            variantDefaults[p.name.getText(source)] =
              p.initializer.getText(source);
        });
      }
    }
    ts.forEachChild(node, readVariantDefaults);
  }
  readVariantDefaults(source);
  for (const exported of exports) {
    const symbol =
      exported.flags & ts.SymbolFlags.Alias
        ? checker.getAliasedSymbol(exported)
        : exported;
    if (!(symbol.flags & ts.SymbolFlags.Value)) continue;
    runtimeExports.push(exported.name);
    const type = checker.getTypeOfSymbolAtLocation(symbol, source);
    const signature = type.getCallSignatures()[0];
    if (!signature || !/^[A-Z]/.test(symbol.name)) continue;
    exportedNames.push(symbol.name);
    const parameter = signature.getParameters()[0];
    if (!parameter) continue;
    const props = checker.getTypeOfSymbolAtLocation(parameter, source);
    const defaults = {};
    const declaration = symbol.valueDeclaration;
    let implementation = declaration;
    if (declaration && ts.isVariableDeclaration(declaration)) {
      implementation = declaration.initializer;
      if (implementation && ts.isCallExpression(implementation))
        implementation = implementation.arguments.find(
          (arg) => ts.isArrowFunction(arg) || ts.isFunctionExpression(arg),
        );
    }
    const binding = implementation?.parameters?.[0]?.name;
    if (binding && ts.isObjectBindingPattern(binding)) {
      binding.elements.forEach((element) => {
        if (element.initializer)
          defaults[element.name.getText(source)] =
            element.initializer.getText(source);
      });
    }
    for (const prop of props.getProperties()) {
      // React native attributes stay inherited; list custom props from this module.
      if (!prop.declarations?.some((d) => d.getSourceFile() === source))
        continue;
      const tags = prop.getJsDocTags(checker);
      const defaultTag = tags.find((t) => t.name === "default");
      api.push({
        component: symbol.name,
        prop: prop.name,
        type: checker.typeToString(
          checker.getTypeOfSymbolAtLocation(prop, source),
          source,
          ts.TypeFormatFlags.NoTruncation,
        ),
        required: !(prop.flags & ts.SymbolFlags.Optional),
        default:
          defaultTag?.text?.map((t) => t.text).join("") ||
          defaults[prop.name] ||
          variantDefaults[prop.name] ||
          "—",
        description:
          ts.displayPartsToString(prop.getDocumentationComment(checker)) ||
          descriptions[item.name]?.[prop.name] ||
          `Propriedade de ${symbol.name}. Consulte o código para o comportamento e o valor inicial.`,
      });
    }
  }
  contracts[item.name] = {
    name: item.name,
    importPath: `@/components/monta-ui/${item.name}`,
    install: `npx montaui add ${item.name}`,
    dependencies: item.dependencies,
    exports: exportedNames,
    runtimeExports,
    props: api,
    source: fs.readFileSync(file, "utf8"),
    ...(fs.existsSync(path.join(root, "examples", `${item.name}.tsx`))
      ? {
          example: fs.readFileSync(
            path.join(root, "examples", `${item.name}.tsx`),
            "utf8",
          ),
        }
      : {}),
  };
}
fs.writeFileSync(
  path.join(root, "registry/contracts.json"),
  JSON.stringify({ schemaVersion: 1, components: contracts }, null, 2),
);
fs.writeFileSync(
  path.join(root, "registry/catalog.js"),
  "// Generated from registry/ui. Do not edit.\nwindow.MONTA_REGISTRY = " +
    JSON.stringify(contracts) +
    ";\n",
);
console.log(
  `[Monta UI] Contratos TypeScript e código do portal sincronizados (${index.items.length}).`,
);
