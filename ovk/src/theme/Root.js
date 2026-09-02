import React, {useCallback, useEffect, useRef, useState} from 'react';
import InstallGuide from '@site/src/components/InstallGuide';

export default function Root({children}) {
  const [isVisible, setIsVisible] = useState(false);
  const [platform, setPlatform] = useState('other');
  const [installPrompt, setInstallPrompt] = useState(null);
  const showTimer = useRef(null);

  useEffect(() => {
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true;

    if (isStandalone) return undefined;

    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIPadOS =
      window.navigator.platform === 'MacIntel' &&
      window.navigator.maxTouchPoints > 1;
    const isIOS = /iphone|ipad|ipod/.test(userAgent) || isIPadOS;
    const isAndroid = /android/.test(userAgent);

    setPlatform(isIOS ? 'ios' : isAndroid ? 'android' : 'other');

    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };

    const handleInstalled = () => {
      window.localStorage.setItem('ovk-install-guide-seen-v2', 'true');
      setIsVisible(false);
      setInstallPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleInstalled);

    let hasSeenGuide = false;
    try {
      hasSeenGuide =
        window.localStorage.getItem('ovk-install-guide-seen-v2') === 'true';
    } catch {
      // The guide still works if storage is unavailable (for example in a
      // privacy-restricted browsing context).
    }

    if (!hasSeenGuide) {
      showTimer.current = window.setTimeout(() => {
        setIsVisible(true);
        try {
          window.localStorage.setItem('ovk-install-guide-seen-v2', 'true');
        } catch {
          // Ignore storage errors; they must not block the site.
        }
      }, 800);
    }

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      );
      window.removeEventListener('appinstalled', handleInstalled);
      if (showTimer.current) window.clearTimeout(showTimer.current);
    };
  }, []);

  const closeGuide = useCallback(() => setIsVisible(false), []);

  const installApp = useCallback(async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const {outcome} = await installPrompt.userChoice;
    if (outcome === 'accepted') setIsVisible(false);
    setInstallPrompt(null);
  }, [installPrompt]);

  return (
    <>
      {children}
      <InstallGuide
        isVisible={isVisible}
        platform={platform}
        canInstall={Boolean(installPrompt)}
        onClose={closeGuide}
        onInstall={installApp}
      />
    </>
  );
}
