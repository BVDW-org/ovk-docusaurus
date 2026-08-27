import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

function ToolEmbedContent({src, title, height}) {
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

export default function ToolEmbed(props) {
  return <BrowserOnly>{() => <ToolEmbedContent {...props} />}</BrowserOnly>;
}
