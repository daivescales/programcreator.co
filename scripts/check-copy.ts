/**
 * Fails the build if em dash, en dash, or spaced hyphen parentheticals appear in src/.
 */

import { readdirSync, readFileSync, statSync } from "fs";
import { join, relative } from "path";

const ROOT = join(process.cwd(), "src");
const ALSO = [join(process.cwd(), "README.md")];

const EM = "\u2014";
const EN = "\u2013";
const SPACED_HYPHEN = / - /;

type Hit = { file: string; line: number; text: string; kind: string };

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) {
      if (name === "node_modules" || name === ".next") continue;
      walk(full, out);
    } else if (/\.(ts|tsx|md|json)$/.test(name)) {
      out.push(full);
    }
  }
  return out;
}

const files = [...walk(ROOT), ...ALSO.filter((p) => {
  try {
    return !!statSync(p);
  } catch {
    return false;
  }
})];

const hits: Hit[] = [];

for (const file of files) {
  const text = readFileSync(file, "utf8");
  const lines = text.split("\n");
  lines.forEach((line, i) => {
    if (line.includes(EM)) {
      hits.push({
        file: relative(process.cwd(), file),
        line: i + 1,
        text: line.trim(),
        kind: "em dash",
      });
    }
    if (line.includes(EN)) {
      hits.push({
        file: relative(process.cwd(), file),
        line: i + 1,
        text: line.trim(),
        kind: "en dash",
      });
    }
    if (SPACED_HYPHEN.test(line)) {
      hits.push({
        file: relative(process.cwd(), file),
        line: i + 1,
        text: line.trim(),
        kind: "spaced hyphen",
      });
    }
  });
}

if (hits.length > 0) {
  console.error("\ncheck-copy failed. Dash characters found:\n");
  for (const h of hits) {
    console.error(`  ${h.file}:${h.line} [${h.kind}]`);
    console.error(`    ${h.text.slice(0, 160)}`);
  }
  console.error(`\n${hits.length} finding(s). Remove every dash before building.\n`);
  process.exit(1);
}

console.log("check-copy passed. No dash characters in src/ or README.md.");
