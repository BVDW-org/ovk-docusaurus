import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const ovkDirectory = path.resolve(scriptDirectory, '..');
const synchronizedTextExtensions = new Set([
  '.css',
  '.html',
  '.js',
  '.json',
  '.md',
  '.mdx',
  '.txt',
  '.yaml',
  '.yml',
]);

async function normalizeLineEndings(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  await Promise.all(entries.map(async (entry) => {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      await normalizeLineEndings(entryPath);
      return;
    }

    if (!entry.isFile() || !synchronizedTextExtensions.has(path.extname(entry.name))) {
      return;
    }

    const source = await readFile(entryPath, 'utf8');
    const normalized = source
      .replace(/\r\n?/g, '\n')
      .split('\n')
      .map((line) => line.replace(/[\t ]+$/, ''))
      .join('\n');

    if (normalized !== source) {
      await writeFile(entryPath, normalized);
    }
  }));
}

async function normalizeContextualStandard() {
  const file = path.join(ovkDirectory, 'docs/contextualstandards/index.md');
  const source = await readFile(file, 'utf8');
  let firstLevelOneHeadingSeen = false;

  const normalized = source
    .split(/\r?\n/)
    .map((line) => {
      if (!line.startsWith('# ')) {
        return line;
      }

      if (!firstLevelOneHeadingSeen) {
        firstLevelOneHeadingSeen = true;
        return line;
      }

      return `#${line}`;
    })
    .join('\n')
    .replaceAll('](#Kriterien)', '](#kriterien)')
    .replaceAll('](#documentation)', '](#dokumentation)');

  await writeFile(file, `${normalized.replace(/\n+$/, '')}\n`);
}

async function normalizeVendorAnchors() {
  const file = path.join(
    ovkDirectory,
    'docs/identitysolutions/ID-Support_OVK-Vermarkter/OVK-IdentifierSupport_byVendor.md',
  );
  const lines = (await readFile(file, 'utf8')).split(/\r?\n/);
  const normalized = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];

    // Remove legacy raw anchors produced by older normalization runs.
    if (/^<a id="[A-Za-z][A-Za-z0-9_-]*"><\/a>$/.test(line)) {
      continue;
    }

    if (/^<img\b.*>\s+\{#[A-Za-z][A-Za-z0-9_-]*\}$/.test(line)) {
      normalized.push(line.replace(/\s+\{#[A-Za-z][A-Za-z0-9_-]*\}$/, ''));
      continue;
    }

    if (/^\[`Proprietary IDs`\]\(#Proprietary-Ids\)$/.test(line)) {
      normalized.push('### Proprietary IDs {#Proprietary-Ids}');
      continue;
    }

    if (/^###\s+<img\b/.test(line)) {
      const nextContentLine = lines.slice(index + 1).find((candidate) => candidate.trim() !== '');
      const anchor = nextContentLine?.match(/\]\(#([A-Za-z][A-Za-z0-9_-]*)\)/)?.[1];

      if (anchor) {
        const imageMarkup = line
          .replace(/^###\s+/, '')
          .replace(/\s+\{#[A-Za-z][A-Za-z0-9_-]*\}\s*$/, '')
          .replace(/\s*###\s*$/, '')
          .trim();
        normalized.push(`### ${anchor} {#${anchor}}`, imageMarkup);
        continue;
      }
    }

    normalized.push(line);
  }

  await writeFile(file, `${normalized.join('\n').replace(/\n+$/, '')}\n`);
}

await Promise.all([
  'docs/contextualstandards',
  'docs/identitysolutions',
  'docs/werbeformen',
  'static/tools/identifier-landscape',
].map((directory) => normalizeLineEndings(path.join(ovkDirectory, directory))));

await Promise.all([normalizeContextualStandard(), normalizeVendorAnchors()]);
