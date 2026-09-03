import {readdir, readFile, rm, writeFile} from 'node:fs/promises';
import path from 'node:path';

const markdownExtensions = new Set(['.md', '.mdx']);
const excludedDocuments = new Set([
  'werbeformen/Werbeformen_new/Vast Redirect.md',
]);

async function collectMarkdownFiles(directory, prefix = '') {
  const entries = await readdir(directory, {withFileTypes: true});
  const nested = await Promise.all(entries.map(async (entry) => {
    const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name;
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      return collectMarkdownFiles(absolutePath, relativePath);
    }
    return entry.isFile() && markdownExtensions.has(path.extname(entry.name))
      ? [{absolutePath, relativePath}]
      : [];
  }));
  return nested.flat();
}

function parseScalar(value) {
  const trimmed = value?.trim();
  if (!trimmed) return undefined;
  try {
    return JSON.parse(trimmed);
  } catch {
    return trimmed.replace(/^['"]|['"]$/g, '');
  }
}

function parseDocument(source, relativePath) {
  const frontMatterMatch = source.match(/^---\n([\s\S]*?)\n---\n/);
  const frontMatter = frontMatterMatch?.[1] ?? '';
  const body = source.slice(frontMatterMatch?.[0].length ?? 0).trim();
  const get = (key) => parseScalar(frontMatter.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))?.[1]);
  const inferredTitle = body.match(/^#\s+(.+?)\s*#*\s*$/m)?.[1]?.trim();

  return {
    relativePath,
    title: get('title') ?? inferredTitle ?? path.basename(relativePath, path.extname(relativePath)),
    description: get('description') ?? '',
    slug: get('slug'),
    body,
  };
}

function documentRoute(document) {
  if (document.slug) return `/docs${document.slug}`;
  const withoutExtension = document.relativePath.replace(/\.mdx?$/, '');
  const segments = withoutExtension.split('/');
  if (/^(index|readme)$/i.test(segments.at(-1))) segments.pop();
  return `/docs/${segments.join('/')}`.replace(/\/$/, '');
}

function absoluteUrl(siteUrl, route) {
  return encodeURI(new URL(route, `${siteUrl}/`).href);
}

function createLlmsIndex(siteUrl, documents) {
  const linkFor = (relativePath, label) => {
    const document = documents.find((item) => item.relativePath === relativePath);
    if (!document) return '';
    return `- [${label}](${absoluteUrl(siteUrl, documentRoute(document))}): ${document.description}`;
  };

  return `# OVK Tech Specs

> Offizielle technische Referenz des Online-Vermarkterkreises (OVK) im BVDW für digitale Werbung im deutschen Markt. Die Dokumentation umfasst standardisierte Werbeformen, Identity-Lösungen und den OVK Contextual Standard.

Die Inhalte richten sich an Vermarkter, Publisher, Agenturen, Werbetreibende und Ad-Tech-Anbieter. Die HTML-Seiten sind die kanonischen Quellen; dieses Dokument ist ein optionaler, maschinenlesbarer Wegweiser und keine Crawler- oder Lizenzrichtlinie.

## Kernbereiche

${linkFor('werbeformen/index.md', 'OVK Werbeformen')}
${linkFor('werbeformen/Werbeformen_new/Übersicht.md', 'Alle digitalen Werbeformen im Überblick')}
${linkFor('identitysolutions/README.md', 'Identity-Lösungen')}
${linkFor('identitysolutions/ID-Support_OVK-Vermarkter/OVK-IdentifierSupport_byVendor.md', 'Identifier-Unterstützung der OVK-Vermarkter')}
${linkFor('contextualstandards/index.md', 'OVK Contextual Standard')}
${linkFor('tools/id-landscape-map.md', 'OVK ID Landscape Map')}

## Technische Hilfen

${linkFor('werbeformen/Tech-Hilfe/klicktag.md', 'Clicktag implementieren')}
${linkFor('werbeformen/Tech-Hilfe/redirect.md', 'Redirect-Spezifikationen')}
${linkFor('werbeformen/Werbeformen_new/Video/In-Stream/VastRedirect.md', 'VAST Redirect')}

## Weitere Ressourcen

- [Vollständiger Dokumentationskorpus](${siteUrl}/llms-full.txt): Alle veröffentlichten Markdown-Dokumente mit kanonischen URLs.
- [XML-Sitemap](${siteUrl}/sitemap.xml): Kanonische, indexierbare HTML-Seiten.
- [Über den OVK und diese Website](${siteUrl}/about): Verantwortung, Zielgruppen und Veröffentlichungsprozess.
- [Kontakt](https://www.ovk.de/kontakt/): Offizielle Kontaktmöglichkeiten.
- [Impressum](https://www.ovk.de/impressum/): Rechtliche Anbieterangaben.
`;
}

function createLlmsFull(siteUrl, documents) {
  const sections = documents
    .sort((a, b) => documentRoute(a).localeCompare(documentRoute(b), 'de'))
    .map((document) => {
      const url = absoluteUrl(siteUrl, documentRoute(document));
      return `## ${document.title}

Kanonische Quelle: ${url}

${document.description ? `> ${document.description}\n\n` : ''}${document.body}`;
    });

  return `# OVK Tech Specs – vollständiger Dokumentationskorpus

> Konsolidierte Markdown-Fassung der öffentlich zugänglichen OVK Tech Specs. Für Zitate, Aktualität und Navigation ist jeweils die angegebene kanonische HTML-Seite maßgeblich.

${sections.join('\n\n---\n\n')}
`;
}

export default function seoArtifactsPlugin(context) {
  const docsDirectory = path.join(context.siteDir, 'docs');

  return {
    name: 'ovk-seo-artifacts',
    getPathsToWatch() {
      return [path.join(docsDirectory, '**/*.{md,mdx}')];
    },
    async loadContent() {
      const files = await collectMarkdownFiles(docsDirectory);
      const documents = await Promise.all(
        files
          .filter(({relativePath}) => !excludedDocuments.has(relativePath))
          .map(async ({absolutePath, relativePath}) =>
            parseDocument(await readFile(absolutePath, 'utf8'), relativePath),
          ),
      );
      return {documents};
    },
    async postBuild({content, outDir, siteConfig}) {
      const {documents} = content;
      await Promise.all([
        writeFile(path.join(outDir, 'llms.txt'), createLlmsIndex(siteConfig.url, documents)),
        writeFile(path.join(outDir, 'llms-full.txt'), createLlmsFull(siteConfig.url, documents)),
        rm(path.join(outDir, 'tools/identifier-landscape/docs'), {recursive: true, force: true}),
        rm(path.join(outDir, 'tools/identifier-landscape/scripts'), {recursive: true, force: true}),
        rm(path.join(outDir, 'tools/identifier-landscape/core_editor.html'), {force: true}),
        rm(path.join(outDir, 'tools/identifier-landscape/vermarkter_editor.html'), {force: true}),
        rm(path.join(outDir, 'tools/identifier-landscape/README.md'), {force: true}),
        rm(path.join(outDir, 'img/ovk-hero-technical-grid.png'), {force: true}),
        rm(path.join(outDir, 'img/logo_ovk_mobile.png'), {force: true}),
        rm(path.join(outDir, 'img/team/alwin-viereck.jpg'), {force: true}),
        rm(path.join(outDir, 'img/team/carlos-bracho.jpg'), {force: true}),
        rm(path.join(outDir, 'img/team/markus-letzner.jpg'), {force: true}),
      ]);
    },
  };
}
