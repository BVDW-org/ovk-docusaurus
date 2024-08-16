import React from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Werbeformen',
    image: require('@site/static/img/ad-formats.png').default, // Pfad zur PNG-Datei
    description: 'Eine vermarkterübergreifende Standardisierung der unterschiedlichen Werbeformen. Hier finden Sie die Specs dazu.',
    to: "/docs/werbeformen/"
  },
  {
    title: 'ID Lösungen',
    image: require('@site/static/img/id-solution.png').default, // Pfad zur PNG-Datei
    description: (
      <>
        Übersicht der aktiven ID Lösungen pro Vermarkter und verschiedene Case Studies.
      </>
    ),
    to: "/docs/identitysolutions/"
  },
  {
    title: 'OVK Contextual Standard',
    image: require('@site/static/img/Contextual.png').default, // Pfad zur PNG-Datei
    description: (
      <>
        Specs zum kontextuellen Standard, den der OVK 2023 ins Leben gerufen hat und von all seinen Mitgliedern genutzt wird.
      </>
    ),
    to: "/docs/contextualstandards/"
}
];

function Feature({ image, title, description, to }) {
  // Handler für Klicks auf den Container
  const handleClick = () => {
    window.location.href = to; // Navigiere zur URL in 'to'
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


function HomepageFeatures() {
  return (
    <div className="container">
      <div className="row">
        {FeatureList.map((feature, idx) => (
          <Feature key={idx} {...feature} />
        ))}
      </div>
    </div>
  );
}

export default HomepageFeatures;