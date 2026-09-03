import { access, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { collectWerbeformenRoutes } from './werbeformen-routes.mjs';
import { getDocSeo } from '../src/utils/seo.mjs';

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
const markdownExtensions = new Set(['.md', '.mdx']);

async function collectMarkdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      return collectMarkdownFiles(entryPath);
    }
    return entry.isFile() && markdownExtensions.has(path.extname(entry.name))
      ? [entryPath]
      : [];
  }));
  return nested.flat();
}

function parseYamlScalar(value) {
  const trimmed = value?.trim();
  if (!trimmed) return undefined;
  try {
    return JSON.parse(trimmed);
  } catch {
    return trimmed.replace(/^['"]|['"]$/g, '');
  }
}

function frontMatterValue(source, key) {
  const body = source.match(/^---\n([\s\S]*?)\n---\n/)?.[1];
  return parseYamlScalar(body?.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))?.[1]);
}

function hasFrontMatterKey(source, key) {
  const body = source.match(/^---\n([\s\S]*?)\n---\n/)?.[1];
  return new RegExp(`^${key}:`, 'm').test(body ?? '');
}

function appendFrontMatter(source, lines) {
  if (lines.length === 0) return source;
  const match = source.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) {
    return `---\n${lines.join('\n')}\n---\n\n${source}`;
  }
  const body = match[1].trimEnd();
  return source.replace(match[0], `---\n${body}\n${lines.join('\n')}\n---\n`);
}

function firstHeading(source) {
  const body = source.replace(/^---\n[\s\S]*?\n---\n/, '');
  return body.match(/^#\s+(.+?)\s*#*\s*$/m)?.[1].trim();
}

async function injectSeoMetadata() {
  const docsDirectory = path.join(ovkDirectory, 'docs');
  const files = await collectMarkdownFiles(docsDirectory);

  await Promise.all(files.map(async (file) => {
    const source = await readFile(file, 'utf8');
    const id = path.relative(docsDirectory, file)
      .split(path.sep)
      .join('/')
      .replace(/\.mdx?$/, '');
    const sourceTitle = frontMatterValue(source, 'title') ?? firstHeading(source) ?? path.basename(id);
    const sourceDescription = frontMatterValue(source, 'description') ?? '';
    const seo = getDocSeo({ id, title: sourceTitle, description: sourceDescription }, {});
    const additions = [];

    if (!hasFrontMatterKey(source, 'title')) {
      additions.push(`title: ${JSON.stringify(seo.title)}`);
    }
    if (!hasFrontMatterKey(source, 'description')) {
      additions.push(`description: ${JSON.stringify(seo.description)}`);
    }
    if (!hasFrontMatterKey(source, 'keywords')) {
      additions.push(`keywords: [${seo.keywords.map((keyword) => JSON.stringify(keyword)).join(', ')}]`);
    }

    const normalized = appendFrontMatter(source, additions);
    if (normalized !== source) {
      await writeFile(file, normalized);
    }
  }));
}

async function normalizeMarkdownSemantics() {
  const docsDirectory = path.join(ovkDirectory, 'docs');
  const files = await collectMarkdownFiles(docsDirectory);

  await Promise.all(files.map(async (file) => {
    const source = await readFile(file, 'utf8');
    const id = path.relative(docsDirectory, file)
      .split(path.sep)
      .join('/')
      .replace(/\.mdx?$/, '');
    const title = frontMatterValue(source, 'title') ?? firstHeading(source) ?? 'digitale Werbung';
    let levelOneHeadingSeen = false;
    let currentLevelThreeHeading = '';
    let identityLegendSeen = false;

    const normalizedLines = source.split(/\r?\n/).map((line) => {
      let normalized = line
        .replace(/^(\s*#{1,6}\s+.+?)<br\s*\/?>(\s*)$/i, '$1$2')
        .replaceAll('Standard-Fomat', 'Standard-Format')
        .replaceAll('Laufende Projeke', 'Laufende Projekte')
        .replaceAll('Content Taxonony', 'Content Taxonomy');

      if (id === 'identitysolutions/README') {
        if (normalized === '# Einführung') {
          normalized = '# Identity-Lösungen im deutschen Werbemarkt';
        }
        if (normalized === '**Legende:**') {
          if (identityLegendSeen) {
            normalized = '**Legende für die Nutzungsübersicht:**';
          }
          identityLegendSeen = true;
        }
      }

      if (
        id === 'identitysolutions/ID-Support_SSPs/SSP-IdentifierSupport' &&
        normalized === '- Last updated: February 2024'
      ) {
        normalized = '- Datenstand der zugrunde liegenden Anbieterabfrage: Februar 2024';
      }

      const primaryHeadings = new Map([
        ['identitysolutions/ID-Support_SSPs/SSP-IdentifierSupport', '# Welche SSPs unterstützen welche Identifier?'],
        ['identitysolutions/ID-Support_DSPs/DSP-IdentifierSupport', '# Welche DSPs unterstützen welche Identifier?'],
        ['identitysolutions/ID-Support_OVK-Vermarkter/OVK-IdentifierSupport_byVendor', '# Welche Identifier unterstützen OVK-Vermarkter?'],
        ['contextualstandards/index', '# OVK Contextual Standard für digitale Werbung'],
      ]);
      if (normalized.startsWith('# ') && primaryHeadings.has(id) && !levelOneHeadingSeen) {
        normalized = primaryHeadings.get(id);
      }

      if (
        id === 'werbeformen/Tech-Hilfe/redirect' &&
        normalized.startsWith('Alle auszuliefernden Skripte,')
      ) {
        normalized = 'Alle auszuliefernden Skripte, auch nachträglich geladene Drittanbieter-Skripte, müssen HTTPS-fähig sein. Bitte achten Sie darauf, dass Redirects auch in verschlüsselten Bereichen (https://) ausgeliefert werden können. Die angelieferten Skripte dürfen lediglich ein statisches Bild in der angegebenen Größe zurückliefern. Bei responsiven Elementen müssen 100 % der bereitgestellten Fläche ausgefüllt werden. Die Skripte dürfen keine HTML-Elemente verändern, die sie nicht selbst erstellt haben. Positionierung, Berechnung und weitere technische Anforderungen werden vom Publisher vorgegeben.';
      }

      if (normalized.startsWith('# ')) {
        if (levelOneHeadingSeen) normalized = `#${normalized}`;
        levelOneHeadingSeen = true;
      }

      const h3 = normalized.match(/^###\s+(.+?)(?:\s+\{#[^}]+\})?\s*#*$/);
      if (h3) currentLevelThreeHeading = h3[1].replace(/[`*_]/g, '').trim();

      if (id.startsWith('werbeformen/Werbeformen_new/')) {
        const questionHeadings = new Map([
          ['## Beschreibung', `## Was ist das OVK-Werbeformat ${title}?`],
          ['## Weitere Spezifikationen', '## Welche weiteren Spezifikationen gelten?'],
          ['## Technische Spezifikationen', '## Welche technischen Spezifikationen gelten?'],
          ['## Größe', '## Welche Größen sind erlaubt?'],
          ['## Formate', '## Welche Dateiformate werden unterstützt?'],
        ]);
        normalized = questionHeadings.get(normalized) ?? normalized;
        normalized = normalized.replace(
          /<img\s+([^>]*?)alt="[^"]*"([^>]*)>/i,
          `<img $1alt="Beispieldarstellung des OVK-Werbeformats ${title}"$2>`,
        );
      }

      if (
        id === 'identitysolutions/ID-Support_OVK-Vermarkter/OVK-IdentifierSupport_byVendor' &&
        /<img\b/i.test(normalized) &&
        !/\balt=/i.test(normalized)
      ) {
        normalized = normalized.replace(
          /<img\b/i,
          `<img alt="Logo: ${currentLevelThreeHeading || 'Identity-Anbieter'}"`,
        );
      }

      return normalized;
    });

    const normalized = `${normalizedLines.join('\n').replace(/\n+$/, '')}\n`;
    if (normalized !== source) {
      await writeFile(file, normalized);
    }
  }));
}

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

// Upstream documents embed images through github.com raw URLs even when the
// referenced file is served by this site from /img. Rewriting them to local
// paths keeps visitors off third-party hosts and lets missing images surface
// at build time instead of 404ing silently in production. URLs whose target
// does not exist locally are left untouched so the page keeps working.
const hotlinkPattern =
  /https:\/\/github\.com\/BVDW-org\/ovk-docusaurus\/blob\/[^/]+\/ovk\/static\/([^"'()?]+?)\?raw=true/g;

function decodeHotlinkPath(rawPath) {
  try {
    return decodeURIComponent(rawPath);
  } catch {
    return rawPath;
  }
}

async function rewriteImageHotlinks(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  await Promise.all(entries.map(async (entry) => {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      await rewriteImageHotlinks(entryPath);
      return;
    }

    if (!entry.isFile() || !['.md', '.mdx'].includes(path.extname(entry.name))) {
      return;
    }

    const source = await readFile(entryPath, 'utf8');
    const replacements = new Map();

    for (const match of source.matchAll(hotlinkPattern)) {
      const localPath = decodeHotlinkPath(match[1])
        // Repair known upstream filename defects such as a space before the
        // file extension ("...PosterAd .png" is published as "...PosterAd.png").
        .replace(/\s+(\.[a-z0-9]+)$/i, '$1');

      try {
        await access(path.join(ovkDirectory, 'static', localPath));
        replacements.set(match[0], `/${localPath}`);
      } catch {
        console.warn(`Keeping hotlink without local counterpart: ${match[0]}`);
      }
    }

    let rewritten = source;
    for (const [hotlink, localSrc] of replacements) {
      rewritten = rewritten.replaceAll(hotlink, localSrc);
    }

    // Local image paths copied from GitHub sometimes keep a leftover
    // ?raw=true query string; static hosting ignores it, but it defeats
    // caching normalization and reads as a mistake.
    rewritten = rewritten.replace(/(src="\/img\/[^"?]+)\?raw=true"/g, '$1"');

    if (rewritten !== source) {
      await writeFile(entryPath, rewritten);
    }
  }));
}

// Werbeformen filenames contain spaces, umlauts, and colons, and the upstream
// "Werbeformen_new" folder must not leak into public URLs. Inject the stable
// ASCII slugs derived by werbeformen-routes.mjs as front matter on every sync;
// docusaurus.config.js registers redirects from each legacy route.
async function injectWerbeformenSlugs() {
  await Promise.all(collectWerbeformenRoutes().map(async (entry) => {
    if (entry.slug === null) {
      return;
    }

    const file = path.join(ovkDirectory, 'docs/werbeformen', entry.relativePath);
    const source = await readFile(file, 'utf8');
    const slugLine = `slug: ${entry.slug}`;
    let normalized;

    const frontMatterMatch = source.match(/^---\n([\s\S]*?)\n---\n/);
    if (frontMatterMatch) {
      const body = frontMatterMatch[1];
      const updatedBody = /^slug:.*$/m.test(body)
        ? body.replace(/^slug:.*$/m, slugLine)
        : `${body}\n${slugLine}`;
      normalized = source.replace(frontMatterMatch[0], `---\n${updatedBody}\n---\n`);
    } else {
      normalized = `---\n${slugLine}\n---\n\n${source}`;
    }

    if (normalized !== source) {
      await writeFile(file, normalized);
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
].map((directory) => rewriteImageHotlinks(path.join(ovkDirectory, directory))));

await injectWerbeformenSlugs();

await injectSeoMetadata();

// Upstream vendor headings embed the logo image inside the heading. Split
// those headings before the generic semantic/alt-text pass so an <img> tag
// can never be copied into another image's alt attribute during a fresh sync.
await normalizeVendorAnchors();

await normalizeMarkdownSemantics();

await Promise.all([
  'docs/contextualstandards',
  'docs/identitysolutions',
  'docs/werbeformen',
  'static/tools/identifier-landscape',
].map((directory) => normalizeLineEndings(path.join(ovkDirectory, directory))));

await normalizeContextualStandard();
