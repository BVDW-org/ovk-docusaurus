import React from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

// Simple line icons drawn in-house so every feature card stays on the
// OVK navy/orange palette (the previous stock illustrations pulled in
// off-brand purple/teal accents).
function AdFormatsIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="8" width="36" height="24" rx="3" stroke="currentColor" strokeWidth="2.5" />
      <path d="M6 16h36" stroke="currentColor" strokeWidth="2.5" />
      <rect x="11" y="21" width="10" height="6" rx="1.5" fill="currentColor" />
      <path d="M25 22h12M25 27h8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M14 38h20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function IdentityIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="10" width="36" height="28" rx="4" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="17" cy="22" r="5" stroke="currentColor" strokeWidth="2.5" />
      <path d="M10 32c1.8-3.6 4.8-5.4 7-5.4s5.2 1.8 7 5.4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M28 19h8M28 24h8M28 29h5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function ContextualIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="22" cy="22" r="14" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="22" cy="22" r="7.5" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="22" cy="22" r="1.8" fill="currentColor" />
      <path d="M35 35l7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// Feature List
const FeatureList = [
  {
    number: '01',
    title: 'Werbeformen',
    Icon: AdFormatsIcon,
    description: 'Übersicht aller standardisierten vermarkterübergreifenden Werbeformen inkl. Specs',
    to: '/docs/werbeformen/',
  },
  {
    number: '02',
    title: 'Identity',
    Icon: IdentityIcon,
    description: 'Übersicht der aktiven ID Lösungen pro Vermarkter und verschiedene Case Studies.',
    to: '/docs/identitysolutions/',
  },
  {
    number: '03',
    title: 'OVK Contextual Standard',
    Icon: ContextualIcon,
    description: 'Specs zum kontextuellen Standard, den der OVK 2023 ins Leben gerufen hat und von all seinen Mitgliedern genutzt wird.',
    to: '/docs/contextualstandards/',
  },
];

// Feature Component
function Feature({ number, Icon, title, description, to }) {
  return (
    <Link to={to} className={styles.featureCard}>
      <span className={styles.featureNumber}>{number}</span>
      <div className={styles.featureIconBadge}>
        <Icon />
      </div>
      <div className={styles.featureContent}>
        <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
        <p className={styles.featureDescription}>{description}</p>
        <span className={styles.featureLink}>
          Mehr erfahren
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

// Features Component
function Features() {
  return (
    <section id="schwerpunkte" className={styles.featuresSection}>
      <div className="container">
        <div className={styles.sectionTitle}>
          <span className={styles.eyebrow}>Was Sie hier finden</span>
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

  const coreTasks = ['Standardisierung', 'Marktaufklärung', 'Regulierung & Datenschutz'];

  return (
    <section className={styles.unitSection}>
      <div className="container">
        <div className={styles.unitContent}>
          <span className={clsx(styles.eyebrow, styles.eyebrowCentered)}>Über uns</span>
          <Heading as="h2" className={styles.unitTitle}>Ein Projekt der Unit "AdTech & Programmatic" des OVK</Heading>
          <p className={styles.unitDescription}>
            Kernaufgaben der Unit Ad Tech & Programmatic sind Standardisierung und Marktaufklärung. Ziel der Unit ist es, die Durchführung digitaler Kampagnen für die Marktpartner so effizient wie möglich zu gestalten. Die Experten aus den OVK Mitgliedsunternehmen bewerten neue technologische Ansätze und Initiativen, konsolidieren die Sicht der Vermarkter auf Ad Tech-, Programmatic- und Data-Fragestellungen, formulieren Marktanforderungen und entwickeln Lösungen. Gemeinsam mit den Marktpartnern werden Standards definiert und Regulierungs- und Datenschutzinitiativen begleitet. Die Veröffentlichungen und Veranstaltungen der Unit liefern Hilfestellung und klären auf.
          </p>
          <div className={styles.coreTaskPills}>
            {coreTasks.map((task) => (
              <span key={task} className={styles.coreTaskPill}>{task}</span>
            ))}
          </div>

          <div className={styles.teamSection}>
            <span className={clsx(styles.eyebrow, styles.eyebrowCentered)}>Team</span>
            <Heading as="h3" className={styles.teamSectionTitle}>Leiter der Unit Ad Tech & Programmatic</Heading>
            <div className={styles.teamGrid}>
              {unitLeaders.map((leader, idx) => (
                <TeamMember key={idx} {...leader} />
              ))}
            </div>
          </div>

          <div className={styles.teamSection}>
            <span className={clsx(styles.eyebrow, styles.eyebrowCentered)}>Workstreams</span>
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
