import React from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

// Feature List
const FeatureList = [
  {
    title: 'Werbeformen (coming soon)',
    image: require('@site/static/img/ad-formats.png').default,
    description: 'Übersicht aller standardisierten vermarkterübergreifenden Werbeformen inkl. Specs',
    to: "#"
  },
  {
    title: 'Identity',
    image: require('@site/static/img/id-solution.png').default,
    description: 'Übersicht der aktiven ID Lösungen pro Vermarkter und verschiedene Case Studies.',
    to: "/docs/identitysolutions/"
  },
  {
    title: 'OVK Contextual Standard',
    image: require('@site/static/img/Contextual.png').default,
    description: 'Specs zum kontextuellen Standard, den der OVK 2023 ins Leben gerufen hat und von all seinen Mitgliedern genutzt wird.',
    to: "/docs/contextualstandards/"
  }
];

// Feature Component
function Feature({ image, title, description, to }) {
  const handleClick = () => {
    window.location.href = to;
  };

  const imageStyle = {
    width: '170px',
    height: 'auto',
    margin: '20px'
  };

  return (
    <div className={clsx('col col--4 feature-container')} onClick={handleClick}>
      <div className="text--center">
        <img src={image} alt={title} style={imageStyle} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

// Features Component
function Features() {
  return (
    <div className="container">
      <div className={clsx('row', 'row-features')}>
        {FeatureList.map((feature, idx) => (
          <Feature key={idx} {...feature} />
        ))}
      </div>
    </div>
  );
}

// Unit Section Component
function UnitSectionWrapper() {
  return (
    <div className={styles.unitSectionWrapper}>
      <UnitSection />
    </div>
  );
}

function UnitSection() {
  return (
    <div className={styles.unitSection}>
      <h1 className={styles.headline}>Ein Projekt der Unit "AdTech & Programmatic" des OVK</h1>
      <p className={styles.lead}>
        Kernaufgaben der Unit Ad Tech & Programmatic sind Standardisierung und Marktaufklärung. Ziel der Unit ist es, die Durchführung digitaler Kampagnen für die Marktpartner so effizient wie möglich zu gestalten. Die Experten aus den OVK Mitgliedsunternehmen bewerten neue technologische Ansätze und Initiativen, konsolidieren die Sicht der Vermarkter auf Ad Tech-, Programmatic- und Data-Fragestellungen, formulieren Marktanforderungen und entwickeln Lösungen. Gemeinsam mit den Marktpartnern werden Standards definiert und Regulierungs- und Datenschutzinitiativen begleitet. Die Veröffentlichungen und Veranstaltungen der Unit liefern Hilfestellung und klären auf.
      </p>
      
      {/* Erster Leader-Bereich */}
      <h2 className={styles.headline}>Leiter der Unit Ad Tech & Programmatic</h2>
      <div className={styles.leaders}>
        <div className={styles.person}>
          <img src="https://www.ovk.de/wp-content/uploads/2020/04/ASP_ProgrammaticData_Alwin_Viereck.png" alt="Alwin Viereck" className={styles.personImage} />
          <h3>Alwin Viereck</h3>
          <p>Leiter der Unit Ad Tech & Programmatic im OVK</p>
          <a href="https://www.united-internet-media.de/de/home/" target="_blank" rel="noopener">United Internet Media GmbH</a>
        </div>
        <div className={styles.person}>
          <img src="https://www.ovk.de/wp-content/uploads/2021/12/Brachos-Carlos-eingefärbt_quadratisch-300x300.jpg" alt="Carlos Bracho" className={styles.personImage} />
          <h3>Carlos Bracho</h3>
          <p>Leiter der Unit Ad Tech & Programmatic im OVK</p>
          <a href="https://www.mediaimpact.de/de/" target="_blank" rel="noopener">Media Impact GmbH und Co. KG</a>
        </div>
        <div className={styles.person}>
          <img src="https://www.ovk.de/wp-content/uploads/2021/12/Letzner_Markus_duplex-300x300.jpg" alt="Markus Letzner" className={styles.personImage} />
          <h3>Markus Letzner</h3>
          <p>Leiter der Unit Ad Tech & Programmatic im OVK und Mitsprecher des Contextual Workstreams</p>
          <a href="https://www.stroeer.de/" target="_blank" rel="noopener">Ströer Digital Media GmbH</a>
        </div>
      </div>
      
      {/* Zweiter Leader-Bereich */}
      <h2 className={styles.headline}>Leiter der Workstreams</h2>
      <div className={styles.leaders}>
        <div className={styles.person}>
          <img src="/img/alexander.jpeg" alt="Alexander Peischl" className={styles.personImage} />
          <h3>Alexander Peischl</h3>
          <p>Leiter des OVK Workstreams "Werbeformen"</p>
          <a href="https://www.united-internet-media.de/de/home/" target="_blank" rel="noopener">United Internet Media GmbH</a>
        </div>
        <div className={styles.person}>
          <img src="/img/nadeem.png" alt="Nadeem Qureshi" className={styles.personImage} />
          <h3>Nadeem Qureshi</h3>
          <p>Leiter des OVK Workstreams "Identity"</p>
          <a href="https://www.bcn.group" target="_blank" rel="noopener">BCN Brand Community Network GmbH</a>
        </div>
        <div className={styles.person}>
          <img src="/img/smaranda.jpeg" alt="Smaranda Dancu" className={styles.personImage} />
          <h3>Smaranda Dancu</h3>
          <p>Co-Leiterin des OVK Workstreams "Contextual"</p>
          <a href="https://www.bcn.group" target="_blank" rel="noopener">BCN Brand Community Network GmbH</a>
        </div>
      </div>
    </div>
  );
}



// Hauptkomponente
function HomepageFeatures() {
  return (
    <div>
      <Features />
      <UnitSection />
    </div>
  );
}

export default HomepageFeatures;
