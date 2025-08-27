import React, { useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import styles from './index.module.css';

// Modern Segmented Control Navigation with Submenus for Mobile
function MobileMenu() {
  const [activeSegment, setActiveSegment] = useState('identity');
  const [showSubmenu, setShowSubmenu] = useState(true);
  
  const handleSegmentClick = (segment) => {
    if (activeSegment === segment) {
      // Toggle submenu if clicking the same segment
      setShowSubmenu(!showSubmenu);
    } else {
      // Show submenu when switching segments
      setActiveSegment(segment);
      setShowSubmenu(true);
    }
  };
  
  return (
    <div className={styles.mobileNavContainer}>
      {/* Segmented Control */}
      <div className={styles.segmentedControlContainer}>
        <div className={styles.segmentedControl}>
          <button 
            className={clsx(
              styles.segment, 
              activeSegment === 'identity' && styles.segmentActive
            )}
            onClick={() => handleSegmentClick('identity')}
          >
            Identity
          </button>
          <button 
            className={clsx(
              styles.segment, 
              activeSegment === 'contextual' && styles.segmentActive
            )}
            onClick={() => handleSegmentClick('contextual')}
          >
            OVK Contextual
          </button>
           <button 
            className={clsx(
              styles.segment, 
              activeSegment === 'werbeformen' && styles.segmentActive
            )}
            onClick={() => handleSegmentClick('werbeformen')}
          >
            Werbeformen
          </button>
        </div>
      </div>
      
{showSubmenu && (
  <div className={styles.submenu}>
    {activeSegment === 'identity' ? (
      <>
        <Link to="/docs/identitysolutions/" className={styles.submenuMainLink}>
          Identity Overview
        </Link>
        <div className={styles.submenuLinks}>
          <Link to="/docs/identitysolutions/Case%20Studies" className={styles.submenuLink}>
            Case Studies
          </Link>
          <Link to="/docs/identitysolutions/ID-Support_OVK-Vermarkter/OVK-IdentifierSupport_byVendor" className={styles.submenuLink}>
            OVK Vermarkter ID-Overview
          </Link>
        </div>
      </>
    ) : activeSegment === 'contextual' ? (
      <>
        <Link to="/docs/contextualstandards" className={styles.submenuMainLink}>
          OVK Contextual Standard
        </Link>
        <div className={styles.submenuLinks}>
          <Link to="/docs/contextualstandards" className={styles.submenuLink}>
            Intro
          </Link>
        </div>
      </>
    ) : activeSegment === 'werbeformen' ? (
      <>
        <Link to="/docs/werbeformen/" className={styles.submenuMainLink}>
          Werbeformen Übersicht
        </Link>
        <div className={styles.submenuLinks}>
          <Link to="/docs/werbeformen/" className={styles.submenuLink}>
            Intro
          </Link>
           <Link to="/docs/werbeformen/Werbeformen_new/Display/Standard%20Werbeform/Ad%20Bundle" className={styles.submenuLink}>
            Display
          </Link>
           <Link to="/docs/werbeformen/Werbeformen_new/Video/In-Stream/Bumper%20Ad" className={styles.submenuLink}>
            Video
          </Link>       
        </div>
      </>
    ) : null}
  </div>
)}
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
