import React from 'react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import {
  ORGANIZATION_ID,
  SITE_URL,
  WEBSITE_ID,
  safeJsonLd,
} from '@site/src/utils/seo.mjs';
import styles from './about.module.css';

const aboutStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${SITE_URL}/about#webpage`,
  url: `${SITE_URL}/about`,
  name: 'Über den OVK und die OVK Tech Specs',
  description:
    'Verantwortung, Zielgruppen, Qualitätsanspruch und Veröffentlichungsprozess der technischen OVK-Spezifikationen.',
  inLanguage: 'de-DE',
  isPartOf: {'@id': WEBSITE_ID},
  mainEntity: {'@id': ORGANIZATION_ID},
};

export default function About() {
  return (
    <>
      <Head>
        <meta property="og:type" content="website" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: safeJsonLd(aboutStructuredData)}} />
      </Head>
      <Layout
        title="Über den OVK und die Tech Specs"
        description="Verantwortung, Zielgruppen, Qualitätsanspruch und Veröffentlichungsprozess der technischen OVK-Spezifikationen.">
        <header className={styles.aboutHeader}>
          <div className="container">
            <p className={styles.eyebrow}>Über dieses Angebot</p>
            <Heading as="h1" className={styles.aboutTitle}>
              Über den OVK und die Tech Specs
            </Heading>
            <p className={styles.aboutLead}>
              Wer die Standards veröffentlicht, für wen sie gedacht sind und wie
              ihre Qualität gesichert wird.
            </p>
          </div>
        </header>
        <main className={`container ${styles.aboutMain}`}>
          <section className={styles.section}>
            <Heading as="h2">Wer ist der Online-Vermarkterkreis?</Heading>
            <p>
              Der Online-Vermarkterkreis (OVK) ist das zentrale Gremium der
              deutschen Online-Vermarkter im Bundesverband Digitale Wirtschaft
              (BVDW) e.V. Fachleute aus den Mitgliedsunternehmen erarbeiten
              gemeinsame Positionen, technische Standards und Orientierung für
              den digitalen Werbemarkt. Die Verantwortung für diese Website liegt
              beim Lab Ad Tech &amp; Programmatic und seinen fachlichen Workstreams.
            </p>
            <p>
              Die <a href="/#team">Leiterinnen und Leiter des Labs und der Workstreams</a>{' '}
              sind auf der Startseite mit Rolle und Unternehmen genannt. Weitere
              Informationen zur Organisation, ihren Mitgliedern und Projekten
              veröffentlicht der OVK auf der{' '}
              <a href="https://www.ovk.de/der-ovk/">offiziellen OVK-Website</a>.
            </p>
          </section>

          <section className={styles.section}>
            <Heading as="h2">Wozu dienen die OVK Tech Specs?</Heading>
            <p>
              Die OVK Tech Specs bündeln technische Referenzen, die zuvor auf
              mehrere Projekte verteilt waren. Sie machen Anforderungen
              auffindbar, vergleichbar und direkt verlinkbar – für Vermarkter,
              Publisher, Agenturen, Werbetreibende, Kreativ- und Ad-Tech-Anbieter.
              Inhaltliche Schwerpunkte sind{' '}
              <Link to="/docs/werbeformen">standardisierte Werbeformen</Link>,{' '}
              <Link to="/docs/identitysolutions">Identity-Lösungen</Link> und der{' '}
              <Link to="/docs/contextualstandards">OVK Contextual Standard</Link>.
            </p>
            <ul>
              <li>Werbeformate mit Größen, Dateiformaten und Anlieferungsanforderungen</li>
              <li>Identifier-Unterstützung bei Vermarktern, SSPs und DSPs</li>
              <li>Qualitäts- und Dokumentationskriterien für kontextuelles Targeting</li>
              <li>Technische Hilfen für Clicktags, Redirects und VAST</li>
            </ul>
          </section>

          <section className={styles.section}>
            <Heading as="h2">Wie werden Inhalte gepflegt und geprüft?</Heading>
            <p>
              Die fachlichen Dokumente stammen aus den jeweils verantwortlichen
              OVK-Projekten. Ein automatisierter Prozess synchronisiert die
              Quellen, vereinheitlicht stabile URLs und Metadaten, prüft Bilder
              und interne Verweise und erstellt anschließend die statische
              Website. Nur ein erfolgreich validiertes Build-Artefakt wird
              veröffentlicht. Der auf einer Dokumentationsseite angezeigte Stand
              wird aus der Versionshistorie der jeweiligen Datei ermittelt.
            </p>
            <p>
              Der Quellcode und die Änderungshistorie dieser Website sind im{' '}
              <a href="https://github.com/BVDW-org/ovk-docusaurus">öffentlichen GitHub-Repository</a>{' '}
              nachvollziehbar. Fachliche Korrekturen sollten im jeweils
              verantwortlichen Quellprojekt vorgenommen werden, damit sie bei der
              nächsten Synchronisierung erhalten bleiben.
            </p>
          </section>

          <section className={styles.trustBox} aria-labelledby="kontakt-title">
            <Heading as="h2" id="kontakt-title">Kontakt, Datenschutz und rechtliche Angaben</Heading>
            <p>
              Für Ansprechpartner, Anschrift und redaktionelle Rückfragen nutzen
              Sie die{' '}
              <a href="https://www.ovk.de/kontakt/">offizielle Kontaktseite</a>.
              Rechtlich verbindliche Angaben stehen im{' '}
              <a href="https://www.ovk.de/impressum/">Impressum</a>; Informationen
              zur Verarbeitung personenbezogener Daten in der{' '}
              <a href="https://www.ovk.de/datenschutz/">Datenschutzerklärung</a>.
            </p>
          </section>
        </main>
      </Layout>
    </>
  );
}
