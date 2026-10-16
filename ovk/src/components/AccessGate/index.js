import React, {useCallback, useEffect, useState} from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import {LockSimple} from '@phosphor-icons/react/dist/icons/LockSimple';
import styles from './styles.module.css';

// Preliminary access gate for pages awaiting stakeholder approval.
// The static site has no backend, so this is not real security: the page
// content still ships in the JS bundle. It only keeps the page out of
// search engines and away from casual visitors. Unlock via the form or a
// deep link with ?zugang=<code>; only the SHA-256 hash of the code lives in
// the source. Unlocked state is remembered per browser session.

const PARAM = 'zugang';

async function sha256(text) {
  const bytes = new TextEncoder().encode(text);
  const digest = await window.crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function readStorage(key) {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key, value) {
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    // Private mode or blocked storage: unlock only lasts for this page view.
  }
}

function Gate({hash, storageKey, title, children}) {
  const [state, setState] = useState('checking');
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  const tryCode = useCallback(
    async (code) => {
      if (!code) return false;
      const ok = (await sha256(code.trim())) === hash;
      if (ok) {
        writeStorage(storageKey, hash);
        setState('open');
      }
      return ok;
    },
    [hash, storageKey],
  );

  useEffect(() => {
    if (readStorage(storageKey) === hash) {
      setState('open');
      return;
    }
    const code = new URLSearchParams(window.location.search).get(PARAM);
    tryCode(code).then((ok) => {
      if (!ok) setState('locked');
    });
  }, [hash, storageKey, tryCode]);

  if (state === 'open') return children;
  if (state === 'checking') return <div className={styles.placeholder} aria-busy="true" />;

  const onSubmit = async (event) => {
    event.preventDefault();
    setError(!(await tryCode(value)));
  };

  return (
    <div className={styles.gate}>
      <span className={styles.icon}>
        <LockSimple size={26} weight="bold" aria-hidden="true" />
      </span>
      <p className={styles.title}>{title}</p>
      <p className={styles.text}>
        Diese Seite befindet sich noch in der Abstimmung und ist nur mit
        Zugangscode erreichbar.
      </p>
      <form className={styles.form} onSubmit={onSubmit}>
        <label htmlFor="access-code" className={styles.srOnly}>
          Zugangscode
        </label>
        <input
          id="access-code"
          type="password"
          autoComplete="off"
          placeholder="Zugangscode"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            setError(false);
          }}
          aria-invalid={error}
          aria-describedby={error ? 'access-error' : undefined}
        />
        <button type="submit">Öffnen</button>
      </form>
      {error && (
        <p id="access-error" className={styles.error} role="alert">
          Der Zugangscode ist nicht korrekt.
        </p>
      )}
    </div>
  );
}

export default function AccessGate(props) {
  return (
    <BrowserOnly fallback={<div className={styles.placeholder} />}>
      {() => <Gate {...props} />}
    </BrowserOnly>
  );
}
