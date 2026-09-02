// Deterministic route planning for the synchronized Werbeformen documentation.
//
// Upstream filenames contain spaces, umlauts, and colons, and the legacy
// "Werbeformen_new" folder would otherwise leak into every public URL. This
// module derives a stable ASCII slug for every document from its file path so
// that:
//
// - `normalize-synced-content.mjs` can inject the slug as front matter during
//   every sync (the hourly sync overwrites direct edits, so slugs must be
//   re-derivable, not hand-maintained); and
// - `docusaurus.config.js` can register client redirects from each legacy
//   route to its slugged replacement, keeping previously shared URLs alive.
//
// Everything here is synchronous because the Docusaurus configuration file
// evaluates it at load time.

import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const werbeformenDirectory = path.resolve(scriptDirectory, '../docs/werbeformen');
const documentExtensions = new Set(['.md', '.mdx']);

// The upstream container folder that must not appear in public URLs.
const HIDDEN_SEGMENTS = new Set(['Werbeformen_new']);

const TRANSLITERATIONS = new Map([
  ['ä', 'ae'],
  ['ö', 'oe'],
  ['ü', 'ue'],
  ['ß', 'ss'],
]);

export function slugifySegment(segment) {
  let result = '';
  for (const character of segment.toLowerCase()) {
    result += TRANSLITERATIONS.get(character) ?? character;
  }
  return result
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function collectDocumentFiles(directory, prefix = []) {
  const files = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      files.push(...collectDocumentFiles(path.join(directory, entry.name), [...prefix, entry.name]));
    } else if (entry.isFile() && documentExtensions.has(path.extname(entry.name))) {
      files.push([...prefix, entry.name]);
    }
  }
  return files;
}

function isIndexDocument(baseName, directorySegments) {
  const lastDirectory = directorySegments.at(-1);
  return (
    /^(index|readme)$/i.test(baseName) ||
    (lastDirectory !== undefined && baseName === lastDirectory)
  );
}

/**
 * Returns one entry per Werbeformen document:
 * `{ relativePath, legacyRoute, slug, route }`.
 *
 * `legacyRoute` is the route Docusaurus derives from the raw file path;
 * `slug` is the stable ASCII doc slug to inject as front matter; `route` is
 * the resulting public route. Entries where both routes already match carry
 * `slug: null` and need neither front matter nor a redirect.
 */
export function collectWerbeformenRoutes() {
  const routes = [];
  const seenRoutes = new Map();

  for (const segments of collectDocumentFiles(werbeformenDirectory).sort()) {
    const directorySegments = segments.slice(0, -1);
    const baseName = path.basename(segments.at(-1), path.extname(segments.at(-1)));
    const indexDocument = isIndexDocument(baseName, directorySegments);

    const legacySegments = indexDocument ? directorySegments : [...directorySegments, baseName];
    const legacyRoute = ['/docs/werbeformen', ...legacySegments].join('/');

    const slugSegments = [
      ...directorySegments.filter((segment) => !HIDDEN_SEGMENTS.has(segment)),
      ...(indexDocument ? [] : [baseName]),
    ].map(slugifySegment);
    const slug = ['/werbeformen', ...slugSegments].join('/');
    const route = `/docs${slug}`;

    const existing = seenRoutes.get(route);
    if (existing !== undefined) {
      throw new Error(
        `Werbeformen slug collision: '${segments.join('/')}' and '${existing}' both map to ${route}`,
      );
    }
    seenRoutes.set(route, segments.join('/'));

    routes.push({
      relativePath: segments.join('/'),
      legacyRoute,
      slug: route === legacyRoute ? null : slug,
      route,
    });
  }

  return routes;
}

/**
 * Redirect entries for @docusaurus/plugin-client-redirects covering every
 * document whose legacy route differs from its slugged route.
 */
export function collectWerbeformenRedirects() {
  return collectWerbeformenRoutes()
    .filter((entry) => entry.slug !== null)
    .map((entry) => ({ from: entry.legacyRoute, to: entry.route }));
}

function documentTitle(absolutePath, fallback) {
  const source = readFileSync(absolutePath, 'utf8');
  const frontMatter = source.match(/^---\n([\s\S]*?)\n---\n/);
  const frontMatterTitle = frontMatter?.[1].match(/^title:\s*(.+)$/m)?.[1];
  if (frontMatterTitle) {
    return frontMatterTitle.trim().replace(/^['"]|['"]$/g, '');
  }
  const heading = source
    .replace(/^---\n[\s\S]*?\n---\n/, '')
    .match(/^#\s+(.+?)\s*#*\s*$/m);
  return heading ? heading[1].trim() : fallback;
}

// A `_category_.json` that links a doc gives that doc its curated menu label
// (e.g. Werbeformen_new/Übersicht.md is labeled "Digitale Werbeformen").
function collectCategoryLabels(directory, prefix = []) {
  const labels = new Map();
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      for (const [key, value] of collectCategoryLabels(
        path.join(directory, entry.name),
        [...prefix, entry.name],
      )) {
        labels.set(key, value);
      }
    } else if (entry.isFile() && entry.name === '_category_.json') {
      try {
        const category = JSON.parse(readFileSync(path.join(directory, entry.name), 'utf8'));
        if (category?.link?.type === 'doc' && typeof category.link.id === 'string' && category.label) {
          labels.set(category.link.id.replace(/^werbeformen\//, ''), category.label);
        }
      } catch {
        // Malformed upstream category files fall back to document titles.
      }
    }
  }
  return labels;
}

const collator = new Intl.Collator('de');

/**
 * Nested menu tree for the Werbeformen navbar item, derived from the same
 * file scan as the slugs so upstream content changes flow through on sync:
 * top-level documents become plain links, and every directory that holds
 * documents becomes a `{ label, to?, items }` submenu (its index document,
 * when present, provides the parent link).
 */
export function collectWerbeformenMenu() {
  const categoryLabels = collectCategoryLabels(werbeformenDirectory);
  const topLinks = [];
  const groups = new Map();

  for (const entry of collectWerbeformenRoutes()) {
    const segments = entry.relativePath.split('/');
    const directorySegments = segments.slice(0, -1);
    const baseName = path.basename(segments.at(-1), path.extname(segments.at(-1)));
    const documentId = entry.relativePath.replace(/\.mdx?$/, '');
    const label =
      categoryLabels.get(documentId) ??
      documentTitle(path.join(werbeformenDirectory, entry.relativePath), baseName);

    const visibleDirectories = directorySegments.filter(
      (segment) => !HIDDEN_SEGMENTS.has(segment),
    );

    if (visibleDirectories.length === 0) {
      topLinks.push({
        label,
        to: entry.route,
        order: baseName.toLowerCase() === 'index' ? '' : label,
      });
      continue;
    }

    const groupKey = visibleDirectories.join(' · ');
    if (!groups.has(groupKey)) {
      groups.set(groupKey, {
        label: groupKey,
        order: (directorySegments[0] === 'Werbeformen_new' ? '0' : '1') + groupKey,
        items: [],
      });
    }
    const group = groups.get(groupKey);

    if (isIndexDocument(baseName, directorySegments)) {
      group.to = entry.route;
    } else {
      group.items.push({ label, to: entry.route });
    }
  }

  topLinks.sort((a, b) => collator.compare(a.order, b.order));
  const sortedGroups = [...groups.values()].sort((a, b) => collator.compare(a.order, b.order));
  for (const group of sortedGroups) {
    group.items.sort((a, b) => collator.compare(a.label, b.label));
  }

  return [...topLinks, ...sortedGroups].map(({ order, ...item }) => item);
}
