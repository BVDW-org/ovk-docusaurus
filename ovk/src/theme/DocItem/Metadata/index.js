import React from 'react';
import Head from '@docusaurus/Head';
import {PageMetadata} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import {
  DEFAULT_SOCIAL_IMAGE,
  ORGANIZATION_ID,
  SITE_URL,
  WEBSITE_ID,
  getDocSeo,
  safeJsonLd,
} from '@site/src/utils/seo.mjs';

export default function DocItemMetadata() {
  const {metadata, frontMatter, assets} = useDoc();
  const seo = getDocSeo(metadata, frontMatter);
  const canonicalUrl = `${SITE_URL}${metadata.permalink}`;
  const dateModified = metadata.lastUpdatedAt
    ? new Date(metadata.lastUpdatedAt).toISOString()
    : undefined;
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    '@id': `${canonicalUrl}#tech-article`,
    headline: seo.title,
    description: seo.description,
    url: canonicalUrl,
    mainEntityOfPage: canonicalUrl,
    image: DEFAULT_SOCIAL_IMAGE,
    inLanguage: 'de-DE',
    isAccessibleForFree: true,
    author: {
      '@type': 'Organization',
      '@id': ORGANIZATION_ID,
      name: 'Online-Vermarkterkreis (OVK)',
    },
    publisher: {
      '@type': 'Organization',
      '@id': ORGANIZATION_ID,
      name: 'Online-Vermarkterkreis (OVK)',
    },
    isPartOf: {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      name: 'OVK Tech Specs',
    },
    about: seo.keywords.map((name) => ({'@type': 'Thing', name})),
    ...(dateModified ? {dateModified} : {}),
  };

  return (
    <>
      <PageMetadata
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        image={assets.image ?? frontMatter.image}
      />
      <Head>
        <meta property="og:type" content="article" />
        <meta property="og:image:alt" content="OVK Tech Specs – technische Standards für digitale Werbung" />
        <meta name="twitter:image:alt" content="OVK Tech Specs – technische Standards für digitale Werbung" />
        {dateModified && <meta property="article:modified_time" content={dateModified} />}
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: safeJsonLd(structuredData)}} />
      </Head>
    </>
  );
}
