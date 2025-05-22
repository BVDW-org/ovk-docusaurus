import React, { useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import styles from './index.module.css';

// Simple Mobile Menu Component with CSS-only accordions
function MobileMenu() {
  return (
    <div className={styles.mobileMenu}>
      {/* Identity section */}
      <div className={styles.mobileMenuItem}>
        <input 
          type="checkbox" 
          id="identity-toggle" 
          className={styles.accordionToggle} 
        />
        <label 
          htmlFor="identity-toggle" 
          className={styles.mobileMenuMainItem}
        >
          <div className={styles.menuItemContent}>
            <Link 
              to="/docs/identitysolutions/"
              className={styles.menuItemLink}
              onClick={(e) => e.stopPropagation()}
            >
              Identity
            </Link>
            <span className={styles.chevronIcon}>▼</span>
          </div>
        </label>
        
        <div className={styles.submenuContainer}>
          <div className={styles.mobileSubmenuItem}>
            <Link to="/docs/identitysolutions/Case%20Studies">• Case Studies</Link>
          </div>
          <div className={styles.mobileSubmenuItem}>
            <Link to="/docs/identitysolutions/ID-Support_OVK-Vermarkter/OVK-IdentifierSupport">• OVK Vermarkter Overview</Link>
          </div>
          <div className={styles.mobileSubmenuItem}>
            <Link to="/docs/identitysolutions/ID-Support_OVK-Vermarkter/OVK-IdentifierSupport_byVendor">• OVK Vermarkter ID-Overview</Link>
          </div>
        </div>
      </div>
      
      {/* OVK Contextual Standard section */}
      <div className={styles.mobileMenuItem}>
        <input 
          type="checkbox" 
          id="contextual-toggle" 
          className={styles.accordionToggle} 
        />
        <label 
          htmlFor="contextual-toggle" 
          className={styles.mobileMenuMainItem}
        >
          <div className={styles.menuItemContent}>
            <Link 
              to="/docs/contextualstandards"
              className={styles.menuItemLink}
              onClick={(e) => e.stopPropagation()}
            >
              OVK Contextual Standard
            </Link>
            <span className={styles.chevronIcon}>▼</span>
          </div>
        </label>
        
        <div className={styles.submenuContainer}>
           <div className={styles.mobileSubmenuItem}>
            <Link to="/docs/contextualstandards">• Intro</Link>
          </div>
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
