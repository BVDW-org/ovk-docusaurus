import React from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {ArrowDown} from '@phosphor-icons/react/dist/icons/ArrowDown';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import {
  DEFAULT_SOCIAL_IMAGE,
  ORGANIZATION_ID,
  SITE_URL,
  WEBSITE_ID,
  homepageFaqs,
  safeJsonLd,
} from '@site/src/utils/seo.mjs';
import styles from './index.module.css';

const homepageStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': ORGANIZATION_ID,
      name: 'Online-Vermarkterkreis (OVK)',
      alternateName: 'OVK',
      url: 'https://www.ovk.de/',
      description:
        'Der Online-Vermarkterkreis im BVDW entwickelt Standards und schafft Markttransparenz für digitale Werbung in Deutschland.',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/img/ovk-entity-logo.webp`,
        width: 200,
        height: 200,
      },
      image: DEFAULT_SOCIAL_IMAGE,
      parentOrganization: {
        '@type': 'Organization',
        name: 'Bundesverband Digitale Wirtschaft (BVDW) e.V.',
        url: 'https://www.bvdw.org/',
      },
      sameAs: [
        'https://www.ovk.de/',
        'https://www.linkedin.com/company/german-federal-association-of-the-digital-economy-bvdw-e.v.-/',
        'https://www.xing.com/companies/bundesverbanddigitalewirtschaft',
        'https://www.facebook.com/BVDW.eV',
      ],
      knowsAbout: [
        'Digitale Werbeformen',
        'Programmatic Advertising',
        'Identity-Lösungen',
        'Kontextuelles Targeting',
        'Ad Tech',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      url: `${SITE_URL}/`,
      name: 'OVK Tech Specs',
      description:
        'Technische Standards des Online-Vermarkterkreises für digitale Werbung in Deutschland.',
      inLanguage: 'de-DE',
      publisher: {'@id': ORGANIZATION_ID},
    },
    {
      '@type': 'CollectionPage',
      '@id': `${SITE_URL}/#webpage`,
      url: `${SITE_URL}/`,
      name: 'OVK Tech Specs',
      description:
        'Technische OVK-Spezifikationen für Werbeformen, Identity-Lösungen und kontextuelles Targeting im deutschen digitalen Werbemarkt.',
      inLanguage: 'de-DE',
      isPartOf: {'@id': WEBSITE_ID},
      about: {'@id': ORGANIZATION_ID},
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'OVK Werbeformen',
            url: `${SITE_URL}/docs/werbeformen`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Identity-Lösungen',
            url: `${SITE_URL}/docs/identitysolutions`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'OVK Contextual Standard',
            url: `${SITE_URL}/docs/contextualstandards`,
          },
        ],
      },
      hasPart: {'@id': `${SITE_URL}/#faq`},
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#faq`,
      url: `${SITE_URL}/#faq`,
      inLanguage: 'de-DE',
      isPartOf: {'@id': `${SITE_URL}/#webpage`},
      mainEntity: homepageFaqs.map(({question, answer}) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: {'@type': 'Answer', text: answer},
      })),
    },
  ],
};

function HomepageHeader() {
  const logoUrl = useBaseUrl('/img/ovk-logo.svg');

  return (
    <header className={styles.heroBanner}>
      <div className={styles.heroContent}>
        <div className={styles.heroText}>
          <Heading as="h1" className={styles.heroTitle}>
            OVK Tech Specs
          </Heading>
          <span className={styles.heroDivider} aria-hidden="true" />
          <p className={styles.heroSubtitle}>
            Die zentrale technische Referenz des Online-Vermarkterkreises im
            BVDW – Identity-Lösungen, der OVK Contextual Standard und
            standardisierte Werbeformen an einem Ort.
          </p>
        </div>

        <div className={styles.heroLogoContainer}>
          <img
            src={logoUrl}
            alt="Online-Vermarkterkreis im BVDW"
            className={styles.heroLogo}
            width="240"
            height="71"
          />
          <a
            href="#schwerpunkte"
            className={styles.scrollCue}
            aria-label="Weiter zu den Schwerpunkten">
            <span className={styles.scrollCueLabel}>Weiter</span>
            <span className={styles.scrollCueIcon} aria-hidden="true">
              <ArrowDown size={22} weight="bold" />
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <>
      <Head>
        <link rel="preload" as="image" href="/img/ovk-hero-technical-grid.webp" type="image/webp" fetchPriority="high" />
        <meta property="og:type" content="website" />
        <meta property="og:image:alt" content="OVK Tech Specs – technische Standards für digitale Werbung" />
        <meta name="twitter:image:alt" content="OVK Tech Specs – technische Standards für digitale Werbung" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: safeJsonLd(homepageStructuredData)}} />
      </Head>
      <Layout
        description="Technische OVK-Spezifikationen für digitale Werbeformen, Identity-Lösungen und kontextuelles Targeting im deutschen Werbemarkt.">
        <HomepageHeader />
        <main id="schwerpunkte" className={styles.main}>
          <HomepageFeatures />
        </main>
      </Layout>
    </>
  );
}
