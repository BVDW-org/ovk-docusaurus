import React from 'react';
import Head from '@docusaurus/Head';
import {
  ORGANIZATION_ID,
  SITE_URL,
  WEBSITE_ID,
  safeJsonLd,
} from '@site/src/utils/seo.mjs';

const dataset = {
  '@context': 'https://schema.org',
  '@type': 'Dataset',
  '@id': `${SITE_URL}/docs/tools/id-landscape-map#dataset`,
  name: 'OVK ID Landscape Map',
  description:
    'Strukturierte Übersicht zur Unterstützung cookieloser Identifier durch OVK-Vermarkter, SSPs, DSPs und Data Partner im deutschen Werbemarkt.',
  url: `${SITE_URL}/docs/tools/id-landscape-map`,
  inLanguage: 'de-DE',
  isAccessibleForFree: true,
  creator: {'@id': ORGANIZATION_ID},
  publisher: {'@id': ORGANIZATION_ID},
  isPartOf: {'@id': WEBSITE_ID},
  spatialCoverage: {
    '@type': 'Country',
    name: 'Deutschland',
  },
  variableMeasured: [
    'Unterstützte Identifier',
    'Unterstützte Use Cases',
    'DSP-Unterstützung',
    'SSP-Unterstützung',
    'Vermarkter-Unterstützung',
    'Data-Partner-Kompatibilität',
  ],
};

export default function IdLandscapeMetadata() {
  return (
    <Head>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: safeJsonLd(dataset)}} />
    </Head>
  );
}
