// Purely presentational, client-side enhancement for the Identity,
// OVK Contextual Standard and Werbeformen docs. These pages are edited
// directly on GitHub (vendor tables, spec tables), so nothing here changes
// the authoring format - it only decorates the already-rendered DOM (status
// words in table cells become colored badges; the identitysolutions README
// legend additionally gets a matching color dot). Safe to no-op if the
// expected text isn't found.
//
// Scoping relies on the "docs-doc-id-<folder>/..." class that Docusaurus
// itself already puts on <html> for every doc under these folders - no
// custom class management needed.

const STATUS_MAP = {
  'live': 'live',
  'in-progress': 'progress',
  'in progress': 'progress',
  'no support': 'no',
  'no supported': 'no',
  // Werbeformen spec tables ("Big screen: ja/nein")
  'ja': 'live',
  'nein': 'no',
};

const SCOPE_CLASSES = [
  'docs-doc-id-identitysolutions',
  'docs-doc-id-contextualstandards',
  'docs-doc-id-werbeformen',
];

function normalizeStatusKey(text) {
  return text.trim().toLowerCase().replace(/\s+/g, ' ');
}

function badgeStatusCells() {
  document.querySelectorAll('.markdown table td').forEach((td) => {
    if (td.dataset.idBadged) return;
    // Only ever touch cells whose *entire* content is one of the known
    // status words - never partial matches inside longer sentences.
    const text = td.textContent.trim();
    const key = normalizeStatusKey(text);
    const variant = STATUS_MAP[key];
    if (!variant) return;
    td.dataset.idBadged = '1';
    const badge = document.createElement('span');
    badge.className = `id-status-badge id-status-${variant}`;
    badge.textContent = text;
    td.replaceChildren(badge);
  });
}

function dotLegendBullets() {
  document.querySelectorAll('.markdown li').forEach((li) => {
    if (li.dataset.idLegendDot) return;
    // Legend entries read "Live = ID is live on publisher website(s)" -
    // take only the part before the "=" as the candidate status word.
    const eqIndex = li.textContent.indexOf('=');
    if (eqIndex === -1) return;
    const leadPart = li.textContent.slice(0, eqIndex);
    const key = normalizeStatusKey(leadPart);
    const variant = STATUS_MAP[key];
    if (!variant) return;
    li.dataset.idLegendDot = '1';
    const dot = document.createElement('span');
    dot.className = `id-status-dot id-status-${variant}`;
    li.prepend(dot);
  });
}

// The Contextual Standard index.md (synced from upstream) opens with a manual
// table of contents: an "Inhalt:" paragraph followed by alternating
// <p><a>chapter</a></p> and <ul> sub-section lists. Rebuild that block into a
// structured nav card. Nesting comes from the numbering ("3." > "3.1" >
// "3.1.1"); un-numbered entries nest under the preceding one.
function sectionDepth(label) {
  const match = label.match(/^(\d+(?:\.\d+)*)\.?\s/);
  return match ? match[1].split('.').length : null;
}

function splitNumber(label) {
  const match = label.match(/^(\d+(?:\.\d+)*)\.?\s+(.*)$/);
  if (!match) return {number: '', title: label};
  let title = match[2];
  // Source uses all-caps for some sub-chapters ("3.1 QUALITÄT").
  if (title === title.toUpperCase() && /\p{L}/u.test(title)) {
    title = title
      .toLowerCase()
      .replace(/(^|\s)(\p{L})/gu, (m, space, letter) =>
        space && m.trim() === 'u' ? m : space + letter.toUpperCase(),
      )
      .replace(/ Und /g, ' und ');
  }
  return {number: match[1], title};
}

function collectTocEntries(start) {
  const entries = [];
  const nodes = [];
  let node = start.nextElementSibling;
  while (node && (node.tagName === 'P' || node.tagName === 'UL')) {
    const anchors =
      node.tagName === 'P'
        ? [...node.children].filter((c) => c.tagName === 'A')
        : [...node.querySelectorAll(':scope > li > a')];
    if (!anchors.length) break;
    // A <p> must contain only the link, otherwise the TOC block has ended.
    if (node.tagName === 'P' && node.textContent.trim() !== anchors[0].textContent.trim()) break;
    anchors.forEach((a) => {
      const label = a.textContent.trim();
      const depth = sectionDepth(label);
      entries.push({
        href: a.getAttribute('href'),
        label,
        depth: depth ?? (entries.length ? entries[entries.length - 1].depth + 1 : 1),
      });
    });
    nodes.push(node);
    node = node.nextElementSibling;
  }
  return {entries, nodes};
}

function buildTocLink(entry, className) {
  const {number, title} = splitNumber(entry.label);
  const link = document.createElement('a');
  link.href = entry.href;
  link.className = className;
  if (number) {
    const num = document.createElement('span');
    num.className = 'ctx-toc__num';
    num.textContent = entry.depth === 1 ? number.padStart(2, '0') : number;
    link.append(num);
  }
  const text = document.createElement('span');
  text.className = 'ctx-toc__title';
  text.textContent = title;
  link.append(text);
  return link;
}

function enhanceContextualToc() {
  const markdown = document.querySelector('.markdown');
  if (!markdown || markdown.querySelector('.ctx-toc')) return;
  const start = [...markdown.querySelectorAll(':scope > p')].find(
    (p) => p.textContent.trim().replace(/:$/, '') === 'Inhalt',
  );
  if (!start) return;
  const {entries, nodes} = collectTocEntries(start);
  if (entries.length < 3) return;

  const nav = document.createElement('nav');
  nav.className = 'ctx-toc';
  nav.setAttribute('aria-label', 'Inhalt');
  const heading = document.createElement('span');
  heading.className = 'ctx-toc__eyebrow';
  heading.textContent = 'Inhalt';
  nav.append(heading);

  const chapters = document.createElement('ol');
  chapters.className = 'ctx-toc__chapters';
  nav.append(chapters);

  // Stack of open <ul> lists per depth; index 0 is the chapter level.
  let chapterItem = null;
  const lists = [];
  entries.forEach((entry) => {
    if (entry.depth === 1 || !chapterItem) {
      chapterItem = document.createElement('li');
      chapterItem.className = 'ctx-toc__chapter';
      chapterItem.append(buildTocLink(entry, 'ctx-toc__link ctx-toc__link--chapter'));
      chapters.append(chapterItem);
      lists.length = 0;
      return;
    }
    const level = entry.depth - 2;
    while (lists.length > level + 1) lists.pop();
    if (!lists[level]) {
      const parent = level === 0 ? chapterItem : lists[level - 1].lastElementChild;
      const list = document.createElement('ul');
      list.className = `ctx-toc__sub ctx-toc__sub--${level + 1}`;
      (parent || chapterItem).append(list);
      lists[level] = list;
    }
    const item = document.createElement('li');
    item.append(buildTocLink(entry, 'ctx-toc__link'));
    lists[level].append(item);
  });

  start.replaceWith(nav);
  nodes.forEach((n) => n.remove());
}

function enhance() {
  const htmlClass = document.documentElement.className;
  const inScope = SCOPE_CLASSES.some((c) => htmlClass.includes(c));
  if (!inScope) return;
  if (htmlClass.includes('docs-doc-id-contextualstandards')) {
    enhanceContextualToc();
  }
  badgeStatusCells();
  // The "Live = ..." legend pattern is specific to the identitysolutions
  // README - keep it scoped there to avoid matching unrelated "X = Y" text
  // in the much larger Contextual Standard / Werbeformen docs.
  if (htmlClass.includes('docs-doc-id-identitysolutions')) {
    dotLegendBullets();
  }
}

const clientModule = {
  onRouteDidUpdate() {
    enhance();
  },
};

export default clientModule;
