import React, { useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import styles from './index.module.css';

// Simple Mobile Menu Component - Plain text menu with no fancy effects
function MobileMenu() {
  return (
    <div className={styles.mobileMenu}>
      {/* Main menu item */}
      <div className={styles.mobileMenuItem}>
        <div className={styles.mobileMenuMainItem}>
          <Link to="/docs/identitysolutions/">Identity</Link>
        </div>
      </div>
      
      {/* Submenu items with indentation */}
      <div className={styles.mobileSubmenuItem}>
        <Link to="/docs/identitysolutions/Case%20Studies">• Case Studies</Link>
      </div>
      <div className={styles.mobileSubmenuItem}>
        <Link to="/docs/identitysolutions/ID-Support_OVK-Vermarkter/OVK-IdentifierSupport">• OVK Vermarkter Overview</Link>
      </div>
      <div className={styles.mobileSubmenuItem}>
        <Link to="/docs/identitysolutions/ID-Support_OVK-Vermarkter/OVK-IdentifierSupport_byVendor">• OVK Vermarkter ID-Overview</Link>
      </div>
      
      {/* Second main menu item */}
      <div className={styles.mobileMenuItem}>
        <div className={styles.mobileMenuMainItem}>
          <Link to="/docs/contextualstandards">OVK Contextual Standard</Link>
        </div>
      </div>
    </div>
  );
}

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
            {/* Desktop button */}
            <Link
              className={clsx('button', styles.heroButton, styles.desktopOnly)}
              to="/docs/identitysolutions/">
              Zur Übersicht
            </Link>
            
            {/* Mobile menu */}
            <div className={styles.mobileOnly}>
              <MobileMenu />
            </div>
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
