import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {ArrowDown} from '@phosphor-icons/react/dist/icons/ArrowDown';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import styles from './index.module.css';

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
          />
          <a
            href="#schwerpunkte"
            className={styles.scrollCue}
            aria-label="Zu den Schwerpunkten scrollen">
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
    <Layout
      description="Aktuelle Specs und Standardisierungen des Online-Vermarkterkreises (OVK)">
      <HomepageHeader />
      <main id="schwerpunkte" className={styles.main}>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
