const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { execFileSync, spawnSync } = require("node:child_process");
const Module = require("node:module");
const esbuild = require("esbuild");
const React = require("react");
const { renderToString } = require("react-dom/server");
const root = path.join(__dirname, "..");
const contracts = require("../registry/contracts.json").components;

for (const [name, contract] of Object.entries(contracts)) {
  const source = fs.readFileSync(
    path.join(root, "registry/ui", `${name}.tsx`),
    "utf8",
  );
  const json = require(`../registry/json/${name}.json`);
  assert.equal(contract.source, source, `${name}: source drift`);
  assert.equal(json.files[0].content, source, `${name}: JSON drift`);
  assert.ok(contract.exports.length, `${name}: missing exports`);
  assert.ok(contract.example, `${name}: missing example`);
  assert.equal(
    contract.example,
    fs.readFileSync(path.join(root, "examples", `${name}.tsx`), "utf8"),
    `${name}: example drift`,
  );
  for (const match of source.matchAll(/from "([^".][^"]*)"/g)) {
    const dependency = match[1];
    if (dependency === "react" || dependency.startsWith("@/")) continue;
    assert.ok(
      contract.dependencies.includes(dependency),
      `${name}: missing dependency ${dependency}`,
    );
  }
  // Render every documented example using the actual registry modules.
  const output = esbuild.buildSync({
    entryPoints: [path.join(root, "examples", `${name}.tsx`)],
    bundle: true,
    platform: "node",
    format: "cjs",
    write: false,
    packages: "external",
    alias: {
      "@/lib/utils": path.join(root, "registry/utils.ts"),
      "@/components/monta-ui": path.join(root, "registry/ui"),
    },
  });
  const compiled = new Module(path.join(root, `check-${name}.cjs`), module);
  compiled.filename = path.join(root, `check-${name}.cjs`);
  compiled.paths = module.paths;
  compiled._compile(output.outputFiles[0].text, compiled.filename);
  assert.ok(
    renderToString(React.createElement(compiled.exports.default)).length > 0,
    `${name}: empty example`,
  );
}

const fixture = fs.mkdtempSync(path.join(os.tmpdir(), "montaui-cli-"));
const cli = path.join(root, "bin/cli.js");
try {
  fs.mkdirSync(path.join(fixture, "src"));
  const run = (args) =>
    execFileSync(process.execPath, [cli, ...args], {
      cwd: fixture,
      encoding: "utf8",
    });
  run(["add", "button", "animated-gradient"]);
  assert.ok(fs.existsSync(path.join(fixture, "src/lib/utils.ts")));
  assert.ok(
    !fs.existsSync(path.join(fixture, "src/components/monta-ui/utils.ts")),
  );
  const button = path.join(fixture, "src/components/monta-ui/button.tsx");
  fs.writeFileSync(button, "// user changes");
  run(["add", "button"]);
  assert.equal(fs.readFileSync(button, "utf8"), "// user changes");
  run(["add", "button", "--overwrite"]);
  assert.equal(fs.readFileSync(button, "utf8"), contracts.button.source);
  const info = JSON.parse(run(["info", "text-reveal", "--json"]));
  assert.ok(
    info.props.some(
      (prop) => prop.prop === "stagger" && prop.default === "0.08",
    ),
  );
  assert.equal(
    spawnSync(process.execPath, [cli, "add", "not-a-component"], {
      cwd: fixture,
    }).status,
    1,
  );
} finally {
  // This test owns the exact temporary directory returned by mkdtempSync.
  assert.ok(
    path.resolve(fixture).startsWith(path.resolve(os.tmpdir()) + path.sep),
  );
  fs.rmSync(fixture, { recursive: true, force: true });
}
console.log(
  `Verified ${Object.keys(contracts).length} sources, contracts, dependencies and SSR examples; CLI installation and preservation passed.`,
);
