import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className={styles.heroContent}>
        <div className={styles.heroLogoContainer}>
          <img
            src="/img/ovk-logo.svg"
            alt="OVK Logo"
            className={styles.heroLogo}
          />
        </div>
        <div className={styles.heroText}>
          <Heading as="h1" className={styles.heroTitle}>
            OVK Tech Specs
          </Heading>
          {siteConfig.tagline && (
            <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
          )}
          <div className={styles.heroButtons}>
            <Link
              className={clsx('button', styles.heroButton)}
              to="/docs/identitysolutions/">
              Zur Übersicht
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`OVK Tech Specs`}
      description="Aktuelle Specs und Standardisierungen des Online Vermarkterkreises (OVK)">
      <HomepageHeader />
      <main className={styles.main}>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
