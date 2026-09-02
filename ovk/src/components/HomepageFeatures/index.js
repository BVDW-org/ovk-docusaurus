import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Heading from '@theme/Heading';
import {ArrowRight} from '@phosphor-icons/react/dist/icons/ArrowRight';
import {Article} from '@phosphor-icons/react/dist/icons/Article';
import {BookOpenText} from '@phosphor-icons/react/dist/icons/BookOpenText';
import {ChartBar} from '@phosphor-icons/react/dist/icons/ChartBar';
import {CheckCircle} from '@phosphor-icons/react/dist/icons/CheckCircle';
import {Flask} from '@phosphor-icons/react/dist/icons/Flask';
import {IdentificationCard} from '@phosphor-icons/react/dist/icons/IdentificationCard';
import {Info} from '@phosphor-icons/react/dist/icons/Info';
import {Monitor} from '@phosphor-icons/react/dist/icons/Monitor';
import {Play} from '@phosphor-icons/react/dist/icons/Play';
import {Scales} from '@phosphor-icons/react/dist/icons/Scales';
import {ShieldCheck} from '@phosphor-icons/react/dist/icons/ShieldCheck';
import {StackSimple} from '@phosphor-icons/react/dist/icons/StackSimple';
import {UserCircle} from '@phosphor-icons/react/dist/icons/UserCircle';
import {UsersThree} from '@phosphor-icons/react/dist/icons/UsersThree';
import styles from './styles.module.css';

const topics = [
  {
    number: '01',
    title: 'Werbeformen',
    Icon: Article,
    description:
      'Übersicht aller standardisierten vermarkterübergreifenden Werbeformen inkl. Specs',
    to: '/docs/werbeformen/',
    links: [
      {
        label: 'Werbeformen Intro',
        to: '/docs/werbeformen/',
        Icon: BookOpenText,
      },
      {
        label: 'Display',
        to: '/docs/werbeformen/display/standard-werbeformen/billboard',
        Icon: Monitor,
      },
      {
        label: 'Video',
        to: '/docs/werbeformen/video/in-stream/pre-roll',
        Icon: Play,
      },
    ],
  },
  {
    number: '02',
    title: 'Identity',
    Icon: UserCircle,
    description:
      'Übersicht der aktiven ID Lösungen pro Vermarkter und verschiedene Case Studies.',
    to: '/docs/identitysolutions/',
    links: [
      {
        label: 'Identity Intro',
        to: '/docs/identitysolutions/',
        Icon: Info,
      },
      {
        label: 'Case Studies',
        to: '/docs/identitysolutions/Case%20Studies',
        Icon: ChartBar,
      },
      {
        label: 'OVK Vermarkter ID-Overview',
        to: '/docs/identitysolutions/ID-Support_OVK-Vermarkter/OVK-IdentifierSupport_byVendor',
        Icon: IdentificationCard,
      },
    ],
  },
  {
    number: '03',
    title: 'OVK Contextual Standard',
    Icon: StackSimple,
    description:
      'Specs zum kontextuellen Standard, den der OVK 2023 ins Leben gerufen hat und von all seinen Mitgliedern genutzt wird.',
    to: '/docs/contextualstandards/',
    links: [
      {
        label: 'Contextual Intro',
        to: '/docs/contextualstandards/',
        Icon: BookOpenText,
      },
    ],
  },
];

const unitLeaders = [
  {
    name: 'Alwin Viereck',
    role: 'Leiter des Labs Ad Tech & Programmatic im OVK',
    company: 'United Internet Media GmbH',
    companyUrl: 'https://www.united-internet-media.de/de/home/',
    image: '/img/team/alwin-viereck.jpg',
  },
  {
    name: 'Carlos Bracho',
    role: 'Leiter des Labs Ad Tech & Programmatic im OVK',
    company: 'Media Impact GmbH und Co. KG',
    companyUrl: 'https://www.mediaimpact.de/de/',
    image: '/img/team/carlos-bracho.jpg',
  },
  {
    name: 'Markus Letzner',
    role: 'Leiter des Labs Ad Tech & Programmatic im OVK und Mitsprecher des Contextual Workstreams',
    company: 'Ströer Digital Media GmbH',
    companyUrl: 'https://www.stroeer.de/',
    image: '/img/team/markus-letzner.jpg',
  },
];

const workstreamLeaders = [
  {
    name: 'Alexander Peischl',
    role: 'Leiter des OVK Workstreams "Werbeformen"',
    company: 'United Internet Media GmbH',
    companyUrl: 'https://www.united-internet-media.de/de/home/',
    image: '/img/alexander.jpeg',
  },
  {
    name: 'Nadeem Qureshi',
    role: 'Leiter des OVK Workstreams "Identity"',
    company: 'BCN Brand Community Network GmbH',
    companyUrl: 'https://www.bcn.group',
    image: '/img/nadeem.png',
  },
  {
    name: 'Smaranda Dancu',
    role: 'Co-Leiterin des OVK Workstreams "Contextual"',
    company: 'BCN Brand Community Network GmbH',
    companyUrl: 'https://www.bcn.group',
    image: '/img/smaranda.jpeg',
  },
];

const coreTasks = [
  {label: 'Standardisierung', Icon: CheckCircle},
  {label: 'Marktaufklärung', Icon: Scales},
  {label: 'Regulierung & Datenschutz', Icon: ShieldCheck},
];

function TopicLink({to, label, Icon}) {
  return (
    <Link to={to} className={styles.topicLink}>
      <Icon size={21} weight="regular" aria-hidden="true" />
      <span>{label}</span>
      <ArrowRight
        size={18}
        weight="bold"
        className={styles.topicLinkArrow}
        aria-hidden="true"
      />
    </Link>
  );
}

function Topic({number, title, Icon, description, to, links}) {
  return (
    <article className={styles.topic}>
      <div className={styles.topicHeader}>
        <span className={styles.topicNumber}>{number}</span>
        <span className={styles.topicIcon}>
          <Icon size={34} weight="regular" aria-hidden="true" />
        </span>
      </div>

      <Heading as="h2" className={styles.topicTitle}>
        <Link to={to}>{title}</Link>
      </Heading>
      <p className={styles.topicDescription}>{description}</p>

      <nav className={styles.topicLinks} aria-label={`${title} Direktlinks`}>
        {links.map((link) => (
          <TopicLink key={link.label} {...link} />
        ))}
      </nav>
    </article>
  );
}

function TopicSection() {
  return (
    <section className={styles.topicSection} aria-label="OVK Tech Specs Bereiche">
      <div className="container">
        <div className={styles.topicGrid}>
          {topics.map((topic) => (
            <Topic key={topic.number} {...topic} />
          ))}
        </div>
      </div>
    </section>
  );
}

function OverviewBand() {
  return (
    <section className={styles.overviewSection} aria-label="Über das Projekt">
      <div className="container">
        <div className={styles.overviewBand}>
          <a href="#lab" className={styles.overviewLink}>
            <Flask size={28} weight="regular" aria-hidden="true" />
            <span className={styles.overviewText}>
              <span className={styles.overviewEyebrow}>Lab</span>
              <strong>Lab Ad Tech &amp; Programmatic</strong>
              <span>Standardisierung, Marktaufklärung sowie Regulierung &amp; Datenschutz.</span>
            </span>
            <ArrowRight size={20} weight="bold" aria-hidden="true" />
          </a>

          <a href="#team" className={styles.overviewLink}>
            <UsersThree size={30} weight="regular" aria-hidden="true" />
            <span className={styles.overviewText}>
              <span className={styles.overviewEyebrow}>Team</span>
              <strong>Gemeinsam für Standards</strong>
              <span>Die Leiterinnen und Leiter des Labs und seiner Workstreams.</span>
            </span>
            <ArrowRight size={20} weight="bold" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

function TeamMember({image, name, role, company, companyUrl}) {
  const imageUrl = useBaseUrl(image);

  return (
    <article className={styles.teamMember}>
      <img
        src={imageUrl}
        alt={`Porträt von ${name}`}
        className={styles.teamMemberImage}
        width="88"
        height="88"
        loading="lazy"
        decoding="async"
      />
      <div className={styles.teamMemberContent}>
        <Heading as="h4" className={styles.teamMemberName}>
          {name}
        </Heading>
        <p className={styles.teamMemberRole}>{role}</p>
        <a
          href={companyUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${company} (öffnet in einem neuen Tab)`}
          className={styles.teamMemberCompany}>
          {company}
        </a>
      </div>
    </article>
  );
}

function TeamGroup({title, people}) {
  return (
    <section className={styles.teamGroup}>
      <Heading as="h3" className={styles.teamGroupTitle}>
        {title}
      </Heading>
      <div className={styles.teamGrid}>
        {people.map((person) => (
          <TeamMember key={person.name} {...person} />
        ))}
      </div>
    </section>
  );
}

function LabSection() {
  return (
    <section id="lab" className={styles.labSection}>
      <div className="container">
        <div className={styles.labIntro}>
          <div>
            <span className={styles.eyebrow}>Über uns</span>
            <Heading as="h2" className={styles.labTitle}>
              Ein Projekt des Labs &quot;AdTech &amp; Programmatic&quot; des OVK
            </Heading>
          </div>
          <p className={styles.labDescription}>
            Kernaufgaben des Labs Ad Tech &amp; Programmatic sind Standardisierung
            und Marktaufklärung. Ziel des Labs ist es, die Durchführung digitaler
            Kampagnen für die Marktpartner so effizient wie möglich zu gestalten.
            Die Experten aus den OVK Mitgliedsunternehmen bewerten neue
            technologische Ansätze und Initiativen, konsolidieren die Sicht der
            Vermarkter auf Ad Tech-, Programmatic- und Data-Fragestellungen,
            formulieren Marktanforderungen und entwickeln Lösungen. Gemeinsam mit
            den Marktpartnern werden Standards definiert und Regulierungs- und
            Datenschutzinitiativen begleitet. Die Veröffentlichungen und
            Veranstaltungen des Labs liefern Hilfestellung und klären auf.
          </p>
        </div>

        <div className={styles.coreTasks}>
          {coreTasks.map(({label, Icon}) => (
            <div key={label} className={styles.coreTask}>
              <Icon size={27} weight="regular" aria-hidden="true" />
              <span>{label}</span>
            </div>
          ))}
        </div>

        <div id="team" className={styles.teamSection}>
          <span className={styles.eyebrow}>Team</span>
          <Heading as="h2" className={styles.teamTitle}>
            Die Menschen hinter den Standards
          </Heading>
          <TeamGroup
            title="Leiter des Labs Ad Tech & Programmatic"
            people={unitLeaders}
          />
          <TeamGroup title="Leiter der Workstreams" people={workstreamLeaders} />
        </div>
      </div>
    </section>
  );
}

export default function HomepageFeatures() {
  return (
    <>
      <TopicSection />
      <OverviewBand />
      <LabSection />
    </>
  );
}
