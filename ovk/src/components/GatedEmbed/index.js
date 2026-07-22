import React, {useEffect, useState} from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

// Vorläufige Zugriffsbeschränkung bis zur Stakeholder-Abnahme.
// Kein echter Sicherheitsmechanismus (statische Seite ohne Backend) -
// verhindert nur das zufällige/versehentliche Auffinden der Seite.
const ACCESS_PARAM = 'access';
const ACCESS_TOKEN = 'ov7k-x93m';

function GatedEmbedContent({src, title, height}) {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setAllowed(params.get(ACCESS_PARAM) === ACCESS_TOKEN);
  }, []);

  if (!allowed) {
    return (
      <div
        style={{
          padding: '4rem 2rem',
          textAlign: 'center',
          color: 'var(--ifm-color-emphasis-600)',
        }}
      >
        Diese Seite ist aktuell nicht öffentlich verfügbar.
      </div>
    );
  }

  return (
    <div className="id-landscape-fullbleed">
      <iframe
        src={src}
        title={title}
        style={{
          width: '100%',
          height: height || 'calc(100vh - 140px)',
          minHeight: '700px',
          border: 'none',
          borderRadius: '8px',
          display: 'block',
        }}
      />
    </div>
  );
}

export default function GatedEmbed(props) {
  return <BrowserOnly>{() => <GatedEmbedContent {...props} />}</BrowserOnly>;
}
