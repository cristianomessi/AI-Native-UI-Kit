// Generates shadcn-compatible registry JSON files into `public/r/`.
// Each component becomes an installable item: `npx shadcn add <url>/r/<name>.json`.
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "r");
mkdirSync(outDir, { recursive: true });

/** @type {{name:string,title:string,description:string,dir:string,dependencies?:string[]}[]} */
const registry = [
  {
    name: "prompt-composer",
    title: "Prompt Composer",
    description:
      "A polished chat/prompt composer — context pill, auto-growing input, attach, research toggle, source & model selectors, mic, and send.",
    dir: "src/components/ui/prompt-composer",
    dependencies: [],
  },
];

const items = [];

for (const entry of registry) {
  const absDir = join(root, entry.dir);
  const files = readdirSync(absDir).map((filename) => {
    const target = `components/ui/prompt-composer/${filename}`;
    return {
      path: target,
      target,
      type: "registry:component",
      content: readFileSync(join(absDir, filename), "utf8"),
    };
  });

  const item = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: entry.name,
    type: "registry:component",
    title: entry.title,
    description: entry.description,
    dependencies: entry.dependencies ?? [],
    registryDependencies: [],
    files,
  };

  writeFileSync(join(outDir, `${entry.name}.json`), JSON.stringify(item, null, 2));
  items.push({ name: entry.name, title: entry.title, description: entry.description });
  console.log(`✓ built r/${entry.name}.json (${files.length} files)`);
}

// A registry index (shadcn registry.json shape).
const index = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "ai-native-ui-kit",
  homepage: "https://ai-native-ui.com",
  items,
};
writeFileSync(join(outDir, "registry.json"), JSON.stringify(index, null, 2));
console.log(`✓ built r/registry.json (${items.length} items)`);
