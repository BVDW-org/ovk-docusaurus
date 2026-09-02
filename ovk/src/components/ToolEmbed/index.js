import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

export default function ToolEmbed({src, title, height}) {
  const resolvedSrc = useBaseUrl(src);

  return (
    <div className="id-landscape-fullbleed">
      <iframe
        src={resolvedSrc}
        title={title}
        className={styles.frame}
        style={height ? {height} : undefined}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}
