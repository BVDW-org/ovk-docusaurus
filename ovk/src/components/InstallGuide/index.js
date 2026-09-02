import React, {useEffect, useState} from 'react';
import styles from './styles.module.css';

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 15V3m0 0L7.5 7.5M12 3l4.5 4.5M6.5 10.5H5A2 2 0 003 12.5V19a2 2 0 002 2h14a2 2 0 002-2v-6.5a2 2 0 00-2-2h-1.5" />
    </svg>
  );
}

function AddIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 7v10M7 12h10" />
      <rect x="3" y="3" width="18" height="18" rx="4" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="5" r="1.35" />
      <circle cx="12" cy="12" r="1.35" />
      <circle cx="12" cy="19" r="1.35" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

const platformTips = {
  ios: {
    icon: <ShareIcon />,
    text: (
      <>
        In Safari auf <strong>Teilen</strong> tippen und{' '}
        <strong>„Zum Home-Bildschirm“</strong> wählen.
      </>
    ),
  },
  android: {
    icon: <MenuIcon />,
    text: (
      <>
        Das Browsermenü öffnen und{' '}
        <strong>„Zum Startbildschirm hinzufügen“</strong> wählen.
      </>
    ),
  },
  other: {
    icon: <AddIcon />,
    text: (
      <>
        Das <strong>Installationssymbol</strong> in der Adressleiste oder im
        Browsermenü wählen.
      </>
    ),
  },
};

export default function InstallGuide({
  isVisible,
  platform,
  canInstall,
  onClose,
  onInstall,
}) {
  const [showTip, setShowTip] = useState(false);

  useEffect(() => {
    if (!isVisible) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, onClose]);

  useEffect(() => {
    if (!isVisible || canInstall) setShowTip(false);
  }, [canInstall, isVisible]);

  if (!isVisible) return null;

  const tip = platformTips[platform];

  return (
    <div className={styles.positioner}>
      <section
        className={styles.dialog}
        role="dialog"
        aria-labelledby="install-guide-title"
        aria-describedby="install-guide-description">
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Hinweis schließen">
          <CloseIcon />
        </button>

        <div className={styles.header}>
          <img
            className={styles.appIcon}
            src="/img/pwa/icon-192.png"
            alt=""
            width="48"
            height="48"
          />
          <div>
            <h2 id="install-guide-title" className={styles.title}>
              OVK Tech Specs als App
            </h2>
            <p id="install-guide-description" className={styles.description}>
              Schnell vom Home-Bildschirm öffnen.
            </p>
          </div>
        </div>

        {!canInstall && showTip && (
          <div className={styles.tip}>
            <span className={styles.tipIcon}>{tip.icon}</span>
            <span>{tip.text}</span>
          </div>
        )}

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={
              canInstall
                ? onInstall
                : showTip
                  ? onClose
                  : () => setShowTip(true)
            }>
            {!showTip && (
              <AddIcon />
            )}
            {showTip ? 'Alles klar' : 'App installieren'}
          </button>
          {!showTip && (
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={onClose}>
              Später
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
