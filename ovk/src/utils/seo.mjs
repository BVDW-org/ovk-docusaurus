// Shared by browser metadata components and the Node-based sync normalizer.
export const SITE_URL = 'https://tech.ovk.de';
export const ORGANIZATION_ID = 'https://www.ovk.de/#organization';
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const DEFAULT_SOCIAL_IMAGE = `${SITE_URL}/img/ovk-social-card.jpg`;

export const ORGANIZATION_NAME = 'Online-Vermarkterkreis (OVK)';
export const PUBLISHER_NAME = 'Online-Vermarkterkreis (OVK) im BVDW';

export const homepageFaqs = [
  {
    question: 'Was sind die OVK Tech Specs?',
    answer:
      'Die OVK Tech Specs sind die zentrale technische Referenz des Online-Vermarkterkreises im BVDW. Sie bündeln marktübergreifende Spezifikationen für digitale Werbeformen, Identity-Lösungen und den OVK Contextual Standard an einem öffentlich zugänglichen Ort.',
  },
  {
    question: 'Für wen sind die technischen Spezifikationen gedacht?',
    answer:
      'Die Dokumentation richtet sich an Vermarkter, Publisher, Agenturen, Werbetreibende sowie Ad-Tech-Anbieter. Sie hilft technischen und operativen Teams, digitale Kampagnen nach gemeinsamen Anforderungen zu planen, umzusetzen und zu prüfen.',
  },
  {
    question: 'Welche Werbeformen dokumentiert der OVK?',
    answer:
      'Der Bereich Werbeformen beschreibt standardisierte Display- und Videoformate für Desktop und Mobile. Jede Formatseite enthält – soweit für das Format relevant – Beschreibung, Abmessungen, Dateiformate, Gewichtsgrenzen und weitere technische Anforderungen.',
  },
  {
    question: 'Was zeigt die OVK Identity-Dokumentation?',
    answer:
      'Die Identity-Dokumentation zeigt, welche Identifier von OVK-Vermarktern sowie angebundenen SSPs und DSPs unterstützt werden. Ergänzend stehen Case Studies und eine interaktive ID Landscape Map für den Marktüberblick bereit.',
  },
  {
    question: 'Was ist der OVK Contextual Standard?',
    answer:
      'Der OVK Contextual Standard ist ein anbieter- und technologieunabhängiger Qualitätsrahmen für kontextuelles Targeting. Er beschreibt Anforderungen an Klassifizierung, Qualitätssicherung, Dokumentation, Datenschutz und die technische Signalisierung.',
  },
  {
    question: 'Wie aktuell sind die Inhalte?',
    answer:
      'Die Fachinhalte werden aus den verantwortlichen OVK-Projekten synchronisiert und vor der Veröffentlichung automatisiert validiert. Auf Dokumentationsseiten zeigt „Zuletzt aktualisiert“ den aus der Versionshistorie ermittelten Stand der jeweiligen Quelle.',
  },
];

const exactDocSeo = {
  'contextualstandards/index': {
    title: 'OVK Contextual Standard v1.0',
    description:
      'Der OVK Contextual Standard v1.0 definiert Qualitäts-, Datenschutz-, Dokumentations- und Technikvorgaben für kontextuelles Targeting.',
    keywords: ['OVK Contextual Standard', 'kontextuelles Targeting', 'IAB Content Taxonomy', 'OpenRTB'],
  },
  'identitysolutions/README': {
    title: 'Identity-Lösungen im deutschen Werbemarkt',
    description:
      'Überblick über cookielose Identity-Lösungen, unterstützte Identifier, OVK-Vermarkter, SSPs, DSPs und Case Studies im deutschen Werbemarkt.',
    keywords: ['Identity-Lösungen', 'Identifier', 'Post-Cookie', 'OVK Vermarkter'],
  },
  'identitysolutions/Case Studies': {
    title: 'Identity Case Studies aus dem OVK-Markt',
    description:
      'Praxisbeispiele zu netID, ID5 und Utiq: Kampagnen, Vermarkter, Werbekunden und messbare Identity-Anwendungsfälle im deutschen Werbemarkt.',
    keywords: ['Identity Case Studies', 'netID', 'ID5', 'Utiq', 'adressierbare Werbung'],
  },
  'identitysolutions/ID-Support_DSPs/DSP-IdentifierSupport': {
    title: 'Identifier-Unterstützung deutscher DSPs',
    description:
      'Aktuelle OVK-Übersicht zur Unterstützung von Identity-Lösungen und Identifiern durch Demand-Side-Plattformen im deutschen Werbemarkt.',
    keywords: ['DSP Identifier Support', 'Demand-Side-Plattform', 'Identity-Lösungen', 'OVK'],
  },
  'identitysolutions/ID-Support_SSPs/SSP-IdentifierSupport': {
    title: 'Identifier-Unterstützung deutscher SSPs',
    description:
      'Aktuelle OVK-Übersicht zur Unterstützung von Identity-Lösungen und Identifiern durch Supply-Side-Plattformen im deutschen Werbemarkt.',
    keywords: ['SSP Identifier Support', 'Supply-Side-Plattform', 'Identity-Lösungen', 'OVK'],
  },
  'identitysolutions/ID-Support_OVK-Vermarkter/OVK-IdentifierSupport_byVendor': {
    title: 'Identifier-Unterstützung der OVK-Vermarkter',
    description:
      'Vergleich, welche cookielosen Identity-Lösungen und Identifier die deutschen OVK-Vermarkter unterstützen und über welche Systeme sie nutzbar sind.',
    keywords: ['OVK Vermarkter', 'Identifier Support', 'Identity-Lösungen', 'Post-Cookie'],
  },
  'tools/id-landscape-map': {
    title: 'OVK ID Landscape Map',
    description:
      'Interaktive Übersicht der OVK Identifier-Landschaft: Unterstützung durch Vermarkter, SSPs und DSPs sowie verfügbare Data Partner vergleichen.',
    keywords: ['ID Landscape Map', 'Identifier', 'DSP', 'SSP', 'OVK Vermarkter'],
  },
  'werbeformen/index': {
    title: 'OVK Werbeformen und technische Standards',
    description:
      'Einstieg in die standardisierten OVK Werbeformen mit technischen Spezifikationen für Display-, Mobile-, Native- und Video-Werbung.',
    keywords: ['OVK Werbeformen', 'digitale Werbeformate', 'Display Ads', 'Video Ads'],
  },
  'werbeformen/Werbeformen_new/Übersicht': {
    title: 'Digitale OVK Werbeformen im Überblick',
    description:
      'Vergleich der standardisierten OVK Werbeformen für Display, Mobile, Native und Video mit direktem Zugang zu allen technischen Spezifikationen.',
    keywords: ['digitale Werbeformen', 'OVK Standards', 'Display Werbung', 'Video Werbung'],
  },
  'werbeformen/Tech-Hilfe/readme': {
    title: 'Technische Hilfe für digitale Werbemittel',
    description:
      'Technische OVK-Hilfen zur korrekten Anlieferung digitaler Werbemittel, einschließlich Clicktag-, Redirect- und VAST-Spezifikationen.',
    keywords: ['Werbemittel technische Hilfe', 'Clicktag', 'Redirect', 'VAST'],
  },
  'werbeformen/Tech-Hilfe/klicktag': {
    title: 'Clicktag richtig implementieren',
    description:
      'OVK-Anleitung für Clicktags in digitalen Werbemitteln: Funktionsweise, korrekte Implementierung, Code-Beispiele und Adserver-Anforderungen.',
    keywords: ['Clicktag', 'Werbemittel', 'Adserver', 'HTML5 Werbung'],
  },
  'werbeformen/Tech-Hilfe/redirect': {
    title: 'Redirect-Spezifikationen für Werbemittel',
    description:
      'Technische OVK-Anforderungen für Redirect-Werbemittel: sichere Auslieferung, zulässige Requests, SSL-Kompatibilität und Dateigewichte.',
    keywords: ['Redirect-Werbemittel', 'Redirect-Spezifikationen', 'Adserver', 'OVK'],
  },
  'werbeformen/Werbeformen_new/Vast Redirect': {
    title: 'VAST Redirect: technische Spezifikation',
    description:
      'Technische OVK-Spezifikation für VAST Redirects in der Video-Werbung mit Anforderungen an VAST-Version, Dateiformate und Auslieferung.',
    keywords: ['VAST Redirect', 'Video-Werbung', 'VAST', 'OVK Spezifikation'],
  },
  'werbeformen/Werbeformen_new/Video/In-Stream/VastRedirect': {
    title: 'VAST Redirect für In-Stream Video Ads',
    description:
      'OVK-Anforderungen für VAST Redirects bei In-Stream Video Ads: technische Spezifikationen, unterstützte Formate und Hinweise zur Auslieferung.',
    keywords: ['VAST Redirect', 'In-Stream Video', 'Video Ads', 'OVK'],
  },
  'werbeformen/Werbeformen_new/Display/Sonder-Werbeformen/Fireplace': {
    description:
      'OVK-Spezifikation für Fireplace- und Pageskin-Werbung: Aufbau, Abmessungen, Dateiformate und technische Anforderungen für digitale Kampagnen.',
    keywords: ['Fireplace Werbung', 'Pageskin', 'OVK Werbeform', 'technische Spezifikationen'],
  },
  'werbeformen/Werbeformen_new/Display/Sonder-Werbeformen/Mobile Understitial': {
    description:
      'OVK-Spezifikation für Mobile Understitial und Mobile Poster Ads: Abmessungen, Dateiformate, Einsatz und technische Anforderungen.',
    keywords: ['Mobile Understitial', 'Mobile Poster Ad', 'OVK Werbeform', 'technische Spezifikationen'],
  },
};

export function getDocSeo(metadata, frontMatter = {}) {
  const exact = exactDocSeo[metadata.id];
  const isAdFormat = metadata.id.startsWith('werbeformen/Werbeformen_new/');
  const generated = isAdFormat
    ? {
        description: `Technische Spezifikationen für das OVK-Werbeformat ${metadata.title}: Beschreibung, Abmessungen, Dateiformate und Anforderungen für digitale Kampagnen.`,
        keywords: [metadata.title, 'OVK Werbeform', 'technische Spezifikationen', 'digitale Werbung'],
      }
    : {
        description:
          metadata.description?.length >= 70
            ? metadata.description
            : `${metadata.title}: technische Dokumentation und Standards des Online-Vermarkterkreises (OVK) für den deutschen digitalen Werbemarkt.`,
        keywords: [metadata.title, 'OVK', 'technische Standards', 'digitale Werbung'],
      };

  return {
    title: frontMatter.title ?? exact?.title ?? metadata.title,
    description: frontMatter.description ?? exact?.description ?? generated.description,
    keywords: frontMatter.keywords ?? exact?.keywords ?? generated.keywords,
  };
}

export function safeJsonLd(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
