import { access, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { collectWerbeformenRoutes } from './werbeformen-routes.mjs';

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

await Promise.all([
  'docs/contextualstandards',
  'docs/identitysolutions',
  'docs/werbeformen',
  'static/tools/identifier-landscape',
].map((directory) => normalizeLineEndings(path.join(ovkDirectory, directory))));

await Promise.all([normalizeContextualStandard(), normalizeVendorAnchors()]);
