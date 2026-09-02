/**
 * Scaffold 7 Graduation locale files from en.ts in each content-locales/ dir,
 * update index.ts exports, and extend parent content.ts catalog maps.
 *
 * Run: node scripts/scaffold-graduation-locales.mjs
 * After scaffolding, replace English placeholder copy with agent translations.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const marketing = path.join(__dirname, "..", "src/components/marketing");

const NEW_LOCALES = [
  { file: "ko.ts", export: "ko", key: "ko" },
  { file: "de.ts", export: "de", key: "de" },
  { file: "es.ts", export: "es", key: "es" },
  { file: "pt-br.ts", export: "ptBR", key: "pt-BR" },
  { file: "ar.ts", export: "ar", key: "ar" },
  { file: "hi.ts", export: "hi", key: "hi" },
  { file: "id.ts", export: "id", key: "id" },
];

const EXISTING_EXPORTS = ["zhCN", "en", "zhTW", "fr", "ru", "ja", "vi"];
const ALL_EXPORTS = [...EXISTING_EXPORTS, ...NEW_LOCALES.map((l) => l.export)];

function findContentLocaleDirs(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const full = path.join(dir, entry.name);
    if (entry.name === "content-locales") {
      acc.push(full);
    } else {
      findContentLocaleDirs(full, acc);
    }
  }
  return acc;
}

function scaffoldDir(localeDir) {
  const enPath = path.join(localeDir, "en.ts");
  if (!fs.existsSync(enPath)) {
    console.warn(`skip (no en.ts): ${localeDir}`);
    return;
  }
  const enSource = fs.readFileSync(enPath, "utf8");
  if (!enSource.includes("export const en")) {
    console.warn(`skip (unexpected en export): ${localeDir}`);
    return;
  }

  for (const loc of NEW_LOCALES) {
    const dest = path.join(localeDir, loc.file);
    if (fs.existsSync(dest)) continue;
    const body = enSource.replace(/export const en\b/, `export const ${loc.export}`);
    fs.writeFileSync(dest, body);
    console.log(`  wrote ${path.relative(marketing, dest)}`);
  }

  const indexPath = path.join(localeDir, "index.ts");
  const lines = ALL_EXPORTS.map((exp) => {
    const file =
      exp === "zhCN"
        ? "zh-cn"
        : exp === "zhTW"
          ? "zh-tw"
          : exp === "ptBR"
            ? "pt-br"
            : exp;
    return `export { ${exp} } from "./${file}";`;
  });
  fs.writeFileSync(indexPath, `${lines.join("\n")}\n`);

  const contentPath = path.join(path.dirname(localeDir), "content.ts");
  if (!fs.existsSync(contentPath)) return;

  let content = fs.readFileSync(contentPath, "utf8");
  const importMatch = content.match(
    /import \{([^}]+)\} from "\.\/content-locales";/,
  );
  if (!importMatch) {
    console.warn(`  skip content.ts import patch: ${contentPath}`);
    return;
  }

  const existing = importMatch[1]
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const merged = [...new Set([...existing, ...NEW_LOCALES.map((l) => l.export)])];
  content = content.replace(
    importMatch[0],
    `import { ${merged.join(", ")} } from "./content-locales";`,
  );

  const mapMatch = content.match(
    /(\{[\s\S]*?"zh-CN":\s*\w+,[\s\S]*?)(^\};)/m,
  );
  if (mapMatch) {
    let block = mapMatch[1];
    for (const loc of NEW_LOCALES) {
      const entry =
        loc.key === loc.export ? `${loc.key}: ${loc.export},` : `"${loc.key}": ${loc.export},`;
      if (!block.includes(`${loc.key}:`) && !block.includes(`"${loc.key}":`)) {
        block = block.trimEnd() + `\n  ${entry}\n`;
      }
    }
    content = content.replace(mapMatch[1], block);
  }

  fs.writeFileSync(contentPath, content);
  console.log(`  patched ${path.relative(marketing, contentPath)}`);
}

const dirs = findContentLocaleDirs(marketing);
console.log(`Scaffolding ${dirs.length} content-locales directories…`);
for (const dir of dirs) {
  console.log(path.relative(marketing, dir));
  scaffoldDir(dir);
}
console.log("Done.");
