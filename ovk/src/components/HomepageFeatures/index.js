import React from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

// Feature List
const FeatureList = [
  {
    title: 'Werbeformen',
    image: require('@site/static/img/ad-formats.png').default,
    description: 'Übersicht aller standardisierten vermarkterübergreifenden Werbeformen inkl. Specs',
    to: "/docs/werbeformen/"
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
  return (
    <Link to={to} className={styles.featureCard}>
      <div className={styles.featureImageContainer}>
        <img src={image} alt={title} className={styles.featureImage} />
      </div>
      <div className={styles.featureContent}>
        <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
        <p className={styles.featureDescription}>{description}</p>
      </div>
    </Link>
  );
}

// Features Component
function Features() {
  return (
    <section className={styles.featuresSection}>
      <div className="container">
        <div className={styles.sectionTitle}>
          <Heading as="h2">Unsere Schwerpunkte</Heading>
        </div>
        <div className={styles.featuresGrid}>
          {FeatureList.map((feature, idx) => (
            <Feature key={idx} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Team Member Component
function TeamMember({ image, name, role, company, companyUrl }) {
  return (
    <div className={styles.teamMember}>
      <div className={styles.teamMemberImageContainer}>
        <img src={image} alt={name} className={styles.teamMemberImage} />
      </div>
      <h3 className={styles.teamMemberName}>{name}</h3>
      <p className={styles.teamMemberRole}>{role}</p>
      <a href={companyUrl} target="_blank" rel="noopener noreferrer" className={styles.teamMemberCompany}>
        {company}
      </a>
    </div>
  );
}

// Unit Section Component
function UnitSection() {
  const unitLeaders = [
    {
      name: "Alwin Viereck",
      role: "Leiter der Unit Ad Tech & Programmatic im OVK",
      company: "United Internet Media GmbH",
      companyUrl: "https://www.united-internet-media.de/de/home/",
      image: "https://www.ovk.de/wp-content/uploads/2025/09/Alwin-Viereck.jpg"
    },
    {
      name: "Carlos Bracho",
      role: "Leiter der Unit Ad Tech & Programmatic im OVK",
      company: "Media Impact GmbH und Co. KG",
      companyUrl: "https://www.mediaimpact.de/de/",
      image: "https://www.ovk.de/wp-content/uploads/2025/09/Carlos-Bracho-990x990.jpg"
    },
    {
      name: "Markus Letzner",
      role: "Leiter der Unit Ad Tech & Programmatic im OVK und Mitsprecher des Contextual Workstreams",
      company: "Ströer Digital Media GmbH",
      companyUrl: "https://www.stroeer.de/",
      image: "https://www.ovk.de/wp-content/uploads/2025/09/Markus-Letzner.jpg"
    }
  ];

  const workstreamLeaders = [
    {
      name: "Alexander Peischl",
      role: "Leiter des OVK Workstreams \"Werbeformen\"",
      company: "United Internet Media GmbH",
      companyUrl: "https://www.united-internet-media.de/de/home/",
      image: "/img/alexander.jpeg"
    },
    {
      name: "Nadeem Qureshi",
      role: "Leiter des OVK Workstreams \"Identity\"",
      company: "BCN Brand Community Network GmbH",
      companyUrl: "https://www.bcn.group",
      image: "/img/nadeem.png"
    },
    {
      name: "Smaranda Dancu",
      role: "Co-Leiterin des OVK Workstreams \"Contextual\"",
      company: "BCN Brand Community Network GmbH",
      companyUrl: "https://www.bcn.group",
      image: "/img/smaranda.jpeg"
    }
  ];

  return (
    <section className={styles.unitSection}>
      <div className="container">
        <div className={styles.unitContent}>
          <Heading as="h2" className={styles.unitTitle}>Ein Projekt der Unit "AdTech & Programmatic" des OVK</Heading>
          <p className={styles.unitDescription}>
            Kernaufgaben der Unit Ad Tech & Programmatic sind Standardisierung und Marktaufklärung. Ziel der Unit ist es, die Durchführung digitaler Kampagnen für die Marktpartner so effizient wie möglich zu gestalten. Die Experten aus den OVK Mitgliedsunternehmen bewerten neue technologische Ansätze und Initiativen, konsolidieren die Sicht der Vermarkter auf Ad Tech-, Programmatic- und Data-Fragestellungen, formulieren Marktanforderungen und entwickeln Lösungen. Gemeinsam mit den Marktpartnern werden Standards definiert und Regulierungs- und Datenschutzinitiativen begleitet. Die Veröffentlichungen und Veranstaltungen der Unit liefern Hilfestellung und klären auf.
          </p>
          
          <div className={styles.teamSection}>
            <Heading as="h3" className={styles.teamSectionTitle}>Leiter der Unit Ad Tech & Programmatic</Heading>
            <div className={styles.teamGrid}>
              {unitLeaders.map((leader, idx) => (
                <TeamMember key={idx} {...leader} />
              ))}
            </div>
          </div>
          
          <div className={styles.teamSection}>
            <Heading as="h3" className={styles.teamSectionTitle}>Leiter der Workstreams</Heading>
            <div className={styles.teamGrid}>
              {workstreamLeaders.map((leader, idx) => (
                <TeamMember key={idx} {...leader} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Main Component
function HomepageFeatures() {
  return (
    <>
      <Features />
      <UnitSection />
    </>
  );
}

export default HomepageFeatures;
