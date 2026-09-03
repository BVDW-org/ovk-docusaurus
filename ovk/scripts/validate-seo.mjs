import {access, readFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

function parseAttributes(tag) {
  const attributes = {};
  const pattern = /([^\s=<>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  for (const match of tag.matchAll(pattern)) {
    attributes[match[1].toLowerCase()] = match[2] ?? match[3] ?? match[4] ?? '';
  }
  return attributes;
}

function tags(html, name) {
  return html.match(new RegExp(`<${name}\\b[^>]*>`, 'gi')) ?? [];
}

function normalizedUrl(value) {
  return new URL(value).href;
}

async function resolveHtmlFile(outDir, url) {
  const pathname = decodeURIComponent(new URL(url).pathname);
  const relative = pathname === '/' ? 'index.html' : `${pathname.replace(/^\//, '')}.html`;
  const direct = path.join(outDir, relative);
  try {
    await access(direct);
    return direct;
  } catch {
    return path.join(outDir, pathname.replace(/^\//, ''), 'index.html');
  }
}

function extractPageSignals(html) {
  const titleMatches = [...html.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)];
  const descriptionTags = tags(html, 'meta').filter((tag) => {
    const attrs = parseAttributes(tag);
    return attrs.name?.toLowerCase() === 'description';
  });
  const canonicalTags = tags(html, 'link').filter((tag) => {
    const attrs = parseAttributes(tag);
    return attrs.rel?.toLowerCase().split(/\s+/).includes('canonical');
  });
  const robots = tags(html, 'meta')
    .map(parseAttributes)
    .filter((attrs) => attrs.name?.toLowerCase() === 'robots')
    .map((attrs) => attrs.content?.toLowerCase() ?? '');
  const jsonLd = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
    .filter((match) => parseAttributes(match[1]).type?.toLowerCase() === 'application/ld+json')
    .map((match) => match[2]);

  return {
    titleCount: titleMatches.length,
    title: titleMatches[0]?.[1]?.trim() ?? '',
    descriptionCount: descriptionTags.length,
    description: descriptionTags[0] ? parseAttributes(descriptionTags[0]).content ?? '' : '',
    canonicalCount: canonicalTags.length,
    canonical: canonicalTags[0] ? parseAttributes(canonicalTags[0]).href ?? '' : '',
    h1Count: (html.match(/<h1\b/gi) ?? []).length,
    robots,
    jsonLd,
  };
}

export async function validateSeoBuild(outDir) {
  const errors = [];
  const warnings = [];
  const sitemap = await readFile(path.join(outDir, 'sitemap.xml'), 'utf8');
  const robots = await readFile(path.join(outDir, 'robots.txt'), 'utf8');
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  const titles = new Map();
  const descriptions = new Map();

  if (urls.length === 0) errors.push('sitemap.xml contains no URLs');
  if (urls.some((url) => new URL(url).pathname === '/search')) {
    errors.push('/search must not appear in sitemap.xml');
  }
  if (!/^Sitemap:\s*https:\/\/tech\.ovk\.de\/sitemap\.xml\s*$/im.test(robots)) {
    errors.push('robots.txt does not reference the canonical sitemap');
  }

  for (const url of urls) {
    const htmlFile = await resolveHtmlFile(outDir, url);
    let html;
    try {
      html = await readFile(htmlFile, 'utf8');
    } catch {
      errors.push(`${url}: sitemap target has no generated HTML file`);
      continue;
    }

    const signals = extractPageSignals(html);
    if (signals.titleCount !== 1) errors.push(`${url}: expected one title, found ${signals.titleCount}`);
    if (signals.descriptionCount !== 1) errors.push(`${url}: expected one description, found ${signals.descriptionCount}`);
    if (signals.canonicalCount !== 1) errors.push(`${url}: expected one canonical, found ${signals.canonicalCount}`);
    if (signals.h1Count !== 1) errors.push(`${url}: expected one H1, found ${signals.h1Count}`);
    if (signals.robots.some((content) => content.includes('noindex'))) {
      errors.push(`${url}: noindex page appears in sitemap.xml`);
    }

    if (signals.canonical) {
      try {
        if (normalizedUrl(signals.canonical) !== normalizedUrl(url)) {
          errors.push(`${url}: canonical points to ${signals.canonical}`);
        }
      } catch {
        errors.push(`${url}: canonical URL is invalid`);
      }
    }

    if (/^(active|beschreibung|protokoll|inhalt:?)$/i.test(signals.description.trim())) {
      errors.push(`${url}: generic inferred description "${signals.description}"`);
    }
    if (signals.description.length < 70) warnings.push(`${url}: short description (${signals.description.length} characters)`);
    if (signals.description.length > 170) warnings.push(`${url}: long description (${signals.description.length} characters)`);

    for (const value of signals.jsonLd) {
      try {
        JSON.parse(value);
      } catch {
        errors.push(`${url}: invalid JSON-LD block`);
      }
    }

    if (signals.title) {
      const duplicate = titles.get(signals.title);
      if (duplicate) errors.push(`${url}: duplicate title also used by ${duplicate}`);
      else titles.set(signals.title, url);
    }
    if (signals.description) {
      const duplicate = descriptions.get(signals.description);
      if (duplicate) errors.push(`${url}: duplicate description also used by ${duplicate}`);
      else descriptions.set(signals.description, url);
    }
  }

  const searchHtml = await readFile(path.join(outDir, 'search.html'), 'utf8');
  const searchSignals = extractPageSignals(searchHtml);
  if (!searchSignals.robots.some((content) => content.includes('noindex'))) {
    errors.push('/search is missing a standards-compliant noindex directive');
  }

  for (const requiredFile of ['llms.txt', 'llms-full.txt']) {
    try {
      const content = await readFile(path.join(outDir, requiredFile), 'utf8');
      if (content.trim().length < 100) errors.push(`${requiredFile} is unexpectedly short`);
    } catch {
      errors.push(`${requiredFile} is missing`);
    }
  }

  for (const privateArtifact of [
    'tools/identifier-landscape/core_editor.html',
    'tools/identifier-landscape/vermarkter_editor.html',
    'tools/identifier-landscape/docs',
    'tools/identifier-landscape/scripts',
  ]) {
    try {
      await access(path.join(outDir, privateArtifact));
      errors.push(`internal Identifier Landscape artifact is publicly deployed: ${privateArtifact}`);
    } catch {
      // Expected: these sources are retained in the repository, not the site.
    }
  }

  for (const warning of warnings) console.warn(`SEO warning: ${warning}`);
  if (errors.length > 0) {
    throw new Error(`SEO validation failed:\n- ${errors.join('\n- ')}`);
  }
  console.log(`SEO validation passed: ${urls.length} canonical pages, unique metadata, valid JSON-LD, clean sitemap.`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const outDir = path.resolve(process.argv[2] ?? 'build');
  await validateSeoBuild(outDir);
}
