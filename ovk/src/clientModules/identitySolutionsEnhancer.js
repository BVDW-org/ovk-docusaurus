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
    td.innerHTML = `<span class="id-status-badge id-status-${variant}">${text}</span>`;
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

function enhance() {
  const htmlClass = document.documentElement.className;
  const inScope = SCOPE_CLASSES.some((c) => htmlClass.includes(c));
  if (!inScope) return;
  badgeStatusCells();
  // The "Live = ..." legend pattern is specific to the identitysolutions
  // README - keep it scoped there to avoid matching unrelated "X = Y" text
  // in the much larger Contextual Standard / Werbeformen docs.
  if (htmlClass.includes('docs-doc-id-identitysolutions')) {
    dotLegendBullets();
  }
}

if (typeof window !== 'undefined') {
  enhance();

  // Docusaurus is a client-rendered SPA - re-run after each route change.
  // A MutationObserver on <html> catches both the doc-id class swap and the
  // new page content; every mutation this script itself makes is guarded by
  // a data-attribute, so it converges after one extra pass.
  const observer = new MutationObserver(() => enhance());
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class'],
  });
}

export default function () {};
