import React from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import clsx from 'clsx';
import {ArrowRight} from '@phosphor-icons/react/dist/icons/ArrowRight';
import {Briefcase} from '@phosphor-icons/react/dist/icons/Briefcase';
import {Buildings} from '@phosphor-icons/react/dist/icons/Buildings';
import {CellSignalFull} from '@phosphor-icons/react/dist/icons/CellSignalFull';
import {CheckCircle} from '@phosphor-icons/react/dist/icons/CheckCircle';
import {Clock} from '@phosphor-icons/react/dist/icons/Clock';
import {Gauge} from '@phosphor-icons/react/dist/icons/Gauge';
import {Handshake} from '@phosphor-icons/react/dist/icons/Handshake';
import {MapTrifold} from '@phosphor-icons/react/dist/icons/MapTrifold';
import {Path} from '@phosphor-icons/react/dist/icons/Path';
import {Plant} from '@phosphor-icons/react/dist/icons/Plant';
import {ShieldCheck} from '@phosphor-icons/react/dist/icons/ShieldCheck';
import {SignIn} from '@phosphor-icons/react/dist/icons/SignIn';
import {Stack} from '@phosphor-icons/react/dist/icons/Stack';
import {Target} from '@phosphor-icons/react/dist/icons/Target';
import styles from './styles.module.css';

// Content source: OVK Sales Workshop "Deterministische ID-Lösungen"
// (01.09.2026) and the BVDW press release of 22.04.2026.

const kpis = [
  {value: '38 Mio.', label: 'Utiq IDs in Deutschland', note: 'Stand 08/2026'},
  {value: '33 Mio.', label: 'netID IDs in DACH', note: 'Login-basiert'},
  {value: '30–32 Mio.', label: 'IDs Reichweite pro Woche', note: 'über alle Vermarkter'},
  {value: '≤ 5 Tage', label: 'vom RFP bis zu den Deals', note: 'ein Ansprechpartner'},
];

const answers = [
  {
    title: 'Große Reichweite & Skalierung',
    text: 'Über alle OVK-Publisher hinweg, auf allen Devices.',
  },
  {
    title: 'Premium-Umfelder',
    text: 'Erreichen echte Menschen in informationsempfänglichen Situationen.',
  },
  {
    title: 'Deterministische IDs',
    text: 'Utiq und netID machen Premium-Reichweite im Open Web wieder adressierbar.',
  },
  {
    title: 'Effiziente Aussteuerung',
    text: 'Deduplizierung bei Frequenzmessung und Zielgruppenansprache.',
  },
  {
    title: 'Ein Buchungsweg',
    text: 'OVK-konsolidiert: aus 1:n Briefings wird ein 1:1 Briefing.',
  },
];

const reasons = [
  {
    Icon: Stack,
    title: 'Skalierung schlägt Insellösung',
    text: 'Erst die gebündelte Premium-Reichweite aller Vermarkter hat die Größe, die im Mediaplan gegen Walled Gardens besteht.',
  },
  {
    Icon: Gauge,
    title: 'Frequenzsteuerung geht nur gemeinsam',
    text: 'Frequency Capping über Publisher, Browser und Apps hinweg braucht eine vermarkterübergreifende Kennung.',
  },
  {
    Icon: Path,
    title: 'Ein Standard statt vieler Sonderwege',
    text: 'Einheitliche Deal-Nomenklatur, ein Buchungsweg und 1:1 statt 1:n Briefings machen Angebote vergleichbar.',
  },
  {
    Icon: Handshake,
    title: 'Netzwerkeffekt & Unabhängigkeit',
    text: 'Je breiter die IDs verbaut sind, desto größer werden Consent-Reichweite, Marktakzeptanz und Unabhängigkeit von Gatekeepern.',
  },
];

const idSolutions = [
  {
    name: 'netID',
    origin: 'Über den Login',
    Icon: SignIn,
    variant: 'login',
    steps: [
      'Der Nutzer loggt sich ein, etwa über GMX, web.de oder einen Partner.',
      'Mit seinem Einverständnis entsteht eine pseudonyme, geräteübergreifende Kennung.',
    ],
    carrier: 'Getragen von RTL, ProSiebenSat.1 und United Internet.',
  },
  {
    name: 'Utiq',
    origin: 'Über das Netz',
    Icon: CellSignalFull,
    variant: 'network',
    steps: [
      'Der Nutzer stimmt auf einer Publisher-Seite über das Utiq-Fenster zu.',
      'Über die Netzverbindung des Providers entsteht die Kennung – ganz ohne Login.',
    ],
    carrier: 'Getragen von Telcos wie Telekom, Vodafone und O2.',
  },
];

const sharedBenefits = [
  'Deterministisch: echte Menschen statt Schätzung',
  'Einwilligungsbasiert und DSGVO-konform',
  'Wirkt auch in Safari, Firefox und Apps',
  'Cross-Device, Cross-Site, ohne Cookies',
];

const actors = {
  agentur: {label: 'Agentur', Icon: Briefcase},
  ovk: {label: 'OVK', Icon: Handshake},
  vermarkter: {label: 'Vermarkter', Icon: Buildings},
};

const bookingSteps = [
  {
    actor: 'agentur',
    title: 'RFP geht an den OVK',
    text: 'Die Agentur sendet ihren RFP per E-Mail an den OVK-Vertreter.',
    hint: 'Individuelle RFPs an einzelne Vermarkter werden an den OVK-Vertreter verwiesen.',
  },
  {
    actor: 'ovk',
    title: 'Gebündelte Anfrage',
    text: 'Der OVK fragt alle Vermarkter über ein einheitliches Briefing-Template an.',
  },
  {
    actor: 'vermarkter',
    title: 'Rückmeldung',
    text: 'Vermarkter legen die Deals an und melden die Dealinfos zurück – ganz ohne Preise.',
    badge: '72 Std.',
  },
  {
    actor: 'ovk',
    title: 'Gebündeltes Angebot',
    text: 'Der OVK bündelt alle Rückmeldungen zu einer Deal-Übersicht für die Agentur.',
  },
];

const liveSteps = [
  {
    actor: 'ovk',
    title: 'Go-Live-Check',
    text: 'Meldet Nicht-Auslieferung auf Deals an die Vermarkter für direktes Troubleshooting.',
  },
  {
    actor: 'ovk',
    title: 'Review',
    text: 'Fordert übergreifende Kampagnenergebnisse an und dokumentiert Learnings, ggf. für Cases.',
  },
];

const milestones = [
  {
    date: 'Ausgangspunkt',
    title: 'OWM-Initiative „Open Parks“',
    text: 'Die Werbungtreibenden im Markenverband fordern Investitionen in deterministische Identitäten und eine offene Werbeinfrastruktur.',
  },
  {
    date: 'Dezember 2025',
    title: 'Erster vermarkterübergreifender Pilot',
    text: 'Mit der pilot Agenturgruppe: Ad Alliance, BCN, iq digital, Media Impact und Ströer, Utiq als gemeinsamer Identifier, Einkauf über Adform.',
    stat: {value: '23 Mio.', label: 'adressierte Unique IDs'},
  },
  {
    date: 'April 2026',
    title: 'Business Case veröffentlicht',
    text: 'Der OVK macht das identifierbasierte Wegeleitsystem öffentlich und kündigt weitere Use Cases an.',
  },
  {
    date: '2026',
    title: 'Zweite Testkampagne im Bewegtbild',
    text: 'Online Video mit Utiq und netID über mehrere große OVK-Vermarkter, Frequenzkappung bei maximal 3 Kontakten pro Woche.',
    stat: {value: 'Ø 1,4', label: 'Kontakte je Nutzer'},
  },
  {
    date: 'September 2026',
    title: 'Buchungsprozess abgestimmt',
    text: 'Einheitlicher OVK-Buchungsweg mit Briefing- und Deal-Template, gemeinsam mit den Vermarktern verabschiedet.',
    current: true,
  },
];

const videoResults = [
  {value: '1,1 Mio.', label: 'Tracked Ads ausgeliefert', tone: 'orange'},
  {value: '62 %', label: 'Uniqueness Rate – rund 733.000 Unique User', tone: 'blue'},
  {value: 'Ø 1,4', label: 'Kontakte je Nutzer, deutlich unter dem Cap', tone: 'ink'},
];

const benefits = [
  {
    Icon: Handshake,
    title: 'Einfachere Buchung',
    text: 'Bündelung der Deals, ein Buchungsweg und ein zentraler Ansprechpartner beim OVK.',
  },
  {
    Icon: Target,
    title: 'Mehr Reichweite',
    text: 'Große Teile des Open Webs, über Browser, Geräte und Websites hinweg.',
  },
  {
    Icon: Gauge,
    title: 'Volle Kontrolle',
    text: 'Frequenzsteuerung über Vermarkter hinweg, sauber verifizierbar.',
  },
  {
    Icon: Plant,
    title: 'Mehr Wirkung pro Budget',
    text: 'Echte Menschen statt Bots, Qualitätsumfelder, weniger Streuverlust.',
  },
];

const faqs = [
  {
    q: 'Ist das datenschutzkonform?',
    a: 'Ja. Die IDs entstehen nur mit aktivem Einverständnis der Nutzer. Personenbezogene Daten werden nie weitergegeben, die Nutzer bleiben anonym.',
  },
  {
    q: 'Muss ich mein Setup umbauen?',
    a: 'Nein. Der Einkauf läuft über die gewohnte DSP. Zusätzliche technische Anforderungen auf Kundenseite gibt es nicht.',
  },
  {
    q: 'Was kostet das zusätzlich?',
    a: 'Nichts extra. Deterministische IDs liegen im bestehenden Deal. Verkauft werden Reichweite und Ergebnis, nicht Technik.',
  },
  {
    q: 'Erhöhen sich die Preise?',
    a: 'Seitens des OVK nein: Es gibt keinen OVK-Aufschlag und keine Preisvorgaben. Über seine Preise entscheidet jeder Vermarkter unabhängig.',
  },
];

function SectionHead({eyebrow, title, lead}) {
  return (
    <header className={styles.sectionHead}>
      <span className={styles.eyebrow}>{eyebrow}</span>
      <Heading as="h2" className={styles.sectionTitle}>
        {title}
      </Heading>
      {lead && <p className={styles.sectionLead}>{lead}</p>}
    </header>
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
        <span className={styles.flowNumber}>{String(number).padStart(2, '0')}</span>
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

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroGlow} aria-hidden="true" />
      <span className={styles.heroEyebrow}>Identifierbasiertes Wegeleitsystem im Open Web</span>
      <p className={styles.heroClaim}>
        Bequem bleibt.
        <br />
        <span>Abhängigkeit nicht.</span>
      </p>
      <p className={styles.heroLead}>
        Mit OVK Open Parks setzen die deutschen Premium-Vermarkter das „Open
        Parks“-Konzept der OWM operativ um: deterministisch adressierbare
        Reichweite über Utiq und netID – vermarkterübergreifend steuerbar,
        programmatisch aktivierbar und über einen einzigen Buchungsweg
        erreichbar.
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

function GoalSection() {
  return (
    <section className={styles.section}>
      <SectionHead
        eyebrow="Das Ziel"
        title="Die Antwort auf die Walled Gardens ist eine gemeinsame"
        lead="Cookie-basierte Adressierbarkeit nimmt ab, Effizienz und Frequenzsteuerung leiden im fragmentierten Open Web. Über 72 % der digitalen Spendings gehen bereits an Google, Amazon, Meta und TikTok. Werbungtreibende erwarten weiterhin effiziente, kontrollierbare und einfach buchbare Lösungen."
      />
      <div className={styles.answerPanel}>
        <span className={styles.answerTag}>Unsere Antwort</span>
        <ul className={styles.answerList}>
          {answers.map(({title, text}) => (
            <li key={title}>
              <CheckCircle size={20} weight="fill" aria-hidden="true" />
              <span>
                <strong>{title}</strong> {text}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.reasonGrid}>
        {reasons.map(({Icon, title, text}) => (
          <article key={title} className={styles.reason}>
            <span className={styles.reasonIcon}>
              <Icon size={22} weight="regular" aria-hidden="true" />
            </span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function IdSection() {
  return (
    <section className={styles.section}>
      <SectionHead
        eyebrow="Die Identifier"
        title="Wie netID und Utiq entstehen"
        lead="Beide schaffen eine verlässliche Kennung mit Einwilligung. Der Unterschied liegt darin, wie sie entsteht."
      />
      <div className={styles.idGrid}>
        {idSolutions.map(({name, origin, Icon, variant, steps, carrier}) => (
          <article key={name} className={clsx(styles.idCard, styles[`idCard_${variant}`])}>
            <div className={styles.idCardHead}>
              <h3>{name}</h3>
              <span className={styles.idOrigin}>
                <Icon size={15} weight="bold" aria-hidden="true" />
                {origin}
              </span>
            </div>
            <ol className={styles.idSteps}>
              {steps.map((text) => (
                <li key={text}>{text}</li>
              ))}
            </ol>
            <p className={styles.idCarrier}>{carrier}</p>
          </article>
        ))}
      </div>
      <ul className={styles.benefitChips} aria-label="Gemeinsame Vorteile">
        {sharedBenefits.map((text) => (
          <li key={text}>
            <ShieldCheck size={16} weight="bold" aria-hidden="true" />
            {text}
          </li>
        ))}
      </ul>
    </section>
  );
}

function ProcessSection() {
  let counter = 0;
  return (
    <section className={styles.section}>
      <SectionHead
        eyebrow="Der Prozess"
        title="So läuft eine Buchung über den OVK"
        lead="Ein Weg, ein Ansprechpartner, ein Angebot. Vom RFP bis zur Deal-Übermittlung in maximal fünf Tagen."
      />

      <div className={styles.legend} aria-label="Beteiligte">
        {Object.keys(actors).map((key) => (
          <ActorChip key={key} actor={key} />
        ))}
      </div>

      <div className={styles.flow}>
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
          <ol className={clsx(styles.flowList, styles.flowList_2)} start={counter + 1}>
            {liveSteps.map((step) => {
              counter += 1;
              return <FlowStep key={step.title} step={step} number={counter} />;
            })}
          </ol>
        </div>
      </div>

      <p className={styles.processClaim}>
        Struktur statt Preispoker. Ein Ansprechpartner statt Dutzende.
      </p>

      <div className={styles.templates}>
        <article>
          <h3>Briefing-Template</h3>
          <p>
            Vom OVK-Vertreter ausgefüllt und an die operativen Ansprechpartner
            aller Häuser verteilt: Kampagneninfos, DSP und Seat ID (alternativ
            SSP Curator Seat), ID Provider, Formate, Laufzeit, Pretargeting und
            Deadline.
          </p>
        </article>
        <article>
          <h3>Deal-Template</h3>
          <p>
            Von den Vermarktern ausgefüllt, ohne jegliche Preisinformation:
            Deal ID, SSP, Go-Live-Datum, Status und ein Dealname nach
            einheitlicher Namenskonvention.
          </p>
        </article>
      </div>
    </section>
  );
}

function StatusSection() {
  return (
    <section className={styles.section}>
      <SectionHead
        eyebrow="Aktueller Stand"
        title="Vom Pilot zum Standardprozess"
        lead="Deterministische Reichweite im Open Web ist skalierbar, interoperabel und programmatisch aktivierbar."
      />
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
          <span className={styles.eyebrow}>Ergebnis Bewegtbild-Test</span>
          <p>
            Auslieferung über alle beteiligten Publisher hinweg stabil, das
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
    </section>
  );
}

function BenefitSection() {
  return (
    <section className={styles.section}>
      <SectionHead
        eyebrow="Für Werbungtreibende"
        title="Was Kunden konkret bekommen"
        lead="ID-Lösungen werden nicht separat verkauft. Sie machen bestehende Kampagnen leistungsfähiger – die Buyside kann sofort starten."
      />
      <div className={styles.benefitGrid}>
        {benefits.map(({Icon, title, text}) => (
          <article key={title} className={styles.benefit}>
            <Icon size={26} weight="regular" aria-hidden="true" />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>

      <div className={styles.faq}>
        {faqs.map(({q, a}) => (
          <details key={q} className={styles.faqItem}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section className={styles.cta}>
      <div>
        <span className={styles.ctaEyebrow}>Nächster Schritt</span>
        <p className={styles.ctaTitle}>Kompatible Setups in der ID Landscape Map finden</p>
        <p className={styles.ctaText}>
          Usecase wählen, DSP, SSP und Vermarkter kombinieren und sofort sehen,
          welche IDs im gewählten Pfad verfügbar sind.
        </p>
      </div>
      <div className={styles.ctaLinks}>
        <Link className={styles.ctaPrimary} to="/docs/tools/id-landscape-map">
          <MapTrifold size={20} weight="bold" aria-hidden="true" />
          ID Landscape Map
          <ArrowRight size={18} weight="bold" aria-hidden="true" />
        </Link>
        <Link className={styles.ctaSecondary} to="/docs/identitysolutions/faq">
          Alle FAQ
          <ArrowRight size={18} weight="bold" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

export default function OpenParks() {
  return (
    <div className={styles.page}>
      <Hero />
      <GoalSection />
      <IdSection />
      <ProcessSection />
      <StatusSection />
      <BenefitSection />
      <Cta />
    </div>
  );
}
