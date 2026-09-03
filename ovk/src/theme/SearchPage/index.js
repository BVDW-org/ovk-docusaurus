import React from 'react';
import Head from '@docusaurus/Head';
import SearchPage from '@theme-original/SearchPage';

// The local-search package currently emits property="robots". Crawlers read
// robots directives from the name attribute, so add the standards-compliant
// form while keeping the upstream component upgradeable.
export default function SearchPageWithRobotsDirective() {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, follow" />
      </Head>
      <SearchPage />
    </>
  );
}
