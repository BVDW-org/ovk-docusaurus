import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './about.module.css';

export default function About() {
  return (
    <Layout
      title="Über uns"
      description="Über den Online-Vermarkterkreis (OVK)">
      <header className={styles.aboutHeader}>
        <div className="container">
          <Heading as="h1" className={styles.aboutTitle}>
            Über den Online-Vermarkterkreis
          </Heading>
        </div>
      </header>
      <main className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <Heading as="h2">Wer wir sind</Heading>
            <p>
              Der Online-Vermarkterkreis (OVK) ist der Zusammenschluss aller 
              führenden deutschen Online-Vermarkter im Bundesverband Digitale 
              Wirtschaft (BVDW) e.V. Der OVK repräsentiert über 80 Prozent des 
              deutschen Display- und Videoinventar-Marktes und definiert 
              verbindliche Qualitätsstandards.
            </p>

            <Heading as="h2">Unsere Mission</Heading>
            <p>
              Als zentrale Instanz der Online-Vermarkter in Deutschland arbeitet 
              der OVK kontinuierlich an der Weiterentwicklung von Qualitätsstandards 
              und Markttransparenz in der digitalen Werbung. Wir setzen uns für 
              eine nachhaltige Zukunft der digitalen Werbebranche ein und fördern 
              Innovation und Wachstum im digitalen Ökosystem.
            </p>

            <Heading as="h2">Unsere Ziele</Heading>
            <ul>
              <li>Etablierung und Weiterentwicklung von Qualitätsstandards</li>
              <li>Förderung von Markttransparenz und Vergleichbarkeit</li>
              <li>Unterstützung bei der Entwicklung neuer Werbeformate</li>
              <li>Bereitstellung von Marktdaten und Prognosen</li>
              <li>Förderung des Dialogs zwischen allen Marktteilnehmern</li>
            </ul>

            <Heading as="h2">Unsere Arbeit</Heading>
            <p>
              Der OVK veröffentlicht regelmäßig technische Spezifikationen, 
              Leitfäden und Standards für die digitale Werbeindustrie. Diese 
              Dokumentationen helfen Werbetreibenden, Agenturen und Publishern, 
              effektive und qualitativ hochwertige digitale Werbekampagnen zu 
              realisieren.
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}
