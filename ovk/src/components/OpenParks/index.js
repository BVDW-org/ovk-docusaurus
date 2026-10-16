import React, {useEffect, useState} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Heading from '@theme/Heading';
import clsx from 'clsx';
import {ArrowRight} from '@phosphor-icons/react/dist/icons/ArrowRight';
import {Briefcase} from '@phosphor-icons/react/dist/icons/Briefcase';
import {Buildings} from '@phosphor-icons/react/dist/icons/Buildings';
import {Browsers} from '@phosphor-icons/react/dist/icons/Browsers';
import {ChartLineUp} from '@phosphor-icons/react/dist/icons/ChartLineUp';
import {Clock} from '@phosphor-icons/react/dist/icons/Clock';
import {Gauge} from '@phosphor-icons/react/dist/icons/Gauge';
import {Devices} from '@phosphor-icons/react/dist/icons/Devices';
import {Handshake} from '@phosphor-icons/react/dist/icons/Handshake';
import {MapTrifold} from '@phosphor-icons/react/dist/icons/MapTrifold';
import {Plant} from '@phosphor-icons/react/dist/icons/Plant';
import {ShieldCheck} from '@phosphor-icons/react/dist/icons/ShieldCheck';
import {Target} from '@phosphor-icons/react/dist/icons/Target';
import {UserCheck} from '@phosphor-icons/react/dist/icons/UserCheck';
import styles from './styles.module.css';

// Content source: OVK Sales Workshop "Deterministische ID-Lösungen"
// (01.09.2026), the BVDW press release of 22.04.2026 and the Identity FAQ.

const sections = [
  {id: 'ziel', label: 'Ziel'},
  {id: 'identifier', label: 'Identifier'},
  {id: 'buchung', label: 'Buchung'},
  {id: 'stand', label: 'Aktueller Stand'},
  {id: 'faq', label: 'FAQ'},
];

const kpis = [
  {value: 'bis zu 40 Mio.', label: 'deterministische IDs', note: 'über Utiq und netID'},
  {
    value: '30 bis 32 Mio.',
    label: 'IDs Reichweite pro Woche',
    note: 'über alle Vermarkter, gemessen in den DSPs',
  },
  {value: 'max. 5 Tage', label: 'vom RFP bis zu den Deals', note: 'mit einem Ansprechpartner beim OVK'},
];

// Logos are optional: drop a file into static/img/brands/ and set `logo`.
// Until then the brand name is shown as a neutral wordmark.
const brands = [
  {name: 'Ad Alliance'},
  {name: 'BCN'},
  {name: 'FUNKE'},
  {name: 'iq digital'},
  {name: 'Media Impact'},
  {name: 'Score Media'},
  {name: 'Seven.One Media'},
  {name: 'Ströer'},
  {name: 'United Internet Media'},
  {name: 'Visoon'},
];

const benefits = [
  {
    Icon: Handshake,
    title: 'Einfachere Buchung',
    text: 'Ein Buchungsweg und ein zentraler Ansprechpartner beim OVK statt Abstimmung mit jedem Vermarkter einzeln.',
  },
  {
    Icon: Target,
    title: 'Mehr Reichweite',
    text: 'Premium-Reichweite aller OVK-Vermarkter über Browser, Geräte und Websites hinweg.',
  },
  {
    Icon: Gauge,
    title: 'Volle Kontrolle',
    text: 'Frequenzsteuerung über Vermarkter hinweg, sauber verifizierbar.',
  },
  {
    Icon: Plant,
    title: 'Mehr Wirkung pro Budget',
    text: 'Echte Menschen statt Bots, Qualitätsumfelder und weniger Streuverlust.',
  },
];

const reasons = [
  {
    title: 'Skalierung schlägt Insellösung',
    text: 'Erst die gebündelte Reichweite aller Vermarkter hat die Größe, die im Mediaplan gegen Walled Gardens besteht.',
  },
  {
    title: 'Frequenzsteuerung geht nur gemeinsam',
    text: 'Frequency Capping über Publisher, Browser und Apps braucht eine vermarkterübergreifende Kennung.',
  },
  {
    title: 'Ein Standard statt vieler Sonderwege',
    text: 'Einheitliche Deal-Nomenklatur und ein einziges Briefing machen Angebote vergleichbar.',
  },
  {
    title: 'Unabhängigkeit durch Netzwerkeffekt',
    text: 'Je breiter die IDs verbaut sind, desto größer werden Reichweite, Marktakzeptanz und Unabhängigkeit von Gatekeepern.',
  },
];

const idProviders = [
  {name: 'Utiq', logo: '/img/brands/utiq.png', text: 'Entsteht über die Netzverbindung der Telcos, ganz ohne Login'},
  {name: 'netID', logo: '/img/brands/netid.png', text: 'Entsteht über den Login bei GMX, web.de und Partnern'},
];

const idAdvantages = [
  {
    Icon: UserCheck,
    title: 'Echte Menschen statt Schätzung',
    text: 'Deterministische Kennungen erkennen Nutzer eindeutig wieder. Probabilistische Modelle schätzen nur.',
  },
  {
    Icon: ShieldCheck,
    title: 'Einwilligungsbasiert und DSGVO-konform',
    text: 'Die IDs entstehen nur mit aktivem Einverständnis. Personenbezogene Daten werden nie weitergegeben.',
  },
  {
    Icon: Browsers,
    title: 'Wirkt auch in Safari, Firefox und Apps',
    text: 'Dort, wo Third-Party-Cookies längst blockiert sind, bleibt die Reichweite adressierbar.',
  },
  {
    Icon: Devices,
    title: 'Cross-Device und Cross-Site',
    text: 'Eine Kennung über Geräte, Websites und Vermarkter hinweg, ganz ohne Cookies.',
  },
  {
    Icon: Gauge,
    title: 'Saubere Frequenzsteuerung',
    text: 'Kontakte werden über alle Vermarkter dedupliziert und lassen sich gemeinsam kappen.',
  },
  {
    Icon: ChartLineUp,
    title: 'Bessere Messbarkeit',
    text: 'Konsistente Wiedererkennung macht Reichweite und Wirkung über Publisher hinweg vergleichbar.',
  },
];

const actors = {
  agentur: {label: 'Agentur', Icon: Briefcase},
  ovk: {label: 'OVK', Icon: Handshake},
  vermarkter: {label: 'Vermarkter', Icon: Buildings},
};

const bookingSteps = [
  {
    actor: 'agentur',
    title: 'RFP an den OVK',
    text: 'Die Agentur schickt ihren RFP per E-Mail an den OVK-Vertreter.',
    hint: 'Individuelle RFPs an einzelne Vermarkter werden an den OVK-Vertreter verwiesen.',
  },
  {
    actor: 'ovk',
    title: 'Gebündelte Anfrage',
    text: 'Der OVK fragt alle Vermarkter mit einem einheitlichen Briefing-Template an.',
  },
  {
    actor: 'vermarkter',
    title: 'Rückmeldung',
    text: 'Die Vermarkter legen die Deals an und melden die Dealinfos zurück, ganz ohne Preise.',
    badge: '72 Std.',
  },
  {
    actor: 'ovk',
    title: 'Gebündeltes Angebot',
    text: 'Der OVK fasst alle Rückmeldungen in einer Deal-Übersicht für die Agentur zusammen.',
  },
];

const liveSteps = [
  {
    actor: 'ovk',
    title: 'Go-Live-Check',
    text: 'Der OVK meldet fehlende Auslieferung direkt an die Vermarkter, damit sie schnell nachsteuern.',
  },
  {
    actor: 'ovk',
    title: 'Review',
    text: 'Der OVK holt die Kampagnenergebnisse bei der Agentur ein und dokumentiert die Learnings.',
  },
];

const milestones = [
  {
    date: 'Ausgangspunkt',
    title: 'OWM-Initiative Open Parks',
    text: 'Die Werbungtreibenden im Markenverband fordern Investitionen in deterministische Identitäten und eine offene Werbeinfrastruktur.',
  },
  {
    date: 'Dezember 2025',
    title: 'Erster vermarkterübergreifender Pilot',
    text: 'Gemeinsam mit der pilot Agenturgruppe und den Vermarktern Ad Alliance, BCN, iq digital, Media Impact und Ströer. Utiq diente als gemeinsamer Identifier, eingekauft wurde über Adform.',
    stat: {value: '23 Mio.', label: 'adressierte Unique IDs'},
  },
  {
    date: 'April 2026',
    title: 'Business Case veröffentlicht',
    text: 'Der OVK stellt das identifierbasierte Wegeleitsystem öffentlich vor und kündigt weitere Use Cases an.',
  },
  {
    date: '2026',
    title: 'Zweite Testkampagne im Bewegtbild',
    text: 'Online Video mit Utiq und netID über mehrere große OVK-Vermarkter, mit maximal 3 Kontakten pro Woche.',
    stat: {value: 'Ø 1,4', label: 'Kontakte je Nutzer'},
  },
  {
    date: 'September 2026',
    title: 'Buchungsprozess abgestimmt',
    text: 'Der einheitliche OVK-Buchungsweg mit Briefing- und Deal-Template ist mit den Vermarktern verabschiedet.',
    current: true,
  },
];

const videoResults = [
  {value: '1,1 Mio.', label: 'Tracked Ads ausgeliefert', tone: 'orange'},
  {value: '62 %', label: 'Uniqueness Rate, rund 733.000 Unique User', tone: 'blue'},
  {value: 'Ø 1,4', label: 'Kontakte je Nutzer, deutlich unter dem Cap', tone: 'ink'},
];

const faqs = [
  {
    q: 'Ist die vermarkterübergreifende Adressierung über deterministische IDs datenschutzkonform?',
    a: 'Ja. Die IDs entstehen nur mit aktivem Einverständnis des Nutzers. Personenbezogene Daten werden nie weitergegeben, der Nutzer bleibt anonym.',
  },
  {
    q: 'Muss ich mein programmatisches Setup umbauen?',
    a: (
      <>
        Nein, solange der Einkauf über The Trade Desk, Active Agent oder Adform
        als DSP erfolgt. Zusätzliche technische Anforderungen auf Kundenseite
        gibt es nicht. Soll eine andere DSP zum Einsatz kommen, klären wir einen
        möglichen technischen Workaround im Vorfeld. Details zeigt die{' '}
        <Link to="/docs/tools/id-landscape-map">ID Landscape Map</Link>.
      </>
    ),
  },
  {
    q: 'Was kostet die Nutzung deterministischer IDs zusätzlich?',
    a: 'Es entstehen keine zusätzlichen Kosten. Die IDs liegen im bestehenden programmatischen Deal. Verkauft wird Reichweite, nicht Technik.',
  },
  {
    q: 'Erhöhen sich die Preise?',
    a: 'Seitens des OVK nicht, es gibt keinen OVK-Aufschlag und keine Preisvorgaben. Über seine Preise entscheidet jeder Vermarkter unabhängig. Deterministisch adressierbare Nutzer sind für Werbungtreibende allerdings wertvoller als anonyme Reichweite.',
  },
  {
    q: 'Wie viel adressierbare Reichweite bekomme ich?',
    a: 'Derzeit rund 30 bis 32 Millionen Unique IDs pro Woche über alle Vermarkter, Browser und Apps hinweg, gemessen in den DSPs. Die ersten Kampagnen belegen skalierbare Volumen.',
  },
  {
    q: 'Welche Formate können mit deterministischen IDs gebucht werden?',
    a: 'Grundsätzlich lassen sich alle Formate mit IDs verknüpfen. Derzeit stehen Display, Native, Bewegtbild und CTV zur Verfügung.',
  },
  {
    q: 'Gibt es schon Erkenntnisse aus Kampagnen?',
    a: (
      <>
        Ja. Mehrere Cases und Tests belegen, dass ID-basierte Use Cases
        erfolgreich funktionieren, etwa die vermarkterübergreifende
        Kontaktklassensteuerung und die zielgruppenspezifische Ansprache. Die
        Ergebnisse der ersten Kampagnen finden Sie unter{' '}
        <a href="#stand">Aktueller Stand</a>.
      </>
    ),
  },
];

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!elements.length || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length) setActive(visible[0].target.id);
      },
      {rootMargin: '-30% 0px -60% 0px'},
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

const sectionIds = sections.map((s) => s.id);

function SectionNav() {
  const active = useActiveSection(sectionIds);
  return (
    <nav className={styles.sectionNav} aria-label="Inhalt dieser Seite">
      <ol>
        {sections.map((section, index) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={clsx(active === section.id && styles.sectionNavActive)}
              aria-current={active === section.id ? 'true' : undefined}>
              <span className={styles.sectionNavNum}>{index + 1}</span>
              {section.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function Section({id, index, eyebrow, title, lead, children}) {
  return (
    <section id={id} className={styles.section}>
      <header className={styles.sectionHead}>
        <span className={styles.eyebrow}>
          <span className={styles.eyebrowNum}>{index}</span>
          {eyebrow}
        </span>
        <Heading as="h2" className={styles.sectionTitle}>
          {title}
        </Heading>
        {lead && <p className={styles.sectionLead}>{lead}</p>}
      </header>
      {children}
    </section>
  );
}

function ActorChip({actor}) {
  const {label, Icon} = actors[actor];
  return (
    <span className={clsx(styles.actorChip, styles[`actor_${actor}`])}>
      <Icon size={14} weight="bold" aria-hidden="true" />
      {label}
    </span>
  );
}

function FlowStep({step, number}) {
  return (
    <li className={clsx(styles.flowStep, styles[`flowStep_${step.actor}`])}>
      <div className={styles.flowStepTop}>
        <span className={styles.flowNumber}>{number}</span>
        {step.badge && (
          <span className={styles.flowBadge}>
            <Clock size={13} weight="bold" aria-hidden="true" />
            {step.badge}
          </span>
        )}
      </div>
      <ActorChip actor={step.actor} />
      <h3 className={styles.flowTitle}>{step.title}</h3>
      <p className={styles.flowText}>{step.text}</p>
      {step.hint && <p className={styles.flowHint}>{step.hint}</p>}
    </li>
  );
}

function BrandLogo({name, logo}) {
  const src = useBaseUrl(logo || '/');
  return (
    <li className={styles.brand}>
      {logo ? <img src={src} alt={name} loading="lazy" /> : <span>{name}</span>}
    </li>
  );
}

function Hero() {
  const logoUrl = useBaseUrl('/img/ovk-logo.svg');
  return (
    <section className={styles.hero}>
      <div className={styles.heroGlow} aria-hidden="true" />
      <div className={styles.heroTop}>
        <span className={styles.heroEyebrow}>Identifierbasiertes Wegeleitsystem im Open Web</span>
        <img
          src={logoUrl}
          alt="Online-Vermarkterkreis im BVDW"
          className={styles.heroLogo}
          width="170"
          height="50"
        />
      </div>
      <p className={styles.heroClaim}>
        Bequem bleibt.
        <br />
        <span>Abhängigkeit nicht.</span>
      </p>
      <p className={styles.heroLead}>
        Mit OVK Open Parks setzen die deutschen Premium-Vermarkter das Open
        Parks Konzept der OWM um. Deterministisch adressierbare Reichweite über
        Utiq und netID, vermarkterübergreifend steuerbar und über einen einzigen
        Buchungsweg erreichbar.
      </p>
      <dl className={styles.kpiGrid}>
        {kpis.map((kpi) => (
          <div key={kpi.label} className={styles.kpi}>
            <dt className={styles.kpiLabel}>{kpi.label}</dt>
            <dd className={styles.kpiValue}>{kpi.value}</dd>
            <dd className={styles.kpiNote}>{kpi.note}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function BrandStrip() {
  return (
    <section className={styles.brandStrip} aria-label="Vermarkter im OVK">
      <p className={styles.brandStripLabel}>Premium-Reichweite der OVK-Vermarkter</p>
      <ul className={styles.brandList}>
        {brands.map((brand) => (
          <BrandLogo key={brand.name} {...brand} />
        ))}
      </ul>
    </section>
  );
}

function GoalSection() {
  return (
    <Section
      id="ziel"
      index="1"
      eyebrow="Ziel"
      title="Eine gemeinsame Antwort auf die Walled Gardens"
      lead="Cookie-basierte Adressierbarkeit nimmt ab und Budgets wandern zu den großen Plattformen. Werbungtreibende erwarten trotzdem effiziente, kontrollierbare und einfach buchbare Kampagnen. Open Parks macht die Premium-Reichweite im Open Web dafür wieder adressierbar.">
      <div className={styles.benefitGrid}>
        {benefits.map(({Icon, title, text}) => (
          <article key={title} className={styles.benefit}>
            <Icon size={24} weight="regular" aria-hidden="true" />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
      <div className={styles.reasonPanel}>
        <h3 className={styles.reasonPanelTitle}>Warum ein OVK-Ansatz und kein Einzelprodukt</h3>
        <ul className={styles.reasonList}>
          {reasons.map(({title, text}) => (
            <li key={title}>
              <strong>{title}</strong>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

function ProviderLogo({name, logo}) {
  const src = useBaseUrl(logo);
  const [failed, setFailed] = useState(false);
  return failed ? (
    <span className={styles.providerWordmark}>{name}</span>
  ) : (
    <img src={src} alt={name} className={styles.providerLogo} onError={() => setFailed(true)} />
  );
}

function IdSection() {
  return (
    <Section
      id="identifier"
      index="2"
      eyebrow="Identifier"
      title="Was deterministische IDs leisten"
      lead="Open Parks setzt auf die beiden reichweitenstärksten deterministischen IDs im deutschen Markt. Zusammen machen sie bis zu 40 Millionen Nutzer im Open Web adressierbar.">
      <div className={styles.providerRow}>
        {idProviders.map((provider) => (
          <div key={provider.name} className={styles.provider}>
            <ProviderLogo {...provider} />
            <p>{provider.text}</p>
          </div>
        ))}
      </div>
      <div className={styles.advantageGrid}>
        {idAdvantages.map(({Icon, title, text}) => (
          <article key={title} className={styles.advantage}>
            <span className={styles.advantageIcon}>
              <Icon size={22} weight="regular" aria-hidden="true" />
            </span>
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function ProcessSection() {
  let counter = 0;
  return (
    <Section
      id="buchung"
      index="3"
      eyebrow="Buchung"
      title="So läuft eine Buchung über den OVK"
      lead="Ein Weg, ein Ansprechpartner, ein Angebot. Vom RFP bis zur Übermittlung der Deals dauert es höchstens fünf Tage.">
      <div className={styles.flow}>
        <div className={styles.flowLegend} aria-label="Beteiligte">
          {Object.keys(actors).map((key) => (
            <ActorChip key={key} actor={key} />
          ))}
        </div>

        <div className={styles.phase}>
          <div className={styles.phaseHead}>
            <span className={styles.phaseName}>Buchung</span>
            <span className={styles.phaseRule} aria-hidden="true" />
            <span className={styles.phaseTime}>
              <Clock size={14} weight="bold" aria-hidden="true" />
              max. 5 Tage
            </span>
          </div>
          <ol className={clsx(styles.flowList, styles.flowList_4)}>
            {bookingSteps.map((step) => {
              counter += 1;
              return <FlowStep key={step.title} step={step} number={counter} />;
            })}
          </ol>
        </div>

        <div className={clsx(styles.phase, styles.phase_live)}>
          <div className={styles.phaseHead}>
            <span className={styles.phaseName}>Kampagne live</span>
            <span className={styles.phaseRule} aria-hidden="true" />
          </div>
          <ol className={clsx(styles.flowList, styles.flowList_2)}>
            {liveSteps.map((step) => {
              counter += 1;
              return <FlowStep key={step.title} step={step} number={counter} />;
            })}
          </ol>
        </div>
      </div>

    </Section>
  );
}

function StatusSection() {
  return (
    <Section
      id="stand"
      index="4"
      eyebrow="Aktueller Stand"
      title="Vom Pilot zum Standardprozess"
      lead="Die ersten Kampagnen zeigen, dass deterministische Reichweite im Open Web skalierbar, interoperabel und programmatisch aktivierbar ist.">
      <ol className={styles.timeline}>
        {milestones.map((m) => (
          <li
            key={m.title}
            className={clsx(styles.milestone, m.current && styles.milestone_current)}>
            <span className={styles.milestoneDot} aria-hidden="true" />
            <div className={styles.milestoneBody}>
              <span className={styles.milestoneDate}>
                {m.date}
                {m.current && <span className={styles.nowTag}>Aktuell</span>}
              </span>
              <h3>{m.title}</h3>
              <p>{m.text}</p>
            </div>
            {m.stat && (
              <div className={styles.milestoneStat}>
                <strong>{m.stat.value}</strong>
                <span>{m.stat.label}</span>
              </div>
            )}
          </li>
        ))}
      </ol>

      <div className={styles.resultPanel}>
        <div className={styles.resultIntro}>
          <h3>Ergebnis des Bewegtbild-Tests</h3>
          <p>
            Die Auslieferung lief über alle beteiligten Publisher stabil. Das
            Tagesvolumen wurde schnell und ohne Nachsteuerung erreicht.
          </p>
        </div>
        <div className={styles.resultGrid}>
          {videoResults.map((r) => (
            <div key={r.label} className={clsx(styles.result, styles[`result_${r.tone}`])}>
              <strong>{r.value}</strong>
              <span>{r.label}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function FaqSection() {
  return (
    <Section
      id="faq"
      index="5"
      eyebrow="FAQ"
      title="Häufige Fragen"
      lead="Antworten auf die Fragen, die uns Werbungtreibende und Agenturen am häufigsten stellen.">
      <div className={styles.faq}>
        {faqs.map(({q, a}) => (
          <details key={q} className={styles.faqItem}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}

function Cta() {
  return (
    <section className={styles.cta}>
      <div>
        <p className={styles.ctaTitle}>Passende Setups in der ID Landscape Map finden</p>
        <p className={styles.ctaText}>
          Usecase wählen, DSP, SSP und Vermarkter kombinieren und sofort sehen,
          welche IDs im gewählten Pfad verfügbar sind.
        </p>
      </div>
      <Link className={styles.ctaPrimary} to="/docs/tools/id-landscape-map">
        <MapTrifold size={20} weight="bold" aria-hidden="true" />
        ID Landscape Map
        <ArrowRight size={18} weight="bold" aria-hidden="true" />
      </Link>
    </section>
  );
}

export default function OpenParks() {
  return (
    <div className={styles.page}>
      <Hero />
      <BrandStrip />
      <SectionNav />
      <GoalSection />
      <IdSection />
      <ProcessSection />
      <StatusSection />
      <FaqSection />
      <Cta />
    </div>
  );
}
